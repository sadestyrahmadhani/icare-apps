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


    return(
        <>
            {
                props?.versi == "2" ?
                (
                    <div className="bg-white shadow-sm" style={{position:'sticky', top:0, zIndex:'999'}} >
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
                    getToken() != null && typeof getToken() != "undefined" ?
                    (
                        <div className="bg-white shadow-sm" style={{position:'sticky', top:0, zIndex:'999'}} >
                            <hr className="m-0 p-0 hr-custom" />
                            <nav className={`navbar navbar-exspand-lg py-2 px-1`} >
                                <div className="container-fluid">
                                    <div className="img"> 
                                        <img src="/images/iCareLogo.png" alt="logo" height="40"/>
                                    </div>
                                    <ul className="navbar-nav mx-auto"> 
                                        <li className="nav-item mx-3">
                                            <Link className="nav-link nav-app" to="dashboard">
                                                <i className="fa fa-home me-2"></i>
                                                <span className="nav-dash">BERANDA</span>
                                            </Link>
                                        </li> 
                                        <li className="nav-item mx-3">
                                            <Link className="nav-link nav-app" to="riwayat"> 
                                                <i className="fa fa-clipboard me-2"></i>
                                                <span className="nav-dash">RIWAYAT</span>
                                            </Link>
                                        </li>
                                        <li className="nav-item mx-3">
                                            <Link className="nav-link nav-app" to="informasi">
                                                <i className="fa fa-bell me-2"></i>
                                                <span className="nav-dash">INFORMASI</span>
                                            </Link>
                                        </li>
                                        <li className="nav-item mx-3">
                                            <a className="nav-link nav-app" href="#" onClick={() => setOpenDropdown(!openDropdown)}>
                                                <i className="fa fa-gear me-2 nav-app" style={{fontSize:'14px', color:'grey'}}></i>
                                                <span className="nav-dash">PENGATURAN</span>
                                            </a>
                                            { openDropdown && (
                                                <div className="dropdown bg-white shadow-lg px-2 py-3" style={{width:'300px'}}>
                                                    <ul style={{listStyle:'none'}}>
                                                        <li className="item-drop py-2 d-flex align-items-center">
                                                            <div className="col-10">
                                                                <Link className="text-decoration-none nav-app" style={{color:'#000'}} to="/data-diri">Data Diri</Link>
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
                                                                <Link className="text-decoration-none nav-app" style={{color:'#000'}} to="/daftar-eq">Daftar EQ</Link>
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
                                            )}
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

