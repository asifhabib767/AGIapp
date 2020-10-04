import React from "react";
import { Platform, Alert } from "react-native";
import RNAndroidLocationEnabler from "react-native-android-location-enabler";

export function LocationEnabler() {
  if (Platform.OS === "android") {
    RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
      interval: 10000,
      fastInterval: 5000
    })
      .then(data => {
        // alert(data);
      })
      .catch(err => {
        // The user has not accepted to enable the location services or something went wrong during the process
        // "err" : { "code" : "ERR00|ERR01|ERR02", "message" : "message"}
        // codes :
        //  - ERR00 : The user has clicked on Cancel button in the popup
        //  - ERR01 : If the Settings change are unavailable
        //  - ERR02 : If the popup has failed to open
        // alert("Error " + err.message + ", Code : " + err.code);
        if (err.code == "ERR00") {
          Alert.alert(
            "Sorry",
            "You can not use this app without enabling location !"
          );
          LocationEnabler();
        }
      });
  }
}
