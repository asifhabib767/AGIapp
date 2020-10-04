import {api_sales_types} from '../../SalesConfig.json';
import {getToken} from '../../service/tokens/TokenService';

import Axios from 'axios';

export async function getSalesTypes() {
  let data = [];

  if (api_sales_types.length !== 0) {
    await Axios.get(api_sales_types, {
      token: getToken(),
    }).then((res) => {
      data = res.data;
    });
  }

  return data;
}
