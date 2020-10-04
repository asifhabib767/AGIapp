import {api_sales_offices} from '../../SalesConfig.json';
import {getToken} from '../../service/tokens/TokenService';
import Axios from 'axios';
import {getUnitId} from '../../../User/util/AuthData';

export async function getSalesOffices() {
  let data = [];
  const intUnitId = await getUnitId();
  let url = api_sales_offices + `?query=IntUnitId=${intUnitId}`;
  console.log('getSalesOffices url: ', url);
  await Axios.get(url, {
    token: getToken(),
  }).then((res) => {
    data = res.data;
  });
  return data;
}
