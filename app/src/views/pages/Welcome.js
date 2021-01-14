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
import { Mail, Lock, Check, Facebook, Twitter, GitHub } from "react-feather";
import {
  requestLogin,
  requestToken,
  requestGetUser,
} from "../../redux/actions/auth/loginActions";

import { AuthService } from "../../redux/oidc-config/services/authservice";
import Checkbox from "../../components/@vuexy/checkbox/CheckboxesVuexy";
import "../../assets/scss/pages/authentication.scss";

// import googleSvg from "../../assets/img/svg/google.svg";

// import loginImg from "../../assets/img/pages/login.png";
// import "../../assets/scss/pages/authentication.scss";

import { history } from "../../history";

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
    this.props.requestGetUser().then(() => {
      // console.log("userOauth: ", this.props.auth_state.userOauth);

      const { userOauth } = this.props.auth_state;
      if (userOauth === undefined) {
        this.login();
      }
    });
    // console.log("User", this.getUser());
    // this.getUser();
  }

  // getUser = () => {
  //   this.authService.getUser().then((user) => {
  //     if (user) {
  //       // toast.success("User has been successfully loaded from store.");
  //     } else {
  //       // toast.info("You are not logged in.");
  //     }

  //     if (!this.shouldCancel) {
  //       // this.setState({ user });
  //       console.log("Users", user);
  //     }
  //   });
  // };
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

  login = () => {
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
          <Card className="rounded-0 mb-0 w-100">
            <Row className="m-0">
              <Col md="12" className="p-0">
                <Card className="rounded-0 mb-0 px-2">
                  <CardBody className=" justify-content-center">
                    <h4>VulaVula - 1458</h4>
                    <p>Welcome, your account is being validated.</p>
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

export default connect(mapStateToProps, {
  requestLogin,
  requestToken,
  requestGetUser,
})(Login);
