import { Log, UserManager } from "oidc-client";

import { Constants } from "../constants/index";

export class AuthService {
  userManager;

  constructor() {
    const settings = {
      authority: Constants.stsAuthority,
      client_id: Constants.clientId,
      redirect_uri: `${Constants.clientRoot}/`,
      silent_redirect_uri: `${Constants.clientRoot}/`,
      // tslint:disable-next-line:object-literal-sort-keys
      post_logout_redirect_uri: `${Constants.clientRoot}/logout/#`,
      response_type: "code",
      scope: Constants.clientScope,
    };
    this.userManager = new UserManager(settings);

    Log.logger = console;
    Log.level = Log.INFO;
  }

  getUser() {
    return this.userManager.getUser();
  }

  login() {
    return this.userManager.signinRedirect();
  }

  renewToken() {
    return this.userManager.signinSilent();
  }

  logout() {
    return this.userManager.signoutRedirect();
  }
}
