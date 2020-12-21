import Axios from "axios";
import { store } from "./storeConfig/store";

const state = store.getState();

const axios = Axios.create({
  /*
   * Loads APP_API_URL as baseUrl for http requests services
   *
   * Warning: Please make sure you added REACT_APP_API_URL on env.js file
   */
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type":
      "multipart/form-data; boundary=----WebKitFormBoundaryj1QQuFB08RhhuHzT",
  },
});

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.withCredentials = true;

export { axios };
