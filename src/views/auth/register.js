import { Component } from "react";
import { Link, useResolvedPath } from "react-router-dom";
import Navbar from "../../component/navbar";
import Footer from "./../../component/footer";
import ConfirmAlert from "../../component/alert/confirmAlert";

// import Swal from "sweetalert2";

export default class extends Component {
    constructor(props) {
        super(props)

        this.handlePopup = this.handlePopup.bind(this)
        this.submit = this.submit.bind(this)
        this.validationEmail = this.validationEmail.bind(this)
        this.validationPhone = this.validationPhone.bind(this)
        this.validationPass = this.validationPass.bind(this)
        this.validationRePass = this.validationRePass.bind(this)
        this.validationName = this.validationName.bind(this)
        this.validationNameCompany = this.validationNameCompany.bind(this)
        this.validationEquipment = this.validationEquipment.bind(this)
        this.state = {
            // showError: false,
            showPopup: false,
            alertOption: {
                title:'',
                message:'',
            },
            countFileInput: 0,

            email:'',
            phone:'',
            pass:'',
            rePass:'',
            name:'',
            nameCompany:'',
            equipment:'',
            errorEmail:'',
            errorPhone:'',
            errorPass:'',
            errorRePass:'',
            errorName:'',
            errorNameCompany:'',
            errorEQ:'',

        }
    }

    handlePopup() {
        this.setState({showPopup: false})
    }
    
    submit(e) {
        e.preventDefault()
        if(this.state.countFileInput > 0) {
            this.setState({  showPopup: true, alertOption: {title: 'Error', message: 'Please fill empty field'} })
        } else {
            this.setState({showPopup: true, alertOption: {title: 'Error', message: 'Belum ada foto'}})
        }
        if(!this.state.email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) return
        if(this.state.phone === "") this.setState({errorPhone:"Silahkan isi nomor telepon"})
        if(this.state.pass === "") this.setState({errorPass:"Silahkan isi password"})
        if(this.state.rePass === "") this.setState({errorRePass:"Silahkan ulangi isi password"})
        if(this.state.name === "") this.setState({errorName:"silahkan isi nama lengkap"})
        if(this.state.nameCompany === "") this.setState({errorNameCompany:"silahkan isi nama perusahaan/instansi"})
        if(this.state.equipment === "") this.setState({errorEQ:"silahkan isi nomor equipment"})

        
        // Swal.fire({
        //     title: 'Error',
        //     text: 'Please fill empty field',
        //     confirmButtonColor: '#0099ff'
        // })
    }

    validationEmail(e) {
        e.preventDefault()
        this.setState({email: e.target.value})
        if(e.target.value === "") {
            this.setState({errorEmail:"Silahkan isi email"})
        } else {
            if(!e.target.value.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                this.setState({errorEmail:"Email tidak valid"})
                return
            } else {
                this.setState({errorEmail:""})
            }
        } 
    }

    validationPhone(e) {
        e.preventDefault()
        this.setState({phone: e.target.value})
        if(e.target.value === "") {
            this.setState({errorPhone:"Silahkan isi nomor telepon"})
        } else {
            this.setState({errorPhone:""})
        }
    }

    validationPass(e) {
        e.preventDefault()
        this.setState({pass: e.target.value})
        if(e.target.value === "") {
            this.setState({errorPass:"Silahkan isi password"})
        } else {
            this.setState({errorPass:""})
        }
    }

    validationRePass(e) {
        e.preventDefault()
        this.setState({rePass: e.target.value})
        if(e.target.value === "") {
            this.setState({errorRePass:"Silahkan ulangi isi password"})
        } else {
            if(e.target.value !== this.state.pass) {
                this.setState({errorRePass:"Re-Enter password tidak sama dengan password"})
            } else {
                this.setState({errorRePass:""})
            }
        }
    }

    validationName(e) {
        e.preventDefault()
        this.setState({name: e.target.value})
        if(e.target.value === "") {
            this.setState({errorName:"Silahkan isi nama lengkap"})
        } else {
            this.setState({errorName:""})
        }
    }

    validationNameCompany(e) {
        e.preventDefault()
        this.setState({nameCompany: e.target.value})
        if(e.target.value === "") {
            this.setState({errorNameCompany:"Silahkan isi nama perusahaan/instansi"})
        } else {
            this.setState({errorNameCompany:""})
        }
    }

    validationEquipment(e) {
        e.preventDefault()
        this.setState({equipment: e.target.value})
        if(e.target.value === "") {
            this.setState({errorEQ:"Silahkan isi nomor equipment"})
        } else {
            this.setState({errorEQ:""})
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
                                            <div className="mb-3">
                                                <label className="size-13px fw-bold">Email Address</label>
                                                <input type="email" className={ `form-control  border-only-bottom ${ this.state.errorEmail === "" ? "": "is-invalid"}` } onChange={this.validationEmail} />
                                                <span className={`invalid-feedback ${this.state.errorEmail === "" ? "d-none": ""}`} style={{ fontSize: 12 }}>{this.state.errorEmail}</span>
                                            </div>
                                            <div className="mb-3">
                                                <label className="size-13px fw-bold">Mobile Phone Number</label>
                                                <input type="number" onKeyUp={this.validationPhone} className={ `form-control custom-input-number border-only-bottom ${ this.state.errorPhone === "" ? "" : "is-invalid" }` } onChange={this.validationPhone} />
                                                <span className={`invalid-feedback ${this.state.errorPhone === "" ? "d-none": ""}`} style={{ fontSize: 12 }}>{this.state.errorPhone}</span>
                                            </div>
                                            <div className="mb-3">
                                                <label className="size-13px fw-bold">Password</label>
                                                <input type="password" className={ `form-control border-only-bottom ${ this.state.errorPass === "" ? "" : "is-invalid" }` } onChange={this.validationPass} />
                                                <span className={`invalid-feedback ${this.state.errorPass === "" ? "d-none": ""}`} style={{ fontSize: 12 }}>{this.state.errorPass}</span>
                                            </div>
                                            <div className="mb-3">
                                                <label className="size-13px fw-bold">Re-enter Password</label>
                                                <input type="password" className={ `form-control border-only-bottom ${ this.state.errorRePass === "" ? "" : "is-invalid" }` } onChange={this.validationRePass} />
                                                <span className={`invalid-feedback ${this.state.errorRePass === "" ? "d-none": ""}`} style={{ fontSize: 12 }}>{this.state.errorRePass}</span>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-12 ">
                                            <div className="mb-3">
                                                <label className="size-13px fw-bold">Nama Lengkap</label>
                                                <input type="text" className={ `form-control border-only-bottom ${ this.state.errorName === "" ? "" : "is-invalid" }` } onChange={this.validationName} />
                                                <span className={`invalid-feedback ${this.state.errorName === "" ? "d-none": ""}`} style={{ fontSize: 12 }}>{this.state.errorName}</span>
                                            </div>
                                            <div className="mb-3">
                                                <label className="size-13px fw-bold">Nama Perusahaan / Instansi</label>
                                                <input type="text" className={ `form-control border-only-bottom ${ this.state.errorNameCompany === "" ? "" : "is-invalid" }` } onChange={this.validationNameCompany} />
                                                <span className={`invalid-feedback ${this.state.errorNameCompany === "" ? "d-none": ""}`} style={{ fontSize: 12 }}>{this.state.errorNameCompany}</span>
                                            </div>
                                            <div className="mb-3">
                                                <label className="size-13px fw-bold">Nomor Equipment</label>
                                                <input type="number" onKeyUp={this.validationEquipment} className={ `form-control custom-input-number border-only-bottom ${ this.state.errorEQ === "" ? "" : "is-invalid" }` } onChange={this.validationEquipment} />
                                                <span className={`invalid-feedback ${this.state.errorEQ === "" ? "d-none": ""}`} style={{ fontSize: 12 }}>{this.state.errorEQ}</span>
                                            </div>
                                            <div className="mb-3" style={{ position: 'relative' }}>
                                                <label className="size-13px fw-bold">Foto Sticker Equipment</label>
                                                <input type="file" className={ `form-control border-only-bottom` } id="inputFiles" onChange={(e) => this.setState({countFileInput: e.target.files.length})} accept="image/*" />
                                                <label htmlFor="inputFiles" className="bg-light" style={{ position: 'absolute', fontSize: 12, padding: '7px 13px', border: '1px solid #999', borderRadius: 8, right: 0, marginTop: -35 }}><i className="fa fa-folder me-2 text-warning"></i> Choose File</label>
                                            </div>
                                            <div className="mb-5">
                                                <p className="text-danger fw-bold" style={{fontSize:'12px'}}>&#42;Panduan foto sticker equipment <br/> Pastikan seluruh bagian sticker equipment pada mesin berada dalam bingkai foto <br/> &#40;Maks.5MB.Format jpg&#47;&#41; </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 text-center">
                                    <button className="btn btn-google shadow-sm me-3 fw-medium px-5 text-muted py-2">Sign up with Google</button>
                                        <button className="btn btn-login rounded-3 fw-medium" type="submit" style={{fontSize:'14px', paddingLeft:'60px', paddingRight:'60px', paddingTop:'12px', paddingBottom:'12px'}} >SUBMIT</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <ConfirmAlert visible={this.state.showPopup} titleMessage={this.state.alertOption.title} message={this.state.alertOption.message} onClick={this.handlePopup} customClass="col-md-2 col-sm-6 col-12" />
                    </div>
                </div>
                <Footer />
            </div>
        )
    }

}




