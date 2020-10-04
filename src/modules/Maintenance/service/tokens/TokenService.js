import {api_get_token} from '../../SalesConfig.json';
import Axios from 'axios';

export async function generateToken(username, password) {
  let token = '';
  Axios.get('/generate-token', {
    username: 'username',
    password: 'password',
  }).then((res) => {
    // Set token to async storage
    token = res.data.access_token;
  });

  return token;
}

export async function getToken() {
  let token = 'test-token-iweywueuweuwyeuweweguyweguwyg';

  // let token = AsyncStorage.getItem('access_token');
  // let username = AsyncStorage.getItem('username');
  // let password = AsyncStorage.getItem('password');

  // let tokenExpired = AsyncStorage.getItem('tokenExpired');

  // If token expired, then generate new token by username and password

  // if(tokenExpired){
  //     generateToken(username, password);
  //     token = getToken();
  // }

  return token;
}

export async function hasToken(username, password) {
  let tokenFound = true;
  // Axios post method to get token
  return tokenFound;
}
