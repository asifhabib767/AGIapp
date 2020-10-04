import axios from "axios";
import { currentdate } from "../../Master/Util/DateConfigure";
import { getUnitId, getUserId } from "../../User/util/AuthData";

export const exhtEngineOneSubmit = async (defaultData, newData) => {
  let responseList = {
    isLoading: false,
    data: {},
    status: "",
  };

  responseList.isLoading = true;

  const userID = await getUserId();
  let unitId = await getUnitId();
  let currentDate = currentdate();

  let postData = {
    intUnitId: unitId,
    intVoyageID: defaultData.voyagePropsData.intID,
    intShipPositionID: defaultData.positionSelected,
    intShipConditionTypeID: defaultData.intShipConditionTypeId,
    dteCreatedAt: currentDate,
    strRPM: defaultData.strRPM,
    decEngineSpeed: parseFloat(defaultData.decEngineSpeed),
    decSlip: parseFloat(defaultData.decSlip),
    intShipEngineID: 2,
    strShipEngineName: "Exht. Engine 1",
    dceMainEngineFuelRPM: parseFloat(newData.dceMainEngineFuelRPM),
    dceRH: parseFloat(newData.dceRH),
    dceLoad: parseFloat(newData.dceLoad),
    dceExhtTemp1: parseFloat(newData.dceExhtTemp1),
    dceExhtTemp2: parseFloat(newData.dceExhtTemp2),
    dceJacketTemp: parseFloat(newData.dceJacketTemp),
    dceScavTemp: parseFloat(newData.dceScavTemp),
    dceLubOilTemp: parseFloat(newData.dceLubOilTemp),
    dceTCRPM: parseFloat(newData.dceTCRPM),
    dceJacketPressure: parseFloat(newData.dceJacketPressure),
    dceScavPressure: parseFloat(newData.dceScavPressure),
    dceLubOilPressure: parseFloat(newData.dceLubOilPressure),
    strRemarks: newData.strRemarks,
    intCreatedBy: userID,
  };

  await axios
    .post(
      `http://iapps.akij.net/asll/public/api/v1/asll/voyageActivity/exhtStore`,
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

export const exhtEngineTwoSubmit = async (defaultData, newData) => {
  let responseList = {
    isLoading: false,
    data: {},
    status: "",
  };

  responseList.isLoading = true;

  const userID = await getUserId();
  let unitId = await getUnitId();
  let currentDate = currentdate();

  let postData = {
    intUnitId: unitId,
    intVoyageID: defaultData.voyagePropsData.intID,
    intShipPositionID: defaultData.positionSelected,
    intShipConditionTypeID: defaultData.intShipConditionTypeId,
    dteCreatedAt: currentDate,
    strRPM: defaultData.strRPM,
    decEngineSpeed: parseFloat(defaultData.decEngineSpeed),
    decSlip: parseFloat(defaultData.decSlip),
    intShipEngineID: 3,
    strShipEngineName: "Exht. Engine 2",
    dceMainEngineFuelRPM: 0.0,
    dceRH: parseFloat(newData.dceRH),
    dceLoad: parseFloat(newData.dceLoad),
    dceExhtTemp1: parseFloat(newData.dceExhtTemp1),
    dceExhtTemp2: parseFloat(newData.dceExhtTemp2),
    dceJacketTemp: parseFloat(newData.dceJacketTemp),
    dceScavTemp: parseFloat(newData.dceScavTemp),
    dceLubOilTemp: parseFloat(newData.dceLubOilTemp),
    dceTCRPM: parseFloat(newData.dceTCRPM),
    dceJacketPressure: parseFloat(newData.dceJacketPressure),
    dceScavPressure: parseFloat(newData.dceScavPressure),
    dceLubOilPressure: parseFloat(newData.dceLubOilPressure),
    intCreatedBy: userID,
  };
  await axios
    .post(
      `http://iapps.akij.net/asll/public/api/v1/asll/voyageActivity/exhtStore`,
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

export const exhtEngineThreeSubmit = async (defaultData, newData) => {
  let responseList = {
    isLoading: false,
    data: {},
    status: "",
  };

  responseList.isLoading = true;

  const userID = await getUserId();
  let unitId = await getUnitId();
  let currentDate = currentdate();

  let postData = {
    intUnitId: unitId,
    intVoyageID: defaultData.voyagePropsData.intID,
    intShipPositionID: defaultData.positionSelected,
    intShipConditionTypeID: defaultData.intShipConditionTypeId,
    dteCreatedAt: currentDate,
    strRPM: defaultData.strRPM,
    decEngineSpeed: parseFloat(defaultData.decEngineSpeed),
    decSlip: parseFloat(defaultData.decSlip),
    intShipEngineID: 4,
    strShipEngineName: "Exht. Engine 3",
    dceMainEngineFuelRPM: 0.0,
    dceRH: parseFloat(newData.dceRH),
    dceLoad: parseFloat(newData.dceLoad),
    dceExhtTemp1: parseFloat(newData.dceExhtTemp1),
    dceExhtTemp2: parseFloat(newData.dceExhtTemp2),
    dceJacketTemp: parseFloat(newData.dceJacketTemp),
    dceScavTemp: parseFloat(newData.dceScavTemp),
    dceLubOilTemp: parseFloat(newData.dceLubOilTemp),
    dceTCRPM: parseFloat(newData.dceTCRPM),
    dceJacketPressure: parseFloat(newData.dceJacketPressure),
    dceScavPressure: parseFloat(newData.dceScavPressure),
    dceLubOilPressure: parseFloat(newData.dceLubOilPressure),
    intCreatedBy: userID,
  };
  await axios
    .post(
      `http://iapps.akij.net/asll/public/api/v1/asll/voyageActivity/exhtStore`,
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
