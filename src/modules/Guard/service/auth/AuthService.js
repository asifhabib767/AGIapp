import {
  api_signin,
  api_signin_with_token,
  api_employee_profile,
} from "../../config.json";
import { getToken, generateToken } from "../../service/tokens/TokenService";
import Axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";

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
  let is_driver = "1";

  if (username.indexOf("@") !== -1) {
    username = username.substring(0, username.indexOf("@"));
  }

  const tokenData = await generateToken(username, password);
  let status = false;
  const enrolID =
    typeof tokenData.userData != "undefined" ? tokenData.userData.intEnrol : 0;

  if (enrolID > 0) {
    status = true;
  } else {
    // Check now with AD Authentication
    await Axios.get(
      `http://api1.akij.net:8053/api/ADAuthorization/ADAuthorization`,
      {
        params: {
          username: username,
          password: password,
        },
      }
    )
      .then(async (res) => {
        isLoggged = res.data;
        status = true;

        // get employee profile
        const api_employee_profile = `http://api1.akij.net:8055/api/EmployeeProfile/GetEmployeeJobStationsByQuery`;

        await Axios.get(
          `${api_employee_profile}?query=strOfficeEmail="${username}@akij.net"`
        )

          .then(function (response) {
            if (response.data.length > 0) {
              tokenData.userData = response.data[0];
              tokenData.userData.intEnrol = response.data[0].intEmployeeId;
              tokenData.userData.strName = response.data[0].strEmployeeName;
              tokenData.userData.intUnitId = response.data[0].intUnitId;
              username = response.data[0].strContactNo1;
              status = true;
              is_driver = "0";
            } else {
              status = false;
              is_driver = "1";
            }
          })
          .catch((res) => {
            status = false;
            console.log("error", res);
          });
      })
      .catch((err) => {
        status = false;
        console.log("err", err);
      });
  }

  isLoggged = status;
  // Get data of this employee
  let data = {
    logged: status,
    employee: {
      username: username,
      password: password,
    },
  };

  if (status) {
    // Get Employee real more Data  intId ,intUnitId  ,strName ,intCOAid
    try {
      let userData = {
        intEmployeeId: tokenData.userData.intEnrol,
        strName: tokenData.userData.strName,

        tokenData: tokenData,
        loginData: data.employee,
        intUnitId: tokenData.userData.intUnitId,
        is_driver: is_driver,
      };
      AsyncStorage.setItem("userData", JSON.stringify(userData));
      AsyncStorage.setItem("is_driver", is_driver);
      // storeAsyncData(userData, username);
    } catch (error) {}
  }
  return data;
}

export async function getUserEmail() {
  let userData = (await AsyncStorage.getItem("userData")) || "none";
  let dataParse = JSON.parse(userData);
  return dataParse.strOfficeEmail;
}

export async function getUserId() {
  let userData = (await AsyncStorage.getItem("userData")) || "none";
  let dataParse = JSON.parse(userData);
  return dataParse.intEmployeeId;
}

export async function getUnit() {
  // let userData = await AsyncStorage.getItem('userData') || 'none';
  // let dataParse = JSON.parse(userData);
  // return dataParse.intUnitId;
  return 4;
}

export async function getEmployeeID() {
  let userData = (await AsyncStorage.getItem("userData")) || "none";
  let dataParse = JSON.parse(userData);
  return dataParse.intEmployeeId;
}

export async function getJobStationID() {
  // let userData = await AsyncStorage.getItem('userData') || 'none';
  // let dataParse = JSON.parse(userData);
  // return dataParse.intEmployeeId;
  return 4;
}

export async function getLoginData() {
  let userData = (await AsyncStorage.getItem("userData")) || "none";
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
        console.log("Error happened...");
        console.log(error);
      });
  }
  // alert(territoryId);

  return territoryId;
}
