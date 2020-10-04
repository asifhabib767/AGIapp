import {api_shipping_points} from '../../SalesConfig.json';
import {getToken} from '../../service/tokens/TokenService';
import Axios from 'axios';
import {
  getcustomerTerritoryID,
  getUnitId,
} from '../../../../modules/User/util/AuthData';

export async function getShippingPoints() {
  let data = [];

  const territoryId = await getcustomerTerritoryID();

  console.log('intUnitID', territoryId);
  // const url = `http://api1.akij.net:8055/api/ShippingPoint/GetShippingPointsByQuery?query=intUnitID=${intUnitID}`;
  const url = `http://iapps.akij.net/asll/public/api/v1/sales/getDataForShippingPointByTerritory?intID=${territoryId}`;

  await Axios.get(url, {
    token: getToken(),
  }).then((res) => {
    console.log('res shipping point', res);
    data = res.data.data;
  });
  return data;
}
export async function getShippingPointsForSalesOrder() {
  let data = [];

  const unitId = await getUnitId();

  const url = `http://api1.akij.net:8055/api/ShippingPoint/GetShippingPointsByQuery?query=intUnitID=${unitId}`;

  await Axios.get(url, {
    token: getToken(),
  }).then((res) => {
    console.log('res shipping point', res);
    data = res.data;
  });
  return data;
}
