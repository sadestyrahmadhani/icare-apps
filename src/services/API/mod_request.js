import axios from "axios";
import { appConfig } from "../../config";
import { imageHeaderAuth, refreshAuthLogic, jsonHeaderAuth } from "../fetchTools";
import createAuthRefreshInterceptor from "axios-auth-refresh";

export const createRequest = async (payload) => {
    try {
        createAuthRefreshInterceptor(axios, refreshAuthLogic)
        const { status, data } = await axios.post(`${appConfig.BASE_API}/request/insertNew`, payload, {
            ...imageHeaderAuth(),
            mode: 'cors'
        })

        return{ status, data }
    } catch (error) {
        throw error
    }
}

export const getEQByCode = async (code) => {
    try {
        createAuthRefreshInterceptor(axios, refreshAuthLogic)
        const { status, data } = await axios.get(`${appConfig.BASE_API}/sticker/${code}`, {
            ...jsonHeaderAuth(),
            mode: 'cors'
        })

        return { status, data }
    } catch(err) {
        throw err
    }
}

export const getEQByCodeWithoutAuth = async (code) => {
    try {
        createAuthRefreshInterceptor(axios, refreshAuthLogic)
        const { status, data } = await axios.get(`${appConfig.BASE_API}/sticker2/${code}`, {
            mode: 'cors'
        })

        return { status, data }
    } catch(err) {
        throw err
    }
}