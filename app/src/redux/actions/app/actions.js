import { updateIndex, handleForm, handleDropdowns, addCase } from "./helper";

export const requestForm = (payload) => {
  return (dispatch) => handleForm(dispatch, payload);
};

export const requestIndex = (payload) => {
  return (dispatch) => updateIndex(dispatch, payload);
};

export const requestDropodowns = (payload) => {
  return (dispatch) => handleDropdowns(dispatch);
};

export const requestAddCase = (payload) => {
  return (dispatch) => addCase(dispatch, payload);
};

export const updateListLoad = (payload) => {
  return (dispatch) => dispatch({ type: "UPDATE_LOAD_STATE", payload });
};

export const restoreLoadList = () => {
  return (dispatch) => dispatch({ type: "RESTORE_LOAD" });
};
