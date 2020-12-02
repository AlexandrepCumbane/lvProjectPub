import React from "react";
import { connect } from "react-redux";
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
  componentDidMount() {
    console.log(this.props.state.auth.login.config.pages.lvform);
  }

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
                // defaultValue={this.state.email}
                // onChange={(e) => this.setState({ username: e.target.value })}
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
                // defaultValue={this.state.email}
                // onChange={(e) => this.setState({ username: e.target.value })}
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
                // onChange={(e) => this.setState({ username: e.target.value })}
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
                // onChange={(e) => this.setState({ username: e.target.value })}
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
