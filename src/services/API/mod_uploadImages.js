import { appConfig } from "../../config";
import { imageHeaderAuth } from "../fetchTools";

export const uploadImages = async (imageFile) => {
    var formdata = new FormData()
    formdata.append('file', imageFile)
    console.log(imageFile)

    try {
        const res = await fetch(`${appConfig.BASE_API}/image/upload`, {
            method: 'POST',
            ...imageHeaderAuth(),
            mode: 'cors',
            body: formdata
        })
        var data = res.text()
        return{status: res.status, data: data}
    } catch (error) {
        throw error
    }
}