import { Component, useState } from "react";
import { Link, useNavigate, useResolvedPath } from "react-router-dom";
import { register,registerimage } from "../../services/API"
import Navbar from "../../component/navbar";
import Footer from "./../../component/footer";
import ConfirmAlert from "../../component/alert/confirmAlert";
import LoadingAlert from "../../component/alert/loadingAlert"
import { Col, Row } from "react-bootstrap";
import { GoogleLogin } from '@react-oauth/google';
import decode from 'jwt-decode';

function Register() {
    const navigate= useNavigate()
    const [ showPopup, setShowPopup ] = useState(false) 
    const [ alertOption, setAlertOption ] = useState({
        title:'',
        message:'',
        redirect: false,
        type: 'small'
    })
    const [ loading, setLoading] = useState(false)
    const [ countFileInput, setCountFileInput ] = useState(0)
    const [ email, setEmail ] = useState('')
    const [ phone, setPhone ] = useState('')
    const [ pass, setPass ] = useState('')
    const [ rePass, setRePass ] = useState('')
    const [ name, setName ] = useState('')
    const [ google, setGoogle ] = useState(false)
    const [ googleCredential, setGoogleCredential ] = useState('')
    const [ meterImage, setMeterImage ] = useState(null)
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
        if(alertOption.redirect) {
            navigate('/')
        }
    }
    
    async function submit(e) {
        e.preventDefault()
        let isValid=true
        console.log('image',meterImage)
        
        if(!email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
            isValid=false
            setErrorEmail('Silahkan isi email')
        } 
        if(phone === ""){ 
            isValid=false
            setErrorPhone('Silahkan isi nomor telepon')
        }
        if(pass === "" && !google){ 
            isValid=false
            setErrorPass('Silahkan isi password')
        }
        if(rePass === "" && !google){ 
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
        if(rePass !== pass) {
            console.log(1);
            isValid=false
            setShowPopup(true)
            setAlertOption({title: 'Error', message: 'Re-enter password tidak sama dengan password', redirect: false, type: 'small'})
            return
        }
        if (isValid){
            var telp = phone
            if(telp.charAt(0) === '0') {
                telp = `+62${telp.substring(1)}`
            } else {
                if(telp !== '' && telp != '+') {
                    telp = `+${telp}`
                }
            }
            // const {email, phone,pass,name,nameCompany,equipment,meterImage} = useState
            
            // setErrorEQ(false)
            // console.log(telp);
            // const uploadFile = await registerimage(meterImage)
            // if (uploadFile.data.includes("Succes upload")){
            //     let filename = uploadFile.data.substring(15,uploadFile.data.length-15)
            //     console.log('file name',filename)
            //     setLoading(true)
            //     const response = await register({
            //         "username": email,    
            //         "password":  pass,    
            //         "namalengkap": name,    
            //         "emailaddress": email,    
            //         "telp": telp,    
            //         "validationcode": "", "otp": "False","token2": "",
            //         "namaperusahaan":nameCompany,
            //         "fotoEquipment":filename, 
            //         "NoEquipment":equipment,
            //         "googleToken":googleCredential,
            //         "type":google? "google":"normal"
            //     });
                // setLoading(false)
                // console.log('register response',response)
                // if (response.status == 200 && response.data.includes("Success insert new register")) {
                    setShowPopup(true)
                    setAlertOption({title: '', message : 
                            `Terima kasih untuk data-data yang anda input, selanjutnya \n 
                          kami akan memvalidasi data-data tersebut dan akan menginformasikannya \n
                          melalui email anda.`, redirect: true, type: 'large'
                    })
                    
                // } else {
                    // setShowPopup(true)
                    // setAlertOption({title: '', message: response.data, redirect: false, type: 'small'})
                    // console.log(response.data);
                // }
            // }else{
            //     setShowPopup(true)
            //     setAlertOption({title: 'Error Upload', message: 'please try again', redirect: false, type: 'small'})
            // }
            
            // console.log('submitting')
        }else{
            if(!countFileInput > 0) {            
                isValid=false
                setShowPopup(true)
                setAlertOption({title: 'Error', message: 'Belum ada foto', redirect: false, type: 'small'})
            } else {
                setShowPopup(true)
                setAlertOption({title: 'Error', message: 'please fill empty field', redirect: false, type: 'small'})
            }
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
        if(typeof e.key != 'undefined' && !e.key.match(/^\d+$/) && e.keyCode !== 8 && e.keyCode !== 187 && e.keyCode !== 16 && e.keyCode !== 36 && e.keyCode !== 35) {
            e.preventDefault()
            setErrorPhone('Nomor telepon harus berupa angka')
            return
        } 
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
        }  else {
            setErrorEQ('')
        }
    }
    
    const handleChange = (e) => {
        setCountFileInput(e.target.files.length)
        setMeterImage(e.target.files[0])
    }
    
    
    const handleFileInput = (e) => {
        const file = e.target
        setCountFileInput(e.target.files.length)
        setMeterImage(e.target.files[0])
        // console.log(e.target.files[0].name)
        const reader = new FileReader()
            reader.onload = (e) => {                
                // document.getElementById('fotometer').src = e.target.result                
            }
            reader.readAsDataURL(file.files[0])
        
        document.querySelectorAll('.inputFiles-display').forEach((val, key) => {
            if(e.target.files.length > 0) {
                val.innerHTML = 
                `
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
    const googleLogin = async (credential)=> {
        console.log(credential)
        const d = decode(credential.credential);
        setGoogleCredential(credential.credential)
        setEmail(d.email)
        setName(d.name)
        setGoogle(true)
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
        <div className="bg-light intro-y">
            <Navbar versi="2" />
                <div className="responsive-bar">
                    <div className="mx-md-auto my-md-3 my-0 my-md-3 pb-2" style={{borderBottom:'3px solid #014C90', width:'87px'}}>
                        <h5 className="title-icare title-fitur fw-bold m-0 p-0">
                            <Link to="/" className="nav-link d-md-none d-inline me-3">
                                <i className="fa fa-arrow-left"></i>
                            </Link>
                            <span className="d-md-none d-inline title-bold">Registrasi User</span>
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
                                            <input type="email" value={email} className={ `form-control  border-only-bottom ${ errorEmail === "" ? "": "is-invalid"}` } onChange={validationEmail} />
                                            <span className={`invalid-feedback ${errorEmail === "" ? "d-none": ""}`} style={{ fontSize: 12 }}>{errorEmail}</span>
                                        </div>
                                        <div className="mb-3">
                                            <label className="size-13px fw-bold">Mobile Phone Number</label>
                                            <input type="tel" onKeyDown={validationPhone} className={ `form-control custom-input-number border-only-bottom ${ errorPhone === "" ? "" : "is-invalid" }` } onChange={validationPhone} />
                                            <span className={`invalid-feedback ${errorPhone === "" ? "d-none": ""}`} style={{ fontSize: 12 }}>{errorPhone}</span>
                                        </div>
                                        <div className={`mb-3${google ? "d-none": ""}`}>
                                            <label className="size-13px fw-bold">Password</label>
                                            <input type="password" className={ `form-control border-only-bottom ${ errorPass === "" ? "" : "is-invalid" }` } onChange={validationPass} />
                                            <span className={`invalid-feedback ${errorPass === "" ? "d-none": ""}`} style={{ fontSize: 12 }}>{errorPass}</span>
                                        </div>
                                        <div className={`mb-3${google ? "d-none": ""}`}>
                                            <label className="size-13px fw-bold">Re-enter Password</label>
                                            <input type="password" className={ `form-control border-only-bottom ${ errorRePass === "" ? "" : "is-invalid" }` } onChange={validationRePass} />
                                            <span className={`invalid-feedback ${errorRePass === "" ? "d-none": ""}`} style={{ fontSize: 12 }}>{errorRePass}</span>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-12 input-mobile">
                                        <div className="mb-3">
                                            <label className="size-13px fw-bold">Nama Lengkap</label>
                                            <input type="text" value={name} className={ `form-control border-only-bottom ${ errorName === "" ? "" : "is-invalid" }` } onChange={validationName} />
                                            <span className={`invalid-feedback ${errorName === "" ? "d-none": ""}`} style={{ fontSize: 12 }}>{errorName}</span>
                                        </div>
                                        <div className="mb-3">
                                            <label className="size-13px fw-bold">Nama Perusahaan / Instansi</label>
                                            <input type="text" className={ `form-control border-only-bottom ${ errorNameCompany === "" ? "" : "is-invalid" }` } onChange={validationNameCompany} />
                                            <span className={`invalid-feedback ${errorNameCompany === "" ? "d-none": ""}`} style={{ fontSize: 12 }}>{errorNameCompany}</span>
                                        </div>
                                        <div className="mb-3">
                                            <label className="size-13px fw-bold">Nomor Equipment</label>
                                            <input type="number" onKeyDown={(e) => {
                                                    if(typeof e.key != 'undefined' && !e.key.match(/^\d+$/) && e.keyCode !== 8) {
                                                        e.preventDefault()
                                                        setErrorEQ('Nomor EQ harus berupa angka')
                                                        return
                                                    }

                                                    if(e.currentTarget.value.length > 5 && e.keyCode != 8) e.preventDefault()}
                                                } className={ `form-control custom-input-number border-only-bottom ${ errorEQ === "" ? "" : "is-invalid" }` } onChange={validationEquipment} />
                                            <span className={`invalid-feedback ${errorEQ === "" ? "d-none": ""}`} style={{ fontSize: 12 }}>{errorEQ}</span>
                                        </div>
                                        <div className="mb-2" style={{ position: 'relative' }}>
                                            <label className="size-13px fw-bold">Foto <span className="d-md-inline d-none">Sticker</span> Equipment</label>
                                            <input type="file" className={ `form-control border-only-bottom d-none` } id="inputFiles" onChange={ handleFileInput } accept="image/*" />
                                            <label htmlFor="inputFiles" className="form-control border-only-bottom d-none d-md-block inputFiles-display" style={{ minHeight: 33, whiteSpace: "nowrap", overflow: "hidden" }}></label>
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
                                        <div className="mb-5 d-md-none d-block">
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
                                    {/*<button type="button" className="btn btn-google shadow-sm fw-medium px-3 mx-lg-2 text-muted py-2 mb-3 d-lg-inline-block d-none">
                                        <img src="/images/google-icons.png" alt="google-icons" height="20" className="me-3" />
                                        Sign up with Google
                                    </button>*/}
                                    
                                    <div className="btn btn-google shadow-sm fw-medium px-3 mx-lg-2 text-muted py-2 mb-3 d-lg-inline-block">
                                    <div className={google ? "d-none": ""}>
                                    <GoogleLogin 
                                        onSuccess={credentialResponse => {
                                          googleLogin(credentialResponse);
                                        }}
                                        text="signup_with"
                                        onError={() => {
                                          console.log('Login Failed');
                                        }}
                                      
                                      />
                                      </div>
                                      </div>
                                    <button className="btn btn-login rounded-3 fw-medium mb-3 mx-auto mx-lg-2 d-sm-block d-lg-inline-block" type="submit" style={{fontSize:'14px', paddingLeft:'60px', paddingRight:'60px', paddingTop:'12px', paddingBottom:'12px'}} >SUBMIT</button>
                                    {/* <button type="button" className="btn btn-google shadow-sm fw-medium px-3 text-muted py-2 mb-3 mx-auto d-md-inline-block d-lg-none d-block">
                                        <img src="/images/google-icons.png" alt="google-icons" height="20" className="me-3" />
                                        Sign up with Google
                                    </button> */}
                                </div>
                            </div>
                        </div>
                    </form>
                    <LoadingAlert visible={loading} customClass="col-md-2 col-8" />
                    <ConfirmAlert visible={showPopup} titleMessage={alertOption.title} message={alertOption.message} onClick={handlePopup} customClass={alertOption.type === 'large' ?'col-md-5 col-10' : 'col-md-2 col-8'} />
                </div>
            <Footer />
        </div> 
    )

}




export default Register

