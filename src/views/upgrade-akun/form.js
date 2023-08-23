import { Component } from "react";
import { Link } from "react-router-dom";

export default class extends Component {
    render(){
        return(
            <>
                <div className="container">
                    <div className="card-title text-center mx-auto my-3 mb-3" style={{borderBottom: '3px solid #014C90', width: '165px'}}>
                        <h4 className="title-icare fw-bold" style={{fontSize: '18px'}}>Upgrade Akun iCare</h4>
                    </div>
                    <div clsName="col-md-8 col-sm-4 col-12 mx-auto">
                        <form>
                            <div className="card mb-4 border border-dark" style={{borderRadius: '20px'}}>
                                <div className="card-body p-5">
                                    <div className="row">
                                        <div className="card-label py-2 border border-dark" style={{backgroundColor: '#014C90'}}>
                                            <label className="fw-medium" style={{fontSize: '14px', color: '#fff'}}>Foto KTP</label>
                                        </div>
                                    </div>
                                    <div className="row border border-top-0 border-dark" style={{paddingTop: '10px', paddingBottom: '10px'}}>
                                        <div className="col-3 text-center my-auto">
                                            <img src="/images/contoh_ktp.png" alt="" style={{width: '120px'}} className=""/>
                                        </div>
                                        <div className="col-9" style={{fontSize: '14px', paddingTop: '10px'}}>
                                            <span>Panduan Foto KTP</span>
                                            <p className="mt-3">Pastikan seluruh bagian KTP kamu berada dalam bingkai foto dan bukan fotokopi KTP</p>
                                        </div>
                                    </div>
                                    <label style={{fontSize: '14px', marginTop: '10px'}}>(Maks. 5 MB, Format JPG/PNG)</label>
                                    <div className="mt-2 mb-3">
                                        <input type="file" className="d-none" id="input-file" accept="image/*" />
                                        <label className="mb-3 btn btn-login" htmlFor="input-file" style={{padding: '10px 40px'}}>Foto KTP</label>
                                    </div>
                                    <div className="row">
                                        <div className="card-label py-2 border border-dark" style={{backgroundColor: '#014C90'}}>
                                            <label className="fw-medium" style={{fontSize: '14px', color: '#fff'}}>Selfie dengan KTP</label>
                                        </div>
                                    </div>
                                    <div className="row border border-top-0 border-dark" style={{paddingTop: '10px', paddingBottom: '10px'}}>
                                        <div className="col-3 text-center my-auto">
                                            <img src="/images/selfie_ktp.png" alt="" style={{width: '60px'}} className=""/>
                                        </div>
                                        <div className="col-9" style={{fontSize: '14px', paddingTop: '10px'}}>
                                            <span>Panduan Selfie KTP</span>
                                            <p className="mt-3">Pastikan seluruh bagian muka dan KTP kamu berada dalam bingkai foto dan bukan editan</p>
                                        </div>
                                    </div>
                                    <label style={{fontSize: '14px', marginTop: '10px'}}>(Maks. 5 MB, Format JPG/PNG)</label>
                                    <div className="mt-2 mb-3">
                                    <input type="file" className="d-none" id="input-file" accept="image/*" />
                                        <label className="btn btn-login" htmlFor="input-file" style={{padding: '10px 40px'}}>Selfie dengan KTP</label>
                                    </div>
                                </div>  
                            </div>
                            <div className="text-center">
                                {/* <button type="submit" className="btn btn-login" style={{padding: '15px 50px 15px 50px '}}>SUBMIT</button> */}
                                <Link className="btn btn-login" style={{padding: '15px 50px 15px 50px'}} to="/waiting-upgrade-account">SUBMIT</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        )
    }
}