import { axios } from "../../api";

export const handleLogin = (dispatch, payload) =>
  new Promise((resolve, reject) => {
    dispatch({
      type: "REQUEST_LOGIN",
      userInfo: undefined,
      csrftoken: undefined,
      success: false,
      failed: false,
      loading: true,
    });

    axios
      .post("/login.json/", payload)
      .then(({ data }) => {
        dispatch({
          type: "LOGIN_SUCCESS",
          userInfo: data.user,
          config: data.config,
          csrftoken: data.csrftoken,
          success: true,
          failed: false,
          loading: false,
        });
        resolve();
      })
      .catch(({ response }) => {
        dispatch({
          type: "LOGIN_FAILED",
          failed: true,
          success: false,
          loading: false,
        });
        resolve();
      });
  });

export const handleCsrftoken = (dispatch) => {
  return axios.get("/login.json").then(({ data }) => {
    console.log(data);
    dispatch({
      type: "UPDATE_TOKEN",
      csrftoken: data.csrftoken,
    });
  });
};
