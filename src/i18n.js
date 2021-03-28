import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// import LanguageDetector from 'i18next-browser-languagedetector';
import { AxiosGet } from 'Rest/Axios';
import {MAIN_URL} from "./rest/config";
import * as defaultLang from './defaulti18n.json'

// const checkLanguageVersion = async () => {
//   return AxiosGet({
//     url:`${MAIN_URL}/languages/available`})
// };

const loadLanguage = async (lang) => {
  const isSaved = localStorage.getItem(`${lang}Translate`);
  if (isSaved){
    i18n.addResourceBundle(lang, 'translation', JSON.parse(isSaved));
  }
  const status = {};
  const actualVersion = {};
  const {result}  = (await checkLanguageVersion()).data;
  // const result = resFirst.data;
  localStorage.setItem('languages', JSON.stringify(result));

  result.forEach(item => {
    if (localStorage.getItem(`${item.symbol}TranslateVersion`) !== item.version.toString()) {
      status[item.symbol] = true;
      actualVersion[item.symbol] = item.version;
    }
  });

  
  if (status[lang] || !isSaved) {
    return AxiosGet({
      url:`${MAIN_URL}/languages/get?namespace=main`,
      params: {symbol: lang}
    }).then((res) => {
      localStorage.setItem(`${lang}TranslateVersion`, actualVersion[lang]);
      localStorage.setItem(`${lang}Translate`,  JSON.stringify(res.data.result));
      i18n.addResourceBundle(lang, 'translation', res.data.result);
    });
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  // .use(LanguageDetector)
  // .use(Fetch)
  .init({
    resources: defaultLang.default,
		// debug: true,
    // backend: options,
    fallbackLng: 'en',
    // lng: 'ru',
    react: {
      bindI18nStore: 'added',
    },
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    saveMissing: true,
    missingKeyHandler:  (lng, ns, key) => { 
      // eslint-disable-next-line no-console
      console.log('%c Missing translation 👹', 'color: blue', key)
    }
});


const getLanguage = () => {
  const lang = i18n.language.split('-')[0].toLowerCase();
  switch (lang) {
    case 'ru':
      return 'ru';
    default:
      return 'en';
  }
}


// loadLanguage(getLanguage());



export {i18n as default, loadLanguage, getLanguage};
