import Axios from "axios";
import { store } from "./storeConfig/store";

export const environment = process.env.REACT_APP_API_URL;

const state = store.getState();

const axios = Axios.create({
  baseURL: environment,
  headers: {
    csrftoken: state.auth.login.csrftoken,
    "Content-Type":
      "multipart/form-data; boundary=----WebKitFormBoundaryj1QQuFB08RhhuHzT",
  },
});

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.withCredentials = true;

export { axios };
