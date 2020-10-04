import {api_shipping_points} from '../../../config.json';
import { getToken } from '../../service/tokens/TokenService';
import Axios from 'axios';

export async function  getShippingPoints() {
    let data = [];

    await Axios.get(api_shipping_points, 
        {
            token: getToken()
        }
    )
    .then((res) => {
        data = res.data;
    });
    return data;
}
  