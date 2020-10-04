import * as React from 'react';
import axios from 'axios';
import * as url from '../../DistributionConfig.json';
import {getUnit} from '../../../Sales/service/auth/AuthService';
import {getUnitId} from '../../../User/util/AuthData';


export const callPLCAPI = async (data) => {
  let responseList = {
    isLoading: true,
    data: {},
  };

  let urlFull = `http://acclopc2019.akij.net:57412/config/v1/project/channels`;

  await axios
    .get(urlFull, {
      headers: {
        Authorization: `Basic YWRtaW5pc3RyYXRvcjpBc2RmMTIzNA==`,
      },
    })
    .then((res) => {
      responseList.isLoading = false;
      responseList.data = res.data;
    })
    .catch((error) => {
      responseList.isLoading = false;
      console.log('error', error);
    });
  return responseList;
};

export const getPackerList = async () => {
  let responseList = {
    isLoading: true,
    data: [],
  };

  const url = `http://iapps.akij.net/asll/public/api/v1/plc/getPackerList`;

  await axios
    .get(url)
    .then((res) => {
      responseList.isLoading = false;
      responseList.data = res.data.data;
    })
    .catch((error) => {
      responseList.isLoading = false;
      console.log('error', error);
    });
  return responseList;
};

export const getPackerInfoByPackerNo = async (packerNo) => {
  let responseList = {
    isLoading: true,
    data: {},
  };

  console.log('packerNo', packerNo);
  const url = `http://iapps.akij.net/asll/public/api/v1/plc/getPackerInformation?intPackerNo=${packerNo}`;

  try {
    await axios
    .get(url)
    .then((res) => {
      responseList.isLoading = false;
      responseList.data = res.data;
      console.log('packer Data: ', responseList.data);
    })
    .catch((error) => {
      responseList.isLoading = false;
      console.log('error', error);
    });
  } catch (error) {
    console.log('error', error);
  }
  return responseList;
};

export const storePackerBagInfoByPackerNo = async (packerNo, bagsQty) => {
  let responseList = {
    isLoading: true,
    data: {},
  };

  packerNo = parseInt(packerNo);
  bagsQty = parseInt(bagsQty);

  const url = `http://iapps.akij.net/asll/public/api/v1/plc/storePackerInformation?intPackerNo=${packerNo}&intBagQty=${bagsQty}`;

  await axios
    .get(url)
    .then((res) => {
      responseList.isLoading = false;
      responseList.data = res.data;
    })
    .catch((error) => {
      responseList.isLoading = false;
    });
  return responseList;
};
