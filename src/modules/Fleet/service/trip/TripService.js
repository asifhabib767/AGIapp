import {api_get_driver, api_get_vehicle, api_get_item} from '../../config.json';
import {getToken} from '../tokens/TokenService';
import Axios from 'axios';
import {
  getUserEmail,
  getUnit,
  getEmployeeID,
  getJobStationID,
  getShippingPointId,
} from '../auth/AuthService.js';
import {getFormattedCurrentDate} from '../../Util/DateConfigure';
import AsyncStorage from '@react-native-community/async-storage';

import {Alert} from 'react-native';
import {Actions} from 'react-native-router-flux';

export async function createActivity(
  name,
  showTime,
  showDate,
  note,
  images,
  outlet,
) {
  // console.log(name,showTime,showDate,note,images);
  let userData = (await AsyncStorage.getItem('userData')) || 'none';
  let dataParse = JSON.parse(userData);
  let email = await getUserEmail();
  let unitId = await getUnit();
  let employeeId = await getEmployeeID();
  let outletId = outlet.intOutletID;
  let outletname = outlet.strOutletName;
  // let headersData = {'Authorization': `bearer`};
  const {strEmployeeCode, intEmployeeId} = dataParse;

  const headersData = {
    Authorization: `bearer`,
    Accept: 'application/json',
    'Content-Type': 'text/plain',
  };

  //let url = `${api_post_agenda}?intOutletID=2&strOutletName=home&strAgendaName=${name}&strDiscussionTitle=${title}&tmTime=${showTime}&dteDate=${showDate}&strPriority=${priority}&strNote=${note}&intInsertBy=392407&intUnitID=91`;
  let url = `${api_post_activity}?intOutletID=${outletId}&strOutletName=${outletname}&strActivityName=${name}&tmTime=${showTime}&dteDate=${showDate}&strNote=${note}&strActivityImagePath=${images}&intInsertBy=${employeeId}&intUnitID=${unitId}`;
  let activityPost = await Axios.post(url, {}, {headers: headersData})

    .then(function (response) {
      let activity = response.data;
      if (activity.length != 0) {
        Alert.alert('Success', 'Activity Added !');
        Actions.ActivityList({page: 'Requisition'});
        return response.data;
      } else {
        // Alert.alert('Error', 'Please fill all the data and try again !');
      }
    })
    .catch(function (error) {});

  return activityPost;
}

export async function getDriverList() {
  let data = [];

  let unitId = await getUnit();

  try {
    let headersData = {
      Authorization: `bearer`,
      'Content-Type': 'application/json',
    };

    let url = `http://api2.akij.net:8066/api/DataForShippingPlaning/GetDriverList?intUnitID=${unitId}`;

    if (api_get_driver.length !== 0) {
      await Axios.get(`${url}`, {headers: headersData})

        .then(function (response) {
          data = response.data;
          return data;
        })
        .catch(function (error) {});
    }
  } catch (error) {
    data = [];
  }
  return data;
}

export async function getVehicleList() {
  let data = [];

  let date = await getFormattedCurrentDate();
  let intUnitid = await getUnit();

  let intShippingpointid = await getShippingPointId();

  try {
    let headersData = {
      Authorization: `bearer 123`,
      'Content-Type': 'application/json',
    };

    let url = `http://api2.akij.net:8066/api/DataForShippingVheicleReports/GetDataForVheicleList?dteFromDate=2020-07-01&dteToDate=2020-08-01&intUnitid=${intUnitid}&intShippingpointid=${intShippingpointid}`;

    if (api_get_vehicle.length !== 0) {
      await Axios.get(`${url}`, {headers: headersData})

        .then(function (response) {
          data = response.data;
          console.log('response :>> ', response);
          return data;
        })
        .catch(function (error) {});
    }
  } catch (error) {
    console.log('error vehicle', error);
    data = [];
  }
  return data;
}

export async function getItemList() {
  let data = [];

  let date = await getFormattedCurrentDate();
  let intUnitid = await getUnit();
  let intShippingpointid = await getShippingPointId();

  try {
    let headersData = {
      Authorization: `bearer`,
      'Content-Type': 'application/json',
    };

    let url = `http://api2.akij.net:8066/api/DataForShippingVheicleReports/GetDataForItemList?dteFromDate=2020-06-02&dteToDate=2020-07-02&intUnitid=${intUnitid}&intShippingpointid=${intShippingpointid}`;

    if (api_get_item.length !== 0) {
      await Axios.get(`${url}`, {headers: headersData})

        .then(function (response) {
          data = response.data;
          return data;
        })
        .catch(function (error) {});
    }
  } catch (error) {
    data = [];
  }
  return data;
}

export async function addTrip(tripData) {
  let postData = [
    {
      dteDate: await getFormattedCurrentDate(),
      intUserId: await getEmployeeID(),
      intUnitId: await getUnit(),
      intVehicleID: tripData.vehicleId,
      strVehicleRegNo: tripData.vehicleRegNo,
      strDriver: tripData.driverName,
      intShipPointId: await getShippingPointId(),
      ysnOwn: tripData.ysn,
      strHelperName: tripData.helperName,
      intDriverEnroll: tripData.driverEnroll,
      intitemid: tripData.itemId,
      decqnt: tripData.quantity,
      strnarraton: tripData.narration,
    },
  ];

  const headers = {
    'Content-Type': 'application/json',
  };

  let url = `http://api2.akij.net:8066/api/PostTripCreate/PostTripCreation`;
  let tripPost = await Axios.post(url, postData, {headers: headers})

    .then(function (response) {
      if (response.status === 200) {
        Alert.alert('ধন্যবাদ', 'ট্রিপটি এন্ট্রি হয়েছে !');
        // Actions.dashboard();

        return response.status;
      } else {
        alert('Unsuccessful! Please try again.');
        // Actions.TripAddScreen();
      }
    })
    .catch(function (error) {
      console.log('error data:>> ', error);
    });

  return tripPost;
}

export async function getWorkingCenterList() {
  let data = [];

  let intUnitid = await getUnit();
  // let intShippingpointid = await getShippingPointId();
  let url = `http://api2.akij.net:8066/api/DataForShippingVheicleReports/GetDataForWorkCenterList?dteFromDate=2020-01-01&dteToDate=2020-07-30&intUnitid=${intUnitid}`;

  try {
    await Axios.get(`${url}`)
      .then(function (response) {
        data = response.data;
        console.log('w-l', data);
        return data;
      })
      .catch(function (error) {
        console.log('error working center', error);
        console.log('url', error);
      });
  } catch (error) {
    data = [];
  }
  return data;
}

export async function getWorkingCenterStatusByTrip(tripID) {
  let data = [];
  //
  let intUnitid = await getUnit();
  // let intShippingpointid = await getShippingPointId();
  let url = `http://api2.akij.net:8066/GetDataForShipCurrentStatus?dteFromDate=2020-07-01&dteToDate=2020-07-31&intUnitid=${intUnitid}&intShippingpointid=1&intVheicleid=1&intTripID=${tripID}`;

  try {
    await Axios.get(`${url}`)
      .then(function (response) {
        data = response.data;
        return data;
      })
      .catch(function (error) {
        console.log('err', error);
      });
  } catch (error) {
    data = [];
  }
  return data;
}

export async function updateShipmentLoadingDischargeStatus(state, item, code) {
  let data = [];

  let intPKID = state.singleConfirmItem.intId;
  let intUnitid = 4;
  let strPhone = '0';

  const postBody = [
    {
      intTripID: item.intTripId,
      intVehicleID: item.intVehicleId,
      intShopID: state.singleConfirmItem.intDisPointId,
      intUnitID: intUnitid,
      strChalalnNo: state.singleConfirmItem.strCode,
      intPKID: state.singleConfirmItem.intId,
    },
  ];

  let url = `http://api2.akij.net:8066/api/VehicleTrackingConfirmationByCustomer/PostVehicleTrackingConfirmationByCustomer?intPKID=${intPKID}&intUnitid=${intUnitid}&strPhone=${strPhone}`;
  if (url.length !== 0) {
    return await Axios.post(url, postBody)
      .then((res) => {
        data = res.data;
        if (data.length > 0) {
          return true;
        }
        return false;
      })
      .catch((error) => {
        return false;
      });
    return data;
  }
}
