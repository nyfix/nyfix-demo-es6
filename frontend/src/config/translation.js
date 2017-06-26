/*************************************************************************
 * ULLINK CONFIDENTIAL INFORMATION
 * _______________________________
 *
 * All Rights Reserved.
 *
 * NOTICE: This file and its content are the property of Ullink. The
 * information included has been classified as Confidential and may
 * not be copied, modified, distributed, or otherwise disseminated, in
 * whole or part, without the express written permission of Ullink.
 ************************************************************************/

import counterpart from 'counterpart';
import {setLocale} from 'reducers/locale';
const translations = {
  en: require('lang/en.json'),
  fr: require('lang/fr.json'),
  zh: require('lang/zh.json'),
  jp: require('lang/jp.json')
};

const locales = Object.keys(translations);

let currentLocale;
let savedLocale = localStorage.getItem('locale') || 'en';
const registerLocales = (store) => {
  locales.forEach(key => {
    counterpart.registerTranslations(key, translations[key]);
  });
  store.subscribe(() => {
    let previousLocale = currentLocale;
    currentLocale = store.getState().locale.currentLocale;
    if (previousLocale !== currentLocale) {
      localStorage.setItem('locale', currentLocale);
      counterpart.setLocale(currentLocale);
    }
  });
  store.dispatch(setLocale(savedLocale));
  return savedLocale;
};

export {
  locales,
  registerLocales
}
