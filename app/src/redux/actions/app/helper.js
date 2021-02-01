import { axios } from "../../api";
import { AuthService } from "../../oidc-config/services/authservice";
import { state } from "./forms";

import { store } from "../../storeConfig/store";
import { getUser } from "../auth/helper";



const authService = new AuthService();

export const handleForm = (dispatch, payload) =>
  new Promise((resolve, reject) => {
    dispatch({
      type: "REQUEST_FORM",
      success: false,
      failed: false,
      loading: true,
    });

    const appState = store.getState();
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
        authService
          .renewToken()
          .then(() => {
            return getUser(dispatch);
          })
          .catch(() => {
            authService.logout().then(() => {
              authService.login();
            });
          });

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
  const appState = store.getState();
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
              authService
                .renewToken()
                .then(() => {
                  return getUser(dispatch);
                })
                .catch(() => {
                  authService.logout().then(() => {
                    authService.login();
                  });
                });
              return response;
            });
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
            .catch(({ response }) => {
              authService
                .renewToken()
                .then(() => {
                  return getUser(dispatch);
                })
                .catch(() => {
                  authService.logout().then(() => {
                    authService.login();
                  });
                });
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
