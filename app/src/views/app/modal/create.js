import React from "react";
import { connect } from "react-redux";
import { toast, Bounce } from "react-toastify";
import Select from "react-select";
import makeAnimated from "react-select/animated";

import { requestDropodowns } from "../../../redux/actions/app/actions";

import config from "../../../data/config";
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
import { IntlContext } from "../../../i18n";

class Create extends React.Component {
  static contextType = IntlContext;
  translate = this.context.translate;
  animatedComponents = makeAnimated();

  notifySuccessBounce = (id = "") =>
    toast.success(this.translate(`Transaction completed successfuly!`), {
      transition: Bounce,
    });

  notifyErrorBounce = (error) =>
    toast.error(error, {
      transition: Bounce,
    });

  multipleSelect = (list) =>
    list.map((item) => {
      return {
        value: item.id,
        label: this.translate(item.label),
        color: "#4287f5",
      };
    });

  state = {
    modal: false,
    unmountOnClose: true,

    form: new FormData(),
    required_fields: [],
    required_fields_labels: [],
    isValid: true,
    dropdowns: [],
    childrens: {},
  };
  componentDidMount() {
    this.updateState("lvform_id", this.props.lvform_id);

    let formdata = new FormData();

    if (this.props.description) {
      formdata.append("description", this.props["description"]);
    }
    if (this.props.feedback) {
      formdata.append("feedback", this.props["feedback"]);
    }

    formdata.append("lvform_id", this.props.lvform_id);
    formdata.append("task_id", this.props.task_id);

    this.setState({ form: formdata, modal: this.props.modal ?? false });
    const { dropdowns } = this.props.app_reducer;
    this.setState({ dropdowns });
  }

  /**
   * Dynimically places the nested fields into it's relative
   * @param {*} field
   * @param {*} value
   */
  updateChildrenList = (field, value) => {
    let childrens = this.state.childrens;
    let res = [];
    if (field.has_parent) {
      res = this.state.childrens[field["wq:ForeignKey"]].filter((item) => {
        return Number(item.id) === Number(value.value);
      });
      childrens[field.children] = res[0][`${field.children}`];
      this.setState({ childrens });
    } else {
      res = this.props.app_reducer.dropdowns[field["wq:ForeignKey"]].filter(
        (item) => {
          return Number(item.id) === Number(value.value);
        }
      );

      childrens[field.children] = res[0][`${field.children}`];
      this.setState({ childrens });
    }
  };

  render() {
    return (
      <>
        {this.props.hideButton ? (
          <></>
        ) : (
          <Button
            color={`${this.props.color ?? "warning"}`}
            className="square mr-1"
            outline
            onClick={this.toggleModal}
          >
            {this.translate(this.props.label)}
          </Button>
        )}

        <Modal
          isOpen={this.state.modal}
          toggle={this.toggleModal}
          className={`${this.props.className} square`}
          unmountOnClose={this.state.unmountOnClose}
        >
          <ModalHeader toggle={this.toggleModal}>
            {this.translate(this.props.title)}
          </ModalHeader>

          <ModalBody>{this.renderForm()}</ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              className="square"
              // onClick={() => this.handleSubmit()}
              onClick={() =>
                this.context.sendNotification("Loram", "task", "USER")
              }
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
                {this.translate(
                  `${this.translate("All these fields are required")} `
                )}
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

    if (
      field.name === "lvform" ||
      field.name === "task" ||
      field.name === "has_feedback" ||
      field.name === "partner_feedback" ||
      field.name === "call_attempts" ||
      field.name === "isFeedback_aproved"
    ) {
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
                placeholder={this.translate(field.label)}
                defaultValue={
                  this.props["description"] ??
                  this.props["feedback" ?? undefined]
                }
                onChange={(e) => this.updateState(field.name, e.target.value)}
              />
              <div className="form-control-position">
                {/* <Mail size={15} /> */}
              </div>
            </FormGroup>
          </Col>
        );

        break;
      case "string":
        res = (
          <Col md="12" key={field.name}>
            <Label>{this.translate(field.label)}</Label>

            <FormGroup className="form-label-group position-relative has-icon-left">
              <Select
                className="rounded-0"
                onChange={(e) => {
                  this.updateState(`${field.name}_id`, e.value);
                  if (field["children"]) {
                    this.updateChildrenList(field, e);
                  }
                }}
                components={this.animatedComponents}
                options={this.multipleSelect(
                  field["has_parent"] === undefined
                    ? this.getForeignFieldDropdown(field["wq:ForeignKey"])
                    : this.state.childrens[field["wq:ForeignKey"]] ?? []
                )}
              />
            </FormGroup>
          </Col>
        );

        break;
      case "date":
        res = (
          <Col md="6" key={field.name}>
            <Label>{this.translate(field.label)}</Label>

            <FormGroup className="form-label-group position-relative has-icon-left">
              <Input
                type="date"
                className="square"
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
        res = (
          <Col md="12" key={field.name}>
            <Label>{this.translate(field.label)}</Label>
            <FormGroup className="form-label-group position-relative has-icon-left">
              <CustomInput
                className="square"
                type="select"
                id={field.name}
                placeholder={this.translate(field.label)}
                onChange={(e) => this.updateState(field.name, e.target.value)}
              >
                <option>{this.translate("Select")}</option>
                {this.renderSelectOption(field.choices)}
              </CustomInput>
            </FormGroup>
          </Col>
        );
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

      const url =
        this.props.page === "agencypartner" ||
        this.props.page === "agencyfocalpoint"
          ? `/users/0/${this.props.page}`
          : `${this.props.page}s/`;
      axios
        .post(url, this.state.form, {
          headers: {
            Authorization: `Bearer ${userOauth.access_token}`,
          },
        })
        .then(({ data }) => {
          this.notifySuccessBounce(data.id);
          this.setState({ isLoading: false });

          if (this.props.addMore) {
            this.props.addMore(data);
          }

          setTimeout(() => {
            this.toggleModal();
          }, 1000);
        })
        .catch(({ response }) => {
          this.setState({ isLoading: false });
          this.notifyErrorBounce(
            this.translate(
              response.data?.description ?? "Failed to save Object."
            )
          );
        });
    }
  };
}

function mapStateToProps(state) {
  return {
    state: state,
    app_reducer: state.app.app_reducer,
  };
}

export default connect(mapStateToProps, { requestDropodowns })(Create);
