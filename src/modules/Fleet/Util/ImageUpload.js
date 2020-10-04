
import Axios from 'axios';
import {getToken} from '../service/tokens/TokenService';
import { api_upload_image } from '../../config.json';

/**
 * uploadImage
 * 
 * Upload an image to server ftp path and returns a ftp file response
 * 
 * @param {string} image_uri 
 * @param {string} upload_file_name 
 */
export async function uploadImage(image_uri, upload_file_name="file") {
    let image_path = "";
        
    let file = {
        uri: image_uri,
        type: 'image/jpeg',
        name: 'uploadimagetmp.jpg',
    };
        
    let formData = new FormData();
    formData.append(upload_file_name, file);
     
    Axios({
        method: 'POST',
        url: api_upload_image,
        data: formData,
        headers: {
            'Authorization': "Bearer  "  +  await getToken(),
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data;'    
        }
    }).then(function (response) {
        console.log('Image Path: ', response.data);
        image_path = response.data;
    }).catch(function (error) { 
        console.log(error.response)
    });
    
    return image_path;
}