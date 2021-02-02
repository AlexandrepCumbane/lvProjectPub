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

class IntlProviderWrapper extends React.Component {
  state = {
    locale: LOCALES.ENGLISH,
    messages: messages_lan[LOCALES.ENGLISH],
    resources: resources,
  };

  render() {
    const { children } = this.props;
    const { locale, messages, resources } = this.state;

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
            this.setState({
              locale: language,
              messages: messages_lan[language],
              resources,
            });
          },
          translate: (text) => {
            return text !== undefined || text !== null ? i18n.t(text) : 'None';
          },
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
