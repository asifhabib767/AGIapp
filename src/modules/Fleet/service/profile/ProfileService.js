import {
  api_get_agenda,
  api_post_profile_entry,
  api_get_profileType,
  api_post_profile_update,
} from '../../../config.json';
import {getToken} from '../tokens/TokenService';
import Axios from 'axios';
import {getUserEmail, getUnit, getEmployeeID} from '../auth/AuthService.js';
import AsyncStorage from '@react-native-community/async-storage';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {Actions} from 'react-native-router-flux';

export async function getProfilingHistory(outletId) {
  let intOutlet = outletId;

  let data = [];
  let headersData = {
    Authorization: `bearer ${await getToken()}`,
    'Content-Type': 'application/json',
  };

  let url = `${api_get_profileType}?intOutletID=${intOutlet}`;

  if (api_get_profileType.length !== 0) {
    await Axios.get(`${url}`, {headers: headersData})

      .then(function(response) {
        console.log('succss', response.data);
        data = response.data;
      })
      .catch(function(error) {
        console.log('error is', error);
        console.log('url', url);
        console.log('headersData', headersData);
      });
  }
  console.log('user data', data);
  return data;
}

export async function updateProfile(
  outletId,
  dataList,
  outletName,
  strProfileTypeDetailsName,
) {
  let outlet = outletId;
  let employeeId = await getEmployeeID();

  console.log('Details:', strProfileTypeDetailsName);
  let data = [];

  let headersData = {
    Authorization: `bearer ${await getToken()}`,
    'Content-Type': 'application/json',
  };

  let intOutletProfileEntryID = dataList.intOutletProfileEntryID;
  let strOutletName = dataList.strOutletName;
  let intProfileTypeID = dataList.intProfileTypeID;
  let strProfileType = dataList.strProfileType;
  let intProfileTypeDetailsID = dataList.intProfileTypeDetailsID;
  let strProfileTypeDetails = dataList.strProfileTypeDetails;
  let strControlName = dataList.strControlName;

  console.log(
    'id:',
    'id',
    intOutletProfileEntryID,
    'name:',
    strOutletName,
    'intProfileTypeID:',
    intProfileTypeID,
    'strProfileType:',
    strProfileType,
    'intProfileTypeDetailsID:',
    intProfileTypeDetailsID,
    'strProfileTypeDetails:',
    strProfileTypeDetails,
  );

  let url = `${api_post_profile_update}?intOutletProfileEntryID=${intOutletProfileEntryID}&strOutletName=${strOutletName}&intProfileTypeID=${intProfileTypeID}&strProfileType=${strProfileType}&intProfileTypeDetailsID=${intProfileTypeDetailsID}&strProfileTypeDetails=${strProfileTypeDetailsName}&intInsertBy=${employeeId}`;

  if (api_post_profile_update.length !== 0) {
    await Axios.post(`${url}`, {headers: headersData})
      .then(function(response) {
        console.log('succss', response.data);
        data = response.data;
        return data;
      })
      .catch(function(error) {
        console.log('error is', error);
        console.log('url', url);
        console.log('headersData', headersData);
      });
  }
  console.log('user data', data);
  return data;
}

export async function submitProfileEntry(entries) {
  let data = [];
  console.log('Entries', entries);

  let headersData = {
    Authorization: `bearer ${await getToken()}`,
    'Content-Type': 'application/json',
  };

  for (let i = 0; i < entries.length; i++) {
    const item = entries[i];

    let url = `${api_post_profile_entry}?intOutletID=${item.intOutletID}&strOutletName=${item.strOutletName}&intProfileTypeID=${item.intProfileTypeID}&strProfileType=${item.strProfileType}&intProfileTypeDetailsID=${item.intProfileTypeDetailsID}&strProfileTypeDetails=${item.strProfileTypeDetails}&intInsertBy=${item.intInsertBy}`;

    await Axios.post(`${url}`, {}, {headers: headersData})
      .then(function(response) {
        console.log('succss data: ', response.data);
        data = response.data;
      })
      .catch(function(error) {
        console.log('error is', error);
        console.log('url', url);
        console.log('headersData', headersData);
      });
  }
  if (data.length > 0) {
    return true;
  }
  return false;
}
