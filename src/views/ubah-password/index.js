import { Component } from "react";

export default class extends Component {
    render(){
        return(
            <>
                {/* <Navbar versi="2" /> */}
                <div className="container">
                    <div className="card-title text-center mx-auto my-3 mb-5" style={{borderBottom: '3px solid #014C90', width: '135px'}}>
                        <h4 className="title-icare fw-bold" style={{fontSize: '16px'}}>Ubah Kata Sandi</h4>
                    </div>
                    <div className="col-md-5 col-sm-7 col-12 mx-auto">
                        <div className="card mb-5">
                            <div className="card-body p-5">
                                <form>
                                    <div className="mb-3">
                                        <label className="fw-medium form-control border border-dark" style={{backgroundColor: '#014C90', borderRadius: '0px', color:'white'}}>Masukkan Kata Sandi Lama</label>
                                        <input type="password" className="form-control border border-1 border-dark" style={{borderRadius: '0px'}}/>
                                    </div>
                                    <div className="mb-3">
                                        <label className="fw-medium form-control border border-dark" style={{backgroundColor: '#014C90', borderRadius: '0px', color:'white'}}>Masukkan Kata Sandi Baru</label>
                                        <input type="password" className="form-control border border-1 border-dark" style={{borderRadius: '0px'}}/>
                                    </div>
                                    <div className="mb-3">
                                        <label className="fw-medium form-control border border-dark" style={{backgroundColor: '#014C90', borderRadius: '0px', color:'white'}}>Ulangi Kata Sandi Baru</label>
                                        <input type="password" className="form-control border border-1 border-dark" style={{borderRadius: '0px'}}/>
                                    </div>
                                </form>
                                <div className="text-center">
                                    <button className="btn btn-login px-5 py-2fw-medium">Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}