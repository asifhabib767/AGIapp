import { api_delivery_points } from '../../../config.json';
import { getToken } from '../../service/tokens/TokenService';
import Axios from 'axios';

import {getUserEmail} from '../../service/auth/AuthService';

/**
 * getDeliveryPoints()
 * 
 * Get retailer list of that assigned Sales Officer
 * @param int distributorID -> If want to see the retailers of that distributor
 * @return array retailer list
 */

export async function getDeliveryPoints(email) {
    let data = [];

    if(api_delivery_points.length !== 0){
        await Axios.get(`${api_delivery_points}?query=strEmailAddress="${email}"`, 
            {
                token: getToken()
            })
        .then((res) => {
            data = res.data;
        });
        
        return data;
    }
}


export async function  searchDeliveryPoints(searchText) {
    let data = [];
    let emailAddress = await getUserEmail();

    if(api_delivery_points.length !== 0){
        
        await Axios.get(`${api_delivery_points}?query=strEmailAddress="${emailAddress}"`, 
            {
                token: getToken()
            })
        .then((res) => {
            data = res.data;
        });
        
        return data;
    }
}