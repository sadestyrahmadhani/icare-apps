import { Component } from "react";
import { Link } from "react-router-dom";

export default class extends Component {
    render() {
        return(
            <>
                <nav className="navbar navbar-xspand-lg bg-white shadow-sm py-3">
                    <div className="container">
                        <img src="/images/iCareLogo.png" alt="logo" height="50"/>
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link" to="dashboard"> Beranda </Link>
                                </li>
                            </ul>
                    </div>
                </nav>
            </>
        )
    }
}

