import {
  api_get_shipment_open_request_Det,
  api_post_transport_provider_vehicle,
  api_get_shipment_open_request,
  api_post_providerbill_entry,
} from '../../SupplierConfig.json';

import {getUserEmail, getUnitId, getUserId} from '../../../User/util/AuthData';
import Axios from 'axios';
import {exp} from 'react-native-reanimated';

/**
 * getOutletsByUnit()
 *
 * Get All Outlets by it's unit
 */

export async function getShipmentOpenRequest() {
  let data = [];
  let intShipmentId = 0;
  let intSupplierID = await getUserId();
  // let headersData = {'Authorization': `bearer ${await getToken()}`};
  // let url = api_get_shipment_open_request;
  let url = `http://api2.akij.net:8067/api/TransportProviderData/GetGetTransportProviderDataMain?intShipmentId=${intShipmentId}&intSupplierID=${intSupplierID}`;

  if (url.length !== 0) {
    await Axios.get(url, {})
      .then((res) => {
        console.log('res data shipment request', res);
        data = res.data;
      })
      .catch((error) => {
        console.log(error);
      });
    return data;
  }
}

export async function getShipmentOpenRequestDetaills(intShipmentId) {
  let intSupplierID = await getUserId();
  let data = [];
  // let headersData = {'Authorization': `bearer ${await getToken()}`};
  let url = `http://api2.akij.net:8067/api/TransportProviderData/GetGetTransportProviderDataDetails?intShipmentId=${intShipmentId}&intSupplierID=${intSupplierID}`;

  if (url.length !== 0) {
    // await Axios.get(url, {headers: headersData})
    await Axios.get(url, {})
      .then((res) => {
        data = res.data;
        console.log('shipmentResponse', res);
      })
      .catch((error) => {
        console.log(error);
      });
    return data;
  }
}

export async function getTransportProviderVehicleList() {
  let intSupplierID = await getUserId();
  let data = [];
  // let headersData = {'Authorization': `bearer ${await getToken()}`};
  // let url = `http://api2.akij.net:8066/api/DataForShippingPlaning/GetVehicleData?intUnitID=${intUnitID}`;

  let url = `http://api2.akij.net:8067/api/TransportProviderDropDown/GetDataForTransportProviderVehicleList?intSupplierID=${intSupplierID}`;

  if (url.length !== 0) {
    await Axios.get(url, {})
      // await Axios.get(url, {headers: headersData})
      .then((res) => {
        console.log('ResponseData', res);
        data = res.data;
      })
      .catch((error) => {
        console.log('Error', error);
      });
    return data;
  }
}

export async function getTransportProviderDriverList() {
  let intSupplierID = await getUserId();
  let data = [];
  // let headersData = {'Authorization': `bearer ${await getToken()}`};
  // let url = `http://api2.akij.net:8066/api/DataForShippingPlaning/GetDriverList?intUnitID=${intUnitID}`;
  let url = `http://api2.akij.net:8067/api/TransportProviderDropDown/GetDataForTransportProviderDriverList?intSupplierID=${intSupplierID}`;

  if (url.length !== 0) {
    await Axios.get(url, {})
      // await Axios.get(url, {headers: headersData})
      .then((res) => {
        data = res.data;
      })
      .catch((error) => {
        console.log(error);
      });
    return data;
  }
}

export async function postTransportProvider(
  intShipmentId,
  intVehicleID,
  intDriverID,
) {
  let intProviderId = await getUserId();

  let data = [];
  // let headersData = {'Authorization': `bearer ${await getToken()}`};
  let url = `http://api2.akij.net:8067/api/TransportProviderEntry/TransportProviderEntrysByVendor?intProviderId=${intProviderId}&intShipmentId=${intShipmentId}&intVehicleID=${intVehicleID}&intDriverID=${intDriverID}`;

  if (url.length !== 0) {
    await Axios.post(url, {})
      // await Axios.get(url, {headers: headersData})
      .then((res) => {
        data = res.data;
      })
      .catch((error) => {
        console.log('errorData', error);
        console.log(error);
      });
    return data;
  }
}

export async function postDriverAdd(
  strPhoneNo,
  strDriverName,
  strDrivingLicence,
  strDriverImagePath,
  strLicenceImagePath,
) {
  let strDriverImagePath1 = await getUserId();

  let data = [];
  // let headersData = {'Authorization': `bearer ${await getToken()}`};
  // let url = `http://api2.akij.net:8067/api/TransportProviderEntry/TransportProviderEntrysByVendor?intProviderId=${intProviderId}&intShipmentId=${intShipmentId}`;

  let url = `http://api2.akij.net:8067/api/DriverInsertActivity/DriverInsertActivity?strPhoneNo=${strPhoneNo}&strDriverName=${strDriverName}&strDrivingLicence=${strDrivingLicence}&strDriverImagePath=${strDriverImagePath1}&strLicenceImagePath=${strLicenceImagePath}`;

  if (url.length !== 0) {
    await Axios.post(url, {})
      // await Axios.get(url, {headers: headersData})
      .then((res) => {
        data = res.data;
      })
      .catch((error) => {
        console.log(error);
      });
    return data;
  }
}
export async function driverUpdate(
  strPhoneNo,
  strDriverName,
  strDrivingLicence,
  strDriverImagePath,
  strLicenceImagePath,
  intDriverId,
) {
  let intProviderId = await getUserId();

  let data = [];
  // let headersData = {'Authorization': `bearer ${await getToken()}`};
  // let url = `http://api2.akij.net:8067/api/TransportProviderEntry/TransportProviderEntrysByVendor?intProviderId=${intProviderId}&intShipmentId=${intShipmentId}`;

  // let url = `http://api2.akij.net:8067/api/DriverInsertActivity/DriverInsertActivity?strPhoneNo=${strPhoneNo}&strDriverName=${strDriverName}&strDrivingLicence=${strDrivingLicence}&strDriverImagePath=${strDriverImagePath1}&strLicenceImagePath=${strLicenceImagePath}`;

  let url = `http://iapps.akij.net/asll/public/api/v1/logistic/driver/update`;

  let updateData = {
    intDriverId: intDriverId,
    strPhoneNo: strPhoneNo,
    strDriverName: strDriverName,
    strDrivingLicence: strDrivingLicence,
    strLicenceImagePath: strLicenceImagePath,
    ysnAppregistration: 1,
    ysnActive: 1,
    intSupplierID: intProviderId,
  };

  if (url.length !== 0) {
    await Axios.put(url, updateData, {})
      // await Axios.get(url, {headers: headersData})
      .then((res) => {
        console.log('res', res);
        data = res.data;
      })
      .catch((error) => {
        console.log(error);
      });
    return data;
  }
}

export async function postVehicleAdd(
  strFullRegistrationNo,
  intVehicleClassId,
  MetroCity,
  Identifier,
  SerialNo,
  Registration,
  strOwnerName,
  strOwnerContact,
  intCapacityCFT,
  intFuelUsedType,
  intUnladenWeightKg,
  intMaxLadenWeightKg,
  strCapacity,
) {
  let suplierid = await getUserId();

  let data = [];

  let url = `http://api2.akij.net:8067/api/TransportProviderEntry/VehicleEntry?strFullRegistrationNo=${strFullRegistrationNo}&intVehicleClassId=${intVehicleClassId}&MetroCity=${MetroCity}&Identifier=${Identifier}&SerialNo=${SerialNo}&Registration=${Registration}&strOwnerName=${strOwnerName}&strOwnerContact=${strOwnerContact}&intCapacityCFT=${intCapacityCFT}&intFuelUsedType=${intFuelUsedType}&intUnladenWeightKg=${intUnladenWeightKg}&intMaxLadenWeightKg=${intMaxLadenWeightKg}&strCapacity=${strCapacity}&intSupplierID=${suplierid}`;

  if (url.length !== 0) {
    await Axios.post(url, {})
      // await Axios.get(url, {headers: headersData})
      .then((res) => {
        data = res.data;
      })
      .catch((error) => {
        console.log(error);
      });
    return data;
  }
}

export async function getSupplieridvsDriverList() {
  let intProviderId = await getUserId();
  let data = [];
  // let headersData = {'Authorization': `bearer ${await getToken()}`};
  // let url = `http://api2.akij.net:8067/api/TransportProviderDropDown/GetDataForTransportProviderDriverList?intSupplierID=${intProviderId}`;
  let url = `http://iapps.akij.net/asll/public/api/v1/logistic/driver?intSupplierID=${intProviderId}`;

  console.log('url', url);

  if (url.length !== 0) {
    await Axios.get(url, {})
      // await Axios.get(url, {headers: headersData})
      .then((res) => {
        console.log('res', res);
        data = res.data;
      })
      .catch((error) => {
        console.log(error);
      });
    return data;
  }
}

export async function getSupplieridvsVehicleList() {
  let intProviderId = await getUserId();

  console.log('intProviderId', intProviderId);
  let data = [];
  // let headersData = {'Authorization': `bearer ${await getToken()}`};
  // let url = `http://api2.akij.net:8067/api/TransportProviderDropDown/GetDataForTransportProviderVehicleList?intSupplierID=${intProviderId}`;
  let url = `http://iapps.akij.net/asll/public/api/v1/logistic/vehicle?intSupplierID=${intProviderId}`;

  if (url.length !== 0) {
    await Axios.get(url, {})
      // await Axios.get(url, {headers: headersData})
      .then((res) => {
        data = res.data;
      })
      .catch((error) => {
        console.log(error);
      });
    return data;
  }
}

export async function getRequestAcceptedByTransportProvider(
  dteFromdate,
  dteTodate,
) {
  let intProviderId = await getUserId();
  console.log('intProviderId', intProviderId);
  let data = [];
  // let headersData = {'Authorization': `bearer ${await getToken()}`};
  let url = `http://api2.akij.net:8067/api/TransportProviderData/GetTransportProviderReports?intProviderID=${intProviderId}&dtefromdate=${dteFromdate}&dtetodate=${dteTodate}`;

  if (url.length !== 0) {
    await Axios.get(url, {})
      // await Axios.get(url, {headers: headersData})
      .then((res) => {
        data = res.data;
      })
      .catch((error) => {
        console.log(error);
      });
    return data;
  }
}

export async function postTransportProviderBill(entryData, orders) {
  let url = `${api_post_providerbill_entry}?intPart=${entryData.intPart}&intUnitId=${entryData.intUnitId}&intProviderId=${entryData.intProviderId}&fromdate=${entryData.fromdate}&todate=${entryData.todate}&strRemarks=${entryData.strRemarks}`;

  const headers = {
    'Content-Type': 'application/json',
  };

  let data = '';
  if (api_post_providerbill_entry.length !== 0) {
    await Axios.post(url, orders, {headers: headers})
      .then((res) => {
        data = res.data;
      })
      .catch((err) => {
        console.log('postOrderData', err);
      });
  }

  return data;
}

export async function getBillSubmittedByTransportProvider(
  dteFromdate,
  dteTodate,
) {
  let intProviderId = await getUserId();
  let intPart = 1;
  let unitid = await getUnitId();
  let data = [];
  // let headersData = {'Authorization': `bearer ${await getToken()}`};
  let url = `http://api2.akij.net:8067/api/TransportProviderSubmitBillReports/GetTransportProviderBillAprvPending?intproviderid=${intProviderId}&intunitid=${unitid}&dtefromdate=${dteFromdate}&dtetodate=${dteTodate}`;

  if (url.length !== 0) {
    await Axios.get(url, {})
      // await Axios.get(url, {headers: headersData})
      .then((res) => {
        data = res.data;
      })
      .catch((error) => {
        console.log(error);
      });
    return data;
  }
}

export async function getVehicleArea() {
  let intShipmentId = 0;
  let intSupplierID = await getUserId();
  let data = [];
  let url = `http://api2.akij.net:8067/api/TransportProviderData/GetVehicleArea?intShipmentId=${intShipmentId}&intSupplierID=${intSupplierID}`;

  if (url.length > 0) {
    await Axios.get(url, {})
      // await Axios.get(url, {headers: headersData})
      .then((res) => {
        data = res.data;
      })
      .catch((error) => {
        console.log(error);
      });
    return data;
  }
}

export async function getVehicleIdentityNumber() {
  let intShipmentId = 0;
  let intSupplierID = await getUserId();
  let data = [];
  let url = `http://api2.akij.net:8067/api/TransportProviderData/GetVehicleIdentityNumber?intShipmentId=${intShipmentId}&intSupplierID=${intSupplierID}`;

  if (url.length > 0) {
    await Axios.get(url, {})
      // await Axios.get(url, {headers: headersData})
      .then((res) => {
        data = res.data;
      })
      .catch((error) => {
        console.log(error);
      });
    return data;
  }
}

export async function getVehicleCapacity() {
  let intShipmentId = 0;
  let intSupplierID = await getUserId();
  let data = [];
  let url = `http://api2.akij.net:8067/api/TransportProviderData/GetVehicleCapacity?intShipmentId=${intShipmentId}&intSupplierID=${intSupplierID}`;

  if (url.length > 0) {
    await Axios.get(url, {})
      // await Axios.get(url, {headers: headersData})
      .then((res) => {
        data = res.data;
      })
      .catch((error) => {
        console.log(error);
      });
    return data;
  }
}

export async function getVehicleFuelType() {
  let intShipmentId = 0;
  let intSupplierID = await getUserId();
  let data = [];
  let url = `http://api2.akij.net:8067/api/TransportProviderData/GetVehicleFuelType?intShipmentId=${intShipmentId}&intSupplierID=${intSupplierID}`;

  if (url.length > 0) {
    await Axios.get(url, {})
      // await Axios.get(url, {headers: headersData})
      .then((res) => {
        data = res.data;
      })
      .catch((error) => {
        console.log(error);
      });
    return data;
  }
}

export async function getVehicleClass() {
  let intShipmentId = 0;
  let intSupplierID = await getUserId();
  let data = [];
  let url = `http://api2.akij.net:8067/api/TransportProviderData/GetVehicleClass?intShipmentId=${intShipmentId}&intSupplierID=${intSupplierID}`;

  if (url.length > 0) {
    await Axios.get(url, {})
      // await Axios.get(url, {headers: headersData})
      .then((res) => {
        data = res.data;
      })
      .catch((error) => {
        console.log(error);
      });
    return data;
  }
}

export async function getVehicleClassDigits() {
  let intShipmentId = 0;
  let intSupplierID = await getUserId();
  let data = [];
  let url = `http://api2.akij.net:8067/api/TransportProviderData/GetVehicleClassDigits?intShipmentId=${intShipmentId}&intSupplierID=${intSupplierID}`;

  console.log('getVehicleClassDigits', getVehicleClassDigits);

  if (url.length > 0) {
    await Axios.get(url, {})
      // await Axios.get(url, {headers: headersData})
      .then((res) => {
        data = res.data;
      })
      .catch((error) => {
        console.log(error);
      });
    return data;
  }
}

export async function getSingleShipmentOpenRequest(intshipmentid) {
  let data = [];

  let intSupplierID = await getUserId();
  // let headersData = {'Authorization': `bearer ${await getToken()}`};
  // let url = api_get_shipment_open_request;
  let url = `http://api2.akij.net:8067/api/TransportProviderData/GetSingleShipments?intShipmentId=${intshipmentid}&intSupplierID=${intSupplierID}`;

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

export async function updateTransportProviderEntry(
  intShipmentId,
  intVehicleID,
  intDriverID,
) {
  let data = [];
  let intProviderId = await getUserId();
  let strRemarks = 'NA';
  let url = `http://api2.akij.net:8067/api/TransportProviderData/TransportProviderEntryUpdate?intProviderId=${intProviderId}&intShipmentId=${intShipmentId}&intVehicleID=${intVehicleID}&intDriverID=${intDriverID}&strRemarks=${strRemarks}`;

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

export async function getSupplierAcceptedRequest() {
  let data = [];
  let intShipmentId = 0;
  let intSupplierID = await getUserId();
  // let headersData = {'Authorization': `bearer ${await getToken()}`};
  // let url = api_get_shipment_open_request;
  let url = `http://api2.akij.net:8067/api/TransportProviderData/GetTransportProviderAcceptedData?intShipmentId=${intShipmentId}&intSupplierID=${intSupplierID}`;

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
