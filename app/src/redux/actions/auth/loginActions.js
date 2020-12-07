import { handleLogin, handleCsrftoken } from "./helper";

export const changeRole = (role) => {
  return (dispatch) => dispatch({ type: "CHANGE_ROLE", userRole: role });
};

export const requestLogin = (payload) => {
  return (dispatch) => handleLogin(dispatch, payload);
};

export const requestToken = (payload) => {
  return (dispatch) => handleCsrftoken(dispatch, payload);
};
