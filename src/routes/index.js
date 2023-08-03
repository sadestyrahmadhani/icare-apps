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
            }
        ]
    }
]