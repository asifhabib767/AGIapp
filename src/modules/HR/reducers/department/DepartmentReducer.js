import * as Types from '../../actions/types/Types';

// Initial state
const initialState = {
  departmentList: [],
  businessListDDL: [],
  refreshing: false,
  editData: [],
  isLoading: false,
  status: false,
  departmentListStatus: false,
  message: '',
  data: {},
  tokenData: '',
  inputData: {
    editId: '',
    name: '',
    code: '',
    userId: '',
    businessId: '',
    businessName: '',
    statusId: '',
    statusName: 'active',
  },
};

const DepartmentReducer = (state = initialState, action) => {
  const newState = {...state};

  switch (action.type) {
    case Types.GET_DEPARTMENT:
      return {
        ...state,
        departmentList: action.payload.data.data,
        isLoading: action.payload.isLoading,
        status: false,
        departmentListStatus: true,
      };
    case Types.ADD_DEPARTMENT_HANDELING:
      const cloneObj = {...state.inputData};
      cloneObj[action.payload.inputName] = action.payload.inputValue;
      return {
        ...state,
        inputData: cloneObj,
      };
    case Types.SELECT_DEPARTMENT_OPTIONS:
      const payload = action.payload;
      let inputValues = {...state.inputData};
      if (payload.inputName === 'businessId') {
        inputValues.businessId = payload.inputValue.value;
        inputValues.businessName = payload.inputValue.label;
      }
      if (payload.inputName === 'status') {
        inputValues.statusId = payload.inputValue.value;
        inputValues.statusName = payload.inputValue.label;
      }
      return {
        ...state,
        inputData: inputValues,
      };
    case Types.POST_DEPARTMENT:
      return {
        ...state,
        message: action.payload.message,
        status: action.payload.status,
        inputData: {},
      };
    case Types.EDIT_DEPARTMENT:
      let editValues = {...state.inputData};
      editValues.name = action.payload.data.Name;
      editValues.code = action.payload.data.Code;
      editValues.editId = action.payload.data.Id;
      editValues.businessId = action.payload.data.BusinessId;
      editValues.statusId = action.payload.data.Status;
      editValues.statusName = action.payload.data.statusName;

      return {
        ...state,
        inputData: editValues,
        isLoading: action.payload.isLoading,
        status: false,
      };
    case Types.UPDATE_DEPARTMENT:
      return {
        ...state,
        message: action.payload.message,
        status: action.payload.status,
      };
    case Types.EMPTY_DEPARTMENT_MESSAGE:
      return {
        ...state,
        message: '',
      };
    case Types.REFRESING_CONTROL:
      return {
        ...state,
        refreshing: action.payload,
        inputData: {},
      };

    default:
      break;
  }
  return newState;
};

export default DepartmentReducer;
