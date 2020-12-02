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
    const form_ = this.props.state.auth.login.config.pages.lvform.form;
    return <Row>{form_.map((field) => this.renderSingleInput(field))}</Row>;
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
    return <div>{this.renderForm()}</div>;
  }
}

function mapStateToProps(state) {
  return {
    state: state,
  };
}

export default connect(mapStateToProps, {})(Page2);
