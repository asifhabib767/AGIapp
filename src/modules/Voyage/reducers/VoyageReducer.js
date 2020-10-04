import * as Types from '../types/Types';

// Initial state
const initialState = {
  voyageList: [],
  vesselList: [],
  isLoading: false,
  voyageAddStatus: false,
  voyageAddMessage: '',
  voyageEditStatus: false,
  voyageEditMessage: '',
};

const VoyageReducer = (state = initialState, action) => {
  const newState = {...state};
  switch (action.type) {
    case Types.GET_VOYAGE_LIST:
      return {
        ...state,
        voyageList: action.payload.data,
        isLoading: action.payload.isLoading,
      };
    case Types.GET_VESSEL_LIST:
      return {
        ...state,
        vesselList: action.payload.data,
        isLoading: action.payload.isLoading,
      };
    default:
      break;
  }
  return newState;
};

export default VoyageReducer;
