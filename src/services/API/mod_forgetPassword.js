import { appConfig } from "../../config"
import { parseJSON } from "../fetchTools"

export const requestOtpForgetPassword = async (payload) => {
    try {
        const res = await fetch(`${appConfig.BASE_API}/forgetpassword`, {
            method: 'POST',
            headers: {
                "Content-Type":"application/json",
                "Accept":"application/json"
            },
            mode: "cors",
            body: JSON.stringify(payload) 
        })
        var data = null
        try {
            data = await res.json()
        } catch (error) {
            data = null     
        }
        return{status: res.status, data: data}
    } catch (error) {
        throw error
    }
}