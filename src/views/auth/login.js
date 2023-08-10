import { Component } from "react";
import { Link } from "react-router-dom";
import Carousel from "../../component/carousel";
import { setToken } from "../../core/local-storage";

export default class extends Component {
    constructor(props) {
        super(props)
        this.submit = this.submit.bind(this)
    }
    render() {
        return(
            <>
            {/* main-background */}
                <div className="main-background">
                    <img src="/images/Vector1.png" alt="background" width="100%"/>
                </div>

            {/* beranda/login */}
                <div className="row row-height pt-5">
                    <div className="col-8" style={{paddingRight:'50px'}}>
                        <div className="col-sm-10 col-12 my-5">
                            <div className="card shadow-sm rounded p-4" style={{border:'1px solid #a2d2ff'}}>
                                <div className="card-body px-2">
                                    <div className="col-12 text-center mb-3">
                                        <img src="/images/iCareLogo.png" alt="Logo iCare" className="h-50"/>
                                    </div>
                                    <form onSubmit={ this.submit }>
                                        <div className="mb-3">
                                            <label className="size-13px fw-medium">EMAIL</label>
                                            <input type="text" className="form-control border-only-bottom"/>
                                        </div>
                                        <div className="mb-4">
                                            <label className="size-13px fw-medium">PASSWORD</label>
                                            <input type="password" className="form-control border-only-bottom" />
                                        </div>
                                        <div className="mb-2 mx-auto text-center">
                                            <button className="btn btn-login my-1" style={{paddingLeft:'70px', paddingRight:'70px', paddingBottom:'10px', paddingTop:'10px'}}>LOGIN</button>
                                        </div>
                                        <div className="text-center">
                                            <Link className="nav-link size-13px fw-medium my-2" to="kebijakan-privasi/register">Belum Punya akun ?</Link>
                                            <Link className="nav-link size-13px fw-medium my-2"  to="/lupa-password">Lupa Password ?</Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="background col-4">
                        <img src="/images/Cahyo_MFD.png" alt="images 1" width="85%" className="mb-3" style={{marginLeft:'70px'}}/>
                        <h2 className="title-icare text-center fw-medium" style={{marginLeft:'70px', fontSize:'35px'}}>Solusi untuk eskalasi problem dan permintaan layanan.</h2>
                    </div>
                </div>


            {/* about section */}
                    <section className="section-about" id="about">
                        <div className="card-about mb-5">
                            <div className="row g-0 mx-auto">
                                <div className="col-md-6">
                                    <div className="card-body pt-5 px-5 mx-5">
                                        <h4 className="title-icare text-center fw-bold mb-5">Mengapa iCare?</h4>
                                        <p className="card-text description-icare lh-sm">iCare adalah aplikasi mobile yang dapat digunakan untuk mempermudah <b>eskalasi problem</b> dan <b>permintaan layanan</b> yang dibutuhkan oleh pelanggan Astragraphia.</p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <iframe width="100%" height="315" src="https://www.youtube-nocookie.com/embed/WthGEU-Rig4" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                                </div>
                            </div>
                        </div>
                    </section>


            {/* fitur section */}
                <section className="section-fitur" id="fitur">
                    <div className="container mb-5">
                        <h4 className="title-icare text-center fw-bold mb-3"> Fitur iCare</h4>
                        <div className="row">
                            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                                <div className="card custom-height shadow-lg mb-3" style={{borderBottom:"4px solid #2DB5F9"}}>
                                    <div className="card-body d-flex align-items-center justify-content-center" style={{padding:" 3rem 5rem"}}>
                                        <div className="text-center">
                                            <img src="/images/breakfix.png" alt="breakfix" width="70"/>
                                            <h5 className="card-title"> Breakfix </h5>
                                            <p className="card-text" style={{fontSize:"11px"}}>Sebagai layanan customer untuk permintaan perbaikan pada mesin.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                                <div className="card custom-height shadow-lg mb-3" style={{borderBottom:"4px solid #F58B09"}}>
                                    <div className="card-body d-flex align-items-center justify-content-center" style={{padding:" 3rem 5rem"}}>
                                        <div className="text-center">
                                            <img src="/images/supplies.png" alt="supplies" width="70"/>
                                            <h5 className="card-title"> Supplies </h5>
                                            <p className="card-text" style={{fontSize:"11px"}}>Sebagai layanan customer untuk permintaan consumable dan sparepart.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                                <div className="card custom-height shadow-lg mb-3" style={{borderBottom:"4px solid #0EDA52"}}>
                                    <div className="card-body d-flex align-items-center justify-content-center" style={{padding:" 3rem 5rem"}}>
                                        <div className="text-center">
                                            <img src="/images/collect-meter-install.png" alt="install" width="70"/>
                                            <h5 className="card-title"> Install </h5>
                                            <p className="card-text" style={{fontSize:"11px"}}>Sebagai layanan customer untuk permintaan setting konfigurasi mesin.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                                <div className="card custom-height shadow-lg mb-3" style={{borderBottom:"4px solid #B40EDE"}}>
                                    <div className="card-body d-flex align-items-center justify-content-center" style={{padding:" 3rem 5rem"}}>
                                        <div className="text-center">
                                            <img src="/images/collect-meter-install.png" alt="collect meter" width="70"/>
                                            <h5 className="card-title"> Collect Meter </h5>
                                            <p className="card-text" style={{fontSize:"11px"}}>Sebagai layanan customer untuk permintaan informasi billing meter yang ada pada mesin printer Astragraphia.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                                <div className="card custom-height shadow-lg mb-3" style={{borderBottom:"4px solid #E23845"}}>
                                    <div className="card-body d-flex align-items-center justify-content-center" style={{padding:" 3rem 5rem"}}>
                                        <div className="text-center">
                                            <img src="/images/riwayat.png" alt="riwayat" width="70"/>
                                            <h5 className="card-title"> Riwayat </h5>
                                            <p className="card-text" style={{fontSize:"11px"}}>Untuk melihat histori permintaan layanan sebelumnya.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                                <div className="card custom-height shadow-lg mb-3" style={{borderBottom:"4px solid #B629DD"}}>
                                    <div className="card-body d-flex align-items-center justify-content-center" style={{padding:" 3rem 5rem"}}>
                                        <div className="text-center">
                                            <img src="/images/informasi.png" alt="informasi" width="70"/>
                                            <h5 className="card-title"> Informasi </h5>
                                            <p className="card-text" style={{fontSize:"11px"}}>Untuk melihat status notifikasi dari permintaan layanan yang dibuat.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                                <div className="card custom-height shadow-lg mb-3" style={{borderBottom:"4px solid #EE31A3"}}>
                                    <div className="card-body d-flex align-items-center justify-content-center" style={{padding:" 3rem 5rem"}}>
                                        <div className="text-center">
                                            <img src="/images/setting.png" alt="setting" width="70"/>
                                            <h5 className="card-title"> Setting </h5>
                                            <p className="card-text" style={{fontSize:"11px"}}>Untuk melihat konfigurasi pada aplikasi iCare seperti perubahan Data Diri, Alamat, EQ, dll.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


            {/* profit-section */}
                <section className="benefit-section" id="benefit">
                    <div className="container mb-5">
                        <h4 className="title-icare text-center fw-bold mb-3">Keuntungan</h4>
                        <div className="row">
                            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                                <div className="card custom-height shadow-lg mb-5">
                                    <div className="card-body d-flex align-items-center justify-content-center" style={{padding:'3rem 5rem'}}>
                                        <div className="text-center">
                                            <img src="/images/easy.png" alt="riwayat" width="50" />
                                            <h5 className="card-title"> Riwayat </h5>
                                            <p className="card-text" style={{fontSize:'11px'}}>Memudahkan customer pada saat permintaan layanan.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                                <div className="card custom-height shadow-lg mb-5">
                                    <div className="card-body d-flex align-items-center justify-content-center" style={{padding:'3rem 5rem'}}>
                                        <div className="text-center">
                                            <img src="/images/monitoring.png" alt="monitoring" width="50" />
                                            <h5 className="card-title"> Monitoring </h5>
                                            <p className="card-text" style={{fontSize:'11px'}}>Customer dapat memonitor status permintaan layanan.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                                <div className="card custom-height shadow-lg mb-5">
                                    <div className="card-body d-flex align-items-center justify-content-center" style={{padding:'3rem 5rem'}}>
                                        <div className="text-center">
                                            <img src="/images/setting.png" alt="setting" width="50" />
                                            <h5 className="card-title"> Setting </h5>
                                            <p className="card-text" style={{fontSize:'11px'}}>Meningkatkan kualitas layanan Astragraphia.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                                <div className="card custom-height shadow-lg mb-5">
                                    <div className="card-body d-flex align-items-center justify-content-center" style={{padding:'3rem 5rem'}}>
                                        <div className="text-center">
                                            <img src="/images/satisfaction.png" alt="satisfaction" width="50" />
                                            <h5 className="card-title"> Satisfaction </h5>
                                            <p className="card-text" style={{fontSize:'11px'}}>Meningkatkan kepuasan pelanggan.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


            {/* testimonials-section */}
                <section className="testimonials-section" id="testimonial">
                    <div className="container mb-5">
                        <h4 className="title-icare text-center fw-bold">Testimonials</h4>
                        <Carousel />
                    </div>
                </section>


            {/* pakai iCare sekarang */}
                <div className="row" style={{borderTop: '1px solid #d4d8ff'}}>
                    <div className="col-lg-5 col-md-5 col-12 py-5">
                        <img src="/images/iCareLogo.png" alt="Logo iCare" className="mb-2" width="110" />
                        <p className="mb-1" style={{fontSize:'24px'}}>Pakai iCare Sekarang!</p>
                        <p className="text-danger" style={{fontSize:'12px'}}>Kemudahan <b>eskalasi problem</b> dan <b>permintaan layanan</b> dalam satu genggaman.</p>
                    </div>
                    <div className="col-lg-7 col-md-7 col-12">
                        <div className="container">
                            <img src="/images/peta.png" alt="iCare" height="260" />
                        </div>
                    </div>
                </div>
            </>
        )
    }

    submit(e) {
        e.preventDefault() 
        setToken("78ghjkl") 
        this.props.router.navigate("/dashboard")
    }
}

