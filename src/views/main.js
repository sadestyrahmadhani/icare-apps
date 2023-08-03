import { Component } from "react";
import { Outlet } from "react-router-dom";
import Nav from "./../component/nav"
import Footer from "./../component/footer"

export default class extends Component {
    render() {
        return(
            <>  
                <Nav />
                <div className="container">
                    <Outlet />
                </div>
                <Footer />
            </>
        )
    }
}