import React from "react";
import { IntlProvider } from "react-intl";
import { LOCALES } from "./locales";

import i18n from "i18next";
import { initReactI18next, I18nextProvider } from "react-i18next";

import messages_lan from "./messages";

const Context = React.createContext();

// import i18n from "i18next";

// import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: messages_lan[LOCALES.ENGLISH],
  },
  en: {
    translation: messages_lan[LOCALES.PORTUGUESE],
  },
};

// export default i18n;

class IntlProviderWrapper extends React.Component {
  state = {
    locale: LOCALES.ENGLISH,
    messages: messages_lan[LOCALES.ENGLISH],

    i18n: i18n
      .use(initReactI18next) // passes i18n down to react-i18next
      .init({
        resources,
        lng: LOCALES.ENGLISH,

        keySeparator: false, // we do not use keys in form messages.welcome

        interpolation: {
          escapeValue: false, // react already safes from xss
        },
      }),
  };

  render() {
    const { children } = this.props;
    const { locale, messages, i18n } = this.state;
    return (
      <Context.Provider
        value={{
          state: this.state,
          switchLanguage: (language) => {
            this.setState({
              locale: language,
              messages: messages_lan[language],
            });
          },
          i18n,
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
