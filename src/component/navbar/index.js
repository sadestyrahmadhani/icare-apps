import { Component } from "react";
import { Link } from "react-router-dom";

export default class extends Component {
    render() {
        return(
            <>
                <nav className="navbar bg-light shadow p-3 mb-5 bg-body-tertiary rounded">
                    <div className="container-fluid">
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