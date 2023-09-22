import { Component, useState } from "react";
import { Link, useNavigate, useResolvedPath } from "react-router-dom";
import { register,registerimage } from "../../services/API"
import Navbar from "../../component/navbar";
import Footer from "./../../component/footer";
import ConfirmAlert from "../../component/alert/confirmAlert";
import { Col, Row } from "react-bootstrap";


function Register() {
    const navigate = useNavigate()
    const [ showPopup, setShowPopup ] = useState(false) 
    const [ alertOption, setAlertOption ] = useState({
        title:'',
        message:''
    })
    const [ countFileInput, setCountFileInput ] = useState(0)
    const [ email, setEmail ] = useState('')
    const [ phone, setPhone ] = useState('')
    const [ pass, setPass ] = useState('')
    const [ rePass, setRePass ] = useState('')
    const [ name, setName ] = useState('')
    const [ meterImage, setMeterImage ] = useState('')
    const [ nameCompany, setNameCompany ] = useState('')
    const [ equipment, setEquipment ] = useState('')
    const [ errorEmail, setErrorEmail ] = useState('')
    const [ errorPhone, setErrorPhone ] = useState('')
    const [ errorPass, setErrorPass ] = useState('')
    const [ errorRePass, setErrorRePass ] = useState('')
    const [ errorName, setErrorName ] = useState('')
    const [ errorNameCompany, setErrorNameCompany ] = useState('')
    const [ errorEQ, setErrorEQ] = useState('')

    const handlePopup = () => {
        setShowPopup(false)
    }
    
    async function submit(e) {
        e.preventDefault()
        let isValid=true
        if(countFileInput > 0) {            
            if(!email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
                isValid=false
                setErrorEmail('Silahkan isi email')
            } 
            if(phone === ""){ 
                isValid=false
                setErrorPhone('Silahkan isi nomor telepon')
            }
            if(pass === ""){ 
                isValid=false
                setErrorPass('Silahkan isi password')
            }
            if(rePass === ""){ 
                isValid=false
                setErrorRePass('Silahkan ulangi isi password')
            }
            if(name === ""){ 
                isValid=false
                setErrorName('Silahkan isi nama lengkap')
            }
            if(nameCompany === ""){ 
                isValid=false
                setErrorNameCompany('Silahkan isi nama perusahaan/instansi')
            }
            if(equipment === ""){ 
                isValid=false
                setErrorEQ('Silahkan isi nomor equipment')
            }
        } else { 
            isValid=false
            setShowPopup(true)
            setAlertOption({title: 'Error', message: 'Belum ada foto'})
        } 
        if (isValid){
            const {email, phone,pass,name,nameCompany,equipment,meterImage} = useState
            
            setAlertOption(true)
            setErrorEQ(false)
    
            const uploadFile = await registerimage(meterImage)
            if (uploadFile.data.includes("Succes upload")){
                let filename = uploadFile.data.substring(15,uploadFile.data.length-15)
                // console.log('file name',filename)
                const response = await register({
                "username": email,    
                "password":  pass,    
                "namalengkap": name,    
                "emailaddress": email,    
                "telp": phone,    
                "validationcode": "", "otp": "False","token2": "",
                "namaperusahaan":nameCompany,
                "fotoEquipment":filename, 
                "NoEquipment":equipment,
                "type":"normal"
              });
                console.log('register response',response)
                if (response.data.includes("Succes")) {
                    setShowPopup(true)
                    setAlertOption({title: '', message : 
                            `Terima kasih untuk data-data yang anda input, selanjutnya \n 
                          kami akan memvalidasi data-data tersebut dan akan menginformasikannya \n
                          melalui email anda.`
                })
                    navigate('/')
                }
                else
                    setShowPopup(true)
                    setAlertOption({title: '', message: ''})
            }else{
                setShowPopup(true)
                setAlertOption({title: 'Error Upload', message: 'please try again'})
            }
            
            console.log('submitting')
        }else{
            setShowPopup(true)
            setAlertOption({title: 'Error', message: 'please fill empty field'})
        }
    }
    
    const validationEmail = (e) => {
        e.preventDefault()
        setEmail(e.target.value)
        if(e.target.value === "") {
            setErrorEmail('Silahkan isi email')
        } else {
            if(!e.target.value.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                setErrorEmail('Email tidak valid')
                return
            } else {
                setErrorEmail('')
            }
        } 
    }
    
    const validationPhone = (e) => {
        e.preventDefault()
        setPhone(e.target.value)
        if(e.target.value === "") {
            setErrorPhone('Silahkan isi nomor telepon')
        } else {
            setErrorPhone('')
        }
    }
    
    const validationPass = (e) => {
        e.preventDefault()
        setPass(e.target.value)
        if(e.target.value === "") {
            setErrorPass('Silahkan isi password')
        } else {
            setErrorPass('')
        }
    }
    
    const validationRePass = (e) => {
        e.preventDefault()
        setRePass(e.target.value)
        if(e.target.value === "") {
            setErrorRePass('Silahkan ulang isi password')
        } else {
            if(e.target.value !== pass) {
                setErrorRePass('Re-Enter password tidak sama dengan password')
            } else {
                setErrorRePass('')
            }
        }
    }
    
    const validationName = (e) => {
        e.preventDefault()
        setName(e.target.value)
        if(e.target.value === "") {
            setErrorName('Silahkan isi nama lengkap')
        } else {
            setErrorName('')
        }
    }
    
    const validationNameCompany = (e) => {
        e.preventDefault()
        setNameCompany(e.target.value)
        if(e.target.value === "") {
            setErrorNameCompany('Silahkan isi nama perusahaan/isntansi')
        } else {
            setErrorNameCompany('')
        }
    }
    
    const validationEquipment = (e) => {
        e.preventDefault()
        setEquipment(e.target.value)
        if(e.target.value === "") {
            setErrorEQ('Silahkan isi nomor equipment')
        } else {
            setErrorEQ('')
        }
    }
    const handleChange = (e) => {
        setCountFileInput(e.target.files.length)
        setMeterImage(e.target.files[0])
    }
    
    
    const handleFileInput = (e) => {
        setCountFileInput(e.target.files.length)
        document.querySelectorAll('.inputFiles-display').forEach((val, key) => {
            if(e.target.files.length > 0) {
                val.innerHTML = `
                    <div class="d-flex align-items-center">
                        <div class="w-100">${ e.target.files[0].name }</div>
                        <i class="fa fa-check text-success d-block d-md-none"></i>
                    </div>
                `
            } else {
                val.innerHTML = ""
            }
        })
    }
    
    const removeFileInput = (e) => {
        e.preventDefault()
        setCountFileInput(0)
        document.querySelector('#inputFiles').value = ""
        document.querySelectorAll('.inputFiles-display').forEach((val, key) => {
            val.innerHTML = ``
        })
    }
    

    return(
        <div className="bg-light">
            <Navbar versi="2" />
                <div className="responsive-bar">
                    <div className="mx-md-auto my-md-3 my-0 my-md-3 pb-2" style={{borderBottom:'3px solid #014C90', width:'87px'}}>
                        <h5 className="title-icare title-fitur fw-bold m-0 p-0">
                            <Link to="/" className="nav-link d-md-none d-inline me-3">
                                <i className="fa fa-arrow-left"></i>
                            </Link>
                            <span className="d-md-none d-inline">Registrasi User</span>
                            <span className="fw-bold d-md-inline d-none">Registrasi</span>
                        </h5>
                    </div>
                </div>
                <div className="col-md-7 col-12 mx-auto responsive-register">
                    <form onSubmit={ submit }>
                        <div className="card mb-5 bg-light">
                            <div className="card-body p-lg-5 px-0 mx-lg-0 mx-2">
                                <div className="row justify-content-center">
                                    <div className="col-lg-6 col-md-6 col-12 input-mobile">
                                        <div className="mb-3">
                                            <label className="size-13px fw-bold">Email Address</label>
                                            <input type="email" className={ `form-control  border-only-bottom ${ errorEmail === "" ? "": "is-invalid"}` } onChange={validationEmail} />
                                            <span className={`invalid-feedback ${errorEmail === "" ? "d-none": ""}`} style={{ fontSize: 12 }}>{errorEmail}</span>
                                        </div>
                                        <div className="mb-3">
                                            <label className="size-13px fw-bold">Mobile Phone Number</label>
                                            <input type="number" onKeyUp={validationPhone} className={ `form-control custom-input-number border-only-bottom ${ errorPhone === "" ? "" : "is-invalid" }` } onChange={validationPhone} />
                                            <span className={`invalid-feedback ${errorPhone === "" ? "d-none": ""}`} style={{ fontSize: 12 }}>{errorPhone}</span>
                                        </div>
                                        <div className="mb-3">
                                            <label className="size-13px fw-bold">Password</label>
                                            <input type="password" className={ `form-control border-only-bottom ${ errorPass === "" ? "" : "is-invalid" }` } onChange={validationPass} />
                                            <span className={`invalid-feedback ${errorPass === "" ? "d-none": ""}`} style={{ fontSize: 12 }}>{errorPass}</span>
                                        </div>
                                        <div className="mb-3">
                                            <label className="size-13px fw-bold">Re-enter Password</label>
                                            <input type="password" className={ `form-control border-only-bottom ${ errorRePass === "" ? "" : "is-invalid" }` } onChange={validationRePass} />
                                            <span className={`invalid-feedback ${errorRePass === "" ? "d-none": ""}`} style={{ fontSize: 12 }}>{errorRePass}</span>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-12 input-mobile">
                                        <div className="mb-3">
                                            <label className="size-13px fw-bold">Nama Lengkap</label>
                                            <input type="text" className={ `form-control border-only-bottom ${ errorName === "" ? "" : "is-invalid" }` } onChange={validationName} />
                                            <span className={`invalid-feedback ${errorName === "" ? "d-none": ""}`} style={{ fontSize: 12 }}>{errorName}</span>
                                        </div>
                                        <div className="mb-3">
                                            <label className="size-13px fw-bold">Nama Perusahaan / Instansi</label>
                                            <input type="text" className={ `form-control border-only-bottom ${ errorNameCompany === "" ? "" : "is-invalid" }` } onChange={validationNameCompany} />
                                            <span className={`invalid-feedback ${errorNameCompany === "" ? "d-none": ""}`} style={{ fontSize: 12 }}>{errorNameCompany}</span>
                                        </div>
                                        <div className="mb-3">
                                            <label className="size-13px fw-bold">Nomor Equipment</label>
                                            <input type="number" onKeyUp={validationEquipment} className={ `form-control custom-input-number border-only-bottom ${ errorEQ === "" ? "" : "is-invalid" }` } onChange={validationEquipment} />
                                            <span className={`invalid-feedback ${errorEQ === "" ? "d-none": ""}`} style={{ fontSize: 12 }}>{errorEQ}</span>
                                        </div>
                                        <div className="mb-2" style={{ position: 'relative' }}>
                                            <label className="size-13px fw-bold">Foto <span className="d-md-inline d-none">Sticker</span> Equipment</label>
                                            <input type="file" className={ `form-control border-only-bottom d-none` } id="inputFiles" onChange={ handleFileInput } accept="image/*" />
                                            <label htmlFor="inputFiles" className="form-control border-only-bottom d-none d-md-block inputFiles-display" style={{ minHeight: 33 }}></label>
                                            <label htmlFor="inputFiles" className="bg-light d-md-block d-none" style={{ position: 'absolute', fontSize: 12, padding: '7px 13px', border: '1px solid #999', borderRadius: 8, right: 0, marginTop: -35, cursor: 'pointer' }}><i className="fa fa-folder me-2 text-warning"></i> Choose File</label>
                                            <div className="form-control py-2 d-flex align-items-center d-md-none">
                                                <img src="/images/foto-sticker.png" width="70" className="mx-5 ms-4 my-1" />
                                                <div>
                                                    <p className="fw-bold mb-1" style={{fontSize:'12px'}}>Panduan Foto Equipment</p>
                                                    <p className="mb-0" style={{fontSize:'12px'}}>Pastikan seluruh bagian sticker equipment pada mesin berada dalam bingkai foto </p>
                                                </div>
                                            </div>
                                            <p className="mx-2 mb-0 d-md-none d-block" style={{ fontSize: 12 }}>&#40;Maks.5MB.Format JPG&#47;PNG&#41;</p>
                                        </div>
                                        <div className="mb-5 d-md-block d-none">
                                            <p className="text-danger fw-bold" style={{fontSize:'12px'}}>&#42;Panduan foto <span className="d-md-inline d-none">sticker</span> equipment <br/> Pastikan seluruh bagian sticker equipment pada mesin berada dalam bingkai foto <br/> &#40;Maks.5MB.Format jpg&#47;&#41; </p>
                                        </div>
                                        <div className="mb-5 d-block d-md-none">
                                            <Row className="align-items-center">
                                                <Col xs="4" md="2">
                                                    <label htmlFor="inputFiles" className={ `btn btn-login px-3 rounded-4 ${ countFileInput > 0 ? 'd-none' : '' }` }>Foto <br /> Equipment</label>
                                                    <button onClick={ removeFileInput } type="button" className={ `btn btn-outline-danger btn-sm text-primary rounded-4 ${ countFileInput > 0 ? '' : 'd-none' }`}>Hapus Foto Equipment</button>
                                                </Col>
                                                <Col xs="8" className="inputFiles-display"></Col>
                                            </Row>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 text-center ">
                                    <button type="button" className="btn btn-google shadow-sm fw-medium px-3 mx-lg-2 text-muted py-2 mb-3 d-lg-inline-block d-none">
                                        <img src="/images/google-icons.png" alt="google-icons" height="20" className="me-3" />
                                        Sign up with Google
                                    </button>
                                    <button className="btn btn-login rounded-3 fw-medium mb-3 mx-auto mx-lg-2 d-sm-block d-lg-inline-block" type="submit" style={{fontSize:'14px', paddingLeft:'60px', paddingRight:'60px', paddingTop:'12px', paddingBottom:'12px'}} >SUBMIT</button>
                                    <button type="button" className="btn btn-google shadow-sm fw-medium px-3 text-muted py-2 mb-3 mx-auto d-md-inline-block d-lg-none d-block">
                                        <img src="/images/google-icons.png" alt="google-icons" height="20" className="me-3" />
                                        Sign up with Google
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                    <ConfirmAlert visible={showPopup} titleMessage={alertOption.title} message={alertOption.message} onClick={handlePopup} customClass="col-md-2 col-sm-6 col-9" />
                </div>
            <Footer />
        </div> 
    )

}




export default Register


// export default class extends Component {
//     constructor(props) {
//         super(props)

//         this.handlePopup = this.handlePopup.bind(this)
//         this.submit = this.submit.bind(this)
//         this.handleChange=this.handleChange.bind(this)
//         this.validationEmail = this.validationEmail.bind(this)
//         this.validationPhone = this.validationPhone.bind(this)
//         this.validationPass = this.validationPass.bind(this)
//         this.validationRePass = this.validationRePass.bind(this)
//         this.validationName = this.validationName.bind(this)
//         this.validationNameCompany = this.validationNameCompany.bind(this)
//         this.validationEquipment = this.validationEquipment.bind(this)
//         this.handleFileInput = this.handleFileInput.bind(this)
//         this.removeFileInput = this.removeFileInput.bind(this)
//         this.state = {
//             // showError: false,
//             showPopup: false,
//             alertOption: {
//                 title:'',
//                 message:'',
//             },
//             countFileInput: 0,

//             email:'',
//             phone:'',
//             pass:'',
//             rePass:'',
//             name:'',
//             meterImage:'',
//             nameCompany:'',
//             equipment:'',
//             errorEmail:'',
//             errorPhone:'',
//             errorPass:'',
//             errorRePass:'',
//             errorName:'',
//             errorNameCompany:'',
//             errorEQ:'',

//         }
//     }

//     handlePopup() {
//         this.setState({showPopup: false})
//     }
    
//     async submit(e) {
//         e.preventDefault()
//         let isValid=true
//         if(this.state.countFileInput > 0) {            
//             if(!this.state.email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
//                 isValid=false
//                 this.setState({errorEmail:"Silahkan isi email"})
//             } 
//             if(this.state.phone === ""){ 
//                 isValid=false
//                 this.setState({errorPhone:"Silahkan isi nomor telepon"})
//             }
//             if(this.state.pass === ""){ 
//                 isValid=false
//                 this.setState({errorPass:"Silahkan isi password"})
//             }
//             if(this.state.rePass === ""){ 
//                 isValid=false
//                 this.setState({errorRePass:"Silahkan ulangi isi password"})
//             }
//             if(this.state.name === ""){ 
//                 isValid=false
//                 this.setState({errorName:"silahkan isi nama lengkap"})
//             }
//             if(this.state.nameCompany === ""){ 
//                 isValid=false
//                 this.setState({errorNameCompany:"silahkan isi nama perusahaan/instansi"})
//             }
//             if(this.state.equipment === ""){ 
//                 isValid=false
//                 this.setState({errorEQ:"silahkan isi nomor equipment"})
//             }
//         } else { 
//             isValid=false
//             this.setState({showPopup: true, alertOption: {title: 'Error', message: 'Belum ada foto'}})
//         } 
//         if (isValid){
//             const {email, phone,pass,name,nameCompany,equipment,meterImage} = this.state
            
//             this.setState({loading:true, error: false})

//             const uploadFile=await registerimage(meterImage)
//             if (uploadFile.data.includes("Succes upload")){
//                 let filename=uploadFile.data.substring(15,uploadFile.data.length-15)
//                 // console.log('file name',filename)
//                 const response = await register({
//                 "username": email,    
//                 "password":  pass,    
//                 "namalengkap": name,    
//                 "emailaddress": email,    
//                 "telp": phone,    
//                 "validationcode": "", "otp": "False","token2": "",
//                 "namaperusahaan":nameCompany,
//                 "fotoEquipment":filename, 
//                 "NoEquipment":equipment,
//                 "type":"normal"
//               });
//                 console.log('register response',response)
//                 if (response.data.includes("Succes")) {
//                     this.setState({  showPopup: true, alertOption: {title: '', message: 
//                             `Terima kasih untuk data-data yang anda input, selanjutnya \n 
//                           kami akan memvalidasi data-data tersebut dan akan menginformasikannya \n
//                           melalui email anda.`} })
//                     this.props.router.navigate("/")
//                 }
//                 else
//                     this.setState({  showPopup: true, alertOption: {title: '', message: response.data} })
//             }else{
//                 this.setState({  showPopup: true, alertOption: {title: 'Error Upload', message: 'Please try again'} })
//             }
            
//             console.log('submitting')
//         }else{
//             this.setState({  showPopup: true, alertOption: {title: 'Error', message: 'Please fill empty field'} })
//         }
        
//     }

//     validationEmail(e) {
//         e.preventDefault()
//         this.setState({email: e.target.value})
//         if(e.target.value === "") {
//             this.setState({errorEmail:"Silahkan isi email"})
//         } else {
//             if(!e.target.value.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
//                 this.setState({errorEmail:"Email tidak valid"})
//                 return
//             } else {
//                 this.setState({errorEmail:""})
//             }
//         } 
//     }

//     validationPhone(e) {
//         e.preventDefault()
//         this.setState({phone: e.target.value})
//         if(e.target.value === "") {
//             this.setState({errorPhone:"Silahkan isi nomor telepon"})
//         } else {
//             this.setState({errorPhone:""})
//         }
//     }

//     validationPass(e) {
//         e.preventDefault()
//         this.setState({pass: e.target.value})
//         if(e.target.value === "") {
//             this.setState({errorPass:"Silahkan isi password"})
//         } else {
//             this.setState({errorPass:""})
//         }
//     }

//     validationRePass(e) {
//         e.preventDefault()
//         this.setState({rePass: e.target.value})
//         if(e.target.value === "") {
//             this.setState({errorRePass:"Silahkan ulangi isi password"})
//         } else {
//             if(e.target.value !== this.state.pass) {
//                 this.setState({errorRePass:"Re-Enter password tidak sama dengan password"})
//             } else {
//                 this.setState({errorRePass:""})
//             }
//         }
//     }

//     validationName(e) {
//         e.preventDefault()
//         this.setState({name: e.target.value})
//         if(e.target.value === "") {
//             this.setState({errorName:"Silahkan isi nama lengkap"})
//         } else {
//             this.setState({errorName:""})
//         }
//     }

//     validationNameCompany(e) {
//         e.preventDefault()
//         this.setState({nameCompany: e.target.value})
//         if(e.target.value === "") {
//             this.setState({errorNameCompany:"Silahkan isi nama perusahaan/instansi"})
//         } else {
//             this.setState({errorNameCompany:""})
//         }
//     }

//     validationEquipment(e) {
//         e.preventDefault()
//         this.setState({equipment: e.target.value})
//         if(e.target.value === "") {
//             this.setState({errorEQ:"Silahkan isi nomor equipment"})
//         } else {
//             this.setState({errorEQ:""})
//         }
//     }
//     handleChange(e){
//         this.setState({countFileInput: e.target.files.length,meterImage:e.target.files[0]})
//     }

//     render() {
//         return(
//             <div className="bg-light">
//                 <Navbar versi="2" />
//                     <div className="responsive-bar">
//                         <div className="mx-md-auto my-md-3 my-0 my-md-3 pb-2" style={{borderBottom:'3px solid #014C90', width:'87px'}}>
//                             <h5 className="title-icare title-fitur fw-bold m-0 p-0">
//                                 <Link to="/" className="nav-link d-md-none d-inline me-3">
//                                     <i className="fa fa-arrow-left"></i>
//                                 </Link>
//                                 <span className="d-md-none d-inline">Registrasi User</span>
//                                 <span className="fw-bold d-md-inline d-none">Registrasi</span>
//                             </h5>
//                         </div>
//                     </div>
//                     <div className="col-md-7 col-12 mx-auto responsive-register">
//                         <form onSubmit={ this.submit }>
//                             <div className="card mb-5 bg-light">
//                                 <div className="card-body p-lg-5 px-0 mx-lg-0 mx-2">
//                                     <div className="row justify-content-center">
//                                         <div className="col-lg-6 col-md-6 col-12 input-mobile">
//                                             <div className="mb-3">
//                                                 <label className="size-13px fw-bold">Email Address</label>
//                                                 <input type="email" className={ `form-control  border-only-bottom ${ this.state.errorEmail === "" ? "": "is-invalid"}` } onChange={this.validationEmail} />
//                                                 <span className={`invalid-feedback ${this.state.errorEmail === "" ? "d-none": ""}`} style={{ fontSize: 12 }}>{this.state.errorEmail}</span>
//                                             </div>
//                                             <div className="mb-3">
//                                                 <label className="size-13px fw-bold">Mobile Phone Number</label>
//                                                 <input type="number" onKeyUp={this.validationPhone} className={ `form-control custom-input-number border-only-bottom ${ this.state.errorPhone === "" ? "" : "is-invalid" }` } onChange={this.validationPhone} />
//                                                 <span className={`invalid-feedback ${this.state.errorPhone === "" ? "d-none": ""}`} style={{ fontSize: 12 }}>{this.state.errorPhone}</span>
//                                             </div>
//                                             <div className="mb-3">
//                                                 <label className="size-13px fw-bold">Password</label>
//                                                 <input type="password" className={ `form-control border-only-bottom ${ this.state.errorPass === "" ? "" : "is-invalid" }` } onChange={this.validationPass} />
//                                                 <span className={`invalid-feedback ${this.state.errorPass === "" ? "d-none": ""}`} style={{ fontSize: 12 }}>{this.state.errorPass}</span>
//                                             </div>
//                                             <div className="mb-3">
//                                                 <label className="size-13px fw-bold">Re-enter Password</label>
//                                                 <input type="password" className={ `form-control border-only-bottom ${ this.state.errorRePass === "" ? "" : "is-invalid" }` } onChange={this.validationRePass} />
//                                                 <span className={`invalid-feedback ${this.state.errorRePass === "" ? "d-none": ""}`} style={{ fontSize: 12 }}>{this.state.errorRePass}</span>
//                                             </div>
//                                         </div>
//                                         <div className="col-lg-6 col-md-6 col-12 input-mobile">
//                                             <div className="mb-3">
//                                                 <label className="size-13px fw-bold">Nama Lengkap</label>
//                                                 <input type="text" className={ `form-control border-only-bottom ${ this.state.errorName === "" ? "" : "is-invalid" }` } onChange={this.validationName} />
//                                                 <span className={`invalid-feedback ${this.state.errorName === "" ? "d-none": ""}`} style={{ fontSize: 12 }}>{this.state.errorName}</span>
//                                             </div>
//                                             <div className="mb-3">
//                                                 <label className="size-13px fw-bold">Nama Perusahaan / Instansi</label>
//                                                 <input type="text" className={ `form-control border-only-bottom ${ this.state.errorNameCompany === "" ? "" : "is-invalid" }` } onChange={this.validationNameCompany} />
//                                                 <span className={`invalid-feedback ${this.state.errorNameCompany === "" ? "d-none": ""}`} style={{ fontSize: 12 }}>{this.state.errorNameCompany}</span>
//                                             </div>
//                                             <div className="mb-3">
//                                                 <label className="size-13px fw-bold">Nomor Equipment</label>
//                                                 <input type="number" onKeyUp={this.validationEquipment} className={ `form-control custom-input-number border-only-bottom ${ this.state.errorEQ === "" ? "" : "is-invalid" }` } onChange={this.validationEquipment} />
//                                                 <span className={`invalid-feedback ${this.state.errorEQ === "" ? "d-none": ""}`} style={{ fontSize: 12 }}>{this.state.errorEQ}</span>
//                                             </div>
//                                             <div className="mb-2" style={{ position: 'relative' }}>
//                                                 <label className="size-13px fw-bold">Foto <span className="d-md-inline d-none">Sticker</span> Equipment</label>
//                                                 <input type="file" className={ `form-control border-only-bottom d-none` } id="inputFiles" onChange={ this.handleFileInput } accept="image/*" />
//                                                 <label htmlFor="inputFiles" className="form-control border-only-bottom d-none d-md-block inputFiles-display" style={{ minHeight: 33 }}></label>
//                                                 <label htmlFor="inputFiles" className="bg-light d-md-block d-none" style={{ position: 'absolute', fontSize: 12, padding: '7px 13px', border: '1px solid #999', borderRadius: 8, right: 0, marginTop: -35, cursor: 'pointer' }}><i className="fa fa-folder me-2 text-warning"></i> Choose File</label>
//                                                 <div className="form-control py-2 d-flex align-items-center d-md-none">
//                                                     <img src="/images/foto-sticker.png" width="70" className="mx-5 ms-4 my-1" />
//                                                     <div>
//                                                         <p className="fw-bold mb-1" style={{fontSize:'12px'}}>Panduan Foto Equipment</p>
//                                                         <p className="mb-0" style={{fontSize:'12px'}}>Pastikan seluruh bagian sticker equipment pada mesin berada dalam bingkai foto </p>
//                                                     </div>
//                                                 </div>
//                                                 <p className="mx-2 mb-0 d-md-none d-block" style={{ fontSize: 12 }}>&#40;Maks.5MB.Format JPG&#47;PNG&#41;</p>
//                                             </div>
//                                             <div className="mb-5 d-md-block d-none">
//                                                 <p className="text-danger fw-bold" style={{fontSize:'12px'}}>&#42;Panduan foto <span className="d-md-inline d-none">sticker</span> equipment <br/> Pastikan seluruh bagian sticker equipment pada mesin berada dalam bingkai foto <br/> &#40;Maks.5MB.Format jpg&#47;&#41; </p>
//                                             </div>
//                                             <div className="mb-5 d-block d-md-none">
//                                                 <Row className="align-items-center">
//                                                     <Col xs="4" md="2">
//                                                         <label htmlFor="inputFiles" className={ `btn btn-login px-3 rounded-4 ${ this.state.countFileInput > 0 ? 'd-none' : '' }` }>Foto <br /> Equipment</label>
//                                                         <button onClick={ this.removeFileInput } type="button" className={ `btn btn-outline-danger btn-sm text-primary rounded-4 ${ this.state.countFileInput > 0 ? '' : 'd-none' }`}>Hapus Foto Equipment</button>
//                                                     </Col>
//                                                     <Col xs="8" className="inputFiles-display"></Col>
//                                                 </Row>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="col-12 text-center ">
//                                         <button type="button" className="btn btn-google shadow-sm fw-medium px-3 mx-lg-2 text-muted py-2 mb-3 d-lg-inline-block d-none">
//                                             <img src="/images/google-icons.png" alt="google-icons" height="20" className="me-3" />
//                                             Sign up with Google
//                                         </button>
//                                         <button className="btn btn-login rounded-3 fw-medium mb-3 mx-auto mx-lg-2 d-sm-block d-lg-inline-block" type="submit" style={{fontSize:'14px', paddingLeft:'60px', paddingRight:'60px', paddingTop:'12px', paddingBottom:'12px'}} >SUBMIT</button>
//                                         <button type="button" className="btn btn-google shadow-sm fw-medium px-3 text-muted py-2 mb-3 mx-auto d-md-inline-block d-lg-none d-block">
//                                             <img src="/images/google-icons.png" alt="google-icons" height="20" className="me-3" />
//                                             Sign up with Google
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </form>
//                         <ConfirmAlert visible={this.state.showPopup} titleMessage={this.state.alertOption.title} message={this.state.alertOption.message} onClick={this.handlePopup} customClass="col-md-2 col-sm-6 col-9" />
//                     </div>
//                 <Footer />
//             </div> 
//         )  
//     }

//     handleFileInput(e) {
//         this.setState({countFileInput: e.target.files.length})
//         document.querySelectorAll('.inputFiles-display').forEach((val, key) => {
//             if(e.target.files.length > 0) {
//                 val.innerHTML = `
//                     <div class="d-flex align-items-center">
//                         <div class="w-100">${ e.target.files[0].name }</div>
//                         <i class="fa fa-check text-success d-block d-md-none"></i>
//                     </div>
//                 `
//             } else {
//                 val.innerHTML = ""
//             }
//         })
//     }

//     removeFileInput(e) {
//         e.preventDefault()
//         this.setState({countFileInput: 0})
//         document.querySelector('#inputFiles').value = ""
//         document.querySelectorAll('.inputFiles-display').forEach((val, key) => {
//             val.innerHTML = ``
//         })
//     }

// }




