import { api_retailers, api_retailer_balance } from '../../../config.json';
import { getToken } from '../../service/tokens/TokenService';
import Axios from 'axios';

/**
 * getRetailers()
 * 
 * Get retailer list of that assigned Sales Officer
 * @param int distributorID -> If want to see the retailers of that distributor
 * @return array retailer list
 */

export async function  getRetailers(distributorID=null) {
    let data = [];

    if(api_retailers.length !== 0){
        if(distributorID != null){
            await Axios.get(api_retailers, 
                {
                    token: getToken(),
                    distributorID: distributorID
                })
            .then((res) => {
                data = res.data;
            });
        }else{
            await Axios.get(api_retailers, 
                {
                    token: getToken()
                })
            .then((res) => {
                data = res.data;
            });
        }
        
        return data;
    }
}


export async function  getRetailerBalance(intID) {
    let data = [];

    if(api_retailer_balance.length !== 0){
        await Axios.get(api_retailer_balance, {
            intID: intID,
            token: getToken()
        })
        .then((res) => {
            data = res.data;
        });
        return data;
    }
}
