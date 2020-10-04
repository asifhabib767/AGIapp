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
export function OutlateValidation(
    route,
    outlate,
    outletaddress,
    owner,
    mobile,
    email,
    BusinessType,
    dateOfBith,
    marriageDate,
    images,
    latitude,
    longitude,
) {
    // let errorMsg = '';

    let errorMsg = {};

    if (route === '') {
        errorMsg.route = 'Please select your Route name';
    }
    if (outlate === '') {
        errorMsg.outlate = 'Please type outlet name';
    }
    if (owner === '') {
        errorMsg.owner = 'Please type owner/manager name';
    }
    if (outletaddress === '') {
        errorMsg.outletaddress = 'Please type outlet address';
    }
    if (mobile === '') {
        errorMsg.mobile = 'Please type mobile Number';
    }
    if (mobile.length !== 11) {
        errorMsg.mobile = 'Mobile No should be 11 characters long';
    }
    if (BusinessType == 0) {
        errorMsg.productQuantiy = 'Please select your Business Type';
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
    } else if (endDate == '') {
        Alert.alert('error', 'Please type your End time');
    } else if (reason == '') {
        Alert.alert('error', 'Please type your Reason');
    } else if (address == '') {
        Alert.alert('error', 'Please type Address');
    }
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