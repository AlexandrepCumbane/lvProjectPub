import React from "react";
import { connect } from "react-redux";
import { Card, CardBody, Row, Col, Spinner } from "reactstrap";
import {
  requestLogin,
  requestToken,
  requestGetUser,
  requestUpdateUser,
  changeRole,
} from "../../redux/actions/auth/loginActions";

import { requestDropodowns } from "../../redux/actions/app/actions";

import { axios } from "../../redux/api";

import { AuthService } from "../../redux/oidc-config/services/authservice";
import "../../assets/scss/pages/authentication.scss";

import { history } from "../../history";

class Welcome extends React.Component {
  state = {
    activeTab: "1",
    email: "",
    password: "",
    username: "",
    csrf: "",
    times: 0,
    initialText: "",
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
    if (this.props.userOauth === undefined) {
      this.authService.login();
    } else {
      this.props.requestUpdateUser(this.props.userOauth).then(() => {
        this.test_connection(this.props.userOauth.access_token);
      });
    }
  }

  renderText = () => {
    if (this.state.times >= 10) {
      return (
        <CardBody className="d-flex justify-content-between align-items-center">
          <div className="justify-content-center">
            <h4>VulaVula - 1458</h4>
            <p>
              You've reached the attempts limit, please reload the page or
              contact your system manager.
            </p>
          </div>
          {/* <Spinner color="primary" /> */}
        </CardBody>
      );
    } else {
      return (
        <CardBody className="d-flex justify-content-between align-items-center">
          <div className="justify-content-center">
            <h4>VulaVula - 1458</h4>
            <p>Welcome, your account is being validated.</p>
            <p>
              Validation attemps <strong>{this.state.times}</strong>
            </p>
          </div>
          <Spinner color="primary" />
        </CardBody>
      );
    }
  };
  /**
   *
   * @param {*} token
   *
   * Verifies if user has role base access
   */
  test_connection = (token) => {
    axios
      .get(`users/0/get_user_info`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        this.props.changeRole(data["groups_label"][0]);
        history.push("/home");
      })
      .catch(({ response }) => {
        this.validate_error(response.data.detail);
        let interval = setInterval(() => {
          if (this.state.times < 10) {
            this.setState({ times: this.state.times + 1 });
            axios
              .get(`users/0/get_user_info`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              .then(({ data }) => {
                clearInterval(interval);
                this.props.changeRole(data["groups_label"][0]);
                history.push("/home");
              })
              .catch(({ response }) => {
                this.validate_error(response.data.detail);
              });
          } else {
            clearInterval(interval);
          }
        }, 5000);
      });
  };

  validate_error = (text) => {
    if (text === "You do not have permission to perform this action.") {
      return;
    } else {
      if (
        text === "Invalid Authorization header. Unable to verify bearer token"
      ) {
        this.authService.logout().then(() => this.authService.login());
      }
    }
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
                <Card className="rounded-0 mb-0 px-2">{this.renderText()}</Card>
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
    userOauth: state.auth.login.userOauth,
  };
}

export default connect(mapStateToProps, {
  requestLogin,
  requestToken,
  requestGetUser,
  changeRole,
  requestDropodowns,
  requestUpdateUser,
})(Welcome);
