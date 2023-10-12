import { appConfig } from '../../config';
import {
    jsonHeaderAuth,
    refreshAuthLogic
} from '../fetchTools';
import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

export const getRiwayatOrderByRow = async () => {
    createAuthRefreshInterceptor(axios, refreshAuthLogic);
    const url = `https://icareapi.astragraphia.co.id/request/readbyRow/${localStorage.getItem('id')}/10`;
    console.log('api link', url)
    const result = await axios.get(url, jsonHeaderAuth())
        .then(res => {
            console.log('getRiwayatOrderByRow', res.data)
            return res.data
        })
        .catch(error => {
            // console.log('error', error)
            return null;
        })
    return result

};


export const getDetailRiwayatOrder = async (id) => {
    createAuthRefreshInterceptor(axios, refreshAuthLogic);
    const url = `https://icareapi.astragraphia.co.id/request/readdetail/`+id;
    console.log('api link', url)
    const result = await axios.get(url, jsonHeaderAuth())
        .then(res => {
            console.log('res detail riwayat', res.data)
            return res.data
        })
        .catch(error => {
            // console.log('error', error)
            return null;
        })
    return result

};