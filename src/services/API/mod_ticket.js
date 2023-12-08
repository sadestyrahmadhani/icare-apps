import { appConfig } from '../../config';
import {
    jsonHeaderAuth
} from '../fetchTools';
import axios from 'axios';

export const getTicket = async (id) => {
    const url = `${appConfig.BASE_API}/ticket/${id}`;
    const result = await axios.get(url)
        .then(res => {
            // console.log('masterrequest', res.data)
            return res
        })
        .catch(error => {
            // console.log('error', error)
            return null;
        })
    return result

};