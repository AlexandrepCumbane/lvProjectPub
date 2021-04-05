import { axios } from "../../api";
import { AuthService } from "../../oidc-config/services/authservice";

let authService = new AuthService();

export const handleLogin = (dispatch, payload) =>
  new Promise((resolve, reject) => {
    dispatch({
      type: "REQUEST_LOGIN",
      userInfo: undefined,
      csrftoken: undefined,
      success: false,
      failed: false,
      loading: true,
    });

    axios
      .post("/login.json/", payload)
      .then(({ data }) => {
        dispatch({
          type: "LOGIN_SUCCESS",
          userInfo: data.user,
          config: data.config,
          csrftoken: data.csrftoken,
          success: true,
          failed: false,
          loading: false,
          userRole: "admin",
        });

        resolve();
      })
      .catch(({ response }) => {
        dispatch({
          type: "LOGIN_FAILED",
          failed: true,
          success: false,
          loading: false,
        });
        resolve();
      });
  });

export const handleCsrftoken = (dispatch) => {
  return axios.get("/login.json").then(({ data }) => {
    dispatch({
      type: "UPDATE_TOKEN",
      csrftoken: data.csrftoken,
    });
  });
};

export const handleRemoveUser = (dispatch) => {
  dispatch({
    type: "REMOVE_USER",
  });
};

export const logout = (dispatch) => {
  dispatch({
    type: "CHANGE_ROLE",
    userRole: "not-auth",
  });
};

export const getUser = (dispatch) => {
  return new Promise((resolve, reject) => {
    authService.getUser().then(function (user) {
      if (user) {
        dispatch({
          type: "OAUTH_SUCCESS",
          userOauth: user,
        });

        resolve();
      } else {
        resolve();
        // toast.info("You are not logged in.");
      }
    });
  });
};

export const updateUser = (dispatch, payload) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: "OAUTH_SUCCESS",
      userOauth: payload,
    });

    resolve();
  });
};
