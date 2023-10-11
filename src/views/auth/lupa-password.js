import { Component, useState } from "react";
import Navbar from "../../component/navbar";
import Footer from "../../component/footer";
import { Link, useNavigate } from "react-router-dom";
import { requestOtpForgetPassword } from "../../services";
import ConfirmAlert from "../../component/alert/confirmAlert";
import LoadingAlert from "../../component/alert/loadingAlert";


function ForgetPassword() {
    const navigate =  useNavigate()

    const [ email, setEmail ] = useState('')
    const [ phone, setPhone ] = useState('')
    const [ errorEmail, setErrorEmail ] = useState('')
    const [ errorPhone, setErrorPhone ] = useState('')
    const [ showPopup, setShowPopup ] = useState(false)
    const [ loading, setLoading ] = useState(false)

    const handlePopup = () => {
        setShowPopup(false)
    }

    async function submit(e) {
        e.preventDefault()
        if(email === "") setErrorEmail('Silahkan isi email')
        if(phone === "") setErrorPhone('Silahkan isi nomor telepone') 
        if(!email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) return
        if(!phone.match(/^(\+\d{1,3})?\d{8,15}$/) || phone.length < 9 || phone.length > 16) return
        if(email !== "" && phone !== "") {
            setLoading(true)
            var telp = phone
            if(telp.charAt(0) === '0') {
                telp = `+62${telp.substring(1)}`
            } else {
                if(telp !== '' && telp != '+') {
                    telp = `+${telp}`
                }
            }
            const res = await requestOtpForgetPassword({email: email, telp: telp})  
            setLoading(false)
            if(res.status == 200 && res.data == null) {
                setShowPopup(true)
            } else {
                var data = res.data
                // console.log(res)
                // navigate(`/kode-otp/${window.btoa(JSON.stringify({...res.data, email: email, telp: phone}))}`)
                navigate('/kode-otp', {
                    state: {
                        firstlogin:false, 
                        email: email,
                        phone: telp.toString().trim(),
                        telp: data.number,
                        userid: data.userid,
                        msg: data
                    } 
                })
            }
        }
    }

    const validationEmail = (e) => {
        e.preventDefault()
        setEmail(e.target.value)
        if(e.target.value === "") {
            setErrorEmail('Silahkan isi email')
            return
        }
        if(!email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            setErrorEmail('Email tidak valid')
            return
        }
        setErrorEmail('')
    }

    const validationPhone = (e) => {
        e.preventDefault()
        setPhone(e.target.value)
        // if(e.target.value.charAt(0) === '0') {
        //     setPhone(`+62${e.target.value.substring(1)}`)
        // } else {
        //     if(e.target.value.charAt(0) === '+') {
        //         setPhone(e.target.value)
        //     } else {
        //         if(e.target.value !== '' && e.target.value != '+') {
        //             setPhone(`+${e.target.value}`)
        //         } else {
        //             setPhone(``)
        //         }
        //     }
        // }

        if(e.target.value === "") {
            setErrorPhone('Silahkan isi nomor telepon')
            return
        }
        if(!e.target.value.match(/^(\+\d{1,3})?\d{8,15}$/) || e.target.value.length < 9 || e.target.value.length > 16) {
            setErrorPhone('Nomor tidak valid')
            return
        }
        setErrorPhone('')
    }      
    
    return(
        <div className="bg-light">
            <Navbar versi="2" />
                <div className="responsive-bar">
                    <div className="mx-md-auto my-md-3 my-0" style={{borderBottom:'3px solid #014C90', width:'135px'}}>
                        <h5 className="title-icare title-fitur fw-bold m-0 p-0">
                            <Link to="/" className="nav-link d-md-none d-inline me-3">
                                <i className="fa fa-arrow-left"></i>
                            </Link>
                            <span className="title-bold">Lupa Password</span>
                        </h5>
                    </div>
                </div>
                <div className="col-md-5 col-12 mx-auto responsive-lupa-pass">
                    <div className="card mb-5 px-2 px-md-4 shadow-sm bg-light" style={{border:'1px solid'}}>
                        <div className="card-body p-md-5 px-0 input-mobile">
                            <form onSubmit={submit}>
                                <div className="mb-3">
                                    <label className="size-13px fw-bold">Email Address</label>
                                    <input type="email"  className={`form-control border-only-bottom ${errorEmail === "" ? "": "invalid"}`} onChange={validationEmail}/>
                                    <span className={`${errorEmail === "" ? "d-none": ""} text-danger`} style={{fontSize:'12px'}}> {errorEmail} </span>
                                </div>
                                <div className="mb-md-5 mb-2">
                                    <label className="size-13px fw-bold">Number Phone</label>
                                    <input type="tel"  className={`form-control border-only-bottom ${errorPhone === "" ? "": "invalid"}`} onChange={validationPhone} value={ phone } />
                                    <span className={`${errorPhone === "" ? "d-none": ""} text-danger`} style={{fontSize:'12px'}}> {errorPhone} </span>
                                </div>
                                <div className="text-center pt-4">
                                    <button className="btn btn-login fw-medium rounded-3" type="submit" style={{fontSize:'14px', paddingLeft:'60px', paddingRight:'60px', paddingTop:'12px', paddingBottom:'12px'}}>SUBMIT</button>
                                </div>
                            </form>
                            <ConfirmAlert visible={showPopup} titleMessage="Error" message="No.telp/Email tidak sesuai" onClick={handlePopup} />
                            <LoadingAlert visible={loading} customClass="col-md-2 col-8" />
                        </div>
                    </div>
                </div>
            <Footer />
        </div>
    )
}

export default ForgetPassword


// export default class extends Component {
//     constructor(props) {
//         super(props)
//         this.submit = this.submit.bind(this)
//         this.handlePopup = this.handlePopup.bind(this)
//         this.validationEmail = this.validationEmail.bind(this)
//         this.validationPhone = this.validationPhone.bind(this)
//         this.state = {
//             email:'',
//             phone:'',
//             errorEmail:'',
//             errorPhone:'',
//             showPopup: false,
//             loading: false,
//         }
//     }

//     handlePopup() {
//         this.setState({showPopup: false})
//     }

//     async submit(e) {
//         e.preventDefault()
//         if(this.state.email === "") this.setState({errorEmail:"Silahkan isi email"})
//         if(this.state.phone === "") this.setState({errorPhone:"Silahkan isi nomor telepon"})
//         if(!this.state.email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) return
//         if(!this.state.phone.match(/^(\+\d{1,3})?\d{8,15}$/) || this.state.phone.length < 9 || this.state.phone.length > 16) return
//         if(this.state.email !== "" && this.state.phone !== "") {
//             this.setState({loading: true})
//             const res = await requestOtpForgetPassword({email: this.state.email, telp: this.state.phone})  
//             this.setState({loading: false})
//             if(res.status == 200 && res.data == null) {
//                 this.setState({showPopup: true})
//             } else {
//                 this.props.router.navigate(`/kode-otp/${window.btoa(JSON.stringify({...res.data, email: this.state.email, telp: this.state.phone}))}`)
//             }
//         }
//     }

//     validationEmail(e) {
//         e.preventDefault()
//         this.setState({email: e.target.value})
//         if(e.target.value === "") {
//             this.setState({errorEmail:'Silahkan isi email'})
//             return
//         }
//         if(!this.state.email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
//             this.setState({errorEmail:'Email tidak valid'})
//             return
//         }
//         this.setState({errorEmail:''})
//     }

//     validationPhone(e) {
//         e.preventDefault()
//         if(e.target.value.charAt(0) === '0') {
//             this.setState({phone: `+62${e.target.value.substring(1)}`})
//         } else {
//             if(e.target.value.charAt(0) === '+') {
//                 this.setState({phone: e.target.value})
//             } else {
//                 this.setState({phone: `+${e.target.value}`})
//             }
//         }

//         if(e.target.value === "") {
//             this.setState({errorPhone:'Silahkan isi nomor telepon'})
//             return
//         }
//         if(!e.target.value.match(/^(\+\d{1,3})?\d{8,15}$/) || e.target.value.length < 9 || e.target.value.length > 16) {
//             this.setState({errorPhone:'Nomor tidak valid'})
//             return
//         }
//         this.setState({errorPhone:''})
//     }

//     render() {
//         return(
//             <div className="bg-light">
//                 <Navbar versi="2" />
//                     <div className="responsive-bar">
//                         <div className="mx-md-auto my-md-3 my-0" style={{borderBottom:'3px solid #014C90', width:'135px'}}>
//                             <h5 className="title-icare title-fitur fw-bold m-0 p-0">
//                                 <Link to="/" className="nav-link d-md-none d-inline me-3">
//                                     <i className="fa fa-arrow-left"></i>
//                                 </Link>
//                                 Lupa Password
//                             </h5>
//                         </div>
//                     </div>
//                     <div className="col-md-5 col-12 mx-auto responsive-lupa-pass">
//                         <div className="card mb-5 px-2 px-md-4 shadow-sm bg-light" style={{border:'1px solid'}}>
//                             <div className="card-body p-md-5 px-0 input-mobile">
//                                 <form onSubmit={this.submit}>
//                                     <div className="mb-3">
//                                         <label className="size-13px fw-bold">Email Address</label>
//                                         <input type="email"  className={`form-control border-only-bottom ${this.state.errorEmail === "" ? "": "invalid"}`} onChange={this.validationEmail}/>
//                                         <span className={`${this.state.errorEmail === "" ? "d-none": ""} text-danger`} style={{fontSize:'12px'}}> {this.state.errorEmail} </span>
//                                     </div>
//                                     <div className="mb-md-5 mb-2">
//                                         <label className="size-13px fw-bold">Number Phone</label>
//                                         <input type="tel"  className={`form-control border-only-bottom ${this.state.errorPhone === "" ? "": "invalid"}`} onChange={this.validationPhone}/>
//                                         <span className={`${this.state.errorPhone === "" ? "d-none": ""} text-danger`} style={{fontSize:'12px'}}> {this.state.errorPhone} </span>
//                                     </div>
//                                     <div className="text-center pt-4">
//                                         <button className="btn btn-login fw-medium rounded-3" type="submit" style={{fontSize:'14px', paddingLeft:'60px', paddingRight:'60px', paddingTop:'12px', paddingBottom:'12px'}}>SUBMIT</button>
//                                     </div>
//                                 </form>
//                                 <ConfirmAlert visible={this.state.showPopup} titleMessage="Error" message="No.telp/Email tidak sesuai" onClick={this.handlePopup} />
//                                 <LoadingAlert visible={this.state.loading} customClass="col-md-2 col-8" />
//                             </div>
//                         </div>
//                     </div>
//                 <Footer />
//             </div>
//         )
//     }
// }

