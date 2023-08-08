import { Component } from "react";
import { Link } from "react-router-dom";

export default class extends (Component) {
    render() {
        return(
            <>
                <nav className="navbar navbar-xspand-lg bg-white shadow-sm py-3 fixed-top">
                <hr className="m-0 p-0 hr-custom" style={{width:'100%'}}/>
                    <div className="container-fluid">
                        <div className="img">
                            <img src="/images/iCareLogo.png" alt="logo" height={50}/>
                        </div>
                        <div className="nav">
                            <ul className="navbar-nav">
                                <li className="nav-item" style={{marginRight:'100px'}}>
                                    <Link className="nav-link" to="">
                                        <i className="fa fa-home" style={{fontSize:'14px', color:'grey'}}></i>
                                        <span style={{fontSize:'14px', color:'grey', margin:'5px'}}>Beranda</span>
                                    </Link>
                                </li>
                                <li className="nav-item" style={{marginRight:'100px'}}>
                                    <Link className="nav-link" to="riwayat"> 
                                        <i class="fa fa-clipboard" style={{fontSize:'14px', color:'grey'}}></i>
                                        <span style={{fontSize:'14px', color:'grey', margin:'5px'}}>Riwayat</span>
                                    </Link>
                                </li>
                                <li className="nav-item" style={{marginRight:'100px'}}>
                                    <Link className="nav-link" to="">
                                        <i class="fa fa-bell" style={{fontSize:'14px', color:'grey'}}></i>
                                        <span style={{fontSize:'14px', color:'grey', margin:'5px'}}>Informasi</span>
                                    </Link>
                                </li>
                                <li className="nav-item" style={{marginRight:'0px'}}>
                                    <Link className="nav-link" to="">
                                        <i class="fa fa-gear me-1" style={{fontSize:'14px', color:'grey'}}></i>
                                        <span style={{fontSize:'14px', color:'grey', margin:'5px'}}>Pengaturan</span>
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