import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Col,
  Row,
  Input,
  FormGroup,
  Button,
  CustomInput,
  Label,
  ListGroup,
  ListGroupItem,
} from "reactstrap";

import { toast, Bounce } from "react-toastify";
import { requestDropodowns } from "../../redux/actions/app/actions";

import { axios } from "../../redux/api";

import Modal from "./modal/create";

import { X } from "react-feather";
import PerfectScrollbar from "react-perfect-scrollbar";
import classnames from "classnames";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../../assets/scss/plugins/extensions/editor.scss";
import ModalEdit from "./modal/edit";

import config from "../../data/config";

class Edit extends Component {
  notifySuccessBounce = (id = "") =>
    toast.success(`Object created successfuly!`, { transition: Bounce });

  notifyErrorBounce = (error) =>
    toast.error(error, {
      transition: Bounce,
    });

  state = {
    form: new FormData(),
    isValid: true,
    dropdowns: [],
    childrens: {},
    edit_status: false,
    showModal: false,
    selectedData: {},
    modal_form: "task",
  };

  componentDidMount() {
    this.props.requestDropodowns();
    const { form } = config.pages.lvform;

    const { data } = this.props;

    let formdata = new FormData();

    form.forEach((item) => {
      /**
       * Add all children dropdowns fiels in a map
       */
      if (item["children"]) {
        let childrens = this.state.childrens;
        childrens[item["children"]] = this.getForeignFieldDropdown(
          item["children"]
        );

        this.setState({ childrens });
      }

      formdata.append(
        item["wq:ForeignKey"] ? item.name + "_id" : item.name,
        data[item["wq:ForeignKey"] ? item.name + "_id" : item.name]
      );
    });

    formdata.append("id", data["id"]);

    const { dropdowns } = this.props.app_reducer;
    this.setState({ dropdowns, form: formdata });
  }

  handleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  render() {
    let { show, handleSidebar, data } = this.props;

    return (
      <div
        className={classnames("data-list-sidebar pb-1", {
          show: show,
        })}
      >
        <div className="data-list-sidebar-header bg-primary p-2 d-flex justify-content-between">
          <h4 className="text-white">
            Case No.
            <strong> {String(data.id)}</strong>{" "}
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
            onClick={() => handleSidebar(false, true)}
          />
        </div>
        <PerfectScrollbar
          className="data-list-fields px-2 mt-3"
          options={{ wheelPropagation: false }}
        >
          <div>{this.renderForm()}</div>
        </PerfectScrollbar>
        <div className="data-list-sidebar-footer px-2 d-flex justify-content-start align-items-center mt-1 mb-1">
          {this.renderActions()}
        </div>
      </div>
    );
  }

  renderTasks = () => {
    const { task_set } = this.props.data;

    return (
      <ListGroup flush className="rounded-0">
        {task_set.map((item) => {
          return (
            <ListGroupItem>
              <div className="d-flex justify-content-between w-100">
                <h5 className="mb-1">{item.task_title_label}</h5>
                <small>{item.end_date}</small>
              </div>
              <p className="mb-1">{item.description} </p>
              <small>{item.assignee_label}</small>
            </ListGroupItem>
          );
        })}
      </ListGroup>
    );
  };

  renderComments = () => {
    const { casecomment_set } = this.props.data;
    return (
      <>
        <div className="divider">
          <div className="divider-text"> Case Comments History</div>
        </div>
        <ListGroup flush className="rounded-0">
          {casecomment_set.map((item) => (
            <ListGroupItem>
              <div className="d-flex justify-content-between w-100">
                {/* <h5 className="mb-1">Partner Feedback</h5> */}
                <small></small>
              </div>
              <p className="mb-1">{item.feedback}</p>
              <small>{item.created_by_label}</small>
            </ListGroupItem>
          ))}
        </ListGroup>
      </>
    );
  };
  renderFeedbackComments = () => {
    const { forwardinginstitution } = this.props.data;

    if (forwardinginstitution) {
      // && forwardinginstitution["has_feedback"]) {
      return (
        <>
          <div className="divider">
            <div className="divider-text"> Partner Feedback</div>
          </div>
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
            <ListGroupItem>
              <div className="d-flex justify-content-between w-100">
                <h5 className="mb-1">Partner Feedback</h5>
                <small>{forwardinginstitution.isFeedback_aproved_label}</small>
              </div>
              <p className="mb-1">{forwardinginstitution.partner_feedback} </p>
              <small>{forwardinginstitution.referall_to_label}</small>
            </ListGroupItem>
          </ListGroup>
        </>
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

    let element = <p>No actions Provived</p>;

    switch (userRole) {
      case "manager":
        element = (
          <div>
            <Button
              color={this.state.edit_status ? "primary" : "success"}
              className="mr-1 square"
              onClick={() => this.handleSubmit()}
            >
              {this.state.edit_status ? "Update" : "Edit"}
            </Button>
            {this.state.edit_status ? (
              <Button
                color="danger"
                className="mr-1 square"
                onClick={() => this.setState({ edit_status: false })}
              >
                Cancel
              </Button>
            ) : (
              <>
                <Modal
                  title={`Register form for task`}
                  page="task"
                  label="Task"
                  color="success"
                  lvform_id={data.id}
                />
                <Modal
                  title={`Send to Focal Point`}
                  page="forwardcasetofocalpoint"
                  label="Send"
                  lvform_id={data['id']}
                />
                {/* <Modal
                  title={`Add your feedback`}
                  page="casecomment"
                  label="Feedback"
                  color="secondary"
                /> */}
              </>
            )}
          </div>
        );
        break;
      case "partner":
        element = (
          <div>
            <Modal
              title={`Add your feedback`}
              page="casecomment"
              label="Feedback"
              color="secondary"
              lvform_id={data['id']}
            />
          </div>
        );
        break;

      case "focalpoint":
        element = (
          <div>
            <Button
              color={this.state.edit_status ? "primary" : "success"}
              className="mr-1 square"
              onClick={() => this.handleSubmit()}
            >
              {this.state.edit_status ? "Update" : "Edit"}
            </Button>
            {this.state.edit_status ? (
              <Button
                color="danger"
                className="mr-1 square"
                onClick={() => this.setState({ edit_status: false })}
              >
                Cancel
              </Button>
            ) : (
              <>
                <Modal
                  title={`Send to case to Entity`}
                  page="forwardinginstitution"
                  label="Send"
                />
                <Modal
                  title={`Add your feedback`}
                  page="casecomment"
                  label="Feedback"
                  color="secondary"
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
              color={this.state.edit_status ? "primary" : "success"}
              className="mr-1 square"
              onClick={() => this.handleSubmit()}
            >
              {this.state.edit_status ? "Update" : "Edit"}
            </Button>
            {this.state.edit_status ? (
              <Button
                color="danger"
                className="mr-1 square"
                onClick={() => this.setState({ edit_status: false })}
              >
                Cancel
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
            <Col md="12" className="mt-1 mb-1F">
              <div className="divider">
                <div className="divider-text"> More Details </div>
              </div>
            </Col>
            <Col md="6">{this.renderFeedbackComments()}</Col>
            <Col md="6">
              <strong>Tasks</strong>
              {this.renderTasks()}
            </Col>
            <Col md="12">
              <strong>Othern Comments</strong>
              {this.renderComments()}
            </Col>
          </>
        );
        break;
      case "partner":
        element = (
          <>
            <Col md="12" className="mt-1 mb-1F">
              <div className="divider">
                <div className="divider-text"> More Details </div>
              </div>
            </Col>
            <Col md="6">{this.renderFeedbackComments()}</Col>
            <Col md="12">
              <strong>Comments</strong>
              {this.renderComments()}
            </Col>
            <Col md="6"></Col>
          </>
        );
        break;
      case "focalpoint":
        element = (
          <>
            <Col md="12" className="mt-1 mb-1F">
              <div className="divider">
                <div className="divider-text"> More Details </div>
              </div>
            </Col>
            <Col md="6">
              <strong>Comments</strong>
              {this.renderComments()}
            </Col>
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

  renderForm = () => {
    const form_ = config.pages.lvform;
    return (
      <Row>
        {form_.form.map((field) => this.renderSingleInput(field))}{" "}
        {this.renderDetails()}
      </Row>
    );
  };

  renderSingleInput = (field) => {
    let res = <></>;
    let { data } = this.props;

    switch (field.type) {
      case "text":
        if (field.name === "call_notes") {
          res = (
            <>
              <Col md="6" />
              <Col md="6" key={field.name}>
                <Label>
                  <strong>{field.label}</strong>
                </Label>
                {this.state.edit_status ? (
                  <FormGroup className="form-label-group position-relative has-icon-left">
                    <Input
                      type="textarea"
                      rows={7}
                      className="square"
                      disabled={!this.state.edit_status}
                      placeholder={field.label}
                      defaultValue={data[field.name]}
                      onChange={(e) =>
                        this.updateState(field.name, e.target.value)
                      }
                    />
                    <div className="form-control-position">
                      {/* <Mail size={15} /> */}
                    </div>
                  </FormGroup>
                ) : (
                  <p>{data[field.name]}</p>
                )}
              </Col>
            </>
          );
        } else {
          res = (
            <Col md="6" key={field.name}>
              <Label>
                <strong>{field.label}</strong>
              </Label>

              {this.state.edit_status ? (
                <FormGroup className="form-label-group position-relative has-icon-left">
                  <Input
                    type="textarea"
                    rows={7}
                    className="square"
                    placeholder={field.label}
                    disabled={!this.state.edit_status}
                    defaultValue={data[field.name]}
                    onChange={(e) =>
                      this.updateState(field.name, e.target.value)
                    }
                  />
                  <div className="form-control-position">
                    {/* <Mail size={15} /> */}
                  </div>
                </FormGroup>
              ) : (
                <p>{data[field.name]}</p>
              )}
            </Col>
          );
        }

        break;
      case "string":
        if (field["wq:ForeignKey"]) {
          res = (
            <Col md="6" key={field.name}>
              <Label>
                <strong>{field.label}</strong>
              </Label>

              {this.state.edit_status ? (
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
                        this.updateChildrenList(field, e.target.value);
                      }
                    }}
                  >
                    <option>Select</option>

                    {field["has_parent"] === undefined
                      ? this.renderSelectOptionForeignWQ(
                          this.getForeignFieldDropdown(field["wq:ForeignKey"])
                        )
                      : this.renderSelectOptionForeignWQ(
                          this.state.childrens[field["wq:ForeignKey"]] ?? []
                        )}
                  </CustomInput>
                </FormGroup>
              ) : (
                <p>{data[`${field.name}_label`]}</p>
              )}
            </Col>
          );
        } else {
          res = (
            <Col md="6" key={field.name}>
              <Label>
                <strong>{field.label}</strong>
              </Label>
              {this.state.edit_status ? (
                <FormGroup className="form-label-group position-relative has-icon-left">
                  <Input
                    type="text"
                    className="square"
                    placeholder={field.label}
                    disabled={!this.state.edit_status}
                    defaultValue={data[`${field.name}`]}
                    onChange={(e) =>
                      this.updateState(field.name, e.target.value)
                    }
                  />
                  <div className="form-control-position">
                    {/* <Mail size={15} /> */}
                  </div>
                </FormGroup>
              ) : (
                <p>{data[`${field.name}`]}</p>
              )}
            </Col>
          );
        }
        break;
      case "date":
        res = (
          <Col md="6" key={field.name}>
            <Label>
              <strong>{field.label}</strong>
            </Label>
            {this.state.edit_status ? (
              <FormGroup className="form-label-group position-relative has-icon-left">
                <Input
                  type="date"
                  className="square"
                  defaultValue={data[field.name]}
                  disabled={!this.state.edit_status}
                  placeholder={field.label}
                  onChange={(e) => this.updateState(field.name, e.target.value)}
                />
                <div className="form-control-position">
                  {/* <Mail size={15} /> */}
                </div>
              </FormGroup>
            ) : (
              <p>{data[`${field.name}`]}</p>
            )}
          </Col>
        );
        break;
      case "int":
        res = (
          <Col md="6" key={field.name}>
            <Label>
              <strong>{field.label}</strong>
            </Label>
            {this.state.edit_status ? (
              <FormGroup className="form-label-group position-relative has-icon-left">
                <Input
                  type="number"
                  className="square"
                  placeholder={field.label}
                  disabled={!this.state.edit_status}
                  defaultValue={data[field.name]}
                  onChange={(e) => this.updateState(field.name, e.target.value)}
                />
                <div className="form-control-position">
                  {/* <Mail size={15} /> */}
                </div>
              </FormGroup>
            ) : (
              <p>{data[`${field.name}`]}</p>
            )}
          </Col>
        );
        break;
      case "select one":
        //`${field.name}_label`
        res = (
          <Col md="6" key={field.name}>
            <Label>
              <strong>{field.label}</strong>
            </Label>
            {this.state.edit_status ? (
              <FormGroup className="form-label-group position-relative has-icon-left">
                <CustomInput
                  className="square"
                  type="select"
                  id={field.name}
                  placeholder={field.label}
                  disabled={!this.state.edit_status}
                  defaultValue={data[field.name]}
                  onChange={(e) => this.updateState(field.name, e.target.value)}
                >
                  <option>Select</option>
                  {this.renderSelectOption(field.choices)}
                </CustomInput>
              </FormGroup>
            ) : (
              <p>{data[`${field.name}_label`]}</p>
            )}
          </Col>
        );
        break;

      default:
        res = <div key={field.name}></div>;
        break;
    }

    return res;
  };

  renderSelectOption = (choices) => {
    return choices.map((item) => (
      <option key={item.name} value={item.name}>
        {item.label}
      </option>
    ));
  };

  renderSelectOptionForeignWQ = (choices) => {
    return choices.map((item) => (
      <option key={item.id} value={item.id}>
        {item.label}
      </option>
    ));
  };

  getForeignFieldDropdown = (field_name) => {
    return this.props.app_reducer.dropdowns[field_name] ?? [];
  };

  /**
   * Update each dynamic field state value
   * @param {*} field_name
   * @param {*} value
   */
  updateState = (field_name, value) => {
    let form = this.state.form;

    if (value !== "") {
      if (form.has(field_name)) {
        form.set(field_name, value);
      } else {
        form.append(field_name, value);
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
    const res = this.state.dropdowns[field["wq:ForeignKey"]].filter((item) => {
      return Number(item.id) === Number(value);
    });
    childrens[field.children] = res[0][`${field.children}_set`];

    this.setState({ childrens });
  };

  /**
   * Submits the form to post request action
   */
  handleSubmit = () => {
    if (this.state.edit_status) {
      let { handleSidebar } = this.props;
      const { userOauth } = this.props.state.auth.login;

      this.setState({ isValid: true });
      axios
        .put(`lvforms/${this.props.data.id}.json/`, this.state.form, {
          headers: {
            "X-CSRFTOKEN": this.props.state.auth.login.csrftoken,
            Authorization: `Bearer ${userOauth.access_token}`,
          },
        })
        .then(({ data }) => {
          this.notifySuccessBounce(data.id);

          setTimeout(() => {
            handleSidebar(false, true);
          }, 1000);
        })
        .catch((error) => {
          this.notifyErrorBounce("Failed to save Object.");
        });
    } else {
      this.setState({ edit_status: true });
    }
  };
}

function mapStateToProps(state) {
  return {
    state: state,
    app_reducer: state.app.app_reducer,
    user: state.auth.login.userRole,
  };
}

export default connect(mapStateToProps, { requestDropodowns })(Edit);
