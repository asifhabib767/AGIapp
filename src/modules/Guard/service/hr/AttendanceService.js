import {
  api_get_attendance_list,
  api_post_attendance,
} from "../../config.json";
import { getToken } from "../tokens/TokenService";
import Axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";

/**
 * getAttendanceData()
 *
 * Get Distributor list of that assigned Sales Officer
 * @param int distributorID -> If want to see the retailers of that distributor
 * @return array retailer list
 */

export async function getAttendanceData() {
  let data = [];
  let userData = (await AsyncStorage.getItem("userData")) || "none";
  let dataParse = JSON.parse(userData);
  const { strEmployeeCode, intEmployeeId } = dataParse;
  console.log(api_get_attendance_list);

  if (api_get_attendance_list.length !== 0) {
    await Axios.get(`${api_get_attendance_list}?EmployeeId=${intEmployeeId}`, {
      token: getToken(),
    }).then((res) => {
      data = res.data;
    });
    return data;
  }
}

// export async function postAttendanceData(latitude,longitude) {

//     let data = [];
//     let userData = await AsyncStorage.getItem('userData') || 'none';
//     let dataParse = JSON.parse(userData);
//     const {intEmployeeId,intJobStationId} = dataParse;
//     console.log(intEmployeeId,intJobStationId);

//     if (`http://172.17.17.24:8056/api/RemoteGeoPunch/RemoteGeoPunchEntry`.length !== 0) {
//         await Axios.get(`http://172.17.17.24:8056/api/RemoteGeoPunch/RemoteGeoPunchEntry?EmployeeId=${intEmployeeId}&Lang=23.7498&lat=90.3967&JobstationId=${intJobStationId}`, {
//                 token: getToken()
//             })
//             .then((res) => {
//                 data = res.data;
//                 console.log('Distributors: ', data);
//             });

//         return data;
//     }
//     return data;
// }

export async function postAttendanceData(latitude, longitude) {
  let userData = (await AsyncStorage.getItem("userData")) || "none";
  let dataParse = JSON.parse(userData);
  const { intEmployeeId, intJobStationId } = dataParse;

  let data = [];
  let attendanceData = {
    EmployeeId: intEmployeeId,
    Lang: longitude,
    lat: latitude,
    JobstationId: intJobStationId,
  };
  console.log(attendanceData);
  const headers = {
    "Content-Type": "application/json",
  };

  // Axios.post(`${api_post_leave_create}`, {
  //   leaveData

  // })

  let attendance = Axios.post(
    `${api_post_attendance}?EmployeeId=${intEmployeeId}&Lang=${longitude}&lat=${latitude}&JobstationId=${intJobStationId}`,
    {}
  )
    .then(function (response) {
      console.log(response);
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  return attendance;
}
