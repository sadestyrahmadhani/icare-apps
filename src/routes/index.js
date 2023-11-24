import Layout from "./../views/main";


export default [
    {
        path: '',
        component: Layout,
        auth:false,
        key:"1",
        children: [
            {
                title:'',
                path:'',
                component: import('./../views/auth/login'),
                auth:false,
                key:"1.1"
            },
            {
                title:'',
                path:'dashboard',
                component: import('./../views/dashboard'),
                auth:true,
                key:"1.2"
            },           

            {
                title:'',
                path:'riwayat',
                component: import('./../views/riwayat'),
                auth:true,
                key:"1.3.1"
            },
            {
                title:'',
                path:'detail-permintaan/:id',
                component: import('./../views/riwayat/detail-permintaan'),
                auth:true,
                key:"1.3.2"
            },
            {
                title:'',
                path:'tulis_review',
                component: import('./../views/riwayat/tulis-review')
            },
            {
                title:'',
                path:'tanya_tim_support',
                component: import('./../views/riwayat/tanya-tim')
            },
    
            {
                      
                title:'',
                path:'informasi',
                component: import('./../views/informasi'),
                auth:true,
                key:"1.4"
            },
            
            {
                title:'',
                path:'data_diri',
                component: import('./../views/data-diri'),
                auth:true,
                key:"1.5.1"
            },
            {
                title: '',
                path:'daftar_alamat',
                component: import('../views/daftar-alamat'),
                auth:true,
                key:"1.5.2"
            },
            {
                title: '',
                path: 'tambah_alamat/:id',
                component: import('../views/daftar-alamat/form'),
                auth:true,
                key:"1.5.3"
            },
            {
                title: '',
                path: 'google_maps',
                component: import('../views/daftar-alamat/google-maps'),    
                auth:true,
                key:"1.5.3"
            },
            {
                title:'',
                path:'daftar_eq',
                component: import('./../views/daftar-eq'),
                auth:true,
                key:"1.5.4"
            },
            {
                title: '',
                path: 'tambah_eq/:id',
                component: import('../views/daftar-eq/form'),
                auth:true,
                key:"1.5.5"
            },
            {
                title: '',
                path: 'ubah_kata_sandi',
                component: import('../views/ubah-password'),
                auth:true,
                key:"1.5.6"
            },
            {
                title:'',
                path:'daftar_anggota',
                component: import('./../views/daftar-anggota'),
                auth:true,
                key:"1.5.7"
            },
            {
                title:'',
                path:'tambah_anggota',
                component: import('../views/daftar-anggota/form'),
                auth:true,
                key:'1.5.8'
            },
               
            {
                title:'',
                path:'breakfix_request/:id',
                component: import('./../views/menu/breakfix'),
                auth:true, 
                key:"1.6"
            },
            {
                title:'',
                path:'install_request',
                component: import('../views/menu/install'),
                auth:true,
                key:"1.7"
            },
            {
                title:'',
                path:'supplies_request',
                component: import('./../views/menu/supplies'),
                auth:true,
                key:"1.8"
            },
           
            {
                title: '',
                path: 'collect_meter',
                component: import('./../views/menu/collect-meter'),
                auth: true,
                key:"1.9.1"    
            },
            
            {
                title: '',
                path: 'riwayat_meter/:id',
                component: import('./../views/riwayat-meter'),
                auth:true,
                key:"1.9.2"    
            },
   
            {
                title: '',
                path: 'upgrade_step1',
                component: import('../views/upgrade-akun/upgrade'),
                key:"1.10.1"    
            },
            {
                title: '',
                path: 'upgrade_step2',
                component: import('../views/upgrade-akun/form'),
                auth:true,
                key:"1.10.2"    
            },
            {
                title: '',
                path: 'upgrade_step3',
                component: import('../views/upgrade-akun/waiting'),
                auth:true,
                key:"1.10.3"    
            },

            {
                title: '',
                path: 'news_detail',
                component: import('./../views/berita-terbaru'),
                auth: true,

            },
            // Path sama dengan news : news_detail
            {
                title: '',
                path: 'product_detail',
                component: import('./../views/berita-terbaru/produk'),
                auth: true,
            },
            
        
    {
        title: '',
        path: 'settings',
        auth:true,
        component: import('../views/setting')
    },
    {
        title:'',
        path:'kebijakan-privasi/:type?',
        component: import('../views/auth/kebijakan-privasi'),
        key:"2"
    }, 
    {
        title:'',
        path:'register',
        component: import('../views/auth/register'),
        key:"3"
    },
    {
        title:'',
        path:'lupa-password',
        component: import('../views/auth/lupa-password'),
        key:"4"
    },
    {
        title:'',
        path:'kode-otp',
        component: import('../views/auth/kode-otp'),
	    key:"5"
    },
    {
        title:'',
        path:'update_password',
        component: import('../views/ubah-password/update-password'),
        key:"6"
    }
]
}
]

