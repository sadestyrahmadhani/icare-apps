import { appConfig } from "../../config";
import {
    jsonHeaderAuth,
    refreshAuthLogic
} from '../fetchTools';
import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

export const masterRequestInstall = async () => {
    try {
        createAuthRefreshInterceptor(axios, refreshAuthLogic)
        const { status, data } = await axios.get(`${appConfig.BASE_API}/masterrequesttypemap/read/${2}`, {
            ...jsonHeaderAuth(),
            mode:  'cors'
        })
        
        return { status, data }
    } catch (error) {
        throw error
    }
}

export const masterRequestBreakfix = async () => {
    try {
        createAuthRefreshInterceptor(axios, refreshAuthLogic)
        const { status, data } = await axios.get(`${appConfig.BASE_API}/masterrequesttypemap/read/${1}`, {
            ...jsonHeaderAuth(),
            mode:  'cors'
        })
        
        return { status, data }
    } catch (error) {
        throw error
    }
}


export const masterRequestSupplies = async () => {
    try {
        createAuthRefreshInterceptor(axios, refreshAuthLogic)
        const res = await axios.get(`${appConfig.BASE_API}/masterrequesttypemap/read/${3}`, {
            ...jsonHeaderAuth(),
            mode: 'cors'
        })
        // console.log(res)
        return{status: res.status, data: res.data}
    } catch (error) {
        throw error
    }
}
