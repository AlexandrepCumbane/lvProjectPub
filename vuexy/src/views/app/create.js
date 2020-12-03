import React from "react";
import { connect } from "react-redux";
import { toast, Bounce } from "react-toastify";

import { axios } from "../../redux/api";
import {
  Alert,
  Button,
  Card,
  CardBody,
  Row,
  Col,
  Form,
  FormGroup,
  CustomInput,
  Input,
  Label,
} from "reactstrap";
class Create extends React.Component {
  notifySuccessBounce = (id = "") =>
    toast.success(`Object created successfuly!`, { transition: Bounce });

  notifyErrorBounce = (error) =>
    toast.error(error, {
      transition: Bounce,
    });

  state = {
    form: new FormData(),
    required_fields: [],
    required_fields_labels: [],
    isValid: true,
  };
  componentDidMount() {
    const { form } = this.props.state.auth.login.config.pages.lvform;
    form.forEach((item, index) => this.addToRequired(item));
  }

  addToRequired(field) {
    const index = this.state.required_fields.indexOf(field.name);

    if (field.bind != undefined) {
      if (field.bind.required == true && index <= 0) {
        this.state.required_fields.push(field.name);
        this.state.required_fields_labels.push(field.label);
      }
    }
  }

  removeFromRequired(field) {
    const index = this.state.required_fields.indexOf(field);
    if (index >= 0) {
      this.state.required_fields.splice(index, 1);
      this.state.required_fields_labels.splice(index, 1);
    }
  }

  updateState = (field_name, value) => {
    let form = this.state.form;

    if (value != "") {
      if (form.has(field_name)) {
        form.set(field_name, value);
      } else {
        form.append(field_name, value);
      }

      this.removeFromRequired(field_name);
    }

    this.setState({ form });
  };

  handleSubmit = () => {
    if (this.state.required_fields.length > 0) {
      this.notifyErrorBounce("Fill all required inputs");
      this.setState({ isValid: false });
    } else {
      this.setState({ isValid: true });
      axios
        .post("lvforms.json", this.state.form)
        .then(({ data }) => {
          this.notifySuccessBounce(data.id);
        })
        .catch((error) => {
          this.notifyErrorBounce("Failed to save Object.");
        });
    }
  };

  renderForm = () => {
    const form_ = this.props.state.auth.login.config.pages.lvform;
    return (
      <Row>
        <Col md="12">
          <h4>Register form for: {form_.verbose_name}</h4>
          <p>{form_.verbose_name}.</p>
          <hr />
        </Col>
        <Col md="12">
          {this.state.isValid && this.state.required_fields.length == 0 ? (
            <></>
          ) : (
            <Alert color="danger" className="square">
              <Label className="text-danger">
                All these fields are required{" "}
                {this.state.required_fields_labels.map((item, index) => (
                  <strong key={index}>{item}, </strong>
                ))}
              </Label>
            </Alert>
          )}
        </Col>

        {form_.form.map((field) => this.renderSingleInput(field))}

        <Col md="12">
          <div className="d-flex justify-content-between">
            <div />
            <Button.Ripple
              className="square"
              color="primary"
              type="submit"
              onClick={(e) => this.handleSubmit()}
            >
              Submit
            </Button.Ripple>
          </div>
        </Col>
      </Row>
    );
  };

  renderSingleInput = (field) => {
    let res = <></>;

    switch (field.type) {
      case "text":
        res = (
          <Col md="6" key={field.name}>
            <Label>{field.label}</Label>

            <FormGroup className="form-label-group position-relative has-icon-left">
              <Input
                type="text"
                className="square"
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
      case "date":
        res = (
          <Col md="6">
            <Label>{field.label}</Label>

            <FormGroup className="form-label-group position-relative has-icon-left">
              <Input
                type="date"
                className="square"
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
          <Col md="6">
            <Label>{field.label}</Label>
            <FormGroup className="form-label-group position-relative has-icon-left">
              <Input
                type="number"
                className="square"
                placeholder={field.label}
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
          <Col md="6">
            <Label>{field.label}</Label>
            <FormGroup className="form-label-group position-relative has-icon-left">
              <CustomInput
                className="square"
                type="select"
                id={field.name}
                placeholder={field.label}
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
        res = <></>;
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
  render() {
    return (
      <div>
        <Card className="rounded-0 mb-0 px-2">
          <CardBody>{this.renderForm()}</CardBody>{" "}
        </Card>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    state: state,
  };
}

export default connect(mapStateToProps, {})(Create);
