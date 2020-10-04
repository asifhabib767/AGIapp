import {api_get_leave_list,api_get_leave_type,api_get_district_list,api_post_leave_create,api_leave_delate} from '../../../config.json';
import {getToken} from '../../service/tokens/TokenService';
import Axios from 'axios';
import  AsyncStorage  from '@react-native-community/async-storage';

export async function getLeaveList() {
 
  let data = [];
  let userData = await AsyncStorage.getItem('userData') || 'none';
  let dataParse = JSON.parse(userData);
  const {strEmployeeCode,intEmployeeId} = dataParse;
  console.log(intEmployeeId);
  if (api_get_leave_list.length !== 0) {
    await Axios.get(
        `${api_get_leave_list}?EmployeeId=${intEmployeeId}`,
      {
        token: getToken(),
      },
    ).then(res => {
      data = res.data;
    });
    return data;
  }
}
export async function getLeaveType() {
 
  let data = [];
  let userData = await AsyncStorage.getItem('userData') || 'none';
  let dataParse = JSON.parse(userData);
  const {strEmployeeCode,intEmployeeId} = dataParse;

 

  if (api_get_leave_type.length !== 0) {
    await Axios.get(
        `${api_get_leave_type}?EmployeeId=${intEmployeeId}`,
      {
        token: getToken(),
      },
    ).then(res => {
      data = res.data;
      
    });
    return data;
  }
}

export async function PostLeave(addtype,fromDate,endDate,reason,address) {
  
    let userData = await AsyncStorage.getItem('userData') || 'none';
    let dataParse = JSON.parse(userData);
    const {strEmployeeCode,intEmployeeId,strContactNo1} = dataParse;

  let data = [];
  let leaveData ={
    EmpCode: strEmployeeCode,
    LeaveTypeID: addtype,
    FromdDate: fromDate,
    ToDate: endDate,
    LeaveReason :reason,
    Address : address,
    PhoneNumber : strContactNo1,
    ActionBy : intEmployeeId
  }
  console.log(leaveData);
  const headers = {
    'Content-Type': 'application/json',
  };
  
  // Axios.post(`${api_post_leave_create}`, {
  //   leaveData
    
  // })
  let leavePost= await Axios.post(`${api_post_leave_create}?EmpCode=${strEmployeeCode}&LeaveTypeID=${addtype}&FromdDate=${fromDate}&ToDate=${endDate}&LeaveReason=${reason}&Address=${address}&PhoneNumber=${strContactNo1}&ActionBy=${intEmployeeId}`, {})
  .then(function (response) {
    console.log('leave post',response);
    return response.data
  })
  .catch(function (error) {
    console.log(error);
  });

  return leavePost;

}
export async function DeleteLeave(ApplicationId) {
  console.log('application is',ApplicationId);
    let userData = await AsyncStorage.getItem('userData') || 'none';
    let dataParse = JSON.parse(userData);
    const {strEmployeeCode,intEmployeeId} = dataParse;

  let data = [];
  let deleteData ={
    EmpCode : strEmployeeCode,
    ApplicationId : ApplicationId,
    ActionBy : intEmployeeId,
  }

  console.log(deleteData);

  const headers = {
    'Content-Type': 'application/json',
  };

  // Axios.post('http://172.17.17.24:8056/api/LeaveApplication/LeaveApplicationDelete', deleteData, { headers: headers } )
  
  Axios.post(`${api_leave_delate}?EmpCode=${strEmployeeCode}&ApplicationId=${ApplicationId}&ActionBy=${intEmployeeId}`, {
    
    
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

}


