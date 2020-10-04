import {api_shipping_points} from '../../SalesConfig.json';
import {getToken} from '../../service/tokens/TokenService';
import Axios from 'axios';
import {getUserId} from '../../../User/util/AuthData';
import * as config from '../../SalesConfig.json';

export async function getCustomerDetails() {
  let data = {};
  const intCusID = await getUserId();
  const url = `${config.get_customer_details}?intCusID=${intCusID}`;

  await Axios.get(url, {
    token: getToken(),
  })
    .then((res) => {
      console.log('res customer details', res.data);
      data = res.data;
    })
    .catch((err) => {
      console.log('url', url);
      console.log('err in fetching customer', err);
    });
  return data;
}
