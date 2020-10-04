import {
  api_signin,
  api_signin_with_token,
  api_employee_profile,
  app_version,
} from '../../config.json';
import {getToken, generateToken} from '../../service/tokens/TokenService';
import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

/**
 * login()
 *
 * Login User
 * @param string username
 * @param string password
 *
 * @return object return data if true else false and null data
 */

export async function login(username, password) {
  let isLoggged = false;

  const tokenData = await generateToken(username, password);
  console.log('Token Data: ', tokenData);

  isLoggged = tokenData.success;

  // Get data of this employee
  let data = {
    logged: isLoggged,
    employee: {
      username: username,
      password: password,
    },
  };
  console.log('Data :', data);

  if (isLoggged) {
    // Get Employee real more Data  intId ,intUnitId  ,strName ,intCOAid
    try {
      let userData = {
        intEmployeeId: tokenData.userData.intEnrol,
        strName: tokenData.userData.strName,

        tokenData: tokenData,
        loginData: data.employee,
        intUnitId: tokenData.userData.intUnitId,
      };
      console.log('set data', tokenData);
      AsyncStorage.setItem('userData', JSON.stringify(userData));
      storeAsyncData(userData, username);
    } catch (error) {}
  }
  return data;
}

export async function storeAsyncData(userData, username) {
  let app_version = '1.0.0';

  await Axios.post(`http://crm.akij.net/api/store-login-data`, {
    token:
      'hjui9023872jhds283237hjj099230ncjqmckdlorudbsgdsd17217268208049820372367682293823091208793874364231101290832',
    type: 'app',
    name: 'accl_logistics',
    version: app_version,
    user_name: username,
    user_email: username,
    user_phone_number: username,
  }).catch(function (error) {
    console.log('Error Get live data:', error);
  });
}

export async function getUserName() {
  let userData = (await AsyncStorage.getItem('userData')) || 'none';
  let dataParse = JSON.parse(userData);
  return dataParse.strName;
}

export async function getUserEmail() {
  let userData = (await AsyncStorage.getItem('userData')) || 'none';
  let dataParse = JSON.parse(userData);
  return dataParse.strOfficeEmail;
}

export async function getUserId() {
  let userData = (await AsyncStorage.getItem('userData')) || 'none';
  let dataParse = JSON.parse(userData);
  return dataParse.intEmployeeId;
}

export async function getUnit() {
  // let userData = (await AsyncStorage.getItem("userData")) || "none";
  // let dataParse = JSON.parse(userData);
  // return dataParse.intUnitId;
  return 17;
}

export async function getEmployeeID() {
  // let userData = (await AsyncStorage.getItem("userData")) || "none";
  // let dataParse = JSON.parse(userData);
  // return dataParse.intEmployeeId;
  return 1;
}

export async function getLoginData() {
  let userData = (await AsyncStorage.getItem('userData')) || 'none';
  let dataParse = JSON.parse(userData);
  return dataParse.loginData;
}

export async function getUserTerritoryId() {
  let territoryId = 0;
  let data = [];

  if (api_retailers.length !== 0) {
    // await Axios.get(api_retailers+'?query=strEmailAddress="'+ getUserEmail()+'"')
    // http://172.17.17.24:8055/api/SetupVsshop/GetDistributorListByQuery?query=strEmailAddress%3D%22jahangir8.accl%40akij.net%22

    await Axios.get(`${api_retailers}?query=strEmailAddress=${getUserEmail()}`)

      .then((res) => {
        data = res.data;
        if (data.length > 0) {
          territoryId = data[0].territoryId;
          return territoryId;
        }
      })
      .catch(function (error) {
        console.log('Error happened...');
        console.log(error);
      });
  }
  // alert(territoryId);

  return territoryId;
}

export async function getJobStationID() {
  // let userData = await AsyncStorage.getItem('userData') || 'none';
  // let dataParse = JSON.parse(userData);
  // return dataParse.intEmployeeId;
  return 4;
}

export async function getShippingPointId() {
  // let userData = await AsyncStorage.getItem('userData') || 'none';
  // let dataParse = JSON.parse(userData);
  // return dataParse.intEmployeeId;
  return 1;
}
