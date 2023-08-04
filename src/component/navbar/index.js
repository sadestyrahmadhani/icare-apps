import React, { useState, useEffect } from "react";
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
            <div className={scrolling ? 'bg-white shadow':''} style={{position:'sticky', top:0, zIndex:'999'}} >
                <hr className="m-0 p-0 hr-custom" />
                <nav className={`navbar navbar-exspand-lg py-3`} >
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
            </div>
        </>
    )
}

export default Navbar



