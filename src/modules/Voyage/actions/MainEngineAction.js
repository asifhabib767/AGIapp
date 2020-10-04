import axios from "axios";
import { currentdate } from "../../Master/Util/DateConfigure";
import { getUnitId, getUserId } from "../../User/util/AuthData";

export const mainEngineSubmit = async (defaultData, newData) => {
  let responseList = {
    isLoading: false,
    data: {},
    status: "",
  };

 

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
    intShipEngineID: 1,
    strShipEngineName: "Main Engine",
    dceJacketTemp1: parseFloat(newData.dceJacketTemp1),
    dceJacketTemp2: parseFloat(newData.dceJacketTemp2),
    dcePistonTemp1: parseFloat(newData.dcePistonTemp1),
    dcePistonTemp2: parseFloat(newData.dcePistonTemp2),
    dceExhtTemp1: parseFloat(newData.dceExhtTemp1),
    dceExhtTemp2: parseFloat(newData.dceExhtTemp2),
    dceScavTemp1: parseFloat(newData.dceScavTemp1),
    dceScavTemp2: parseFloat(newData.dceScavTemp2),
    dceTurboCharger1Temp1: parseFloat(newData.dceTurboCharger1Temp1),
    dceTurboCharger1Temp2: parseFloat(newData.dceTurboCharger1Temp2),
    dceEngineLoad: parseFloat(newData.dceEngineLoad),
    dceJacketCoolingTemp1: parseFloat(newData.dceJacketCoolingTemp1),
    dcePistonCoolingTemp1: parseFloat(newData.dcePistonCoolingTemp1),
    dceLubOilCoolingTemp1: parseFloat(newData.dceLubOilCoolingTemp1),
    dceFuelCoolingTemp1: parseFloat(newData.dceFuelCoolingTemp1),
    dceScavCoolingTemp1: parseFloat(newData.dceScavCoolingTemp1),
    strRemarks: newData.strRemarks,
    intCreatedBy: userID,
  };
  console.log ('postData',postData);

  await axios
    .post(
      `http://iapps.akij.net/asll/public/api/v1/asll/voyageActivity/engineStore`,
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
