import { api_get_message_type } from "../../config.json";
import { getToken } from "../tokens/TokenService";
import Axios from "axios";
import { getUserEmail, getUnit, getEmployeeID } from "../auth/AuthService.js";
import AsyncStorage from "@react-native-community/async-storage";
import DateTimePicker from "react-native-modal-datetime-picker";
import { Actions } from "react-native-router-flux";

export async function getMessageType() {
  let data = [];

  let partId = 10;
  let unitId = await getUnit();
  let jobStationId = await getUnit();
  let actionId = await getEmployeeID();

  try {
    let headersData = {
      Authorization: `bearer ${await getToken()}`,
      "Content-Type": "application/json",
    };

    let url = `http://api2.akij.net:8068/api/GurdAppReports/GetDataForIncidentMessagesList?intPart=${partId}&intUnit=${unitId}&intJobstation=${jobStationId}&intinsertby=${actionId}`;

    if (api_get_message_type.length !== 0) {
      await Axios.get(`${url}`, { headers: headersData })

        .then(function (response) {
          data = response.data;
          return data;
        })
        .catch(function (error) {});
    }
  } catch (error) {
    data = [];
  }
  return data;
}

export async function addMessage(messageData) {
  let unitId = await getUnit();
  let actionId = await getEmployeeID();
  // let actionId = 1;
  let pkId = 1;

  const headers = {
    "Content-Type": "application/json",
  };

  let url = `http://api2.akij.net:8068/PostGurdAppMessageEntries?pkid=${pkId}&intJobstationID=${unitId}&intUnitID=${unitId}&intCheckedBy=${actionId}`;

  let messagePost = await Axios.post(url, messageData, { headers: headers })

    .then(function (response) {
      if (response.status === 200) {
        // alert("Message sent successfully");
        // Actions.StartPatrol();
        return response;
      } else {
        // alert("Unsuccessful! Please try again.");
        // Actions.StartPatrol();
      }
    })
    .catch(function (error) {
      console.log("error data:>> ", error);
    });

  return messagePost;
}
