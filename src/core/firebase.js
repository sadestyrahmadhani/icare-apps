import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseApp=initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);


export const getToken = (setTokenFound) => {
  return getToken(messaging, {vapidKey: 'GENERATED_MESSAGING_KEY'}).then((currentToken) => {
    if (currentToken) {
      console.log('current token for client: ', currentToken);
      setTokenFound(true);
      // Track the token -> client mapping, by sending to backend server
      // show on the UI that permission is secured
    } else {
      console.log('No registration token available. Request permission to generate one.');
      setTokenFound(false);
      // shows on the UI that permission is required 
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // catch error while creating client token
  });
}
export const Sendrequest = () => {
  console.log("Requesting User Permission......");
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      return getToken(messaging, { vapidKey: `Notification_key_pair` })
        .then((currentToken) => {
          if (currentToken) {
            console.log('Client Token: ', currentToken);
            
          } else {
            
            console.log('Failed to generate the registration token.');
          }
        })
        .catch((err) => {
          console.log('An error occurred when requesting to receive the token.', err);
        });
    } else {
      console.log("User Permission Denied.");
    }
  });
}
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
});
Sendrequest();