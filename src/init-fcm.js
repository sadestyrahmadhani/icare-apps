
// import { getMessaging } from "firebase/messaging/sw";


// const firebaseApp=initializeApp({
//   apiKey: "AIzaSyA5B8lIJvw0LoG64NOdvflbLxegxv-6kdw",
//   authDomain: "conserv-8de54.firebaseapp.com",
//   databaseURL: "https://conserv-8de54.firebaseio.com",
//   projectId: "conserv-8de54",
//   storageBucket: "conserv-8de54.appspot.com",
//   messagingSenderId: "191941183516",
//   appId: "1:191941183516:web:d6c05110720ea5075077d9"
// });

// let messaging = getMessaging(firebaseApp);
// const tkn=await getToken(messaging, {vapidKey: "BHcT8mOKjG_to3JlEHVuwmdehV8pINLGkhD04CgZ-72rBtq20TBJ9PDnw9AMlThsj6RR04YnuUWwUKy7FFaUPW4"});
// console.log('get token',tkn)
// // 
// onMessage(function (payload) {
//   try {  //try???
//     console.log('Message received. ', payload);

//     const noteTitle = payload.notification.title;
//     const noteOptions = {
//       body: payload.notification.body,
//       icon: "typewriter.jpg", //this is my image in my public folder
//     };

//     console.log("title ", noteTitle, " ", payload.notification.body);
//     //var notification = //examples include this, seems not needed

//     new Notification(noteTitle, noteOptions).onclick = function (event) {
//       // console.log(event);
//       // console.log(payload.notification.click_action);
//       if(payload && payload.notification &&  payload.notification.click_action &&  payload.notification.click_action.length > 0)
//       {
//         window.open(payload.notification.click_action, '_blank');
//       }
//       this.close();
//     };
//   }
//   catch (err) {
//     console.log('Caught error: ', err);
//   }
// });

// messaging.usePublicVapidKey(
//   "BHcT8mOKjG_to3JlEHVuwmdehV8pINLGkhD04CgZ-72rBtq20TBJ9PDnw9AMlThsj6RR04YnuUWwUKy7FFaUPW4"
// );

// export { messaging };