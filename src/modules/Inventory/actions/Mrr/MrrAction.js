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
      // `${url.server_api_base_url}/purchaseRequisition/getWearehouseList?intUnitId=${unitId}`
      `http://iapps.akij.net/asll/public/api/v1/purchaseRequisition/getWearehouseList?intUnitId=${unitId}`,
    )
    .then((res) => {
      console.log('res', res);
      responseList.isLoading = false;
      responseList.data = res.data.data;
    })
    .catch((error) => {
      console.log('ErrorData', error);
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
    .get(
      `http://iapps.akij.net/asll/public/api/v1/purchaseRequisition/getItemTypeListAll`,
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

export const getPOListByWHId = async (WHId) => {
  let responseList = {
    isLoading: true,
    data: {},
  };
  let unitId = await getUnitId();
  WHId = parseInt(WHId);

  await axios
    .get(
      `http://iapps.akij.net/asll/public/api/v1/mrr/getPOList?intWHID=${WHId}&strPoFor=Local`,
    )
    .then((res) => {
      responseList.isLoading = false;
      responseList.data = res.data.data;
      console.log('res.data.data', res.data.data);
      return responseList;
    })
    .catch((error) => {
      console.log('error');

      responseList.isLoading = false;
    });
  return responseList;
};

export const getwhStoreLocation = async (WHId) => {
  console.log('enter');
  let responseList = {
    isLoading: true,
    data: {},
  };
  let unitId = await getUnitId();
  WHId = parseInt(WHId);

  await axios
    .get(
      `http://iapps.akij.net/asll/public/api/v1/mrr/getwhStoreLocation?intWHID=${WHId}`,
    )
    .then((res) => {
      responseList.isLoading = false;
      responseList.data = res.data.data;
      console.log('res.data.data', res.data.data);
      return responseList;
    })
    .catch((error) => {
      console.log('error');

      responseList.isLoading = false;
    });
  return responseList;
};

export const getPOVSItemDet = async (POId, WHId) => {
  console.log('POId:', POId, 'WHId:', WHId);
  let responseList = {
    isLoading: true,
    data: {},
  };
  let unitId = await getUnitId();
  WHId = parseInt(WHId);
  POId = parseInt(POId);

  await axios
    .get(
      `http://iapps.akij.net/asll/public/api/v1/mrr/getPOVSItemDet?intPOID=${POId}&intWHId=${WHId}`,
    )
    .then((res) => {
      responseList.isLoading = false;
      responseList.data = res.data.data;
      console.log('res.data.data', res.data.data);
      return responseList;
    })
    .catch((error) => {
      console.log('error');

      responseList.isLoading = false;
    });
  return responseList;
};

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

export async function mrrcreate(state) {
  let unitId = await getUnit();
  let actionId = await getUserId();

  const {
    warehouseSelected,
    POId,
    date,
    vatAmount,
    challan,
    vatChallan,
  } = state.stateData;

  console.log('state', state);

  let responseList = {
    isLoading: true,
    data: {},
    status: false,
  };

  let itemType = parseInt(state.stateData.itemTypeSelected.intItemTypeID);

  // let postData = {
  //   requisitions: [],
  // };

  let postData = [];

  for (let i = 0; i < state.mrrListData.length; i++) {
    const element = state.mrrListData[i];
    console.log('element', element);
    let PostDataObj = {
      // intPOID: parseInt(POId),
      // intSupplierID: parseInt(state.stateData.intSupplierID),
      // intShipment: 0,
      // dteChallan: date,
      // monVatAmount: parseInt(vatAmount),
      // challanNo: vatChallan,
      // strVatChallan: '369',
      // monProductCost: 0,
      // monOther: 0,
      // monDiscount: 0,
      // monBDTConversion: 1,
      // intItemID: parseInt(element.intItemID),
      // numPOQty: parseInt(element.numQty),
      // numPreRcvQty: 0,
      // numRcvValue: element.mrrReceiveValue,
      // numRcvVatValue: 0,
      // locationId: parseInt(element.locationSelected.intStoreLocationID),
      // remarks: 'string',
      // monRate: parseInt(element.monRate),
      // poIssueBy: actionId,
      // batchNo: 'BB',
      // ysnInventory: true,
      // ysnProcess: false,
      // intShipmentID: 0,
      intPOID: parseInt(POId),
      intSupplierID: parseInt(state.stateData.intSupplierID),
      intShipment: 0,
      monVatAmount: parseInt(vatAmount),
      challanNo: challan,
      strVatChallan: vatChallan,
      monProductCost: element.mrrReceiveValue,
      monOther: 0,
      monDiscount: 0,
      monBDTConversion: 1,
      intItemID: parseInt(element.intItemID),
      numPOQty: parseInt(element.numQty),
      numRcvQty: parseInt(element.mrrQty),
      numPreRcvQty: 0,
      numRcvValue: element.mrrReceiveValue,
      numRcvVatValue: 0,
      locationId: parseInt(element.locationSelected.intStoreLocationID),
      remarks: 'TEST',
      monRate: parseInt(element.monRate),
      poIssueBy: actionId,
      batchNo: 'BB',
      ysnInventory: true,
      ysnProcess: false,
      intShipmentID: 0,
    };
    postData.push(PostDataObj);
  }

  console.log('PostDataObj', postData);

  const headers = {
    'Content-Type': 'application/json',
  };

  // let postUrl = `http://api2.akij.net:8066/api/MrrReceive/MRREntries?intType=${itemType}&intWh=${warehouseSelected.intWHID}&intPOId=${POId}&dteDate=${date}&intEnroll=${actionId}`;
  let postUrl = `http://api2.akij.net:8066/api/MrrEntryAndUpdate/MrrEntry?intWh=${warehouseSelected.intWHID}&intPOId=${POId}&dteDate=${date}&intEnroll=1272`;

  console.log('postData', postData);

  let purchaseRequisitionPost = await axios
    .post(postUrl, postData, {headers: headers})

    .then(function (response) {
      console.log('response mrr', response);
      responseList.data = response.data;
      responseList.status = response.status;
    })
    .catch(function (error) {
      console.log('errro', error);
      // responseList.status = response.data.status;
    });

  return responseList;
}
