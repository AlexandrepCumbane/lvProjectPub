import React from "react";
import { IntlProvider } from "react-intl";
import { LOCALES } from "./locales";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { store } from "../redux/storeConfig/store";

import messages_lan from "./messages";

const Context = React.createContext();

const resources = {
  en: {
    translation: messages_lan[LOCALES.ENGLISH],
  },
  pt: {
    translation: messages_lan[LOCALES.PORTUGUESE],
  },
};
class IntlProviderWrapper extends React.Component {
  state = {
    locale: localStorage.getItem("lang") ?? LOCALES.PORTUGUESE,
    messages: messages_lan[localStorage.getItem("lang") ?? LOCALES.PORTUGUESE],
    resources: resources,
    newEvent: {},
    hasNewEvent: false,
  };

  appState = store.getState();
  socketIo = null;
  // socketIo = new WebSocket(
  //   `${process.env.REACT_APP_WS_URL}ws/chat/looby/?access_token=${this.appState.auth.login.userOauth?.access_token}`
  // );

  setLanguage = (lang) => {
    localStorage.setItem("lang", lang);
  };

  setEvent(newEvent = {}, hasNewEvent = false) {
    this.setState({ newEvent, hasNewEvent });
  }

  sendMessage = (message, model, target, id) => {
    this.socketIo.send(
      JSON.stringify({
        message: message,
        model: model,
        target: target,
        model_id: id,
      })
    );
  };


  componentDidMount() {
    this.askNotificationPermission();
    this.initSocket(this.appState.auth.login.userOauth?.access_token);
  }

  initSocket = (access_token) => {

    this.socketIo = new WebSocket(
      `${process.env.REACT_APP_WS_URL}ws/chat/looby/?access_token=${access_token}`
    );

    this.appState = store.getState();

    this.socketIo.onopen = () => {
      // on connecting, do nothing but log it to the console
    };

    this.socketIo.onmessage = (evt) => {
      const message = JSON.parse(evt.data);

      if (this.appState.auth.login.userOauth.profile.sub === message.target) {
        this.setEvent(message, true);
        new Notification("Linha 1458", { body: "Your have new notification!" });
      }
    };
  };

  askNotificationPermission = () => {
    Notification.requestPermission();
  };

  render() {
    const { children } = this.props;
    const { locale, messages, resources, hasNewEvent, newEvent } = this.state;

    i18n
      .use(initReactI18next) // passes i18n down to react-i18next
      .init({
        resources,
        lng: locale,
        keySeparator: false, // we do not use keys in form messages.welcome
        interpolation: {
          escapeValue: false, // react already safes from xss
        },
      });

    return (
      <Context.Provider
        value={{
          state: this.state,
          switchLanguage: (language) => {
            this.setLanguage(language);
            this.setState({
              locale: language,
              messages: messages_lan[language],
              resources,
              hasNewEvent,
              newEvent,
            });
          },
          translate: (text) => {
            return text !== undefined || text !== null ? i18n.t(text) : "None";
          },
          getEvent: () => {
            return {
              hasNewEvent,
              newEvent,
            };
          },
          sendNotification: (message, model, target, id) =>
            this.sendMessage(message, model, target, id),
          initSocket: (access_token) => this.initSocket(access_token)
        }}
      >
        <IntlProvider
          key={locale}
          locale={locale}
          messages={messages}
          defaultLocale={LOCALES.ENGLISH}
          i18n={i18n}
        >
          {children}
        </IntlProvider>
      </Context.Provider>
    );
  }
}

export { IntlProviderWrapper, Context as IntlContext };
