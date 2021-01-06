import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Layout } from "./utility/context/Layout";
import * as serviceWorker from "./serviceWorker";
import { store, persistor } from "./redux/storeConfig/store";
import Spinner from "./components/@vuexy/spinner/Fallback-spinner";
import "./index.scss";
import "./@fake-db";
import { PersistGate } from "redux-persist/integration/react";

import { IntlProviderWrapper, LOCALES } from "./i18n/index";

import { Auth0Provider } from "./authServices/auth0/auth0Service"
import config from "./authServices/auth0/auth0Config.json"

const LazyApp = lazy(() => import("./App"));

const locale = LOCALES.ENGLISH;
ReactDOM.render(
  <Auth0Provider
    domain={config.domain}
    client_id={config.clientId}
    redirect_uri={window.location.origin + process.env.REACT_APP_PUBLIC_PATH}
    onRedirectCallback={onRedirectCallback}
  >
    <Provider store={store}>
      <Suspense fallback={<Spinner />}>
        <PersistGate loading={null} persistor={persistor}>
          <IntlProviderWrapper locale={locale}>
            <Layout>
              <LazyApp />
            </Layout>
          </IntlProviderWrapper>
        </PersistGate>
      </Suspense>
    </Provider>
  </Auth0Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
