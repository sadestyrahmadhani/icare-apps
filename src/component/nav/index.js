import { Component } from "react";
import { Link } from "react-router-dom";

export default class extends (Component) {
    render() {
        return(
            <>
                <nav className="navbar navbar-xspand-lg bg-white shadow-sm py-3 fixed-top">
                    <div className="container-fluid">
                        <div className="img">
                            <img src="/images/iCareLogo.png" alt="logo" height={50}/>
                        </div>
                        <div className="nav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link" to="">
                                        <i className="fa fa-home"></i>
                                        <span>Beranda</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="riwayat"> 
                                        <i class="fas fa-clipboard"></i>
                                        <span>Riwayat</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="">
                                        <i class="fas fa-bell"></i>
                                        <span>Informasi</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="">
                                        <i class="fas fa-gear me-1" style={{fontSize:'14px', color:'grey'}}></i>
                                        <span style={{fontSize:'14px', color:'grey'}}>Pengaturan</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="account">
                            <h6>Welcome, Indri</h6>
                        </div>
                    </div>
                </nav>
            </>
        )
    }
}