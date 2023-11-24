importScripts("https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/10.4.0/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyA5B8lIJvw0LoG64NOdvflbLxegxv-6kdw",
  authDomain: "conserv-8de54.firebaseapp.com",
  databaseURL: "https://conserv-8de54.firebaseio.com",
  projectId: "conserv-8de54",
  storageBucket: "conserv-8de54.appspot.com",
  messagingSenderId: "191941183516",
  appId: "1:191941183516:web:d6c05110720ea5075077d9",
  measurementId: "G-4BK488NCG8"
});

const messaging = firebase.messaging();

self.addEventListener('notificationclick', function (event) {
    console.debug('SW notification click event', event)
    const url = event.notification.click_action;
    channel.postMessage({
        type: 'notification_clicked',
        data: {
          title: event.notification.title,
          clickAction: url
        }
      });
})

messaging.onBackgroundMessage((m) => {
  console.log('on background message',m)
  const notificationTitle = m.notification.title;
    const notificationOptions = {
      body: m.notification.body,
  };
});