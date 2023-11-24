import axios from "axios"
import { appConfig } from "../../config";
import { jsonHeaderAuth, refreshAuthLogic } from "../fetchTools";
import createAuthRefreshInterceptor from 'axios-auth-refresh';

export const getAllDataMember = async () => {
    createAuthRefreshInterceptor(axios, refreshAuthLogic)
    try {
        const {status, data} = await axios.get(`${appConfig.BASE_API}/member/getAll`, {
            ...jsonHeaderAuth()
        })

        return{status,data}
    } catch (error) {
        throw error
    }
}

export const createNewMember = async (req) => {
    createAuthRefreshInterceptor(axios, refreshAuthLogic)
    try {
        const {status,data} = await axios.post(`${appConfig.BASE_API}/member/create`, req, {
            ...jsonHeaderAuth()
        })

        return{status,data}
    } catch (error) {
        throw error
    }
}

export const getDataMemberById = async (id) => {
    createAuthRefreshInterceptor(axios, refreshAuthLogic)
    try {
        const {status,data} = await axios.get(`${appConfig.BASE_API}/member/getId/${id}`, {
            ...jsonHeaderAuth()
        })

        return{status,data}
    } catch (error) {
        throw error
    }
}

export const updateMember = async (id, req) => {
    createAuthRefreshInterceptor(axios, refreshAuthLogic)
    try {
        const {status,data} = await axios.post(`${appConfig.BASE_API}/member/update/${id}`, req, {
            ...jsonHeaderAuth()
        })

        return{status,data}
    } catch (error) {
        throw error
    }
}

export const deleteMember = async (id) => {
    createAuthRefreshInterceptor(axios, refreshAuthLogic)
    try {
        const {status,data} = await axios.get(`${appConfig.BASE_API}/member/delete/${id}`, {
            ...jsonHeaderAuth()
        })

        return{status,data}
    } catch (error) {
        throw error
    }
}