import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { appConfig } from '../../config';
import {
    jsonHeaderAuth,
    imageHeaderAuth,
    refreshAuthLogic
} from '../fetchTools';
import axios from 'axios';

export const getCollectMeterByUserId = async () => {
    try {
        const res = await fetch(`${appConfig.BASE_API}/meter/readbyuserid/${localStorage.getItem('id')}`, {
            method: 'GET',
            ...jsonHeaderAuth(),
            mode: 'cors'
        })
        // console.log(res)
        var data = await res.json()
        return{status: res.status, data: data}
    } catch (error) {
        throw error
    }


    // createAuthRefreshInterceptor(axios, refreshAuthLogic)
    // try {
    //     const res = await axios.get(`${appConfig.BASE_API}/meter/readbyuser/${localStorage.getItem('id')}`,
    //             jsonHeaderAuth()
    //         // mode: 'cros'
    //     )

    //     console.log('RES : ', res)

    //     return {status: res.status, data: res.data}
    // } catch (error) {
    //     throw error
    // }


    // createAuthRefreshInterceptor(axios, refreshAuthLogic)
    // const res = await axios.get(`${appConfig.BASE_API}/meter/readbyuser/${localStorage.getItem('id')}`, jsonHeaderAuth()).then(res => {
    //     return res.data
    // }).catch(error => {
    //     return null
    // })

    // return res


};

export const getCollectMeterById = async (id) => {
    // console.log(id)
    // try {
    //     const res = await fetch(`${appConfig.BASE_API}/meter/readbyid/${id}`, {
    //         method: 'GET',
    //         ...jsonHeaderAuth(),
    //         mode: 'cors'
    //     })
    //     var data = await res.json()
    //     // console.log(data)

    //     return { status: res.status, data: data }
    // } catch (error) {
    //     throw error
    // }


    createAuthRefreshInterceptor(axios, refreshAuthLogic)
    try {
        const res = await axios.get(`${appConfig.BASE_API}/meter/readbyid/${id}`, jsonHeaderAuth())

        return {status: res.status, data: res.data}
    } catch (error) {
        throw error
    }
}


export const getImageCollectMeter = async (id) => {
    // try {
    //     const response = await fetch(`${appConfig.BASE_API}/meter/readbyid/${id}`, {
    //         method: 'GET',
    //         ...jsonHeaderAuth(),
    //         mode: 'cors'
    //     })
    //     var dataItem = await response.json()
    //     var fileName = await dataItem.Table[0].Capture
    //     var createDate = new Date(dataItem.Table[0].createDate)
    //     const year = createDate.getFullYear()
    //     const month = (createDate.getMonth() + 1).toString().padStart(2, '0')
    //     const day = createDate.getDate().toString().padStart(2, '0')
    //     const hours = createDate.getHours().toString().padStart(2, '0')
    //     const minutes = createDate.getMinutes().toString().padStart(2, '0')
    //     const seconds = createDate.getSeconds().toString().padStart(2, '0')

    //     var dataImage = `meter__${year}${month}${day}${hours}${minutes}${seconds}_${fileName}`

    //     const res = await fetch(`${appConfig.BASE_API}/image/meter/${dataImage}`, {
    //         // const res = await fetch(`https://icareapi.astragraphia.co.id/image/meter/${dataImage}`, {
    //         method: 'GET',
    //         ...jsonHeaderAuth(),
    //         mode: 'cors'
    //     })
    //     var data = await res.blob()
    //     var dataUrl = URL.createObjectURL(data)

    //     // console.log('Respon : ', dataImage)
    //     // console.log('Respon : ', dataUrl)
    //     return { status: res.status, data: dataUrl }
    // } catch (error) {
    //     throw error
    // }


    createAuthRefreshInterceptor(axios, refreshAuthLogic)
    try {
        const response = await axios.get(`${appConfig.BASE_API}/meter/readbyid/${id}`, jsonHeaderAuth())

        var fileName = await response.data.Table[0].Capture
        var createDate = new Date(response.data.Table[0].createDate)
        const year = createDate.getFullYear()
        const month = (createDate.getMonth() + 1).toString().padStart(2, '0')
        const day = createDate.getDate().toString().padStart(2, '0')
        const hours = createDate.getHours().toString().padStart(2, '0')
        const minutes = createDate.getMinutes().toString().padStart(2, '0')
        const seconds = createDate.getSeconds().toString().padStart(2, '0')

        var dataImage = `meter__${year}${month}${day}${hours}${minutes}${seconds}_${fileName}`

        const res = await axios.get(`${appConfig.BASE_API}/image/meter/${dataImage}`, {
            ...jsonHeaderAuth(),
            responseType: 'blob'
        })
        var data = await res.data
        var dataUrl = URL.createObjectURL(data)

        return { status: res.status, data: dataUrl }
    } catch (error) {
        throw error
    }
}

export const createCollectMeter = async (payload) => {
    // try {
    //     const res = await fetch(`${appConfig.BASE_API}/meter/insert`, {
    //         method: 'POST',
    //         ...jsonHeaderAuth(),
    //         mode: 'cors',
    //         body: JSON.stringify(payload)
    //     })
    //     var data = await res.text()

    //     return { status: res.status, data: data }
    // } catch (error) {
    //     throw error
    // }


    createAuthRefreshInterceptor(axios, refreshAuthLogic)
    try {
        const res = await axios.post(`${appConfig.BASE_API}/meter/insert`, payload, {
            headers: {
                ...jsonHeaderAuth()
            }
        })

        return {status: res.status, data: res.data}
    } catch (error) {
        throw error
    }
}

export const collectMeterImage = async (payload) => {
    // try {
    //     var res = await fetch(`${appConfig.BASE_API}/image/meterupload`, {
    //         method: 'POST',
    //         ...imageHeaderAuth(),
    //         mode: 'cors',
    //         body: payload
    //     })
    //     // console.log('API: ',res)
    //     // console.log('Data: ',payload)

    //     var data = await res.text()

    //     // console.log('Image : ', data)

    //     return { status: res.status, data: data }
    // } catch (error) {
    //     throw error
    // }


    createAuthRefreshInterceptor(axios, refreshAuthLogic)
    try {
        const res = await axios.post(`${appConfig.BASE_API}/image/meterupload`, payload, {
            headers: {
                ...imageHeaderAuth()
            }
        })

        return {status: res.status, data: res.data}
    } catch (error) {
        throw error
    }
}