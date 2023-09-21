import { appConfig } from '../../config';
import {
    jsonHeaderAuth,
    refreshAuthLogic
} from '../fetchTools';
import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

export const getDataDiriByStatus = async () => {
    createAuthRefreshInterceptor(axios, refreshAuthLogic);
    const url = `${appConfig.BASE_API}/requestRO/readbystatus/1.0`;
    const result = await axios.get(url, jsonHeaderAuth())
        .then(res => {
            console.log('getDataDiriByStatus', res.data)
            return res.data
        })
        .catch(error => {
            // console.log('error', error)
            return null;
        })
    return result
};

export const updateDataDiriById = async (payload) => {
    try {
        // console.log(payload)
        const res = await fetch(`${appConfig.BASE_API}/user/update/${localStorage.getItem('id')}`, {
            method: 'POST',
            ...jsonHeaderAuth(),
            mode: 'cors',
            body: JSON.stringify(payload)
        })
        var data = await res.text()
        // try {
        //     data = await res.json()
        // } catch (error) {
        //     data = null
        // }
        return{status: res.status, data: data}
    } catch (error) {
        throw error
    }
}