import AsyncStorage from '@react-native-community/async-storage';

export async function getUserId() {
  let data = await getUserData();
  if (typeof data != 'undefined' && data != null) return data.intEmployeeId;
}
export async function getJobStationId() {
  let data = await getUserData();
  if (typeof data != 'undefined' && data != null) return data.intJobStationId;
}
export async function getUserName() {
  let data = await getUserData();
  if (typeof data != 'undefined' && data != null) return data.strAlias;
}
export async function getUserTypeId() {
  let data = await getUserData();
  if (typeof data != 'undefined' && data != null) return data.intUserTypeID;
}
export async function getApiToken() {
  let userData = (await AsyncStorage.getItem('tokenData')) || 'none';
  let dataParse = JSON.parse(userData);
  return dataParse;
}
export async function getUserData() {
  let userData = (await AsyncStorage.getItem('userData')) || 'none';
  let dataParse = JSON.parse(userData);
  return dataParse;
}

export async function getExternalUserData() {
  let userData = (await AsyncStorage.getItem('externalUserData')) || 'none';
  let dataParse = JSON.parse(userData);
  return dataParse;
}
export async function getUnitId() {
  let data = await getUserData();
  if (typeof data != 'undefined' && data != null) return data.intUnitId;
}
export async function getcustomerTerritoryID() {
  let data = await getUserData();
  console.log('data', data);
  if (typeof data != 'undefined' && data != null) return data.territoryId;
}
export async function getcustomerSalesOfficeId() {
  let data = await getUserData();
  console.log('data', data);
  if (typeof data != 'undefined' && data != null) return data.salesofficeId;
}

export async function getUnitName() {
  let data = await getUserData();
  const intUnitId =
    typeof data != 'undefined' && data != null ? data.intUnitId : 0;

  //
}

/**
 * getExternalUserID
 */
export async function getExternalUserID() {
  let data = await getExternalUserData();
  let intUserID = null;

  if (typeof data != 'undefined' && data != null) {
    if (data.intUserTypeID == 1) {
      // ERP User
      intUserID = data.intEnrol;
    } else if (data.intUserTypeID == 2) {
      // Supplier
      intUserID = data.intSupplierID;
    } else if (data.intUserTypeID == 3) {
      // Driver
      intUserID = data.intEnrol;
    } else if (data.intUserTypeID == 4) {
      // Master
      intUserID = data.intEnrol;
    } else if (data.intUserTypeID == 5) {
      // Customer
      intUserID = data.intCustomerID;
    } else if (data.intUserTypeID == 6) {
      // Guard
      intUserID = data.intEnrol;
    } else if (data.intUserTypeID == 7) {
      // Government
      intUserID = data.intGovt;
    } else if (data.intUserTypeID == 8) {
      // Driver External
      intUserID = data.intDriverExternal;
    }
  }
  return intUserID;
}

export async function getExternalUserFullName() {
  let data = await getExternalUserData();
  if (typeof data != 'undefined' && data != null) {
    return data.strName;
  }
  return null;
}

export async function getExternalUserName() {
  let data = await getExternalUserData();
  if (typeof data != 'undefined' && data != null) {
    return data.strUserName;
  }
  return null;
}

export async function getExternalUserPhone() {
  let data = await getExternalUserData();
  if (typeof data != 'undefined' && data != null) {
    return data.strPhone;
  }
  return null;
}
