import { appConfig } from '../../config';
import {
    jsonHeaderAuth,
    refreshAuthLogic
} from '../fetchTools';
import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

export const getRiwayatOrderByRow = async (length) => {
    createAuthRefreshInterceptor(axios, refreshAuthLogic);
    const url = `${appConfig.BASE_API}/request/readbyRow/${localStorage.getItem('id')}/${length}`;
    // console.log('api link', url)
    const result = await axios.get(url, jsonHeaderAuth())
        .then(res => {
            // console.log('getRiwayatOrderByRow', res.data)
            return res.data
        })
        .catch(error => {
            // console.log('error', error)
            return null;
        })
    return result

};
export const getRiwayatOrderByStatus = async (req) => {
    createAuthRefreshInterceptor(axios, refreshAuthLogic);
    const url = `${appConfig.BASE_API}/request/readByStatus`;
    try {
        const res = await axios.post(url, req, jsonHeaderAuth())
        return{status: res.status, data: res.data}
    } catch (error) {
        throw error
    }
};


export const getDetailRiwayatOrder = async (id) => {
    createAuthRefreshInterceptor(axios, refreshAuthLogic)
    try {
        const res = await axios.get(`${appConfig.BASE_API}/request/readdetail/${id}`, jsonHeaderAuth())

        return {status: res.status, data: res.data}
    } catch (error) {
        throw error
    }
};

export const getImageRiwayatOrder = async (fileName) => {
    createAuthRefreshInterceptor(axios, refreshAuthLogic)
    try {
        const response = await axios.get(`${appConfig.BASE_API}/image/tmp/${fileName}`, {
            ...jsonHeaderAuth(),
            responseType: 'blob'
        })

        const data = await response.data
        const dataUrl = URL.createObjectURL(data)

        // console.log('IMG : ',data)
        // console.log('IMG : ',dataUrl)
        return {status: response.status, data: dataUrl}
    } catch (error) {
        throw error
    }
}

export const getTrackingRiwayat = async () => {
    createAuthRefreshInterceptor(axios, refreshAuthLogic);
    const url = `https://icareapi.astragraphia.co.id/serviceorder/3533183`;
    // console.log('api link get tracking riwayat', url)
    const result = await axios.get(url, jsonHeaderAuth())
        .then(res => {
            // console.log('res tracking riwayat', res.data)
            return {status: res.status, data: res.data}
        })
        .catch(error => {
            return null;
        })
    return result
};

export const createReview = async (req) => {
    createAuthRefreshInterceptor(axios, refreshAuthLogic)
    try {
        const {status, data} = await axios.post(`${appConfig.BASE_API}/request/review`, req, {
            ...jsonHeaderAuth()
        })

        return{status, data}
    } catch (error) {
        throw error
    }
}

export const getReviewByTRequestId = async (id) => {
    createAuthRefreshInterceptor(axios, refreshAuthLogic)
    try {
        const {status, data} = await axios.get(`${appConfig.BASE_API}/request/review/${id}`, {
            ...jsonHeaderAuth()
        })
        return{status, data}
    } catch (error) {
        throw error
    }
}


export const updateStatusId = async (id, req) => {
    createAuthRefreshInterceptor(axios, refreshAuthLogic)
    try {
        const {status, data} = await axios.post(`${appConfig.BASE_API}/request/updatestatus/${id}`, req, {
            ...jsonHeaderAuth()
        })
        return{status, data}
    } catch (error) {
        throw error
    }
}
