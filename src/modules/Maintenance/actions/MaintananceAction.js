import axios from 'axios';
import {Alert} from 'react-native';
import {getJobStationId, getUnitId, getUserId} from '../../User/util/AuthData';

export const submitMaintananceAction = async (state, postMultipleData) => {
  let responseList = {
    isLoading: false,
    data: {},
    status: false,
  };

  const intjobstationid = await getJobStationId();
  const intUserId = await getUserId();
  const submitURL = `http://api2.akij.net:8066/api/MaintenanceForAPI/Maintenance?wareHouseid=${state.wareHouseid}&assetcode=${state.assetcode}&maintenanceType=1&intserviceid=${state.intserviceid}&nextMaintenanceDate=${state.nextMaintenanceDate}&remarks=${state.remarks}&intjobstationid=${intjobstationid}&intInsertBy=${intUserId}&strassignto=${state.strassignto}`;

  console.log('submitURL', submitURL);

  await axios
    .post(submitURL, postMultipleData)
    .then((res) => {
      console.log('res submit', res);
      responseList.isLoading = false;
      responseList.data = res.data;

      if (res.data.length > 0) {
        responseList.status = true;
        responseList.isLoading = false;
        return responseList;
      } else {
        responseList.status = false;
        responseList.isLoading = false;
        return responseList;
      }
    })
    .catch((error) => {
      console.log('error', error);
      responseList.status = false;
      responseList.isLoading = false;
      return responseList;
    });
  return responseList;
};

export const getPMsList = async (fromDate, toData) => {
  let responseList = {
    isLoading: false,
    data: {},
  };

  let intUnitId = await getUnitId();
  let enroll = await getUserId();

  await axios
    .get(
      `http://api2.akij.net:8066/api/AssetReport/GetrAssetReport?intPart=3&unit=${intUnitId}&jobstation=34&dteFrom=${fromDate}&dteTo=${toData}&intRptType=0&intEnroll=${enroll}`,
    )
    .then((res) => {
      console.log('res pms list', res);
      responseList.isLoading = false;
      responseList.data = res.data;
    })
    .catch((error) => {
      responseList.isLoading = false;
    });
  return responseList;
};
export const getPmsListByUnitId = async () => {
  let responseList = {
    isLoading: false,
    data: {},
  };

  let intUnitId = await getUnitId();
  let enroll = await getUserId();

  await axios
    .get(
      `http://iapps.akij.net/asll/public/api/v1/maintanance/getMaintenanceReportByUnit?intUnitID=${intUnitId}`,
    )
    .then((res) => {
      console.log('res pms list', res);
      responseList.isLoading = false;
      responseList.data = res.data;
    })
    .catch((error) => {
      responseList.isLoading = false;
    });
  return responseList;
};
export const getMaintenanceReportByReqID = async (reqId) => {
  let responseList = {
    isLoading: false,
    data: {},
  };

  let intUnitId = await getUnitId();
  let enroll = await getUserId();

  await axios
    .get(
      `http://iapps.akij.net/asll/public/api/v1/maintanance/getMaintenanceReportByReqID?intReqID=${reqId}`,
    )
    .then((res) => {
      console.log('res getMaintenanceReportByReqID', res);
      responseList.isLoading = false;
      responseList.data = res.data;
    })
    .catch((error) => {
      responseList.isLoading = false;
    });
  return responseList;
};
export const getJObCard = async (reqId) => {
  let responseList = {
    isLoading: false,
    data: {},
  };

  let intUnitId = await getUnitId();
  let enroll = await getUserId();

  await axios
    .get(
      `http://iapps.akij.net/asll/public/api/v1/maintanance/getMaintenanceJobCard?intUnitID=${intUnitId}`,
    )
    .then((res) => {
      console.log('res getMaintenanceReportByReqID', res);
      responseList.isLoading = false;
      responseList.data = res.data;
    })
    .catch((error) => {
      responseList.isLoading = false;
    });
  return responseList;
};
export const getEmployeePersonal = async (reqId) => {
  let responseList = {
    isLoading: false,
    data: {},
  };

  let intUnitId = await getUnitId();
  let enroll = await getUserId();

  await axios
    .get(`http://iapps.akij.net/asll/public/api/v1/asllhr/getEmployeePersonal`)
    .then((res) => {
      console.log('res getMaintenanceReportByReqID', res);
      responseList.isLoading = false;
      responseList.data = res.data;
    })
    .catch((error) => {
      responseList.isLoading = false;
    });
  return responseList;
};

export async function maintenanceValidation(state) {
  if (state.warehouseName == '') {
    Alert.alert('Error', 'Please Select Ware house name');
    return false;
  } else if (state.assetName == '') {
    Alert.alert('Error', 'Please Select Asset name');
    return false;
  } else if (state.remarks == '') {
    Alert.alert('Error', 'Please Type Remarks');
    return false;
  } else if (state.itemName == '') {
    Alert.alert('Error', 'Please type Item name');
    return false;
  } else if (state.quantity == '0') {
    Alert.alert('Error', 'Please type Quntity');
    return false;
  }
  return true;
}
