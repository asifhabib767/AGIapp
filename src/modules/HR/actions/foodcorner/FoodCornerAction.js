import * as React from 'react';
import axios from 'axios';
import { server_api_base_url } from '../../HrConfig.json';
import { getUnit, getUserId } from '../../../Sales/service/auth/AuthService';
import { getUnitId } from '../../../User/util/AuthData';
import Axios from 'axios';

export const getCafeteriaMenuList = async () => {
    let responseList = {
        isLoading: true,
        data: {},
    };
    const intEmployeeId = await getUserId();
    await axios
        .get(`${server_api_base_url}/hr/getCafeteriaMenuList?intEmployeeId=${intEmployeeId}`)
        .then((res) => {
            responseList.isLoading = false;
            responseList = res.data.data;
        })
        .catch((error) => {
            responseList.isLoading = false;
        });
    return responseList;
};


export const getScheduleMealList = async () => {
    let responseList = {
        isLoading: true,
        data: {},
    };
    const intEmployeeId = await getUserId();
    await axios
        .get(`${server_api_base_url}/hr/getMealList?intEmployeeId=${intEmployeeId}&ysnConsumed=false`)
        .then((res) => {
            responseList.isLoading = false;
            responseList = res.data.data;
        })
        .catch((error) => {
            responseList.isLoading = false;
        });
    return responseList;
};

export const getConsumedMealList = async () => {
    let responseList = {
        isLoading: true,
        data: {},
    };
    const intEmployeeId = await getUserId();
    await axios
        // .get(`${wearehouse_list_by_employee_id}?intEmployeeId=${intEmployeeId}`)
        .get(`${server_api_base_url}/hr/getMealList?intEmployeeId=422905&ysnConsumed=true`)
        .then((res) => {
            responseList.isLoading = false;
            responseList = res.data.data;
        })
        .catch((error) => {
            responseList.isLoading = false;
        });
    return responseList;
};


export async function DeleteMeal(dteMeal) {
    let intEnroll = await getUserId();

    let data = [];
    let deleteData = {
        intEnroll: intEnroll,
        dteMeal: dteMeal
    };

    console.log('deleteData', deleteData)
    return Axios.put(
        `${server_api_base_url}/hr/deleteMealList?dteMeal=${dteMeal}&intEnroll=${intEnroll}`,
        {},
    )
        .then(function (response) {
            return true;
        })
        .catch(function (error) {
            console.log(error);
        });

    return false;
}