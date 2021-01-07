import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ApolloProvider } from "@apollo/client";

import { Layout } from "./utility/context/Layout";
import * as serviceWorker from "./serviceWorker";
import { store, persistor } from "./redux/storeConfig/store";
import Spinner from "./components/@vuexy/spinner/Fallback-spinner";
import "./index.scss";
import "./@fake-db";
import { PersistGate } from "redux-persist/integration/react";

import { graphClient } from "./configs/apolloConfig";
import { IntlProviderWrapper, LOCALES } from "./i18n/index";
const LazyApp = lazy(() => import("./App"));

const locale = LOCALES.ENGLISH;
ReactDOM.render(
  <Provider store={store}>
    <Suspense fallback={<Spinner />}>
      <PersistGate loading={null} persistor={persistor}>
        <IntlProviderWrapper locale={locale}>
          <ApolloProvider client={graphClient}>
            <Layout>
              <LazyApp />
            </Layout>
          </ApolloProvider>
        </IntlProviderWrapper>
      </PersistGate>
    </Suspense>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
