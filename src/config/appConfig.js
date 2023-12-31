// @flow
const {BASE_API} =window['runConfig']
const {LDAP_API} =window['runConfig']
const {domain} =window['runConfig']
export const appConfig = Object.freeze({
  APP_NAME: 'reactDirector',
  // dev mode to mock async data for instance
  DEV_MODE: true,
  // When you need some kind "console spam" to debug
  DEBUG_ENABLED: true,
  // fake delay to mock async
  FAKE_ASYNC_DELAY: 1000,
  BASE_API: BASE_API,
  LDAP_API: LDAP_API,//"BASE_API": "http://192.168.5.200/icare/",
  DOMAIN:domain,
  CONNECTION_STATUS: {
    online: 'online',
    disconnected: 'disconnected',
  },

  // #region API configs
  earningGraph: {
    data: {
      API: 'api/earnigGraphData',
    },
  },
  teamMates: {
    data: {
      API: 'api/teamMates',
    },
  },
  userInfos: {
    data: {
      API: 'api/userInfos',
    },
  },
  // #endregion

  HELLO_WORD: 'Hello',
});
