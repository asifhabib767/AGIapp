import { api_retailers, api_get_distributor, api_distributor_balance, api_customer_types, api_get_distributor_list,api_get_customer_type ,api_get_distributor_new_list} from '../../../config.json';
import { getToken } from '../tokens/TokenService';
import Axios from 'axios';
import { getUserEmail } from '../auth/AuthService.js';

/**
 * getDistributor()
 * 
 * Get Distributor list of that assigned Sales Officer
 * @param int distributorID -> If want to see the retailers of that distributor
 * @return array retailer list
 */

export async function  getDistributor(distributorID=null) {

    let data = [];
    let email = await getUserEmail();
//    alert(email);

   try {
    if(api_get_distributor_new_list.length !== 0){
            await Axios.get(`${api_get_distributor_new_list}?mailAddress=${email}`)
            .then((res) => {
                data = res.data;
                console.log('Distributors Data: ', data);
            });
        } 
    }
   catch (error) {
       console.log('Error enter: ', error);
   }
    return data;
}


export async function  getDistributorBalance(disPointId, date, unitID) {
    let data = [];

    if(api_distributor_balance.length !== 0){
        await Axios.get(api_distributor_balance,{
            params: {
                disPointId: disPointId,
                date: date,
                unitID: unitID,
                token: getToken()
            }
        })
        .then((res) => {
            if(res.data.length > 0){
                data = res.data[0];
            }
        })
        .catch(function (error) {
            console.log('Error happened...');
            console.log(error);
        })
    }

    return data;
}


/**
 * getCustomerTypes()
 * 
 * @param {int} unitID 
 */
export async function getCustomerTypes(unitID) {
    let data = [];
    console.log('API: ', api_customer_types);
    if(api_customer_types.length !== 0){
        //await Axios.get(api_customer_types+'?query=intUnitId='+unitID)
        await Axios.get(api_get_customer_type+'?query=intUnitId='+unitID)
        .then((res) => {
            data = res.data;
        })
        .catch(function (error) {
            console.log('Error happened...');
            console.log(error);
        })
    }
    return data;
}

export async function getRetailersByDistributor(customerID) {
    // alert('Enter here ...');
    let data = [];
    console.log('API: ', api_retailers);
    if(api_retailers.length !== 0){
        await Axios.get(api_retailers+'?query=intcustomerid='+customerID)
        .then((res) => {
            data = res.data;
        })
        .catch(function (error) {
            console.log('Error happened...');
            console.log(error);
        })
    }
    return data;
}


