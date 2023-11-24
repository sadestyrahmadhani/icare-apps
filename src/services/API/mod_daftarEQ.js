import { appConfig } from '../../config';
import {
    jsonHeaderAuth,
    refreshAuthLogic
} from '../fetchTools';
import axios from 'axios';
import { saveAs } from 'file-saver';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

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


    // createAuthRefreshInterceptor(axios, refreshAuthLogic)
    // try {
    //     const res = await axios.post(`${appConfig.BASE_API}/equipment/read/${localStorage.getItem('id')}`, jsonHeaderAuth())

    //     return {status: res.status, data: res.data}
    // } catch (error) {
    //     throw error
    // }
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


    // createAuthRefreshInterceptor(axios, refreshAuthLogic)
    // try {
    //     const res = await axios.post(`${appConfig.BASE_API}/equipment/create`, payload, {
    //         headers: {
    //             ...jsonHeaderAuth()
    //         }
    //     })

    //     return {status: res.status, data: res.data}
    // } catch (error) {
    //     throw error
    // }
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


    // createAuthRefreshInterceptor(axios, refreshAuthLogic)
    // try {
    //     const res = await axios.post(`${appConfig.BASE_API}/equipment/delete/${id}`, jsonHeaderAuth())

    //     return {status: res.status, data: res.data}
    // } catch (error) {
    //     throw error
    // }
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


    // createAuthRefreshInterceptor(axios, refreshAuthLogic)
    // try {
    //     const res = await axios.post(`${appConfig.BASE_API}/equipment/update/${id}`, payload, {
    //         ...jsonHeaderAuth()
    //     })

    //     return {status: res.status, data: res.data}
    // } catch (error) {
    //     throw error
    // }
}

export const getDownloadEquipment = async (id) => {
    try {
        await axios({url:`${appConfig.BASE_API}/equipment/download`,method:'get',responseType: 'blob'})
        .then(res => {
            console.log(res)
            const blob = new Blob([res.data], {
                type: 'application/octet-stream'
            })

            saveAs(blob, "equipments.xlsx")
        })
        .catch(error => {
            console.log(error.message);
        });
        
        return 0
    } catch (error) {
        throw error
    }
}
export const UploadEquipment = async (file) => {
    try {
        var formData = new FormData()
        formData.append('file',file)
        let data=await axios.post(`${appConfig.BASE_API}/equipment/upload`,formData,
            {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
            })
        console.log(data)
        return data.data
        
    } catch (error) {
        console.log(error)
        return error
    }
}
