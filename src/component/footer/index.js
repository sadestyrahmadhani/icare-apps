import { Component } from "react";
import { Link } from "react-router-dom";
import Route from "../../core/route";
import 'font-awesome/css/font-awesome.min.css';

export default class extends Component {
    render() {
        return (
            <>
                <footer className="footer bg-light py-4">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 col-md-3 col-12 mx-auto">
                                <ol style={{listStyle:'none'}}>
                                        <li>
                                            <Link className="list-items" style={{textDecoration:'none', fontSize:'12px'}}>Bantuan dan Panduan</Link>
                                        </li>
                                        <li>
                                            <Link className="list-items" style={{textDecoration:'none', fontSize:'12px'}} to="kebijakan-privasi">Kebijakan Privasi</Link>
                                        </li>
                                        <li>
                                            <Link className="list-items" style={{textDecoration:'none', fontSize:'12px'}}>Tentang iCare</Link>
                                        </li>
                                        <li className="mt-2">
                                            <Link className="list-items" style={{textDecoration:'none', fontSize:'12px'}}>
                                                <img src="/images/halo23.png" alt="astragraphia" width="130" />
                                            </Link>
                                        </li>
                                </ol>
                            </div>
                            <div className="col-lg-3 col-md-3 col-12 mx-auto">
                                <p className="mb-2" style={{fontSize:'12px'}}>Follow Us</p>
                                <div className="d-flex align-items-center mb-2">
                                    <Link className="list-items">
                                        <i className="fa fa-youtube me-2" style={{fontSize:'22px'}}></i>
                                        <span style={{fontSize:'12px',}}>Astragraphia Document Solution</span>
                                    </Link>
                                </div>
                                <div className="d-flex align-items-center mb-2">
                                    <Link className="list-items">
                                        <i className="fa fa-instagram me-2" style={{fontSize:'22px'}}></i>
                                        <span style={{fontSize:'12px'}}>astragraphiadocsol</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex align-items-center w-100">
                        <hr className="w-100"/>
                        <div className="d-block px-4" style={{whiteSpace:'nowrap', fontSize:'12px'}}>Powered by Astragraphia</div>
                        <hr className="w-100"/>
                    </div>
                </footer>
            </>
        )
    }
}