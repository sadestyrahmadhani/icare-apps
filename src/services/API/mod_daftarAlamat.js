import { appConfig } from '../../config';
import {
    jsonHeaderAuth,
    refreshAuthLogic
} from '../fetchTools';
import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

export const getDaftarAlamat = async () => {
    createAuthRefreshInterceptor(axios, refreshAuthLogic);
    const url = `${appConfig.BASE_API}/useraddress/read/12`;
    console.log('api link', url)
    const result = await axios.get(url, jsonHeaderAuth())
        .then(res => {
            console.log('getDaftarAlamat', res.data)
            return res.data
        })
        .catch(error => {
            // console.log('error', error)
            return null;
        })
    return result

};