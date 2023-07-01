import i18n from "i18next";
import { reactI18nextModule } from "react-i18next";
import React from "react";
import translationEN from "../../public/locales/en/translation.json";
import translationRU from "../../public/locales/ru/translation.json";
import translationUZ from "../../public/locales/uz/translation.json";

// the translations
const resources = {
  en: {
    translation: translationEN,
  },
  ru: {
    translation: translationRU,
  },
  uz: {
    translation: translationUZ,
  },
};

i18n
  .use<any>(reactI18nextModule) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "ru",
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
