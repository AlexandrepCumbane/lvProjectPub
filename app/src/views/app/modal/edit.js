import React from "react";
import { connect } from "react-redux";
import { toast, Bounce } from "react-toastify";
import { requestDropodowns } from "../../../redux/actions/app/actions";

import { axios } from "../../../redux/api";
import {
  Alert,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  FormGroup,
  CustomInput,
  Input,
  Label,
  Spinner,
} from "reactstrap";
import { IntlContext } from "../../../i18n/provider";
import config from "../../../data/config";

import CreateModal from "./create";
class Edit extends React.Component {
  static contextType = IntlContext;
  translate = this.context.translate;
  notifySuccessBounce = (id = "") =>
    toast.success(this.translate(`Transaction completed successfuly.`), {
      transition: Bounce,
    });

  notifyErrorBounce = (error) =>
    toast.error(error, {
      transition: Bounce,
    });

  state = {
    modal: this.props.modal ?? false,
    unmountOnClose: true,

    form: new FormData(),
    required_fields: [],
    required_fields_labels: [],
    isValid: true,
    dropdowns: [],
    commentsShow: false,
  };

  componentDidMount() {
    const { form } = config.pages[this.props.page];
    const { data } = this.props;

    console.log(data);
    let formdata = new FormData();

    form.forEach((item) => {
      formdata.append(
        item["wq:ForeignKey"] ? item.name + "_id" : item.name,
        data[item["wq:ForeignKey"] ? item.name + "_id" : item.name]
      );
    });

    if (
      this.props.user === "partner" &&
      this.props.page === "forwardinginstitution"
    ) {
      this.updateState("has_feedback", true);
    }

    if (this.props.page === "customuser") {
      formdata.append("groups_id", data["groups"][0]);
    }

    formdata.append("id", data["id"]);

    const { dropdowns } = this.props.app_reducer;
    this.setState({ dropdowns, form: formdata });
  }

  render() {
    return (
      <>
        {this.props.disabled ? (
          <></>
        ) : (
          <Button
            color={`${this.props.color ?? "warning"}`}
            className="square mr-1"
            outline
            onClick={this.props.toggleModal}
          >
            {this.translate(this.props.label)}
          </Button>
        )}
        <Modal
          isOpen={this.state.modal}
          toggle={this.props.toggleModal}
          className={`${this.props.className} square`}
          unmountOnClose={this.state.unmountOnClose}
        >
          <ModalHeader toggle={this.props.toggleModal}>
            {this.translate(this.props.title)}
          </ModalHeader>

          <ModalBody>{this.renderForm()}</ModalBody>

          <ModalFooter>
            {this.props.page === "task" ? (
              <CreateModal
                title={this.translate(`Comment Your task`)}
                page="taskcomment"
                label={this.translate("Comment")}
                color="warning"
                task_id={this.props.data["id"]}
              />
            ) : (
              <></>
            )}
            {this.props.page === "forwardinginstitution" &&
            this.props.userRole === "manager" ? (
              <CreateModal
                title={this.translate(`Add new task`)}
                page="task"
                label={this.translate("Task")}
                lvform_id={this.props.data["lvform_id"]}
                description={this.props.data["partner_feedback"]}
                color="warning"
              />
            ) : (
              <></>
            )}
            <Button
              color="primary"
              className="square"
              onClick={() => this.handleSubmit()}
            >
              {this.state.isLoading ? (
                <Spinner className="mr-1" color="white" size="sm" type="grow" />
              ) : (
                <></>
              )}
              {this.translate("Submit")}
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }

  /**
   * Action and helper functions
   */

  renderForm = () => {
    const form_ = config.pages[this.props.page];
    return (
      <Row>
        <Col md="12">
          {this.state.isValid && this.state.required_fields.length === 0 ? (
            <></>
          ) : (
            <Alert color="danger" className="square">
              <Label className="text-danger">
                {`${this.translate("All these fields are required")} `}
                {this.state.required_fields_labels.map((item, index) => (
                  <strong key={index}>{this.translate(item)}, </strong>
                ))}
              </Label>
            </Alert>
          )}
        </Col>

        {form_.form.map((field) => this.renderSingleInput(field))}
      </Row>
    );
  };

  renderSingleInput = (field) => {
    let res = <></>;
    let { data } = this.props;


    
    if (field.name === "lvform" || field.name ==="cluster_agency" || field.name === "cluster_region" || field.name === "referall_to" || field.name === "cluster_sector") {
      return <span key={field.name} />;
    }

    switch (field.type) {
      case "text":
        res = (
          <Col md="12" key={field.name}>
            <Label>{this.translate(field.label)}</Label>
            <FormGroup className="form-label-group position-relative has-icon-left">
              <Input
                type="textarea"
                rows={5}
                className="square"
                disabled={
                  (field.name === "partner_feedback" &&
                    (this.props.user === "focalpoint" ||
                      this.props.user === "manager")) ||
                  (field.name === "task_feedback" &&
                    (this.props.user === "partner" ||
                      this.props.user === "manager")) ||
                  (field.name === "description" &&
                    this.props.user === "operator")
                }
                defaultValue={data[field.name]}
                placeholder={this.translate(field.label)}
                onChange={(e) => this.updateState(field.name, e.target.value)}
              />
            </FormGroup>
          </Col>
        );

        break;
      case "string":
        res = (
          <Col md="12" key={field.name}>
            <Label>{this.translate(field.label)}</Label>

            <FormGroup className="form-label-group position-relative has-icon-left">
              <CustomInput
                className="square"
                type="select"
                id={field.name}
                defaultValue={data[`${field.name}_id`]}
                placeholder={this.translate(field.label)}
                disabled={
                  (field.name === "referall_to" &&
                    (this.props.user === "partner" ||
                      this.props.user === "manager")) ||
                  field.name === "assignee"
                }
                onChange={(e) =>
                  this.updateState(`${field.name}_id`, e.target.value)
                }
              >
                <option>{this.translate(field.label)}</option>
                {this.renderSelectOptionForeignWQ(
                  this.getForeignFieldDropdown(field["wq:ForeignKey"])
                )}
              </CustomInput>
            </FormGroup>
          </Col>
        );

        if (field["wq:ForeignKey"]) {
          res = (
            <Col key={field.name}>
              <Label>
                <strong> {this.translate(field.label)}</strong>
              </Label>

              <FormGroup className="form-label-group position-relative has-icon-left">
                <CustomInput
                  className="square"
                  type="select"
                  id={field.name}
                  defaultValue={
                    field.name === "groups"
                      ? data["groups"][0]
                      : data[`${field.name}_id`]
                  }
                  disabled={
                    (field.name === "referall_to" &&
                      (this.props.user === "partner" ||
                        this.props.user === "manager")) ||
                    field.name === "assignee"
                  }
                  onChange={(e) => {
                    this.updateState(`${field.name}_id`, e.target.value);
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
          res = (
            <Col md="12" key={field.name}>
              <Label>
                <strong>{field.label}</strong>
              </Label>
              <FormGroup className="form-label-group position-relative has-icon-left">
                <Input
                  type="text"
                  className="square"
                  placeholder={field.label}
                  defaultValue={data[`${field.name}`]}
                  onChange={(e) => this.updateState(field.name, e.target.value)}
                />
                <div className="form-control-position">
                  {/* <Mail size={15} /> */}
                </div>
              </FormGroup>
            </Col>
          );
        }

        break;
      case "date":
        res = (
          <Col md="6" key={field.name}>
            <Label>{this.translate(field.label)}</Label>

            <FormGroup className="form-label-group position-relative has-icon-left">
              <Input
                type="date"
                className="square"
                defaultValue={data[field.name]}
                placeholder={this.translate(field.label)}
                onChange={(e) => this.updateState(field.name, e.target.value)}
              />
              <div className="form-control-position">
                {/* <Mail size={15} /> */}
              </div>
            </FormGroup>
          </Col>
        );
        break;
      case "int":
        res = (
          <Col md="12" key={field.name}>
            <Label>{this.translate(field.label)}</Label>
            <FormGroup className="form-label-group position-relative has-icon-left">
              <Input
                type="number"
                className="square"
                defaultValue={data[field.name]}
                placeholder={this.translate(field.label)}
                // defaultValue={this.state.email}
                onChange={(e) => this.updateState(field.name, e.target.value)}
              />
              <div className="form-control-position">
                {/* <Mail size={15} /> */}
              </div>
            </FormGroup>
          </Col>
        );
        break;
      case "select one":
        if (field.name === "has_feedback") {
          res = <div key={field.name} />;
        } else {
          res = (
            <Col md="12" key={field.name}>
              <Label>{field.label}</Label>
              <FormGroup className="form-label-group position-relative has-icon-left">
                <CustomInput
                  className="square"
                  type="select"
                  defaultValue={data[field.name]}
                  id={field.name}
                  disabled={
                    (field.name === "isFeedback_aproved" &&
                      (this.props.user === "partner" ||
                        this.props.user === "manager")) ||
                    (field.name === "referall_to" &&
                      (this.props.user === "partner" ||
                        this.props.user === "manager"))
                  }
                  placeholder={field.label}
                  onChange={(e) => this.updateState(field.name, e.target.value)}
                >
                  <option>{this.translate("Select")}</option>
                  {this.renderSelectOption(field.choices)}
                </CustomInput>
              </FormGroup>
            </Col>
          );
        }

        break;

      default:
        res = <div key={field.name}></div>;
        break;
    }

    return res;
  };

  toggleModal = () => {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));
  };

  changeUnmountOnClose = (e) => {
    let value = e.target.value;
    this.setState({ unmountOnClose: JSON.parse(value) });
  };

  renderSelectOption = (choices) => {
    return choices.map((item) => (
      <option key={item.name} value={item.name}>
        {this.translate(item.label)}
      </option>
    ));
  };

  renderSelectOptionForeignWQ = (choices) => {
    return choices.map((item) => (
      <option key={item.id} value={item.id}>
        {this.translate(item.label)}
      </option>
    ));
  };

  getForeignFieldDropdown = (field_name) => {
    return this.props.app_reducer.dropdowns[field_name] ?? [];
  };

  /**
   * Add all fields and add the required fields into an array
   * @param {*} field
   */
  addToRequired(field) {
    const index = this.state.required_fields.indexOf(field.name);

    if (field.bind !== undefined) {
      if (field.bind.required === true && index <= 0) {
        if (field.type === "string") {
          this.state.required_fields.push(`${field.name}_id`);
        } else this.state.required_fields.push(field.name);
        this.state.required_fields_labels.push(field.label);
      }
    }
  }

  /**
   * Remove field from required array if is the value is not null
   * @param {*} field
   */
  removeFromRequired(field) {
    const index = this.state.required_fields.indexOf(field);
    if (index >= 0) {
      this.state.required_fields.splice(index, 1);
      this.state.required_fields_labels.splice(index, 1);
    }
  }

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

      this.removeFromRequired(field_name);
    }

    this.setState({ form });
  };

  /**
   * Submits the form to post request action
   */
  handleSubmit = () => {
    const { userOauth } = this.props.state.auth.login;
    if (this.state.required_fields.length > 0) {
      this.notifyErrorBounce(this.translate("Fill all required inputs"));
      this.setState({ isValid: false });
    } else {
      this.setState({ isValid: true, isLoading: true });
      const url = this.props.page === "customuser" ? "user" : this.props.page;
      axios
        .put(`${url}s/${this.props.data.id}.json`, this.state.form, {
          headers: {
            "X-CSRFTOKEN": this.props.state.auth.login.csrftoken,
            Authorization: `Bearer ${userOauth.access_token}`,
          },
        })
        .then(({ data }) => {
          this.notifySuccessBounce(data.id);
          setTimeout(() => {
            this.props.toggleModal();
          }, 1000);
        })
        .catch((error) => {
          this.setState({ isLoading: false });
          this.notifyErrorBounce(this.translate("Transaction process failed"));
        });
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
