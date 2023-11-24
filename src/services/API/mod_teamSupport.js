import { appConfig } from "../../config";
import axios from "axios";
import { jsonHeaderAuth } from "../fetchTools";

export const getDataHelpDesk = async (requestNo) => {
    // try {
    //     const res = await axios.get(`${appConfig.BASE_API}/request/readTanyaJawab/${localStorage.getItem('id')}`, jsonHeaderAuth())

    //     const data = res.data

    //     return data
    // } catch (error) {
    //     throw error
    // }

    try {
        const res = await fetch(`${appConfig.BASE_API}/request/readTanyaJawab/${requestNo}`, {
            method: 'GET',
            ...jsonHeaderAuth(),
            mode: 'cors'
        })

        var data = await res.json()

        // console.log('DATA : ', res)

        return {status: res.status, data: data}
    } catch (error) {
        throw error
    }
}

export const createQuestionHelpDesk = async (payload) => {
    try {
        const res = await fetch(`${appConfig.BASE_API}/request/submitTanyaJawab`, {
            method: 'POST',
            ...jsonHeaderAuth(),
            mode: 'cors',
            body: JSON.stringify(payload)
        })

        var data = await res.text()

        // console.log('RES : ', res)
        // console.log('RES : ', data)

        return {status: res.status, data: data}
    } catch (error) {
        throw error
    }
}