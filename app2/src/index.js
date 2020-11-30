import React, { Suspense, lazy } from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { Layout } from "./utility/context/Layout"
import * as serviceWorker from "./serviceWorker"
import { store } from "./redux/storeConfig/store"
import Spinner from "./components/@vuexy/spinner/Fallback-spinner"
import "./index.scss"
import "./@fake-db"
import app, { patterns, photos } from '@wq/app';
import map from '@wq/map';
import config from './config';

// const LazyApp = lazy(() => import("./App"))

app.use(map);
app.use(patterns);
app.use(photos);

app.use({
  context() {
      const { version } = config;
      return { version };
  },
  run($page) {
      $page.find('form[data-wq-confirm]').on('submit', () => {
          return app.confirmSubmit(this, 'Are you sure you want to delete this record?');
      });
      $page.find('button[data-wq-action="sync"]').on('click', () => {
          app.retryAll();
      });
      $page.find('button[data-wq-action="empty-outbox"]').on('click', () => {
          app.emptyOutbox(true);
      });
  }
});

var ready = app.init(config).then(function() {
  app.jqmInit();
  app.prefetchAll();
});

// configureDatabase()
// ReactDOM.render(
//     <Provider store={store}>
//       <Suspense fallback={<Spinner />}>
//         <Layout>
//             <LazyApp />
//         </Layout>
//       </Suspense>
//     </Provider>,
//   document.getElementById("root")
// )

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()


if (config.debug) {
    window.wq = app;
}

if (config.onReady) {
    ready.then(function() {
	config.onReady(app);
    });
}
