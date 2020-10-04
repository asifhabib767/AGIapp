import * as React from 'react';
import axios from 'axios';
import * as url from '../../InventoryConfig.json';
import {getUnit, getUserId} from '../../../Sales/service/auth/AuthService';
import {getUnitId} from '../../../User/util/AuthData';

// export const getPurchaseRequisitionList = async () => {
//     let intUnitID = await getUnit();
//     // let url = `${purchase_requisition_list}?intUnitId=${intUnitID}`;
//     let url = `http://iapps.akij.net/asll/public/api/v1/purchaseRequisition/getPurchaseListByUnitId?intUnitId=${intUnitID}`;
//     let data = [];
//     if (url.length !== 0) {
//         await Axios.get(url).then((res) => {
//             data = res.data;
//         })
//             .catch((err) => {
//                 console.log('postOrderData', err);
//             });

//     }

//     return data;
// }

export const getPurchaseRequisitionList = async () => {
  let responseList = {
    isLoading: false,
    data: {},
  };
  //   responseList.isLoading = true;
  let intUnitID = await getUnitId();
  await axios
    .get(
      `${url.server_api_base_url}/purchaseRequisition/getPurchaseListByUnitId?intUnitId=${intUnitID}`,
    )
    .then((res) => {
      responseList.data = res.data.data;
      responseList.isLoading = false;
    })
    .catch((error) => {
      responseList.isLoading = false;
    });
  return responseList;
};

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

export const getItemTypeList = async () => {
  let responseList = {
    isLoading: true,
    data: {},
  };
  await axios
    .get(`${url.server_api_base_url}/purchaseRequisition/getItemTypeListAll`)
    .then((res) => {
      responseList.isLoading = false;
      responseList.data = res.data.data;
    })
    .catch((error) => {
      responseList.isLoading = false;
    });
  return responseList;
};

export const getItemListByUnitId = async () => {
  let responseList = {
    isLoading: true,
    data: {},
  };
  let unitId = await getUnitId();
  await axios
    .get(
      `${url.server_api_base_url}/purchaseRequisition/getItemListByUnit?intUnitId=${unitId}`,
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

export const getDepartmentList = async () => {
  let responseList = {
    isLoading: true,
    data: {},
  };
  await axios
    .get(`${url.server_api_base_url}/purchaseRequisition/getDepartmentList`)
    .then((res) => {
      responseList.isLoading = false;
      responseList.data = res.data.data;
    })
    .catch((error) => {
      responseList.isLoading = false;
    });
  return responseList;
};
export const GetDataForIndentItemDetailsForAPI = async (indentId) => {
  console.log('indentId', indentId);
  let responseList = {
    isLoading: true,
    data: {},
  };
  await axios
    .get(
      `http://api2.akij.net:8066/api/IndentItemDetailsForAPI/GetDataForIndentItemDetailsForAPI?indentId=${indentId}`,
    )
    .then((res) => {
      console.log('res purchase', res);
      responseList.isLoading = false;
      responseList.data = res.data;
    })
    .catch((error) => {
      console.log('erro', error);
      responseList.isLoading = false;
    });
  return responseList;
};

export async function addPurchaseRequisition(purchaseRequisitionData) {
  let unitId = await getUnit();
  let actionId = await getUserId();

  let responseList = {
    isLoading: true,
    data: {},
    status: false,
  };

  let postData = {
    requisitions: [],
  };

  for (let i = 0; i < purchaseRequisitionData.multipleWarehouse.length; i++) {
    const element = purchaseRequisitionData.multipleWarehouse[i];
    let PostDataObj = {
      dteDueDate: element.dueDate,
      strIndentType: 'local',
      intEmployeeId: actionId,
      intUnitID: unitId,
      intWHID: parseInt(element.warehouseId.intWHID),
      strAccountRemarks: element.purpose,
      intCostCenter: 2322,
      intDepartmentID: parseInt(element.deptId),
      numQty: parseInt(element.quantity),
      intItemID: parseInt(element.itemId),
    };
    postData.requisitions.push(PostDataObj);
  }

  const headers = {
    'Content-Type': 'application/json',
  };

  let postUrl = `${url.server_api_base_url}/purchaseRequisition/storePurchaseRequisition`;

  let purchaseRequisitionPost = await axios
    .post(postUrl, postData, {headers: headers})

    .then(function (response) {
      console.log('response purchase', response);
      responseList.data = response.data;
      responseList.status = response.data.status;
    })
    .catch(function (error) {
      responseList.status = response.data.status;
    });

  return responseList;
}
