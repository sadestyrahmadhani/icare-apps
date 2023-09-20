import { Routes, Route, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import React from 'react';
import ObjectRoute from './../routes';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import {auth} from '../services/auth'

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

const mappingRoutes = (routes) => {    
    return routes.map((value, key) => {        
        // console.log('key',value.key)
        
        if (!value.auth) value.auth=false
        if(typeof value.children != "undefined") {
            if(typeof value.component == 'object') {
                console.log('object',value)
                let Component = React.lazy(() => value.component)
                return(
                    <Route 
                        path={ value.path }
                        key={ value.key }
                        element={
                            <React.Suspense
                                fallback="Loading..."
                            >
                                <Component/>
                            </React.Suspense>
                        }
                    >
                        { mappingRoutes(value.children) }
                    </Route>
                )
            } else {
                console.log('not object',value,value.ch)
                return(
                    <Route
                        path={ value.path }
                        key={ value.key }
                        Component={ value.component }
                    >
                        { mappingRoutes(value.children) }
                    </Route>
                )
            }
        } else {

            if(typeof value.component == 'object') {
                let Component = React.lazy(() => value.component)
                return(
                    <Route 
                        path={ value.path }
                        key={ value.key }                        
                        element={
                            // (auth.isAuthenticated() === true || !value.auth) ?
                            <React.Suspense
                                fallback="Loading..."
                        >
                                <CreateRouteComponent component={Component} data={ value } />
                            </React.Suspense>
                            // : <Navigate to='/' />
                        }
                    />
                )
            } else 
            {
                let Component = value.component
                return(
                    <Route
                        path={ value.path }
                        key={ value.key }                        
                        element={ 
                            // (auth.isAuthenticated() === true || !value.auth) ? 
                            <CreateRouteComponent component={Component} data={ value } />
                            // : <Navigate to='/' />
                        }
                    />
                )
            }
        } 
    })
}

export default () => {    
    return(
        <Routes>
            { mappingRoutes(ObjectRoute) }
        </Routes>
    )
}
