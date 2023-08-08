import daftarEq from "../views/daftar-eq";
import Layout from "./../views/main";

export default [
    {
        path: '',
        component: Layout,
        children: [
            {
                title:'Login',
                path:'',
                component: import('./../views/auth/login')
            },
            {
                title:'Dashboard',
                path:'dashboard',
                component: import('./../views/dashboard')
            },
            {
                title:'Riwayat',
                path:'riwayat',
                component: import('./../views/riwayat')
            },
            {
                title:'Informasi',
                path:'informasi',
                component: import('./../views/informasi')
            },
            {
                title:'Daftar-EQ',
                path:'daftar-eq',
                component: import('./../views/daftar-eq')
            },
            {
                title:'Data-Diri',
                path:'data-diri',
                component: import('./../views/data-diri')
            },
            {
                title:'Install',
                path:'install',
                component: import('./../views/install')
            }
        ]
    }
]