import * as React from 'react';
import {Alert} from 'react-native';

export default function storeValidation(state) {
  if (state.warehouseName == '') {
    Alert.alert('Error', 'Please select ware house name');
    return false;
  } else if (state.date == '') {
    Alert.alert('Error', 'Please select date');
    return false;
  } else if (state.itemName == 0) {
    Alert.alert('Error', 'Please select Item  name');
    return false;
  } else if (state.quantity == '0') {
    Alert.alert('Error', 'Quantity can not be 0');
    return false;
  } else if (state.deptName == '') {
    Alert.alert('Error', 'Please select Department');
    return false;
  } else if (state.purpose == '') {
    Alert.alert('Error', 'Please type Purpose');
    return false;
  }

  return true;
}
