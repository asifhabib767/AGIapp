import * as React from 'react';
import axios from 'axios';
import * as url from '../../DistributionConfig.json';
import {getUnit} from '../../../Sales/service/auth/AuthService';
import {getUserData, getUnitId} from '../../../User/util/AuthData';
import {currentdate} from '../../../HR/Utils/DateConfigure';

export const tripInfoUpdateNRollbackAPI = async (intTripId) => {
  let responseList = {
    isLoading: true,
    data: {},
  };
  let userId = await getUserData();
  let unitId = await getUnitId();

  let employeeId = userId.intEmployeeId;
  await axios
    .get(
      `http://api2.akij.net:8054/api/TripInfoUpdateNRollbackAPI/TripUpdate?intUserId=${employeeId}&tripCode=${intTripId}&intunitid=${unitId}`,
    )
    .then((res) => {
      responseList.isLoading = false;
      responseList.data = res.data;
    })
    .catch((error) => {
      responseList.isLoading = false;
    });
  return responseList;
};

export const tripRollBack = async (strCode, intTripId) => {
  let responseList = {
    isLoading: true,
    data: {},
  };
  let userId = await getUserData();
  let employeeId = userId.intEmployeeId;
  let unitId = await getUnitId();
  await axios
    .get(
      `http://api2.akij.net:8054/api/TripInfoUpdateNRollbackAPI/TripRollBack?intUserId=${employeeId}&intTripId=${intTripId}&tripCode=${strCode}&intunitid=${unitId}`,
    )
    .then((res) => {
      console.log('res', res);
      responseList.isLoading = false;
      responseList.data = res.data;
    })
    .catch((error) => {
      responseList.isLoading = false;
    });
  return responseList;
};

export const createLoadingSlipchalan = async (intTripCode) => {
  let responseList = {
    isLoading: true,
    data: {},
  };

  let userId = await getUserData();
  console.log('data is', userId);
  let employeeId = userId.intEmployeeId;
  await axios
    .get(
      `${url.server_api_base_url}/logistic/trips/getTripDetailsByTripCode?strCode=${intTripCode}&intUnitId=4`,
    )
    .then((res) => {
      console.log('res challan', res);
      responseList.isLoading = false;
      responseList.data = res.data.data;
    })
    .catch((error) => {
      responseList.isLoading = false;
    });
  return responseList;
};

export const getOutComplete = async (item) => {
  let responseList = {
    isLoading: true,
    data: {},
    status: false,
    message: '',
  };
  const userData = await getUserData();
  const intUnitId = item.intUnitId;
  const intTripId = item.intTripId;
  const dteDate = currentdate();
  const intUserID = userData.intEmployeeId;
  const url = `http://api2.akij.net:8054/api/VehicleAssignCompleteAPI/VehicleAssignComplete?intTripID=${intTripId}&intUserID=${intUserID}&intUnitID=${intUnitId}&dteDate=${dteDate}`;
  await axios
    .post(url)
    .then((res) => {
      responseList.isLoading = false;
      responseList.data = res.data;

      if (res.data == 'fail') {
        responseList.status = false;
        responseList.message = 'Gate Out Not Completed. Something Went Wrong !';
      } else {
        responseList.status = true;
        responseList.message = 'Gate Out Completed Successfully. ' + res.data;
      }
    })
    .catch((error) => {
      console.log('error after gate out', error);
      responseList.isLoading = false;
      responseList.status = false;
      responseList.message = 'Gate Out Not Completed. Something Went Wrong !';
    });
  return responseList;
};
