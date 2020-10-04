import {api_get_route,api_business_type , api_post_contact_update} from '../../../config.json';
import {getToken} from '../tokens/TokenService';
import Axios from 'axios';
// import { headers } from '../tokens/AxiosService';
import {getUserEmail, getUnit, getEmployeeID} from '../auth/AuthService.js';
import  AsyncStorage  from '@react-native-community/async-storage';

import * as DateClass from '../../Util/DateConfigure';

export async function  getRoute() {
    let headersData = {'Authorization': `bearer ${await getToken()}`};

    let data = [];
    let unitId = await getUnit();
    let intEmployeeId = await getEmployeeID();

    if(intEmployeeId == 439590 || intEmployeeId == 392407 || intEmployeeId == 412378 || intEmployeeId == 318035 || intEmployeeId == 422905){
      intEmployeeId = 77729; //this will be comment out
    }
    
    console.log(intEmployeeId);
   try {
    if(api_get_route.length !== 0){
            await Axios.get(`${api_get_route}?intID=${intEmployeeId}`, {headers: headersData})
            .then((res) => {
                data = res.data;
                console.log('Distributors Data: ',data);
            });
        }
    }
   catch (error) {
       console.log('Error enter: ', error);
   }
    return data;
}
export async function  getBustinessType() {

    let data = [];
    let unitId = await getUnit();
    let headersData = {'Authorization': `bearer ${await getToken()}`};

    try {
    if(api_business_type.length !== 0){
            await Axios.get(`${api_business_type}`, {headers: headersData})
            .then((res) => {
                data = res.data;
                console.log('Business type: ', data);
            });
        } 
    }
   catch (error) {
       console.log('Error enter: ', error);
   }
    return data;
}
export async function updateOutletRegistration(intRouteID,strRouteName,strOutletName,strOwnerName,strMobileNumber,strBusinessType,dteDateOfBirth,dteMarriageDate,strLatitude,strLongitude,strOutletImagePath,outletId,strContactType,strOutletAddress) {
    console.log('Updated Information new: ',intRouteID,strRouteName,strOutletName,strOwnerName,strMobileNumber,strBusinessType,dteDateOfBirth,dteMarriageDate,strLatitude,strLongitude,strOutletImagePath,outletId,strContactType,strOutletAddress)
    let userData = await AsyncStorage.getItem('userData') || 'none';
    let dataParse = JSON.parse(userData);
    let email = await getUserEmail();
    let unitId = await getUnit();
    let intOutletID = outletId;
    // let headersData = {'Authorization': `bearer ${await getToken()}`};
    const {strEmployeeCode,intEmployeeId} = dataParse;

    const headersData = {
      'Authorization': `bearer ${await getToken()}`,
      'Accept': 'application/json',
      'Content-Type': 'text/plain'    
    };
  
    if(strOutletImagePath.length == 0){
      strOutletImagePath = 'NA';
    }

    if(strLatitude.length == 0){
      strLatitude = "0";
    }

    if(strLongitude.length == 0){
      strLongitude = "0";
    }

    if(dteDateOfBirth.length == 0){
      dteDateOfBirth = DateClass.currentdate();
    }
    
    if(dteMarriageDate.length == 0){
      dteMarriageDate = DateClass.currentdate();
    }

    let url = `${api_post_contact_update}?intOutletID=${intOutletID}&intRouteID=${intRouteID}&strRouteName=${strRouteName}&strOutletName=${strOutletName}&strOwnerName=${strOwnerName}&strMobileNumber=${strMobileNumber}&strBusinessType=${strBusinessType}&dteDateOfBirth=${dteDateOfBirth}&dteMarriageDate=${dteMarriageDate}&strEmailAddress=${email}&strLatitude=${strLatitude}&strLongitude=${strLongitude}&intInsertBy=${intEmployeeId}&intUnitID=${unitId}&filePath=${strOutletImagePath}&strOutletAddress=${strOutletAddress}&strContactType=${strContactType}`;

    let outletPost= await Axios.post( url, {}, {headers: headersData})
  
    .then(function (response) {
       console.log('Updated Data: ',response.data);
      return response.data
    })
    .catch(function (error) {
      console.log(error);
    });
    
  return outletPost;
}

