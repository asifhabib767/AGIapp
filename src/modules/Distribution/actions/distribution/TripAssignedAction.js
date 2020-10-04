import * as React from 'react';
import axios from 'axios';
import * as url from '../../DistributionConfig.json';
import {getUnit} from '../../../Sales/service/auth/AuthService';
import {getUnitId} from '../../../User/util/AuthData';

export const getTripListByUnitId = async (data) => {
  let responseList = {
    isLoading: true,
    data: {},
  };
  let unitId = await getUnitId();
  await axios
    .get(
      `${url.server_api_base_url}/logistic/trips/getTripListByUnitId?intUnitId=${unitId}`,
      // `${url.server_api_base_url}/logistic/trips/getTripListByUnitId?intUnitId=4&dteStartDate=%202020-07-01&dteEndDate=%202020-07-01`,
    )
    .then((res) => {
      console.log('getTripListByUnitId', res);
      responseList.isLoading = false;
      responseList.data = res.data.data;
    })
    .catch((error) => {
      responseList.isLoading = false;
    });
  return responseList;
};
export const getTripAssinged = async (data) => {
  let responseList = {
    isLoading: true,
    data: {},
  };
  let unitId = await getUnitId();
  let urlFull = `${url.server_api_base_url}/logistic/trips/getTripListByUnitIdAssignList?intUnitId=${unitId}`;
  console.log('trip list url:', urlFull);
  await axios
    .get(urlFull)
    .then((res) => {
      responseList.isLoading = false;
      responseList.data = res.data.data;
    })
    .catch((error) => {
      responseList.isLoading = false;
    });
  return responseList;
};

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
