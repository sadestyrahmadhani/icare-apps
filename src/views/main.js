import { Component } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../component/navbar";
import Footer from "./../component/footer";
interface loginProps {
    refreshToken:Function
}
function Layout () {
    
    return(
        <>                  
            <Navbar />
            <div className="container py-4 py-xs-0" id="layout">
                <Outlet />
            </div>
            <Footer />
        </>
    )

}
export default Layout