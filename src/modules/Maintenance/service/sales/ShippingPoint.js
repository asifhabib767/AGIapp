import {api_shipping_points} from '../../SalesConfig.json';
import {getToken} from '../../service/tokens/TokenService';
import Axios from 'axios';
import {getUnitId} from '../../../../modules/User/util/AuthData';

export async function getShippingPoints() {
  let data = [];
  const intUnitID = await getUnitId();
  const url = `http://api1.akij.net:8055/api/ShippingPoint/GetShippingPointsByQuery?query=intUnitID=${intUnitID}`;

  await Axios.get(url, {
    token: getToken(),
  }).then((res) => {
    data = res.data;
  });
  return data;
}
