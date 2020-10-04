import {getToken} from '../../service/tokens/TokenService';
import Axios from 'axios';
import {getUnit, getEmployeeID} from '../auth/AuthService';
import {getUnitId} from '../../../User/util/AuthData';
import {getFormattedCurrentDate} from '../../../Master/Util/DateConfigure';
// import { ap_get_totaltrip } from '../../../config.json';
export async function getGrandTotalTrip() {
  let data = [];

  let intPartid = 6;
  let intUnitid = 4;
  // let intUnitid = await getUnit();
  let dteFromdate = '2020-06-01';
  let dteTodate = '2020-06-12';
  let intshippointid = 15;
  let intenrol = await getEmployeeID();
  // let intenrol = 254670;
  let intTripid = 0;
  let url = `http://api2.akij.net:8066/api/DataforVehicleTrackingInfo/GetDataforGrantotalTrip?intPartid=${intPartid}&intUnitid=${intUnitid}&dteFromdate=${dteFromdate}&dteTodate=${dteTodate}&intshippointid=${intshippointid}&intenrol=${intenrol}&intTripid=${intTripid}`;
  // console.log('url', url);
  if (url.length !== 0) {
    await Axios.get(url, {})
      .then((res) => {
        data = res.data;
        // console.log('res chk', res);
      })
      .catch((error) => {
        console.log(error);
      });
    return data;
  }
}

export async function getCurrentStatusNTripPending() {
  let data = [];

  let intPartid = 1;
  let intUnitid = await getUnitId();
  let dteFromdate = '2020-06-01';
  let dteTodate = getFormattedCurrentDate();
  let intshippointid = 15;
  let intenrol = await getEmployeeID();
  let intTripid = 0;
  let url = `http://api2.akij.net:8066/api/DataforVehicleTrackingInfo/GetDataforVehicleTrackingInfo?intPartid=${intPartid}&intUnitid=${intUnitid}&dteFromdate=${dteFromdate}&dteTodate=${dteTodate}&intshippointid=${intshippointid}&intenrol=${intenrol}&intTripid=${intTripid}`;
  if (url.length !== 0) {
    await Axios.get(url, {})
      .then((res) => {
        data = res.data;
      })
      .catch((error) => {
        // console.log(error);
      });
    return data;
  }
}

export async function getSingleTripDetaills(intTripid) {
  let data = [];

  let intPartid = 5;
  let intUnitid = 4;
  let dteFromdate = '2020-06-01';
  let dteTodate = '2020-06-12';
  let intshippointid = 15;
  // let intenrol = await getEmployeeID();
  let intenrol = 254670;
  // let intTripid = 0;
  let url = `http://api2.akij.net:8066/api/DataforVehicleTrackingInfo/GetDataforSingleTrip?intPartid=${intPartid}&intUnitid=${intUnitid}&dteFromdate=${dteFromdate}&dteTodate=${dteTodate}&intshippointid=${intshippointid}&intenrol=${intenrol}&intTripid=${intTripid}`;
  // console.log('url', url);
  if (url.length !== 0) {
    await Axios.get(url, {})
      .then((res) => {
        data = res.data;
        // console.log('res chk', res);
      })
      .catch((error) => {
        // console.log(error);
      });
    return data;
  }
}

export async function getMaxDistanceNTime(intTripid) {
  let data = [];

  let intPartid = 7;
  let intUnitid = 4;
  let dteFromdate = '2020-06-01';
  let dteTodate = '2020-06-12';
  let intshippointid = 15;
  // let intenrol = await getEmployeeID();
  let intenrol = 254670;
  // let intTripid = 0;
  let url = `http://api2.akij.net:8066/api/DataforVehicleTrackingInfo/GetDataTripMaxdistanceNTime?intPartid=${intPartid}&intUnitid=${intUnitid}&dteFromdate=${dteFromdate}&dteTodate=${dteTodate}&intshippointid=${intshippointid}&intenrol=${intenrol}&intTripid=${intTripid}`;

  if (url.length !== 0) {
    await Axios.get(url, {})
      .then((res) => {
        data = res.data;
      })
      .catch((error) => {
        console.log(error);
      });
    return data;
  }
}

export async function postsmsforchallan(intpkid, intunitid, strphone) {
  let data = [];
  let intunitids = 4;
  let strphonen = '0';
  let url = `http://api2.akij.net:8066/api/VehicleTrackingConfirmationByCustomer/PostVehicleTrackingConfirmationBySMS?intPKID=${intpkid}&intUnitid=${intunitids}&strPhone=${strphonen}`;
  if (url.length !== 0) {
    await Axios.post(url, {})
      .then((res) => {
        data = res.data;
      })
      .catch((error) => {
        // console.log(error);
      });
    return data;
  }
}

export async function postVerifyCustomerConfirmation(state, item, code) {
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

export async function getTotalTripCompleteByDriver() {
  // console.log('getMaxDistanceNTime', intTripid);
  let data = [];

  let intPartid = 4;
  let intUnitid = 4;
  let dteFromdate = '2020-06-01';
  let dteTodate = '2020-06-12';
  let intshippointid = 15;
  // let intenrol = await getEmployeeID();
  let intenrol = 395679;
  let intTripid = 0;
  let url = `http://api2.akij.net:8066/api/DataforVehicleTrackingInfo/GetDataforMonthvsTotalTrip?intPartid=${intPartid}&intUnitid=${intUnitid}&dteFromdate=${dteFromdate}&dteTodate=${dteTodate}&intshippointid=${intshippointid}&intenrol=${intenrol}&intTripid=${intTripid}`;

  if (url.length !== 0) {
    await Axios.get(url, {})
      .then((res) => {
        data = res.data;
      })
      .catch((error) => {
        console.log(error);
      });
    return data;
  }
}

export async function postTripConfirmationByPkid(intpkid) {
  // console.log('getMaxDistanceNTime', intTripid);
  let data = [];

  let intPartid = 1;
  let intUnitid = 4;
  let dteFromdate = '2020-06-01';
  let dteTodate = '2020-06-12';
  let intshippointid = 15;
  // let intenrol = await getEmployeeID();
  let intenrol = 395679;
  let intTripid = 0;
  let url = `http://api2.akij.net:8066/api/DataforVehicleTrackingInfo/GetDataforMonthvsTotalTrip?intPartid=${intPartid}&intUnitid=${intUnitid}&dteFromdate=${dteFromdate}&dteTodate=${dteTodate}&intshippointid=${intshippointid}&intenrol=${intenrol}&intTripid=${intTripid}`;

  if (url.length !== 0) {
    await Axios.get(url, {})
      .then((res) => {
        data = res.data;
      })
      .catch((error) => {
        console.log(error);
      });
    return data;
  }
}

export async function GeDataForAppsUserIDNPasswdVerification(username, passwd) {
  // console.log('getMaxDistanceNTime', intTripid);
  let data = [];

  let intpart = 1;
  // let username="01732328504";
  // let passwd="01732328504"

  let url = `http://api2.akij.net:8066/api/DataForAppsUserIDNPasswdVerification/GeDataForAppsUserIDNPasswdVerification?intpart=${intpart}&username=${username}&passwd=${passwd}&intunitid=${intunitid}`;

  if (url.length !== 0) {
    await Axios.get(url, {})
      .then((res) => {
        data = res.data;
      })
      .catch((error) => {
        console.log(error);
      });
    return data;
  }
}

// http://172.17.17.25:8066/api/VehicleTrackingEntryAndUpdate/PostVehicleTrackingStartingEntry?intTripID=1013589

export async function postVehicleTrackingStarting(intTripId) {
  // console.log('getMaxDistanceNTime', intTripid);
  let data = [];

  let url = `http://api2.akij.net:8066/api/VehicleTrackingEntryAndUpdate/PostVehicleTrackingStartingEntry?intTripID=${intTripId}`;
  if (url.length !== 0) {
    await Axios.post(url, {})
      .then((res) => {
        data = res.data;
      })
      .catch((error) => {
        console.log(error);
      });
    return data;
  }
}

export async function checkTourStarted(intTripid) {
  let isStarted = false;
  let url = `http://api2.akij.net:8066/api/DataForVehicleTrackingTripStatus/GeDataForVehicleTrackingTripStatus?intTripId=${intTripid}`;

  await Axios.get(url, {})
    .then((res) => {
      const data = res.data;

      if (data.length > 0) {
        if (data[0].tripstatus == 0) {
          isStarted = false;
        } else {
          isStarted = true;
        }
      }
    })
    .catch((error) => {
      console.log('error here: ', error);
    });
  return isStarted;
}

export async function EntryCurrentData(intTripid, state, itemData) {
  let url = `http://api2.akij.net:8066/api/VehicleTrackingEntryAndUpdate/PostVehicleTrackingLatitudeNLongitudeEntry?intTripID=${intTripid}`;

  const postData = [
    {
      intVehicleID: itemData.intVehicleId,
      dteInsertionTime: '2020-06-15T03:56:40.390Z',
      decLatitude: state.lat,
      decLongitude: state.long,
      intZAxis: 12,
      strLocation: state.currentAddress.long_name,
      strFullLocation: JSON.stringify(state.fullLocation),
      decSpeed: 0,
      decDistance: 0,
      intUnitID: 4,
    },
  ];

  await Axios.post(url, postData)
    .then((res) => {
      const data = res.data;
    })
    .catch((error) => {
      console.log('error creating new entry: ', error);
    });
}
