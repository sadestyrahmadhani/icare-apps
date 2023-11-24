import { Component, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ConfirmAlert from "../../component/alert/confirmAlert";
import LoadingAlert from "../../component/alert/loadingAlert";
import { acUploadRegister, upgradeAccountPremium } from "../../services/API/mod_upgradeAccount";

function UpgradeStep2() {
    const navigate = useNavigate()
    const params = useParams()
    const [loading, setLoading] = useState(false)
    const [showPopup, setShowPopup] = useState(false)
    const [idCard, setIdCard] = useState(0)
    const [selfiePhoto, setSelfiePhoto] = useState(0)
    const [dataIdCard, setDataIdCard] = useState(null)
    const [dataIdCardName, setDataIdCardName] = useState(null)
    const [dataSelfiePhoto, setDataSelfiePhoto] = useState(null)
    const [dataSelfiePhotoName, setDataSelfiePhotoName] = useState(null)
    const [alertOption, setAlertOption] = useState({title: '', message: ''})

    const handlePopup = () => {
        setShowPopup(false)
        setLoading(false)
    }

    const handleFileInputIdCard = (e) => {
        setIdCard(e.target.files.length)
        setDataIdCard(e.target.files[0])
        setDataIdCardName(e.target.files[0].name)
        // console.log('KTP',e.target.files[0].name)
        document.querySelectorAll('.inputFiles-displayIdCard').forEach((val, key) => {
            if(e.target.files.length > 0) {
                val.innerHTML = `
                    <div class="d-flex align-items-center">
                        <div class="w-100 font-size-12px-mobile">${ e.target.files[0].name }</div>
                        <i class="fa fa-check text-success d-block d-md-none"></i>
                    </div>
                `
            } else {
                val.innerHTML = ""
            }
        })
    }

    const handleFileInputSelfiePhoto = (e) => {
        setSelfiePhoto(e.target.files.length)
        setDataSelfiePhoto(e.target.files[0])
        setDataSelfiePhotoName(e.target.files[0].name)
        document.querySelectorAll('.inputFiles-displaySelfiePhoto').forEach((val, key) => {
            if(e.target.files.length > 0) {
                val.innerHTML = `
                    <div class="d-flex align-items-center">
                        <div class="w-100 font-size-12px-mobile">${ e.target.files[0].name }</div>
                        <i class="fa fa-check text-success d-block d-md-none"></i>
                    </div>
                `
            } else {
                val.innerHTML = ""
            }
        })
    }

    const removeFileInputIdCard = (e) => {
        e.preventDefault()
        setIdCard(0)
        document.querySelector('#inputFiles').value = ""
        document.querySelectorAll('.inputFiles-displayIdCard').forEach((val, key) => {
            val.innerHTML = ``
        })
    }

    const removeFileInputSelfiePhoto = (e) => {
        e.preventDefault()
        setSelfiePhoto(0)
        document.querySelector('#inputFilesSelfie').value = ""
        document.querySelectorAll('.inputFiles-displaySelfiePhoto').forEach((val, key) => {
            val.innerHTML = ``
        })
    }

    async function submit(e) {
        e.preventDefault()
        if(idCard > 0 && selfiePhoto > 0) {
            var bodyFormData = new FormData()
            bodyFormData.append('file', dataIdCard)
            
            const res = await acUploadRegister(bodyFormData)
            if(res.status == 200 && res.data.includes('Succes upload')) {
                var bodyFormData = new FormData()
                bodyFormData.append('file', dataSelfiePhoto)

                const res = await acUploadRegister(bodyFormData)
                if(res.status == 200 && res.data.includes('Succes upload')) {
                    setLoading(true)
                    const res = await upgradeAccountPremium({fotoktp: dataIdCardName, fotoselfie: dataSelfiePhotoName})
                    setLoading(false)
                    if(res.status == 200 && res.data.includes('Succes update premium user id')) {
                        // setShowPopup(true)
                        navigate('/upgrade_step3')
                    } else {
                        setShowPopup(true)
                        setAlertOption({title: 'Error', message: res.data})    
                    }
                } else {
                    setShowPopup(true)
                    setAlertOption({title: 'Error', message: res.data})
                }
            } else {
                setShowPopup(true)
                setAlertOption({title: 'Error', message: res.data})
            }
        } else {
            setShowPopup(true)
            setAlertOption({title: 'Error', message: 'Mohon upload foto ktp dan selfie ktp anda'})
        }
    }

    return (
        <>
            <div className="responsive-bar">
                <div className="card-title mx-auto my-md-3 my-0" style={{borderBottom: '3px solid #014C90', width: '164px'}}>
                    <h4 className="title-icare title-fitur m-0 p-0" style={{fontWeight: 'bold',
                        fontSize: '18px'}}>
                        <Link to="/upgrade_step1" className="nav-link d-md-none d-inline me-3">
                            <i className="fa fa-arrow-left"></i>
                        </Link>
                        <span className="title-bold">Upgrade Akun iCare</span>
                    </h4>
                </div>
            </div>
            <div className="">
                <form className="col-md-7 col-sm-5 col-12 mx-auto" onSubmit={submit}>
                    <div className="card mb-lg-4 mb-md-4 responsive-upgrade-step2 border border-dark" style={{borderRadius: '20px'}}>
                        <div className="card-body p-lg-5 p-md-5">
                            <div className="row">
                                <div className="card-label py-2 border border-dark" style={{backgroundColor: '#014C90'}}>
                                    <label className="fw-medium font-size-12px-mobile" style={{fontSize: '14px', color: '#fff'}}>Foto KTP</label>
                                </div>
                            </div>
                            <div className="row border border-top-0 border-dark" style={{paddingTop: '5px', paddingBottom: '5px'}}>
                                <div className="col-lg-3 col-md-3 col-4 text-center my-auto">
                                    <img src="/images/contoh_ktp.png" alt="" style={{width: '100px'}} className=""/>
                                </div>
                                <div className="col-lg-9 col-md-9 col-8" style={{fontSize: '14px', paddingTop: '10px'}}>
                                    <span className="font-size-12px-mobile">Panduan Foto KTP</span>
                                    <p className="mt-1 lh-sm font-size-11px-mobile">Pastikan seluruh bagian KTP kamu berada dalam bingkai foto dan bukan fotokopi KTP</p>
                                </div>
                            </div>
                            <label className="font-size-12px-mobile" style={{fontSize: '14px', marginTop: '10px'}}>(Maks. 5 MB, Format JPG/PNG)</label>
                            <div className="mt-2 mb-3">
                                <div className="row">
                                    <div className="col-4 d-none d-md-block">
                                        <label className="mb-1 btn btn-login btn-photo font-size-12px-mobile" htmlFor="inputFiles" style={{padding: '10px 40px'}}>Foto KTP</label>
                                        <input type="file" className="form-control border-0 d-none" id="inputFiles" onChange={handleFileInputIdCard} accept="image/*" />
                                    </div>

                                    <div className="col-5 d-block d-md-none">
                                        <label className={`mb-1 btn btn-login btn-photo font-size-12px-mobile ${ idCard > 0 ? 'd-none' : '' }`} htmlFor="inputFiles" style={{padding: '10px 40px'}}>Foto KTP</label>
                                        <input type="file" className="form-control border-0 d-none font-size-12px-mobile" id="inputFiles" onChange={handleFileInputIdCard} accept="image/*" />
                                        <button onClick={ removeFileInputIdCard } className={`btn btn-outline-danger btn-sm text-primary rounded-3 btn-photo font-size-12px-mobile ${ idCard > 0 ? '' : 'd-none' }`}>Hapus Foto KTP</button>
                                    </div>
                                    <div className="col-7 my-auto" style={{paddingLeft: '0px'}}>
                                        <label htmlFor="inputFiles" className="form-control border-0 d-md-block inputFiles-displayIdCard px-0" style={{ minHeight: 33 }}></label>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="row">
                                <div className="card-label py-2 border border-dark" style={{backgroundColor: '#014C90'}}>
                                    <label className="fw-medium font-size-12px-mobile" style={{fontSize: '14px', color: '#fff'}}>Selfie dengan KTP</label>
                                </div>
                            </div>
                            <div className="row border border-top-0 border-dark" style={{paddingTop: '5px', paddingBottom: '5px'}}>
                                <div className="col-lg-3 col-md-3 col-4 text-center my-auto">
                                    <img src="/images/selfie_ktp.png" alt="" style={{width: '50px'}} className=""/>
                                </div>
                                <div className="col-lg-9 col-md-9 col-8" style={{fontSize: '14px', paddingTop: '10px'}}>
                                    <span className="font-size-12px-mobile">Panduan Selfie KTP</span>
                                    <p className="mt-1 lh-sm font-size-11px-mobile">Pastikan seluruh bagian muka dan KTP kamu berada dalam bingkai foto dan bukan editan</p>
                                </div>
                            </div>
                            <label className="font-size-12px-mobile" style={{fontSize: '14px', marginTop: '10px'}}>(Maks. 5 MB, Format JPG/PNG)</label>
                            <div className="mt-2 mb-3">
                                <div className="row">
                                    <div className="col-5 d-none d-md-block">
                                        <label className="btn-selfie mb-1 btn btn-login font-size-12px-mobile" htmlFor="inputFilesSelfie" style={{padding: '10px 40px'}}>Foto Selfie KTP</label>
                                        <input type="file" className="form-control border-0 d-none" id="inputFilesSelfie" onChange={handleFileInputSelfiePhoto} accept="image/*" />
                                    </div>
                                    
                                    <div className="col-5 d-block d-md-none">
                                        <label className={`btn-selfie mb-1 btn btn-login font-size-12px-mobile ${ selfiePhoto > 0 ? 'd-none' : '' }`} htmlFor="inputFilesSelfie" style={{padding: '10px 40px'}}>Foto Selfie KTP</label>
                                        <input type="file" className="form-control border-0 d-none" id="inputFilesSelfie" onChange={handleFileInputSelfiePhoto} accept="image/*" />
                                        <button className={`btn btn-outline-danger btn-sm text-primary rounded-3 btn-selfie font-size-12px-mobile ${ selfiePhoto > 0 ? '' : 'd-none' }`} onClick={removeFileInputSelfiePhoto}>Hapus Foto Selfie KTP</button>
                                    </div>
                                    <div className="col-7 my-auto" style={{paddingLeft: '0px'}}>
                                        <label htmlFor="inputFilesSelfie" className="form-control border-0 d-md-block inputFiles-displaySelfiePhoto"></label>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center">
                                <span className="text-danger fw-bold font-size-12px-mobile">Unggah file foto KTP sesuai dengan ketentuan</span>
                                <hr className="d-lg-none d-md-none d-block" color="black"/>
                            </div>
                        </div>  
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-login font-size-12px-mobile" style={{padding: '15px 50px 15px 50px '}}>SUBMIT</button>
                    </div>
                </form>
                <LoadingAlert visible={loading} customClass="col-md-2 col-8" />
                <ConfirmAlert visible={showPopup} titleMessage={alertOption.title} message={alertOption.message} onClick={handlePopup} customClass="col-md-4 col-sm-6 col-9" />
            </div>
        </>
    )
}

export default UpgradeStep2

// export default class extends Component {
//     constructor(props){
//         super(props)
        
//         this.handlePopup = this.handlePopup.bind(this)
//         this.submit = this.submit.bind(this)
//         this.handleFileInputIdCard = this.handleFileInputIdCard.bind(this)
//         this.handleFileInputSelfiePhoto = this.handleFileInputSelfiePhoto.bind(this)
//         this.state = {
//             showPopup: false,
//             countFileInput: 0,
//             idPhoto: '',
//             selfiePhoto: '',
//             errorIdPhoto: '',
//             errorSelfiePhoto: '',

//             alertOption: {
//                 title: '',
//                 message: ''
//             }
//         }
//     }

//     handlePopup(){
//         this.setState({showPopup: false})
//     }

//     submit(e){
//         e.preventDefault()
//         if(this.state.countFileInput > 0){
//             if(this.state.idPhoto !== "" || this.state.selfiePhoto !== "") {
//                 this.props.router.navigate("/upgrade_step3")
//             } else {
//                 this.setState({showPopup: true, alertOption: {title: 'Error', message: 'Mohon upload foto ktp dan selfie ktp anda'}})
//             }
//         } else {
//             this.setState({showPopup: true, alertOption: {title: 'Error', message: 'Mohon upload foto ktp dan foto selfie ktp anda'}})
//         }
//     }

//     render(){
//         return(
//             <>
//             <div className="py-lg-0 py-md-0 py-5">
//                 <div className="responsive-bar">
//                     <div className="card-title mx-auto my-md-3 my-0" style={{borderBottom: '3px solid #014C90', width: '164px'}}>
//                         <h4 className="title-icare title-fitur m-0 p-0" style={{fontWeight: 'bold',
//                             fontSize: '18px'}}>
//                             <Link to="/upgrade_step1" className="nav-link d-md-none d-inline me-3">
//                                 <i className="fa fa-arrow-left"></i>
//                             </Link>
//                             Upgrade Akun iCare
//                         </h4>
//                     </div>
//                 </div>
//                         <form className="col-md-7 col-sm-5 col-12 mx-auto" onSubmit={this.submit}>
//                             <div className="card mb-4 responsive-upgrade-step2 border border-dark" style={{borderRadius: '20px'}}>
//                                 <div className="card-body p-5">
//                                     <div className="row">
//                                         <div className="card-label py-2 border border-dark" style={{backgroundColor: '#014C90'}}>
//                                             <label className="fw-medium" style={{fontSize: '14px', color: '#fff'}}>Foto KTP</label>
//                                         </div>
//                                     </div>
//                                     <div className="row border border-top-0 border-dark" style={{paddingTop: '5px', paddingBottom: '5px'}}>
//                                         <div className="col-lg-3 col-md-3 col-4 text-center my-auto">
//                                             <img src="/images/contoh_ktp.png" alt="" style={{width: '100px'}} className=""/>
//                                         </div>
//                                         <div className="col-lg-9 col-md-9 col-8" style={{fontSize: '14px', paddingTop: '10px'}}>
//                                             <span>Panduan Foto KTP</span>
//                                             <p className="mt-1 lh-sm">Pastikan seluruh bagian KTP kamu berada dalam bingkai foto dan bukan fotokopi KTP</p>
//                                         </div>
//                                     </div>
//                                     <label style={{fontSize: '14px', marginTop: '10px'}}>(Maks. 5 MB, Format JPG/PNG)</label>
//                                     <div className="mt-2 mb-3">
//                                         <div className="row">
//                                             <div className="col-4">
//                                                 <label className="mb-1 btn btn-login btn-photo" htmlFor="inputFiles" style={{padding: '10px 40px'}}>Foto KTP</label>
//                                                 <input type="file" className="form-control border-0 d-none" id="inputFiles" onChange={this.handleFileInputIdCard} accept="image/*" />
//                                             </div>
//                                             <div className="col-8 my-auto" style={{paddingLeft: '0px'}}>
//                                                 <label htmlFor="inputFiles" className="form-control border-0 d-md-block inputFiles-displayIdCard" style={{ minHeight: 33 }}></label>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     <div className="row">
//                                         <div className="card-label py-2 border border-dark" style={{backgroundColor: '#014C90'}}>
//                                             <label className="fw-medium" style={{fontSize: '14px', color: '#fff'}}>Selfie dengan KTP</label>
//                                         </div>
//                                     </div>
//                                     <div className="row border border-top-0 border-dark" style={{paddingTop: '5px', paddingBottom: '5px'}}>
//                                         <div className="col-lg-3 col-md-3 col-4 text-center my-auto">
//                                             <img src="/images/selfie_ktp.png" alt="" style={{width: '50px'}} className=""/>
//                                         </div>
//                                         <div className="col-lg-9 col-md-9 col-8" style={{fontSize: '14px', paddingTop: '10px'}}>
//                                             <span>Panduan Selfie KTP</span>
//                                             <p className="mt-1 lh-sm">Pastikan seluruh bagian muka dan KTP kamu berada dalam bingkai foto dan bukan editan</p>
//                                         </div>
//                                     </div>
//                                     <label style={{fontSize: '14px', marginTop: '10px'}}>(Maks. 5 MB, Format JPG/PNG)</label>
//                                     <div className="mt-2 mb-3">
//                                         <div className="row">
//                                             <div className="col-5">
//                                                 <label className="btn-selfie mb-1 btn btn-login" htmlFor="inputFilesSelfie" style={{padding: '10px 40px'}}>Selfie dengan KTP</label>
//                                                 <input type="file" className="form-control border-0 d-none" id="inputFilesSelfie" onChange={this.handleFileInputSelfiePhoto} accept="image/*" />
//                                             </div>
//                                             <div className="col-7 my-auto" style={{paddingLeft: '0px'}}>
//                                                 <label htmlFor="inputFilesSelfie" className="form-control border-0 d-md-block inputFiles-displaySelfiePhoto"></label>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="text-center">
//                                         <span className="text-danger fw-bold">Unggah file foto KTP sesuai dengan ketentuan</span>
//                                     </div>
//                                 </div>  
//                             </div>
//                             <div className="text-center">
//                                 <button type="submit" className="btn btn-login" style={{padding: '15px 50px 15px 50px '}}>SUBMIT</button>
//                                 {/* <Link className="btn btn-login" style={{padding: '15px 50px 15px 50px', borderRadius: '15px'}} to="/upgrade_step3">SUBMIT</Link> */}
//                             </div>
//                         </form>
//                         <ConfirmAlert visible={this.state.showPopup} message={this.state.alertOption.message} onClick={this.handlePopup} customClass="col-md-4 col-sm-6 col-9" />
//                 </div>
//             </>
//         )
//     }

//     handleFileInputIdCard(e) {
//         this.setState({idPhoto: e.target.files.length})
//         document.querySelectorAll('.inputFiles-displayIdCard').forEach((val, key) => {
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

//     handleFileInputSelfiePhoto(e) {
//         this.setState({countFileInput: e.target.files.length})
//         document.querySelectorAll('.inputFiles-displaySelfiePhoto').forEach((val, key) => {
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