import createAuthRefreshInterceptor from "axios-auth-refresh";
import { appConfig } from "../../config";
import { jsonHeaderAuth, imageHeaderAuth, refreshAuthLogic } from "../fetchTools";
import axios from 'axios';

export const getStatusAccountById = async () => {
    // try {
    //     const res = await fetch(`${appConfig.BASE_API}/userstatus/${localStorage.getItem('id')}`, {
    //         method: 'GET',
    //         ...jsonHeaderAuth(),
    //         mode: 'cors'
    //     })
        
    //     var data = await res.json()
    //     return {status: res.status, data: data}
    // } catch (error) {
    //     throw error
    // }
    
    createAuthRefreshInterceptor(axios, refreshAuthLogic)
    try {
    const res = await axios.get(`${appConfig.BASE_API}/userstatus/${localStorage.getItem('id')}`, jsonHeaderAuth())

    return {status: res.status, data: res.data}
    } catch (error) {
        throw error
    }
}

export const acUploadRegister = async (file) => {
    try {
        const res = await fetch(`${appConfig.BASE_API}/image/register`, {
            method: 'POST',
            ...imageHeaderAuth(),
            mode: 'cors',
            body: file
        })
        var data = await res.text()
        return{status: res.status, data: data}
    } catch (error) {
        throw error
    }

    // createAuthRefreshInterceptor(axios, refreshAuthLogic)
    // try {
    //     const res = await axios.post(`${appConfig.BASE_API}/image/register`, file, imageHeaderAuth())

    //     return {status: res.status, data: res.data}
    // } catch (error) {
    //     throw error
    // }
}

export const upgradeAccountPremium = async (payload) => {
    try {
        const res = await fetch(`${appConfig.BASE_API}/user/updatepremium/${localStorage.getItem('id')}`, {
            method: 'POST',
            ...jsonHeaderAuth(),
            mode: 'cors',
            body: JSON.stringify(payload)
        })

        var data = await res.text()

        return {status: res.status, data: data}
    } catch (error) {
        throw error
    }

    // createAuthRefreshInterceptor(axios, refreshAuthLogic)
    // try {
    //     const res = await axios.post(`${appConfig.BASE_API}/user/updatepremium/${localStorage.getItem('id')}`, payload, jsonHeaderAuth())

    //     return {status: res.status, data: res.data}
    // } catch (error) {
    //     throw error
    // }
}