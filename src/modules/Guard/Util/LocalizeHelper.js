import {  I18nManager } from 'react-native';

import * as RNLocalize from "react-native-localize";
import i18n from "i18n-js";
import memoize from "lodash.memoize";
  
//   export function translate (keyPass) {
//     let key = keyPass;
//     return memoize(
//         (key, config) => i18n.t(key, config),
//         (key, config) => (config ? key + JSON.stringify(config) : key)
//     );
//   }

  export function translate () {
    return memoize(
        (key, config) => i18n.t(key, config),
        (key, config) => (config ? key + JSON.stringify(config) : key)
    );
  }
  
  export function setI18nConfig () {
    // fallback if no available language fits
    const fallback = { languageTag: "en", isRTL: false };

    const translationGetters = {
        // lazy requires (metro bundler does not support symlinks)
        en: () => require("../../src/translations/en.json"),
        bn: () => require("../../src/translations/bn.json")
    };

  
    const { languageTag, isRTL } =
      RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
      fallback;
  
    // clear translation cache
    translate().cache.clear();

    // update layout direction
    I18nManager.forceRTL(isRTL);

    // set i18n-js config
    i18n.translations = { [languageTag]: translationGetters[languageTag]() };
    i18n.locale = languageTag;
  };

export function handleLocalizationChange () {
    setI18nConfig();
    // forceUpdate();
};