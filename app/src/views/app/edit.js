import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Alert,
  Badge,
  Col,
  Row,
  Input,
  FormGroup,
  Button,
  CustomInput,
  Label,
  ListGroup,
  ListGroupItem,
  Spinner,
} from "reactstrap";

import { toast, Bounce } from "react-toastify";

import { X, Check } from "react-feather";
import PerfectScrollbar from "react-perfect-scrollbar";
import classnames from "classnames";

import BlockUi from "react-block-ui";

import {
  requestDropodowns,
  requestForm,
} from "../../redux/actions/app/actions";

import { axios } from "../../redux/api";

import Modal from "./modal/create";
import FwdModal from "./modal/forwardCaseModal";
import ListModal from "./modal/list";

import ModalEdit from "./modal/edit";
import { IntlContext } from "../../i18n/provider";

import config from "../../data/config";
import Checkbox from "../../components/@vuexy/checkbox/CheckboxesVuexy";

class Edit extends Component {
  static contextType = IntlContext;
  translate = this.context.translate;
  notifySuccessBounce = () =>
    toast.success(this.translate(`Transaction completed successfuly!`), {
      transition: Bounce,
    });

  toastId = null;
  /**
   * Error alert function - shows an alert with danger background
   * @param {*} error - string message
   * @returns
   */
   notifyErrorBounce = (error) =>{
    if(!toast.isActive(this.toastId)){
      this.toastId= toast.error(error, {
          transition: Bounce,
        });
    }
  }

  state = {
    form: new FormData(),
    isValid: true,
    dropdowns: [],
    childrens: {},
    edit_status: false,
    showModal: false,
    selectedData: {},
    modal_form: "task",
    modal_list: false,
    modal_list_data: {},
    isProcessing: false,
    casecomment_set: [],
    task_set: [],
    data: {},
    blocking: true,
    showAlert: false,
    alertFields: [],
    alertData: {},
    blockSubmit: false,
    disabled: false,
  };

  componentDidMount() {
    this.getObjectValue();
  }

  render() {
    let { show, handleSidebar, data } = this.props;

    return (
      <BlockUi
        className={classnames("data-list-sidebar pb-1", {
          show: show,
        })}
        tag="div"
        loader={
          <div className="d-flex flex-column row justify-content-center align-items-center text-center">
            <Spinner color="white" />
            <span className="text-white">
              <strong>{this.translate("Please wait")} ...</strong>
            </span>
          </div>
        }
        blocking={this.state.blocking}
      >
        <div className="data-list-sidebar-header bg-primary p-2 d-flex justify-content-between">
          <h4 className="text-white">
            {this.translate("Case")} No.
            <strong> {String(data.case_number)}</strong>{" "}
          </h4>

          {this.state.showModal ? (
            <ModalEdit
              title={`Edit`}
              page={this.state.modal_form}
              label="Save"
              color="info"
              modal={this.state.showModal}
              toggleModal={this.handleModal}
              userRole={this.props.user}
              data={this.state.selectedData}
              disabled
            />
          ) : (
            <></>
          )}

          <small className="text-white">
            <u className="text-secondary">
              {/* Criado aos{" "} */}
              <strong>
                {"  "}
                {/* {moment(data.created_at).format("YYYY-MM-DD")} */}
              </strong>
              {"  "}
              {/* por{" "} */}
              <strong>
                {" "}
                {/* <i>{String(data.created_by.username)}</i>{" "} */}
              </strong>
            </u>
          </small>

          <X
            className="text-white"
            size={20}
            onClick={() => handleSidebar(this.state.data, true)}
          />
        </div>
        <PerfectScrollbar
          className="data-list-fields px-2 mt-3"
          options={{ wheelPropagation: false }}
        >
          {this.renderFieldAlert()}
          <div>{this.renderForm()}</div>
        </PerfectScrollbar>
        <div className="data-list-sidebar-footer px-2 d-flex justify-content-start align-items-center mt-1 mb-1">
          {this.renderActions()}
        </div>
      </BlockUi>
    );
  }

  getObjectValue = () => {
    const { userOauth } = this.props.state.auth.login;

    axios
      .get(`lvforms/${this.props.data.id}.json/`, {
        headers: {
          "X-CSRFTOKEN": this.props.state.auth.login.csrftoken,
          Authorization: `Bearer ${userOauth.access_token}`,
        },
      })
      .then(({ data }) => {
        let payload = data;
        payload["index"] = this.props.data.index;

        this.initComponent(data);

        this.setState({ data, blocking: false });
      })
      .catch((error) => {
        const { data } = this.props;
        this.initComponent(data);
        this.setState({ data, blocking: false });
      });
  };

  initComponent = (data) => {
    this.props.requestDropodowns();
    const { form } = config.pages.lvform;

    let formdata = new FormData();

    this.setState({ casecomment_set: data.casecomment_set.reverse() ?? [] });
    this.setState({ task_set: data.task_set.reverse() ?? [] });

    form.forEach((item) => {
      /**
       * Add all children dropdowns fiels in a map
       */
      if (item["children"] && data[`${item.name}_id`]) {
        this.updateChildrenList(item, data[`${item.name}_id`]);
      }
      if (data[item["wq:ForeignKey"] ? item.name + "_id" : item.name])
        formdata.append(
          item["wq:ForeignKey"] ? item.name + "_id" : item.name,
          data[item["wq:ForeignKey"] ? item.name + "_id" : item.name]
        );
    });

    formdata.append("id", data["id"]);

    const { dropdowns } = this.props.app_reducer;
    this.setState({ dropdowns, form: formdata });
  };

  /**
   * get checkbox field value from a formdata object
   * @param {*} field_name
   * @returns
   */
  checkboxValue = (field_name) => {
    const { form } = this.state;
    return form.get(field_name) === "true";
  };

  /**
   * Render a input label verifying it's required bind value and filled value
   * @param {*} field
   * @returns
   */
  renderLabel = (field) => {
    if (
      !this.state.isValid &&
      this.state.required_fields_labels.includes(field.label)
    ) {
      return (
        <Label className="text-danger">
          <strong> * {this.translate(field.label)}</strong>
        </Label>
      );
    } else {
      return (
        <Label>
          {" "}
          <strong>{this.translate(field.label)}</strong>
        </Label>
      );
    }
  };

  /**
   * ToggleModal function - update toggle state to true or false to show the modal
   */
  handleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  /**
   * ToggleModal function - update toggle state to true or false to show the modalList view component
   */

  toggleListModal = () => {
    this.setState((prevState) => ({
      modal_list: !prevState.modal_list,
    }));
  };

  /**
   * Updates list data to be rendered on modalList View component and show modal
   * @param {*} item
   */
  raiseListData(item) {
    this.setState({ modal_list_data: item });
    this.toggleListModal();
  }

  /**
   * Render Task list on view
   * @returns
   */
  renderTasks = () => {
    const { task_set } = this.state;

    if (task_set.length === 0) {
      return <div />;
    }

    return (
      <Col md="12">
        <div className="divider">
          <div className="divider-text">
            <strong className="ml-2"> {this.translate("Tasks")}</strong>
          </div>
        </div>
        <ListGroup flush className="rounded-0">
          {this.state.modal_list ? (
            <ListModal
              modal={this.state.modal_list}
              toggleModal={this.toggleListModal}
              data={this.state.modal_list_data}
            />
          ) : (
            <></>
          )}
          {task_set.map((item) => {
            let badge = <></>;

            if (item.taskcomment_set.length > 0) {
              badge = (
                <Badge className="mb-1" color="primary" pill>
                  {item.taskcomment_set.length}
                </Badge>
              );
            }
            return (
              <ListGroupItem key={item.id} onClick={() => this.raiseListData(item)}>
                <div className="d-flex justify-content-between w-100 align-items-center">
                  <h5 className="mb-1">
                    <strong>{this.translate(item.task_title_label)}</strong>
                  </h5>
                  {badge}
                </div>
                <p className="mb-1">{item.description} </p>
                <div className="d-flex justify-content-between w-100">
                  <small>
                    <strong>{item.assignee_label}</strong>
                  </small>
                  <small className="text-primary" style={{ cursor: "pointer" }}>
                    <strong>{this.translate("Read Comments")} ...</strong>
                  </small>
                </div>
              </ListGroupItem>
            );
          })}
        </ListGroup>
      </Col>
    );
  };

  /**
   * Render comments list on view
   */
  renderComments = () => {
    const { casecomment_set } = this.state;

    if (casecomment_set.length === 0) {
      return <div />;
    }

    return (
      <Col md="12">
        <div className="divider">
          <div className="divider-text">
            {this.translate("Case Comments History")}
          </div>
        </div>
        <ListGroup flush className="rounded-0">
          {casecomment_set.map((item) => (
            <ListGroupItem key={item.id}>
              <p className="mb-1">{item.feedback}</p>

              <div className="d-flex justify-content-between align-items-center">
                <small>
                  <strong>{item.created_by_label}</strong>
                </small>
                <small>
                  <strong>
                    {`@${this.translate(item.author.groups_label[0])} . ${item.datetime_created_label
                      }`}
                  </strong>
                </small>
              </div>
            </ListGroupItem>
          ))}
        </ListGroup>
      </Col>
    );
  };

  /**
   * Appen added comment to the comments list on view
   *
   * @param {*} comments
   */
  addMoreComments = (comments) => {
    let { casecomment_set } = this.state;

    casecomment_set.unshift(comments);
    this.setState({ casecomment_set });
  };

  /**
   * Append added task to the task list on view
   */
  addMoreTasks = (tasks) => {
    let { task_set } = this.state;

    task_set.unshift(tasks);
    this.setState({ task_set });
  };

  /**
   * Render Partner Feedback object data on view
   */
  renderFeedbackComments = () => {
    const { forwardinginstitution } = this.props.data;

    const userRole = this.props.user;

    if (
      !forwardinginstitution ||
      (userRole === "manager" && !forwardinginstitution.isFeedback_aproved)
    ) {
      return <></>;
    }
    if (forwardinginstitution) {
      return (
        <Col md="12">
          <ListGroup
            flush
            className="rounded-0 mb-2"
            onClick={() => {
              this.setState({
                showModal: true,
                selectedData: forwardinginstitution,
                modal_form: "forwardinginstitution",
              });
            }}
          >
            <ListGroupItem key={forwardinginstitution.id}>
              <div className="d-flex justify-content-between w-100">
                <div className="mb-1">
                  <h6>
                    <strong>
                      {userRole === "partner"
                        ? this.translate("My Feedback")
                        : this.translate("Partner Feedback")}
                    </strong>
                  </h6>
                  <small>{forwardinginstitution.datetime_created_label}</small>
                </div>
                <small>{`${this.translate("Aproved")}: ${this.translate(
                  forwardinginstitution.isFeedback_aproved_label
                )}`}</small>
              </div>
              <p className="mb-1">{forwardinginstitution.partner_feedback} </p>

              <div className="d-flex justify-content-between w-100">
                <small>
                  <strong>{forwardinginstitution.referall_to_label}</strong>
                </small>
                <small className="text-primary" style={{ cursor: "pointer" }}>
                  <strong>{this.translate("Read more")} ...</strong>
                </small>
              </div>
            </ListGroupItem>
          </ListGroup>
        </Col>
      );
    } else {
      return <></>;
    }
  };

  /**
   * Action and helper functions
   */
  renderActions = () => {
    const userRole = this.props.user;
    let { data } = this.props;

    let element = <p />;

    switch (userRole) {
      case "manager":
        element = (
          <div>
            <Button
              disabled={this.state.disabled}
              color={this.state.edit_status ? "primary" : "success"}
              className="mr-1 square"
              onClick={() => this.handleSubmit()}
            >
              {this.state.isProcessing ? (
                <Spinner color="white" className="mr-1" size="sm" type="grow" />
              ) : (
                <></>
              )}
              {this.translate(this.state.edit_status ? "Update" : "Edit")}
            </Button>
            {this.state.edit_status ? (
              <Button
                color="danger"
                className="mr-1 square"
                onClick={() => this.setState({ edit_status: false })}
              >
                {this.translate("Cancel")}
              </Button>
            ) : (
              <>
                <Modal
                  title={this.translate(`Register form for task`)}
                  page="task"
                  label={this.translate("Task")}
                  color="success"
                  lvform_id={data.id}
                  lvform={data}
                  addMore={this.addMoreTasks}
                />
                <FwdModal
                  title={this.translate(`Send to Focal Point`)}
                  page="forwardcasetofocalpoint"
                  label={this.translate("Send")}
                  lvform_id={data["id"]}
                  lvform={data}
                />
                <Modal
                  title={this.translate(`Add your comment`)}
                  page="casecomment"
                  label={this.translate("Comment")}
                  color="primary"
                  lvform_id={data["id"]}
                  lvform={data}
                  addMore={this.addMoreComments}
                />
              </>
            )}
          </div>
        );
        break;
      case "partner":
        element = (
          <div>
            <Modal
              title={this.translate(`Add your feedback`)}
              page="casecomment"
              label={this.translate("Comment")}
              color="primary"
              lvform_id={data["id"]}
              lvform={data}
            />
          </div>
        );
        break;

      case "focalpoint":
        element = (
          <div>
            <Button
              disabled={this.state.disabled}
              color={this.state.edit_status ? "primary" : "success"}
              className="mr-1 square"
              onClick={() => this.handleSubmit()}
            >
              {this.translate(this.state.edit_status ? "Update" : "Edit")}
            </Button>
            {this.state.edit_status ? (
              <Button
                color="danger"
                className="mr-1 square"
                onClick={() => this.setState({ edit_status: false })}
              >
                {this.translate("Cancel")}
              </Button>
            ) : (
              <>
                <Modal
                  title={this.translate(`Send case to Entity`)}
                  page="forwardinginstitution"
                  label={this.translate("Send")}
                  lvform_id={data["id"]}
                  lvform={data}
                />
                <Modal
                  title={this.translate(`Add your feedback`)}
                  page="casecomment"
                  label={this.translate("Feedback")}
                  color="primary"
                  lvform_id={data["id"]}
                  lvform={data}
                />
              </>
            )}
          </div>
        );
        break;

      case "operator":
        element = (
          <div>
            <Button
              disabled={this.state.disabled}
              color={this.state.edit_status ? "primary" : "success"}
              className="mr-1 square"
              onClick={() => this.handleSubmit()}
            >
              {this.translate(this.state.edit_status ? "Update" : "Edit")}
            </Button>
            {this.state.edit_status ? (
              <Button
                color="danger"
                className="mr-1 square"
                onClick={() => this.setState({ edit_status: false })}
              >
                {this.translate("Cancel")}
              </Button>
            ) : (
              <></>
            )}
          </div>
        );
        break;
      default:
        element = <p>Actions not authorized </p>;
        break;
    }

    return element;
  };

  /**
   * Render other details on form view
   */
  renderDetails = () => {
    if (this.state.edit_status) {
      return <></>;
    }

    let element = <></>;

    const userRole = this.props.user;

    switch (userRole) {
      case "manager":
        element = (
          <>
            {this.renderTasks()}
            {this.renderFeedbackComments()}
            {this.renderComments()}
          </>
        );
        break;
      case "partner":
        element = (
          <>
            <Col md="12" className="mt-1 mb-1F">
              <div className="divider">
                <div className="divider-text">
                  {" "}
                  {this.translate("More Details")}{" "}
                </div>
              </div>
            </Col>
            {this.renderFeedbackComments()}
            {this.renderComments()}
            <Col md="6"></Col>
          </>
        );
        break;
      case "focalpoint":
        element = (
          <>
            <Col md="12" className="mt-1 mb-1F">
              <div className="divider">
                <div className="divider-text">
                  {this.translate("More Details")}
                </div>
              </div>
            </Col>
            {this.renderFeedbackComments()}
            {this.renderComments()}
            <Col md="6"></Col>
          </>
        );
        break;

      default:
        element = <></>;
        break;
    }
    return element;
  };

  /**
   * Render lvform form on view
   */
  renderForm = () => {
    const form_ = config.pages.lvform;
    return (
      <Row>
        {form_.form.map((field) =>
          this.state.edit_status
            ? this.renderSingleInput(field)
            : this.renderSingleRead(field)
        )}
        {this.renderDetails()}
      </Row>
    );
  };

  /**
   * Filter and matchs input type and render it's matching components settings
   * @param {*} field
   * @returns
   */
  renderSingleInput = (field) => {
    let res = <></>;
    let { data } = this.state;

    if (
      field.name === "case_number" ||
      field.name === "consent_pi" ||
      field.name === "consent_share_pi"
    ) {
      return <span key={field.name} />;
    }

    switch (field.type) {
      case "text":
        res = (
          <Col md="6" key={field.name}>
            <Label>
              <strong>{this.translate(field.label)}</strong>
            </Label>
            <FormGroup className="form-label-group position-relative has-icon-left">
              <Input
                type="textarea"
                rows={7}
                className="square"
                disabled={!this.state.edit_status}
                placeholder={field.label}
                defaultValue={data[field.name]}
                onChange={(e) => this.updateState(field.name, e.target.value)}
              />
            </FormGroup>
          </Col>
        );

        break;
      case "string":
        if (field["wq:ForeignKey"]) {
          res = (
            <Col md="6" key={field.name}>
              <Label>
                <strong>{this.translate(field.label)}</strong>
              </Label>
              <FormGroup className="form-label-group position-relative has-icon-left">
                <CustomInput
                  className="square"
                  type="select"
                  id={field.name}
                  disabled={!this.state.edit_status}
                  defaultValue={data[`${field.name}_id`]}
                  onChange={(e) => {
                    this.updateState(`${field.name}_id`, e.target.value);
                    if (field["children"]) {
                      this.clearParentFields(field);
                      this.updateChildrenList(field, e.target.value);
                    }
                  }}
                >
                  <option>{this.translate("Select")}</option>
                  {field["has_parent"] === undefined
                    ? this.renderSelectOptionForeignWQ(
                      this.getForeignFieldDropdown(field["wq:ForeignKey"])
                    )
                    : this.renderSelectOptionForeignWQ(
                      this.state.childrens[field["wq:ForeignKey"]] ?? []
                    )}
                </CustomInput>
              </FormGroup>
            </Col>
          );
        } else {
          if (field["depends_on"]) {
            res = this.checkboxValue(field.depends_on) ? (
              <Col md="6" key={field.name}>
                {this.renderLabel(field)}
                <FormGroup className="form-label-group position-relative has-icon-left">
                  <Input
                    type="text"
                    className="square"
                    placeholder={this.translate(field.label)}
                    defaultValue={data[`${field.name}`]}
                    onChange={(e) =>
                      this.updateState(field.name, e.target.value)
                    }
                  />
                </FormGroup>
              </Col>
            ) : (
              <div key={field.name} />
            );
          } else {
            res = (
              <Col md="6" key={field.name}>
                {this.renderLabel(field)}
                <FormGroup className="form-label-group position-relative has-icon-left">
                  <Input
                    type="text"
                    className="square"
                    defaultValue={data[`${field.name}`]}
                    placeholder={this.translate(field.label)}
                    onChange={(e) =>
                      this.updateState(field.name, e.target.value)
                    }
                  />
                </FormGroup>
              </Col>
            );
          }
        }
        break;
      case "date":
        res = (
          <Col md="6" key={field.name}>
            <Label>
              <strong>{this.translate(field.label)}</strong>
            </Label>
            <FormGroup className="form-label-group position-relative has-icon-left">
              <Input
                type="date"
                className="square"
                defaultValue={data[field.name]}
                disabled={!this.state.edit_status}
                placeholder={this.translate(field.label)}
                onChange={(e) => this.updateState(field.name, e.target.value)}
              />
            </FormGroup>
          </Col>
        );
        break;
      case "int":
        if (field["depends_on"]) {
          res = this.checkboxValue(field.depends_on) ? (
            <Col md="6" key={field.name}>
              {this.renderLabel(field)}
              <FormGroup className="form-label-group position-relative has-icon-left">
                <Input
                  type="number"
                  defaultValue={data[field.name]}
                  className="square"
                  placeholder={this.translate(field.label)}
                  onChange={(e) => this.updateState(field.name, e.target.value)}
                />
              </FormGroup>
            </Col>
          ) : (
            <div key={field.name} />
          );
        } else {
          res = (
            <Col md="6" key={field.name}>
              {this.renderLabel(field)}
              <FormGroup className="form-label-group position-relative has-icon-left">
                <Input
                  type="number"
                  defaultValue={data[field.name]}
                  className="square"
                  placeholder={this.translate(field.label)}
                  onChange={(e) => this.updateState(field.name, e.target.value)}
                />
              </FormGroup>
            </Col>
          );
        }
        break;
      case "select one":
        if (field["has_boolean_options"]) {
          if (field["depends_on"]) {
            res = this.checkboxValue(field.depends_on) ? (
              <Col md="6" key={field.name} className="mb-1">
                <Checkbox
                  color="primary"
                  className="my-2"
                  icon={<Check className="vx-icon" size={16} />}
                  label={this.translate(field.label)}
                  defaultChecked={false}
                  onChange={(e) => {
                    this.updateState(
                      field.name,
                      !this.checkboxValue(field.name)
                    );
                  }}
                />
              </Col>
            ) : (
              <Col md="6" key={field.name} />
            );
          } else {
            res = (
              <Col md="6" key={field.name} className="mb-1">
                <Checkbox
                  color="primary"
                  className="my-2"
                  icon={<Check className="vx-icon" size={16} />}
                  label={this.translate(field.label)}
                  defaultChecked={data[field.name]}
                  onChange={(e) => {
                    this.updateState(
                      field.name,
                      !this.checkboxValue(field.name)
                    );
                  }}
                />
              </Col>
            );
          }
        } else {
          if (field.depend_on_value) {
            if (
              field.depend_on_value.value.includes(
                this.state.form.get(`${field.depend_on_value.field}_id`)
              )
            ) {
              res = res = (
                <Col md="6" key={field.name}>
                  {this.renderLabel(field)}
                  <FormGroup className="form-label-group position-relative has-icon-left">
                    <CustomInput
                      className="square"
                      type="select"
                      id={field.name}
                      defaultValue={data[field.name]}
                      placeholder={this.translate(field.label)}
                      onChange={(e) =>
                        this.updateState(field.name, e.target.value)
                      }
                    >
                      <option>{this.translate("Select")}</option>
                      {this.renderSelectOption(field.choices)}
                    </CustomInput>
                  </FormGroup>
                </Col>
              );
            } else return <Col md="6" key={field.name} />;
          } else {
            if (field["depends_on"]) {
              res = this.checkboxValue(field.depends_on) ? (
                <Col md="6" key={field.name}>
                  {this.renderLabel(field)}
                  <FormGroup className="form-label-group position-relative has-icon-left">
                    <CustomInput
                      className="square"
                      type="select"
                      id={field.name}
                      defaultValue={data[field.name]}
                      placeholder={this.translate(field.label)}
                      onChange={(e) =>
                        this.updateState(field.name, e.target.value)
                      }
                    >
                      <option>{this.translate("Select")}</option>
                      {this.renderSelectOption(field.choices)}
                    </CustomInput>
                  </FormGroup>
                </Col>
              ) : (
                <Col md="6" key={field.name} />
              );
            } else {
              res = (
                <Col md="6" key={field.name}>
                  {this.renderLabel(field)}
                  <FormGroup className="form-label-group position-relative has-icon-left">
                    <CustomInput
                      className="square"
                      type="select"
                      id={field.name}
                      defaultValue={data[field.name]}
                      placeholder={this.translate(field.label)}
                      onChange={(e) =>
                        this.updateState(field.name, e.target.value)
                      }
                    >
                      <option>{this.translate("Select")}</option>
                      {this.renderSelectOption(field.choices)}
                    </CustomInput>
                  </FormGroup>
                </Col>
              );
            }
          }
        }

        break;

      default:
        res = <div key={field.name}></div>;
        break;
    }

    return res;
  };

  /**
   * Reender a simple select option from a list
   * @param {*} choices
   * @returns
   */
  renderSelectOption = (choices) => {
    return choices.map((item) => (
      <option key={item.name} value={item.name}>
        {this.translate(item.label)}
      </option>
    ));
  };

  /**
   * Render a foreign key field dropdowns options on select component
   * @param {*} choices
   * @returns
   */
  renderSelectOptionForeignWQ = (choices) => {
    return choices.map((item) => (
      <option key={item.id} value={item.id}>
        {this.translate(item.label)}
      </option>
    ));
  };

  /**
   * Get foreign dropdowns from field_name on app dropdowns state
   * @param {*} field_name
   * @returns
   */
  getForeignFieldDropdown = (field_name) => {
    return this.props.app_reducer.dropdowns[field_name] ?? [];
  };

  clearParentFields = (field) => {
    switch (field.name) {
      case "category":
        this.updateState("subcategory_id", "");
        this.updateState("subcategory_issue_id", "");
        this.updateState("who_not_receiving", "");
        this.updateState("individual_commiting_malpractice", "");

        this.updateChildrenList(
          config.pages.lvform.form.filter(
            (item) => item.name === "subcategory"
          )[0],
          -1
        );

        break;

      case "subcategory":
        this.updateState("subcategory_issue_id", "");
        this.updateState("who_not_receiving", "");
        this.updateState("individual_commiting_malpractice", "");

        break;

      default:
        return;
    }
  };

  /**
   * Update each dynamic field state value
   * @param {*} field_name
   * @param {*} value
   */
  updateState = (field_name, value) => {
    let form = this.state.form;

    if (value !== "" && value !== "Seleccionar" && value !== "Select") {
      if (form.has(field_name)) {
        form.set(field_name, value);
      } else {
        form.append(field_name, value);
      }
    } else {
      if (form.has(field_name)) {
        form.set(field_name, "");
      } else {
        form.append(field_name, "");
      }
    }
  };

  /**
   * Dynimically places the nested fields into it's relative
   * @param {*} field
   * @param {*} value
   */
  updateChildrenList = (field, value) => {
    let childrens = this.state.childrens;
    const res = this.getForeignFieldDropdown(field["wq:ForeignKey"]).filter(
      (item) => {
        return Number(item.id) === Number(value);
      }
    );

    if (res.length) childrens[field.children] = res[0][`${field.children}_set`];
    else childrens[field.children] = [];
    this.setState({ childrens });
  };

  /**
   * Submits the form to post request action
   */
  handleSubmit = () => {
    if (this.state.edit_status) {
      let { handleSidebar } = this.props;
      const { userOauth } = this.props.state.auth.login;

      this.setState({ isValid: true, isProcessing: true });
      if(!this.state.blockSubmit){
        this.setState({blockSubmit : true});
        this.setState({disabled: true});
      }
      axios
        .patch(`lvforms/${this.props.data.id}.json/`, this.state.form, {
          headers: {
            "X-CSRFTOKEN": this.props.state.auth.login.csrftoken,
            Authorization: `Bearer ${userOauth.access_token}`,
          },
        })
        .then(({ data }) => {
          this.notifySuccessBounce(data.id);

          let payload = data;

          payload["index"] = this.props.data.index;
          this.setState({blockSubmit: false});

          setTimeout(() => {
            handleSidebar(payload, true);
          }, 1000);
        })
        .catch(({ response }) => {
          this.setState({blockSubmit: false});
          this.setState({ isProcessing: false });
          this.setState({disabled: false});
          
          console.log("Errror", Object.keys(response.data))


          this.notifyErrorBounce("Failed to save Object.");
          this.setState({
            alertFields: Object.keys(response.data) ?? [],
            alertData: response.data,
            showAlert: true
          })
        });
    } else {
      this.setState({ edit_status: true });
    }
  };

  /**
   * Filter and matchs input type and render it's matching components settings as Label if edit satus is disabled
   * @param {*} field
   * @returns
   */
  renderSingleRead = (field) => {
    let res = <></>;
    let { data } = this.state;

    if (field.name === "case_number") {
      return <span key="case_number" />;
    }

    switch (field.type) {
      case "text":
        res = (
          <Col md="6" key={field.name}>
            <Label>
              <strong>{this.translate(field.label)}</strong>
            </Label>

            <p>{this.translate(data[field.name] ?? "None")}</p>
          </Col>
        );
        break;
      case "string":
        if (field["wq:ForeignKey"]) {
          res = (
            <Col md="6" key={field.name}>
              <Label>
                <strong>{this.translate(field.label)}</strong>
              </Label>
              <p>{this.translate(data[`${field.name}_label`] ?? "None")}</p>
            </Col>
          );
        } else {
          if (field["depends_on"]) {
            res = this.checkboxValue(field.depends_on) ? (
              <Col md="6" key={field.name}>
                {this.renderLabel(field)}
                <p>
                  {this.translate(
                    data[`${field.name}_label`] ??
                    data[`${field.name}`] ??
                    "None"
                  )}
                </p>
              </Col>
            ) : (
              <div key={field.name} />
            );
          } else {
            res = (
              <Col md="6" key={field.name}>
                {this.renderLabel(field)}
                <p>{this.translate(data[`${field.name}`] ?? "None")}</p>
              </Col>
            );
          }
        }
        break;
      case "date":
        res = (
          <Col md="6" key={field.name}>
            <Label>
              <strong>{this.translate(field.label)}</strong>
            </Label>
            <p>{this.translate(data[field.name] ?? "None")}</p>
          </Col>
        );
        break;
      case "int":
        if (field["depends_on"]) {
          res = this.checkboxValue(field.depends_on) ? (
            <Col md="6" key={field.name}>
              {this.renderLabel(field)}
              <p>{this.translate(data[`${field.name}`] ?? "None")}</p>
            </Col>
          ) : (
            <div key={field.name} />
          );
        } else {
          res = (
            <Col md="6" key={field.name}>
              {this.renderLabel(field)}
              <p>{this.translate(data[`${field.name}`] ?? "None")}</p>
            </Col>
          );
        }
        break;
      case "select one":
        if (field["has_boolean_options"]) {
          if (field["depends_on"]) {
            res = this.checkboxValue(field.depends_on) ? (
              <Col md="6" key={field.name} className="mb-1">
                {this.renderLabel(field)}
                <p>{this.translate(data[`${field.name}`] ?? "None")}</p>
              </Col>
            ) : (
              <Col md="6" key={field.name} />
            );
          } else {
            res = (
              <Col md="6" key={field.name} className="mb-1">
                {this.renderLabel(field)}
                <p>{this.translate(data[`${field.name}`] ?? "None")}</p>
              </Col>
            );
          }
        } else {
          if (field.depend_on_value) {
            if (
              field.depend_on_value.value.includes(
                this.state.form.get(`${field.depend_on_value.field}_id`)
              )
            ) {
              res = res = (
                <Col md="6" key={field.name}>
                  {this.renderLabel(field)}

                  <p>{this.translate(data[`${field.name}_label`] ?? "None")}</p>
                </Col>
              );
            } else return <Col md="6" key={field.name} />;
          } else {
            if (field["depends_on"]) {
              res = this.checkboxValue(field.depends_on) ? (
                <Col md="6" key={field.name}>
                  {this.renderLabel(field)}
                  <p>{this.translate(data[`${field.name}_label`] ?? "None")}</p>
                </Col>
              ) : (
                <Col md="6" key={field.name} />
              );
            } else {
              res = (
                <Col md="6" key={field.name}>
                  {this.renderLabel(field)}
                  <p>{this.translate(data[`${field.name}_label`] ?? "None")}</p>
                </Col>
              );
            }
          }
        }

        break;

      default:
        res = <div key={field.name}></div>;
        break;
    }

    return res;
  };

  renderFieldAlert = () => {

  const { showAlert, alertData, alertFields } = this.state;
  const { form } = config.pages.lvform;

  return <Alert className="rounded-0" ref="alertFocus" color='danger' isOpen={ showAlert} toggle={() => this.setState({ showAlert: false })}>
      { alertFields?.map((item, index) => {

        const field = form.find(el => el.name === item)
        return (<div className='alert-body' key={index}>
          {`${this.translate(field?.label ?? item )}: ${this.translate(alertData[field?.name ?? item])}` }
        </div>)

      })}
    </Alert>
  }
}

function mapStateToProps(state) {
  return {
    state: state,
    app_reducer: state.app.app_reducer,
    user: state.auth.login.userRole,
  };
}

export default connect(mapStateToProps, { requestDropodowns, requestForm })(
  Edit
);
