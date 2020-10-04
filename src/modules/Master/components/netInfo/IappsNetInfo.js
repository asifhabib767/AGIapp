import React, {useEffect} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {View, Text, Button, Alert, Platform} from 'react-native';

export function IappsNetInfo() {
  let netStatus = false;
  return NetInfo.fetch().then((state) => {
    if (state.isConnected) {
      netStatus = true;
    } else {
      netStatus;
    }
    return netStatus;
  });
}
