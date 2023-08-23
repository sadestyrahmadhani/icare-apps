// @flow weak

import { appConfig } from '../../config';
import {
  checkStatus,
  parseJSON,
  loginHeader,
  postMethod
} from '../fetchTools';

export const authUser = async (req) => {
  const url = `${appConfig.BASE_API}/login2`;
  const options = { ...postMethod, ...loginHeader, body: JSON.stringify(req) };
  
  try {
    var response = await fetch(url, options);
    // var status = await checkStatus(response);
    var json = await parseJSON(response);
    return json;
  } catch (error) {
    /*console.log('error', error)*/
    return null;
  }
  
};
export const refreshToken = async (req) => {
  // console.log('refreshToken', req);
  const url = `${appConfig.BASE_API}/refreshtoken`;
  const options = { ...postMethod, ...loginHeader, body: JSON.stringify(req) };
   // console.log(url,options)
  try {
    var response = await fetch(url, options);
     console.log('response refresh', response)
    var status = await checkStatus(response);
    console.log('status refresh', status)
    var json = await parseJSON(response);
    // console.log('json', json)
    return json;
  } catch (error) {
    
    return response.status;
  }
}
