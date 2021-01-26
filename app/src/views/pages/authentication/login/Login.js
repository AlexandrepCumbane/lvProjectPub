import React from "react";
import { connect } from "react-redux";
import { Card, CardBody, Row, Col } from "reactstrap";
import {
  requestLogin,
  requestToken,
  requestUpdateUser,
  requestGetUser,
} from "../../../../redux/actions/auth/loginActions";

import { requestDropodowns } from "../../../../redux/actions/app/actions";

import { AuthService } from "../../../../redux/oidc-config/services/authservice";
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
    this.authService.getUser().then((user) => {
      if (user) {
        this.props.requestUpdateUser(user).then(() => {
          history.push("/welcome");
        });
      } else {
        console.log("Loggin");
        this.login();
      }
    });
  }

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
                    <h4>Welcom to VulaVula - 1458</h4>
                    <p>
                      Please wait while you're being redirected to
                      Authentication Page.
                    </p>
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
  requestUpdateUser,
  requestDropodowns,
})(Login);
