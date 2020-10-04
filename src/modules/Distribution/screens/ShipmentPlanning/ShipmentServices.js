import {
  api_get_vehicle_provider,
  api_get_vehicle_capacity,
  api_post_shipment_data,
  api_get_shipment_planning_data,
  api_get_ship_point_permission_by_user,
  api_get_drivers_data,
  server_api_base_url,
  api_get_Supplier_list,
} from '../../DistributionConfig.json';
import Axios from 'axios';
import {
  getUserEmail,
  getUnit,
  getUserId,
} from '../../../Sales/service/auth/AuthService';
import { getUnitId } from '../../../User/util/AuthData';

export async function getVehicleProviderData() {
  let Unit = await getUnit();
  let url = `${api_get_vehicle_provider}?intUnitID=${Unit}`;

  let data = [];
  if (url.length !== 0) {
    return await Axios.get(url).then((res) => {

      return res.data;
    });
  }

  return data;
}

/**
 * getVehicleCapacityData()
 *
 * @return
 */
export async function getVehicleCapacityData() {
  let Unit = await getUnit();
  let url = `${api_get_vehicle_capacity}?intUnitID=${Unit}`;

  let data = [];
  if (url.length !== 0) {
    await Axios.get(url).then((res) => {
      data = res.data;
    });
  }

  return data;
}

export async function getVehicleData(value, vehicleCapacity) {

  let url = '';
  let intUnitID = await getUnit();
  if (value.strText == 'Company') {
    url = `http://api2.akij.net:8066/GetDataForShippingPlaningByVehicleTypeID?intUnitID=${intUnitID}&intvhcleTypeid=${vehicleCapacity.intid}`;
  } else if (value.strText == 'Customer') {
    url = `http://api2.akij.net:8066/GetDataForShippingPlaningBySupplierVehicleTypeID?intUnitID=${intUnitID}&intvhcleTypeid=${vehicleCapacity.intid}`;
  } else if (value.strText == 'Supplier') {
    url = `http://api2.akij.net:8066/GetDataForShippingPlaningByCustomerVehicleTypeID?intUnitID=${intUnitID}&intvhcleTypeid=${vehicleCapacity.intid}`;
  }
  // let url = `${api_get_vehicle_data}?intUnitID=${Unit}`;

  let data = [];
  if (url.length !== 0) {
    await Axios.get(url).then((res) => {

      data = res.data;
    });
  }

  return data;
}

export async function getShipmentDataByVehicleId(value, intvhcleid) {

  let intUnitID = await getUnit();
  let url = '';
  if (value.strText === 'Company') {
    url = `http://api2.akij.net:8066/api/DataForShippingPlaningByVehicleID/GetDataForShippingPlaningByCompanyVehicleID?intUnitID=${intUnitID}&intvhcleid=${intvhcleid.intID}`;
  } else if (value.strText === 'Customer') {
    url = `http://api2.akij.net:8066/api/DataForShippingPlaningByVehicleID/GetDataForShippingPlaningByCustomerVehicleID?intUnitID=${intUnitID}&intvhcleid=${intvhcleid.intID}`;
  } else if (value.strText === 'Supplier') {
    url = `http://api2.akij.net:8066/api/DataForShippingPlaningByVehicleID/GetDataForShippingPlaningBySupplierVehicleID?intUnitID=${intUnitID}&intvhcleid=${intvhcleid.intID}`;
  }

  let data = [];
  if (url.length !== 0) {
    await Axios.get(url).then((res) => {

      data = res.data;
    });
  }

  return data;
}

export const getDataVehicleTypeVsVehicleList = async (intCapacityId) => {
  let intUnitID = await getUnit();
  let responseList = {
    isLoading: true,
    data: {},
  };
  await Axios.get(
    `http://iapps.akij.net/asll/public/api/v1/sales/getDataVehicleTypeVsVehicleList?intUnitID=${intUnitID}&intTypeId=${intCapacityId}`,
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
export const getDataVehicleInformation = async (intVehicleId) => {
  let intUnitID = await getUnit();
  let responseList = {
    isLoading: true,
    data: {},
  };
  await Axios.get(
    `http://iapps.akij.net/asll/public/api/v1/sales/getDataVehicleInformation?intID=${intVehicleId}&intUnitID=${intUnitID}`,
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

export async function getDriversData() {
  let Unit = await getUnit();
  let url = `${api_get_drivers_data}?intUnitID=${Unit}`;

  let data = [];
  if (url.length !== 0) {
    await Axios.get(url).then((res) => {
      data = res.data;
    });
  }

  return data;
}

export async function getOrderData(intShipmentRequestID) {
  let intUnitID = await getUnit();
  let intInsertBy = await getUserId();
  let url = `http://api2.akij.net:8066/api/DataForShippingPlaning/GetShipmentPlanningData`;

  let data = [];
  if (url.length !== 0) {
    await Axios.get(url).then((res) => {
      data = res.data;
    });
  }

  return data;
}

export async function getShipmentPlanningData() {
  let Unit = await getUnit();
  let intEnroll = await getUserId();
  let url = `${server_api_base_url}/shipment-planning/shipmentPlanningListByUserId?intEmployeeId=${intEnroll}`;

  let data = [];
  if (api_get_shipment_planning_data.length !== 0) {
    await Axios.get(url).then((res) => {

      data = res.data.data;
    });
  }

  return data;
}

export async function getShipPointByUser() {
  let intUnitId = await getUnit();
  let intUserId = await getUserId();
  let url = `${api_get_ship_point_permission_by_user}?intUserId=${intUserId}&intUnitId=${intUnitId}`;

  let data = [];
  if (api_get_ship_point_permission_by_user.length !== 0) {
    await Axios.get(url).then((res) => {
      data = res.data;
    });
  }

  return data;
}

export async function getRequisitionsForAssign() {
  let intUserId = await getUserId();
  let url = `${server_api_base_url}/shipment-planning/shipmentPlanningListByShipPointId?intEmployeeId=${intUserId}`;
  // console.log('url getRequisitionsForAssign ', url);

  let data = [];
  if (api_get_ship_point_permission_by_user.length !== 0) {
    await Axios.get(url)
      .then((res) => {
        data = res.data.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return data;
}
export async function getProfileByEnrollandUnitId() {
  let intUnitId = await getUnitId();

  let url = `http://iapps.akij.net/asll/public/api/v1/hr/getProfileByEnrollandUnitId?intUnitId=${intUnitId}`;
  let data = [];
  await Axios.get(url)
    .then((res) => {
      data = res.data.data;
    })
    .catch((error) => {
      console.log(error);
    });

  return data;
}

export async function getTransportProviderData() {
  // let Unit = await getUnit();
  let intShipmentId = 0;
  let intSupplierID = await getUserId();
  let url = `http://172.17.17.25:8067/api/TransportProviderData/GetGetTransportProviderDataMain?intShipmentId=${intShipmentId}&intSupplierID=${intSupplierID}`;

  let data = [];
  if (url.length !== 0) {
    await Axios.get(url).then((res) => {
      data = res.data;
    });
  }

  return data;
}

export async function getRequisitionPlanningData(dteFromdate, dteTodate) {
  let intUnitID = await getUnit();
  let email = await getUserEmail();
  let url = `http://api2.akij.net:8066/api/DataForRequisitionNPlanning/GetDataForRequisitionNPlanning?intUnitID=${intUnitID}&dteFromdate=${dteFromdate}&dteTodate=${dteTodate}&email=${email}`;

  let data = [];
  if (url.length !== 0) {
    await Axios.get(url).then((res) => {
      data = res.data;
    });
  }
  return data;
}

export async function postShipmentData(entryData, orders) {
  let UnitId = await getUnit();
  let intEnroll = await getUserId();
  let ysnConfirmed = entryData.strVehicleType;
  let vehicleId = entryData.vehicleSelected.intID;

  if (vehicleId === 0) {
    vehicleId = 4;
  }

  if (ysnConfirmed == 'Open') {
    ysnConfirmed = true;
  } else {
    ysnConfirmed = false;
  }
  let url = `${api_post_shipment_data}?intUnitId=${UnitId}&dteScheduledTime=${entryData.dteRequestDateTime}&intInsertBy=${intEnroll}&strVechicleProviderType=${entryData.selectedProvaider.intid}&strVehicleCapacity=${entryData.strVehicleCapacity.intid}&strLastDestination=${entryData.strLastDestination}&intVehicleId=${vehicleId}&intDriverId=${entryData.intDriverEnroll}&ysnConfirmed=${ysnConfirmed}`;
  const headers = {
    'Content-Type': 'application/json',
  };
  let data = '';
  if (api_post_shipment_data.length !== 0) {
    await Axios.post(url, orders, { headers: headers })
      .then((res) => {
        data = res.data;
      })
      .catch((err) => {
        console.log('postOrderData', err);
      });
  }

  return data;
}

export async function postShipmentAssigntoData(orders, intAssignedUserId) {
  let intUserId = await getUserId();

  let url = `${server_api_base_url}/shipment-planning/assignShipmentPlanningToUser?intEmployeeId=${intUserId}&intAssignedUserId=${intAssignedUserId}`;

  const headers = {
    'Content-Type': 'application/json',
  };
  const requisitionsData = {
    requisitions: orders,
  };


  let data = '';
  if (api_post_shipment_data.length !== 0) {
    await Axios.post(url, requisitionsData, { headers: headers })
      .then((res) => {
        data = res.data;
      })
      .catch((err) => {

      });
  }

  return data;
}
export async function getTransportProviderList() {
  let intUnitId = await getUnit();
  let intUserId = await getUserId();
  let url = `${api_get_ship_point_permission_by_user}?intUserId=${intUserId}&intUnitId=${intUnitId}`;

  let data = [];
  if (api_get_ship_point_permission_by_user.length !== 0) {
    await Axios.get(url).then((res) => {
      data = res.data;
    });
  }

  return data;
}

export async function getSupplierListForBridge() {
  let intUnitId = await getUnit();
  let url = `http://10.23.22.218:8000/public/api/v1/supplier/getSupplierListForBridgeToTerritory?intUnitId=${intUnitId}`;

  let data = [];
  if (api_get_Supplier_list.length !== 0) {
    await Axios.get(url)
      .then((res) => {

        data = res.data;
      })
      .catch((err) => {
        console.log('postOrderData', err);
      });
  }

  return data;
}

export async function getTerritoryList() {
  let intUnitId = await getUnit();
  let intUserId = await getUserId();
  let url = `${api_get_Territory_list}?intUnitId=${intUnitId}`;

  let data = [];
  if (api_get_Territory_list.length !== 0) {
    await Axios.get(url).then((res) => {
      data = res.data;
    });
  }

  return data;
}
