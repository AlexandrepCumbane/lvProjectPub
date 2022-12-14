import React from "react";
import { connect } from "react-redux";
import { Card, CardBody, Row, Col, Spinner } from "reactstrap";
import {
  requestDropodowns,
  restoreLoadList,
} from "../../../../redux/actions/app/actions";
import { requestRemoveUser } from "../../../../redux/actions/auth/loginActions";

import { AuthService } from "../../../../redux/oidc-config/services/authservice";
import "../../../../assets/scss/pages/authentication.scss";

import { history } from "../../../../history";
import { ContextLayout } from "../../../../utility/context/Layout";
class Login extends React.Component {
  static contextType = ContextLayout;
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

  logout() {
    this.context.setLogout(false);
    this.props.requestRemoveUser();
    this.authService.logout();
  }

  componentDidMount() {
    
    this.props.restoreLoadList();

    this.context.state.logout
      ? this.logout()
      : this.authService.getUser().then((user) => {
          this.authService
            .signinRedirectCallback()
            .then((res) => {
              history.push("/welcome");
            })
            .catch((err) => {
              this.login();
            });
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
                  <CardBody className="d-flex justify-content-between align-items-center">
                    <div className="justify-content-center">
                      <h4>Welcome to Linha 1458</h4>
                      <p>
                        Please wait while you're being redirected to
                        Authentication Page.
                      </p>
                    </div>
                    <Spinner color="primary" />
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
  requestDropodowns,
  requestRemoveUser,
  restoreLoadList,
})(Login);
