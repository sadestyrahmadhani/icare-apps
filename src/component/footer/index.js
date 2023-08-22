import { Component } from "react";
import { Link } from "react-router-dom";
import Route from "../../core/route";
import 'font-awesome/css/font-awesome.min.css';

export default class extends Component {
    render() {
        return (
            <>
                <footer className="footer py-4" style={{backgroundColor:"#F3F3F3"}}>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 col-md-3 col-12 mx-auto">
                                <ol style={{listStyle:'none'}}>
                                        <li>
                                            <Link className="list-items" style={{textDecoration:'none', fontSize:'14px'}} to="https://drive.google.com/drive/u/0/folders/1_aazXBeGBe_hl_U9p5XLXP4UCbjaw9x-" target="_blank" rel="noopener noreferrer">Bantuan dan Panduan</Link>
                                        </li>
                                        <li>
                                            <Link className="list-items" style={{textDecoration:'none', fontSize:'14px'}} to="kebijakan-privasi">Kebijakan Privasi</Link>
                                        </li>
                                        <li>
                                            <Link className="list-items" style={{textDecoration:'none', fontSize:'14px'}} to="https://documentsolution.com/id/konten/dukungan-konsumen/icare" target="_blank" rel="noopener noreferrer">Tentang iCare</Link>
                                        </li>
                                        <li className="mt-2">
                                            <Link className="list-items" style={{textDecoration:'none', fontSize:'14px'}}>
                                                <img src="/images/halo23.png" alt="astragraphia" width="160" />
                                            </Link>
                                        </li>
                                </ol>
                            </div>
                            <div className="col-lg-3 col-md-3 col-12 mx-auto">
                                <p className="mb-2" style={{fontSize:'14px'}}>Follow Us</p>
                                <div className="d-flex align-items-center mb-2">
                                    <Link className="list-items" to="https://www.youtube.com/user/Astragraphia" target="_blank" rel="noopener noreferrer">
                                        <i className="fa fa-youtube-play me-2" style={{fontSize:'22px'}}></i>
                                        <span style={{fontSize:'14px',}}>Astragraphia Document Solution</span>
                                    </Link>
                                </div>
                                <div className="d-flex align-items-center mb-2">
                                    <Link className="list-items" to="https://www.instagram.com/astragraphiadocsol/" target="_blank" rel="noopener noreferrer">
                                        <i className="fa fa-instagram me-2" style={{fontSize:'22px'}}></i>
                                        <span style={{fontSize:'14px'}}>astragraphiadocsol</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex align-items-center w-100">
                        <hr className="w-100"/>
                        <div className="d-block px-4" style={{whiteSpace:'nowrap', fontSize:'14px'}}>Powered by Astragraphia</div>
                        <hr className="w-100"/>
                    </div>
                </footer>
            </>
        )
    }
}