import {api_get_challan_list} from '../../SalesConfig.json';
import {Alert} from 'react-native';
import {Actions} from 'react-native-router-flux';

import {getToken} from '../../service/tokens/TokenService';
import Axios from 'axios';
import {getUserEmail, getUnit} from '../../service/auth/AuthService';

export async function getChallanList(dteFromdate, dteTodate) {
  let Email = await getUserEmail();

  let Unit = await getUnit();

  let data = [];
  if (api_get_challan_list.length !== 0) {
    await Axios.get(
      api_get_challan_list +
        `?intReportType=1&intUnitid=${Unit}&dteFromdate=${dteFromdate}&dteTodate=${dteTodate}&strEmailAddress=${Email}`,
      {
        token: getToken(),
      },
    ).then((res) => {
      data = res.data;
      // console.log('list data', res.data);
    });
  }

  return data;
}
