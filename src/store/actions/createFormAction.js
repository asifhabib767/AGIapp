import * as Types from './Types';

export const inputHandling = (key, val) => async (dispatch) => {
  let data = {
    key: key,
    value: val,
  };
  console.log('action data', data);
  dispatch({type: Types.CREATE_FORM_INPUT, payload: data});
};
