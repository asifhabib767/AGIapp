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
} from "../../config.json";
import { getToken } from "../tokens/TokenService";
import Axios from "axios";
import { getUserEmail, getUnit, getEmployeeID } from "../auth/AuthService.js";
import AsyncStorage from "@react-native-community/async-storage";
import DateTimePicker from "react-native-modal-datetime-picker";
import { Actions } from "react-native-router-flux";

export async function getGateInOut() {
  let data = [];

  let partId = 1;
  let unitId = await getUnit();
  let shippingPointId = 15;
  let autoId = 0;

  try {
    let headersData = {
      Authorization: `bearer ${await getToken()}`,
      "Content-Type": "application/json",
    };

    // let url = `${api_get_gate_in_out}?intUnitID=${intUnitID}`;
    // let url = api_get_gate_in_out;
    let url = `http://api2.akij.net:8068/api/GuardAppsInfo/GetDataForVehicleInOutTOPSHEET?intPart=${partId}&intUnit=${unitId}&intShippingPointid=${shippingPointId}&intAutoID=${autoId}`;

    if (api_get_gate_in_out.length !== 0) {
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

export async function getType() {
  let data = [];

  try {
    let headersData = {
      Authorization: `bearer ${await getToken()}`,
      "Content-Type": "application/json",
    };

    let url = api_get_type;

    if (api_get_type.length !== 0) {
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

export async function getVehicleType() {
  let data = [];

  try {
    let headersData = {
      Authorization: `bearer ${await getToken()}`,
      "Content-Type": "application/json",
    };

    let url = api_get_vehicle_type;

    if (api_get_vehicle_type.length !== 0) {
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

export async function getPassengerType() {
  let data = [];

  try {
    let headersData = {
      Authorization: `bearer ${await getToken()}`,
      "Content-Type": "application/json",
    };

    let url = api_get_passenger_type;

    if (api_get_passenger_type.length !== 0) {
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

export async function getJobStation() {
  let data = [];

  try {
    let headersData = {
      Authorization: `bearer ${await getToken()}`,
      "Content-Type": "application/json",
    };

    let url = api_get_job_station;

    if (api_get_job_station.length !== 0) {
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

export async function getWhomToVisit() {
  let data = [];

  try {
    let headersData = {
      Authorization: `bearer ${await getToken()}`,
      "Content-Type": "application/json",
    };

    let url = api_get_whom_to_visit;

    if (api_get_whom_to_visit.length !== 0) {
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

export async function getVehicleList() {
  let data = [];

  try {
    let headersData = {
      Authorization: `bearer ${await getToken()}`,
      "Content-Type": "application/json",
    };

    let url = api_get_vehicle_list;

    if (api_get_vehicle_list.length !== 0) {
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
