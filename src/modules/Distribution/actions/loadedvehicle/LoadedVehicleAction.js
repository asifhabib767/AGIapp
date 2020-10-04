import * as Types from '../types/Types';
import axios from 'axios';
import * as url from '../../DistributionConfig.json';
import {getUserId, getUnitId} from '../../../User/util/AuthData';
import {
  SqliteDeparment,
  offLineGetDepartment,
  offLineAddDepartment,
} from './../../../Master/components/SqliteService/SqliteDeparment';

export const GetLaodedVehicleList = async (data) => {
  let intUnitId = await getUnitId();
  let responseList = {
    isLoading: true,
    data: {},
  };
  await axios
    .get(
      `${url.server_api_base_url}/logistic/trips/getTripListByUnitIdLoaded?intUnitId=${intUnitId}`,
    )
    .then((res) => {
      console.log('responseData', res);
      responseList.isLoading = false;
      responseList.data = res.data.data;
    })
    .catch((error) => {
      console.log('ErrorData', error);
      responseList.isLoading = false;
    });
  return responseList;
};

export const ScanDataHandling = async (inputValue) => {
  let intUnitId = await getUnitId();
  let responseList = {
    isLoading: true,
    data: {},
    status: false,
  };

  await axios
    .get(
      `${url.server_api_base_url}/logistic/trips/getTripDetailsByTripCode?strCode=${inputValue}&intUnitId=${intUnitId}`,
    )
    .then((res) => {
      responseList.data = res.data.data;
      responseList.status = true;
      responseList.isLoading = false;
    })
    .catch((error) => {
      responseList.isLoading = false;
      responseList.status = false;
    });
  return responseList;
  // dispatch({ type: Types.ADD_DEPARTMENT_HANDELING, payload: data });
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

export const addLoadedVehicle = async (data) => {
  let responseList = {
    isLoading: true,
    data: {},
    status: false,
  };
  responseList.isLoading = true;
  let intUnitId = data.intUnitId;
  let numEmptyWeight = data.numEmptyWeight;
  let numLoadedWeight = data.Unloaded;
  let intUOM = 1049; // Ton
  let intUserId = data.userId;
  let tripcode = data.strTripCode;
  const url = `http://api2.akij.net:8054/api/TripWeightForUnloadNLoad/TripWeightForLoadedEntries?intUnitId=${intUnitId}&numEmptyWeight=${numEmptyWeight}&numLoadedWeight=${numLoadedWeight}&intUOM=${intUOM}&intUserId=${intUserId}&tripcode=${tripcode}`;

  try {
    await axios
      .post(url)
      .then((res) => {
        responseList.data = res.data.data;
        responseList.status = true;
        responseList.isLoading = false;
      })
      .catch((error) => {
        console.log('ErrorData', error);
        responseList.isLoading = false;
        responseList.status = false;
      });
  } catch (error) {
    responseList.isLoading = false;
    responseList.status = false;
  }
  return responseList;
};

export const submitLoadedConditionCheck = async (data) => {
  let responseList = {
    isLoading: true,
    data: {},
    status: false,
  };
  let intUnitId = data.intUnitId;
  let numEmptyWeight = data.numEmptyWeight;
  let numLoadedWeight = data.Unloaded;
  let intUserId = data.userId;
  let tripcode = data.strTripCode;

  const urlCheck = `${url.server_api_base_url}/logistic/trips/checkLoadingCondition?intUnitId=${intUnitId}&loadedWeight=${numLoadedWeight}&strCode=${tripcode}`;

  console.log('urlCheck', urlCheck);

  try {
    await axios
      .get(urlCheck)
      .then((res) => {
        console.log('res condition check: ', res.data);
        responseList.data = res.data.data;
        responseList.isLoading = false;

        if (res.data.data) {
          responseList.status = true;
        } else {
          responseList.status = false;
        }
      })
      .catch((error) => {
        console.log('ErrorData', error);
        responseList.isLoading = false;
        responseList.status = false;
      });
  } catch (error) {
    responseList.isLoading = false;
    responseList.status = false;
  }
  return responseList;
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
