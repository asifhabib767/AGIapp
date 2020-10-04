import {
  api_get_agenda,
  api_post_activity,
  api_get_Activity_List,
} from "../../config.json";
import { getToken } from "../tokens/TokenService";
import Axios from "axios";
import {
  getUserEmail,
  getUnit,
  getEmployeeID,
  getJobStationID,
} from "../auth/AuthService.js";
import AsyncStorage from "@react-native-community/async-storage";

export async function createActivity(
  name,
  showTime,
  showDate,
  note,
  images,
  outlet
) {
  // console.log(name,showTime,showDate,note,images);
  let userData = (await AsyncStorage.getItem("userData")) || "none";
  let dataParse = JSON.parse(userData);
  let email = await getUserEmail();
  let unitId = await getUnit();
  let employeeId = await getEmployeeID();
  let outletId = outlet.intOutletID;
  let outletname = outlet.strOutletName;
  // let headersData = {'Authorization': `bearer ${await getToken()}`};
  const { strEmployeeCode, intEmployeeId } = dataParse;

  const headersData = {
    Authorization: `bearer ${await getToken()}`,
    Accept: "application/json",
    "Content-Type": "text/plain",
  };

  //let url = `${api_post_agenda}?intOutletID=2&strOutletName=home&strAgendaName=${name}&strDiscussionTitle=${title}&tmTime=${showTime}&dteDate=${showDate}&strPriority=${priority}&strNote=${note}&intInsertBy=392407&intUnitID=91`;
  let url = `${api_post_activity}?intOutletID=${outletId}&strOutletName=${outletname}&strActivityName=${name}&tmTime=${showTime}&dteDate=${showDate}&strNote=${note}&strActivityImagePath=${images}&intInsertBy=${employeeId}&intUnitID=${unitId}`;
  let activityPost = await Axios.post(url, {}, { headers: headersData })

    .then(function (response) {
      let activity = response.data;
      if (activity.length != 0) {
        Alert.alert("Success", "Activity Added !");
        Actions.ActivityList({ page: "Requisition" });
        return response.data;
      } else {
        // Alert.alert('Error', 'Please fill all the data and try again !');
      }
    })
    .catch(function (error) {
      console.log(error);
      console.log(url);
    });

  return activityPost;
}

export async function getActivityList() {
  let data = [];

  let partId = 4;
  let unitId = await getUnit();
  let jobStationID = await getJobStationID();
  const employeeID = 1272;
  // const employeeID = await getEmployeeID();
  let autoId = 0;

  try {
    let headersData = {
      Authorization: `bearer ${await getToken()}`,
      "Content-Type": "application/json",
    };

    // let url = `${api_get_gate_in_out}?intUnitID=${intUnitID}`;
    // let url = api_get_gate_in_out;
    let url = `http://api2.akij.net:8068/api/GurdAppReports/GetDataForFloorcheckedsummery?intPart=${partId}&intUnit=${unitId}&intJobstation=${jobStationID}&intinsertby=${employeeID}`;

    if (api_get_Activity_List.length !== 0) {
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

export async function addActivity(activityData) {
  let pkId = activityData.intID;
  let jobStationID = await getJobStationID();
  let unitId = await getUnit();
  let actionId = await getEmployeeID();

  let postData = [
    {
      decLatitude: 120,
      decLongitude: 140,
      strScannedInfo: activityData.strCheckPointName,
      intFloorID: activityData.intFloorID,
      intCheckPointID: 1,
      intShiftID: 1,
    },
  ];

  const headers = {
    "Content-Type": "application/json",
  };

  let url = `http://api2.akij.net:8068/api/PostGurdAppQRCodeScanEntry/PostActivityAprvbyAudit?pkid=${pkId}&intJobstationID=${jobStationID}&intUnitID=${unitId}&intCheckedBy=${actionId}`;

  let activityPost = await Axios.post(url, postData, { headers: headers })

    .then(function (response) {
      if (response.status === 200) {
        // alert("Data saved successfully");
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

  return activityPost;
}
