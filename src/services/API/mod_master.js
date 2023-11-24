import { appConfig } from '../../config';
import {
    jsonHeaderAuth
} from '../fetchTools';
import axios from 'axios';

export const getMasterRequest = async () => {    
    const url = `${appConfig.BASE_API}/masterrequest/read`;
    const result = await axios.get(url)
        .then(res => {
            // console.log('masterrequest', res.data)
            return res.data
        })
        .catch(error => {
            // console.log('error', error)
            return null;
        })
    return result

};