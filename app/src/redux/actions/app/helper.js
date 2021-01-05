import { axios } from "../../api";
import { state } from "./forms";

import { store } from "../../storeConfig/store";

const appState = store.getState();

export const handleForm = (dispatch, payload) =>
  new Promise((resolve, reject) => {
    dispatch({
      type: "REQUEST_FORM",
      success: false,
      failed: false,
      loading: true,
    });

    axios
      .get(`/${payload}.json/`, {
        headers: {
          Authorization: `Bearer ${appState.auth.login.userOauth.access_token}`,
        },
      })
      .then(({ data }) => {
        // console.log(data);
        dispatch({
          type: "FORM_SUCCESS",
          list: data.list,
          success: true,
          failed: false,
          loading: false,
        });
        resolve();
      })
      .catch(({ response }) => {
        dispatch({
          type: "FORM_FAILED",
          failed: true,
          success: false,
          loading: false,
        });
        resolve();
      });
  });

const requestSingle = (dispatch) => {
  state.map(async (item) => {
    if (item.name != "logout" && item.name != "login") {
      const resp = await axios
        .get(`/${item.url}/`)
        .then(({ data }) => {
          let { dropdowns } = appState.app.app_reducer;
          if (data.list) {
            dropdowns[item.name] = data.list;
            dispatch({
              type: "DROPDOWNS",
              dropdowns,
            });
          }
        })
        .catch(({ response }) => response);
    }
  });
};

export const handleDropdowns = (dispatch) =>
  new Promise((resolve, reject) => {
    requestSingle(dispatch);

    resolve();
  });
