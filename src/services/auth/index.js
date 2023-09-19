// @flow

// #region imports
import {
  type Storage,
  type TokenKey,
  type UserInfoKey,
  type STORES_TYPES,
} from '../../types/auth';
import decode from 'jwt-decode';
import isAfter from 'date-fns/isAfter';
import {gettoken} from '../fetchTools'
import { refreshToken } from "../API"
import Cookies from 'universal-cookie'
import { appConfig } from '../../config';
// #endregion

// #region constants
const TOKEN_KEY = 'token';
const USER_INFO = 'userInfo';
const cookies = new Cookies()
const APP_PERSIST_STORES_TYPES: Array<STORES_TYPES> = [
  'localStorage',
  'sessionStorage',
];

const parse = JSON.parse;
const stringify = JSON.stringify;
// #endregion

/*
  auth object
  -> store "TOKEN_KEY"
  - default storage is "localStorage"
  - default token key is 'token'
 */
export const auth = {
  // /////////////////////////////////////////////////////////////
  // TOKEN
  // /////////////////////////////////////////////////////////////

  /**
   * get token from localstorage
   *
   * @param {'localStorage' | 'sessionStorage'} [fromStorage='localStorage'] specify storage
   * @param {any} [tokenKey=TOKEN_KEY]  optionnal parameter to specify a token key
   * @returns {string} token value
   */
  getToken(
    fromStorage: Storage = APP_PERSIST_STORES_TYPES[0],
    tokenKey: TokenKey = TOKEN_KEY,
  ): ?string {
    // localStorage:
    if (fromStorage === APP_PERSIST_STORES_TYPES[0]) {
      return (localStorage && localStorage.getItem(tokenKey)) || null;
    }
    // sessionStorage:
    if (fromStorage === APP_PERSIST_STORES_TYPES[1]) {
      return (sessionStorage && sessionStorage.getItem(tokenKey)) || null;
    }
    // default:
    return null;
  },

  /**
   * set the token value into localstorage (managed by localforage)
   *
   * @param {string} [value=''] token value
   * @param {'localStorage' | 'sessionStorage'} [toStorage='localStorage'] specify storage
   * @param {any} [tokenKey='token'] token key
   * @returns {boolean} success/failure flag
   */
  setToken(
    value: string = '',
    toStorage: Storage = APP_PERSIST_STORES_TYPES[0],
    tokenKey: TokenKey = TOKEN_KEY,
  ): void {
    if (!value || value.length <= 0) {
      return;
    }
    // localStorage:
    if (toStorage === APP_PERSIST_STORES_TYPES[0]) {
      if (localStorage) {
        localStorage.setItem(tokenKey, value);
        return;
      }
    }
    // sessionStorage:
    if (toStorage === APP_PERSIST_STORES_TYPES[1]) {
      if (sessionStorage) {
        sessionStorage.setItem(tokenKey, value);
        return;
      }
    }
  },

  /**
   * check
   * - if token key contains a valid token value (defined and not an empty value)
   * - if the token expiration date is passed
   *
   *
   * Note: 'isAuthenticated' just checks 'tokenKey' on store (localStorage by default or sessionStorage)
   *
   * You may think: 'ok I just put an empty token key and I have access to protected routes?''
   *    -> answer is:  YES^^
   * BUT
   * -> : your backend will not recognize a wrong token so private data or safe and you protected view could be a bit ugly without any data.
   *
   * => ON CONCLUSION: this aim of 'isAuthenticated'
   *    -> is to help for a better "user experience"  (= better than displaying a view with no data since server did not accept the user).
   *    -> it is not a security purpose (security comes from backend, since frontend is easily hackable => user has access to all your frontend)
   *
   * @param {'localStorage' | 'sessionStorage'} [fromStorage='localStorage'] specify storage
   * @param {any} [tokenKey=TOKEN_KEY] token key
   * @returns {bool} is authenticed response
   */
  isAuthenticated(): boolean {
    // localStorage:
    let token=gettoken();
    // console.log('token',token)
    if (!token) return false;
    if (this.isExpiredToken(token)) {
      refreshToken({
              token: this.token, refreshtoken: this.refreshtoken
            })
        .then(res => {
          // console.log('refreshtoken',res)
          if (res.status === 201) {
            token=res.token;
            let refreshtoken=res.refreshtoken;
            cookies.set('token', token, { path: appConfig.DOMAIN });  
            cookies.set('refreshtoken', refreshtoken, { path: appConfig.DOMAIN }); 
       
          }else
          {
            return false;
          }
        })      
    }
    return true;
    
  },

  /**
   * delete token
   *
   * @param {any} [tokenKey='token'] token key
   * @returns {bool} success/failure flag
   */
  clearToken(): boolean {
    // localStorage:
    let token=gettoken();
    if (token) {
      this.logout()
      return true;
    }
    
    return false;
  },

  /**
   * return expiration date from token
   *
   * @param {string} encodedToken - base 64 token received from server and stored in local storage
   * @returns {date | null} returns expiration date or null id expired props not found in decoded token
   */
  getTokenExpirationDate(encodedToken: any): Date {
    if (!encodedToken) {
      return new Date(0); // is expired
    }

    const token = decode(encodedToken);
    // console.log('decode',token)
    if (!token.exp) {
      return new Date(0); // is expired
    }

    const expirationDate = new Date(token.exp * 1000);
    return expirationDate;
  },

  /**
   * tell is token is expired (compared to now)
   *
   * @param {string} encodedToken - base 64 token received from server and stored in local storage
   * @returns {bool} returns true if expired else false
   */
  isExpiredToken(encodedToken: any): boolean {
    const expirationDate = this.getTokenExpirationDate(encodedToken);
    const rightNow = new Date();
    const isExpiredToken = isAfter(rightNow, expirationDate);
    console.log(expirationDate)
    return isExpiredToken;
  },
  logout(){
      cookies.remove('token', {path: appConfig.DOMAIN})
      cookies.remove('refreshtoken', {path: appConfig.DOMAIN})
      sessionStorage.clear()
      localStorage.clear()  
      this.props.router.push('/login')
  },

  // /////////////////////////////////////////////////////////////
  // USER_INFO
  // /////////////////////////////////////////////////////////////
  /**
   * get user info from localstorage
   *
   * @param {'localStorage' | 'sessionStorage'} [fromStorage='localStorage'] specify storage
   * @param {any} [userInfoKey='userInfo']  optionnal parameter to specify a token key
   * @returns {string} token value
   */
  getUserInfo(
    fromStorage: Storage = APP_PERSIST_STORES_TYPES[0],
    userInfoKey: UserInfoKey = USER_INFO,
  ): any {
    // localStorage:
    if (fromStorage === APP_PERSIST_STORES_TYPES[0]) {
      return (
        (localStorage && parse(localStorage.getItem(userInfoKey) || '')) || null
      );
    }
    // sessionStorage:
    if (fromStorage === APP_PERSIST_STORES_TYPES[1]) {
      return (
        (sessionStorage && parse(sessionStorage.getItem(userInfoKey) || '')) ||
        null
      );
    }
    // default:
    return null;
  },

  /**
   * set the userInfo value into localstorage
   *
   * @param {object} [value=''] token value
   * @param {'localStorage' | 'sessionStorage'} [toStorage='localStorage'] specify storage
   * @param {any} [userInfoKey='userInfo'] token key
   * @returns {boolean} success/failure flag
   */
  setUserInfo(
    value: Object = null,
    toStorage: Storage = APP_PERSIST_STORES_TYPES[0],
    userInfoKey: UserInfoKey = USER_INFO,
  ): any {
    if (!value || value.length <= 0) {
      return;
    }

    // localStorage:
    if (toStorage === APP_PERSIST_STORES_TYPES[0]) {
      if (localStorage) {
        localStorage.setItem(userInfoKey, stringify(value));
        return;
      }
    }

    // sessionStorage:
    if (toStorage === APP_PERSIST_STORES_TYPES[1]) {
      if (sessionStorage) {
        sessionStorage.setItem(userInfoKey, stringify(value));
        return;
      }
    }
  },

  /**
   * delete userInfo
   *
   * @param {string} [userInfoKey='userInfo'] token key
   * @returns {bool} success/failure flag
   */
  clearUserInfo(userInfoKey: UserInfoKey = USER_INFO): any {
    // localStorage:
    if (localStorage && localStorage[userInfoKey]) {
      localStorage.removeItem(userInfoKey);
      return;
    }

    // sessionStorage:
    if (sessionStorage && sessionStorage[userInfoKey]) {
      sessionStorage.removeItem(userInfoKey);
      return;
    }
  },

  // /////////////////////////////////////////////////////////////
  // COMMON
  // /////////////////////////////////////////////////////////////

  /**
   * forget me method: clear all
   * @returns {bool} success/failure flag
   */
  
  clearAllAppStorage(): any {
    if (localStorage) {
      localStorage.clear();
      return;
    }

    if (sessionStorage) {
      sessionStorage.clear();
      return;
    }
  },
};

export default auth;
