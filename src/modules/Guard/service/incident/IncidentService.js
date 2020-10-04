import {
  api_get_gate_in_out,
  api_get_type,
  api_get_vehicle_type,
  api_get_passenger_type,
  api_get_job_station,
  api_get_whom_to_visit,
  api_get_vehicle_list,
  api_post_gate_in,
  api_get_vehicle_details,
  api_get_incident_type_list,
  api_get_incident_list,
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
import DateTimePicker from "react-native-modal-datetime-picker";
// import { Actions } from "react-native-router-flux";

export async function getIncidentList() {
  let data = [];

  let partId = 1;
  let unitId = await getUnit();
  let jobStationID = await getJobStationID();
  const employeeID = 470122;
  // const employeeID = await getEmployeeID();
  let autoId = 0;

  try {
    let headersData = {
      Authorization: `bearer ${await getToken()}`,
      "Content-Type": "application/json",
    };

    // let url = `${api_get_gate_in_out}?intUnitID=${intUnitID}`;
    // let url = api_get_gate_in_out;
    let url = `http://api2.akij.net:8068/api/GurdAppReports/GetDataForIncidentEntrybyown?intPart=${partId}&intUnit=${unitId}&intJobstation=${jobStationID}&intinsertby=${employeeID} `;

    if (api_get_incident_list.length !== 0) {
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

export async function addGateIn(gateInData) {
  let unitId = await getUnit();
  // let actionId = await getEmployeeID();
  let actionId = 1;

  const headers = {
    "Content-Type": "application/json",
  };

  let url = `http://api2.akij.net:8068/api/GraurdAppActivity/GuardAppActivityInsertion?intUnitId=${unitId}&intActionBy=${actionId}`;

  let gateInPost = await Axios.post(url, gateInData, { headers: headers })

    .then(function (response) {
      let gateIn = response.data;
      if (gateIn.length != 0) {
        // alert.alert("Success", "Gate In Added !");
        Actions.GateInOutList();
        return response.data;
      } else {
        // Alert.alert('Error', 'Please fill all the data and try again !');
      }
    })
    .catch(function (error) {
      console.log("error data:>> ", error);
    });

  return gateInPost;
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

export async function addGateOut(gateOutData) {
  let unitId = await getUnit();
  // let actionId = await getEmployeeID();
  let actionId = 1;

  const headers = {
    "Content-Type": "application/json",
  };

  let url = `http://api2.akij.net:8068/api/GraurdAppActivity/GurdAppGateOutActivity?intUnitId=${unitId}&intActionBy=${actionId}`;

  let gateOutPost = await Axios.post(url, gateOutData, { headers: headers })

    .then(function (response) {
      let gateOut = response.data;
      if (gateOut.length != 0) {
        // alert.alert("Success", "Gate In Added !");
        Actions.GateInOutList();
        return response.data;
      } else {
        // Alert.alert('Error', 'Please fill all the data and try again !');
      }
    })
    .catch(function (error) {
      console.log("error data:>> ", error);
    });

  return gateOutPost;
}

export async function getIncidentType() {
  let data = [];

  let partId = 1;
  let unitId = await getUnit();
  let employeeId = await getEmployeeID();

  try {
    let headersData = {
      Authorization: `bearer ${await getToken()}`,
      "Content-Type": "application/json",
    };

    let url = `http://api2.akij.net:8068/api/GurdAppReports/GetDataForincidentList?intPart=${partId}&intUnit=${unitId}&intJobstation=${unitId}&intinsertby=${employeeId}`;

    if (api_get_incident_type_list.length !== 0) {
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

export async function addIncidentType(incidentTypeData) {
  let unitId = await getUnit();
  let actionId = await getEmployeeID();
  // let actionId = 1;

  let postData = [];
  incidentTypeData.forEach((element) => {
    let dataItem = {
      intIncidentID: element.intID,
      dteDate: element.dteInsertDate,
      intJobstationID: unitId,
      strComment: element.comment,
      intUnitId: unitId,
    };
    postData.push(dataItem);
  });

  const headers = {
    "Content-Type": "application/json",
  };

  let url = `http://api2.akij.net:8068/api/PostGurdAppIncidentEntry/PostGurdAppIncidentEntries?intUnitId=${unitId}&intActionBy=${actionId}`;

  let incidentPost = await Axios.post(url, postData, {
    headers: headers,
  })

    .then(function (response) {
      if (response.status === 200) {
        // alert("Incident added successfully");
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

  return incidentPost;
}
