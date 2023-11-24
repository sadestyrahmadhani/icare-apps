import React, {Suspense, lazy, useState, useRef} from 'react';
import ReactDOM from 'react-dom/client';
// import { Routes, Route, Navigate, useLocation, useNavigate, useParams,Outlet } from 'react-router-dom';
import { Routes, BrowserRouter, Navigate, HashRouter,createBrowserRouter, RouterProvider, } from 'react-router-dom';
import { initializeApp }  from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { setFirebaseToken } from "./services/API";
import Route from './core/route'
import Swal from "sweetalert2";
import 'bootstrap/dist/css/bootstrap.min.css';
import './styled/style.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import {auth} from './services/auth';
import Login from  './views/auth/login';
import { GoogleOAuthProvider } from '@react-oauth/google';
import QRScanner from './views/menu/scanner';

// import Layout from "./views/main";
const Layout = React.lazy(() => import('./views/main'));
const Dashboard = React.lazy(() => import('./views/dashboard'));
const Riwayat = React.lazy(() => import('./views/riwayat'));
const DetailPermintaan = React.lazy(() => import('./views/riwayat/detail-permintaan'));
const TulisReview = React.lazy(() => import('./views/riwayat/tulis-review'));
const TanyaTim = React.lazy(() => import('./views/riwayat/tanya-tim'));
const Informasi = React.lazy(() => import('./views/informasi'));
const DataDiri = React.lazy(() => import('./views/data-diri'));
const DaftarAnggota = React.lazy(() => import('./views/daftar-anggota'));
const DaftarAnggotaForm = React.lazy(() => import('./views/daftar-anggota/form'));
const DaftarAlamat = React.lazy(() => import('./views/daftar-alamat'));
const DaftarAlamatForm = React.lazy(() => import('./views/daftar-alamat/form'));
const DaftarAlamatMaps = React.lazy(() => import('./views/daftar-alamat/google-maps'));
const DaftarEq = React.lazy(() => import('./views/daftar-eq'));
const DaftarEqForm = React.lazy(() => import('./views/daftar-eq/form'));
const UbahPassword = React.lazy(() => import('./views/ubah-password'));
const Breakfix = React.lazy(() => import('./views/menu/breakfix'));
const Install = React.lazy(() => import('./views/menu/install'));
const Supplies = React.lazy(() => import('./views/menu/supplies'));
const CollectMeter = React.lazy(() => import('./views/menu/collect-meter'));
const RiwayatMeter = React.lazy(() => import('./views/riwayat-meter'));
const UpgradeAkun = React.lazy(() => import('./views/upgrade-akun/upgrade'));
const UpgradeAkunForm = React.lazy(() => import('./views/upgrade-akun/form'));
const UpgradeAkunWaiting = React.lazy(() => import('./views/upgrade-akun/waiting'));
const BeritaTerbaru = React.lazy(() => import('./views/berita-terbaru'));
const BeritaTerbaruProduk = React.lazy(() => import('./views/berita-terbaru/produk'));
const Setting = React.lazy(() => import('./views/setting'));
const KebijakanPrivasi = React.lazy(() => import('./views/auth/kebijakan-privasi'));
const Register = React.lazy(() => import('./views/auth/register'));
const LupaPassword = React.lazy(() => import('./views/auth/lupa-password'));
const KodeOtp = React.lazy(() => import('./views/auth/kode-otp'));
const UpdatePassword = React.lazy(() => import('./views/ubah-password/update-password'));
const root = ReactDOM.createRoot(document.getElementById('root'));

// debugger;

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
// if ("serviceWorker" in navigator) {
  // navigator.serviceWorker
  //   .register("./firebase-messaging-sw.js")
  //   .then(function(registration) {
  //     console.log("Registration successful, scope is:", registration.scope);
  //   })
  //   .catch(function(err) {
  //     console.log("Service worker registration failed, error:", err);
  //   });
// }
    Notification.requestPermission()
        .then((permission) => {
          if (permission === 'granted') {
          console.log('Notification permission granted.');
          }else{
            console.log('Notification permission not granted ', permission)
          }
        })
        .catch(function(err) {
          console.log("Unable to get permission to notify.", err);
        });
        
  const refreshToken = async () => {

    // const tkn= await getToken(messaging, {vapidKey: "BHcT8mOKjG_to3JlEHVuwmdehV8pINLGkhD04CgZ-72rBtq20TBJ9PDnw9AMlThsj6RR04YnuUWwUKy7FFaUPW4"});
    //   console.log('new token',tkn)
    //   // setToken(tkn);
    //   setFirebaseToken(tkn);
    //   setMessage();
  };  
  const setMessage = ()=>{
    onMessage(messaging,function (payload) {
          try {  //try???
            console.log('Message received. ', payload);

            const noteTitle = payload.notification.title;
            const noteOptions = {
              body: payload.notification.body,
              icon: "typewriter.jpg", //this is my image in my public folder
            };
            Swal.fire({
                text:payload.notification.body,
                title:payload.notification.title,
                confirmButtonColor:'#0099ff'
            })
            console.log("title ", noteTitle, " ", payload.notification.body);
            //var notification = //examples include this, seems not needed

            // new Notification(noteTitle, noteOptions).onclick = function (event) {
            //   // console.log(event);
            //   // console.log(payload.notification.click_action);
            //   if(payload && payload.notification &&  payload.notification.click_action &&  payload.notification.click_action.length > 0)
            //   {
            //     window.open(payload.notification.click_action, '_blank');
            //   }
            //   this.close();
            // };
          }
          catch (err) {
            console.log('Caught error: ', err);
          }
        });
  }
  // setMessage();
const ProtectedRoute = ({ children }) => {

  if (!auth.isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  return children;
};
const router = createBrowserRouter([
  {
    path: "/:id?",
    element: <Login getToken={refreshToken} />,    
  },
  {
    path: "",
    element: <Suspense fallback="Loading..."><ProtectedRoute><Layout /></ProtectedRoute></Suspense>,
    children: [
      {
        path: "/dashboard",
        element: <Suspense fallback="Loading..."><ProtectedRoute><Dashboard /></ProtectedRoute></Suspense>,    
      },
      {
        path: "/breakfix_request",
        element: <Suspense fallback="Loading..."><ProtectedRoute><Breakfix /></ProtectedRoute></Suspense>,    
      },
      {
        path: "/riwayat",
        element: <Suspense fallback="Loading..."><ProtectedRoute><Riwayat /></ProtectedRoute></Suspense>,    
      },
      {
        path: "/detail_permintaan/:id",
        element: <Suspense fallback="Loading..."><ProtectedRoute><DetailPermintaan /></ProtectedRoute></Suspense>,    
      },
      {
        path: "/tulis_review",
        element: <Suspense fallback="Loading..."><ProtectedRoute><TulisReview /></ProtectedRoute></Suspense>,    
      },
      {
        path: "/tanya_tim_support/:id",
        element: <Suspense fallback="Loading..."><ProtectedRoute><TanyaTim /></ProtectedRoute></Suspense>,    
      },
      {
        path: "/informasi",
        element: <Suspense fallback="Loading..."><ProtectedRoute><Informasi /></ProtectedRoute></Suspense>,    
      },
      {
        path: "/data_diri",
        element: <Suspense fallback="Loading..."><ProtectedRoute><DataDiri /></ProtectedRoute></Suspense>,    
      },
      {
        path: "/daftar_anggota",
        element: <Suspense fallback="Loading..."><ProtectedRoute><DaftarAnggota /></ProtectedRoute></Suspense>,
      },
      {
        path: "/tambah_anggota/:id",
        element: <Suspense fallback="Loading..."><ProtectedRoute><DaftarAnggotaForm /></ProtectedRoute></Suspense>,
      },
      {
        path: "/daftar_alamat",
        element: <Suspense fallback="Loading..."><ProtectedRoute><DaftarAlamat /></ProtectedRoute></Suspense>,    
      },
      {
        path: "/tambah_alamat",
        element: <Suspense fallback="Loading..."><ProtectedRoute><DaftarAlamatForm /></ProtectedRoute></Suspense>,    
      },
      {
        path: "/daftar_eq",
        element: <Suspense fallback="Loading..."><ProtectedRoute><DaftarEq /></ProtectedRoute></Suspense>,    
      },
      {
        path: "/tambah_eq/:id?",
        element: <Suspense fallback="Loading..."><ProtectedRoute><DaftarEqForm /></ProtectedRoute></Suspense>,    
      },
      {
        path: "/ubah_kata_sandi",
        element: <Suspense fallback="Loading..."><ProtectedRoute><UbahPassword /></ProtectedRoute></Suspense>,    
      },
      {
        path: "/install_request",
        element: <Suspense fallback="Loading..."><ProtectedRoute><Install /></ProtectedRoute></Suspense>,    
      },
      {
        path: "/supplies_request",
        element: <Suspense fallback="Loading..."><ProtectedRoute><Supplies /></ProtectedRoute></Suspense>,    
      },
      {
        path: "/collect_meter",
        element: <Suspense fallback="Loading..."><ProtectedRoute><CollectMeter /></ProtectedRoute></Suspense>,    
      },
      {
        path: "/riwayat_meter/:id",
        element: <Suspense fallback="Loading..."><ProtectedRoute><RiwayatMeter /></ProtectedRoute></Suspense>,    
      },
      {
        path: "/upgrade_step1",
        element: <Suspense fallback="Loading..."><ProtectedRoute><UpgradeAkun /></ProtectedRoute></Suspense>,    
      },
      {
        path: "/upgrade_step2",
        element: <Suspense fallback="Loading..."><ProtectedRoute><UpgradeAkunForm /></ProtectedRoute></Suspense>,    
      },
      {
        path: "/upgrade_step3",
        element: <Suspense fallback="Loading..."><ProtectedRoute><UpgradeAkunWaiting /></ProtectedRoute></Suspense>,    
      },
      {
        path: "/news_detail/:id",
        element: <Suspense fallback="Loading..."><ProtectedRoute><BeritaTerbaru /></ProtectedRoute></Suspense>,    
      },
      {
        path: "/product_detail/:id",
        element: <Suspense fallback="Loading..."><ProtectedRoute><BeritaTerbaruProduk /></ProtectedRoute></Suspense>,    
      },
      ]    
  },
  {
    path: "/settings",
    element: <Suspense fallback="Loading..."><ProtectedRoute><Setting /></ProtectedRoute></Suspense>,    
  },
  {
    path: "/kebijakan-privasi/:type?",
    element: <Suspense fallback="Loading..."><KebijakanPrivasi /></Suspense>,    
  },
  {
    path: "/register",
    element: <Suspense fallback="Loading..."><Register /></Suspense>,    
  },
  {
    path: "/lupa-password",
    element: <Suspense fallback="Loading..."><LupaPassword /></Suspense>,    
  },
  {
    path: "/kode-otp",
    element: <Suspense fallback="Loading..."><KodeOtp /></Suspense>,    
  },
  {
    path: "/update_password",
    element: <Suspense fallback="Loading..."><UpdatePassword /></Suspense>,    
  },
  {
    path: "/google_maps",
    element: <Suspense fallback="Loading..."><ProtectedRoute><DaftarAlamatMaps /></ProtectedRoute></Suspense>,    
  },
  {
    path: "/qr-scanner",
    element: <Suspense fallback="Loading..."><ProtectedRoute><QRScanner /></ProtectedRoute></Suspense>,    
  },
]);

root.render(
  <>
  <React.StrictMode>
  <GoogleOAuthProvider clientId="776828661409-i24mjr032oc9eb8k6v8u2dv7ifftplvb.apps.googleusercontent.com">
    <RouterProvider router={router} />
  </GoogleOAuthProvider>
  </React.StrictMode>
  </>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
