import { appConfig } from '../../config';
import {
    jsonHeaderAuth,
    refreshAuthLogic
} from '../fetchTools';
import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

export const getCollectMeterById = async () => {
    createAuthRefreshInterceptor(axios, refreshAuthLogic);
    const url = `${appConfig.BASE_API}/meter/readbyid/29`;
    const result = await axios.get(url, jsonHeaderAuth())
        .then(res => {
            console.log('getCollectMeterById', res.data)
            return res.data
        })
        .catch(error => {
            // console.log('error', error)
            return null;
        })
    return result

};