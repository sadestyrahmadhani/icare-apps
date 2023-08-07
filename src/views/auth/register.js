import { Component } from "react";
import Navbar from "../../component/navbar";
import Footer from "./../../component/footer";

export default class extends Component {
    render() {
        return(
            <>
                <Navbar versi="2" />
                <div className="container">
                    <div className="card-title text-center mx-auto my-3 mb-5" style={{borderBottom:'3px solid #014C90', width:'75px'}}>
                        <h4 className="title-icare" style={{fontSize:'16px'}}>Registrasi</h4>
                    </div>
                    <div className="col-md-7 col-sm-8 col-12 mx-auto">
                        <div className="card mb-5">
                            <div className="card-body p-5">
                                <div className="row justify-content-center">
                                    <div className="col-lg-6 col-md-6 col-12">
                                        <form>
                                            <div className="mb-3">
                                                <label className="size-10px fw-medium">Email Address</label>
                                                <input type="email" className="form-control  border-only-bottom" />
                                            </div>
                                            <div className="mb-3">
                                                <label className="size-10px fw-medium">Mobile Phone Number</label>
                                                <input type="text" className="form-control border-only-bottom" />
                                            </div>
                                            <div className="mb-3">
                                                <label className="size-10px fw-medium">Password</label>
                                                <input type="password" className="form-control border-only-bottom" />
                                            </div>
                                            <div className="mb-3">
                                                <label className="size-10px fw-medium">Re-enter Password</label>
                                                <input type="password" className="form-control border-only-bottom" />
                                            </div>
                                        </form>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-12 ">
                                        <form>
                                            <div className="mb-3">
                                                <label className="size-10px fw-medium">Nama Lengkap</label>
                                                <input type="text" className="form-control border-only-bottom" />
                                            </div>
                                            <div className="mb-3">
                                                <label className="size-10px fw-medium">Nama Perusahaan / Instansi</label>
                                                <input type="text" className="form-control border-only-bottom" />
                                            </div>
                                            <div className="mb-3">
                                                <label className="size-10px fw-medium">Nomor Equipment</label>
                                                <input type="password" className="form-control border-only-bottom" />
                                            </div>
                                            <div className="mb-3">
                                                <label className="size-10px fw-medium">Foto Sticker Equipment</label>
                                                <input type="password" className="form-control border-only-bottom" />
                                            </div>
                                            <div className="mb-5">
                                                <p className="text-danger fw-medium" style={{fontSize:'10px'}}>&#42;Panduan foto sticker equipment <br/> Pastikan seluruh bagian sticker equipment pada mesin berada dalam bingkai foto <br/> &#40;Maks.5MB.Format jpg&#47;&#41; </p>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="col-12 text-center">
                                    <button className="btn btn-login px-5 py-2" style={{fontSize:'10px'}}>SUBMIT</button>
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

