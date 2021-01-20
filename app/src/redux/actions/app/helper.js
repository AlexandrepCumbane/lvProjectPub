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

    const { userOauth } = appState.auth.login;
    axios
      .get(`/${payload.url}.json/`, {
        headers: {
          Authorization: `Bearer ${userOauth?.access_token}`,
        },
      })
      .then(({ data }) => {
        dispatch({
          type: "FORM_SUCCESS",
          data: {
            key: payload.name,
            value: data.list,
          },
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
  let { dropdowns } = appState.app.app_reducer;

  state.map(async (item) => {
    if (
      item.name !== "logout" &&
      item.name !== "login" &&
      item.url !== undefined
    ) {
      const { userOauth } = appState.auth.login;

      if (dropdowns[item.name] === undefined) {
        if (item.name === "forwardcasetofocalpoint") {
          await axios
            .get(`users/0/${item.url}`, {
              headers: {
                Authorization: `Bearer ${userOauth?.access_token}`,
              },
            })
            .then(({ data }) => {
              if (data.list) {
                dropdowns[item.name] = data.list;
                dispatch({
                  type: "DROPDOWNS",
                  dropdowns,
                });
              }
            })
            .catch(({ response }) => response);
        } else {
          await axios
            .get(`/${item.url}/`, {
              headers: {
                Authorization: `Bearer ${userOauth?.access_token}`,
              },
            })
            .then(({ data }) => {
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
      }
    }
  });
};

export const handleDropdowns = (dispatch) =>
  new Promise((resolve, reject) => {
    requestSingle(dispatch);

    resolve();
  });
