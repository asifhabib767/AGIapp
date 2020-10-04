import * as Types from '../types/Types';
import axios from 'axios';
import * as url from '../../DistributionConfig.json';
import {getUserId, getUnitId} from '../../../User/util/AuthData';
import {server_api_base_url} from '../../DistributionConfig.json';
import {Alert} from 'react-native';
import {currentdate} from '../../../HR/Utils/DateConfigure';

export const GetDepartmentList = () => async (dispatch) => {
  let responseList = {
    isLoading: true,
    data: {},
  };
  dispatch({type: Types.GET_DEPARTMENT, payload: responseList});
  await axios
    .get(url.api_get_department_list)
    .then((res) => {
      responseList.isLoading = false;
      responseList.data = res.data;
    })
    .catch((error) => {
      responseList.isLoading = false;
    });
  dispatch({type: Types.GET_DEPARTMENT, payload: responseList});
};

export const DepartmentInputAddHandling = (inputName, inputValue) => async (
  dispatch,
) => {
  let data = {
    inputName: inputName,
    inputValue: inputValue,
  };
  dispatch({type: Types.ADD_DEPARTMENT_HANDELING, payload: data});
};
export const departmentSelectHandeling = (inputName, index) => async (
  dispatch,
) => {
  let data = {
    inputName: inputName,
    inputValue: index,
  };
  dispatch({type: Types.SELECT_DEPARTMENT_OPTIONS, payload: data});
};

export const addDepartment = (data) => async (dispatch) => {
  let postData = {
    Name: data.name,
    Code: data.code,
    BusinessId: parseInt(data.businessId),
    Status: data.statusId,
    UserId: 1,
  };

  let departmentResponse = {
    status: false,
    message: '',
    isLoading: true,
    tokenData: '',
    data: {},
  };

  try {
    await axios
      .post(`https://app1.akij.net/api/v1/hr/departments`, postData)
      .then(async (res) => {
        const data = res.data;
        departmentResponse.status = data.status;
        departmentResponse.message = data.message;
        departmentResponse.isLoading = false;
        departmentResponse.tokenData = data.access_token;
        departmentResponse.data = data.user;
      })
      .catch((error) => {
        departmentResponse.isLoading = false;
        departmentResponse.data = error.response.data.Message;
        departmentResponse.tokenData = error.response.data.access_token;
        departmentResponse.message = error.response.data.Message;
      });
    dispatch({type: Types.POST_DEPARTMENT, payload: departmentResponse});
  } catch (error) {}
};

export const emptyMessage = () => (dispatch) => {
  dispatch({type: Types.EMPTY_DEPARTMENT_MESSAGE, payload: true});
};

export const emptyRefreshControl = (status) => async (dispatch) => {
  dispatch({type: Types.REFRESING_CONTROL, payload: status});
};
export const departmentEdit = (id) => async (dispatch) => {
  let responseList = {
    isLoading: true,
    data: {},
  };
  dispatch({type: Types.GET_DEPARTMENT, payload: responseList});
  await axios
    .get(`https://app1.akij.net/api/v1/hr/departments/${id}`)
    .then((res) => {
      responseList.isLoading = false;
      responseList.data = res.data.data;
    })
    .catch((error) => {
      responseList.isLoading = false;
    });

  dispatch({type: Types.EDIT_DEPARTMENT, payload: responseList});
};

export const updateDepartment = (data) => async (dispatch) => {
  let postData = {
    Name: data.name,
    Code: data.code,
    BusinessId: parseInt(data.businessId),
    UserId: 1,
    Status: data.statusId,
  };
  let departmentResponse = {
    status: false,
    message: '',
    isLoading: true,
    data: {},
  };

  try {
    dispatch({type: Types.GET_DEPARTMENT, payload: departmentResponse});
    await axios
      .put(
        `https://app1.akij.net/api/v1/hr/departments/${data.editId}`,
        postData,
      )
      .then(async (res) => {
        const data = res.data;
        departmentResponse.status = data.status;
        departmentResponse.message = data.message;
        departmentResponse.isLoading = false;
      })
      .catch((error) => {
        departmentResponse.isLoading = false;
        departmentResponse.data = error.response.data.Message;
      });
    dispatch({type: Types.UPDATE_DEPARTMENT, payload: departmentResponse});
  } catch (error) {}
};

export const GetTripDetailsByTripCode = async (tripCode) => {
  let unitId = await getUnitId();

  let responseList = {
    isLoading: true,
    data: {},
  };
  // dispatch({ type: Types.GET_TRIP_DETAILS, payload: responseList });
  await axios
    .get(
      `${server_api_base_url}/logistic/trips/getTripDetailsByTripCode?strCode=${tripCode}&intUnitId=${unitId}`,
    )
    .then((res) => {
      responseList.isLoading = false;
      responseList.data = res.data;
    })
    .catch((error) => {
      responseList.isLoading = false;
    });
  return responseList;
  // dispatch({ type: Types.GET_TRIP_DETAILS, payload: responseList });
};

export const getExtraChargeType = async () => {
  let unitId = await getUnitId();
  let responseList = {
    isLoading: true,
    data: {},
  };
  // dispatch({ type: Types.GET_TRIP_DETAILS, payload: responseList });
  await axios
    .get(
      `${server_api_base_url}/sales/getExtraChargeListByUnit?intUnitId=${unitId}`,
    )
    .then((res) => {
      responseList.isLoading = false;
      responseList.data = res.data;
    })
    .catch((error) => {
      responseList.isLoading = false;
    });
  return responseList;
  // dispatch({ type: Types.GET_TRIP_DETAILS, payload: responseList });
};

export const assignVehicle = async (
  vehicleData,
  extraChargeId,
  incentiveId,
) => {
  let responseList = {
    status: false,
    isLoading: false,
    data: {},
    message: '',
  };

  responseList.isLoading = true;

  let postData = [];
  let totalQty = 0;
  for (let i = 0; i < vehicleData.qty.length; i++) {
    let element = vehicleData.qty[i];
    element.uom = typeof element.uom == 'undefined' ? 12 : element.uom;
    totalQty += element.sumDeliveryQuantity;

    let narr = element.narr;
    if (typeof narr != 'undefined' && narr.length > 0) {
      const narrationFirstPart = narr.split('[')[1];
      const narrationSecondPart = element.strCustomerName;
      const fullNarration =
        '[' + narrationFirstPart + ' Sold to ' + narrationSecondPart + ']';
      narr = fullNarration;
    }

    let data = {
      pid: parseInt(element.pid),
      pName: element.pName,
      qnt: parseInt(element.sumDeliveryQuantity),
      uom: parseInt(element.uom),
      narr: element.narr,
      prom: parseFloat(element.prom),
      uomTxt: element.uomTxt,
      promItemId: parseInt(element.promItemId),
      promItem: element.promItem,
      promUom: parseInt(element.promUom),
      promUomText: element.promUomText,
      promPr: parseFloat(element.promPr),
      promItemCOA: parseInt(element.promItemCOA),
      soPkId: parseInt(element.soPkId),
    };
    postData.push(data);
  }

  const intSalesOrderId = parseInt(vehicleData.qty[0].intSalesOrderId);
  const intUserID = await getUserId();
  const intUnitID = await getUnitId();
  const currentTime = await currentdate();

  let dteDate = currentTime;
  let intShipPointId = vehicleData.trip.intShipPointId;
  let intVehicleId = vehicleData.trip.intVehicleId;

  let ysnLogistic =
    vehicleData.ysnOwn == 1 || vehicleData.trip.ysnOwn == true ? true : false;
  let ysnLogisticByCompany =
    vehicleData.ysnLogisticByCompany == 1 ||
    vehicleData.ysnLogisticByCompany == true
      ? true
      : false;
  let ysnChargeToSupplier =
    vehicleData.ysnChargeToSupplier == 1 ||
    vehicleData.ysnChargeToSupplier == true
      ? true
      : false;
  let numLogisticCharge = parseInt(vehicleData.trip.monLogisticRate * totalQty);
  let numGain = 0;
  let intLogisUOM = 1049;
  let intChargeId = extraChargeId;
  let intIncentiveId = incentiveId;
  let strNarration = vehicleData.qty[0].narr;

  const headers = {
    'Content-Type': 'application/json',
  };

  let url = `http://api2.akij.net:8054/api/VehicleAssign/VehicleAssignEntries?intSalesOrderId=${intSalesOrderId}&intUserID=${intUserID}&intUnitID=${intUnitID}&dteDate=${dteDate}&intShipPointId=${intShipPointId}&intVehicleId=${intVehicleId}&ysnLogistic=${ysnLogistic}&ysnLogisticByCompany=${ysnLogisticByCompany}&ysnChargeToSupplier=${ysnChargeToSupplier}&numLogisticCharge=${numLogisticCharge}&numGain=${numGain}&intLogisUOM=${intLogisUOM}&intChargeId=${intChargeId}&intIncentiveId=${intIncentiveId}&strNarration=${strNarration} `;

  let assignVehiclePost = await axios
    .post(url, postData, {
      headers: headers,
    })

    .then(function (response) {
      responseList.isLoading = false;
      responseList.data = response.data;
      responseList.message = response.data;
      responseList.status = true;
    })
    .catch(function (error) {
      console.log('error', error);
      responseList.isLoading = false;
      responseList.status = false;
    });

  return responseList;
};
