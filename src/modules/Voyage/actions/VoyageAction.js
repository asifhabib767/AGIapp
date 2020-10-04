import * as Types from '../types/Types';
import axios from 'axios';
import {getUnitId} from '../../User/util/AuthData';
import {currentdate} from '../../Master/Util/DateConfigure';

// For Redux (Don't delete, keep for future use)
// export const getVoyageListAction = () => async (dispatch) => {
//   let payloadData = {
//     isLoading: false,
//     data: [],
//     status: false,
//   };
//   const url = `http://iapps.akij.net/asll/public/api/v1/asll/voyage`;

//   try {
//     payloadData.isLoading = true;
//     dispatch({ type: Types.GET_VOYAGE_LIST, payload: payloadData });
//     await axios.get(url).then(async (res) => {
//       payloadData.data = res.data.data;
//       payloadData.isLoading = false;
//       payloadData.status = true;
//     });
//   } catch (error) {
//     console.log("error", error);
//     payloadData.isLoading = false;
//   }
//   dispatch({ type: Types.GET_VOYAGE_LIST, payload: payloadData });
// };

export const getVoyageListAction = async () => {
  let payloadData = {
    isLoading: false,
    data: [],
    status: false,
  };
  const url = `http://iapps.akij.net/asll/public/api/v1/asll/voyage`;

  try {
    payloadData.isLoading = true;
    await axios.get(url).then(async (res) => {
      payloadData.data = res.data.data;
      payloadData.isLoading = false;
      payloadData.status = true;
    });
  } catch (error) {
    console.log('error', error);
    payloadData.isLoading = false;
  }
  return payloadData;
};

export const getVesselListListAction = async () => {
  let payloadData = {
    isLoading: false,
    data: [],
    status: false,
  };
  const url = `http://iapps.akij.net/asll/public/api/v1/asll/vessel`;

  try {
    payloadData.isLoading = true;
    // dispatch({type: Types.GET_VESSEL_LIST, payload: payloadData});
    return axios.get(url).then(async (res) => {
      payloadData.data = res.data.data;
      payloadData.isLoading = false;
      payloadData.status = true;
      return payloadData;
    });
  } catch (error) {
    console.log('error', error);
    payloadData.isLoading = false;
  }
  // dispatch({type: Types.GET_VESSEL_LIST, payload: payloadData});
  return payloadData;
};

export const getCargoListListAction = async () => {
  let payloadData = {
    isLoading: false,
    data: [],
    status: false,
  };
  const url = `http://iapps.akij.net/asll/public/api/v1/asll/voyage/cargo`;

  try {
    payloadData.isLoading = true;
    return axios.get(url).then(async (res) => {
      payloadData.data = res.data.data;
      payloadData.isLoading = false;
      payloadData.status = true;
      return payloadData;
    });
  } catch (error) {
    console.log('error', error);
    payloadData.isLoading = false;
  }
  return payloadData;
};

export const getPortsAction = async () => {
  let payloadData = {
    isLoading: false,
    data: [],
    status: false,
  };
  const url = `http://iapps.akij.net/asll/public/api/v1/asll/voyage/ports`;

  try {
    payloadData.isLoading = true;
    return axios.get(url).then(async (res) => {
      payloadData.data = res.data.data;
      payloadData.isLoading = false;
      payloadData.status = true;
      return payloadData;
    });
  } catch (error) {
    payloadData.isLoading = false;
  }
  return payloadData;
};
export const voyageWindDirection = async () => {
  let responsList = {
    isLoading: false,
    data: [],
    status: false,
  };

  let windData = [
    {
      id: 1,
      name: 'N',
    },
    {
      id: 1,
      name: 'NNE',
    },
    {
      id: 2,
      name: 'NE',
    },
    {
      id: 3,
      name: 'ENE',
    },
    {
      id: 3,
      name: 'E',
    },
    {
      id: 5,
      name: 'ESE',
    },
    {
      id: 6,
      name: 'SE',
    },
    {
      id: 7,
      name: 'SSE',
    },
    {
      id: 8,
      name: 'S',
    },
    {
      id: 9,
      name: 'SSW',
    },
    {
      id: 10,
      name: 'SW',
    },
    {
      id: 11,
      name: 'WSW',
    },
    {
      id: 12,
      name: 'W',
    },
    {
      id: 13,
      name: 'WNW',
    },
    {
      id: 1,
      name: 'NW',
    },
    {
      id: 14,
      name: 'NNW',
    },
    {
      id: 15,
      name: 'N',
    },
  ];
  responsList.data = windData;
  // const url = `http://iapps.akij.net/asll/public/api/v1/asll/voyage/ports`;

  return responsList;
};

export const submitVoyageAction = async (state) => {
  let payloadData = {
    isLoading: false,
    data: [],
    status: false,
    message: '',
  };
  const url = `http://iapps.akij.net/asll/public/api/v1/asll/voyage/store`;

  const postData = {
    strVesselName: state.strVesselName.trim(),
    intVesselID: parseInt(state.intVesselID),
    intVoyageNo: parseInt(state.intVoyageNo),
    intCargoTypeID: parseInt(state.intCargoTypeID),
    strCargoTypeName: state.strCargoTypeName.trim(),
    intCargoQty: parseInt(state.intCargoQty),
    dteVoyageDate: state.dteVoyageDate,
    strPlaceOfVoyageCommencement: state.strPlaceOfVoyageCommencement.trim(),
    decBunkerQty: parseFloat(state.decBunkerQty),
    decDistance: parseFloat(state.decDistance),
    intFromPortID: parseInt(state.intFromPortID),
    strFromPortName: state.strFromPortName.trim(),
    intToPortID: parseInt(state.intToPortID),
    strToPortName: state.strToPortName.trim(),
  };

  console.log('postData', postData);

  try {
    payloadData.isLoading = true;
    return axios.post(url, postData).then((res) => {
      payloadData.data = res.data.data;
      payloadData.isLoading = false;
      payloadData.status = true;
      payloadData.message = res.data.message;
      return payloadData;
    });
  } catch (error) {
    payloadData.isLoading = false;
  }
  return payloadData;
};

export const getShipConditionType = async () => {
  let shipConditionTypeData = {
    isLoading: false,
    data: [],
    status: false,
  };
  const url = `http://iapps.akij.net/asll/public/api/v1/asll/getShipConditionType`;

  try {
    shipConditionTypeData.isLoading = true;
    // dispatch({type: Types.GET_VESSEL_LIST, payload: shipConditionTypeData});
    return axios.get(url).then(async (res) => {
      shipConditionTypeData.data = res.data.data;
      shipConditionTypeData.isLoading = false;
      shipConditionTypeData.status = true;
      return shipConditionTypeData;
    });
  } catch (error) {
    console.log('error', error);
    shipConditionTypeData.isLoading = false;
  }
  // dispatch({type: Types.GET_VESSEL_LIST, payload: shipConditionTypeData});
  return shipConditionTypeData;
};
export const voyageActivitybyDate = async (intVoyageID) => {
  let responseList = {
    isLoading: true,
    data: {},
  };
  let intUnitId = await getUnitId();

  let date = currentdate();
  console.log('date', date);

  await axios
    // .get(`${wearehouse_list_by_employee_id}?intEmployeeId=${intEmployeeId}`)
    .get(
      `http://iapps.akij.net/asll/public/api/v1/asll/voyageActivity/showByDate?date=${date}&intVoyageID=${intVoyageID}`,
    )
    .then((res) => {
      console.log('res voyage', res);
      responseList.isLoading = false;
      responseList.data = res.data.data;
    })
    .catch((error) => {
      console.log('error', error);
      responseList.isLoading = false;
    });
  return responseList;
};

export const createVoyageActivity = async (data) => {
  console.log('data is', data);
  let payloadData = {
    isLoading: false,
    data: [],
    status: false,
    message: '',
  };
  const url = `http://iapps.akij.net/asll/public/api/v1/asll/voyageActivity/store`;

  let unitId = await getUnitId();

  const postData = {
    intUnitId: unitId,
    intVoyageID: data.voyagePropsData.intID,
    intShipPositionID: data.positionSelected,
    intShipConditionTypeID: data.intShipConditionTypeId,
    dteCreatedAt: data.date,
    decLatitude: data.latitude,
    decLongitude: data.longitude,
    intCourse: data.course,
    timeSeaStreaming: data.streaming,
    timeSeaStoppage: data.stoppage,
    decSeaDistance: data.seaDistance,
    decSeaDailyAvgSpeed: data.dailySpeed,
    decSeaGenAvgSpeed: data.generalSpeed,
    strSeaDirection: data.seaSelected.name,
    strSeaState: data.seaDSS,
    strWindDirection: data.windSelected.name,
    decWindBF: data.windBF,
    intETAPortToID: data.voyagePropsData.intToPortID,
    strETAPortToName: '',
    intETDPortToID: 0,
    strETDPortToName: '',
    strETADateTime: data.etaTime,
    strRemarks: data.remarks,

    intVoyagePortID: 0,
    decTimePortWorking: 0,
    strPortDirection: '',
    strPortDSS: '',
    strETDDateTime: '',
    decCargoTobeLD: 0,
    decCargoPrevLD: 0,
    decCargoDailyLD: 0,
    decCargoTTLLD: 0,
    decCargoBalanceCGO: 0,
  };

  console.log('postData', postData);

  try {
    payloadData.isLoading = true;
    return axios.post(url, postData).then((res) => {
      payloadData.data = res.data.data;
      payloadData.isLoading = false;
      payloadData.status = true;
      payloadData.message = res.data.message;
      return payloadData;
    });
  } catch (error) {
    payloadData.isLoading = false;
  }
  return payloadData;
};
