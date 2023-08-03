import { Component } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./../component/navbar"
import Footer from "./../component/footer"

export default class extends Component {
    render() {
        return(
            <>  
                <div className="main-background">
                    <img src="/images/Vector1.png" alt="background" width="100%"/>
                </div>
                <hr className="m-0 p-0 hr-custom"/>
                <Navbar />
                <div className="container">
                    <Outlet />
                </div>
                <Footer />
            </>
        )
    }
}
 