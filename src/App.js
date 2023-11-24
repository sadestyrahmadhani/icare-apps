import React, { useState } from "react";
import { initializeApp }  from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { setFirebaseToken } from "./services/API";
function App() {
  const [token, setToken]= useState('')
  const serverkey = "AAAA9VTiNyE:APA91bGzoX4grTE-2Wcy2f3fPrrTDSEm86nRTLV5uUjJEkx1w0n8MrqE-MC5CKL6xje7MQrz9a9RNrFIZoyrJqJzc7MWvt-uB8e8Hhssg1o5qzAqkgTO7vCgmNdRoJ3bha7ILA8EYdrf";
  const firebaseApp=initializeApp({
    apiKey: "AIzaSyA5B8lIJvw0LoG64NOdvflbLxegxv-6kdw",
    authDomain: "conserv-8de54.firebaseapp.com",
    databaseURL: "https://conserv-8de54.firebaseio.com",
    projectId: "conserv-8de54",
    storageBucket: "conserv-8de54.appspot.com",
    messagingSenderId: "191941183516",
    appId: "1:191941183516:web:d6c05110720ea5075077d9"
  });
  let messaging = getMessaging(firebaseApp);
  
  messaging.onMessage( (payload) => {
    try {  //try???
      console.log('Message received. ', payload);

      const noteTitle = payload.notification.title;
      const noteOptions = {
        body: payload.notification.body,
        icon: "typewriter.jpg", //this is my image in my public folder
      };

      console.log("title ", noteTitle, " ", payload.notification.body);
      //var notification = //examples include this, seems not needed

      new Notification(noteTitle, noteOptions).onclick = function (event) {
        // console.log(event);
        // console.log(payload.notification.click_action);
        if(payload && payload.notification &&  payload.notification.click_action &&  payload.notification.click_action.length > 0)
        {
          window.open(payload.notification.click_action, '_blank');
        }
        this.close();
      };
    }
    catch (err) {
      console.log('Caught error: ', err);
    }
  });
  const refreshToken = async () => {

    const tkn= await getToken(messaging, {vapidKey: "BHcT8mOKjG_to3JlEHVuwmdehV8pINLGkhD04CgZ-72rBtq20TBJ9PDnw9AMlThsj6RR04YnuUWwUKy7FFaUPW4"});
      console.log('new token',tkn)
      setToken(tkn);
      setFirebaseToken(tkn);
  };  


// messaging
//         .requestPermission()
//         .then(async function() {
//           const token = await messaging.getToken();
//           console.log('get token',token)
//           setToken(token);
//         })
//         .catch(function(err) {
//           console.log("Unable to get permission to notify.", err);
//         });
const App = () => (
  <>
   
  </>
);


      
      
}

export default App;