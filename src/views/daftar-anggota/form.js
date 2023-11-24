import React, { Component, useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import LoadingAlert from "../../component/alert/loadingAlert";
import ConfirmAlert from "../../component/alert/confirmAlert";
import { createNewMember, getDataMemberById, updateMember } from "../../services/API/mod_member";

function TambahAnggota() {
    const location = useLocation()
    const navigate = useNavigate()
    const params = useParams()
    const [showPopup, setShowPopup] = useState(false)
    const [alertOption, setAlertOption] = useState({title:'', message:'', redirect: false})
    const [loading, setLoading] = useState(false)
    const [password, setPassword] = useState('')
    const [errorPassword, setErrorPassword]= useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errorConfirmPassword, setErrorConfirmPassword] = useState('')
    const [typeInput, setTypeInput] = useState([
        'password',
        'password'
    ])
    const [iconClass, setIconClass] = useState([
        'fa-eye',
        'fa-eye'
    ])
    const [isFormValid, setIsFormValid] = useState(false)
    const [nama, setNama] = useState('')
    const [errorNama, setErrorNama] = useState('')
    const [email, setEmail] = useState('')
    const [errorEmail, setErrorEmail] = useState('')
    const [noTelp, setNoTelp] = useState('')
    const [errorNoTelp, setErrorNoTelp] = useState('')
    const [isFormDisabled, setIsFormDisabled] = useState(true)

    useEffect(() => {
        if(location.state?.id) {
            dataMemberById()
        }
    }, []);

    const handleNama = (e) => {
        const value = e.target.value
        if(value === "") {
            setNama(value)
            setErrorNama("Silahkan isi nama")
        } else {
            setNama(value)
            setErrorNama('')
        }
    }

    const emailText = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const handleEmail = (e) => {
        const value = e.target.value
        if(value === "") {
            setEmail(value)
            setErrorEmail("Silahkan isi email")
        } else if (!emailText.test(value)) {
            setEmail(value)
            setErrorEmail('Format email tidak valid')
        } else {
            setEmail(value)
            setErrorEmail('')
        }
    }

    // const handleDisabled = () => {
    //     console.log(location.state?.id);
    //     if(location.state?.id) {
    //         setIsFormDisabled(true)
    //         // document.getElementById('input-email')
    //     }
    // }
    
    const handleNoTelp = (e) => {
        if(typeof e.key != 'undefined' && !e.key.match(/^\d+$/) && e.keyCode !== 8 && e.keyCode !== 187 && e.keyCode !== 16 && e.keyCode !== 36 && e.keyCode !== 35 && e.keyCode !== 9) {
            e.preventDefault()
            setErrorNoTelp('Nomor telepon harus berupa angka')
            return
        } 

        const value = e.target.value
        if(value === "") {
            setNoTelp(value)
            setErrorNoTelp("Silahkan isi nomor telepon")
        } else  {
            setNoTelp(value)
            setErrorNoTelp('')
        }
    }

    const handlePassword = (e) => {
        const value = e.target.value
        if(value === "") {
            setPassword(value)
            setErrorPassword("Silahkan isi password")
        } else {
            setPassword(value)
            setErrorPassword('')
        }
    }

    const handleConfirmPassword = (e) => {
        const value = e.target.value
        if(value === "") {
            setConfirmPassword(value)
            setErrorConfirmPassword("Silahkan isi kembali password")
        } else {
            if(value !== password) {
                setConfirmPassword(value)
                setErrorConfirmPassword('Masukkan sesuai password baru')
            } else {
                setConfirmPassword(value)
                setErrorConfirmPassword('')
            }
        }
    }

    const handlePopup = () => {
        setShowPopup(false)
        if(alertOption.redirect) {
            navigate('/daftar_anggota')
        }
    }

    const dataMemberById = async () => {
        // console.log(location.state?.id)
        setLoading(true)
        const res = await getDataMemberById(location.state?.id)
        setLoading(false)
        if(res.status == 200) {
            // console.log(res.data)
            setNama(res.data.Table[0].namalengkap)
            setEmail(res.data.Table[0].emailaddress)
            setNoTelp(res.data.Table[0].telp)
            setPassword(res.data.Table[0].password)
            setConfirmPassword(res.data.Table[0].password)
        }
    }

    const submit = async (e) => {
        e.preventDefault()
        let isValid = true

        if(nama === "") {
            setErrorNama("Silahkan isi nama")
            isValid = false
        } else {
            setErrorNama('')
        }

        if(email === "" || !emailText.test(email)) {
            if(!emailText.test(email)) {
                setErrorEmail("Format email tidak valid")
            } else {
                setErrorEmail("Silahkan isi email")
            }
            isValid = false
        } else {
            setErrorEmail('')
        }

        if(noTelp === "") {
            setErrorNoTelp("Silahkan isi nomor telepon")
            isValid = false
        } else {
            setErrorNoTelp('')
        }

        if(password === "") {
            setErrorPassword("Silahkan isi password")
            isValid = false
        } else {
            setErrorPassword('')
        }

        if(confirmPassword === "") {
            setErrorConfirmPassword("Silahkan isi kembali password ")
            isValid = false
        } else {
            setErrorConfirmPassword('')
        }

        if(password !== confirmPassword) {
            setShowPopup(true)
            setAlertOption({title:'', message:'Silahkan isi ulang password sesuai password baru'})
            return
        }

        setIsFormValid(isValid)

        if(isValid) {
            var phone = noTelp
            if(phone.charAt(0) === '0') {
                phone = `+62${phone.substring(1)}`
            } else {
                if(phone !== '' && phone != '+') {
                    phone = `+${phone}`
                }
            }

            if(location.state?.id) {
                setLoading(true)
                const res = await updateMember(location.state?.id,{namalengkap: nama, email: email, telp: phone})
                setLoading(false)
                if(res.status == 200 && res.data.includes('Succes update nama & email')) {
                    setShowPopup(true)
                    setAlertOption({title: '', message: 'Berhasil memperbarui data anggota', redirect: true})
                } else {
                    setShowPopup(true)
                    setAlertOption({title: '', message: res.data, redirect: false})
                }
            } else {
                setLoading(true)
                const res = await createNewMember({namalengkap: nama, emailaddress: email, telp: phone, password: password})
                setLoading(false)
                if(res.status == 200 && res.data.includes('Success insert new register')) {
                    setShowPopup(true)
                    setAlertOption({title:'', message:'Berhasil tambah anggota', redirect: true})
                } else {
                    setShowPopup(true)
                    setAlertOption({title:'Error', message:res.data, redirect: false})
                }
            }

        } else {
            setShowPopup(true)
            setAlertOption({title: 'Error', message: 'please fill empty field', redirect: false})
        }
    }
    return (
        <>
            <div className="responsive-bar">
                <div className="d-flex mx-md-auto my-md-2 my-0 default-height">
                    <h4 className="title-icare title-fitur m-0 p-0 fw-bold" style={{fontSize:'18px'}}>
                        <Link className="nav-link d-inline me-3" to="/daftar_anggota">
                            <i className="fa fa-arrow-left color-arrow-left" style={{color:'#014C90'}}></i>
                        </Link>
                        <span className="title-bold" style={{borderBottom:'3px solid #014C90'}}>Tambah Anggota</span>
                    </h4>
                </div>
            </div>
            <div className="">
                <div className="card shadow border-0 responsive-form mt-lg-4 mt-md-4 mt-0" style={{borderRadius:'20px'}}>
                    <form onSubmit={submit}>
                        <div className="card-body px-lg-4 px-md-2 px-2 pt-0">
                            <div className="row">
                                    <div className="card-body">
                                        <div className="card-label font-size-12px-mobile">
                                            <label style={{fontWeight:'bold'}}>Nama</label>
                                        </div>
                                        <input type="text" className={`form-control border-only-bottom font-size-11px-mobile ${errorNama === "" ? "" : "invalid"}`} onChange={handleNama} value={nama} />
                                        <span className={`text-danger small ${errorNama === "" ? "d-none" : ""}`} style={{fontSize:'12px'}}>{errorNama}</span>
                                    </div>
                                    <div className="card-body">
                                        <div className="card-label font-size-12px-mobile">
                                            <label style={{fontWeight:'bold'}}>Email</label>
                                        </div>
                                        {location.state?.id ? (
                                            <input type="text" className={`form-control input-email border-only-bottom font-size-11px-mobile ${errorEmail === "" ? "" : "invalid"}`} id="input-email" onChange={handleEmail} value={email} disabled={isFormDisabled} />
                                        ): (
                                            <input type="text" className={`form-control input-email border-only-bottom font-size-11px-mobile ${errorEmail === "" ? "" : "invalid"}`} id="input-email" onChange={handleEmail} value={email}/>
                                        )}
                                        <span className={`text-danger small ${errorEmail === "" ? "d-none" : ""}`} style={{fontSize:'12px'}}>{errorEmail}</span>
                                    </div>
                                    <div className="card-body">
                                        <div className="card-label font-size-12px-mobile">
                                            <label style={{fontWeight:'bold'}}>No.Telp</label>
                                        </div>
                                        <input type="tel" onKeyDown={handleNoTelp} className={`form-control border-only-bottom font-size-11px-mobile ${errorNoTelp === "" ? "" : "invalid"}`} onChange={handleNoTelp} value={noTelp} />
                                        <span className={`text-danger small ${errorNoTelp === "" ? "d-none" : ""}`} style={{fontSize:'12px'}}>{errorNoTelp}</span>
                                    </div>
                                    {
                                        !location.state?.id && (
                                            <div className="p-0">
                                                <div className="card-body">
                                                    <div className="card-label font-size12px-mobile">
                                                        <label style={{fontWeight:'bold'}}>Password</label>
                                                    </div>
                                                    <div className="d-flex col-12">
                                                        <div className="col-lg-11 col-md-11 col-10 col-md-11">
                                                            <input type={typeInput[0]} className={`form-control border-only-bottom font-size-11px-mobile ${errorPassword === "" ? "" : "invalid"}`} onChange={handlePassword} value={password} />
                                                            <span className={`text-danger small ${errorPassword === "" ? "d-none" : ""}`} style={{fontSize:'12px'}}>{errorPassword}</span>
                                                        </div>
                                                        <div className="col-lg-1 col-md-1 col-2" style={{textAlign: 'center'}}>
                                                            <i className={`fa ${iconClass[0]} fa-lg`} style={{cursor: 'pointer'}} onClick={() => {
                                                                setTypeInput([
                                                                    typeInput[0] === 'password' ? 'text' : 'password',
                                                                    typeInput[1]
                                                                ])
                                                                setIconClass([
                                                                    typeInput[0] === 'password' ? 'fa-eye-slash' : 'fa-eye',
                                                                    iconClass[1]
                                                                ])
                                                            }}></i>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card-body">
                                                    <div className="card-label font-size-12px-mobile">
                                                        <label style={{fontWeight:'bold'}}>Confirm Password</label>
                                                    </div>
                                                    <div className="d-flex col-12">
                                                        <div className="col-lg-11 col-10 col-md-11">
                                                            <input type={typeInput[1]} className={`form-control border-only-bottom font-size-11px-mobile ${errorConfirmPassword === "" ? "" : "invalid"}`} onChange={handleConfirmPassword} value={confirmPassword} />
                                                            <span className={`text-danger small ${errorConfirmPassword === "" ? "d-none" : ""}`} style={{fontSize:'12px'}}>{errorConfirmPassword}</span>
                                                        </div>
                                                        <div className="col-md-1 col-lg-1 col-2" style={{textAlign: 'center'}}>
                                                            <i className={`fa ${iconClass[1]} fa-lg`} style={{cursor: 'pointer'}} onClick={() => {
                                                                setTypeInput([
                                                                    typeInput[0],
                                                                    typeInput[1] === 'password' ? 'text' : 'password'
                                                                ])
                                                                setIconClass([
                                                                    iconClass[0],
                                                                    typeInput[1] === 'password' ? 'fa-eye-slash' : 'fa-eye'
                                                                ])
                                                            }}></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                            </div>
                        </div>
                        <div className="col-md-12 mt-4 mb-4 text-center d-flex justify-content-center">
                            <button type="submit" className="btn btn-login py-2 px-5" style={{fontSize:'14px', maxWidth:'200px', height:'43px'}}>SIMPAN</button>
                        </div>
                    </form>
                    <ConfirmAlert visible={showPopup} titleMessage={alertOption.title} message={alertOption.message} customClass="col-md-3" onClick={handlePopup}/>
                    <LoadingAlert visible={loading} customClass="col-md-2 col-8"/>
                </div>
            </div>
        </>
    )
}

export default TambahAnggota