import { handleForm, handleDropdowns } from "./helper";

export const requestForm = (payload) => {
  return (dispatch) => handleForm(dispatch, payload);
};
export const requestDropodowns = (payload) => {
  return (dispatch) => handleDropdowns(dispatch);
};
