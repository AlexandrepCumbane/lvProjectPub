import React from "react";
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
import Axios from "axios";
import { Mail, Lock, Check } from "react-feather";
import { history } from "../../../../history";
import Checkbox from "../../../../components/@vuexy/checkbox/CheckboxesVuexy";
import "../../../../assets/scss/pages/authentication.scss";

class Login extends React.Component {
  state = {
    activeTab: "1",
    email: "",
    password: "",
    username: "",
    csrf: "",
  };
  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  };

  submit = (e) => {
    e.preventDefault();

    var bodyFormData = new FormData();
    bodyFormData.append("username", this.state.username);
    bodyFormData.append("password", this.state.password);
    bodyFormData.append(
      "csrfmiddlewaretoken",
      "rBYQCrHIHbJrQrTOmlwmKoJgNuFsgZ0ZdStDzpvpsBmTYz6fPEMNMT44Yx5THjXA"
    );

    const axios = Axios;

    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.withCredentials = true;

    axios
      .post("/login.json", bodyFormData, {
        headers: {
          csrftoken:
            "hMy3uvi6QSQvh5J3VWpeFBaXcp2Bw3TE333Qrt6NBitXpdWuofFFH6vLnss2XnQf",
          "Content-Type":
            "multipart/form-data; boundary=----WebKitFormBoundaryj1QQuFB08RhhuHzT",
        },
      })
      .then((e) => {
        console.log(e);
      })
      .catch((err) => console.log(err));
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
                          type="email"
                          placeholder="Email"
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
export default Login;
