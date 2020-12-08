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
} from "reactstrap";

import { toast, Bounce } from "react-toastify";
import {
  requestForm,
  requestDropodowns,
} from "../../redux/actions/app/actions";

import { axios } from "../../redux/api";

import { X } from "react-feather";
import PerfectScrollbar from "react-perfect-scrollbar";
import classnames from "classnames";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../../assets/scss/plugins/extensions/editor.scss";

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
  };
  componentDidMount() {
    this.props.requestDropodowns();
    this.props.requestForm();

    const { form } = this.props.state.auth.login.config.pages.lvform;

    const { dropdowns } = this.props.app_reducer;
    this.setState({ dropdowns });
  }

  render() {
    let { show, handleSidebar, data } = this.props;

    console.log(data);
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
          <small className="text-white">
            <u className="text-secondary">
              Criado aos{" "}
              <strong>
                {"  "}
                {/* {moment(data.created_at).format("YYYY-MM-DD")} */}
              </strong>
              {"  "}
              por{" "}
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
          <Button color="primary" className="mr-1 square">
            Update
          </Button>
        </div>
      </div>
    );
  }
  /**
   * Action and helper functions
   */

  renderForm = () => {
    const form_ = this.props.state.auth.login.config.pages.lvform;
    return (
      <Row>{form_.form.map((field) => this.renderSingleInput(field))}</Row>
    );
  };

  renderSingleInput = (field) => {
    let res = <></>;
    let { data } = this.props;

    switch (field.type) {
      case "text":
        res = (
          <Col md="6" key={field.name}>
            <Label>{field.label}</Label>

            <FormGroup className="form-label-group position-relative has-icon-left">
              <Input
                type="text"
                className="square"
                defaultValue={data[field.name]}
                placeholder={field.label}
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
          <Col md="6" key={field.name}>
            <Label>{field.label}</Label>

            <FormGroup className="form-label-group position-relative has-icon-left">
              <CustomInput
                className="square"
                type="select"
                id={field.name}
                defaultValue={data[`${field.name}_id`]}
                placeholder={field.label}
                onChange={(e) =>
                  this.updateState(`${field.name}_id`, e.target.value)
                }
              >
                <option>Select</option>
                {this.renderSelectOptionForeignWQ(
                  this.getForeignFieldDropdown(field["wq:ForeignKey"])
                )}
              </CustomInput>
            </FormGroup>
          </Col>
        );
        break;
      case "date":
        res = (
          <Col md="6" key={field.name}>
            <Label>{field.label}</Label>

            <FormGroup className="form-label-group position-relative has-icon-left">
              <Input
                type="date"
                className="square"
                defaultValue={data[field.name]}
                placeholder={field.label}
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
          <Col md="6" key={field.name}>
            <Label>{field.label}</Label>
            <FormGroup className="form-label-group position-relative has-icon-left">
              <Input
                type="number"
                className="square"
                placeholder={field.label}
                defaultValue={data[field.name]}
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
          <Col md="6" key={field.name}>
            <Label>{field.label}</Label>
            <FormGroup className="form-label-group position-relative has-icon-left">
              <CustomInput
                className="square"
                type="select"
                id={field.name}
                placeholder={field.label}
                defaultValue={data[field.name]}
                onChange={(e) => this.updateState(field.name, e.target.value)}
              >
                <option>Select</option>
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

    if (value != "") {
      if (form.has(field_name)) {
        form.set(field_name, value);
      } else {
        form.append(field_name, value);
      }
    }

    this.setState({ form });
  };

  /**
   * Submits the form to post request action
   */
  handleSubmit = () => {
    this.setState({ isValid: true });
    axios
      .put("lvforms.json", this.state.form)
      .then(({ data }) => {
        this.notifySuccessBounce(data.id);
      })
      .catch((error) => {
        this.notifyErrorBounce("Failed to save Object.");
      });
  };
}

function mapStateToProps(state) {
  return {
    state: state,
    app_reducer: state.app.app_reducer,
  };
}

export default connect(mapStateToProps, { requestForm, requestDropodowns })(
  Edit
);
