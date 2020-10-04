import {api_get_challan_list} from '../../SalesConfig.json';
import {Alert} from 'react-native';
import {Actions} from 'react-native-router-flux';

import {getToken} from '../../service/tokens/TokenService';
import Axios from 'axios';
import {getUserEmail, getUnit} from '../../service/auth/AuthService';
import {currentdate} from '../../../Master/Util/DateConfigure';
import {getUnitId, getUserId} from '../../../User/util/AuthData';

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

export const GetCustomerStatementForAPI = async (dteFromdate, dteTodate) => {
  let responseList = {
    isLoading: true,
    data: {},
  };
  let date = await currentdate();
  const userID = await getUserId();
  let unitId = await getUnitId();

  await Axios.get(
    `http://api2.akij.net:8054/api/CustomerStatementForAPI/GetCustomerStatementForAPI?fromDate=${dteFromdate}&toDate=${dteTodate}&customerId=${userID}&userID=${userID}&unitID=${unitId}`,
  )
    .then((res) => {
      console.log('res customer statement', res);
      responseList.isLoading = false;
      responseList.data = res.data;
    })
    .catch((error) => {
      responseList.isLoading = false;
    });
  return responseList;
};
