import { Component } from "react";
import { Link } from "react-router-dom";

export default class extends Component {
    render() {
        return(
            <>
                <nav className="navbar navbar-xspand-lg bg-white shadow-sm py-3">
                    <div className="container">
                        <img src="/images/iCareLogo.png" alt="logo" height="40"/>
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link" to=""> Beranda </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to=""> Tentang </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to=""> Fitur </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to=""> Keuntungan </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to=""> Testimoni </Link>
                                </li>
                            </ul>
                    </div>
                </nav>
            </>
        )
    }
}

