import { Routes, Route, Navigate, useLocation, useNavigate, useParams,Outlet } from 'react-router-dom';
import React, {Suspense, lazy} from 'react';
import ObjectRoute from './../routes';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import {auth} from '../services/auth';
import Login from  './../views/auth/login';
import Layout from "./../views/main";
const Dashboard = React.lazy(() => import('./../views/dashboard'));
const Breakfix = React.lazy(() => import('./../views/menu/breakfix'));


const CreateRouteComponent = (props) => {
    const location = useLocation()
    const navigate = useNavigate()
    const params = useParams()
    const Component = props.component

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>{ props.data.title }iCare</title>
                </Helmet>
            </HelmetProvider>
            <Component router={{ location, navigate, params }} />
        </>
    )
}
const CreateProtectedRouteComponent = (props) => {
    const location = useLocation()
    const navigate = useNavigate()
    const params = useParams()
    const Component = props.component
    if (!auth.isAuthenticated()) {
        return <Navigate to="/" state={{ from: location }} />;
    }else{
        return (
            <>
                <HelmetProvider>
                    <Helmet>
                        <title>{ props.data.title }iCare</title>
                    </Helmet>
                </HelmetProvider>
                <Component router={{ location, navigate, params }} />
            </>
        )
    }
}

// const mappingRoutes = async (routes) =>  {
//     // console.log('mappingRoutes',auth.isAuthenticated())
//     try{    
//     return await routes.map(async (value, key) => {        
//         // console.log('key',value.key)
        
//         console.log('mappingRoutes',value.path,value.children, typeof value.children)
//         if (!value.auth) value.auth=false
//         if(typeof value.children != "undefined") {
//             if(typeof value.component == 'object') {
                
//                 let Component = React.lazy(() => value.component)
//                 return(
//                     <Route 
//                         path={ value.path }
//                         key={ value.key }
//                         element={                            
//                             <Suspense
//                                 fallback="Loading..."
//                             >
//                                 <Component/>
//                             </Suspense>                            
//                         }
//                     >
//                         { await mappingRoutes(value.children) }
//                     </Route>
//                 )
//             } else {
//                 console.log('not object',value,value.ch)
//                 return(
//                     <Route
//                         path={ value.path }
//                         key={ value.key }
//                         Component={ value.component }
//                     >
//                         { await mappingRoutes(value.children) }
//                     </Route>
//                 )
//             }
//         } else {
            
//             if(typeof value.component == 'object') {
//                 let Component = React.lazy(() => value.component)
//                 return(
//                     <Route
//                         path={ value.path }
//                         key={ value.key }                        
//                         element={ (!value.auth) ?                            
//                             <CreateRouteComponent component={Component} data={ value } />
//                             : 
//                             <CreateProtectedRouteComponent component={Component} data={value}/>
//                         }
//                     />
//                 )
//             }else{
//                 let Component = value.component
//                 return(
//                     <Route
//                         path={ value.path }
//                         key={ value.key }                        
//                         element={ (!value.auth) ? 
//                             <CreateRouteComponent component={Component} data={ value } />
//                             : 
//                             <CreateProtectedRouteComponent component={Component} data={value}/>
//                         }
//                     />
//                     )
//             }
            
//         } 
//     })
//     }catch(e){
//         debugger;
//         console.log('error',e)
//     }
// }

export default () => {    
    debugger;
    console.log('mappingRoutes default') 
    return(
        <Routes>
            <Route path={ '' }  element={ <Login /> }/>
            
            
        </Routes>
    )
}
