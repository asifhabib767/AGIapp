import Axios from 'axios';
import {Alert} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {
  api_get_vehicle_Category,
  api_get_delivery_do,
  post_delivery_requisition,
  get_requistion_summery,
  get_complete_req_list,
} from '../../SalesConfig.json';
import AsyncStorage from '@react-native-community/async-storage';
import {getUserId, getUserEmail} from '../auth/AuthService';

export async function getVehicleCapacity() {
  let url = `${api_get_vehicle_Category}`;
  console.log('url is', url.length);
  let data = [];
  if (url.length !== 0) {
    await Axios.get(url).then((res) => {
      console.log('res data capacity', res);
      data = res.data;
    });
  }
  return data;
}
export async function getDeliveryRequstDo() {
  let userData = (await AsyncStorage.getItem('userData')) || 'none';
  // let dataParse = JSON.parse(userData);
  // const {strEmployeeCode, intEmployeeId, strContactNo1} = dataParse;
  let EmployeeId = await getUserId();
  console.log(EmployeeId);
  let url = `${api_get_delivery_do}?intEmployeeID=${EmployeeId}`;
  console.log('url is', url.length);
  let data = [];
  if (url.length !== 0) {
    await Axios.get(url).then((res) => {
      console.log('res data', res);
      data = res.data;
    });
  }

  return data;
}
export async function getCompleteReqList(fromDate, endDate) {
  // let userData = (await AsyncStorage.getItem('userData')) || 'none';
  // let dataParse = JSON.parse(userData);
  let Email = await getUserEmail();
  // const {strEmployeeCode, intEmployeeId, strContactNo1} = dataParse;

  let url = `${get_complete_req_list}?intUnitID=4&dteFromdate=${fromDate}&dteTodate=${endDate}&email=${Email}`;

  let data = [];
  if (url.length !== 0) {
    await Axios.get(url).then((res) => {
      console.log('res data', res);
      data = res.data;
    });
  }

  return data;
}
export async function getRequisitionSummery(fromDate, endDate) {
  // let userData = (await AsyncStorage.getItem('userData')) || 'none';
  // let dataParse = JSON.parse(userData);
  // const {
  //   strEmployeeCode,
  //   intEmployeeId,
  //   strContactNo1,
  //   strOfficeEmail,
  // } = dataParse;
  let Email = await getUserEmail();
  let url = `${get_requistion_summery}?intUnitID=4&dteFromdate=${fromDate}&dteTodate=${endDate}&email=${Email}`;
  let data = [];
  if (url.length !== 0) {
    await Axios.get(url).then((res) => {
      console.log('res data', res);
      data = res.data;
    });
  }

  return data;
}

export async function PostDeliveryRequistion(
  doNO,
  PendingQty,
  fromDate,
  endDate,
  modType,
  vehicleType,
  vehicleCategory,
  lastDestination,
  destinationAddress,
  DoItem,
) {
  let userData = (await AsyncStorage.getItem('userData')) || 'none';
  let dataParse = JSON.parse(userData);
  let fromDateEndDate = fromDate + ' ' + endDate;

  const {
    strEmployeeCode,
    intEmployeeId,
    strContactNo1,
    strOfficeEmail,
  } = dataParse;

  let data = [];
  let postDeliveryRequisitionData = {
    intShipmentRequestID: DoItem.intid,
    dteRequestDateTime: fromDateEndDate,
    intInsertBy: intEmployeeId,
    strVehicleProviderType: modType,
    strVehicleType: vehicleType,
    intUnitId: 4,
    strLastDestination: lastDestination,
    strVehicleCapacity: vehicleCategory,
    ysnScheduleId: false,
  };

  let deliveryObj = [
    {
      intSalesOrderId: DoItem.intid,
      strSalesOrderCode: DoItem.strCode,
      intReqDetailsId: 1,
      intCustomerId: DoItem.intcustomerid,
      intDistPointId: DoItem.intshopid,
      strDestinationAddress: destinationAddress,
      decQty: parseInt(PendingQty),
    },
  ];

  let responseData = {};

  const headers = {
    'Content-Type': 'application/json',
  };
  let url = `${post_delivery_requisition}?intShipmentRequestID=${DoItem.intid}&dteRequestDateTime=${fromDate}&intInsertBy=${intEmployeeId}&strVehicleProviderType=${modType}&strVehicleType=${vehicleType}&intUnitId=4&strLastDestination=${lastDestination}&strVehicleCapacity=${vehicleCategory}&ysnScheduleId=false`;

  // Axios.post(`${api_post_leave_create}`, {
  //   leaveData

  // })
  // let leavePost = await Axios.post(
  //   `http://172.17.17.25:8066/api/ShipmentRequestEntryAndUpdate/ShipmentRequestEntry?intShipmentRequestID=${
  //     DoItem.intid
  //   }&dteRequestDateTime=${fromDate}&intInsertBy=1272&strVehicleProviderType=${modType}&strVehicleType=${vehicleType}&intUnitId=4&strLastDestination=Bogra&strVehicleCapacity=${vehicleCategory}&ysnScheduleId=false`,
  //   {deliveryObj},
  // )
  return await Axios.post(url, deliveryObj, {
    headers: headers,
  })
    .then(function (response) {
      console.log('response list', response);

      responseData.value = response.data;
      return responseData;
      // data.message = 'submit successfully';

      // Alert.alert(
      //   'Success',
      //   'Delivery Requisition created successfully !!' + response.data,
      // );
      // Actions.deliveryReqList();
    })
    .catch(function (error) {
      console.log(error);
    });

  return responseData;
}
