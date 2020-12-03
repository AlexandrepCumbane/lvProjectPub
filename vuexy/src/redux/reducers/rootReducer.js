import { combineReducers } from "redux";
import customizer from "./customizer/";
import auth from "./auth/";
import app from "./app";
import navbar from "./navbar/Index";

const rootReducer = combineReducers({
  customizer: customizer,
  auth: auth,
  navbar: navbar,
  app: app,
});

export default rootReducer;
