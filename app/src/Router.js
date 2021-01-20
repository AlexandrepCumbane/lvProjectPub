import React, { Suspense, lazy } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { history } from "./history";
import { connect } from "react-redux";
import Spinner from "./components/@vuexy/spinner/Loading-spinner";
import { ContextLayout } from "./utility/context/Layout";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./assets/scss/plugins/extensions/toastr.scss";

import AppListView from "./views/app/list";
import { Home } from "react-feather";
import Login from "./views/pages/authentication/login/Login";

// Route-based code splitting
// const Home = lazy(() => import("./views/pages/Home"));

const Welcome = lazy(() => import("./views/pages/Welcome"));

// const Page2 = lazy(() => import("./views/pages/Page2"));

const AppCreate = lazy(() => import("./views/app/create"));

// const AppList = lazy(() => import("./views/app/list"));

const Information = lazy(() => import("./views/information/Information"));

const Reports = lazy(() => import("./views/reports/Reports"));

const AdvancedReports = lazy(() => import("./views/reports/Advanced"));

// const Users = lazy(() => import("./views/users/Users"));

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
          <AppRoute exact path="/" component={Login} fullLayout />
          <AppRoute exact path="/welcome" component={Welcome} fullLayout />
          <AppRoute exact path="/home" component={Home} />
          <AppRoute
            exact
            path="/lvforms"
            // component={AppList}
            component={(props) => (
              <AppListView
                {...props}
                title="Registered Cases"
                path="lvform"
                url="lvforms"
              />
            )}
          />
          <AppRoute
            exact
            path="/lvforms_fowarded"
            // component={AppList}
            component={(props) => (
              <AppListView
                {...props}
                title="Fowarded Cases"
                path="lvform"
                url="lvforms"
              />
            )}
          />
          <AppRoute
            path="/lvforms/new"
            component={(props) => (
              <AppCreate {...props} path="lvform" url="lvforms" />
            )}
          />
          <AppRoute
            exact
            path="/tasks"
            // component={AppList}
            component={(props) => (
              <AppListView {...props} title="Tasks" path="task" url="tasks" />
            )}
          />
          <AppRoute
            exact
            path="/information"
            // component={AppList}
            component={(props) => (
              <Information
                {...props}
                title="Knowledge Base"
                path="information"
                url="informations"
              />
            )}
          />
          <AppRoute
            exact
            path="/users"
            // component={AppList}
            component={(props) => (
              <AppListView
                {...props}
                title="Users"
                path="customuser"
                url="users"
              />
            )}
          />
          <AppRoute
            path="/customusers/new"
            component={(props) => (
              <AppCreate
                {...props}
                title="Users"
                path="customuser"
                url="users"
              />
            )}
          />
          <AppRoute
            exact
            path="/reports"
            // component={AppList}
            component={(props) => (
              <Reports {...props} title="Reports" path="report" url="reports" />
            )}
          />
          <AppRoute
            exact
            path="/advanced"
            // component={AppList}
            component={(props) => (
              <AdvancedReports
                {...props}
                title="Advanced Reports"
                path="report"
                url="reports"
              />
            )}
          />

          {/* <AppRoute path="/lvforms" component={Page2} /> */}
          <AppRoute path="/pages/login" component={login} fullLayout />
        </Switch>
      </Router>
    );
  }
}

export default AppRouter;
