import { api_sales_offices } from '../../../config.json';
import { getToken } from '../../service/tokens/TokenService';
import Axios from 'axios';

export async function  getSalesOffices() {
    let data = [];

    if(api_sales_offices.length !== 0){
        await Axios.get(api_sales_offices, 
            {
                token: getToken()
            })
        .then((res) => {
            data = res.data;
        });
        return data;
    }

}
  