import { Component } from "react";
import { Outlet } from "react-router-dom";
import Nav from "./../component/nav"
import Footer from "./../component/footer"

export default class extends Component {
    render() {
        return(
            <>  
<<<<<<< HEAD
                <Nav />
=======
                <div className="main-background">
                    <img src="/images/Vector1.png" alt="background" width="100%"/>
                </div>
                <hr className="m-0 p-0 hr-custom"/>
                <Navbar />
>>>>>>> a2ed42432aa1407f258bc35b4179401547de2163
                <div className="container">
                    <Outlet />
                </div>
                <Footer />
            </>
        )
    }
}
 