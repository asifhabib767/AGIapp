import {api_get_route,api_business_type , api_post_outlet} from '../../../config.json';
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
export async function createOutletRegistration(routeId, routeName, outlate, outletAddress, owner,mobile,BusinessType,dateOfBith,marriageDate,latitude,longitude,images,contactType) {
    let userData = await AsyncStorage.getItem('userData') || 'none';
    let dataParse = JSON.parse(userData);
    let email = await getUserEmail();
    let unitId = await getUnit();
    // let headersData = {'Authorization': `bearer ${await getToken()}`};
    const {strEmployeeCode,intEmployeeId} = dataParse;

    const headersData = {
      'Authorization': `bearer ${await getToken()}`,
      'Accept': 'application/json',
      'Content-Type': 'text/plain'    
    };
  
    if(images.length == 0){
      images = 'NA';
    }

    if(latitude.length == 0){
      latitude = "0";
    }

    if(longitude.length == 0){
      longitude = "0";
    }

    if(dateOfBith.length == 0){
      dateOfBith = DateClass.currentdate();
    }
    
    if(marriageDate.length == 0){
      marriageDate = DateClass.currentdate();
    }

    let url = `${api_post_outlet}?intRouteID=${routeId}&strRouteName=${routeName}&strOutletName=${outlate}&strOwnerName=${owner}&strMobileNumber=${mobile}&intBusinessType=${BusinessType}&dteDateOfBirth=${dateOfBith}&dteMarriageDate=${marriageDate}&strEmailAddress=${email}&strLatitude=${latitude}&strLongitude=${longitude}&filePath=${images}&intInsertBy=${intEmployeeId}&intUnitID=${unitId}&strOutletAddress=${outletAddress}&strContactType=${contactType}`;

    let outletPost= await Axios.post( url, {}, {headers: headersData})
  
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log(error);
    });
    
  return outletPost;
}

