import {api_shipping_points} from '../../SalesConfig.json';
import {getToken} from '../../service/tokens/TokenService';
import Axios from 'axios';
import {
  getUserId,
  getUnitId,
  getJobStationId,
} from '../../../User/util/AuthData';
import * as config from '../../SalesConfig.json';

export async function getItems() {
  let data = [];
  const jobStationID = 16;

  return data;
}

export async function getAssetListByJobStation(jobStationID) {
  console.log('jobStationID assets', jobStationID);
  let data = [];
  const url = `http://iapps.akij.net/asll/public/api/v1/maintanance/getAssetListByJobstation?intJobStationID=${jobStationID}`;

  await Axios.get(url, {
    token: getToken(),
  })
    .then((res) => {
      console.log('assset data', res);
      data = res.data.data;
    })
    .catch((err) => {});
  return data;
}

export async function getWarehouseList() {
  let data = [];
  const intUnitId = await getUnitId();
  const url = `http://iapps.akij.net/asll/public/api/v1/purchaseRequisition/getWearehouseList?intUnitId=${intUnitId}`;

  await Axios.get(url, {
    token: getToken(),
  })
    .then((res) => {
      data = res.data.data;
    })
    .catch((err) => {});
  return data;
}

// Service

export async function getServiceNameListByWareHouse(itemId) {
  let data = [];
  const url = `http://iapps.akij.net/asll/public/api/v1/maintanance/getServiceNameListByWareHouse?intWHID=${itemId}`;

  console.log('url', url);

  await Axios.get(url, {
    token: getToken(),
  })
    .then((res) => {
      console.log('service data', res);
      data = res.data.data;
    })
    .catch((err) => {});
  return data;
}

export async function getItemList(key, jobStationID) {
  let data = [];
  let url = '';

  // const jobStationID = await getJobStationId();

  if (key == 0) {
    url = `http://iapps.akij.net/asll/public/api/v1/maintanance/getPlannedAssetListByJobstation?intJobstationID=${jobStationID}`;
  } else {
    url = `http://iapps.akij.net/asll/public/api/v1/maintanance/getBreakDownAssetListByJobstation?intJobStationID=${jobStationID}`;
  }

  await Axios.get(url, {
    token: getToken(),
  })
    .then((res) => {
      console.log('Item data', res);
      data = res.data.data;
    })
    .catch((err) => {
      console.log('error item list fetching', err);
    });
  return data;
}

export async function getPersonsList() {
  let data = [
    {
      intEmployeeID: '482375',
      strEmployeeCode: 'AMFL-9985',
      strEmployeeName: 'Jeasmin',
    },
    {
      intEmployeeID: '482374',
      strEmployeeCode: 'AMFL-9984',
      strEmployeeName: 'Khorseda Begum',
    },
    {
      intEmployeeID: '367231',
      strEmployeeCode: 'AMFL-575',
      strEmployeeName: 'Fazlul Haque',
    },
    {
      intEmployeeID: '401721',
      strEmployeeCode: 'AMFL-9851',
      strEmployeeName: 'Mosa.Muslema Begum',
    },
    {
      intEmployeeID: '488856',
      strEmployeeCode: 'AMFL-9919',
      strEmployeeName: 'Sakib Hossain-',
    },
  ];
  // const intUnitId = 10;

  // const url = `http://iapps.akij.net/asll/public/api/v1/hr/getProfileByEnrollandUnitId?intUnitId=${intUnitId}`;

  // await Axios.get(url, {
  //   token: getToken(),
  // })
  //   .then((res) => {
  //     data = res.data.data;
  //   })
  //   .catch((err) => {
  //   });
  return data;
}

export async function AddPmsAction(pms) {
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

  postData.requisitions.push(PostDataObj);
  console.log('PostDataObj', PostDataObj);

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
