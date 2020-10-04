import { api_get_token, api_signin_with_token } from "../../config.json";
import { getLoginData } from "../auth/AuthService.js";

import Axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";

/**
 * generateToken
 *
 * Generate New token data for authenticated user
 *
 * @param {string} username
 * @param {string} password
 */

export async function generateToken(username, password) {
  let api_signin_link = api_signin_with_token;
  let tokenData = {};

  const loginData = {
    username: username,
    password: password,
  };

  const headers = {
    "Content-Type": "application/json",
  };

  let today = new Date();
  let date =
    today.getMonth() +
    1 +
    "/" +
    today.getDate() +
    "/" +
    today.getFullYear() +
    "  00:00:00";
  let tokenItem = {
    token: null,
    refreshToken: null,
    success: false,
    expires_in: 360000,
    actionTime: date,
    errors: null,
    userData: null,
  };

  tokenData = await Axios.get(
    `http://api2.akij.net:8066/api/DataForAppsUserIDNPasswdVerification/GeDataForAppsUserIDNPasswdVerification?intpart=1&username=${username}&passwd=${password}&intunitid=17`,
    loginData,
    { headers: headers }
  )
    .then(function (result) {
      if (result.data.length > 0) {
        tokenItem.token = generateRandomString(100);
        tokenItem.success = true;
        tokenItem.userData = result.data[0];
      }
      return tokenItem;
    })
    .catch(function (error) {
      console.log(error);
    });
  return tokenData;
}

export async function getGeneratedTokenData() {
  let tokenData = await getLoggedInTokenData();
  let token = tokenData.token;
  let refreshToken = tokenData.refreshToken;
  let expires_in = tokenData.expires_in;
  let actionTime = tokenData.actionTime; // 07-02-2020 08:02:51.79
  let tokenExpired = true;

  // If token expired, then generate new token by username and password
  let date1 = actionTime;
  let date1Updated = new Date(date1.replace(/-/g, "/")).getTime();

  // Add Time 3600 seconds
  let date2Updated = date1Updated + expires_in;

  if (tokenExpired) {
    let loginData = await getLoginData();
    tokenData = await generateToken(loginData.username, loginData.password);
  }

  return tokenData;
}

export async function getToken() {
  // let tokenData = await getGeneratedTokenData();
  // let token = tokenData.token;
  // return token;
  return "0128018209";
}

export async function getLoggedInTokenData() {
  let userData = (await AsyncStorage.getItem("userData")) || "none";
  let dataParse = JSON.parse(userData);
  return dataParse.tokenData;
}

export async function hasToken(username, password) {
  let tokenFound = true;
  // Axios post method to get token
  return tokenFound;
}

function generateRandomString(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_$@";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
