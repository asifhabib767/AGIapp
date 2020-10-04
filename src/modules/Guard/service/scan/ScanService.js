import { api_post_gate_in, api_get_vehicle_details } from "../../config.json";
import { getToken } from "../tokens/TokenService";
import Axios from "axios";
import { getUserEmail, getUnit, getEmployeeID } from "../auth/AuthService.js";
import AsyncStorage from "@react-native-community/async-storage";
import DateTimePicker from "react-native-modal-datetime-picker";
import { Actions } from "react-native-router-flux";

export async function addScan(scanData) {
  let unitId = await getUnit();
  let actionId = await getEmployeeID();
  // let actionId = 1;

  const headers = {
    "Content-Type": "application/json",
  };

  let url = `http://api2.akij.net:8068/api/PostGurdAppQRCodeScanEntry/PostGurdAppQRCodeScanEntries?pkid=1&intFloorID=1&intCheckPointID=1&intJobstationID=4&intUnitID=${unitId}&strSite=1&intCheckedBy=${actionId}&intShiftID=1`;

  let scanPost = await Axios.post(url, scanData, { headers: headers })

    .then(function (response) {
      if (response.status === 200) {
        alert("Data saved successfully");
        Actions.StartPatrol();
        return response.data;
      } else {
        alert("Unsuccessful! Please try again.");
        Actions.StartPatrol();
      }
    })
    .catch(function (error) {
      console.log("error data:>> ", error);
    });

  return scanPost;
}

export async function getVehicleDetails(vehicleData) {
  let data = [];

  let partId = vehicleData.partId;
  let unitId = await getUnit();
  let shippingPointId = vehicleData.shippingPointId;
  let autoId = vehicleData.autoId;

  try {
    let headersData = {
      Authorization: `bearer ${await getToken()}`,
      "Content-Type": "application/json",
    };

    let url = `http://api2.akij.net:8068/api/GuardAppsInfo/GetDataForVehicleListDet?intPart=${partId}&intUnit=${unitId}&intShippingPointid=${shippingPointId}&intAutoID=${autoId}`;

    if (api_get_vehicle_details.length !== 0) {
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
