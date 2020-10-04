import {
  get_data_for_all_vehicle_status,
  api_products,
  api_get_product_price,
  api_get_product_coa,
} from '../../config.json';
import {getToken} from '../../service/tokens/TokenService';
import * as DateClass from '../../Util/DateConfigure';
import {getUserTerritoryId} from '../../service/auth/AuthService';
import Axios from 'axios';

/**
 * getProducts()
 *
 * Get product list
 */

export async function showShipTopSheet() {
  let data = [];

  if (get_data_for_all_vehicle_status.length !== 0) {
    await Axios.get(get_data_for_all_vehicle_status, {
      token: 'token',
    })
      .then((res) => {
        console.log('res', res);
        data = res.data;
      })
      .catch(function (error) {
        console.log('error data:>> ', error);
      });
    return data;
  }
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
