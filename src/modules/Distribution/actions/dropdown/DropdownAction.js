import * as Types from '../types/Types';
import axios from 'axios';
import * as url from '../../DistributionConfig.json';
import {getUserId} from '../../../User/util/AuthData';

export const GetBusinessDropdown = () => {
  let responseList = {
    isLoading: true,
    data: [
      {label: 'akij food', value: 1, selected: true},
      {label: 'akij cement', value: 2},
    ],
  };
  dispatch({type: Types.GET_BUSINESS_DROPDOWN, payload: responseList});
};
export const GetStatusDropdown = () => async (dispatch) => {
  let responseList = {
    isLoading: true,
    data: [
      {label: 'active', value: 1},
      {label: 'inactive', value: 2},
    ],
  };
  dispatch({type: Types.GET_STATUS_DROPDOWN, payload: responseList});
};
