// @flow weak

import { appConfig } from '../../config';
import {
  checkStatus,
  parseJSON,
  loginHeader,
  imageHeader,
  postMethod,postFormMethod
} from '../fetchTools';
import axios from 'axios';

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
export const register = async (req) => {
  const url = `${appConfig.BASE_API}/registerr`;
  // const options = { ...postMethod, ...loginHeader, body: JSON.stringify(req) };
  
  try {
    var response = await axios({url:url,method:'post', data:req,headers:loginHeader});
    // var status = await checkStatus(response);
    // var json = await parseJSON(response);
    return response;
  } catch (error) {
    /*console.log('error', error)*/
    return null;
  }
  
};
export const registerimage = async (imageFile) => {
  const url = `${appConfig.BASE_API}/image/register`;
  var bodyFormData = new FormData();
  bodyFormData.append('file', imageFile); 
  // const options = { ...postFormMethod, ...imageHeader, data: bodyFormData };
  
  try {
    var response = await axios({url:url,method:'post', data:bodyFormData,headers:imageHeader});
    // var status = await checkStatus(response);
    // var json = await parseJSON(response);
    return response;
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
