import { appConfig } from "../../config";
import { refreshAuthLogic } from "../fetchTools";
import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

export const verifyOtp = async (payload) => {
    createAuthRefreshInterceptor(axios,refreshAuthLogic)
    try {
        const {status,data} = await axios.post(`${appConfig.BASE_API}/verifyotp`, payload)
        // const res = await fetch(`${appConfig.BASE_API}/verifyotp`, {
        //     method: 'POST',
        //     headers: {
        //         "Content-Type":"application/json",
        //         "Accept":"application/json"
        //     },
        //     mode: "cors",
        //     body: JSON.stringify(payload)
        // })
        // var data = null
        // try {
        //     var data = await res.text()
        // } catch (error) {
        //     data = null
        // }
        // return{status: res.status, data: data}
        return{status,data}
    } catch (error) {
        throw error
    }
}

export const reSendOtp = async (payload) => {
    createAuthRefreshInterceptor(axios,refreshAuthLogic)
    try {
        const {status,data} = await axios.post(`${appConfig.BASE_API}/resendotp`, payload)
        // const res = await fetch(`${appConfig.BASE_API}/resendotp`, {
        //     method: 'POST',
        //     headers: {
        //         "Content-Type":"application/json",
        //         "Accept":"application/json"
        //     },
        //     mode: "cors",
        //     body: JSON.stringify(payload)
        // })
        // var data = await res.json()
        // return{status: res.status, data: data}
        return{status,data}
    } catch (error) {
        throw error
    }
}