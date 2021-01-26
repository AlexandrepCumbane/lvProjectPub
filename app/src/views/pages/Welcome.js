import React from "react";
import { connect } from "react-redux";
import { Card, CardBody, Row, Col } from "reactstrap";
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
    // this.authService.getUser().then((user) => {
    if (this.props.userOauth === undefined) {
      this.authService.login();
    } else {
      this.props.requestUpdateUser(this.props.userOauth).then(() => {
        this.test_connection(this.props.userOauth.access_token);
      });
    }
    // });
  }

  /**
   *
   * @param {*} token
   *
   * Verifies if user has role base access
   */
  test_connection = (token) => {
    axios
      .get(`users/0/user_info`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        this.props.changeRole(data["groups_label"][0]);
        history.push("/home");
      })
      .catch(() => {});
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
