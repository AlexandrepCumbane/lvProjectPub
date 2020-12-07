import { handleForm, handleDropdowns } from "./helper";

export const requestForm = () => {
  return (dispatch) => handleForm(dispatch);
};
export const requestDropodowns = () => {
  return (dispatch) => handleDropdowns(dispatch);
};
