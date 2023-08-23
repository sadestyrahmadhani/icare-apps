import { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../component/navbar";
import Footer from "./../../component/footer";

export default class extends Component {
    constructor(props) {
        super(props)

        this.submit = this.submit.bind(this)
        this.state = {
            showError: false
        }
    }

    render() {
        return(
            <div className="bg-light">
                <Navbar versi="2" />
                <div className="container">
                    <div className="card-title text-center mx-auto my-3 mb-5" style={{borderBottom:'3px solid #014C90', width:'88px'}}>
                        <h5 className="title-icare fw-bold">Registrasi</h5>
                    </div>
                    <div className="col-md-8 col-sm-10 col-12 mx-auto">
                        <form onSubmit={ this.submit }>
                            <div className="card mb-5 bg-light">
                                <div className="card-body p-5">
                                    <div className="row justify-content-center">
                                        <div className="col-lg-6 col-md-6 col-12">
                                            <form>
                                                <div className="mb-3">
                                                    <label className="size-13px fw-bold">Email Address</label>
                                                    <input type="email" className={ `form-control  border-only-bottom ${ this.state.showError ? 'is-invalid' : '' }` } />
                                                    <i className="invalid-feedback" style={{ fontSize: 12 }}>Silahkan isi email</i>
                                                </div>
                                                <div className="mb-3">
                                                    <label className="size-13px fw-bold">Mobile Phone Number</label>
                                                    <input type="text" className={ `form-control border-only-bottom ${ this.state.showError ? 'is-invalid' : '' }` } />
                                                    <i className="invalid-feedback" style={{ fontSize: 12 }}>Silahkan isi nomor telepon</i>
                                                </div>
                                                <div className="mb-3">
                                                    <label className="size-13px fw-bold">Password</label>
                                                    <input type="password" className={ `form-control border-only-bottom ${ this.state.showError ? 'is-invalid' : '' }` } />
                                                    <i className="invalid-feedback" style={{ fontSize: 12 }}>Silahkan isi password</i>
                                                </div>
                                                <div className="mb-3">
                                                    <label className="size-13px fw-bold">Re-enter Password</label>
                                                    <input type="password" className={ `form-control border-only-bottom ${ this.state.showError ? 'is-invalid' : '' }` } />
                                                    <i className="invalid-feedback" style={{ fontSize: 12 }}>Silahkan ulangi isi password</i>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-12 ">
                                            <form>
                                                <div className="mb-3">
                                                    <label className="size-13px fw-bold">Nama Lengkap</label>
                                                    <input type="text" className={ `form-control border-only-bottom ${ this.state.showError ? 'is-invalid' : '' }` } />
                                                    <i className="invalid-feedback" style={{ fontSize: 12 }}>Silahkan isi nama lengkap</i>
                                                </div>
                                                <div className="mb-3">
                                                    <label className="size-13px fw-bold">Nama Perusahaan / Instansi</label>
                                                    <input type="text" className={ `form-control border-only-bottom ${ this.state.showError ? 'is-invalid' : '' }` } />
                                                    <i className="invalid-feedback" style={{ fontSize: 12 }}>Silahkan isi nama perusahaan / instansi</i>
                                                </div>
                                                <div className="mb-3">
                                                    <label className="size-13px fw-bold">Nomor Equipment</label>
                                                    <input type="password" className={ `form-control border-only-bottom ${ this.state.showError ? 'is-invalid' : '' }` } />
                                                    <i className="invalid-feedback" style={{ fontSize: 12 }}>Silahkan isi nomor equipment</i>
                                                </div>
                                                <div className="mb-3" style={{ position: 'relative' }}>
                                                    <label className="size-13px fw-bold">Foto Sticker Equipment</label>
                                                    <input type="file" className={ `form-control border-only-bottom` } id="inputFiles" />
                                                    <label htmlFor="inputFiles" className="bg-light" style={{ position: 'absolute', fontSize: 12, padding: '7px 13px', border: '1px solid #999', borderRadius: 8, right: 0, marginTop: -35 }}><i className="fa fa-folder me-2 text-warning"></i> Choose File</label>
                                                </div>
                                                <div className="mb-5">
                                                    <p className="text-danger fw-bold" style={{fontSize:'12px'}}>&#42;Panduan foto sticker equipment <br/> Pastikan seluruh bagian sticker equipment pada mesin berada dalam bingkai foto <br/> &#40;Maks.5MB.Format jpg&#47;&#41; </p>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="col-12 text-center">
                                        <button className="btn btn-white shadow-sm border me-2 rounded-1 fw-medium px-3 text-muted py-2" style={{ fontSize: 14 }}>Sign Up with Google</button>
                                        <button className="btn btn-login rounded-3 fw-medium" type="submit" style={{fontSize:'14px', paddingLeft:'60px', paddingRight:'60px', paddingTop:'12px', paddingBottom:'12px'}} >SUBMIT</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }

    submit(e) {
        e.preventDefault()
        this.setState({ showError: true })
    }
}

