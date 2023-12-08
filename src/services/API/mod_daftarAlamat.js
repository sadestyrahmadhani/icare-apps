import { json } from 'react-router';
import { appConfig } from '../../config';
import {
    jsonHeaderAuth,
    refreshAuthLogic
} from '../fetchTools';
import axios from 'axios';
import { saveAs } from 'file-saver';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

export const getDaftarAlamat = async () => {
    // try { 
    //     const res = await fetch(`${appConfig.BASE_API}/useraddress/read/${localStorage.getItem('id')}`, {
    //         method: 'GET',
    //         ...jsonHeaderAuth(),
    //         mode: 'cors'
    //     })
    //     var data = await res.json()
    //     return{status: res.status, data: data}
    // } catch (error) {
    //     throw error
    // }


    createAuthRefreshInterceptor(axios, refreshAuthLogic)
    try {
        const res = await axios.get(`${appConfig.BASE_API}/useraddress/read/${localStorage.getItem('id')}`, jsonHeaderAuth())

        return {status: res.status, data: res.data}
    } catch (error) {
        throw error
    }

};

export const getDaftarAlamatById = async (id) => {
    // try {
    //     const res = await fetch(`${appConfig.BASE_API}/useraddress/readid/${id}`, {
    //         method: 'GET',
    //         ...jsonHeaderAuth(),
    //         mode: 'cors'
    //     })
    //     var data = await res.json()
    //     return{status: res.status, data: data}
    // } catch (error) {
    //     throw error
    // }


    createAuthRefreshInterceptor(axios, refreshAuthLogic)
    try {
        const res = await axios.get(`${appConfig.BASE_API}/useraddress/readid/${id}`, jsonHeaderAuth())

        return {status: res.status, data: res.data}
    } catch (error) {
        throw error
    }
}

export const createDaftarAlamat = async (payload) => {
    // try {
    //     const res = await fetch(`${appConfig.BASE_API}/useraddress/create`, {
    //         method: 'POST',
    //         ...jsonHeaderAuth(),
    //         mode: 'cors',
    //         body: JSON.stringify(payload)
    //     })
    //     var data = await res.text()
    //     return{status: res.status, data: data}
    // } catch (error) {
    //     throw error
    // }


    createAuthRefreshInterceptor(axios, refreshAuthLogic)
    try {
        const res = await axios.post(`${appConfig.BASE_API}/useraddress/create`, payload, {
            headers: {
                ...jsonHeaderAuth()
            }
        })

        return {status: res.status, data: res.data}
    } catch (error) {
        throw error
    }
}

export const deleteDaftarAlamat = async (id) => {
    // try {
    //     const res = await fetch(`${appConfig.BASE_API}/useraddress/delete/${id}`, {
    //         method: 'POST',
    //         ...jsonHeaderAuth(),
    //         mode: 'cors'
    //     })
    //     var data = await res.text()
    //     return{status: res.status, data: data}
    // } catch (error) {
    //     throw error
    // }


    createAuthRefreshInterceptor(axios, refreshAuthLogic)
    try {
        const res = await axios.post(`${appConfig.BASE_API}/useraddress/delete/${id}`, jsonHeaderAuth())

        return {status: res.status, data: res.data}
    } catch (error) {
        throw error
    }
}

export const updateDaftarAlamat = async (id, payload) => {
    // try {
    //     const res = await fetch(`${appConfig.BASE_API}/useraddress/update/${id}`, {
    //         method: 'POST',
    //         ...jsonHeaderAuth(),
    //         mode: 'cors',
    //         body: JSON.stringify(payload)
    //     })
    //     var data = await res.text()
    //     return{status: res.status, data: data}
    // } catch (error) {
    //     throw error
    // }


    createAuthRefreshInterceptor(axios, refreshAuthLogic)
    try {
        const res = await axios.post(`${appConfig.BASE_API}/useraddress/update/${id}`, payload, {
            headers: {
                ...jsonHeaderAuth()
            }
        })
        
        return {status: res.status, data: res.data}
    } catch (error) {
        throw error
    }
}

export const updateVerified = async (id, payload) => {
    try {
        const res = await fetch(`${appConfig.BASE_API}/useraddress/updateverified/${id}`, {
            method: 'POST',
            ...jsonHeaderAuth(),
            mode: 'cors',
        })
        var data = await res.text()
        return{status: res.status, data: data}
    } catch (error) {
        throw error
    }


    // createAuthRefreshInterceptor(axios, refreshAuthLogic)
    // try {
    //     const res = await axios.post(`${appConfig.BASE_API}/useraddress/updateverified/${id}`, jsonHeaderAuth())

    //     return {status: res.status, data: res.data}
    // } catch (error) {
    //     throw error
    // }
}

export const updateDefault = async (id, payload) => {
    // try {
    //     const res = await fetch(`${appConfig.BASE_API}/useraddress/updatedefault/${id}`, {
    //         method: 'POST',
    //         ...jsonHeaderAuth(),
    //         mode: 'cors',
    //         body: JSON.stringify(payload)
    //     })
    //     var data = await res.text()
    //     return{status: res.status, data: data}
    // } catch (error) {
    //     throw error
    // }


    createAuthRefreshInterceptor(axios, refreshAuthLogic)
    try {
        const res = await axios.post(`${appConfig.BASE_API}/useraddress/updatedefault/${id}`, payload, {
            headers: {
                ...jsonHeaderAuth()
            }
        })

        return {status: res.status, data: res.data}
    } catch (error) {
        throw error
    }
}
export const getDownloadAlamat = async (id) => {
    try {
        await axios({url:`${appConfig.BASE_API}/useraddress/download`,method:'get',responseType: 'blob'})
        .then(res => {
            console.log(res)
            const blob = new Blob([res.data], {
                type: 'application/octet-stream'
            })

            saveAs(blob, "address.xlsx")
        })
        .catch(error => {
            console.log(error.message);
        });
        
        return 0
    } catch (error) {
        throw error
    }
}
export const UploadAlamat = async (file) => {
    try {
        var formData = new FormData()
        formData.append('file',file)
        let data=await axios.post(`${appConfig.BASE_API}/useraddress/upload`,formData,
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
