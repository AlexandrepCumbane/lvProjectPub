import { axios } from "../../api";
import { state } from "./forms";

export const handleForm = (dispatch) =>
  new Promise((resolve, reject) => {
    dispatch({
      type: "REQUEST_FORM",
      success: false,
      failed: false,
      loading: true,
    });

    axios
      .get("/lvforms.json/")
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

const requestSingle = async (link) => {
  const response = await axios
    .get(`/${link}/`)
    .then(({ data }) => data)
    .catch(({ response }) => response);

  return response?.list;
};

export const handleDropdowns = (dispatch) =>
  new Promise((resolve, reject) => {
    const list = state.map((item) => {
      return {
        key: item.name,
        value: requestSingle(item.url),
      };
    });

    dispatch({
      type: "DROPDOWNS",
      dropdowns: list,
    });

    resolve();
  });
