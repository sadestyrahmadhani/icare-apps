import { refreshAuthLogic, jsonHeader } from "../fetchTools";
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import axios from 'axios';

export const getDataBerita = async () => {
    try {
        const res = await fetch('http://documentsolution.com/api/berita', {
            method: 'GET',
            mode: 'cors'
            // ...jsonHeader()
        })

        var data = await res.json()
        // console.log(data)
        return {status: res.status, data: data}
    } catch (error) {
        throw error
    }


    // createAuthRefreshInterceptor(axios, refreshAuthLogic)
    // try {
    //     const res = await axios.get('http://documentsolution.com/api/berita')

    //     console.log(res.status)
    //     console.log(res.data)

    //     return {status: res.status, data: res.data}
    // } catch (error) {
    //     throw error
    // }
}   