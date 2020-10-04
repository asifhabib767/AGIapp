import * as Types from "../../actions/types/Types";

// Initial state
const initialState = {
  vehicleList: [],
  searchList: [],
  businessListDDL: [],
  refreshing: false,
  editData: [],
  isLoading: false,
  status: false,
  message: "",
  data: {},
  tokenData: "",
  inputData: {
    editId: "",
    name: "",
    code: "",
    vehicleno: "",
    userId: "",
    businessId: "",
    businessName: "",
    statusId: 1,
    statusName: "active",
  },
  tripDetails: [],
  assignVehicleData: {},
};

const DistributionReducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case Types.GET_VEHICLE_LIST:
      return {
        ...state,
        vehicleList: action.payload.data.data,
        isLoading: action.payload.isLoading,
        status: false,
      };
    case Types.SEARCH_VEHICLE:
      let inputValues = { ...state.inputData };
      inputValues.vehicleno = action.payload.data.inputValue;
      let searchVehicleList = [];
      if (action.payload.data.inputValue.length === 0) {
        searchVehicleList = [];
      } else {
        searchVehicleList = state.vehicleList.filter(function (item) {
          const itemData = item.strType
            ? item.strUnit.toUpperCase()
            : "".toUpperCase();
          const textData = action.payload.data.inputValue.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
      }
      return {
        ...state,
        inputData: inputValues,
        searchList: searchVehicleList,
        status: true,
      };

    case Types.GET_TRIP_DETAILS:
      return {
        ...state,
        tripDetails: action.payload.data.data,
        isLoading: action.payload.isLoading,
        status: false,
      };

    case Types.POST_VEHICLE_ASSIGN:
      return {
        ...state,
        message: action.payload.message,
        status: action.payload.status,
        assignVehicleData: {},
      };

    // case Types.SELECT_DEPARTMENT_OPTIONS:
    //   const payload = action.payload;
    //   let inputValues = {...state.inputData};
    //   if (payload.inputName === 'businessId') {
    //     inputValues.businessId = payload.inputValue.value;
    //     inputValues.businessName = payload.inputValue.label;
    //   }
    //   if (payload.inputName === 'status') {
    //     inputValues.statusId = payload.inputValue.value;
    //     inputValues.statusName = payload.inputValue.label;
    //   }
    //   return {
    //     ...state,
    //     inputData: inputValues,
    //   };
    // case Types.POST_DEPARTMENT:
    //   return {
    //     ...state,
    //     message: action.payload.message,
    //     status: action.payload.status,
    //     inputData: {},
    //   };
    // case Types.EDIT_DEPARTMENT:
    //   let editValues = {...state.inputData};
    //   editValues.name = action.payload.data.Name;
    //   editValues.code = action.payload.data.Code;
    //   editValues.editId = action.payload.data.Id;
    //   editValues.businessId = action.payload.data.businessId;
    //   editValues.statusName = 'active';
    //   return {
    //     ...state,
    //     inputData: editValues,
    //     isLoading: action.payload.isLoading,
    //     status: false,
    //   };

    // case Types.EMPTY_DEPARTMENT_MESSAGE:
    //   return {
    //     ...state,
    //     message: '',
    //   };
    // case Types.REFRESING_CONTROL:
    //   return {
    //     ...state,
    //     refreshing: action.payload,
    //     inputData: {},
    //   };
    // case Types.UPDATE_DEPARTMENT:
    //   return {
    //     ...state,
    //     message: action.payload.message,
    //     status: action.payload.status,
    //   };

    default:
      break;
  }
  return newState;
};

export default DistributionReducer;
