import { Component } from "react";
import { Link } from "react-router-dom";
import FormInput from "./../../component/form/input";


export default class extends Component {
    render() {
        return(
            <>
            {/* beranda/login */}
                <div className="row row-height my-5 pt-5">
                    <div className="col-9">
                        <div className="col-sm-10 col-12 my-5">
                            <div className="card shadow-sm rounded">
                                <div className="card-body">
                                    <div className="col-12 text-center pt-3">
                                        <img src="/images/iCareLogo.png" alt="Logo iCare" height="50" />
                                    </div>
                                    <form>
                                        <div className="mb-3">
                                            <label className="size-10px fw-medium">EMAIL</label>
                                            <input type="text" className="form-control border-only-bottom"/>
                                        </div>
                                        <div className="mb-4">
                                            <label className="size-10px fw-medium">PASSWORD</label>
                                            <input type="password" className="form-control border-only-bottom" />
                                        </div>
                                        <div className="mb-2 mx-auto text-center">
                                            <button className="btn btn-login px-5 py-1 my-1">LOGIN</button>
                                        </div>
                                        <div className="text-center">
                                            <Link className="nav-link size-10px fw-medium my-2" to="">Belum Punya akun ?</Link>
                                            <Link className="nav-link size-10px fw-medium my-2"  to="">Lupa Password ?</Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="background col-3">
                        <img src="/images/Cahyo_MFD.png" alt="images 1" width="100%" />
                        <h3 className="title-icare text-center fw-bold">Solusi untuk skalasi problem dan permintaan layanan.</h3>
                    </div>
                </div>


            {/* about section */}
                <section className="section-about">
                    <div className="card-about mb-5">
                        <div className="row g-0 mx-auto">
                            <div className="col-md-6">
                                <div className="card-body pt-5 px-5 mx-5">
                                    <h4 className="title-icare text-center fw-bold mb-5">Mengapa iCare?</h4>
                                    <p className="card-text description-icare lh-1">iCare adalah aplikasi mobile yang dapat digunakan untuk mempermudah <b>eskalasi problem</b> dan <b>permintaan layanan</b> yang dibutuhkan oleh pelanggan Astragraphia</p>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <img src="/images/gambar1.jpg" className="img-fluid rounded-start" alt="gambar 1"/>
                            </div>
                        </div>
                    </div>
                </section>


            {/* fitur section */}
            <section className="section-fitur">
                <div className="container">
                    <h4 className="title-icare text-center fw-bold mb-5"> Fitur iCare</h4>
                    <div className="row row-cols-1 row-cols-md-3">
                        <div className="col-md-3">
                            <div className="card h-50">
                            <img src="/images/breakfix.png" className="card-img-top" height="100" alt="..."/>
                                <div className="card-body text-center">
                                    <h5 className="card-title">Breakfix</h5>
                                    <p className="card-text">Sebagai layanan customer untuk permintaan perbaikan pada mesin.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card h-50">
                            <img src="/images/supplies.png" className="card-img-top" alt="..."/>
                                <div className="card-body text-center">
                                    <h5 className="card-title">Supplies</h5>
                                    <p className="card-text">Sebagai layanan customer untuk permintaan consumable dan sparepart.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card h-50">
                            <img src="/images/collect-meter-install.png" className="card-img-top" alt="..."/>
                                <div className="card-body text-center">
                                    <h5 className="card-title">Install</h5>
                                    <p className="card-text">Sebagai layanan customer untuk permintaan setting konfigurasi mesin.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card h-50">
                            <img src="/images/collect-meter-install.png" className="card-img-top"  alt="..."/>
                                <div className="card-body text-center">
                                    <h5 className="card-title">Collect Meter</h5>
                                    <p className="card-text">Sebagai Layanan Customer untuk permintaan informasi billing meter yang ada pada mesin printer Astragraphia.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            </>
        )
    }
}

