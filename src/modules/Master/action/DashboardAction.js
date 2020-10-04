import axios from 'axios';
import {getUnitId, getUserId} from '../../User/util/AuthData';
import {currentdate} from '../Util/DateConfigure';

export const GetCustomerStatementOnCrLimitAPI = async () => {
  let responseList = {
    isLoading: true,
    data: {},
  };
  let date = await currentdate();

  const userID = await getUserId();

  let unitId = await getUnitId();

  await axios
    .get(
      `http://api2.akij.net:8054/api/CustomerStatementForAPI/GetCustomerStatementOnCrLimitAPI?date=${date}&customerId=${userID}&userID=${userID}&unitID=${unitId}&dayPeriodList=null`,
    )
    .then((res) => {
      console.log('res customer', res);
      responseList.isLoading = false;
      responseList.data = res.data;
    })
    .catch((error) => {
      responseList.isLoading = false;
    });
  return responseList;
};
