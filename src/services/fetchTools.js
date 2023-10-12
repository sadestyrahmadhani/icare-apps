// @flow

import axios from 'axios'
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
let cookie=cookies.get('token') 
let token=''
let refreshtoken=''
if (cookie) token=cookies.get('token')
if (cookie) refreshtoken=cookies.get('refreshtoken')
/*
  query options:
 */
export const defaultOptions = {
  credentials: 'same-origin',
};

export const postMethod = {
  method: 'POST',
};
export const postFormMethod = {
  method: 'POST',
  headers: {
    'Content-Type': 'image/jpeg'
  },
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
export const imageHeader = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'image/jpeg'
  },
};
export const refreshAuthLogic = async failedRequest => {
  
  const url = `${appConfig.BASE_API}/refreshtoken`;
  console.log('refresh request',url)
      try{ 
          let param={
              token: this.token, refreshtoken: this.refreshtoken
            }
            // console.log('refresh token param',param)
          let response = await refreshToken({
              token: this.token, refreshtoken: this.refreshtoken
            });
           console.log('refresh token response',response)
          if (response){      
            if (response==403 || response==401){
              cookies.remove('token', {path: '/'})
              cookies.remove('refreshtoken', {path: '/'})
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
          cookies.set('token', token, { path: appConfig.DOMAIN });  
          cookies.set('refreshtoken', refreshtoken, { path: appConfig.DOMAIN });  
          return Promise.resolve();
        }
        catch(error){
          
          
        }
  
}
export const gettoken = ()=> {
  let cookie=cookies.get('token')  
  return cookie
  }
export const getrefreshtoken = async () => {
    let cookie=cookies.get('refreshtoken') 
    // console.log('get refresh token',cookie)
    if (!cookie) return null
    
    return cookie;
};
export const settoken = async (token) => {
  cookies.set('token', token, { path: appConfig.DOMAIN });  
  }
export const setrefreshtoken =  (token) => {
    cookies.set('refreshtoken', token, { path: appConfig.DOMAIN });    
};
export const getaccesstoken =  () => {
    cookies.get('token')  
    
};
export const jsonHeaderAuth = () => {
  let cookie=cookies.get('token')
  let header={headers : {
    Accept: 'application/json',
    'Content-Type' : 'application/json',
    'Authorization' :'Bearer '+ cookie
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

axios.interceptors.request.use(
  config => {    
    console.log('interceptor work')
    const token = cookies.get('token')
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }
    // config.headers['Content-Type'] = 'application/json';
    return config
  },
  error => {
    Promise.reject(error)
  }
)
axios.interceptors.response.use(
  response => {
    return response
  },
  function (error) {
    const originalRequest = error.config

    if (
      error.response.status === 401 
      &&
      originalRequest.url === `${appConfig.BASE_API}/refreshtoken`
    ) {
      cookies.remove('token', {path: appConfig.DOMAIN})
      cookies.remove('refreshtoken', {path: appConfig.DOMAIN})
      sessionStorage.clear()
      localStorage.clear()  
      this.props.router.push('/login')
      return Promise.reject(error)
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      let refreshtoken = cookies.get('refreshtoken')
      let token = cookies.get('token')
      return refreshToken({
              token: this.token, refreshtoken: this.refreshtoken
            })
        .then(res => {
          if (res.status === 201) {
            token=res.token;
            refreshtoken=res.refreshtoken;
            cookies.set('token', token, { path: appConfig.DOMAIN });  
            cookies.set('refreshtoken', refreshtoken, { path: appConfig.DOMAIN }); 
            axios.defaults.headers.common['Authorization'] =
              'Bearer ' + cookies.get('token')
            return axios(originalRequest)
          }
        })
    }
    return Promise.reject(error)
  }
)