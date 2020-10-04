import {api_get_agenda,api_post_activity} from '../../../config.json';
import {getToken} from '../tokens/TokenService';
import Axios from 'axios';
import {getUserEmail, getUnit, getEmployeeID} from '../auth/AuthService.js';
import  AsyncStorage  from '@react-native-community/async-storage';


export async function createActivity(name,showTime,showDate,note,images,outlet) {
    // console.log(name,showTime,showDate,note,images);
    let userData = await AsyncStorage.getItem('userData') || 'none';
    let dataParse = JSON.parse(userData);
    let email = await getUserEmail();
    let unitId = await getUnit();
    let employeeId = await getEmployeeID();
    let outletId = outlet.intOutletID;
    let outletname = outlet.strOutletName;
    // let headersData = {'Authorization': `bearer ${await getToken()}`};
    const {strEmployeeCode,intEmployeeId} = dataParse;

    console.log('outlate name',outletId);

    const headersData = {
      'Authorization': `bearer ${await getToken()}`,
      'Accept': 'application/json',
      'Content-Type': 'text/plain'    
    };
  
 

    //let url = `${api_post_agenda}?intOutletID=2&strOutletName=home&strAgendaName=${name}&strDiscussionTitle=${title}&tmTime=${showTime}&dteDate=${showDate}&strPriority=${priority}&strNote=${note}&intInsertBy=392407&intUnitID=91`;
    let url = `${api_post_activity}?intOutletID=${outletId}&strOutletName=${outletname}&strActivityName=${name}&tmTime=${showTime}&dteDate=${showDate}&strNote=${note}&strActivityImagePath=${images}&intInsertBy=${employeeId}&intUnitID=${unitId}`
    let activityPost= await Axios.post( url, {}, {headers: headersData})
  
    .then(function (response) {
           let activity = response.data;
            if (activity.length != 0) {
                Alert.alert('Success', 'Activity Added !');
                Actions.ActivityList({ page: 'Requisition' });
                return response.data
            } else {
                // Alert.alert('Error', 'Please fill all the data and try again !');
            }
      
    })
    .catch(function (error) {
      console.log(error);
      console.log(url);
    });
    
  return activityPost;
}