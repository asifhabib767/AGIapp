import * as Types from '../types/Types';
import {getUnitId, getUserId} from '../../User/util/AuthData';
import axios from 'axios';
import {currentdate} from '../../HR/Utils/DateConfigure';

export const submitVoyageVlsfoAction = async (state) => {
  // let payloadData = {
  //   isLoading: false,
  //   data: [],
  //   status: false,
  //   message: '',
  // };

  console.log(state);

  let responseList = {
    isLoading: false,
    status: false,
    data: {},
  };
  const intUnitID = await getUnitId();
  let date = await currentdate();

  const url = `http://iapps.akij.net/asll/public/api/v1/asll/voyageActivity/vlsfoStore`;

  const postData = {
    intUnitId: intUnitID,
    intVoyageID: parseInt(state.intVoyageID),
    intShipPositionID: parseInt(state.intShipPositionID),
    intShipConditionTypeID: parseInt(state.intShipConditionTypeID),
    dteCreatedAt: date,
    strRPM: state.strRPM.trim(),
    strRemarks:state.strRemarks,
    decEngineSpeed: parseFloat(state.decEngineSpeed),
    decSlip: parseFloat(state.decSlip),
    decBunkerVlsfoCon: parseFloat(state.decBunkerVlsfoCon),
    decBunkerVlsfoAdj: parseFloat(state.decBunkerVlsfoAdj),
    decBunkerVlsfoRob: parseFloat(state.decBunkerVlsfoRob),
    decBunkerLsmgoCon: parseFloat(state.decBunkerLsmgoCon),
    decBunkerLsmgoAdj: parseFloat(state.decBunkerLsmgoAdj),
    decBunkerLsmgoRob: parseFloat(state.decBunkerLsmgoRob),
    decLubMeccCon: parseFloat(state.decLubMeccCon),
    decLubMeccAdj: parseFloat(state.decLubMeccAdj),
    decLubMeccRob: parseFloat(state.decLubMeccRob),
    decLubMecylCon: parseFloat(state.decLubMecylCon),
    decLubMecylAdj: parseFloat(state.decLubMecylAdj),
    decLubMecylRob: parseFloat(state.decLubMecylRob),
    decLubAeccCon: parseFloat(state.decLubAeccCon),
    decLubAeccAdj: parseFloat(state.decLubAeccAdj),
    decLubAeccRob: parseFloat(state.decLubAeccRob),
    intCreatedBy: await getUserId(),
  };
  console.log('postData:>> ', postData);
  try {
    await axios.post(url, postData).then((res) => {
      console.log('res blunker', res);
      responseList.data = res.data.data;
      responseList.isLoading = false;
      responseList.message = res.data.message;
      responseList.status = res.data.status;
    });
  } catch (error) {
    console.log('error :>> ', error);
    responseList.isLoading = false;
  }
  return responseList;
};
