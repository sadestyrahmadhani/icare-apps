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
                path:'',
                component:'',
                children: [

                    {
                        title:'Riwayat',
                        path:'riwayat',
                        component: import('./../views/riwayat')
                    },
                    {
                        title:'Detail Permintaan',
                        path:'detail-permintaan',
                        component: import('./../views/riwayat/detail-permintaan')
                    },
                ]
            },
            {
                title:'Breakfix',
                path:'breakfix',
                component: import('./../views/menu/breakfix')
            },
            {
                title:'Informasi',
                path:'informasi',
                component: import('./../views/informasi')
            },
            {
                path:'',
                component:'',
                children: [
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
                        title: 'Address',
                        path:'address',
                        component: import('../views/alamat')
                    },
                    {
                        title: "Change Password",
                        path: 'change-password',
                        component: import('../views/ubah-password')
                    }      
                ]
            },
            {
                title:'Install',
                path:'install',
                component: import('../views/menu/install'),
            },
            
            
        ]
    },
    {
        title:'Kebijakan-Privasi',
        path:'kebijakan-privasi/:type?',
        component: import('../views/auth/kebijakan-privasi')
    }, 
    {
        title:'Registrasi',
        path:'register',
        component: import('../views/auth/register')
    },
    {
        title:'Lupa-Password',
        path:'lupa-password',
        component: import('../views/auth/lupa-password')
    },
    {
        title:'Kode-OTP',
        path:'kode-otp',
        component: import('../views/auth/kode-otp')
    }
]

