import React from "react";
import { connect } from "react-redux";
import { Card, CardBody, Row, Col } from "reactstrap";
import {
  requestLogin,
  requestToken,
  requestGetUser,
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
    this.props.requestGetUser().then(() => {
      const { userOauth } = this.props.auth_state;
      if (userOauth === undefined) {
        this.login();
      } else {
        this.test_connection(userOauth.access_token);
      }
    });
  }

  /**
   *
   * @param {*} token
   *
   * Verifies if user has role base access
   */
  test_connection = (token) => {
    axios
      .get(`lvforms.json/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        history.push("/home");
      })
      .catch(() => {});
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
  requestDropodowns,
})(Welcome);
