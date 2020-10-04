import {
  api_products,
  api_get_product_price,
  api_get_product_coa,
} from '../../SalesConfig.json';
import {getToken} from '../../service/tokens/TokenService';
import * as DateClass from '../../../Master/Util/DateConfigure';
import {getUserTerritoryId} from '../../service/auth/AuthService';
import Axios from 'axios';
import {getcustomerSalesOfficeId, getUnitId} from '../../../User/util/AuthData';

/**
 * getProducts()
 *
 * Get product list
 */

export async function getProducts() {
  let data = [];
  const intUnitID = await getUnitId();
  const salesOfficeId = await getcustomerSalesOfficeId();
  // let url = api_products;
  // url = url + `?query=intUnitID=${intUnitID}`;
  let url = `http://iapps.akij.net/asll/public/api/v1/sales/getDataForItemList?intSalesOffice=${salesOfficeId}`;

  await Axios.get(url, {
    token: getToken(),
  }).then((res) => {
    console.log('product res', res);
    data = res.data.data;
  });
  return data;
}
export async function getSalesOrderProducts() {
  let data = [];
  const intUnitID = await getUnitId();
  const salesOfficeId = await getcustomerSalesOfficeId();
  let url = api_products;
  url = url + `?query=intUnitID=${intUnitID}`;
  await Axios.get(url, {
    token: getToken(),
  }).then((res) => {
    console.log('product res', res);
    data = res.data;
  });
  return data;
}

/**
 * getProductPrice
 *
 * Get Product Price
 *
 * @param {int} ProductId
 * @param {int} CustomerId
 * @param {int} UomId
 * @param {int} SalesTypeId
 */
export async function getProductPrice(
  ProductId,
  CustomerId,
  UomId,
  SalesTypeId,
  PriceId,
) {
  let data = {};
  let CurrencyId = 1; // CurrencyId = 1 = BDT, UomId=12 // Bag
  let SalesDate = DateClass.getFormattedCurrentDate();
  // let PriceId = await getUserTerritoryId();

  console.log('Pass Product ID: ', ProductId);
  console.log('Pass Customer ID: ', CustomerId);
  console.log('Pass Sales Type ID: ', SalesTypeId);
  console.log('Pass UomID ID: ', UomId);
  console.log('Pass PriceID: ', PriceId);

  if (api_get_product_price.length !== 0) {
    try {
      await Axios.get(api_get_product_price, {
        params: {
          token: getToken(),
          ProductId: ProductId,
          CustomerId: CustomerId,
          PriceId: PriceId,
          UomId: UomId,
          CurrencyId: CurrencyId,
          SalesTypeId: SalesTypeId,
          SalesDate: SalesDate,
        },
      }).then((res) => {
        console.log('res product', res);
        data = res.data;
        if (data.length > 0) {
          data = data[0];
        }
      });
    } catch (error) {
      console.log('Error Price: ', error);
    }
    return data;
  }
}

export async function getChartOfAccountData(itmid, salestype, intunitid) {
  let data = {};
  if (api_get_product_coa.length !== 0) {
    try {
      await Axios.get(api_get_product_coa, {
        params: {
          token: getToken(),
          itmid: itmid,
          salestype: salestype,
          intunitid: intunitid,
        },
      }).then((res) => {
        data = res.data;
        if (data.length > 0) {
          data = data[0];
        }
      });
    } catch (error) {
      console.log('Error Entered: ', error);
    }
    return data;
  }
}
