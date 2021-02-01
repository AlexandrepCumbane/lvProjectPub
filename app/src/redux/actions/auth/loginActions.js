import { handleLogin, handleCsrftoken, getUser, updateUser } from "./helper";

export const changeRole = (role) => {
  return (dispatch) => dispatch({ type: "CHANGE_ROLE", userRole: role });
};

export const requestLogin = (payload) => {
  return (dispatch) => handleLogin(dispatch, payload);
};

export const requestToken = (payload) => {
  return (dispatch) => handleCsrftoken(dispatch, payload);
};

export const requestGetUser = () => {
  return (dispatch) => getUser(dispatch);
};

export const requestUpdateUser = (payload) => {
  return (dispatch) => updateUser(dispatch, payload);
};
