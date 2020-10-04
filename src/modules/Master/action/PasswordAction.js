import axios from 'axios';
import {getUnitId, getUserId, getUserName} from '../../User/util/AuthData';

export const ChangePassword = async (password) => {
  let responseList = {
    isLoading: true,
    data: {},
    status: false,
    message: '',
  };
  const username = await getUserName();

  const postData = {
    strUserName: username,
    strPassword: password.trim(),
  };

  return await axios
    .post(
      `http://iapps.akij.net/asll/public/api/v1/auth/external-change-password`,
      postData,
    )
    .then((res) => {
      console.log('res change password', res.data);
      responseList.isLoading = false;
      responseList.data = res.data.data;
      responseList.status = res.data.status;
      responseList.message = res.data.message;
      return responseList;
    })
    .catch((error) => {
      console.log('password change error', error);
      responseList.isLoading = false;
      responseList.message = res.data.message;
    });
  return responseList;
};
