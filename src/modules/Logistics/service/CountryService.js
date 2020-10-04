import axios from 'axios';
import {api_get_all_district} from '../../config.json';

export function getAllDistrict() {
  axios
    .get('http://10.17.1.116:8040/akijCrm/api-akijCrm/firm/distric')
    .then(function(response) {
      // handle success
      //console.log(response.data.districts);
      return [response.data.districts];
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    })
    .finally(function() {
      // always executed
    });
}
