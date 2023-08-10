import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getToken } from "../../core/local-storage";
import { Dropdown } from "bootstrap";

const Navbar = (props) => {
    const [ scrolling, setScrolling ] = useState(false)
    const [openDropdown, setOpenDropdown] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if(window.scrollY > 0) {
                setScrolling(true)
            } else {
                setScrolling(false)
            }
        }
        

        window.addEventListener('scroll', handleScroll)
        document.getElementById('layout').addEventListener('click', () => setOpenDropdown(false))
        
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
                                        <li className="nav-item mx-3">
                                            <Link className="nav-link" to="dashboard">
                                                <i className="fa fa-home me-2"></i>
                                                <span className="nav-dash">BERANDA</span>
                                            </Link>
                                        </li> 
                                        <li className="nav-item mx-3">
                                            <Link className="nav-link" to="riwayat"> 
                                                <i className="fa fa-clipboard me-2"></i>
                                                <span className="nav-dash">RIWAYAT</span>
                                            </Link>
                                        </li>
                                        <li className="nav-item mx-3">
                                            <Link className="nav-link" to="informasi">
                                                <i className="fa fa-bell me-2"></i>
                                                <span className="nav-dash">INFORMASI</span>
                                            </Link>
                                        </li>
                                        <li className="nav-item mx-3">
                                            <a className="nav-link" href="#" onClick={() => setOpenDropdown(!openDropdown)}>
                                                <i className="fa fa-gear me-2" style={{fontSize:'14px', color:'grey'}}></i>
                                                <span className="nav-dash">PENGATURAN</span>
                                                { openDropdown && (
                                                    <div className="dropdown bg-white shadow-lg px-2 py-3" style={{width:'300px'}}>
                                                        <ul style={{listStyle:'none'}}>
                                                            <li className="item-drop py-2 d-flex align-items-center">
                                                                <div className="col-10">
                                                                    <Link className="text-decoration-none" style={{color:'#000'}} to="/data-diri">Data Diri</Link>
                                                                </div>
                                                                <div className="col-2">
                                                                    <i className="fa fa-chevron-right chevron-drop"></i>
                                                                </div>
                                                            </li>
                                                            <li className="item-drop  py-2 d-flex align-items-center">
                                                                <div className="col-10">
                                                                    <Link className="text-decoration-none" style={{color:'#000'}} to="/address">Daftar Alamat</Link>
                                                                </div>
                                                                <div className="col-2">
                                                                    <i className="fa fa-chevron-right chevron-drop"></i>
                                                                </div>
                                                            </li>
                                                            <li className="item-drop  py-2 d-flex align-items-center">
                                                                <div className="col-10">
                                                                    <Link className="text-decoration-none" style={{color:'#000'}} to="/daftar-eq">Daftar EQ</Link>
                                                                </div>
                                                                <div className="col-2">
                                                                    <i className="fa fa-chevron-right chevron-drop"></i>
                                                                </div>
                                                            </li>
                                                            <li className="item-drop py-2 d-flex align-items-center">
                                                                <div className="col-10">
                                                                    <Link className="text-decoration-none" style={{color:'#000'}} to="/change-password">Kata Sandi</Link>
                                                                </div>
                                                                <div className="col-2">
                                                                    <i className="fa fa-chevron-right chevron-drop"></i>
                                                                </div>
                                                            </li>
                                                            <li className="item-drop  py-2 d-flex align-items-center">
                                                                <div className="col-10">
                                                                    <Link className="text-decoration-none" style={{color:'#000'}}>Keluar</Link>
                                                                </div>
                                                                <div className="col-2">
                                                                    <i className="fa fa-chevron-right chevron-drop"></i>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                )}
                                            </a>
                                        </li>
                                    </ul>
                                    <div className="account">
                                        <h6 style={{fontSize:'14px', color:'#014C90' }}>Welcome, Indri</h6>
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
                                            <a className="nav-link text-link fw-semibold" href="#beranda"> Beranda </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link text-link fw-semibold" href="#about"> Tentang </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link text-link fw-semibold" href="#fitur"> Fitur </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link text-link fw-semibold" href="#benefit"> Keuntungan </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link text-link fw-semibold" href="#testimonial"> Testimoni </a>
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

