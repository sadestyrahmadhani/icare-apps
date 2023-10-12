import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { getToken } from "../../core/local-storage";
// import { Dropdown } from "bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import { useLocation, useNavigate } from "react-router-dom";

// import DropdownItem from "react-bootstrap/esm/DropdownItem";
import NavDropdown from 'react-bootstrap/NavDropdown';

import {auth} from '../../services/auth'
const NavbarLogin = (props) => {
    const [ scrolling, setScrolling ] = useState(false)
    const [openDropdown, setOpenDropdown] = useState(false)

    const location = useLocation();
    const pathName = location.pathname;

    const [isBerandaActive, setIsBerandaActive] = useState(true);
    const [isRiwayatActive, setIsRiwayatActive] = useState(false);
    const [isInformasiActive, setIsInformasiActive] = useState(false);
    const [isPengaturanActive, setIsPengaturanActive] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const handleScroll = () => {
            if(window.scrollY > 0) {
                setScrolling(true)
            } else {
                setScrolling(false)
            }
        }
        

        window.addEventListener('scroll', handleScroll)
        if(document.querySelectorAll('#layout').length > 0) {
            document.getElementById('layout').addEventListener('click', () => setOpenDropdown(false))
        }
        document.querySelectorAll('.nav-app').forEach(val => {
            val.addEventListener('click', () => setOpenDropdown(false))
        })
        
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, []) 

    const handleNavClick = (nav) => {
        setIsBerandaActive(false);
        setIsRiwayatActive(false);
        setIsInformasiActive(false);
        setIsPengaturanActive(false);

        if(nav === 'beranda') {
            setIsBerandaActive(true);
        } else if(nav === 'riwayat') {
            setIsRiwayatActive(true);
        } else if(nav === 'informasi') {
            setIsInformasiActive(true);
        } else if(nav === 'pengaturan') {
            setIsPengaturanActive(true);
        }
    }
    const logout = () => {
        console.log('logout')
        auth.logout()
        navigate('/')
    }

    return(
        <>
            {
                (
                    
                        <>
                            <div className={scrolling ? 'bg-white d-lg-block d-none shadow' : 'd-lg-block d-none'} style={{position:'sticky', top:0, zIndex:'999'}} >
                                <hr className="m-0 p-0 hr-custom" />
                                <nav className={`navbar navbar-exspand-lg p-0 py-3`} >
                                    <div className="container">
                                        <img src="/images/iCareLogo.png" alt="logo" height="55"/>
                                        <ul className="navbar-nav">
                                            <li className="nav-item">
                                                <a className="nav-link text-link mx-3 fw-semibold" href="#beranda" onClick={(e) => onClickToScroll(e, '#beranda')}> Beranda </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link text-link mx-2 fw-semibold" href="#about" onClick={(e) => onClickToScroll(e, '#about')}> Tentang </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link text-link mx-2 fw-semibold" href="#fitur" onClick={(e) => onClickToScroll(e, '#fitur')}> Fitur </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link text-link mx-2 fw-semibold" href="#benefit" onClick={(e) => onClickToScroll(e, '#benefit')}> Keuntungan </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link text-link mx-2 fw-semibold" href="#testimonial" onClick={(e) => onClickToScroll(e, '#testimonial')}> Testimoni </a>
                                            </li>
                                        </ul>
                                    </div>
                                </nav>
                            </div>
                            <div className="bg-white d-lg-none d-none d-md-block shadow" style={{position:'sticky', top:0, zIndex:'999'}}>
                                <hr className="m-0 p-0 hr-custom" />
                                <nav className={`navbar navbar-exspand-lg p-0 py-3`} >
                                    <div className="container">
                                        <img src="/images/iCareLogo.png" alt="logo" height="50"/>
                                        <ul className="navbar-nav">
                                            <li className="nav-item">
                                                <Link className="nav-link text-link fw-semibold" to="/"> Beranda </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </nav>
                            </div>
                        </>
                    
                )
            } 
        </>
    )
}



export default Navbar

