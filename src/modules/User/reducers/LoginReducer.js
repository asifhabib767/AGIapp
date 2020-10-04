import * as Types from '../types/Types';

// Initial state
const initialState = {
  isLoading: false,
  status: false,
  logoutStatus: false,
  isLogin: false,
  message: '',
  data: {},
  tokenData: '',
  inputData: {
    username: 'ariful.asll', //01712003847 - Elahi Transport |masum.accl | mazharul1.accl // 01712070840-Customer,1235644 || Shipping-01923191858 || Driver-01961552624 ||reyad.accl||01715618713||masum.accl||ariful.asll
    password: '2087Arif*', //01712003847 - Elahi Transport | 2020@AKIJ  | tushar@7887  // 01712070840-Customer,1235644 || Shipping-01923191858 || Driver-01961552624 ||akij@999||01715618713||2020@AKIJ||2087Arif*
  },
};

const LoginReducer = (state = initialState, action) => {
  const newState = {...state};
  switch (action.type) {
    case Types.AUTH_LOGIN_INPUT_HANDELING:
      const cloneObj = {...state.inputData};
      cloneObj[action.payload.inputName] = action.payload.inputValue;
      return {
        ...state,
        inputData: cloneObj,
      };
    case Types.AUTH_LOGIN_CHECK:
      return {
        ...state,
        status: action.payload.status,
        message: action.payload.message,
        isLoading: action.payload.isLoading,
        data: action.payload.data,
        tokenData: action.payload.tokenData,
        isLogin: true,
      };
    case Types.GET_LOGOUT:
      return {
        ...state,
        logoutStatus: true,
        isLogin: false,
        message: '',
        status: false,
        // initialState,
      };
    case Types.EMPTY_LOGIN_MESSAGE:
      return {
        ...state,
        message: '',
      };
    default:
      break;
  }
  return newState;
};

export default LoginReducer;
