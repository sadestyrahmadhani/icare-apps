import { json } from 'react-router';
import { appConfig } from '../../config';
import {
    jsonHeaderAuth,
    // refreshAuthLogic
} from '../fetchTools';
// import axios from 'axios';
// import createAuthRefreshInterceptor from 'axios-auth-refresh';

export const getDaftarAlamat = async () => {
    // createAuthRefreshInterceptor(axios, refreshAuthLogic);
    // const url = `${appConfig.BASE_API}/useraddress/read/${localStorage.getItem('id')}`;
    // console.log('api link', url)
    // const result = await axios.get(url, jsonHeaderAuth())
    //     .then(res => {
    //         console.log('getDaftarAlamat', res.data)
    //         return res.data
    //     })
    //     .catch(error => {
    //         // console.log('error', error)
    //         return null;
    //     })
    // return result

    try { 
        const res = await fetch(`${appConfig.BASE_API}/useraddress/read/${localStorage.getItem('id')}`, {
            method: 'GET',
            ...jsonHeaderAuth(),
            mode: 'cors'
        })
        var data = await res.json()
        return{status: res.status, data: data}
    } catch (error) {
        throw error
    }

};

export const createDaftarAlamat = async (payload) => {
    try {
        const res = await fetch(`${appConfig.BASE_API}/useraddress/create`, {
            method: 'POST',
            ...jsonHeaderAuth(),
            mode: 'cors',
            body: JSON.stringify(payload)
        })
        var data = await res.text()
        return{status: res.status, data: data}
    } catch (error) {
        throw error
    }
}

export const deleteDaftarAlamat = async (id) => {
    try {
        const res = await fetch(`${appConfig.BASE_API}/useraddress/delete/${id}`, {
            method: 'POST',
            ...jsonHeaderAuth(),
            mode: 'cors'
        })
        var data = await res.text()
        return{status: res.status, data: data}
    } catch (error) {
        throw error
    }
}