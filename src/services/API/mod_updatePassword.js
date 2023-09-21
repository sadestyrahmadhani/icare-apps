import { appConfig } from "../../config";
import { jsonHeaderAuth } from "../fetchTools";

export const updatePasswordById = async (payload) => {
    try {
        const res = await fetch(`${appConfig.BASE_API}/updatepassword`, {
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
}