import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { getToken } from "../../core/local-storage";
// import { Dropdown } from "bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import { useLocation, useNavigate } from "react-router-dom";

// import DropdownItem from "react-bootstrap/esm/DropdownItem";
import NavDropdown from 'react-bootstrap/NavDropdown';

import {auth} from '../../services/auth'
const Navbar = (props) => {
    const [ scrolling, setScrolling ] = useState(false)
    const [openDropdown, setOpenDropdown] = useState(false)

    const location = useLocation();
    const pathName = location.pathname;
    const navigate = useNavigate();

    const [isBerandaActive, setIsBerandaActive] = useState(true);
    const [isRiwayatActive, setIsRiwayatActive] = useState(false);
    const [isInformasiActive, setIsInformasiActive] = useState(false);
    const [isPengaturanActive, setIsPengaturanActive] = useState(false);

    // console.log(location.pathname);

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

        window.scrollTo(0,0)
        
        window.removeEventListener('scroll', handleScroll)

    }, [pathName]) 

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
                props?.versi == "2" ?
                (
                    <div className="bg-white shadow-sm d-lg-block d-none" style={{position:'sticky', top:0, zIndex:'999'}}>
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
                )
                : (
                    pathName != "/" ?
                    (
                        <div className="bg-white d-lg-block d-none" style={{position:'sticky', top:0, zIndex:'999', height:'65px'}} >
                            <hr className="m-0 p-0 hr-custom" />
                            <nav className={`navbar navbar-exspand-lg py-1 px-1`} >
                                <div className="container-fluid">
                                    <div className="img"> 
                                        <img src="/images/iCareLogo.png" alt="logo" height="40"/>
                                    </div>
                                    <ul className="navbar-nav mx-auto"> 
                                        <li className="nav-item mx-3">
                                            <Link className={`nav-link nav-app ${(
                                                location.pathname.includes('/dashboard') ||
                                                location.pathname.includes('/breakfix_request') ||
                                                location.pathname.includes('/install_request') ||
                                                location.pathname.includes('/supplies_request') || 
                                                location.pathname.includes('/upgrade_step1') ||
                                                location.pathname.includes('/upgrade_step2') ||
                                                location.pathname.includes('/upgrade_step3') ||
                                                location.pathname.includes('/riwayat_meter') ||
                                                location.pathname.includes('/collect_meter') ||
                                                location.pathname.includes('/news_detail') ||
                                                location.pathname.includes('/product_detail')) ? 'active-link' : ''}`} to="/dashboard" onClick={() => handleNavClick('beranda')}>
                                                <i className="fa fa-home me-2"></i>
                                                <span className="nav-dash">BERANDA</span>
                                            </Link>
                                        </li> 
                                        <li className="nav-item mx-3">
                                            <Link 
                                                className={`nav-link nav-app ${(
                                                    location.pathname === '/riwayat' || 
                                                    location.pathname.includes('/detail_permintaan') || 
                                                    location.pathname.includes('/tanya_team_support') || 
                                                    location.pathname.includes('/tulis_review')) ? 'active-link' : ''}`} 
                                                to="/riwayat" 
                                                onClick={() => handleNavClick('riwayat')}
                                            >
                                                <i className="fa fa-clipboard me-2"></i>
                                                <span className="nav-dash">RIWAYAT</span>
                                            </Link>
                                        </li>
                                        <li className="nav-item mx-3">
                                            <Link className={`nav-link nav-app ${location.pathname.includes('/informasi') ? 'active-link' : ''}`} to="/informasi" onClick={() => handleNavClick('informasi')}>
                                                <i className="fa fa-bell me-2"></i>
                                                <span className="nav-dash">INFORMASI</span>
                                            </Link>
                                        </li>
                                        <li className="nav-item mx-3">
                                            <NavDropdown className="custom-dropdown" onClick={() => handleNavClick('pengaturan')} id="nav-dropdown" title=
                                            {<span 
                                                className={`nav-dash bold ${(
                                                    location.pathname.includes('/data_diri') || 
                                                    location.pathname.includes('/daftar_anggota') || 
                                                    location.pathname.includes('/tambah_anggota') || 
                                                    location.pathname.includes('/daftar_alamat') || 
                                                    location.pathname.includes('/tambah_alamat') || 
                                                    location.pathname.includes('/daftar_eq') || 
                                                    location.pathname.includes('/tambah_eq') || 
                                                    location.pathname.includes('/ubah_kata_sandi'))  ? 'active-link' : ''}`} 
                                                > 
                                                    <i className="fa fa-gear me-2 nav-app" style={{fontSize:'14px'}}></i> PENGATURAN</span>}>
                                                <NavDropdown.Item href="/data_diri">
                                                    <div className="item-drop d-flex align-items-center">
                                                        <div className="col-11">
                                                            <span className="text-decoration-none nav-app" style={{color:'#000'}} >Data Diri</span>
                                                        </div>
                                                        <div className="col-1">
                                                            <i className="fa fa-chevron-right chevron-drop"></i>
                                                        </div>
                                                    </div>
                                                </NavDropdown.Item>
                                                <NavDropdown.Item href="/daftar_anggota">
                                                    <div className="item-drop d-flex align-items-center">
                                                        <div className="col-11">
                                                            <span className="text-decoration-none nav-app" style={{color:'#000'}}>Daftar Anggota</span>
                                                        </div>
                                                        <div className="col-1">
                                                            <i className="fa fa-chevron-right chevron-drop"></i>
                                                        </div>
                                                    </div>
                                                </NavDropdown.Item>
                                                <NavDropdown.Item href="/daftar_alamat">
                                                    <div className="item-drop d-flex align-items-center">
                                                        <div className="col-11">
                                                            <span className="text-decoration-none nav-app" style={{color:'#000'}}>Daftar Alamat</span>
                                                        </div>
                                                        <div className="col-1">
                                                            <i className="fa fa-chevron-right chevron-drop"></i>
                                                        </div>
                                                    </div>
                                                </NavDropdown.Item>
                                                <NavDropdown.Item href="/daftar_eq">
                                                    <div className="item-drop d-flex align-items-center">
                                                        <div className="col-11">
                                                            <span className="text-decoration-none nav-app" style={{color:'#000'}}>Daftar EQ</span>
                                                        </div>
                                                        <div className="col-1">
                                                            <i className="fa fa-chevron-right chevron-drop"></i>
                                                        </div>
                                                    </div>
                                                </NavDropdown.Item>
                                                <NavDropdown.Item href="/ubah_kata_sandi">
                                                    <div className="item-drop d-flex align-items-center">
                                                        <div className="col-11">
                                                            <span className="text-decoration-none nav-app" style={{color:'#000'}}>Kata Sandi</span>
                                                        </div>
                                                        <div className="col-1">
                                                            <i className="fa fa-chevron-right chevron-drop"></i>
                                                        </div>
                                                    </div>
                                                </NavDropdown.Item>
                                                <NavDropdown.Item href="#" onClick={logout}>
                                                    <div className="item-drop d-flex align-items-center">
                                                        <div className="col-11">
                                                            <span className="text-decoration-none nav-app" style={{color:'#000'}}>Keluar</span>
                                                        </div>
                                                        <div className="col-1">
                                                            <i className="fa fa-chevron-right chevron-drop"></i>
                                                        </div>
                                                    </div>
                                                </NavDropdown.Item>
                                            </NavDropdown>
                                            {/* <Dropdown show={openDropdown} onToggle={(isOpen) => setOpenDropdown(isOpen)}>
                                                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                                    <i className="fa fa-gear me-2 nav-app" style={{fontSize:'14px'}}></i>
                                                    <span className="nav-dash">PENGATURAN</span>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <DropdownItem href="/data_diri">
                                                        <div className="item-drop d-flex align-items-center">
                                                            <div className="col-11">
                                                                <span className="text-decoration-none nav-app" style={{color:'#000'}} >Data Diri</span>
                                                            </div>
                                                            <div className="col-1">
                                                                <i className="fa fa-chevron-right chevron-drop"></i>
                                                            </div>
                                                        </div>
                                                    </DropdownItem>
                                                    <DropdownItem href="/daftar_alamat">
                                                        <div className="item-drop d-flex align-items-center">
                                                            <div className="col-11">
                                                                <span className="text-decoration-none nav-app" style={{color:'#000'}}>Daftar Alamat</span>
                                                            </div>
                                                            <div className="col-1">
                                                                <i className="fa fa-chevron-right chevron-drop"></i>
                                                            </div>
                                                        </div>
                                                    </DropdownItem>
                                                    <DropdownItem href="/daftar_eq">
                                                        <div className="item-drop d-flex align-items-center">
                                                            <div className="col-11">
                                                                <span className="text-decoration-none nav-app" style={{color:'#000'}}>Daftar EQ</span>
                                                            </div>
                                                            <div className="col-1">
                                                                <i className="fa fa-chevron-right chevron-drop"></i>
                                                            </div>
                                                        </div>
                                                    </DropdownItem>
                                                    <DropdownItem href="/change-password">
                                                        <div className="item-drop d-flex align-items-center">
                                                            <div className="col-11">
                                                                <span className="text-decoration-none nav-app" style={{color:'#000'}}>Kata Sandi</span>
                                                            </div>
                                                            <div className="col-1">
                                                                <i className="fa fa-chevron-right chevron-drop"></i>
                                                            </div>
                                                        </div>
                                                    </DropdownItem>
                                                    <DropdownItem href="#">
                                                        <div className="item-drop d-flex align-items-center">
                                                            <div className="col-11">
                                                                <span className="text-decoration-none nav-app" style={{color:'#000'}}>Keluar</span>
                                                            </div>
                                                            <div className="col-1">
                                                                <i className="fa fa-chevron-right chevron-drop"></i>
                                                            </div>
                                                        </div>
                                                    </DropdownItem>
                                                </Dropdown.Menu>
                                            </Dropdown> */}
                                            {/* <a className="nav-link nav-app" href="#" onClick={() => setOpenDropdown(!openDropdown)}>
                                                <i className="fa fa-gear me-2 nav-app" style={{fontSize:'14px', color:'grey'}}></i>
                                                <span className="nav-dash">PENGATURAN</span>
                                            </a>
                                            { openDropdown && (
                                                <div className="dropdown bg-white shadow-lg px-2 py-3" style={{width:'300px'}}>
                                                    <ul style={{listStyle:'none'}}>
                                                        <li className="item-drop py-2 d-flex align-items-center">
                                                            <div className="col-10">
                                                                <Link className="text-decoration-none nav-app" style={{color:'#000'}} to="/data_diri">Data Diri</Link>
                                                            </div>
                                                            <div className="col-2">
                                                                <i className="fa fa-chevron-right chevron-drop"></i>
                                                            </div>
                                                        </li>
                                                        <li className="item-drop  py-2 d-flex align-items-center">
                                                            <div className="col-10">
                                                                <Link className="text-decoration-none" style={{color:'#000'}} to="/daftar_alamat">Daftar Alamat</Link>
                                                            </div>
                                                            <div className="col-2">
                                                                <i className="fa fa-chevron-right chevron-drop"></i>
                                                            </div>
                                                        </li>
                                                        <li className="item-drop  py-2 d-flex align-items-center">
                                                            <div className="col-10">
                                                                <Link className="text-decoration-none nav-app" style={{color:'#000'}} to="/daftar_eq">Daftar EQ</Link>
                                                            </div>
                                                            <div className="col-2">
                                                                <i className="fa fa-chevron-right chevron-drop"></i>
                                                            </div>
                                                        </li>
                                                        <li className="item-drop py-2 d-flex align-items-center">
                                                            <div className="col-10">
                                                                <Link className="text-decoration-none nav-app" style={{color:'#000'}} to="/change-password">Kata Sandi</Link>
                                                            </div>
                                                            <div className="col-2">
                                                                <i className="fa fa-chevron-right chevron-drop"></i>
                                                            </div>
                                                        </li>
                                                        <li className="item-drop  py-2 d-flex align-items-center">
                                                            <div className="col-10">
                                                                <Link className="text-decoration-none nav-app" style={{color:'#000'}}>Keluar</Link>
                                                            </div>
                                                            <div className="col-2">
                                                                <i className="fa fa-chevron-right chevron-drop"></i>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            )} */}
                                        </li>
                                    </ul>
                                    <div className="account">
                                        <h6 style={{fontSize:'14px', color:'#014C90' }}>Welcome, {localStorage.getItem('username')}</h6>
                                    </div>
                                </div>
                            </nav> 
                        </div>
                    ) : (
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
                )
            } 
        </>
    )
}


const onClickToScroll = (e, id) => {
    e.preventDefault()

    var offSetScroll = document.querySelector(id)
    smoothScroll(offSetScroll, 100)
}

function smoothScroll(targetElement, duration) {
    const targetPosition = targetElement.getBoundingClientRect().top-150
    const startPosition = window.pageYOffset
    const startTime = performance.now()
  
    function scrollAnimation(currentTime) {
      const elapsedTime = currentTime - startTime
      const progress = Math.min(elapsedTime / duration, 1)
      const easeInOutCubic = progress * (2 - progress)
  
      window.scrollTo(0, startPosition + targetPosition * easeInOutCubic)
  
      if (elapsedTime < duration) {
        requestAnimationFrame(scrollAnimation)
      }
    }
  
    requestAnimationFrame(scrollAnimation)
}


export default Navbar

