import {api_sales_order_details} from '../../SalesConfig.json';
import {getToken} from '../../service/tokens/TokenService';
import Axios from 'axios';

export async function getOrderDetails(orderDetailsList) {
  let data = [];
  //  alert('Order ID: '+orderDetailsList);
  if (api_sales_order_details.length !== 0) {
    await Axios.get(
      `${api_sales_order_details}=%20intSOId%3D${orderDetailsList}`,
      {
        token: getToken(),
      },
    ).then((res) => {
      if (res.data.length > 0) {
        data = res.data[0];
        console.log('order details: ', data);
      }
    });
    return data;
  }
}
