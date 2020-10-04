import {
  api_get_vehicle_provider,
  api_get_vehicle_capacity,
  api_post_request_entry,
  api_get_order_data,
} from '../../SalesConfig.json';

import {Alert} from 'react-native';
import {getToken} from '../../service/tokens/TokenService';
import Axios from 'axios';
import {getUserEmail, getUnit, getUserId} from '../../service/auth/AuthService';

export async function getVehicleProviderData() {
  let Unit = await getUnit();
  let url = `${api_get_vehicle_provider}?intUnitID=${Unit}`;

  console.log(url);

  let data = [];
  if (url.length !== 0) {
    await Axios.get(url).then((res) => {
      data = res.data;
    });
  }

  return data;
}

/**
 * getVehicleCapacityData()
 *
 * @return
 */
export async function getVehicleCapacityData() {
  let Unit = await getUnit();
  let url = `${api_get_vehicle_capacity}?intUnitID=${Unit}`;

  let data = [];
  if (url.length !== 0) {
    await Axios.get(url).then((res) => {
      data = res.data;
    });
  }

  return data;
}

export async function getOrderData() {
  let Unit = await getUnit();
  let intEnroll = await getUserId();
  let url = `${api_get_order_data}?intUnitID=${Unit}&intEnroll=${intEnroll}`;

  console.log(url);

  let data = [];
  if (api_get_order_data.length !== 0) {
    await Axios.get(url).then((res) => {
      console.log(res);
      data = res.data;
      console.log(data);
    });
  }

  return data;
}

export async function postDeliveryRequest(entryData, orders) {
  let Unit = await getUnit();
  let intEnroll = await getUserId();

  // http://api2.akij.net:8054/api/ShipmentRequestEntryAndUpdate/ShipmentRequestEntry?intShipmentRequestID=0&dteRequestDateTime=2020-01-29&intInsertBy=57896&strVehicleProviderType=1&strVehicleType=&intUnitId=4&strLastDestination=&strVehicleCapacity=1&ysnScheduleId=false
  let url = `${api_post_request_entry}?intShipmentRequestID=${entryData.intShipmentRequestID}&dteRequestDateTime=${entryData.dteRequestDateTime}&intInsertBy=${intEnroll}&strVehicleProviderType=${entryData.strVehicleProviderType}&strVehicleType=${entryData.strVehicleType}&intUnitId=${Unit}&strLastDestination=${entryData.strLastDestination}&strVehicleCapacity=${entryData.strVehicleCapacity}&ysnScheduleId=${entryData.ysnScheduleId}`;

  const headers = {
    'Content-Type': 'application/json',
  };
  let data = '';
  if (api_post_request_entry.length !== 0) {
    await Axios.post(url, orders, {headers: headers})
      .then((res) => {
        data = res.data;
        console.log('postOrderData', res.data);
      })
      .catch((err) => {
        console.log('url', url);
        console.log('entryData', entryData);
        console.log('orders', orders);
        console.log('postOrderData', err);
      });
  }

  return data;
}
