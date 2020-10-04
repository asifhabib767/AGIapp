import {api_sales_customer} from '../../config.json';
import {getToken} from '../../service/tokens/TokenService';
import Axios from 'axios';
import {getUserId, getEmployeeID} from '../auth/AuthService';

export async function getShippingVehicle(intSalesOffId) {
  let data = [];

  await Axios.get(
    `http://api2.akij.net:8066/api/DataForShippingVheicleReports/GetDataForVheicleList?dteFromDate=2020-07-01&dteToDate=2020-07-31&intUnitid=17&intShippingpointid=1`,
    {},
  ).then((res) => {
    data = res.data;
    console.log('sales cutomer is', res.data);
  });
  return data;
}
export async function getFuelType(intSalesOffId) {
  let data = [];

  await Axios.get(
    `http://api2.akij.net:8066/api/DataForShippingVehicleStatement/GetDataForFuelPrice?dteFromDate=2020-05-01&dteToDate=2020-05-31&intUnitid=17&intShippingpointid=1&intVheicleid=1&intdriverenrol=1`,
    {},
  ).then((res) => {
    data = res.data;
    console.log('Fuel type', res.data);
  });
  return data;
}

export async function postFuelEntry(data) {
  let qty = parseInt(data.qty);
  let totoalData = data.price * qty;

  let acitonBy = await getEmployeeID();
  console.log('fuel enty data', data);

  let response = {
    data: '',
  };

  let url = `http://api2.akij.net:8066/api/DataForFuelConsumptionInsertActivity/FuelConsumptionInsertActivity?intUnitId=17&intVehicleID=${data.vehileId}&intActionBy=1&montotalamount=${totoalData}`;
  //   let url = `http://api2.akij.net:8066/api/DataForFuelConsumptionInsertActivity/FuelConsumptionInsertActivity?intUnitId=17&intVehicleID=1&intActionBy=1&montotalamount=200`;

  const headers = {
    'Content-Type': 'application/json',
  };

  let postData = [
    {
      dteBillDate: `${data.fromDate}T09:57:36.121Z`,
      intProductID: data.fuelTypeId,
      decQnt: qty,
      decRate: data.price,
      decTotalAmount: totoalData,
      strNarration: data.meDetails,
    },
  ];

  await Axios.post(url, postData, {headers: headers})
    .then((res) => {
      response.data = res.data;
    })
    .catch((err) => {
      console.log('url', err);
    });

  return response;
}
