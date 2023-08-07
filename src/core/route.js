import { Routes, Route } from 'react-router-dom';
import React from 'react';
import ObjectRoute from './../routes';

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
                                <Component/>
                            </React.Suspense>
                        }
                    />
                )
            } else 
            {
                return(
                    <Route
                        path={ value.path }
                        key={ key }
                        Component={ value.component }
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
