import React, { Component } from "react";
import { Spinner } from "reactstrap";
import { AuthService } from "../../../../redux/oidc-config/services/authservice";

export default class Logout extends Component {
  authService = new AuthService();

  componentDidMount() {
    this.authService.logout();
  }

  render() {
    return <Spinner />;
  }
}
