import React, {Suspense, lazy, useState} from 'react';
import ReactDOM from 'react-dom/client';
// import { Routes, Route, Navigate, useLocation, useNavigate, useParams,Outlet } from 'react-router-dom';
import { Routes, BrowserRouter, Navigate, HashRouter,createBrowserRouter, RouterProvider, } from 'react-router-dom';
import Route from './core/route'
// import { messaging } from "./init-fcm";
import 'bootstrap/dist/css/bootstrap.min.css';
import './styled/style.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import {auth} from './services/auth';
import Login from  './views/auth/login';
// import Layout from "./views/main";
// import App from "./App"
const Layout = React.lazy(() => import('./views/main'));
const Dashboard = React.lazy(() => import('./views/dashboard'));
const Riwayat = React.lazy(() => import('./views/riwayat'));
const DetailPermintaan = React.lazy(() => import('./views/riwayat/detail-permintaan'));
const TulisReview = React.lazy(() => import('./views/riwayat/tulis-review'));
const TanyaTim = React.lazy(() => import('./views/riwayat/tanya-tim'));
const Informasi = React.lazy(() => import('./views/informasi'));
const DataDiri = React.lazy(() => import('./views/data-diri'));
const DaftarAlamat = React.lazy(() => import('./views/daftar-alamat'));
const DaftarAlamatForm = React.lazy(() => import('./views/daftar-alamat/form'));
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

const ProtectedRoute = ({ children }) => {

  // if (!auth.isAuthenticated()) {
  //   return <Navigate to="/" replace />;
  // }

  return children;
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,    
  },
  {
    path: "",
    element: <Layout />,
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
        path: "/detail-permintaan/:id",
        element: <Suspense fallback="Loading..."><ProtectedRoute><DetailPermintaan /></ProtectedRoute></Suspense>,    
      },
      {
        path: "/tulis_review",
        element: <Suspense fallback="Loading..."><ProtectedRoute><TulisReview /></ProtectedRoute></Suspense>,    
      },
      {
        path: "/tanya_tim_support",
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
        path: "/daftar_alamat",
        element: <Suspense fallback="Loading..."><ProtectedRoute><DaftarAlamat /></ProtectedRoute></Suspense>,    
      },
      {
        path: "/tambah_alamat/:id",
        element: <Suspense fallback="Loading..."><ProtectedRoute><DaftarAlamatForm /></ProtectedRoute></Suspense>,    
      },
      {
        path: "/daftar_eq",
        element: <Suspense fallback="Loading..."><ProtectedRoute><DaftarEq /></ProtectedRoute></Suspense>,    
      },
      {
        path: "/form_eq/:id?",
        element: <Suspense fallback="Loading..."><ProtectedRoute><DaftarEqForm /></ProtectedRoute></Suspense>,    
      },
      {
        path: "/ubah_kata_sandi",
        element: <Suspense fallback="Loading..."><ProtectedRoute><UbahPassword /></ProtectedRoute></Suspense>,    
      },
      {
        path: "/breakfix_request",
        element: <Suspense fallback="Loading..."><ProtectedRoute><Breakfix /></ProtectedRoute></Suspense>,    
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
        path: "/riwayat-meter",
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
        path: "/news_detail",
        element: <Suspense fallback="Loading..."><ProtectedRoute><BeritaTerbaru /></ProtectedRoute></Suspense>,    
      },
      {
        path: "/product_detail",
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
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
    
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
