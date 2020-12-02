import React from "react";
import { connect } from "react-redux";
import { toast, Bounce } from "react-toastify";

import { axios } from "../../redux/api";
import {
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
class Page2 extends React.Component {
  notifySuccessBounce = (id = "") =>
    toast.success(`Object created successfuly!`, { transition: Bounce });

  notifyErrorBounce = (error) =>
    toast.error(error, {
      transition: Bounce,
    });

  state = {
    form: new FormData(),
  };
  componentDidMount() {
    // console.log(this.props.state.auth.login.config.pages.lvform);
  }

  updateState = (field_name, value) => {
    let form = this.state.form;

    if (form.has(field_name)) {
      form.set(field_name, value);
    } else {
      form.append(field_name, value);
    }

    this.setState({ form });

    console.log(form);
  };

  handleSubmit = () => {
    axios
      .post("lvforms.json", this.state.form)
      .then(({ data }) => {
        console.log(data);
        this.notifySuccessBounce(data.id);
      })
      .catch((error) => {
        this.notifyErrorBounce("Failed to save Object.");
        console.log(error);
      });
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

        {form_.form.map((field) => this.renderSingleInput(field))}

        <Col>
          <div className="d-flex justify-content-between">
            <div />
            <Button.Ripple
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
                // defaultValue={this.state.email}
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

export default connect(mapStateToProps, {})(Page2);
