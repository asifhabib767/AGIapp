import {
  api_sales_order_by_email,
  api_sales_order_create,
} from '../../../config.json';
import {Alert} from 'react-native';
import {Actions} from 'react-native-router-flux';

import {getToken} from '../../service/tokens/TokenService';
import Axios from 'axios';
import {getUserEmail, getUnit} from '../../service/auth/AuthService';

export async function getsalesOrderList(ysnDOCompleted = 0) {
  let Email = await getUserEmail();
  let Unit = await getUnit();

  if (ysnDOCompleted == 0) {
    ysnDOCompleted = false;
  } else {
    ysnDOCompleted = true;
  }

  let data = [];
  if (api_sales_order_by_email.length !== 0) {
    await Axios.get(api_sales_order_by_email, {
      params: {
        token: await getToken(),
        Email: Email,
        UnitID: Unit,
        ysnDOCompleted: ysnDOCompleted,
      },
    }).then(res => {
      data = res.data;
      console.log('list data', res.data);
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
    ).then(res => {
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

  console.log('Order Data: ', orderObject);

  let products = [];
  products.push(singleProductData);

  // let products = [
  //   {
  //     "pid": 761,
  //     "pName": "PCC",
  //     "qnt": 1,
  //     "pr": 450,
  //     "accId": 38142,
  //     "accName": "Portland Cement",
  //     "extId": 4,
  //     "extName": "Labour",
  //     "extPr": 0,
  //     "uom": 12,
  //     "cur": 1,
  //     "narr": "PCC 1 Bag",
  //     "sType": 12,
  //     "logisId": 0,
  //     "prom": 0,
  //     "comm": 0,
  //     "incId": 0,
  //     "incPr": 0,
  //     "suppTax": 0,
  //     "vat": 15,
  //     "vatPr": 245,
  //     "uomTxt": "Bag",
  //     "promItemId": 0,
  //     "promItem": "NA",
  //     "promUom": 0,
  //     "promUomText": "NA",
  //     "promPr": 0,
  //     "promItemCOA": 0,
  //     "soPkId": 0,
  //     "apprQnt": 1
  //   }
  // ];

  console.log('Product Items Data: ', products);

  // return false;

  const headers = {
    'Content-Type': 'application/json',
  };

  let data = [];
  let DO_NO = '';
  // Axios.post( api_sales_order_create , {
  //   orderObject, products
  // })
  Axios.post(
    'http://api1.akij.net:8054/api/SalesOrder/SalesOrderEntry?intUserID=' +
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
      ysnSiteDelivery,
    products,
    // Axios.post("http://172.17.17.24:8054/api/SalesOrder/SalesOrderEntry?intUserID=57896&intUnitID=4&dteDate=2019-12-28&dteDODate=2019-12-28&intCustomerType=5&intCustomerId=304516&intDisPointId=2332&strNarration=1%20Bag%20PCC&strAddress=Pouroshova%20road%2C%20Bhuapur%2C%20Tangail%20%2ARoute%20no%20%3A%20090%2A&intPriceVarId=8&intVehicleVarId=14607&ysnLogistic=true&intChargeId=4&numCharge=0&intIncentiveId=0&numIncentive=0&intCurrencyId=1&numConvRate=1&intSalesTypeId=12&strExtraCause=NA&strOther=NA&strContactAt=M%2FS%20Sathi&strPhone=01711589777&intSalesOffId=22&intShipPointId=49&ysnDelivaryOrder=true&ysnSiteDelivery=false", products,
    {headers: headers},
  )
    .then(function(response) {
      DO_NO = response.data;
      console.log('Sales Order Response: ', response.data);

      Alert.alert('Success', 'DO created successfully !!' + ' DO No: ' + DO_NO);
      // Redirect
      Actions.saleList();
    })
    .catch(function(error) {
      console.log('Error after Order: ', error);
    });
  return DO_NO;
}
