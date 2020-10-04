import {api_get_driver, api_get_vehicle} from '../../config.json';
import {getToken} from '../tokens/TokenService';
import Axios from 'axios';
import {
  getUserEmail,
  getUnit,
  getEmployeeID,
  getJobStationID,
  getShippingPointId,
} from '../auth/AuthService.js';
import {getFormattedCurrentDate} from '../../Util/DateConfigure';
import AsyncStorage from '@react-native-community/async-storage';

export async function getDriverList() {
  let data = [];

  let unitId = await getUnit();

  try {
    let headersData = {
      Authorization: `bearer ${await getToken()}`,
      'Content-Type': 'application/json',
    };

    let url = `http://api2.akij.net:8066/api/DataForShippingPlaning/GetDriverList?intUnitID=${unitId}`;

    if (api_get_driver.length !== 0) {
      await Axios.get(`${url}`, {headers: headersData})

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

export async function getShipData(
  startDate,
  endDate,
  vehicleId,
  intDriverEnroll,
) {
  // let intDriverEnroll = intDriverEnroll;
  if (intDriverEnroll === null) {
    intDriverEnroll = 0;
  }
  console.log('intDriverEnroll', intDriverEnroll);
  let data = [];
  let intUnitid = await getUnit();
  let intShippingpointid = await getShippingPointId();

  try {
    let headersData = {
      Authorization: `bearer ${await getToken()}`,
      'Content-Type': 'application/json',
    };

    let url = `http://api2.akij.net:8066/api/DataForShippingVehicleStatement/GetDataForSingleVehicleStatement?dteFromDate=${startDate}&dteToDate=${endDate}&intUnitid=${intUnitid}&intShippingpointid=${intShippingpointid}&intVheicleid=${vehicleId}&intdriverenrol=${intDriverEnroll}`;

    if (url.length !== 0) {
      await Axios.get(`${url}`, {headers: headersData})

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

export async function getFuelDataByDay(startDate, endDate) {
  let intVheicleid = 0;
  let intdriverenrol = 0;
  let data = [];
  let intUnitid = await getUnit();
  let intShippingpointid = await getShippingPointId();

  try {
    let headersData = {
      Authorization: `bearer ${await getToken()}`,
      'Content-Type': 'application/json',
    };

    let url = `http://api2.akij.net:8066/api/DataForShippingVehicleStatement/GetDataForFuelReprtDayBase?dteFromDate=${startDate}&dteToDate=${endDate}&intUnitid=${intUnitid}&intShippingpointid=${intShippingpointid}&intVheicleid=${intVheicleid}&intdriverenrol=${intdriverenrol}`;

    if (url.length !== 0) {
      await Axios.get(`${url}`, {headers: headersData})

        .then(function (response) {
          data = response.data;
          console.log('Fuelresponse :>> ', response);
          return data;
        })
        .catch(function (error) {});
    }
  } catch (error) {
    data = [];
  }
  return data;
}

export async function getFuelDataByVehicle(
  startDate,
  endDate,
  intVheicleid,
  intdriverenrol,
) {
  let data = [];
  let intUnitid = await getUnit();
  let intShippingpointid = await getShippingPointId();

  try {
    let headersData = {
      Authorization: `bearer ${await getToken()}`,
      'Content-Type': 'application/json',
    };

    let url = `http://api2.akij.net:8066/api/DataForShippingVehicleStatement/GetDataForFuelReprtVehilceBase?dteFromDate=${startDate}&dteToDate=${endDate}&intUnitid=${intUnitid}&intShippingpointid=${intShippingpointid}&intVheicleid=${intVheicleid}&intdriverenrol=${intdriverenrol}`;

    if (url.length !== 0) {
      await Axios.get(`${url}`, {headers: headersData})

        .then(function (response) {
          data = response.data;
          console.log('Fuelresponse :>> ', response);
          return data;
        })
        .catch(function (error) {});
    }
  } catch (error) {
    data = [];
  }
  return data;
}
