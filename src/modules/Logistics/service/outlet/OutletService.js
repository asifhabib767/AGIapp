import { api_get_outlets_by_unit, api_get_outlet_details, api_get_profile_types, api_get_profile_type_details, api_get_outlet_by_psr } from '../../../config.json';
import { getToken } from '../../service/tokens/TokenService';
import {getUserEmail, getUnit, getEmployeeID} from '../../service/auth/AuthService';

import Axios from 'axios';

/**
 * getOutletsByUnit()
 * 
 * Get All Outlets by it's unit
 */

// export async function getOutletsByUnit() {
//     let data = [];
//     let headersData = {'Authorization': `bearer ${await getToken()}`};
//     let intUnitID = await getUnit();
//     let url = api_get_outlets_by_unit+"?intUnitID="+intUnitID;
    
//     if(api_get_outlets_by_unit.length !== 0){
//         await Axios.get(url, {headers: headersData})
//         .then((res) => {
//             data = res.data;
//         })
//         .catch((error) => {
//             console.log(error);
//         })
//         return data;
//     }
// }


export async function getOutletsByUnit() {
    let data = [];
    let headersData = {'Authorization': `bearer ${await getToken()}`};
    let intEmployeeID = await getEmployeeID();
    let url = api_get_outlet_by_psr+"?intPSREnroll="+intEmployeeID;
    
    if(api_get_outlet_by_psr.length !== 0){
        await Axios.get(url, {headers: headersData})
        .then((res) => {
            data = res.data;
        })
        .catch((error) => {
            console.log(error);
        })
        return data;
    }
}

/**
 * getOutletDetail()
 * 
 * Get Outlet Details
 * 
 * @param {int} intOutletID 
 */
export async function getOutletDetail(intOutletID) {
    let data = {};

    if(api_get_outlet_details.length !== 0){
        await Axios.get(api_get_outlet_details, 
            {
                params: {
                    token: getToken(),
                    intOutletID: intOutletID
                }
            }
        )
        .then((res) => {
            data = res.data;
            if(data.length > 0){
                data = data[0];
            }
        })
        .catch((error) => {
            console.log(error);
        })
        return data;
    }
}

/**
 * getOutletProfileType
 */
export async function getOutletProfileType(intOutletID) {
    let data = [];
    let intUnitID = await getUnit();
    let intEmployeeId = await getEmployeeID();
    let headersData = {'Authorization': `bearer ${await getToken()}`};
    let url = api_get_profile_types + "?intID="+intOutletID;

    // if(intEmployeeId == 439590 || intEmployeeId == 392407 || intEmployeeId == 412378 || intEmployeeId == 318035 || intEmployeeId == 422905){
    //     return [{"intID":1,"strName":"Outlet Grade","strControlName":"dropdown"},{"intID":2,"strName":"AFBL Top 10 Outlet","strControlName":"dropdown"},{"intID":3,"strName":"Owner Date Of Birth","strControlName":"date"},{"intID":4,"strName":"Owner Marriage Date","strControlName":"date"},{"intID":5,"strName":"Email","strControlName":"text"},{"intID":6,"strName":"Cooler Status","strControlName":"dropdown"},{"intID":7,"strName":"Shop Sign Status","strControlName":"dropdown"},{"intID":8,"strName":"Shelf Image","strControlName":"image"}];
    // }
    
    if(url.length !== 0){
        await Axios.get(url,  {headers: headersData})
        .then((res) => {
            data = res.data;
            console.log('Data List: ', res);
        })
        .catch((error) => {
            console.log('Data List Find Error: ',error);
        });
    }
    return data;
}


export async function getOutletProfileTypeDetails(intID) {
    let data = [];
    let headersData = {'Authorization': `bearer ${await getToken()}`};
    let url = `${api_get_profile_type_details}?intID=${intID}`;

    if(url.length !== 0){
        await Axios.get(`${url}`, {headers: headersData})
        .then((res) => {
            data = res.data;
            console.log(res.data);

        })
        .catch((error) => {
            console.log('Data Details Find Error: ', error);
            console.log('Data Details Find Error: ', headersData);
            console.log('URL: ', url);
        });
    }
    return data;
}
