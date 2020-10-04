import * as Types from '../actions/Types';

// Initial state
const initialState = {
  inputData: {
    name: '',
    fathername: '',
  },
};

const FormReducer = (state = initialState, action) => {
  const newState = {...state};

  switch (action.type) {
    case Types.CREATE_FORM_INPUT:
      const newForm = {...state.inputData};
      newForm[action.payload.key] = action.payload.value;
      return {
        ...state,
        inputData: newForm,
      };
    default:
      break;
  }
  return newState;
};

export default FormReducer;
