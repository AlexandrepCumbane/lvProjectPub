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
  Input,
  Label,
} from "reactstrap";
import { Mail, Lock, Check } from "react-feather";
import {
  requestLogin,
  requestToken,
} from "../../../../redux/actions/auth/loginActions";

import { AuthService } from "../../../../redux/oidc-config/services/authservice";
import Checkbox from "../../../../components/@vuexy/checkbox/CheckboxesVuexy";
import "../../../../assets/scss/pages/authentication.scss";

import { history } from "../../../../history";

class Login extends React.Component {
  state = {
    activeTab: "1",
    email: "",
    password: "",
    username: "",
    csrf: "",
  };

  authService = new AuthService();

  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  };

  componentDidMount() {
    this.props.requestToken();
  }

  submit = (e) => {
    e.preventDefault();

    var bodyFormData = new FormData();
    bodyFormData.append("username", this.state.username);
    bodyFormData.append("password", this.state.password);
    bodyFormData.append(
      "csrfmiddlewaretoken",
      this.props.state.auth.login.csrftoken
    );

    this.props.requestLogin(bodyFormData).then(() => {
      if (this.props.auth_state.success) history.push("/lvforms");
      else {
        alert("Wrong Credentials combination");
      }
    });
  };

  login = (e) => {
    e.preventDefault();
    this.authService.login();
  };

  render() {
    return (
      <Row className="m-0 justify-content-center">
        <Col
          sm="8"
          xl="7"
          lg="10"
          md="8"
          className="d-flex justify-content-center"
        >
          <Card className="bg-authentication login-card rounded-0 mb-0 w-100">
            <Row className="m-0">
              <Col
                lg="6"
                className="d-lg-block d-none text-center align-self-center px-1 py-0"
              >
                {/* <img src={loginImg} alt="loginImg" /> */}
              </Col>
              <Col lg="6" md="12" className="p-0">
                <Card className="rounded-0 mb-0 px-2">
                  <CardBody>
                    <h4>Login</h4>
                    <p>Welcome back, please login to your account.</p>
                    <Form onSubmit={(e) => e.preventDefault()}>
                      <FormGroup className="form-label-group position-relative has-icon-left">
                        <Input
                          type="text"
                          placeholder="Email"
                          autoComplete="false"
                          defaultValue={this.state.email}
                          onChange={(e) =>
                            this.setState({ username: e.target.value })
                          }
                        />
                        <div className="form-control-position">
                          <Mail size={15} />
                        </div>
                        <Label>Email</Label>
                      </FormGroup>
                      <FormGroup className="form-label-group position-relative has-icon-left">
                        <Input
                          type="password"
                          placeholder="Password"
                          autoComplete="false"
                          defaultValue={this.state.password}
                          onChange={(e) =>
                            this.setState({ password: e.target.value })
                          }
                        />
                        <div className="form-control-position">
                          <Lock size={15} />
                        </div>
                        <Label>Password</Label>
                      </FormGroup>
                      <FormGroup className="d-flex justify-content-between align-items-center">
                        <Checkbox
                          color="primary"
                          icon={<Check className="vx-icon" size={16} />}
                          label="Remember me"
                        />
                        <div className="float-right">Forgot Password?</div>
                      </FormGroup>
                      <div className="d-flex justify-content-between">
                        <div />
                        <Button.Ripple
                          color="primary"
                          type="submit"
                          onClick={this.submit}
                        >
                          Login
                        </Button.Ripple>
                        <Button.Ripple
                          color="warning"
                          type="submit"
                          onClick={this.login}
                        >
                          Oauth
                        </Button.Ripple>
                      </div>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    );
  }
}

function mapStateToProps(state) {
  return {
    state: state,
    auth_state: state.auth.login,
  };
}

export default connect(mapStateToProps, { requestLogin, requestToken })(Login);
