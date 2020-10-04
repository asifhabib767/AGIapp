import {api_get_servey} from '../../../config.json';
import {getToken} from '../tokens/TokenService';
import Axios from 'axios';
import {getUserEmail, getUnit} from '../auth/AuthService.js';
import  AsyncStorage  from '@react-native-community/async-storage';

export async function  getSurvey() {

    let data = [];
    let unitId = await getUnit();
   try {
    if(api_get_servey.length !== 0){
            await Axios.get(`${api_get_servey}?unit_id=${unitId}`)
            .then((res) => {
                data = res.data.surveys;
                console.log('Survey data: ',data);
            });
        } 
    }
   catch (error) {
       console.log('Error enter: ', error);
   }
    return data;
}