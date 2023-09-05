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
                      
                title:'Informasi',
                path:'informasi',
                component: import('./../views/informasi')
            },
            {
                path:'',
                component:'',
                children: [
                    {
                        title:'Data Diri',
                        path:'data_diri',
                        component: import('./../views/data-diri')
                    },
                    {
                        title: 'Daftar Alamat',
                        path:'daftar_alamat',
                        component: import('../views/daftar-alamat')
                    },
                    {
                        title: 'Tambah Alamat',
                        path: 'tambah_alamat',
                        component: import('../views/daftar-alamat/form')
                    },
                    {
                        title:'Daftar EQ',
                        path:'daftar_eq',
                        component: import('./../views/daftar-eq')
                    },
                    {
                        title: 'Form EQ',
                        path: 'form_eq',
                        component: import('../views/daftar-eq/form')
                    },
                    {
                        title: "Ubah Kata Sandi",
                        path: 'ubah_kata_sandi',
                        component: import('../views/ubah-password')
                    }      
                ]
            },
            {
                title:'Breakfix',
                path:'breakfix-request',
                component: import('./../views/menu/breakfix')
            },
            {
                title:'Install',
                path:'install_request',
                component: import('../views/menu/install'),
            },
            {
                title:'Supplies',
                path:'supplies_request',
                component: import('./../views/menu/supplies')
            },
            {
                path: '',
                component: '',
                children: [
                    {
                        title: 'Collect Meter',
                        path: 'collect-meter',
                        component: import('./../views/menu/collect-meter')
    
                    },
                    
                    {
                        title: 'Riwayat Meter',
                        path: 'riwayat-meter',
                        component: import('./../views/riwayat-meter')

                    }
                ]            
            },
            {
                path: '',
                component: '',
                children: [
                    {
                        title: 'Upgrade Akun iCare',
                        path: 'upgrade_step1',
                        component: import('../views/upgrade-akun/upgrade')
                    },
                    {
                        title: 'Upgrade Akun iCare',
                        path: 'upgrade_step2',
                        component: import('../views/upgrade-akun/form')
                    },
                    {
                        title: 'Menunggu Upgrade Akun iCare',
                        path: 'upgrade_step3',
                        component: import('../views/upgrade-akun/waiting')
                    }
                ]
            },
            
        ]
    },
    {
        title: 'Setting',
        path: 'settings',
        component: import('../views/setting')
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

