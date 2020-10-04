import * as en from "../translations/en.json";
import * as bn from "../translations/bn.json";
import { getAsyncData } from "../Util/OfflineData";

import AsyncStorage from "@react-native-community/async-storage";

export function translate(key, language) {
  let translatedValue = key;
  let systemSavedLanguage = language;

  // Check System settings language
  // if(language == null || language == ''){
  //     systemSavedLanguage = "bn";
  // }

  systemSavedLanguage = language;
  if (
    typeof systemSavedLanguage == "undefined" ||
    systemSavedLanguage == "undefined" ||
    systemSavedLanguage == ""
  ) {
    systemSavedLanguage = "bn";
  }
  //  else {
  //   systemSavedLanguage = "en";
  // }

  // Check if this key exist on the json files key (complex)
  let checkedJsonObject = getTranslatedObject(systemSavedLanguage);

  // If match then return the translated value
  if (checkedJsonObject.hasOwnProperty(key)) {
    for (let keyGet in checkedJsonObject) {
      if (keyGet == key) {
        translatedValue = checkedJsonObject[key];
      }
    }
  }

  // Else return only the key
  return translatedValue;
}

export async function getAsyncLanguageCode() {
  let languageCode = await getAsyncData("system_lang");
  return languageCode;
}

export function getTranslatedObject(lang) {
  let checkedJsonObject = {};
  if (lang === "en") {
    checkedJsonObject = en;
  } else if (lang === "bn") {
    checkedJsonObject = bn;
  }

  return checkedJsonObject;
}
