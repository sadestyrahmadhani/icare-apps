import { appConfig } from "../../config";
import { jsonHeaderAuth, refreshAuthLogic } from "../fetchTools";
import axios from 'axios';
import createAuthRefreshInterceptor from "axios-auth-refresh";

export const getInformasiByUserid = async (number) => {
    // try {
    //     const res = await fetch(`${appConfig.BASE_API}/notif/readbyRow/${localStorage.getItem('id')}/${number}`, {
    //         method: 'GET',
    //         ...jsonHeaderAuth(),    
    //         mode: 'cors'
    //     })
    //     var data = await res.json()
    //     // console.log('data', data)
    //     return{status: res.status, data: data}
    // } catch (error) {
    //     throw error
    // }

    createAuthRefreshInterceptor(axios, refreshAuthLogic)
    try {
        const res = await axios.get(`${appConfig.BASE_API}/notif/readbyRow/${localStorage.getItem('id')}/${number}`, jsonHeaderAuth())

        return {status: res.status, data: res.data}
    } catch (error) {
        throw error
    }
}

export const updateIsRead = async (id) => {
    // try {
    //     const res = await fetch(`${appConfig.BASE_API}/notif/updateread`, {
    //         method: 'POST',
    //         ...jsonHeaderAuth(),
    //         mode: 'cors',
    //         body: JSON.stringify({id: id, isread: true})
    //     })
    //     var data = await res.text()
    //     return{status: res.status, data: data}
    // } catch (error) {
    //     throw error
    // }

    createAuthRefreshInterceptor(axios, refreshAuthLogic)
    try {
        const res = await axios.post(`${appConfig.BASE_API}/notif/updateread`, {id : id, isread: true}, jsonHeaderAuth())

        return {status: res.status, data: res.data}
    } catch (error) {
        throw error
    }
}