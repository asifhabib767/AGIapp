import { Alert } from 'react-native';
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
) {
    // let errorMsg = '';

    let errorMsg = {};

    if (intShipPointId === '') {
        errorMsg.intShipPointId = 'Please select shipping point name';
    }
    if (intSalesOffId === '') {
        errorMsg.intSalesOffId = 'Please select sales office';
    }
    if (intCustomerType === '') {
        errorMsg.intCustomerType = 'Please select Customer type';
    }
    if (intSalesTypeId === '') {
        errorMsg.intSalesType = 'Please select sales type';
    }
    if (product_quantity == 0) {
        errorMsg.productQuantiy = 'Please type product quantity';
    }
    if (intDisPointId == '') {
        errorMsg.intDisPointId = 'Please type Delivery point';
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
