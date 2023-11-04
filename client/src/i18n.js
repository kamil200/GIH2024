import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from "./locales/en.json";
import hiTranslation from './locales/hi.json';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslation,
    },
    hi: {
      translation: hiTranslation,
    },
  },
  lng: 'en', // Default language is English
  fallbackLng: 'en', // Fallback language is also English
  interpolation: {
    escapeValue: false, // React already escapes HTML, so no need for double escaping
  },
});

export default i18n;
