// @flow


import Cookies from 'universal-cookie'
import { refreshToken } from "./API"
import { appConfig } from '../config';
/*
  window.location.origin polyfill
 */

export const getLocationOrigin = () => {
  if (!window.location.origin) {
    window.location.origin = `${window.location.protocol}//${
      window.location.hostname
    }${window.location.port ? ':' + window.location.port : ''}`;
  }
  return window.location.origin;
};
const cookies = new Cookies()
let cookie=cookies.get('iCare_user') 
let token=''
let refreshtoken=''
if (cookie) token=cookies.get('iCare_user').token
if (cookie) refreshtoken=cookies.get('iCare_user').refreshtoken
/*
  query options:
 */
export const defaultOptions = {
  credentials: 'same-origin',
};

export const postMethod = {
  method: 'POST',
};

export const getMethod = {
  method: 'GET',
};
export const loginHeader = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
};
export const refreshAuthLogic = async failedRequest => {
  
  const url = `${appConfig.BASE_API}/refreshtoken`;
  console.log('refresh request',url)
  
  let cookie=cookies.get('iCare_user')
  
      try{ 
          let param={
              token: cookie.token, refreshtoken: cookie.refreshtoken
            }
            // console.log('refresh token param',param)
          let response = await refreshToken({
              token: cookie.token, refreshtoken: cookie.refreshtoken
            });
           console.log('refresh token response',response)
          if (response){      
            if (response==403 || response==401){
              cookies.remove('iCare_user', {path: '/'})
              sessionStorage.clear()
              localStorage.clear()            
              return null;
            }
            token=response.token;
            refreshtoken=response.refreshtoken;
            cookie.token=token;
            cookie.refreshtoken=refreshtoken;
          } 
          cookie.refreshStatus="idle";
          // console.log('idle')
          cookies.set('iCare_user', JSON.stringify(cookie), { path: '/' });  
          return Promise.resolve();
        }
        catch(error){
          
          
        }
  
}
export const gettoken = async () => {
  let cookie=cookies.get('iCare_user')
  return cookie.token
  }
export const getrefreshtoken = async () => {
    let cookie=cookies.get('iCare_user') 
    // console.log('get refresh token',cookie)
    if (!cookie) return null
    
    return cookie.token;
};
export const getaccesstoken = async () => {
    let cookie=cookies.get('iCare_user')  
    if (cookie)  
      return cookie.token;
    else
      return null;
};
export const jsonHeaderAuth = () => {
  let cookie=cookies.get('iCare_user')
  let header={headers : {
    Accept: 'application/json',
    'Content-Type' : 'application/json',
    'Authorization' :'Bearer '+ cookie.token
  }}
  return header;
};
export const jsonHeader = (tok) => {
  let header={headers : {
    Accept: 'application/json',
    'Content-Type' : 'application/json',
    'Authorization' :'Bearer '+ tok
  }}
  return header;
};

/*
  query response helpers:
 */
export const checkStatus = (response: {
  status: number,
  statusText: string,
  body: any,
  ...any,
}) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  return Promise.reject(error);
};

export const parseJSON = (response: any): any => {
  try{
    let result= response.json();
    return result;
  }catch(error){
    console.log('error parse json',response.json())
    return response;
  }
};

