import * as Types from '../types/Types';
import axios from 'axios';
import * as url from '../../HrConfig.json';
import {getUserId} from '../../../User/util/AuthData';
import {
  SqliteDeparment,
  offLineGetDepartment,
  offLineAddDepartment,
} from './../../../Master/components/SqliteService/SqliteDeparment';

export const GetDepartmentList = () => async (dispatch) => {
  let responseList = {
    isLoading: true,
    data: {},
  };
  dispatch({type: Types.GET_DEPARTMENT, payload: responseList});
  try {
    await axios
      .get(url.api_get_department_list)
      .then((res) => {
        responseList.isLoading = false;
        responseList.data = res.data;
        SqliteDeparment(res.data);
      })
      .catch(async (error) => {
        if (error.message == 'Network Error') {
          await offLineGetDepartment().then((result) => {
            responseList.isLoading = false;
            responseList.data.data = result.data;
          });
        }
        responseList.isLoading = false;
      });
  } catch (error) {
    responseList.isLoading = false;
  }
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
      .catch(async (error) => {
        if (error.message == 'Network Error') {
          await offLineAddDepartment(postData).then((result) => {});
        }
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
