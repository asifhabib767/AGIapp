import * as React from 'react';
import axios from 'axios';
import * as url from '../../InventoryConfig.json';
import {getUnit, getUserId} from '../../../Sales/service/auth/AuthService';
import {getUnitId} from '../../../User/util/AuthData';
import {
  ListSqliteStoreRequisition,
  offlineGetStoreRequisition,
  offLineGetWarehouse,
  offlineGetWarehouseList,
} from '../../offLineData/SqliteListStoreRequistion';
import {itemTypegetbyOffline} from '../../offLineData/ItemTypeOffline';
import {IappsNetInfo} from '../../../Master/components/netInfo/IappsNetInfo';
import {
  addSqliteStoreRequisition,
  offlineRequistionObjectStore,
} from '../../offLineData/SqliteAddStoreRequisition';
import {offlineItemTypeStore} from '../../offLineData/ItemTypeOffline';
import {
  offlineDepartmentStore,
  departmentgetbyOffline,
} from '../../offLineData/DepartmentOffline';
import {offlineItemStore} from '../../offLineData/ItemOffline';

export const getWarehouseByEmployeeId = async () => {
  let responseList = {
    isLoading: true,
    data: {},
  };
  const intEmployeeId = await getUserId();
  let netStatus = await IappsNetInfo();
  if (!netStatus) {
    let warehosue = await offlineGetWarehouseList();
    console.log('offlinedata ware house', warehosue);
    responseList.data = warehosue;
    return responseList;
  }

  await axios
    // .get(`${wearehouse_list_by_employee_id}?intEmployeeId=${intEmployeeId}`)
    .get(
      `http://iapps.akij.net/asll/public/api/v1/purchaseRequisition/getWearehouseListByEmployeePermissionForStore?intEmployeeId=${intEmployeeId}`,
    )
    .then((res) => {
      responseList.isLoading = false;
      offLineGetWarehouse(res.data.data);
      responseList.data = res.data.data;
    })
    .catch((error) => {
      responseList.isLoading = false;
    });
  return responseList;
};
export const getMaintenanceWHList = async () => {
  let responseList = {
    isLoading: true,
    data: {},
  };
  let intUnitId = await getUnitId();

  await axios
    // .get(`${wearehouse_list_by_employee_id}?intEmployeeId=${intEmployeeId}`)
    .get(
      `http://iapps.akij.net/asll/public/api/v1/maintanance/getMaintenanceWHList?intUnitID=${intUnitId}`,
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

export const getStoreRequisitionList = async () => {
  let responseList = {
    isLoading: true,
    data: {},
  };
  let intUnitId = await getUnitId();
  await axios
    .get(
      `${url.server_api_base_url}/storeRequisition/getStoreListByUnitId?intUnitId=${intUnitId}`,
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

export const getStoreRequisitionListByEmployeeId = async () => {
  let responseList = {
    isLoading: true,
    data: {},
  };
  let intEmployeeId = await getUserId();
  let netStatus = await IappsNetInfo();

  if (!netStatus) {
    let offlinedata = await offlineGetStoreRequisition();
    responseList.data = offlinedata;
  }

  const getStoreDataURL = `${url.server_api_base_url}/storeRequisition/getStoreRequisitionByEmployee?intEmployeeId=${intEmployeeId}`;

  await axios
    .get(getStoreDataURL)
    .then((res) => {
      console.log('getStoreDataURL', getStoreDataURL);
      console.log('store requisition data: ', res.data.data);
      responseList.isLoading = false;
      responseList.data = res.data.data;
      ListSqliteStoreRequisition(res.data.data);
    })
    .catch((error) => {
      responseList.isLoading = false;
    });
  return responseList;
};

export async function getItemSearchList(whId, searchText) {
  let intUnitID = await getUnit();
  let url = `http://iapps.akij.net/asll/public/api/v1/mrr/getwhItemList?intWHID=${whId}&strItemFullName=${searchText}`;

  let responseList = {
    isLoading: true,
    data: {},
  };
  await axios
    .get(url)
    .then((res) => {
      responseList.data = res.data.data;
      console.log('res search item list', res.data.data);
    })
    .catch((err) => {
      console.log('error', err);
    });

  return responseList;
}

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
      console.log('ResponseData', res.data.data);
      responseList.isLoading = false;
      responseList.data = res.data.data;
    })
    .catch((error) => {
      responseList.isLoading = false;
    });
  return responseList;
};
export const getItemListByWearhouseAndBalance = async (warehouseId) => {
  let responseList = {
    isLoading: true,
    data: {},
  };
  console.log('warehouseId', warehouseId);
  await axios
    .get(
      `${url.server_api_base_url}/mrr/getItemListByWearhouseAndBalance?intWHID=${warehouseId}`,
    )
    .then((res) => {
      console.log('res ponse new item', res.data.data);
      responseList.data = res.data.data;
    })
    .catch((error) => {
      console.log('error', error);
      responseList.isLoading = false;
    });
  return responseList;
};

export const getItemTypeList = async () => {
  let responseList = {
    isLoading: true,
    data: {},
  };

  let netStatus = await IappsNetInfo();
  if (!netStatus) {
    let offlinedata = await itemTypegetbyOffline();
    responseList.data = offlinedata;
    return responseList;
  }

  await axios
    .get(`${url.server_api_base_url}/purchaseRequisition/getItemTypeListAll`)
    .then((res) => {
      // console.log('res item lsit', res.data.data[0].intItemTypeID);
      responseList.isLoading = false;
      offlineItemTypeStore(res.data.data);
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
      console.log('actin item', res);
      responseList.isLoading = false;

      offlineItemStore(res.data.data);
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

  let netStatus = await IappsNetInfo();
  if (!netStatus) {
    let offlinedata = await departmentgetbyOffline();
    responseList.data = offlinedata;
    return responseList;
  }

  await axios
    .get(`${url.server_api_base_url}/purchaseRequisition/getDepartmentList`)
    .then((res) => {
      responseList.isLoading = false;
      offlineDepartmentStore(res.data.data);
      responseList.data = res.data.data;
    })
    .catch((error) => {
      responseList.isLoading = false;
    });
  return responseList;
};

export async function AddStoreRequisitionAction(storeRequisition) {
  let unitId = await getUnit();
  let actionId = await getUserId();

  let responseList = {
    isLoading: true,
    data: {},
    status: false,
  };

  let netStatus = await IappsNetInfo();

  let postData = {
    requisitions: [],
  };

  for (let i = 0; i < storeRequisition.multipleWarehouse.length; i++) {
    const element = storeRequisition.multipleWarehouse[i];
    let PostDataObj = {
      intWHID: parseInt(element.warehouseId.intWHID),
      // intItemTypeID: parseInt(storeRequisition.itemTypeId),
      intItemID: parseInt(element.itemId),
      numReqQty: parseInt(element.quantity),
      intDeptID: parseInt(element.deptId),
      dteReqDate: element.dueDate,
      strRemarks: element.purpose,
      intInsertBy: actionId,
      intUnitID: unitId,
    };
    postData.requisitions.push(PostDataObj);
    console.log('PostDataObj', PostDataObj);
  }

  const headers = {
    'Content-Type': 'application/json',
  };

  if (!netStatus) {
    let offlinedata = await offlineRequistionObjectStore(storeRequisition);
    console.log('offlinedata', offlinedata.status);
    responseList.status = offlinedata.status;
    return responseList;
  }

  let postUrl = `${url.server_api_base_url}/storeRequisition/postStoreRequisitionEntry `;
  let storeRequisitionPost = await axios
    .post(postUrl, postData, {headers: headers})
    .then(function (response) {
      console.log('response', response);
      responseList.data = response.data;
      responseList.isLoading = false;
      responseList.status = response.data.status;
    })
    .catch(function (error) {
      console.log('error', error);
      responseList.status = response.data.status;
    });

  return responseList;
}
