import { appConfig } from "../../config";

export const verifyOtp = async (payload) => {
    try {
        const res = await fetch(`${appConfig.BASE_API}/verifyotp`, {
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
            var data = await res.text()
        } catch (error) {
            data = null
        }
        return{status: res.status, data: data}
    } catch (error) {
        throw error
    }
}

export const reSendOtp = async (payload) => {
    try {
        const res = await fetch(`${appConfig.BASE_API}/resendotp`, {
            method: 'POST',
            headers: {
                "Content-Type":"application/json",
                "Accept":"application/json"
            },
            mode: "cors",
            body: JSON.stringify(payload)
        })
        var data = await res.json()
        // try {
        //     data = await res.json()
        // } catch (error) {
        //     data = null
        // }
        return{status: res.status, data: data}
    } catch (error) {
        throw error
    }
}