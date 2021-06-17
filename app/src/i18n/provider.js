import React from "react";
import { IntlProvider } from "react-intl";
import { LOCALES } from "./locales";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

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

// const socketIo = new WebSocket(
//   `${process.env.REACT_APP_API_URL}/ws/chat/looby`
// );

class IntlProviderWrapper extends React.Component {
  state = {
    locale: localStorage.getItem("lang") ?? LOCALES.PORTUGUESE,
    messages: messages_lan[localStorage.getItem("lang") ?? LOCALES.PORTUGUESE],
    resources: resources,
    newEvent: {},
    hasNewEvent: false,
  };

  socketIo = new WebSocket(`${process.env.REACT_APP_WS_URL}chat/looby/`);

  setLanguage = (lang) => {
    localStorage.setItem("lang", lang);
  };

  setEvent(newEvent = {}, hasNewEvent = false) {
    this.setState({ newEvent, hasNewEvent });
  }

  sendMessage = (message, model, target) => {
    this.socketIo.send(
      JSON.stringify({
        message: message,
        model: model,
        target: target,
      })
    );
  };

  componentDidMount() {
    this.askNotificationPermission();
    // this.socketIo.
    this.socketIo.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log("connected");
    };

    this.socketIo.onmessage = (evt) => {
      console.log(evt);
      // on receiving a message, add it to the list of messages
      const message = JSON.parse(evt.data);
      // this.addMessage(message);
      // console.log(message);

      this.setEvent(message, true);
      new Notification("Linha 1458", { body: "Your have new notification!" });
    };
  }

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
              // hasNewEvent,
              // newEvent,
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
          sendNotification: (message, model, target) =>
            this.sendMessage(message, model, target),
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
