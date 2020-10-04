import {
  server_api_base_url,
  api_get_checkpoint_summary,
  api_get_completed_checkpoint,
  api_get_missed_checkpoint,
} from "../../config.json";
import { getToken } from "../tokens/TokenService";
import Axios from "axios";
import { getUserEmail, getUnit, getEmployeeID } from "../auth/AuthService.js";
import AsyncStorage from "@react-native-community/async-storage";
import DateTimePicker from "react-native-modal-datetime-picker";
import { Actions } from "react-native-router-flux";

export async function getCheckpointSummary() {
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

    let url = `http://api2.akij.net:8068/api/GurdAppReports/GetDataForFloorcheckedsummery?intPart=${partId}&intUnit=${unitId}&intJobstation=${jobStationId}&intinsertby=${actionId}`;

    if (api_get_checkpoint_summary.length !== 0) {
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

export async function getCompletedCheckpoint() {
  let data = [];

  let partId = 1;
  let unitId = await getUnit();
  let jobStationId = await getUnit();
  let actionId = await getEmployeeID();

  try {
    let headersData = {
      Authorization: `bearer ${await getToken()}`,
      "Content-Type": "application/json",
    };

    let url = `http://api2.akij.net:8068/api/GurdAppReports/GetDataForFloorcheckedcomplete?intPart=${partId}&intUnit=${unitId}&intJobstation=${jobStationId}&intinsertby=${actionId}`;

    if (api_get_completed_checkpoint.length !== 0) {
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

export async function getMissedCheckpoint() {
  let data = [];

  let partId = 1;
  let unitId = await getUnit();
  let jobStationId = await getUnit();
  let actionId = await getEmployeeID();

  try {
    let headersData = {
      Authorization: `bearer ${await getToken()}`,
      "Content-Type": "application/json",
    };

    let url = `http://api2.akij.net:8068/api/GurdAppReports/GetDataForFloorcheckedpending?intPart=${partId}&intUnit=${unitId}&intJobstation=${jobStationId}&intinsertby=${actionId}`;

    if (api_get_missed_checkpoint.length !== 0) {
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

export async function getCheckpointList(unitId, jobStationId, floorId) {
  let data = [];

  try {
    let headersData = {
      Authorization: `bearer ${await getToken()}`,
      "Content-Type": "application/json",
    };

    let url = `http://iapps.akij.net/asll/public/api/v1/hr/checkpoints?intUnitID=${unitId}&intJobStationID=${jobStationId}&intFloorID=${floorId}`;

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

export async function getUnitList() {
  let data = [];

  try {
    let headersData = {
      Authorization: `bearer ${await getToken()}`,
      "Content-Type": "application/json",
    };

    let url = `http://iapps.akij.net/api/v1/hr/units`;

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

export async function getJobStationList(unitId) {
  let data = [];

  try {
    let headersData = {
      Authorization: `bearer ${await getToken()}`,
      "Content-Type": "application/json",
    };

    let url = `http://iapps.akij.net/api/v1/hr/getJobStationByUnitId?intUnitID=${unitId}`;

    await Axios.get(`${url}`, { headers: headersData })

      .then(function (response) {
        data = response.data.data;
        return data;
      })
      .catch(function (error) {
        console.log("Unit error :>> ", error);
      });
  } catch (error) {
    data = [];
  }
  return data;
}

export async function addCheckpoint(checkpointData) {
  let postData = {
    strCheckPointName: checkpointData.strCheckPointName,
    intFloorID: checkpointData.intFloorID,
    intJobStationID: checkpointData.intJobStationID,
    intUnitID: checkpointData.intUnitID,
    ysnActive: true,
    intInsertedBy: await getEmployeeID(),
    intUpdatedBy: await getEmployeeID(),
    decLatitude: checkpointData.decLatitude,
    decLongitude: checkpointData.decLongitude,
    intZAxis: checkpointData.intZAxis,
    strSideName: checkpointData.strSideName,
  };

  const headers = {
    "Content-Type": "application/json",
  };

  let url = `${server_api_base_url}/hr/createCheckpoint`;

  let createCheckpoint = await Axios.post(url, postData, { headers: headers })

    .then(function (response) {
      if (response.status === 200) {
        return response;
      }
    })
    .catch(function (error) {
      console.log("error data:>> ", error);
    });

  return createCheckpoint;
}

export async function updateQrCode(intID, strQRCode) {
  let postData = {
    strQRCode: strQRCode,
  };

  const headers = {
    "Content-Type": "application/json",
  };

  let url = `http://iapps.akij.net/asll/public/api/v1/hr/updateQrCode?intID=${intID}`;

  let updateCheckpoint = await Axios.put(url, postData, { headers: headers })

    .then(function (response) {
      if (response.data.status === true) {
        return response;
      }
    })
    .catch(function (error) {
      console.log("error data:>> ", error);
    });

  return updateCheckpoint;
}

export async function getQRCodeList() {
  let unitId = await getUnit();
  let jobStationId = await getUnit();

  let data = [];

  try {
    let headersData = {
      Authorization: `bearer ${await getToken()}`,
      "Content-Type": "application/json",
    };

    let url = `http://iapps.akij.net/asll/public/api/v1/hr/qrcodes?intUnitID=${unitId}&intJobStationID=${jobStationId}`;

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
