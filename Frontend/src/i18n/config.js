import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  fallbackLng: '1',
  lng: '1',
  resources: {
    1: {
      translations: require('./locales/1/translation.json')
    },
    2: {
      translations: require('./locales/2/translation.json')
    }
  },
  ns: ['translations'],
  defaultNS: 'translations'
});

i18n.languages = ['1', '2'];

export default i18n;