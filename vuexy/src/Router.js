import React, { Suspense, lazy } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { history } from "./history";
import { connect } from "react-redux";
import Spinner from "./components/@vuexy/spinner/Loading-spinner";
import { ContextLayout } from "./utility/context/Layout";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./assets/scss/plugins/extensions/toastr.scss";

// Route-based code splitting
const Home = lazy(() => import("./views/pages/Home"));

// const Page2 = lazy(() => import("./views/pages/Page2"));

const AppCreate = lazy(() => import("./views/app/create"));

const AppList = lazy(() => import("./views/app/list"));

const login = lazy(() => import("./views/pages/authentication/login/Login"));

// Set Layout and Component Using App Route
const RouteConfig = ({
  component: Component,
  fullLayout,
  permission,
  user,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      return (
        <ContextLayout.Consumer>
          {(context) => {
            let LayoutTag =
              fullLayout === true
                ? context.fullLayout
                : context.state.activeLayout === "horizontal"
                ? context.horizontalLayout
                : context.VerticalLayout;
            return (
              <LayoutTag {...props} permission={props.user}>
                <Suspense fallback={<Spinner />}>
                  <ToastContainer />
                  <Component {...props} />
                </Suspense>
              </LayoutTag>
            );
          }}
        </ContextLayout.Consumer>
      );
    }}
  />
);
const mapStateToProps = (state) => {
  return {
    user: state.auth.login.userRole,
  };
};

const AppRoute = connect(mapStateToProps)(RouteConfig);

class AppRouter extends React.Component {
  render() {
    return (
      // Set the directory path if you are deploying in sub-folder
      <Router history={history}>
        <Switch>
          <AppRoute exact path="/" component={Home} />
          <AppRoute path="/lvforms" component={AppList} />
          <AppRoute path="/lvforms/new" component={AppCreate} />
          {/* <AppRoute path="/lvforms" component={Page2} /> */}
          <AppRoute path="/pages/login" component={login} fullLayout />
        </Switch>
      </Router>
    );
  }
}

export default AppRouter;
