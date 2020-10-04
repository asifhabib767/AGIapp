import {
  api_signin,
  api_employee_profile,
  api_retailers,
  app_version,
} from '../../SalesConfig.json';
import { getToken } from '../../service/tokens/TokenService';
import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { getUserData } from '../../../User/util/AuthData';

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

  // Check if there is @ in the username
  if (username.indexOf('@') !== -1) {
    username = username.substring(0, username.indexOf('@'));
  }

  let api_signin_link = api_signin;

  try {
    await Axios.get(api_signin_link, {
      params: {
        username: username,
        password: password,
      },
    }).then((res) => {
      isLoggged = res.data;
      console.log(res);
    });
  } catch (error) {
    isLoggged = false;
    console.log('api link: ', api_signin_link);
    console.log('Login Error: ', error);
  }

  // Get data of this employee
  let data = {
    logged: isLoggged,
    employee: {
      username: username,
      password: password,
    },
  };
  console.log('Data :', data);

  // Store live app data
  let app_playstore_link = '';
  let app_latest_version = '';

  await Axios.get(
    `http://crm.akij.net//api/get-app-data?token=hjui9023872jhds283237hjj099230ncjqmckdlorudbsgdsd17217268208049820372367682293823091208793874364231101290832&app_name=AkijCement`,
  )
    .then(function (response) {
      if (response.data.status) {
        console.log('link is', response.data);
        app_playstore_link = response.data.appData.playstore_link;
        app_latest_version = response.data.appData.latest_version;
      }
    })
    .catch(function (error) {
      console.log('Error Get live data:', error);
    });

  if (isLoggged) {
    // Get Employee real more Data
    // intUnitId = 91 and strAlias="akash.corp"
    //let api_profile_link = `http://masterdata.akij.net/api/EmployeeProfile/GetEmployeeJobStationsByQuery?query=strAlias=${username}`
    try {
      await Axios.get(
        `${api_employee_profile}?query=strOfficeEmail="${username}@akij.net"`,
      ).then(function (response) {
        // handle success
        console.log('profile params', response.data[0]);
        let responsData = response.data[0];
        if (response) {
          //object destructuring
          const {
            intEmployeeId,
            strEmployeeCode,
            strEmployeeName,
            intUnitId,
            intJobStationId,
            intJobTypeId,
            strOfficeEmail,
            strContactNo1,
            strJobStationName,
            strPermanentAddress,
            strPresentAddress,
            strAlias,
            strCountry,
            strCity,
            dteBirth,
            strDescription,
            strJobType,
            strDistrict,
            strManager,
            strDesignation,
            strDepatrment,
          } = responsData;

          //set data to the async storage
          let userData = {
            intEmployeeId: intEmployeeId,
            strEmployeeCode: strEmployeeCode,
            strEmployeeName: strEmployeeName,
            intUnitId: intUnitId,
            intJobStationId: intJobStationId,
            intJobTypeId: intJobTypeId,
            strOfficeEmail: strOfficeEmail,
            strContactNo1: strContactNo1,
            strJobStationName: strJobStationName,
            strPermanentAddress: strPermanentAddress,
            strPresentAddress: strPresentAddress,
            strAlias: strAlias,
            strCountry: strCountry,
            strCity: strCity,
            dteBirth: dteBirth,
            strDescription: strDescription,
            strJobType: strJobType,
            strDistrict: strDistrict,
            strManager: strManager,
            strDesignation: strDesignation,
            strDepatrment: strDepatrment,
          };
          console.log('set data', userData);
          AsyncStorage.setItem('userData', JSON.stringify(userData));
          storeAsyncData(userData);
        } else {
        }
      });
    } catch (error) { }
  }
  return data;
}

export async function storeAsyncData(userData) {
  await Axios.post(`http://crm.akij.net/api/store-login-data`, {
    token:
      'hjui9023872jhds283237hjj099230ncjqmckdlorudbsgdsd17217268208049820372367682293823091208793874364231101290832',
    type: 'app',
    name: 'iApps',
    version: app_version,
    user_name: userData.strEmployeeName + ' (' + userData.intEmployeeId + ')',
    user_email: userData.strOfficeEmail,
    user_phone_number: userData.strContactNo1,
  })
    .then(function (response) {
      console.log('response is crm', response);
    })
    .catch(function (error) {
      console.log('Error Get live data:', error);
    });
}

export async function getUserEmail() {
  let data = await getUserData();
  if (typeof data != 'undefined' && data != null) return data.strOfficeEmail;
  strOfficeEmail;
}

export async function getUserId() {
  let data = await getUserData();
  if (typeof data != 'undefined' && data != null) return data.intEmployeeId;
}

export async function getUserCode() {
  let data = await getUserData();
  if (typeof data != 'undefined' && data != null) return data.strEmployeeCode;
}

export async function getUnit() {
  let data = await getUserData();
  if (typeof data != 'undefined' && data != null) return data.intUnitId;
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
