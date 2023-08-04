import { Component } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../component/navbar";
import Footer from "./../component/footer"

export default class extends Component {
    render() {
        return(
            <>  
                
                <Navbar />
                <div className="container">
                    <Outlet />
                </div>
                <Footer />
            </>
        )
    }
}
 