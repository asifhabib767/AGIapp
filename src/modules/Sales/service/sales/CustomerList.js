import {
  api_sales_customer,
  api_get_distributor_list,
} from '../../SalesConfig.json';
import {getToken} from '../../service/tokens/TokenService';
import Axios from 'axios';

export async function getCustomer(intSalesOffId) {
  let data = [];

  if (api_sales_customer.length !== 0) {
    await Axios.get(
      `${api_get_distributor_list}?query=intUnitId%3D4 and intSalesOffId = ${intSalesOffId}`,
      {
        token: getToken(),
      },
    ).then((res) => {
      data = res.data;
      console.log('sales cutomer is', res.data);
    });
    return data;
  }
}
