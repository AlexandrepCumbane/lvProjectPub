import React, { Suspense, lazy } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { history } from "./history";
import { connect } from "react-redux";
import Spinner from "./components/@vuexy/spinner/Loading-spinner";
import { ContextLayout } from "./utility/context/Layout";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./assets/scss/plugins/extensions/toastr.scss";
import "./assets/scss/plugins/extensions/react-block-ui.scss";

import { requestUpdateUser } from "./redux/actions/auth/loginActions";
import AppListView from "./views/app/list";
import Login from "./views/pages/authentication/login/Login";
import Logout from "./views/pages/authentication/logout/Logout";
import { AuthService } from "./redux/oidc-config/services/authservice";

import { axios } from "./redux/api";

// Route-based code splitting
const Home = lazy(() => import("./views/pages/Home"));

const Import = lazy(() => import("./views/import/Import"));

const Welcome = lazy(() => import("./views/pages/Welcome"));

const AppCreate = lazy(() => import("./views/app/create"));

const AppView = lazy(() => import("./views/app/view"));

const Information = lazy(() => import("./views/information/Information"));

const Reports = lazy(() => import("./views/reports/Reports"));

const AdvancedReports = lazy(() => import("./views/reports/Advanced"));

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
    userOauth: state.auth.login.userOauth,
  };
};

const AppRoute = connect(mapStateToProps)(RouteConfig);

class AppRouter extends React.Component {
  authService = new AuthService();

  componentDidMount() {
    this.test_connection(this.props.userOauth?.access_token);

    setTimeout(() => this.updateToken(), 15500);

    setInterval(() => this.updateToken(), 900000);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.updateToken) {
      return false;
    }
    return false;
  }

  /**
   *
   * @param {*} token
   *
   * Verifies if user has role base access
   */
  test_connection = (token) => {
    axios
      .get(`users/0/get_user_info`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {})
      .catch(({ response }) => {
        this.validate_error(response?.data?.detail);
      });
  };

  validate_error = (text) => {
    if (text === "You do not have permission to perform this action.") {
      return;
    } else {
      if (
        text === "Invalid Authorization header. Unable to verify bearer token"
      ) {
      }
    }
  };

  updateToken = () => {
    this.authService.renewToken().then(() => {
      this.authService
        .getUser()
        .then((res) => this.props.requestUpdateUser(res));
    });
  };
  render() {
    return (
      // Set the directory path if you are deploying in sub-folder
      <Router history={history}>
        <Switch>
          <AppRoute exact path="/" component={Login} fullLayout />
          <AppRoute exact path="/welcome" component={Welcome} fullLayout />
          <AppRoute exact path="/home" component={Home} />
          <AppRoute exact path="/import" component={Import} />
          <AppRoute
            exact
            path="/lvforms"
            component={(props) => (
              <AppListView
                {...props}
                hasNew={true}
                title="Registered Cases"
                path="lvform"
                url="lvforms"
              />
            )}
          />
          <AppRoute
            exact
            path="/lvforms_fowarded"
            component={(props) => (
              <AppListView
                {...props}
                title="Fowarded Cases"
                path="forwardcasetofocalpoint"
                name="fowarded"
                url="forwardcasetofocalpoints"
                hasNew={false}
              />
            )}
          />
          <AppRoute
            exact
            path="/forwardcasetofocalpoints"
            component={(props) => (
              <AppListView
                {...props}
                title="Received"
                path="forwardcasetofocalpoint"
                name="forwardcasetofocalpoints"
                url="forwardcasetofocalpoints"
              />
            )}
          />
          <AppRoute
            exact
            path="/forwardinginstitutionsfpoint"
            component={(props) => (
              <AppListView
                {...props}
                title="Received"
                path="forwardinginstitution"
                name="forwardinginstitutions"
                url="forwardinginstitutions"
              />
            )}
          />
          <AppRoute
            exact
            path="/forwardinginstitutionspartner"
            component={(props) => (
              <AppListView
                {...props}
                title="Received Cases"
                path="forwardinginstitution"
                name="forwardinginstitutions"
                url="forwardinginstitutions"
              />
            )}
          />{" "}
          <AppRoute
            exact
            path="/clusterregions"
            component={(props) => (
              <AppListView
                {...props}
                hasNew={true}
                title="Regions"
                path="clusterregion"
                url="clusterregions"
              />
            )}
          />
          <AppRoute
            exact
            path="/clusteragencys"
            component={(props) => (
              <AppListView
                {...props}
                hasNew={true}
                title="Agency"
                path="clusteragency"
                url="clusteragencys"
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
            path="/AppView/"
            component={(props) => (
              <AppView {...props} />
            )}
          />
          <AppRoute
            path="/clusteragencys/new"
            component={(props) => (
              <AppCreate {...props} path="clusteragency" url="clusteragencys" />
            )}
          />
          <AppRoute
            path="/clusterregions/new"
            component={(props) => (
              <AppCreate {...props} path="clusterregion" url="clusterregions" />
            )}
          />
          <AppRoute
            exact
            path="/tasks"
            component={(props) => (
              <AppListView
                {...props}
                hasNew={false}
                title="Tasks"
                path="task"
                url="tasks"
              />
            )}
          />
          <AppRoute
            exact
            path="/information"
            component={(props) => (
              <AppListView
                {...props}
                hasNew={false}
                title="Knowledge Base"
                path="article"
                url="articles"
              />
            )}
          />
          <AppRoute
            exact
            path="/articles"
            component={(props) => (
              <AppListView
                {...props}
                hasNew={true}
                title="Knowledge Base"
                path="article"
                url="articles"
              />
            )}
          />
          {/* <AppRoute
            exact
            path="/information"
            component={(props) => (
              <Information
                {...props}
                title="Knowledge Base"
                path="information"
                url="informations"
              />
            )}
          /> */}
          <AppRoute
            exact
            path="/articles"
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
            component={(props) => (
              <AppListView
                {...props}
                title="Users"
                path="customuser"
                url="users"
                hasNew={true}
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
            path="/articles/new"
            component={(props) => (
              <AppCreate
                {...props}
                title="Users"
                path="article"
                url="articles"
              />
            )}
          />
          <AppRoute
            exact
            path="/reports"
            component={(props) => (
              <Reports {...props} title="Reports" path="report" url="reports" />
            )}
          />
          <AppRoute
            exact
            path="/advanced"
            component={(props) => (
              <AdvancedReports
                {...props}
                title="Advanced Reports"
                path="report"
                url="reports"
              />
            )}
          />
          <AppRoute path="/pages/login" component={login} fullLayout />
          <AppRoute path="/logout" component={Logout} fullLayout />
        </Switch>
      </Router>
    );
  }
}

export default connect(mapStateToProps, {
  requestUpdateUser,
})(AppRouter);
// export default AppRouter;
