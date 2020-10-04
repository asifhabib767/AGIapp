import {api_get_agenda,api_post_agenda} from '../../../config.json';
import {getToken} from '../tokens/TokenService';
import Axios from 'axios';
import {getUserEmail, getUnit, getEmployeeID} from '../auth/AuthService.js';
import  AsyncStorage  from '@react-native-community/async-storage';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Actions } from 'react-native-router-flux';

export async function  getAgenda(outletId) {

  let intUnitID = outletId;
  

    let data = [];

    let headersData = {
      'Authorization': `bearer ${await getToken()}`,
      'Content-Type': 'application/json',
    };

    let url = `${api_get_agenda}?intUnitID=${intUnitID}`;
   
    if(api_get_agenda.length !== 0){
        await Axios.get(`${url}`,{headers: headersData})

        .then(function (response) {
         
          console.log('succss',response.data);
          data = response.data
          return data;
        })
        .catch(function (error) {
          console.log('error is', error);
          console.log('url', url);
          console.log('headersData', headersData);
        });
    }
    console.log('user data',data);
    return data;

}
export async function createAgenda(name,title,showTime,showDate,priority,note,outlet) {
    // console.log(name,title,showTime,showDate,priority,note);
    let userData = await AsyncStorage.getItem('userData') || 'none';
    let dataParse = JSON.parse(userData);
    let email = await getUserEmail();
    let unitId = await getUnit();
    let employeeId = await getEmployeeID();

    let outletId = outlet.intOutletID;
    let outletname = outlet.strOutletName;


    // let headersData = {'Authorization': `bearer ${await getToken()}`};
    const {strEmployeeCode,intEmployeeId} = dataParse;

    const headersData = {
      'Authorization': `bearer ${await getToken()}`,
      'Accept': 'application/json',
      
    };
  
 

    //let url = `${api_post_agenda}?intOutletID=2&strOutletName=home&strAgendaName=${name}&strDiscussionTitle=${title}&tmTime=${showTime}&dteDate=${showDate}&strPriority=${priority}&strNote=${note}&intInsertBy=392407&intUnitID=91`;
    let url = `${api_post_agenda}?intOutletID=${outletId}&strOutletName=${outletname}&strAgendaName=${name}&strDiscussionTitle=${title}&tmTime=${showTime}&dteDate=${showDate}&strPriority=${priority}&strNote=${note}&intInsertBy=${employeeId}&intUnitID=${unitId}`
    
    let agendaPost= await Axios.post( url, {}, {headers: headersData})
  
    .then(function (response) {
        console.log('success',url);
        console.log(response.data);
        return response;
    })
    .catch(function (error) {
      console.log(error);
      console.log('error',url);
    });
    
  return agendaPost;
}
