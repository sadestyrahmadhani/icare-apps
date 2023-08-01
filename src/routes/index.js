import Layout from "./../views/main";

export default [
    {   
        title: 'Login',
        path: '',
        component: import('./../views/auth/login')
    },
    {
        title:'Apps',
        component: Layout,
        children: [
            {
                title:'Beranda',
                path:'dashboard',
                component: import('./../views/dashboard')
            }
        ]
    }
]