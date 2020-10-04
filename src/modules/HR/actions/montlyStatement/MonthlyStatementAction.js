import * as React from 'react';
import axios from 'axios';
import * as url from '../../HrConfig.json';
import { getUnit, getUserId } from '../../../Sales/service/auth/AuthService';
import { getUnitId } from '../../../User/util/AuthData';

export const getSalaryStatement = async () => {
    let responseList = {
        isLoading: true,
        data: {},
    };
    const intEmployeeId = await getUserId();
    await axios
        // .get(`${wearehouse_list_by_employee_id}?intEmployeeId=${intEmployeeId}`)
        .get(`http://iapps.akij.net/asll/public/api/v1/hr/getSalaryStatement?intEmployeeId=${intEmployeeId}`)
        .then((res) => {
            console.log('SalaryStatement', res.data.data);
            responseList.isLoading = false;
            responseList = res.data.data;
        })
        .catch((error) => {
            responseList.isLoading = false;
        });
    return responseList;
};

