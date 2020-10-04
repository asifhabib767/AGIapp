import * as Types from '../types/Types';
import axios from 'axios';
import * as url from '../../DistributionConfig.json';
import {getUserId, getUnitId} from '../../../User/util/AuthData';
import {currentdate} from '../../../Master/Util/DateConfigure';

export const getVehicleList = () => async (dispatch) => {
  let responseList = {
    isLoading: true,
    data: {},
  };

  await axios
    .get(`${url.server_api_base_url}/logistic/vehicle-types?intUnitId=4`)
    .then((res) => {
      responseList.isLoading = false;
      responseList.data = res.data;
    })
    .catch((error) => {
      responseList.isLoading = false;
    });
};
export const searchAction = async () => {
  const responseList = {
    responseList: [],
    isLoading: false,
    data: [],
  };
  responseList.isLoading = true;
  await axios

    .get(`https://app1.akij.net/api/v1/hr/departments`)
    .then((res) => {
      console.log('response', res);
      responseList.data = res.data;
      responseList.isLoading = false;
    })
    .catch((error) => {
      responseList.isLoading = false;
    });
  return responseList;
};

export const searchByRequestShippingno = async (data) => {
  let responseList = {
    isLoading: true,
    data: {},
    status: false,
  };

  await axios
    .get(
      `${url.server_api_base_url}/shipment-planning/gate-in-data?intShipmentId=${data}`,
    )
    .then((res) => {
      responseList.isLoading = false;
      if (res.data.data != null) {
        responseList.data = res.data.data;
        responseList.status = true;
      } else {
        responseList.data = {};
        responseList.status = false;
      }
    })
    .catch((error) => {
      console.log('error', error);
      responseList.isLoading = false;
      responseList.status = false;
    });
  console.log('responseList', responseList);
  return responseList;
};

export const getInSubmitActon = async (data) => {
  let responseList = {
    isLoading: false,
    data: {},
    status: '',
  };

  responseList.isLoading = true;

  const userID = await getUserId();
  let unitId = await getUnitId();
  let currentDate = currentdate();

  // let postData = {
  //   dteInTime: '2020-07-28',
  //   intInsertedBy: 1,
  //   intUnitId: 4,
  //   intVehicleId: 1,
  //   strVehicleRegNo: 'Dhaka Metro TA-14-6296',
  //   intVehicleTypeId: 123,
  //   strDriver: 'string',
  //   strContact: 'string',
  //   intShipPointId: 46,
  //   ysnOwn: true,
  //   intSupplierId: 1,
  //   strSupplierName: 'string',
  //   intCustomerId: 1,
  //   strCustomerName: 'string',
  //   numKMReading: 1,
  //   strDriverNID: 'string',
  //   strHelperName: 'string',
  //   numLoadingCapacity: 1,
  //   intLoadUOM: 1,
  //   strLisence: 'string',
  //   intDO: 1223,
  // };
  let postData = {
    dteInTime: currentDate,
    intInsertedBy: userID,
    intUnitId: data.intUnitID,
    intVehicleId: data.intVehicleID,
    strVehicleRegNo: data.strRegNo,
    intVehicleTypeId: data.intVehicleTypeId,
    strDriver: data.strDriverName,
    strContact: data.strDriverContact,
    intShipPointId: data.shippingpointid,
    ysnOwn: data.ysnOwn,
    intSupplierId: data.supplierid,
    strSupplierName: data.suppliername,
    intCustomerId: data.intCustomerId,
    strCustomerName: data.strCustomerName,
    numKMReading: data.intMeterReadingNo,
    strDriverNID: data.strDriverNID,
    strHelperName: data.strHelperName,
    numLoadingCapacity: data.numLoadingCapacity,
    intLoadUOM: data.intLoadUOM,
    strLisence: data.strLisenceNo,
    intDO: parseInt(data.strSalesOrderCode),
    intShipmentID: data.intShipmentId,
    intRequestID: data.intRequestId,
  };
  console.log('postData', postData);

  await axios
    .post(`${url.server_api_base_url}/logistic/trips`, postData, {})
    .then((res) => {
      responseList.isLoading = false;
      responseList.data = res.data;
      responseList.status = res.status;
    })
    .catch((error) => {
      responseList.isLoading = false;
    });
  return responseList;
};
