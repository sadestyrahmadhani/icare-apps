import { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../component/navbar";
import Footer from "../../component/footer"

export default class extends Component {
    render() {
        return(
            <>
                <Navbar versi="2" />
                <div className="container">
                    <div className="card-title text-center mx-auto my-3 mb-5" style={{borderBottom:'3px solid #014C90', width:'92px'}}>
                        <h5 className="title-icare fw-bold">Kode OTP</h5>
                    </div>
                    <div className="col-md-5 col-sm-8 col-12 mx-auto">
                        <div className="card px-4 mb-5" style={{border:'1px solid'}}>
                            <div className="card-body text-center">
                                <p className="mb-4" style={{fontSize:'14px'}}>Silahkan masukkan kode OTP yang telah dikirimkan melalui sms ke No. 6281377538428</p>
                                <form className="mb-4">
                                    <input type="text" className="form-control border-only-bottom text-center mb-4" placeholder="Masukkan Kode OTP" style={{fontSize:'12px', color:'#9c9c9c'}} />
                                </form>
                                <Link className="btn btn-login fw-medium rounded-3 mb-3" style={{fontSize:'14px', paddingLeft:'70px', paddingRight:'70px', paddingTop:'15px', paddingBottom:'15px'}} to="/">SUBMIT</Link>
                                <p className="mb-2" style={{fontSize:'14px'}}>Belum terima SMS kode OTP ?</p>
                                <Link className="fw-medium" style={{textDecoration:'none', color:'#5289bd', fontSize:'14px'}}>Kirim Ulang</Link>
                                <p className="mt-2" style={{fontSize:'14px'}}>Harap Tunggu 58 detik sebelum kirim ulang otp</p>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        )
    }
}