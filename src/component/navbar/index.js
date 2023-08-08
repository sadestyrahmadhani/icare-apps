import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getToken } from "../../core/local-storage";

const Navbar = (props) => {
    const [ scrolling, setScrolling ] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if(window.scrollY > 0) {
                setScrolling(true)
            } else {
                setScrolling(false)
            }
        }

        window.addEventListener('scroll', handleScroll)
        
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, []) 

    return(
        <>
            {
                props?.versi == "2" ?
                (
                    <div className="bg-white shadow-sm" style={{position:'sticky', top:0, zIndex:'999'}} >
                        <hr className="m-0 p-0 hr-custom" />
                        <nav className={`navbar navbar-exspand-lg p-0 py-2`} >
                            <div className="container">
                                <img src="/images/iCareLogo.png" alt="logo" height="40"/>
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <Link className="nav-link text-link fw-semibold" to="/"> Beranda </Link>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                )
                : (
                    getToken() != null && typeof getToken() != "undefined" ?
                    (
                        <div className="bg-white shadow-sm" style={{position:'sticky', top:0, zIndex:'999'}} >
                            <hr className="m-0 p-0 hr-custom" />
                            <nav className={`navbar navbar-exspand-lg p-0 px-1`} >
                                <div className="container-fluid">
                                    <div className="img"> 
                                        <img src="/images/iCareLogo.png" alt="logo" height="40"/>
                                    </div>
                                    <ul className="navbar-nav mx-auto"> 
                                        <li className="nav-item">
                                            <Link className="nav-link" to="">
                                                <i className="fa fa-home me-2"></i>
                                                <span className="nav-dash">BERANDA</span>
                                            </Link>
                                        </li> 
                                        <li className="nav-item">
                                            <Link className="nav-link" to="riwayat"> 
                                                <i className="fas fa-clipboard me-2"></i>
                                                <span className="nav-dash">RIWAYAT</span>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="">
                                                <i className="fas fa-bell me-2"></i>
                                                <span className="nav-dash">INFORMASI</span>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="">
                                                <i className="fas fa-gear me-2" style={{fontSize:'14px', color:'grey'}}></i>
                                                <span className="nav-dash">PENGATURAN</span>
                                            </Link>
                                        </li>
                                    </ul>
                                    <div className="account">
                                        <h6 style={{fontSize:'12px', color:'#014C90' }}>Welcome, Indri</h6>
                                    </div>
                                </div>
                            </nav> 
                        </div>
                    ) : (
                        <div className={scrolling ? 'bg-white shadow':''} style={{position:'sticky', top:0, zIndex:'999'}} >
                            <hr className="m-0 p-0 hr-custom" />
                            <nav className={`navbar navbar-exspand-lg p-0 py-2`} >
                                <div className="container">
                                    <img src="/images/iCareLogo.png" alt="logo" height="40"/>
                                    <ul className="navbar-nav">
                                        <li className="nav-item">
                                            <Link className="nav-link text-link fw-semibold" to="/"> Beranda </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link text-link fw-semibold" to=""> Tentang </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link text-link fw-semibold" to=""> Fitur </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link text-link fw-semibold" to=""> Keuntungan </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link text-link fw-semibold" to=""> Testimoni </Link>
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                        </div>
                    )
                )
            } 
        </>
    )
}

export default Navbar

