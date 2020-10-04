import {
  api_sales_order_by_email,
  api_sales_order_create,
  api_get_customer,
} from '../../SalesConfig.json';
import {Alert} from 'react-native';
import {Actions} from 'react-native-router-flux';

import {getToken} from '../../service/tokens/TokenService';
import Axios from 'axios';
import {getUserEmail, getUnit} from '../../service/auth/AuthService';
import {getUserId, getUserTypeId} from '../../../User/util/AuthData';

export async function getsalesOrderList(ysnDOCompleted = 0) {
  const Email = await getUserEmail();
  const Unit = await getUnit();
  const userID = await getUserId();
  const intUserTypeId = await getUserTypeId();

  if (ysnDOCompleted == 0) {
    ysnDOCompleted = false;
  } else {
    ysnDOCompleted = true;
  }

  // Check it is customer or not
  // If customer then show only his orders
  let url = '';
  let data = [];

  if (intUserTypeId == 1) {
    url = api_sales_order_by_email;
    await Axios.get(url, {
      params: {
        token: await getToken(),
        Email: Email,
        UnitID: Unit,
        ysnDOCompleted: ysnDOCompleted,
      },
    }).then((res) => {
      data = res.data;
    });
  } else if (intUserTypeId == 5) {
    url = `http://iapps.akij.net/asll/public/api/v1/customer/getCustomerVsSalesOrder?intUnitId=${Unit}&intCustomerId=${userID}&intSalesOffId=22&dteStartDate=2020-08-01&dteEndDate=2020-09-29`;
    await Axios.get(url).then((res) => {
      data = res.data.data;
    });
  }

  return data;
}

export async function searchOrderList(searchText) {
  let email = await getUserEmail();
  let data = [];

  if (api_sales_order_by_email.length !== 0) {
    await Axios.get(
      api_sales_order_by_email +
        `?query=strEmailAddress%3D%22${email}%22 and strCode="'+searchText+'"`,
      {
        token: getToken(),
      },
    ).then((res) => {
      data = res.data;
      console.log('list data', res.data);
    });
  }

  return data;
}

export async function salesOrderCreate(
  intUserID,
  intUnitID,
  dteDate,
  dteDODate,
  intCustomerType,
  intCustomerId,
  intDisPointId,
  strNarration,
  strAddress,
  intPriceVarId,
  intVehicleVarId,
  ysnLogistic,
  intChargeId,
  numCharge,
  intIncentiveId,
  numIncentive,
  intCurrencyId,
  numConvRate,
  intSalesTypeId,
  monExtraAmount,
  strExtraCause,
  strOther,
  strContactAt,
  strPhone,
  intSalesOffId,
  intShipPointId,
  ysnSiteDelivery,
  ysnDeliveryOrder,
  singleProductData,
  ysnSubmitByCustomer = false,
) {
  let orderObject = {
    intUserID: intUserID,
    intUnitID: intUnitID,
    dteDate: dteDate,
    dteDODate: dteDODate,
    intCustomerType: intCustomerType,
    intCustomerId: intCustomerId,
    intDisPointId: intDisPointId,
    strNarration: strNarration,
    strAddress: strAddress,
    intPriceVarId: intPriceVarId,
    intVehicleVarId: intVehicleVarId,
    ysnLogistic: ysnLogistic,
    intChargeId: intChargeId,
    numCharge: numCharge,
    intIncentiveId: intIncentiveId,
    numIncentive: numIncentive,
    intCurrencyId: intCurrencyId,
    numConvRate: numConvRate,
    intSalesTypeId: intSalesTypeId,
    monExtraAmount: monExtraAmount,
    strExtraCause: strExtraCause,
    strOther: strOther,
    strContactAt: strContactAt,
    strPhone: strPhone,
    intSalesOffId: intSalesOffId,
    intShipPointId: intShipPointId,
    ysnSiteDelivery: ysnSiteDelivery,
    ysnDeliveryOrder: ysnDeliveryOrder,
  };

  let products = [];
  products.push(singleProductData);
  console.log('Product Items Data: ', products);
  const headers = {
    'Content-Type': 'application/json',
  };

  let data = [];
  let DO_NO = '';
  let url = '';
  if (ysnSubmitByCustomer) {
    url =
      'http://api2.akij.net:8066/api/SalesOrderByEntryByCustomer/SalesOrderByEntryByCustomers';
  } else {
    url = 'http://api1.akij.net:8054/api/SalesOrder/SalesOrderEntry';
  }
  url =
    url +
    '?intUserID=' +
    intUserID +
    '&intUnitID=' +
    intUnitID +
    '&dteDate=' +
    dteDate +
    '&dteDODate=' +
    dteDODate +
    '&intCustomerType=' +
    intCustomerType +
    '&intCustomerId=' +
    intCustomerId +
    '&intDisPointId=' +
    intDisPointId +
    '&strNarration=' +
    strNarration +
    '&strAddress=' +
    strAddress +
    '&intPriceVarId=' +
    intPriceVarId +
    '&intVehicleVarId=' +
    intVehicleVarId +
    '&ysnLogistic=' +
    ysnLogistic +
    '&intChargeId=' +
    intChargeId +
    '&numCharge=' +
    numCharge +
    '&intIncentiveId=' +
    intIncentiveId +
    '&numIncentive=' +
    numIncentive +
    '&intCurrencyId=' +
    intCurrencyId +
    '&numConvRate=' +
    numConvRate +
    '&intSalesTypeId=' +
    intSalesTypeId +
    '&strExtraCause=' +
    strExtraCause +
    '&strOther=' +
    strOther +
    '&strContactAt=' +
    strContactAt +
    '&strPhone=' +
    strPhone +
    '&intSalesOffId=' +
    intSalesOffId +
    '&intShipPointId=' +
    intShipPointId +
    '&ysnDelivaryOrder=' +
    ysnDeliveryOrder +
    '&ysnSiteDelivery=' +
    ysnSiteDelivery;

  return Axios.post(url, products, {headers: headers})
    .then(function (response) {
      DO_NO = response.data;
      return DO_NO;
    })
    .catch(function (error) {
      console.log('Error after Order: ', error);
      console.log('Error after Order message: ', error.message);
      console.log('products', products);
      console.log('url', url);
      return '';
    });
  return DO_NO;
}

/**
 * http://api2.akij.net:8066/api/SalesOrderByEntryByCustomer/SalesOrderByEntryByCustomers?intUserID=386967&intUnitID=4&dteDate=2020-08-31&dteDODate=2020-08-31&intCustomerType=5&intCustomerId=386967&intDisPointId=72975&strNarration=[1 Bag PCC[761]]&strAddress=test address&intPriceVarId=5&intVehicleVarId=14521&ysnLogistic=true&intChargeId=4&numCharge=0&intIncentiveId=4&numIncentive=0&intCurrencyId=1&numConvRate=1&intSalesTypeId=12&strExtraCause=NA&strOther=NA&strContactAt=test &strPhone=01951233084&intSalesOffId=22&intShipPointId=15&ysnDelivaryOrder=true&ysnSiteDelivery=false
 */

// export async function getCustomerList(email) {
//   let data = {};
//   if (api_get_customer.length !== 0) {
//     try {
//       await Axios.get(
//         `${api_employee_profile}?query=strOfficeEmail="${username}@akij.net"`
//       )
//       }).then(res => {
//         console.log("customer list", res.data);
//         // data = res.data;
//         // if (data.length > 0) {
//         //   data = data[0];
//         // }
//       });
//     } catch (error) {
//       console.log("Error Entered: ", error);
//     }
//     return data;
//   }
// }

export async function getCustomerList(email, intCustomerId) {
  let data = [];
  // let email = await getUserEmail();
  // //    alert(email);

  try {
    if (api_get_customer.length !== 0) {
      await Axios.get(
        `http://api2.akij.net:8055/api/Customers/GetCustomersByQuery?query=strEmailAddress%3D%20%22${email}%22%26%26intCusId%3D${intCustomerId}`,
      ).then((res) => {
        data = res.data;
        console.log('customer Data: ', data);
      });
    }
  } catch (error) {
    console.log('Error enter: ', error);
  }
  return data;
}

export async function getCustomerLoadingProfile() {
  let data = [];
  let customerId = await getUserId();

  try {
    await Axios.get(
      `http://iapps.akij.net/asll/public/api/v1/requisitionIssue/getCustomerLoadingProfile?intCusID=${customerId}`,
    ).then((res) => {
      data = res.data.data;
    });
  } catch (error) {
    console.log('Error enter: ', error);
  }
  return data;
}
