import { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../component/navbar";
import Footer from "./../../component/footer";

export default class extends Component {
    render() {
        return(
            <>
                <Navbar versi="2" />
                <div className="container">
                    <div className="card-title text-center mx-auto my-3 mb-5" style={{borderBottom:'3px solid #014C90', width:'88px'}}>
                        <h5 className="title-icare fw-bold">Registrasi</h5>
                    </div>
                    <div className="col-md-7 col-sm-8 col-12 mx-auto">
                        <div className="card mb-5">
                            <div className="card-body p-5">
                                <div className="row justify-content-center">
                                    <div className="col-lg-6 col-md-6 col-12">
                                        <form>
                                            <div className="mb-3">
                                                <label className="size-13px fw-bold">Email Address</label>
                                                <input type="email" className="form-control  border-only-bottom" />
                                            </div>
                                            <div className="mb-3">
                                                <label className="size-13px fw-bold">Mobile Phone Number</label>
                                                <input type="text" className="form-control border-only-bottom" />
                                            </div>
                                            <div className="mb-3">
                                                <label className="size-13px fw-bold">Password</label>
                                                <input type="password" className="form-control border-only-bottom" />
                                            </div>
                                            <div className="mb-3">
                                                <label className="size-13px fw-bold">Re-enter Password</label>
                                                <input type="password" className="form-control border-only-bottom" />
                                            </div>
                                        </form>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-12 ">
                                        <form>
                                            <div className="mb-3">
                                                <label className="size-13px fw-bold">Nama Lengkap</label>
                                                <input type="text" className="form-control border-only-bottom" />
                                            </div>
                                            <div className="mb-3">
                                                <label className="size-13px fw-bold">Nama Perusahaan / Instansi</label>
                                                <input type="text" className="form-control border-only-bottom" />
                                            </div>
                                            <div className="mb-3">
                                                <label className="size-13px fw-bold">Nomor Equipment</label>
                                                <input type="password" className="form-control border-only-bottom" />
                                            </div>
                                            <div className="mb-3">
                                                <label className="size-13px fw-bold">Foto Sticker Equipment</label>
                                                <input type="password" className="form-control border-only-bottom" />
                                            </div>
                                            <div className="mb-5">
                                                <p className="text-danger fw-bold" style={{fontSize:'12px'}}>&#42;Panduan foto sticker equipment <br/> Pastikan seluruh bagian sticker equipment pada mesin berada dalam bingkai foto <br/> &#40;Maks.5MB.Format jpg&#47;&#41; </p>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="col-12 text-center">
                                    <Link className="btn btn-login rounded-3 fw-medium" style={{fontSize:'14px', paddingLeft:'60px', paddingRight:'60px', paddingTop:'12px', paddingBottom:'12px'}} to="/kode-otp">SUBMIT</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        )
    }
}

