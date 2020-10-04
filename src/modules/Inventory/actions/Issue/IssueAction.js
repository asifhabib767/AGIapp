import * as React from 'react';
import axios from 'axios';
import * as url from '../../InventoryConfig.json';
import {getUnit, getUserId} from '../../../Sales/service/auth/AuthService';
import {getUnitId} from '../../../User/util/AuthData';

export const getWarehouseByUnitId = async () => {
  let responseList = {
    isLoading: true,
    data: {},
  };
  let unitId = await getUnitId();
  await axios
    .get(
      `${url.server_api_base_url}/purchaseRequisition/getWearehouseList?intUnitId=${unitId}`,
    )
    .then((res) => {
      responseList.isLoading = false;
      responseList.data = res.data.data;
    })
    .catch((error) => {
      responseList.isLoading = false;
    });
  return responseList;
};

export const getRequisitionList = async (WHID, startDate, endDate) => {
  let responseList = {
    isLoading: true,
    data: {},
  };
  let unitId = await getUnitId();
  await axios
    .get(
      `${url.server_api_base_url}/storeRequisition/getStoreRequisitionListForIssue?intUnitId=${unitId}&intWarehouseId=${WHID}&dteStartDate=${startDate}&dteEndDate=${endDate}`,
    )
    .then((res) => {
      responseList.isLoading = false;
      responseList.data = res.data.data;
    })
    .catch((error) => {
      responseList.isLoading = false;
    });
  return responseList;
};

export const getCostCenterByUnitId = async () => {
  let responseList = {
    isLoading: true,
    data: {},
  };
  let unitId = await getUnitId();
  await axios
    .get(
      `${url.server_api_base_url}/accounts/getCostCenterByUnitId?intUnitId=${unitId}`,
    )
    .then((res) => {
      console.log('costsec e kek', res);
      responseList.isLoading = false;
      responseList.data = res.data.data;
    })
    .catch((error) => {
      responseList.isLoading = false;
    });
  return responseList;
};

export const getStoreRequisitionDetailsByRequisitionId = async (
  requisitionId,
) => {
  let responseList = {
    isLoading: true,
    data: {},
  };

  await axios
    .get(
      `${url.server_api_base_url}/storeRequisition/getStoreRequisitionDetailsByRequisitionId?intReqID=${requisitionId}`,
    )
    .then((res) => {
      responseList.isLoading = false;
      responseList.data = res.data.data;
    })
    .catch((error) => {
      responseList.isLoading = false;
    });
  return responseList;
};

export const getStoreLocationByEmployeeId = async (requisitionId) => {
  let responseList = {
    isLoading: true,
    data: {},
  };
  await axios
    .get(
      `${url.server_api_base_url}/storeRequisition/getStoreRequisitionDetailsByRequisitionId?intReqID=${requisitionId}`,
    )
    .then((res) => {
      responseList.isLoading = false;
      responseList.data = res.data.data;
    })
    .catch((error) => {
      responseList.isLoading = false;
    });
  return responseList;
};
export const getwhStoreLocation = async (whid) => {
  let responseList = {
    isLoading: true,
    data: {},
  };
  await axios
    .get(`${url.server_api_base_url}/mrr/getwhStoreLocation?intWHID=${whid}`)
    .then((res) => {
      console.log('res', res);
      responseList.isLoading = false;
      responseList.data = res.data.data;
    })
    .catch((error) => {
      console.log('error', error);
      responseList.isLoading = false;
    });
  return responseList;
};
export const getEmployeeProfileSearch = async (employeeInfo) => {
  let responseList = {
    isLoading: true,
    data: {},
  };
  await axios
    .get(
      `http://iapps.akij.net/asll/public/api/v1/hr/getEmployeeProfileSearch?intEmployeeID=${employeeInfo}`,
    )
    .then((res) => {
      console.log('res employye info', res);
      responseList.isLoading = false;
      responseList.data = res.data.data;
    })
    .catch((error) => {
      console.log('error', error);
      responseList.isLoading = false;
    });
  return responseList;
};
export async function storeIssue(state, warehouseId, requisitionData) {
  let unitId = await getUnit();
  let actionId = await getUserId();

  let username;

  console.log('state', state);
  console.log('requisitionData', requisitionData);

  let responseList = {
    isLoading: true,
    data: {},
    status: false,
  };

  let postData = {
    requisitions: [],
  };

  for (let i = 0; i < state.requisitionDetailsListData.length; i++) {
    const element = state.requisitionDetailsListData[i];
    console.log('element', element);
    let PostDataObj = {
      intSRID: parseInt(requisitionData.intReqID),
      strSrNo: requisitionData.strCode,
      intEmployeeId: actionId,
      strRecieveEmployeeName: requisitionData.strRequestByName,
      strUseFor: element.strRemarks,
      intUnitID: unitId,
      intWHID: parseInt(warehouseId),
      dteSrDate: requisitionData.dteReqDate,
      intCostCenter: parseInt(state.costCenterId),
      intDept: parseInt(requisitionData.intDeptID),
      numQty: parseInt(element.issueQty),
      intItemID: parseInt(element.intItemID),
      intSection: 17316,
      intLocation: parseInt(element.locationId),
      strSection: requisitionData.strDepatrment,
      strReceivedBy: state.strEmployeeName,
      monValue: 0,
      strRemarks: element.strRemarks,
    };
    postData.requisitions.push(PostDataObj);
    console.log('PostDataObj', PostDataObj);
  }

  const headers = {
    'Content-Type': 'application/json',
  };

  let postUrl = `${url.server_api_base_url}/requisitionIssue/storeIssue`;

  let purchaseRequisitionPost = await axios
    .post(postUrl, postData, {headers: headers})

    .then(function (response) {
      console.log('response', response);
      responseList.data = response.data;
      responseList.status = response.data.status;
    })
    .catch(function (error) {
      responseList.status = response.data.status;
    });

  return responseList;
}

export async function addPurchaseRequisition(purchaseRequisitionData) {
  let unitId = await getUnit();
  let actionId = await getUserId();

  let postData = {
    requisitions: [
      {
        dteDueDate: purchaseRequisitionData.date,
        strIndentType: 'local',
        intEmployeeId: actionId,
        intUnitID: unitId,
        intWHID: purchaseRequisitionData.warehouseId,
        strAccountRemarks: purchaseRequisitionData.purpose,
        intCostCenter: 2322,
        intDepartmentID: purchaseRequisitionData.departmentId,
        numQty: purchaseRequisitionData.quantity,
        intItemID: purchaseRequisitionData.itemId,
      },
    ],
  };

  const headers = {
    'Content-Type': 'application/json',
  };

  let postUrl = `${url.server_api_base_url}/purchaseRequisition/storePurchaseRequisition`;

  let purchaseRequisitionPost = await axios
    .post(postUrl, postData, {headers: headers})

    .then(function (response) {
      if (response.data.length != 0) {
        return response;
      } else {
        //
      }
    })
    .catch(function (error) {
      console.log('error data:>> ', error);
    });

  return purchaseRequisitionPost;
}
