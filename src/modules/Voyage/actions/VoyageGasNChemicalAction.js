import * as Types from "../types/Types";
import { getUnitId, getUserId } from "../../User/util/AuthData";
import { currentdate } from "../../Master/Util/DateConfigure";
import axios from "axios";

export const submitVoyageGasNChemicalAction = async (state) => {
  let payloadData = {
    isLoading: false,
    data: [],
    status: false,
    message: "",
  };
  const intUnitID = await getUnitId();
  const url = `http://iapps.akij.net/asll/public/api/v1/asll/voyageActivity/vlsfoStore`;

  const postData = {
    intUnitId: intUnitID,
    intVoyageID: parseInt(state.intVoyageID),
    intShipPositionID: parseInt(state.intShipPositionID),
    intShipConditionTypeID: parseInt(state.intShipConditionTypeID),
    dteCreatedAt: state.dteCreatedAt,
    strRPM: state.strRPM.trim(),

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
    strRemarks:state.strRemarks,
    intCreatedBy: await getUserId(),
  };
  console.log("postData:>> ", postData);
  try {
    payloadData.isLoading = true;
    axios.post(url, postData).then((res) => {
      payloadData.data = res.data.data;
      payloadData.isLoading = false;
      payloadData.status = true;
      payloadData.message = res.data.message;
      return payloadData;
    });
  } catch (error) {
    console.log("error :>> ", error);
    payloadData.isLoading = false;
  }
  return payloadData;
};

export const getGasNChemicalItemListAction = async () => {
  let gasNChemicalListData = {
    isLoading: false,
    data: [],
    status: false,
  };
  const url = `http://iapps.akij.net/asll/public/api/v1/asll/voyageActivity/indexGasNChemical`;

  try {
    gasNChemicalListData.isLoading = true;
    return axios.get(url).then(async (res) => {
      gasNChemicalListData.data = res.data.data;
      gasNChemicalListData.isLoading = false;
      gasNChemicalListData.status = true;
      return gasNChemicalListData;
    });
  } catch (error) {
    console.log("error", error);
    gasNChemicalListData.isLoading = false;
  }
  return gasNChemicalListData;
};

export const createVoyageGasNChemical = async (defaultData, newData) => {
  let responseList = {
    isLoading: false,
    data: {},
    status: "",
  };

  responseList.isLoading = true;

  const userID = await getUserId();
  let unitId = await getUnitId();

  let postData = {
    intUnitId: unitId,
    intVoyageID: defaultData.voyagePropsData.intID,
    intShipPositionID: defaultData.positionSelected,
    intShipConditionTypeID: defaultData.intShipConditionTypeId,
    dteCreatedAt: defaultData.voyagePropsData.created_at,
    strRPM: defaultData.strRPM,
    decEngineSpeed: defaultData.decEngineSpeed,
    decSlip: defaultData.decSlip,
    voyageGasNChemical: [],
    strRemarks: newData.strRemarks,
  };

  for (let i = 0; i < newData.gasNChemicalList.length; i++) {
    const element = newData.gasNChemicalList[i];
    let PostDataObj = {
      intGasNChemicalId: element.intGasNChemicalId,
      strGasNChemicalName: element.strGasNChemicalName,
      decBFWD: element.decBFWD,
      decRecv: element.decRecv,
      dectotal: element.dectotal,
      decCons: element.decCons,
      intCreatedBy: userID,
    };
    postData.voyageGasNChemical.push(PostDataObj);
  }

  await axios
    .post(
      `http://iapps.akij.net/asll/public/api/v1/asll/voyageActivity/voyageGasNChemicalStore`,
      postData,
      {}
    )
    .then((res) => {
      responseList.isLoading = false;
      responseList.data = res.data;
      responseList.status = res.status;
    })
    .catch((error) => {
      responseList.isLoading = false;
    });
  return responseList;
};
