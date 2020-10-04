import axios from 'axios';
import {Alert} from 'react-native';
import {getUnit} from '../../Sales/service/auth/AuthService';
import {getUserId} from '../../User/util/AuthData';
export async function boilerStore(state) {
  let unitId = await getUnit();
  let actionId = await getUserId();

  console.log('state', state);

  let responseList = {
    isLoading: true,
    data: {},
    status: false,
  };

  let postData = {
    intUnitId: unitId,
    intVoyageID: state.voyagePropsData.intID,
    intShipPositionID: state.voyageListData.positionSelected,
    intShipConditionTypeID: state.voyageListData.intShipConditionTypeId,
    dteCreatedAt: state.date,
    strRPM: state.voyageListData.strRPM,
    strRemarks: state.strRemarks,
    decEngineSpeed: parseFloat(state.voyageListData.decEngineSpeed),
    decSlip: parseFloat(state.voyageListData.decSlip),
    intShipEngineID: 0,
    strShipEngineName: 'string',
    boilerlists: [],
  };

  for (let i = 0; i < state.boilerList.length; i++) {
    const element = state.boilerList[i];
    console.log('element', element);
    let PostDataObj = {
      decWorkingPressure: parseFloat(element.decWorkingPressure),
      decPhValue: parseFloat(element.decPhValue),
      decChloride: parseFloat(element.decChloride),
      decAlkalinity: parseFloat(element.decAlkalinity),
      dteCreatedAt: element.date,
      intCreatedBy: actionId,
    };
    postData.boilerlists.push(PostDataObj);
    console.log('PostDataObj', postData);
  }

  const headers = {
    'Content-Type': 'application/json',
  };

  let postUrl = `http://iapps.akij.net/asll/public/api/v1/asll/voyageActivity/boilerStore`;
  let storeRequisitionPost = await axios
    .post(postUrl, postData, {headers: headers})
    .then(function (response) {
      console.log('response', response);
      responseList.data = response.data;
      responseList.isLoading = false;
      responseList.status = response.data.status;
    })
    .catch(function (error) {
      responseList.isLoading = false;
    });

  return responseList;
}

export async function checkBoilerValidation(state) {
  console.log('state', state);

  if (state.workingPressure == '') {
    Alert.alert('Error', 'Please type Working Pressure');
    return false;
  } else if (state.date == '') {
    Alert.alert('Error', 'Please select date');
    return false;
  } else if (state.phvalue == '') {
    Alert.alert('Error', 'Please type PH value');
    return false;
  } else if (state.chloride == '') {
    Alert.alert('Error', 'Please type Chloride value');
    return false;
  } else if (state.alkanlinity == '') {
    Alert.alert('Error', 'Please type Alkalinity value');
    return false;
  }
  return true;
}
