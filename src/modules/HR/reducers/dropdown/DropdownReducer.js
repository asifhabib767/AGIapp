import * as Types from '../../actions/types/Types';

// Initial state
const initialState = {
  businessListDDL: [],
  statusListDDL: [],
};

const DropdownReducer = (state = initialState, action) => {
  const newState = {...state};

  switch (action.type) {
    case Types.GET_BUSINESS_DROPDOWN:
      return {
        ...state,
        businessListDDL: action.payload.data,
      };
    case Types.GET_STATUS_DROPDOWN:
      return {
        ...state,
        statusListDDL: action.payload.data,
      };
    default:
      break;
  }
  return newState;
};

export default DropdownReducer;
