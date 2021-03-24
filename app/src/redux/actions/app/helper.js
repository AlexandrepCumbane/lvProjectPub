import { axios } from "../../api";
import { state } from "./forms";

import { store } from "../../storeConfig/store";

export const handleForm = (dispatch, payload) =>
  new Promise((resolve, reject) => {
    dispatch({
      type: "REQUEST_FORM",
      success: false,
      failed: false,
      loading: true,
    });

    let hasPer = true;

    const appState = store.getState();
    const { userOauth } = appState.auth.login;

    let appList = [];

    let url = `/${payload.url}`;
    if (payload.next) {
      const postData = appState.app.app_reducer[payload.name];
      if (postData.page + 1 <= postData.pages) {
        appList = postData?.list;
        url = `${payload.url}/?page=${postData.page + 1}`;
      } else {
        hasPer = false;
      }
    }

    if (hasPer) {
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${userOauth?.access_token}`,
          },
        })
        .then(({ data }) => {
          let value = data;
          value["list"] = appList.concat(data.list);
          dispatch({
            type: "FORM_SUCCESS",
            data: {
              key: payload.name,
              value,
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
    } else {
      resolve();
    }
  });

const requestSingle = (dispatch) => {
  const appState = store.getState();
  let { dropdowns } = appState.app.app_reducer;
  const { userOauth, userRole } = appState.auth.login;

  state.map(async (item) => {
    if (
      item.name !== "logout" &&
      item.name !== "login" &&
      item.name !== "article" &&
      item.name !== "forwardinginstitution" &&
      item.name !== "forwardcasetofocalpoint" &&
      item.name !== "task" &&
      item.name !== "lvform" &&
      item.name !== "article" &&
      item.url !== undefined
    ) {
      if (dropdowns[item.name] === undefined) {
        if (item.name === "forwardcasetofocalpoint" && userRole === "manager") {
          await axios
            .get(`users/0/get_${item.url}`, {
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
            .catch(({ response }) => {
              return response;
            });
        } else {
          await axios
            .get(`/${item.url}`, {
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
            .catch(({ response }) => {
              return response;
            });
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
