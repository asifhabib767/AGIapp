import {
  api_retailers,
  api_get_distributor,
  api_distributor_balance,
  api_customer_types,
  api_get_distributor_list,
  api_get_customer_type,
  api_get_distributor_new_list,
} from '../../SalesConfig.json';
import {getToken} from '../tokens/TokenService';
import Axios from 'axios';
import {getUserEmail} from '../auth/AuthService.js';
import {getUnitId} from '../../../User/util/AuthData';

/**
 * getDistributor()
 *
 * Get Distributor list of that assigned Sales Officer
 * @param int distributorID -> If want to see the retailers of that distributor
 * @return array retailer list
 */

export async function getDistributor(distributorID = null) {
  let data = [];
  let email = await getUserEmail();
  //    alert(email);

  try {
    if (api_get_distributor_new_list.length !== 0) {
      await Axios.get(
        `${api_get_distributor_new_list}?mailAddress=${email}`,
      ).then((res) => {
        data = res.data;
        console.log('Distributors Data: ', data);
      });
    }
  } catch (error) {
    console.log('Error enter: ', error);
  }
  return data;
}
export async function getDistributorBalance(disPointId, date, unitID) {
  let data = [];
  unitID = await getUnitId();

  if (api_distributor_balance.length !== 0) {
    await Axios.get(api_distributor_balance, {
      params: {
        disPointId: disPointId,
        date: date,
        unitID: unitID,
        token: getToken(),
      },
    })
      .then((res) => {
        if (res.data.length > 0) {
          data = res.data[0];
        }
      })
      .catch(function (error) {
        console.log('Error happened...');
        console.log(error);
      });
  }

  return data;
}

/**
 * getCustomerTypes()
 *
 * @param {int} unitID
 */
export async function getCustomerTypes(unitID) {
  let data = [];
  const intUnitId = await getUnitId();

  console.log('Customer types enter');
  let url = `http://api1.akij.net:8055/api/CustomerType/GetCustomerTypesByQuery?query=intUnitId%3D${intUnitId}`;

  await Axios.get(url)
    // await Axios.get(api_get_customer_type + '?query=intUnitId=' + intUnitId)
    .then((res) => {
      data = res.data;
      console.log('Customer types data', data);
    })
    .catch(function (error) {
      console.log('Error happened...');
      console.log(error);
    });
  return data;
}

export async function getCustomerSalesTypeDetails(unitID) {
  let data = [];
  const intUnitId = await getUnitId();

  let url = `http://iapps.akij.net/asll/public/api/v1/sales/getDataForSalesType?intUnitId=${intUnitId}`;

  await Axios.get(url)
    // await Axios.get(api_get_customer_type + '?query=intUnitId=' + intUnitId)
    .then((res) => {
      data = res.data.data;
      console.log('Customer types data', data);
    })
    .catch(function (error) {
      console.log('Error happened...');
      console.log(error);
    });
  return data;
}

export async function getRetailersByDistributor(customerID) {
  // alert('Enter here ...');
  let data = [];
  if (api_retailers.length !== 0) {
    await Axios.get(api_retailers + '?query=intcustomerid=' + customerID)
      .then((res) => {
        data = res.data;
      })
      .catch(function (error) {
        console.log('Error happened...');
        console.log(error);
      });
  }
  return data;
}
