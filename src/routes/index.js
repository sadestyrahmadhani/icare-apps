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
                title:'Kebijakan Privasi',
                path:'kebijakan-privasi',
                component: import('../views/kebijakan-privasi')
            },
            {
                title:'Registrasi',
                path:'register',
                component: import('../views/auth/register')
            },
            
        ]
    }
]