import { appConfig } from '../../config';
import {
    jsonHeaderAuth,
    // refreshAuthLogic
} from '../fetchTools';
// import axios from 'axios';
// import createAuthRefreshInterceptor from 'axios-auth-refresh';

export const getDaftarEq = async () => {
    // createAuthRefreshInterceptor(axios, refreshAuthLogic);
    // const url = `${appConfig.BASE_API}/equipment/read/${localStorage.getItem('id')}`;
    // const result = await axios.get(url)
    //     .then(res => {
    //         console.log('getDataDiriByStatus', res.data)
    //         return res.data
    //     })
    //     .catch(error => {
            // console.log('error', error)
    //         return null;
    //     })
    // return result

    try {
        const res = await fetch(`${appConfig.BASE_API}/equipment/read/${localStorage.getItem('id')}`, {
            method: 'GET',
            ...jsonHeaderAuth(),
            mode: 'cors'
        })
        var data = await res.json()
        return{status: res.status, data: data}
    } catch (error) {
        throw error
    }
}

export const createDaftarEq = async (payload) => {
    try {
        const res = await fetch(`${appConfig.BASE_API}/equipment/create`, {
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

export const deleteDaftarEq = async (id) => {
    try {
        const res = await fetch(`${appConfig.BASE_API}/equipment/delete/${id}`, {
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

export const updateDaftarEq = async (id, payload) => {
    try {
        const res = await fetch(`${appConfig.BASE_API}/equipment/update/${id}`, {
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

// export const getDaftarEqReadAll = async () => {
//     try {
//         const res = await fetch(`${appConfig.BASE_API}/equipment/readall`, {
//             method: 'GET',
//             ...jsonHeaderAuth(),
//             mode: 'cors'
//         })
//         var data = await res.json()
//         return{status: res.status, data: data}
//     } catch (error) {
//         throw error
//     }
// }