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
import {getUnitId} from '../../../User/util/AuthData';

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
  let url = `${api_get_delivery_do}?intEmployeeID=${EmployeeId}`;
  console.log('url is', url);
  let data = [];
  if (url.length !== 0) {
    await Axios.get(url).then((res) => {
      console.log('res data', res);
      data = res.data;
    });
  }

  return data;
}
export async function getDataForBagType() {
  let unitId = await getUnitId();
  let url = `http://iapps.akij.net/asll/public/api/v1/sales/getDataForBagType?intUnitID=${unitId}`;

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
  multipleRequisition,
  selectedBagTypes,
) {
  let responseList = {
    isLoading: false,
    data: {},
    status: false,
  };
  responseList.isLoading = true;
  let userData = (await AsyncStorage.getItem('userData')) || 'none';
  let dataParse = JSON.parse(userData);
  let fromDateEndDate = fromDate + ' ' + endDate;

  const {
    strEmployeeCode,
    intEmployeeId,
    strContactNo1,
    strOfficeEmail,
  } = dataParse;

  let deliveryObj = [];
  // let postDeliveryRequisitionData = {
  //   intShipmentRequestID: DoItem.intid,
  //   dteRequestDateTime: fromDateEndDate,
  //   intInsertBy: intEmployeeId,
  //   strVehicleProviderType: modType,
  //   strVehicleType: vehicleType,
  //   intUnitId: 4,
  //   strLastDestination: lastDestination,
  //   strVehicleCapacity: vehicleCategory,
  //   ysnScheduleId: false,
  // };

  // let deliveryObj = [
  //   {
  //     intSalesOrderId: DoItem.intid,
  //     strSalesOrderCode: DoItem.strCode,
  //     intReqDetailsId: 1,
  //     intCustomerId: DoItem.intcustomerid,
  //     intDistPointId: DoItem.intshopid,
  //     strDestinationAddress: destinationAddress,
  //     decQty: parseInt(PendingQty),
  //   },
  // ];

  for (let i = 0; i < multipleRequisition.length; i++) {
    const element = multipleRequisition[i];
    console.log('element', element);
    // let PostDataObj = {
    //   intSalesOrderId: element.intSalesOrderId,
    //   strSalesOrderCode: element.strSalesOrderCode,
    //   intReqDetailsId: 1,
    //   intCustomerId: element.intCustomerId,
    //   intDistPointId: element.intDistPointId,
    //   strDestinationAddress: element.strDestinationAddress,
    //   decQty: element.decQty,
    // };
    let PostDataObj = {
      intSalesOrderId: element.intSalesOrderId,
      strSalesOrderCode: element.strSalesOrderCode,
      intCustomerId: element.intCustomerId,
      intDistPointId: element.intDistPointId,
      strDestinationAddress: element.strDestinationAddress,
      intBagType: element.intBagType,
      strBagType: element.strBagType,
      decQty: element.decQty,
    };
    deliveryObj.push(PostDataObj);
  }

  console.log('PostDataObj', deliveryObj);

  const postData = {
    requisitions: deliveryObj,
  };

  const headers = {
    'Content-Type': 'application/json',
  };
  // let url = `${post_delivery_requisition}?intShipmentRequestID=${DoItem.intid}&dteRequestDateTime=${fromDate}&intInsertBy=${intEmployeeId}&strVehicleProviderType=${modType}&strVehicleType=${vehicleType}&intUnitId=4&strLastDestination=${lastDestination}&strVehicleCapacity=${vehicleCategory}&ysnScheduleId=false`;
  let url = `http://iapps.akij.net/asll/public/api/v1/requisitionIssue/DeliveryRequisition?strRequestNo=${DoItem.intid}&dteRequestDateTime=${fromDate}&intInsertBy=${intEmployeeId}&strVehicleProviderType=${modType}&strVehicleType=${vehicleType}&intUnitId=4&strLastDestination=${lastDestination}&strVehicleCapacity=${vehicleCategory}&ysnScheduleId=false&decTotalQty=1`;

  console.log('url', url);

  // Axios.post(`${api_post_leave_create}`, {
  //   leaveData

  // })
  // let leavePost = await Axios.post(
  //   `http://172.17.17.25:8066/api/ShipmentRequestEntryAndUpdate/ShipmentRequestEntry?intShipmentRequestID=${
  //     DoItem.intid
  //   }&dteRequestDateTime=${fromDate}&intInsertBy=1272&strVehicleProviderType=${modType}&strVehicleType=${vehicleType}&intUnitId=4&strLastDestination=Bogra&strVehicleCapacity=${vehicleCategory}&ysnScheduleId=false`,
  //   {deliveryObj},
  // )
  return await Axios.post(url, postData, {
    headers: headers,
  })
    .then(function (response) {
      console.log('response list', response);
      responseList.data = response.data.data;
      responseList.isLoading = false;
      responseList.status = response.data.status;
      return responseList;
    })
    .catch(function (error) {
      console.log(error);
      responseList.isLoading = false;
      return responseList;
    });
}

export async function deliverRequistionValidation(state) {
  if (state.fromDate == '') {
    Alert.alert('Error', 'please select Delivery Date');
    return false;
  } else if (state.endDate == '') {
    Alert.alert('Error', 'please select Delivery time');
    return false;
  } else if (state.vehicleType == '') {
    Alert.alert('Error', 'Plese select vehicle Type');
    return false;
  } else if (state.vehicleCategory == '') {
    Alert.alert('Error', 'Plese select vehicle category');
    return false;
  }
  return true;
}
