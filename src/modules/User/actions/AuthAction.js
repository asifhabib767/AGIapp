import * as Types from '../types/Types';
import * as config from '../../../../app.json';

import {app_version} from '../../Master/main_config.json';

import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

export const inputAddHandling = (inputName, inputValue) => async (dispatch) => {
  let data = {
    inputName: inputName,
    inputValue: inputValue,
  };
  dispatch({type: Types.AUTH_LOGIN_INPUT_HANDELING, payload: data});
};
export const loginAction = (data) => async (dispatch) => {
  let username = data.username;
  if (username.indexOf('@') !== -1) {
    username = username.substring(0, username.indexOf('@'));
  }
  let loginResponse = {
    status: false,
    message: '',
    isLoading: true,
    tokenData: '',
    data: {},
  };
  dispatch({type: Types.AUTH_LOGIN_CHECK, payload: loginResponse});

  let userData = {};
  let strUserType = '';
  const url = `http://api1.akij.net:8053/api/ADAuthorization/ADAuthorization`;
  try {
    await axios
      .get(url, {
        params: {
          username: username,
          password: data.password,
        },
      })
      .then(async (res) => {
        console.log('res', res);
        let data = res.data;
        loginResponse.status = true; //data.status;
        loginResponse.message = 'Logged in Successfully !!'; //data.message;
        loginResponse.tokenData = '123456'; // data.access_token;
        loginResponse.data = 'Test'; //data.user;

        await axios
          .get(
            `http://api1.akij.net:8055/api/EmployeeProfile/GetEmployeeJobStationsByQuery?query=strOfficeEmail="${username}@akij.net"`,
          )
          .then(async function (response) {
            console.log('EmployeeProfile', response);
            let responsData = response.data[0];
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

            userData = {
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
              tokenData: 'tokenData',
              loginData: data.employee,
              intUserTypeID: 1,
              strUserType: 'ERP User',
              ysnOwnUser: 1,
              moduleLists: [],
            };
            strUserType = 'ERP User';
            loginResponse.data = userData;
            // AsyncStorage.setItem('userData', JSON.stringify(userData));
            if (loginResponse.status == true) {
              // if successfull then call module list api and get modules list array and update that to userData.moduleLists
              let responseList = {
                // isLoading: true,
                data: {},
              };
              await axios
                .get(
                  `http://iapps.akij.net/asll/public/api/v1/roles/getModulePermissionByUserTypeID?intUserTypeID=1`,
                )
                .then((res) => {
                  console.log('getModulePermissionByUserTypeID', res);
                  // responseList.isLoading = false;
                  responseList = res.data.data;
                })
                .catch((error) => {
                  console.log('errorData', error);
                  responseList.isLoading = false;
                });
              // return responseList;
              userData.moduleLists = responseList;
              loginResponse.data = userData;
            }
          });
      })
      .catch(async (error) => {
        // error
        console.log('basic error => ', error);

        /** Check now with external data sets ->> driver, customer, supplier, master etc. */
        await axios
          .post(
            'http://iapps.akij.net/asll/public/api/v1/auth/external-login',
            {
              username: username,
              password: data.password,
            },
          )
          .then(async (res) => {
            console.log('res login with extra credentials', res.data);
            const loginUserData = res.data.data.user;
            let intUserID = 0;
            strUserType = loginUserData.strUserType;

            if (loginUserData.intUserTypeID == 1) {
              // ERP User
              intUserID = loginUserData.intEnrol;
            } else if (loginUserData.intUserTypeID == 2) {
              // Supplier
              intUserID = loginUserData.intSupplierID;
            } else if (loginUserData.intUserTypeID == 3) {
              // Driver
              intUserID = loginUserData.intEnrol;
              strUserType = loginUserData.strDesignation;
            } else if (loginUserData.intUserTypeID == 4) {
              // Master
              intUserID = loginUserData.intEnrol;
            } else if (loginUserData.intUserTypeID == 5) {
              // Customer
              intUserID = loginUserData.intCustomerID;
            } else if (loginUserData.intUserTypeID == 6) {
              // Guard
              intUserID = loginUserData.intEnrol;
            } else if (loginUserData.intUserTypeID == 7) {
              // Government
              intUserID = loginUserData.intGovt;
            } else if (loginUserData.intUserTypeID == 8) {
              // Driver External
              intUserID = loginUserData.intDriverExternal;
            } else if (loginUserData.intUserTypeID == 9) {
              // General User
              intUserID = loginUserData.intEnrol;
              strUserType = loginUserData.strDesignation;
            }

            loginResponse.isLoading = false;
            loginResponse.status = true; //data.status;
            loginResponse.message = 'Logged in Successfully !!'; //data.message;
            loginResponse.tokenData = '123456'; // data.access_token;
            loginResponse.data = 'Test'; //data.user;

            const userData = {
              intEmployeeId: intUserID,
              strEmployeeCode: intUserID,
              strEmployeeName: loginUserData.strName,
              intUnitId: loginUserData.intUnitId,
              intJobStationId: null,
              intJobTypeId: null,
              strOfficeEmail: null,
              strContactNo1: loginUserData.strPhone,
              strJobStationName: null,
              strPermanentAddress: null,
              strPresentAddress: null,
              strAlias: loginUserData.strUserName,
              strCountry: 'Bangladesh',
              strCity: null,
              dteBirth: null,
              strDescription: null,
              strJobType: null,
              strDistrict: null,
              strManager: null,
              strDesignation: strUserType,
              strDepatrment: null,
              tokenData: 'tokenData',
              loginData: data.employee,
              intUserTypeID: loginUserData.intUserTypeID,
              strUserType: loginUserData.strUserType,
              ysnOwnUser: loginUserData.ysnOwnUser,
              territoryId: loginUserData.customerTerritoryID,
              salesofficeId: loginUserData.customerSalesOfficeId,
              moduleLists: [],
            };

            strUserType = loginUserData.strUserType;

            if (loginResponse.status == true) {
              // if successfull then call module list api and get modules list array and update that to userData.moduleLists
              let responseList = {
                // isLoading: true,
                data: {},
              };
              console.log('userData.intUserTypeID', userData.intUserTypeID);
              await axios
                .get(
                  `http://iapps.akij.net/asll/public/api/v1/roles/getModulePermissionByUserTypeID?intUserTypeID=${userData.intUserTypeID}`,
                )
                .then((res) => {
                  console.log('getModulePermissionByUserTypeID', res);
                  // responseList.isLoading = false;
                  responseList = res.data.data;
                })
                .catch((error) => {
                  console.log('errorData', error);
                  responseList.isLoading = false;
                });
              // return responseList;
              userData.moduleLists = responseList;
              loginResponse.data = userData;
            }
          })
          .catch((err) => {
            console.log('Error with custom login external', error);
            loginResponse.isLoading = false;
            loginResponse.status = false;
            loginResponse.data = 'Invalid Username and Password';
            loginResponse.tokenData = null;
            loginResponse.message = 'Invalid Username and Password';
          });
      });

    // If successfully logged
    // Store Data to login_attempts and store also app version
    await axios.post(`http://crm.akij.net/api/store-login-data`, {
      token:
        'hjui9023872jhds283237hjj099230ncjqmckdlorudbsgdsd17217268208049820372367682293823091208793874364231101290832',
      type: 'app',
      name: 'iapp',
      version: app_version,
      user_name:
        loginResponse.data.strEmployeeName +
        ' (' +
        loginResponse.data.intEmployeeId +
        ')',
      user_email: loginResponse.data.strOfficeEmail,
      user_phone_number: loginResponse.data.strContactNo1,
      user_type: strUserType,
    });

    loginResponse.isLoading = false;
    dispatch({type: Types.AUTH_LOGIN_CHECK, payload: loginResponse});
  } catch (error) {
    console.log('Final Error', error);
  }
};

export const getAuthAction = () => async (dispatch) => {
  let userData = (await AsyncStorage.getItem('userData')) || null;
  let isLoggedIn = false;

  if (userData != null) {
    userData = JSON.parse(userData);
    isLoggedIn = true;
  }
  const payloadData = {
    isLoading: false,
    isLoggedIn: isLoggedIn,
    userData: userData,
  };
  dispatch({type: Types.GET_AUTH_DATA, payload: payloadData});
};
export const logoutAction = () => async (dispatch) => {
  dispatch({type: Types.GET_LOGOUT, payload: ''});
};
export const emptyMessage = () => (dispatch) => {
  dispatch({type: Types.EMPTY_LOGIN_MESSAGE, payload: true});
};
