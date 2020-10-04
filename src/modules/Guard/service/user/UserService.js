import { server_api_base_url } from "../../config.json";
import { getToken } from "../tokens/TokenService";
import Axios from "axios";
import {
  getUserEmail,
  getUnit,
  getEmployeeID,
  getJobStationID,
} from "../auth/AuthService.js";
import AsyncStorage from "@react-native-community/async-storage";

export async function getUserByEnroll($enroll) {
  let employeeId = $enroll;
  let data = [];

  try {
    let headersData = {
      Authorization: `bearer ${await getToken()}`,
      "Content-Type": "application/json",
    };

    let url = `http://iapps.akij.net/api/v1/guard/getProfileInformationByEmployeeId?intEmployeeID=${employeeId}`;

    await Axios.get(`${url}`, { headers: headersData })

      .then(function (response) {
        data = response.data.data;
        return data;
      })
      .catch(function (error) {});
  } catch (error) {
    data = [];
  }
  return data;
}

export async function addGuardInfo(infoData) {
  let postData = {
    intUnitId: await getUnit(),
    strName: infoData.name,
    intEnrol: infoData.enroll,
    ysnEnable: true,
    intInsertby: await getEmployeeID(),
    strPhone: infoData.phoneNo,
    strPasswd: infoData.password,
    strUserName: infoData.phoneNo,
    ysnOwnUser: true,
    intShippingPoint: await getJobStationID(),
  };

  const headers = {
    "Content-Type": "application/json",
  };

  let url = `http://iapps.akij.net/api/v1/guard/createGuardInformation`;

  let createProfilePost = await Axios.post(url, postData, { headers: headers })

    .then(function (response) {
      if (response.status === 200) {
        return response;
      }
    })
    .catch(function (error) {
      console.log("error data:>> ", error);
    });

  return createProfilePost;
}
