import {Alert} from 'react-native';
export function LoginValidation(username, password) {
  let errorMsg = '';

  if (username === '') {
    errorMsg = 'Please give your username';
  } else if (password === '') {
    errorMsg = 'Please give your password';
  }

  let LoginData = {
    errorMsg: errorMsg,
  };
  return LoginData;
}
export function SalesOrderValidation(
  intShipPointId,
  intSalesOffId,
  intCustomerType,
  intSalesTypeId,
  product_quantity,
  intDisPointId,
  product_price,
) {
  // let errorMsg = '';

  let errorMsg = {};

  if (intSalesOffId === '') {
    errorMsg.intSalesOffId = 'Please select sales office';
  }
  if (intCustomerType === '') {
    errorMsg.intCustomerType = 'Please select Customer type';
  }
  if (intSalesTypeId === '') {
    errorMsg.intSalesType = 'Please select sales type';
  }
  if (intShipPointId === '') {
    errorMsg.intShipPointId = 'Please select shipping point name';
  }
  if (product_quantity == 0) {
    errorMsg.productQuantiy = 'Please type product quantity';
  }
  if (intDisPointId == '') {
    errorMsg.intDisPointId = 'Please type Delivery point';
  }
  if (product_price < 1) {
    errorMsg.product_price = 'Plese set your Product Price';
  }

  let salesOrderError = {
    errorMsg: errorMsg,
  };
  //console.log(errorMsg);
  return salesOrderError;
}

export function leaveValidation(fromDate, endDate, reason, address) {
  if (fromDate == '') {
    Alert.alert('error', 'Please type your start time');
    return false;
  } else if (endDate == '') {
    Alert.alert('error', 'Please type your End time');
    return false;
  } else if (reason == '') {
    Alert.alert('error', 'Please type your Reason');
    return false;
  } else if (address == '') {
    Alert.alert('error', 'Please type Address');
    return false;
  }
  return true;
}
export function MovementValidation(fromDate, endDate, reason, address) {
  if (fromDate == '') {
    Alert.alert('error', 'Please type your start time');
  } else if (endDate == '') {
    Alert.alert('error', 'Please type your End time');
  } else if (reason == '') {
    Alert.alert('error', 'Please type your Reason');
  } else if (address == '') {
    Alert.alert('error', 'Please type Address');
  }
}

export function DriverValidation(mobile, drivername, driverlicense) {
  let errorMsg = {};

  if (mobile == '') {
    errorMsg = 'Please Give Driver Mobile No';
  }
  if (mobile.length !== 11) {
    errorMsg = 'Mobile No should be 11 digit long';
  }
  if (drivername === '') {
    errorMsg = 'Please Give Driver Name';
  }
  if (driverlicense === '') {
    errorMsg = 'Please Give Driver License No';
  }
  return errorMsg;
}
