import { handleForm, handleDropdowns } from "./helper";

export const requestForm = (payload) => {
  return (dispatch) => handleForm(dispatch, payload);
};
export const requestDropodowns = (payload) => {
  return (dispatch) => handleDropdowns(dispatch);
};

export const updateListLoad = (payload) => {
  return (dispatch) => dispatch({ type: "UPDATE_LOAD_STATE", payload });
};
export const restoreLoadList = () => {
  return (dispatch) => dispatch({ type: "RESTORE_LOAD" });
};
