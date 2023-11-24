import { jsonHeaderAuth } from "../fetchTools"

export const getDataProduct = async () => {
    try {
        const res = await fetch('https://documentsolution.com/api/produk', {
            method: 'GET',
            mode: 'cors'
            // ...jsonHeaderAuth()
        })

        var data = await res.json()

        return {status: res.status, data: data}
    } catch (error) {
        throw error
    }
}