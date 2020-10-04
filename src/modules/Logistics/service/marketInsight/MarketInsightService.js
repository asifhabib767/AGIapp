import {api_post_insight_marketing, api_get_marketinsight_report } from '../../../config.json';
import {getToken} from '../tokens/TokenService';
import Axios from 'axios';
import {getUserEmail, getUnit, getEmployeeID} from '../auth/AuthService.js';
import  AsyncStorage  from '@react-native-community/async-storage';
import { Actions } from 'react-native-router-flux';
import { Alert } from 'react-native';

export async function  getRoute() {

  let data = [];

  let headersData = {
    'Authorization': `bearer ${await getToken()}`,
    'Content-Type': 'application/json',
  };
  
 try {
  if(api_get_route.length !== 0){
          await Axios.get(`${api_get_route}?intID=77729`, {headers: headersData})
          .then((res) => {
              data = res.data;
              console.log('Distributors Data: ',data);
          });
      } 
  }
 catch (error) {
     console.log('Error enter: ', error);
 }
  return data;
}

export async function postMarketInsight(strType, strItemName, strComments, strMarketInsightImagePath, strTag,outlet) {
    // console.log('Parameter: ',strType,strItemName,strComments,strMarketInsightImagePath,strTag)
    let outletResponse = "";
    let intInsertBy = await getEmployeeID();
    let intUnitID = await getUnit();
    let intOutletID = outlet.intOutletID;
    let strOutletName =outlet.strOutletName;
    let intTypeID = 1;

    console.log('Image Path Get:', strMarketInsightImagePath);

    if(strMarketInsightImagePath.length == 0){
      strMarketInsightImagePath = "test";
    }
 
  let headersData = {
    'Authorization': `bearer ${await getToken()}`,
    'Content-Type': 'application/json',
  };
  
  let url = `${api_post_insight_marketing}?intOutletID=${intOutletID}&strOutletName=${strOutletName}&intTypeID=${intTypeID}&strType=${strType}&strItemName=${strItemName}&strComments=${strComments}&strMarketInsightImagePath=${strMarketInsightImagePath}&strTag=${strTag}&intInsertBy=${intInsertBy}&intUnitID=${intUnitID}`;
  await Axios.post(url, {}, {headers: headersData})

    .then(response => {
      outletResponse = response.data;
      if(outletResponse.length != 0){
        Alert.alert('Success', 'Market Insight Added !');
        Actions.ContactList({ page : 'MarketInsight' });
      }else{
      }
      console.log('Response: ', response);
    })
    .catch(error => {
      console.log('Error: ', error);
    })

  console.log('Enter postMarketInsight() last');
  return outletResponse;
}
export async function getMarketInsight(intOutletID) {
  // console.log('Parameter value: ',strRequisitionType, strItem, numQuantity, strPromotionItemImagePath, strComments)
  let outletResponse = "";
  let headersData = {
      'Authorization': `bearer ${await getToken()}`,
      'Content-Type': 'application/json',
  };
  
  let url = `${api_get_marketinsight_report}?intUnitID=${intOutletID}`;
  await Axios.get(url, { headers: headersData })

  .then(response => {
    console.log(url);
          outletResponse = response.data;
          console.log('outaltss',outletResponse);
      })
      .catch(error => {
          console.log('url', url);
      })

  return outletResponse;
}

