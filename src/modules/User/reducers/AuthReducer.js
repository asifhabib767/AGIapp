import * as Types from '../types/Types';

// Initial state
const initialState = {
  isLoading: false,
  isLoggedIn: false,
  userData: {},
  tokenData: '',
};

const AuthReducer = (state = initialState, action) => {
  const newState = {...state};

  switch (action.type) {
    case Types.GET_AUTH_DATA:
      return {
        ...state,
        isLoggedIn: action.payload.isLoggedIn,
        isLoading: action.payload.isLoading,
        userData: action.payload.userData,
      };
    default:
      break;
  }
  return newState;
};

export default AuthReducer;
