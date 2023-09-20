import { Component } from "react";
import ConfirmAlert from "../../component/alert/confirmAlert";
import LoadingAlert from "../../component/alert/loadingAlert";
import { Link } from "react-router-dom";
import { updatePasswordById } from "../../services/API";


export default class extends Component {
    constructor(props) {
        super(props)

        this.submit = this.submit.bind(this)
        this.handlePopup = this.handlePopup.bind(this)
        this.validationOldPassword = this.validationOldPassword.bind(this)
        this.validationNewPassword = this.validationNewPassword.bind(this)
        this.validationRepeatPassword = this.validationRepeatPassword.bind(this)
        this.state = {
            showPopup: false,
            countFileInput: 0,
            oldPassword: '',
            newPassword: '',
            repeatPassword: '',
            errorOldPassword: '',
            errorNewPassword: '',
            errorRepeatPassword: '',
            alertOption: {
                title: '',
                message: '',
                redirect: false,
                url: '',
            },
            typeInput: [
                'password',
                'password',
                'password',
            ],
            iconClass: [
                'fa-eye',
                'fa-eye',
                'fa-eye',
            ],
            loading: false,
        }
    }

    handlePopup(){
        if(this.state.alertOption.redirect) {
            this.setState({showPopup:false})
            this.props.router.navigate(this.state.alertOption.url)
        } else {
            this.setState({showPopup: false})
        }
    }

    async submit(e){
        e.preventDefault()
        if(this.state.newPassword === "") this.setState({errorNewPassword: "Silahkan isi kata sandi baru"})
        if(this.state.repeatPassword === "") this.setState({errorRepeatPassword: "Silahkan ulangi isi kata sandi"})
        if(this.state.oldPassword === "") this.setState({errorOldPassword: "Silahkan isi kata sandi lama"})
        if(this.state.oldPassword === this.state.newPassword && this.state.oldPassword  !== "" && this.state.newPassword !== "" && this.state.repeatPassword) {
            this.setState({showPopup: true, alertOption: {title: '', message: 'Password baru sama dengan password lama', redirect: false, url: ''}})
            return
        }
        if(this.state.oldPassword !== "" && this.state.newPassword !== "" && this.state.repeatPassword !== ""){
            const res = await updatePasswordById({userid: localStorage.getItem('id'), oldPassword: this.state.oldPassword, newPassword: this.state.newPassword})
            if(res.status == 200 && res.data !== null) {
                if(res.data === "Old password not match") {
                    this.setState({showPopup: true, alertOption: {title: '', message: res.data, redirect: false, url: ''}})
                } else {
                    this.setState({showPopup: true, alertOption: {title: '', message: res.data, redirect: true, url: '/dashboard'}})
                }
                // console.log(res.data)
            }
        } else {
            this.setState({showPopup: true, alertOption: {title: 'Error', message: 'Harap isi seluruh data', redirect: false, url: ''}})
        }
    }
    
    validationNewPassword(e) {
        e.preventDefault()
        this.setState({newPassword: e.target.value})
        if(e.target.value === ""){
            this.setState({errorNewPassword: "Silahkan isi kata sandi baru"})
        } else {
            this.setState({errorNewPassword: ""})
        }
    }

    validationOldPassword(e) {
        e.preventDefault()
        this.setState({oldPassword: e.target.value})
        if(e.target.value === ""){
            this.setState({errorOldPassword: "Silahkan isi kata sandi lama"})
        } else {
            this.setState({errorOldPassword: ""})
        }
    }

    validationRepeatPassword(e) {
        e.preventDefault()
        this.setState({repeatPassword: e.target.value})
        if(e.target.value === ""){
            this.setState({errorRepeatPassword: "Silahkan isi ulang kata sandi baru"})
        } else {
            if(e.target.value !== this.state.newPassword){
                this.setState({errorRepeatPassword: "Masukkan sesuai kata sandi baru"})
            } else {
                this.setState({errorRepeatPassword: ""})
            }
        }
    }
    
    render(){
        return(
            <>
                <div className="responsive-bar">
                    <div className="card-title mx-md-auto my-md-3 my-0" style={{borderBottom: '3px solid #014C90', width: '134px'}}>
                        <h4 className="title-icare title-fitur m-0 p-0 fw-bold" style={{fontSize: '18px'}}>
                            <Link to="/settings" className="nav-link d-md-none d-inline me-3">
                                <i className="fa fa-arrow-left"></i>
                            </Link>
                            Ubah Kata Sandi
                        </h4>
                    </div>
                </div>
                <div className="col-md-7 col-12 mx-auto responsive-ubah-pass">
                    <div className="card mb-5 px-2 px-md-4">
                        <div className="card-body p-lg-5 px-0 input-mobile">
                            <form onSubmit={this.submit}>
                                <div className="mb-3">
                                    <label className="fw-medium form-control border border-dark size-13px" style={{backgroundColor: '#014C90', borderRadius: '0px', color:'white'}}>Masukkan Kata Sandi Lama</label>
                                    <div className="border border-dark">
                                        <div className="d-flex">
                                            <div className="col-11">
                                                <input type={ this.state.typeInput[0] } className={`form-control border-0 ${this.state.errorOldPassword === "" ? "" : "is-invalid"}`} style={{boxShadow: 'none', textDecoration: 'none'}} onChange={this.validationOldPassword}/>
                                            </div>
                                            <div className="col-1 my-auto text-center" style={{paddingLeft: 0}}>
                                                <i 
                                                    className={ `fa ${ this.state.iconClass[0] } fa-lg` } 
                                                    onClick={ () => this.setState({
                                                        typeInput: [
                                                            this.state.typeInput[0] == 'password' ? 'text' : 'password',
                                                            this.state.typeInput[1],
                                                            this.state.typeInput[2],
                                                        ],
                                                        iconClass: [
                                                            this.state.typeInput[0] == 'password' ? 'fa-eye-slash' : 'fa-eye',
                                                            this.state.iconClass[1],
                                                            this.state.iconClass[2]
                                                        ]
                                                    }) }
                                                ></i>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                                <span className={`text-danger small mx-2 ${this.state.errorOldPassword === "" ? "d-none" : ""}`} style={{fontSize: 12}}>{this.state.errorOldPassword}</span>
                                            </div>
                                        </div>
                                    </div>  
                                </div>
                                <div className="mb-3">
                                    <label className="fw-medium form-control border border-dark size-13px" style={{backgroundColor: '#014C90', borderRadius: '0px', color:'white'}}>Masukkan Kata Sandi Baru</label>
                                    <div className="border border-dark">
                                        <div className="d-flex">
                                            <div className="col-11">
                                                <input type={ this.state.typeInput[1] } className={`form-control border-0 ${this.state.errorNewPassword === "" ? "" : "is-invalid"}`} style={{boxShadow: 'none', textDecoration: 'none'}} onChange={this.validationNewPassword}/>
                                            </div>
                                            <div className="col-1 my-auto text-center" style={{paddingLeft: 0}}>
                                                <i 
                                                    className={ `fa ${ this.state.iconClass[1] } fa-lg` } 
                                                    onClick={ () => this.setState({
                                                        typeInput: [
                                                            this.state.typeInput[0],
                                                            this.state.typeInput[1] == 'password' ? 'text' : 'password',
                                                            this.state.typeInput[2],
                                                        ],
                                                        iconClass: [
                                                            this.state.iconClass[0],
                                                            this.state.typeInput[1] == 'password' ? 'fa-eye-slash' : 'fa-eye',
                                                            this.state.iconClass[2]
                                                        ]
                                                    }) }
                                                ></i>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                                <span className={`text-danger small mx-2 ${this.state.errorNewPassword === "" ? "d-none" : ""}`} style={{fontSize: 12}}>{this.state.errorNewPassword}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="fw-medium form-control border border-dark size-13px" style={{backgroundColor: '#014C90', borderRadius: '0px', color:'white'}}>Ulangi Kata Sandi Baru</label>
                                    <div className="border border-dark">
                                        <div className="d-flex">
                                            <div className="col-11">
                                                <input type={ this.state.typeInput[2] } className={`form-control border-0 ${this.state.errorRepeatPassword === "" ? "" : "is-invalid"}`} style={{boxShadow: 'none', textDecoration: 'none'}} onChange={this.validationRepeatPassword} />
                                            </div>
                                            <div className="col-1 my-auto text-center" style={{paddingLeft: 0}}>
                                                <i 
                                                    className={ `fa ${ this.state.iconClass[2] } fa-lg` } 
                                                    onClick={ () => this.setState({
                                                        typeInput: [
                                                            this.state.typeInput[0],
                                                            this.state.typeInput[1],
                                                            this.state.typeInput[2] == 'password' ? 'text' : 'password'
                                                        ],
                                                        iconClass: [
                                                            this.state.iconClass[0],
                                                            this.state.iconClass[1],
                                                            this.state.typeInput[2] == 'password' ? 'fa-eye-slash' : 'fa-eye'
                                                        ]
                                                    }) }
                                                    ></i>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                                <span className={`text-danger small mx-2 ${this.state.errorRepeatPassword === "" ? "d-none" : ""}`} style={{fontSize: '12px'}}> {this.state.errorRepeatPassword} </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <button className="btn btn-login px-5 py-2 fw-medium" type="submit">Submit</button>
                                </div>
                            </form>
                            <ConfirmAlert visible={this.state.showPopup} message={this.state.alertOption.message} onClick={this.handlePopup} customClass="col-md-3 col-sm-6 col-9" />
                            <LoadingAlert visible={this.state.loading} customClass="col-md-2 col-9" />
                        </div>
                    </div>
                </div>
            </>
        )
    }
}