import {api_get_movement_type,api_get_country_list,api_get_district_list,api_get_movement_list,api_post_movement_delete} from '../../../config.json';
import {getToken} from '../../service/tokens/TokenService';
import Axios from 'axios';
import AsyncStorage  from '@react-native-community/async-storage';


export async function getMovementList() {
 
  let data = [];
  let userData = await AsyncStorage.getItem('userData') || 'none';
  let dataParse = JSON.parse(userData);
  const {strEmployeeCode,intEmployeeId} = dataParse;
  console.log(intEmployeeId);
  if (api_get_movement_list.length !== 0) {
    await Axios.get(
        `${api_get_movement_list}?EmployeeId=${intEmployeeId}`,
      {
        token: getToken(),
      },
    ).then(res => {
      data = res.data;
      console.log(data);
    });
    return data;
  }
}
export async function getMovementType() {
 
  let data = [];

  if (api_get_movement_type.length !== 0) {
    await Axios.get(
      `${api_get_movement_type}`,
      {
        token: getToken(),
      },
    ).then(res => {
      data = res.data;
    });
    return data;
  }
}
export async function getCountryList() {
 
  let data = [];

  if (api_get_country_list.length !== 0) {
    await Axios.get(
      `${api_get_country_list}`,
      {
        token: getToken(),
      },
    ).then(res => {
      data = res.data;
     
    });
    return data;
  }
}
export async function getDistrictList() {
 
  let data = [];

  if (api_get_district_list.length !== 0) {
    await Axios.get(
      `${api_get_district_list}`,
      {
        token: getToken(),
      },
    ).then(res => {
      data = res.data;
     console.log(data);
    });
    return data;
  }
}
export async function createMovement(type,fromDate,endDate,country,district,reason,address) {
    let userData = await AsyncStorage.getItem('userData') || 'none';
    let dataParse = JSON.parse(userData);
    const {strEmployeeCode,intEmployeeId} = dataParse;

  let data = [];
  let movementData ={
    empCode: strEmployeeCode,
    MoveTypeID: type,
    FromDate: fromDate,
    ToDate:endDate,
    tmStart: '09:00:00',
    tmEnd : '18:00:00',
    CountryCode : country,
    strAddress : address,
    DistrictId : district,
    Reason : reason,
    ActionBy : intEmployeeId
  }
  console.log('dara',movementData);
  const headers = {
    'Content-Type': 'application/json',
  };
  

  // })
  let leavePost= await Axios.post(`http://api1.akij.net:8056/api/MovementApplication/MovementApplication?empCode=${strEmployeeCode}&MoveTypeID=${type}&FromDate=${fromDate}&ToDate=${endDate}&tmStart=09%3A00%3A00&tmEnd=18%3A00%3A00&CountryId=${country}&strAddress=${address}&DistrictId=${district}&Reason=${reason}&ActionBy=${intEmployeeId}`, {})
 
  .then(function (response) {
    console.log('resvk',response.data);
    return response.data
  })
  .catch(function (error) {
    console.log(error);
  });
 console.log('movement is',leavePost);
 return leavePost;

}
export async function DeleteMovementData(movementId) {
 
    let userData = await AsyncStorage.getItem('userData') || 'none';
    let dataParse = JSON.parse(userData);
    const {strEmployeeCode,intEmployeeId} = dataParse;

  let data = [];
  let deleteData ={
    
    ApplicationId : movementId,
    ActionBy : intEmployeeId,
  }

 

  const headers = {
    'Content-Type': 'application/json',
  };

  // Axios.post('http://172.17.17.24:8056/api/LeaveApplication/LeaveApplicationDelete', deleteData, { headers: headers } )
  
  let deleteResponse = Axios.post(`${api_post_movement_delete}?ApplicationId=${movementId}&ActionBy=${intEmployeeId}`, {})
  .then(function (response) {
    console.log(response);
    return response.data;
  })
  .catch(function (error) {
    console.log(error);
  });

  return deleteResponse;

}



