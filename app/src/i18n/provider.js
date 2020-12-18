import React, { Fragment } from "react";
import { IntlProvider } from "react-intl";
import { LOCALES } from "./locales";

import messages_lan from "./messages";

const Context = React.createContext();

class IntlProviderWrapper extends React.Component {
  state = {
    locale: LOCALES.ENGLISH,
    messages: messages_lan[LOCALES.ENGLISH],
  };

  render() {
    const { children } = this.props;
    const { locale, messages } = this.state;
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
        }}
      >
        <IntlProvider
          key={locale}
          locale={locale}
          messages={messages}
          defaultLocale={LOCALES.ENGLISH}
        >
          {children}
        </IntlProvider>
      </Context.Provider>
    );
  }
}

export { IntlProviderWrapper, Context as IntlContext };

// const Provider = ({ children, locale = LOCALES.ENGLISH }) => (
//   <IntlProvider
//     locale={locale}
//     textComponent={Fragment}
//     messages={messages[locale]}
//   >
//     {children}
//   </IntlProvider>
// );

// export default Provider;
