import React, {useState, useEffect} from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { Sendrequest, onMessageListener } from './firebase';

const Notification = () => {
const [notification, setNotification] = useState({title: '', body: ''});  
}
const notify = () =>  toast(<ToastDisplay/>);
  
function ToastDisplay() {
   useEffect(() => {
    if (notification?.title) {
        notify()
    }
}, [notification])
  return (
    <div>
      <p><b>{notification?.title}</b></p>
      <p>{notification?.body}</p>
    </div>
  );
};
export default Notification