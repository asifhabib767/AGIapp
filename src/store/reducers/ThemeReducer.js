import * as Types from '../actions/Types';

// Initial state
const initialState = {
  currentActiveNav: 0,
};

const ThemeReducer = (state = initialState, action) => {
  const newState = {...state};

  switch (action.type) {
    case Types.GET_BOTTOM_NAV:
      let newState = {...state};
      return {
        ...newState,
        currentActiveNav: action.payload,
      };

    case Types.CHANGE_BOTTOM_NAV:
      let newStateChange = {...state};
      return {
        ...newStateChange,
        currentActiveNav: action.payload,
      };
    default:
      break;
  }
  return newState;
};

export default ThemeReducer;
