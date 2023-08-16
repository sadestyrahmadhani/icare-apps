import { Routes, Route, useLocation, useNavigate, useParams } from 'react-router-dom';
import React from 'react';
import ObjectRoute from './../routes';
import { HelmetProvider, Helmet } from 'react-helmet-async';

const CreateRouteComponent = (props) => {
    const location = useLocation()
    const navigate = useNavigate()
    const params = useParams()
    const Component = props.component

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>{ props.data.title } - iCare</title>
                </Helmet>
            </HelmetProvider>
            <Component router={{ location, navigate, params }} />
        </>
    )
}

const mappingRoutes = (routes) => {
    return routes.map((value, key) => {
        if(typeof value.children != "undefined") {
            if(typeof value.component == 'object') {
                var Component = React.lazy(() => value.component)
                return(
                    <Route 
                        path={ value.path }
                        key={ key }
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
                return(
                    <Route
                        path={ value.path }
                        key={ key }
                        Component={ value.component }
                    >
                        { mappingRoutes(value.children) }
                    </Route>
                )
            }
        } else {
            if(typeof value.component == 'object') {
                var Component = React.lazy(() => value.component)
                return(
                    <Route 
                        path={ value.path }
                        key={ key }
                        element={
                            <React.Suspense
                                fallback="Loading..."
                        >
                                <CreateRouteComponent component={Component} data={ value } />
                            </React.Suspense>
                        }
                    />
                )
            } else 
            {
                var Component = value.component
                return(
                    <Route
                        path={ value.path }
                        key={ key }
                        element={ <CreateRouteComponent component={Component} data={ value } /> }
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
