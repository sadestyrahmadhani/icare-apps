// @flow weak

import { appConfig } from '../../config';
import {
  defaultOptions,
  checkStatus,
  parseJSON,
  postMethod,
  loginHeader
} from '../fetchTools';

export const cekLogin = async (req) => {
  // console.log('ceklogin', req);
  const url = `${appConfig.BASE_API}/login2`;
  console.log('login url',url);
  const options = { ...postMethod, ...loginHeader, body: JSON.stringify(req) };
  // console.log(options)
  try {
    var response = await fetch(url, options);
    var status = await checkStatus(response);
    var json = await parseJSON(response);
    // console.log('json', json)
    if (json) {
      json.isAuthenticated = true
      json.access_token = 'Bearer ' + json.access_token;
      return json;
    }
    return null;
  } catch (error) {
    // console.log('error', error)
    return null;
  }
  
};
