import { appConfig } from '../../config';

import axios from 'axios';
import { getToken } from "firebase/messaging";
export const setFirebaseToken = async (token) => {   
    let userid=localStorage.getItem('id')    
    console.log('setfirebasetoken, userid', userid)
    const url = `${appConfig.BASE_API}/user/updatetoken/${userid}`;    
    const result = await axios.post(url,{'otp':'true','token2':token})
        .then(res => {
            console.log('settoken', res.data)
            return res.data
        })
        .catch(error => {
            console.log('error', error)
            return null;
        })
    return result
    
};