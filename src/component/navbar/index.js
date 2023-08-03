import { Component } from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
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
            <nav className={`navbar navbar-xspand-lg py-3 ${scrolling ? 'bg-white shadow':''}`} style={{position:'sticky', top:0, zIndex:'999'}} >
                <div className="container">
                    <img src="/images/iCareLogo.png" alt="logo" height="40"/>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link text-link fw-semibold" to=""> Beranda </Link>
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
        </>
    )
}

export default Navbar



