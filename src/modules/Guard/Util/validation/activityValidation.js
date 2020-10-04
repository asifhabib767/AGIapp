import {Alert} from 'react-native';
export function ActivityValidation(
  name,
) {
  // let errorMsg = '';

  let errorMsg = {};

  if (name === '') {
    errorMsg.name = 'Please Type an Activity Name';
  }

  let activityerror = {
    errorMsg: errorMsg,
  };
  //console.log(errorMsg);
  return activityerror;
}
