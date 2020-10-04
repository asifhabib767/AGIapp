import {api_get_imageDecode} from '../../config.json';
import {getToken} from '../service/tokens/TokenService';
import Axios from 'axios';

export async function getImageDecodePath(path) {
  let data = '';

  let headersData = {Authorization: `bearer ${await getToken()}`};

  if (api_get_imageDecode.length !== 0) {
    await Axios.get(`${api_get_imageDecode}?filePath=${path}`, {
      headers: headersData,
    })
      .then(res => {
        data = res.data;
        console.log('image decode: ', data);
      })
      .catch(error => {
        console.log('error: ', error);
      });
    return data;
  }
}
