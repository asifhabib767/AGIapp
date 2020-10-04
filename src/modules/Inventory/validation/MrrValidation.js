import * as React from 'react';
import {Alert} from 'react-native';

export default function addMrrValidation(state) {
  console.log('state validation', state);
  if (state.warehouseName == '') {
    Alert.alert('Error', 'Please select warehouse');
    return false;
  } else if (state.purpose == '') {
    Alert.alert('Error', 'Please type Purpose');
    return false;
  } else if (state.POName == '') {
    Alert.alert('Error', 'Please select PO Name');
    return false;
  } else if (state.invoiceNo == '') {
    Alert.alert('Error', 'Please type Invoice No');
    return false;
  } else if (state.challan == '') {
    Alert.alert('Error', 'Please type Challan No');
    return false;
  } else if (state.date == '') {
    Alert.alert('Error', 'Please select Challan date');
    return false;
  } else if (state.vatChallan == '') {
    Alert.alert('Error', 'Please type vat challan no ');
    return false;
  } else if (state.vatAmount == '') {
    Alert.alert('Error', 'Please type Vat amount ');
    return false;
  } else if (state.quantity == '0') {
    Alert.alert('Error', 'Quantity can not be 0');
    return false;
  }

  return true;
}
