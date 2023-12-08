import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../component/navbar";
import Footer from "../../component/footer";
import ConfirmAlert from "../../component/alert/confirmAlert";
import LoadingAlert from "../../component/alert/loadingAlert";
import { resetPassword } from "../../services/API/mod_updatePassword";

function UpdatePassword() { 
    const navigate = useNavigate()

    const location = useLocation()

    const [ showPopup, setShowPopup ] = useState(false)
    const [ newPassword, setNewPassword ] = useState('')
    const [ repeatPassword, setRepeatPassword ] = useState('')
    const [ errorNewPassword, setErrorNewPassword ] = useState('')
    const [ errorRepeatPassword, setErrorRepeatPassword ] = useState('')
    const [ loading, setLoading ] = useState(false)
    const [ alertOption, setAlertOption ] = useState({
        title: '',
        message: '',
        redirect: false,
        url: ''
    })
    const [ typeInput, setTypeInput ] = useState([
        'password',
        'password'
    ])
    const [ iconClass, setIconClass ] = useState([
        'fa-eye',
        'fa-eye'
    ])

     const handlePopup = () => {
         if(alertOption.redirect) {
            setShowPopup(false)
            setLoading(true)
            navigate(alertOption.url)
         } else {
            setShowPopup(false)
         }
     }

     const submit = async (e) => {
         e.preventDefault()
         if(newPassword === "") setErrorNewPassword('Silahkan isi kata sandi baru')
         if(repeatPassword === "") setErrorRepeatPassword('Silahkan ulangi isi kata sandi') 
         if(newPassword !== repeatPassword) {
            setShowPopup(true)
            setAlertOption({title: '', message: 'Inputkan konfirmasi password sesuai password baru', redirect: false})
            return
         }
         if(newPassword !== "" && repeatPassword !== ""){
            setLoading(true)
            const res = await resetPassword({userid: location.state.userid, otp: location.state.otp, newpassword: newPassword})
            setLoading(false)
            if(res.status == 200 && res.data !== null) {
                setShowPopup(true)
                setAlertOption({title: '', message: "Sukses ubah password", redirect: true, url: '/'})
            } else {
                setShowPopup(true)
                setAlertOption({title: 'Error', message: 'Opps! terjadi kesalahan', redirect: true, url: '/'})
            }
         } else {
             setShowPopup(true)
             setAlertOption({title: '', message: 'Opps! terjadi kesalahan', redirect: false, url: ''})
         }
     }
    
     const validationNewPassword = (e) => {
         e.preventDefault()
         setNewPassword(e.target.value)
         if(e.target.value === ""){
             setErrorNewPassword('Silahkan isi kata sandi baru')
         } else {
             setErrorNewPassword('')
         }
     }

     const validationRepeatPassword = (e) => {
         e.preventDefault()
         setRepeatPassword(e.target.value)
         if(e.target.value === ""){
             setErrorRepeatPassword('Silahkan isi ulang kata sandi baru')
         } else {
             if(e.target.value !== newPassword){
                 setErrorRepeatPassword('Masukkan sesuai kata sandi baru')
             } else {
                 setErrorRepeatPassword('')
             }
         }
     }

    return (
        <div class="intro-y bg-light">
            <Navbar versi={ 2 } />
            <div className="responsive-bar d-md-block d-none">
                <div className="card-title mx-md-auto my-md-3 my-0" style={{borderBottom: '3px solid #014C90', width: '134px'}}>
                    <h4 className="title-icare title-fitur m-0 p-0 fw-bold" style={{fontSize: '18px'}}>
                        {/* <Link to="/settings" className="nav-link d-md-none d-inline me-3">
                            <i className="fa fa-arrow-left"></i>
                        </Link> */}
                        <span className="title-bold">Ubah Kata Sandi</span>
                    </h4>
                </div>
            </div>

            <div className="col-md-6 col-12 mx-auto responsive-ubah-pass">
                <div className="card mb-md-5 mb-0 px-5 px-md-4" style={{border:'1px solid #ababab'}}>
                    <div className="card-body p-lg-5 p-0 input-mobile center-edit-pass">
                        <form onSubmit={submit} className="custom-width">
                            <div className="mb-4">
                                <label className="fw-medium form-control border border-dark size-13px d-md-block d-none" style={{backgroundColor: '#014C90', borderRadius: '0px', color:'white'}}>Masukkan Kata Sandi Baru</label>
                                <label className="label-update d-md-none d-block">New Password</label>
                                <div className="border border-dark">
                                    <div className="d-flex">
                                        <div className="col-11 d-md-block d-none">
                                            <input type={ typeInput[0] } className={`form-control border-0 ${errorNewPassword === "" ? "" : "is-invalid"}`} style={{boxShadow: 'none', textDecoration: 'none'}} onChange={validationNewPassword}/>
                                        </div>
                                        <div className="col-11 d-md-none d-block">
                                            <input type={ typeInput[0] } className={`form-control border-0 ${errorNewPassword === "" ? "" : "is-invalid"}`} style={{boxShadow: 'none', textDecoration: 'none', height:'48px'}} onChange={validationNewPassword}/>
                                        </div>
                                        <div className="col-1 my-auto text-center" style={{paddingLeft: 0}}>
                                            <i 
                                                className={ `fa ${ iconClass[0] } fa-lg` } 
                                                onClick={ 
                                                    () => { 
                                                        setTypeInput([
                                                            typeInput[0] === 'password' ? 'text' : 'password',
                                                            typeInput[1],
                                                        ])
                                                        setIconClass([
                                                            typeInput[0] === 'password' ? 'fa-eye-slash' : 'fa-eye',
                                                            iconClass[1],
                                                        ])
                                                    }
                                                }
                                            ></i>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="text-danger-update-pass col-12">
                                            <span className={`text-danger small mx-2 ${errorNewPassword === "" ? "d-none" : ""}`} style={{fontSize: 12}}>{errorNewPassword}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-5">
                                <label className="fw-medium form-control border border-dark size-13px d-md-block d-none" style={{backgroundColor: '#014C90', borderRadius: '0px', color:'white'}}>Ulangi Kata Sandi Baru</label>
                                <label className="label-update d-md-none d-block">Confirm Password</label>
                                <div className="border border-dark">
                                    <div className="d-flex">
                                        <div className="col-11 d-md-block d-none">
                                            <input type={ typeInput[1] } className={`form-control border-0 input-ubahh-pass ${errorRepeatPassword === "" ? "" : "is-invalid"}`} style={{boxShadow: 'none', textDecoration: 'none'}} onChange={validationRepeatPassword}/>
                                        </div>
                                        <div className="col-11 d-md-none d-block">
                                            <input type={ typeInput[1] } className={`form-control border-0 input-ubahh-pass ${errorRepeatPassword === "" ? "" : "is-invalid"}`} style={{boxShadow: 'none', textDecoration: 'none', height:'48px'}} onChange={validationRepeatPassword}/>
                                        </div>
                                        <div className="col-1 my-auto text-center" style={{paddingLeft: 0}}>
                                            <i 
                                                className={ `fa ${iconClass[1] } fa-lg` } 
                                                onClick={ () => {
                                                    setTypeInput([
                                                        typeInput[0],
                                                        typeInput[1] === 'password' ? 'text' : 'password',
                                                    ])
                                                    setIconClass([
                                                        iconClass[0],
                                                        typeInput[1] === 'password' ? 'fa-eye-slash' : 'fa-eye',
                                                    ])
                                                } }
                                            ></i>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="text-danger-update-pass col-12">
                                            <span className={`text-danger small mx-2 ${errorRepeatPassword === "" ? "d-none" : ""}`} style={{fontSize: 12}}>{errorRepeatPassword}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center">
                                <button className="btn btn-ubah-pass btn-login px-5 py-2 fw-medium" type="submit">Submit</button>
                            </div>
                        </form>
                        <ConfirmAlert visible={showPopup} message={alertOption.message} onClick={handlePopup} customClass="col-md-3 col-sm-6 col-9" />
                        <LoadingAlert visible={loading} customClass="col-md-2 col-8" />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )

    // const [ showPopup, setShowPopup ] = useState()
    // const [ newPassword, setNewPassword ] = useState()
    // const [ repeatPassword, setRepeatPassword ] = useState()
    // const [ errorNewPassword, setErrorNewPassword ] = useState()
    // const [ errorRepeatPassword, setErrorRepeatPassword ] = useState()
    // const [ loading, setLoading ] = useState(false)
    // const [ alertOption, setAlertOption ] = useState({
    //     title:'',
    //     message:'',
    //     redirect:false,
    //     url:''
    // })
    // const [ typeInput, setTypeInput ] = useState([
    //     'password',
    //     'password',
    //     'password'
    // ])
    // const [ iconClass, setIconClass ] = useState([
    //     'fa-eye',
    //     'fa-eye',
    //     'fa-eye',
    // ])


    // const handlePopup = () => {
    //     if(alertOption.redirect) {
    //         setShowPopup(false)
    //         setLoading(true)
    //         navigate(alertOption.url)
    //     } else {
    //         setShowPopup(false)
    //     }
    // }

    // async function submit(e){
    //     e.preventDefault()
    //     if(newPassword === "") setErrorNewPassword('Silahkan isi kata sandi baru')
    //     if(repeatPassword === "") setErrorRepeatPassword('Silahkan ulangi isi kata sandi') 
    //     if(newPassword !== "" && repeatPassword !== ""){
    //         // const res = await updatePasswordById({userid: localStorage.getItem('id'), newPassword: newPassword})
    //         // if(res.status == 200 && res.data !== null) {
    //                 setShowPopup(true)
    //                 setAlertOption({title: '', message: 'res.data', redirect: true, url: '/'})
    //         // }
    //     } else {
    //         setShowPopup(true)
    //         setAlertOption({title: '', message: 'Harap isi seluruh data', redirect: false, url: ''})
    //     }
    // }
    
    // const validationNewPassword = (e) => {
    //     e.preventDefault()
    //     setNewPassword(e.target.value)
    //     if(e.target.value === ""){
    //         setErrorNewPassword('Silahkan isi kata sandi baru')
    //     } else {
    //         setErrorNewPassword('')
    //     }
    // }

    // const validationRepeatPassword = (e) => {
    //     e.preventDefault()
    //     setRepeatPassword(e.target.value)
    //     if(e.target.value === ""){
    //         setErrorRepeatPassword('Silahkan isi ulang kata sandi baru')
    //     } else {
    //         if(e.target.value !== newPassword){
    //             setErrorRepeatPassword('Masukkan sesuai kata sandi baru')
    //         } else {
    //             setErrorRepeatPassword('')
    //         }
    //     }
    // }

    // return(    
    //     <div className="bg-light"> 
    //         <Navbar versi="2" />
    //             <div className="responsive-bar">
    //                 <div className="card-title mx-md-auto my-md-3 my-0" style={{borderBottom: '3px solid #014C90', width: '134px'}}>
    //                     <h4 className="title-icare title-fitur m-0 p-0 fw-bold" style={{fontSize: '18px'}}>
    //                         <Link to="/settings" className="nav-link d-md-none d-inline me-3">
    //                             <i className="fa fa-arrow-left"></i>
    //                         </Link>
    //                         Ubah Kata Sandi
    //                     </h4>
    //                 </div>
    //             </div>
    //             <div className="col-md-7 col-12 mx-auto responsive-ubah-pass">
    //                 <div className="card mb-5 px-2 px-md-4">
    //                     <div className="card-body p-lg-5 px-0 input-mobile">
    //                         <form onSubmit={submit}>
    //                             <div className="mb-3">
    //                                 <label className="fw-medium form-control border border-dark size-13px" style={{backgroundColor: '#014C90', borderRadius: '0px', color:'white'}}>Masukkan Kata Sandi Baru</label>
    //                                 <div className="border border-dark">
    //                                     <div className="d-flex">
    //                                         <div className="col-11">
    //                                             <input type={ typeInput[1] } className={`form-control border-0 ${errorNewPassword === "" ? "" : "is-invalid"}`} style={{boxShadow: 'none', textDecoration: 'none'}} onChange={validationNewPassword}/>
    //                                         </div>
    //                                         <div className="col-1 my-auto text-center" style={{paddingLeft: 0}}>
    //                                             <i 
    //                                                 className={ `fa ${ iconClass[1] } fa-lg` } 
    //                                                 onClick={ 
    //                                                     () => { 
    //                                                         setTypeInput([
    //                                                             typeInput[0],
    //                                                             typeInput[1] == 'password' ? 'text' : 'password',
    //                                                             typeInput[2],
    //                                                         ])
    //                                                         setIconClass([
    //                                                             iconClass[0],
    //                                                             typeInput[1] == 'password' ? 'fa-eye-slash' : 'fa-eye',
    //                                                             iconClass[2]
    //                                                         ])
    //                                                     }
    //                                                  }
    //                                             ></i>
    //                                         </div>
    //                                     </div>
    //                                     <div className="row">
    //                                         <div className="col-12">
    //                                             <span className={`text-danger small mx-2 ${errorNewPassword === "" ? "d-none" : ""}`} style={{fontSize: 12}}>{errorNewPassword}</span>
    //                                         </div>
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                             <div className="mb-4">
    //                                 <label className="fw-medium form-control border border-dark size-13px" style={{backgroundColor: '#014C90', borderRadius: '0px', color:'white'}}>Ulangi Kata Sandi Baru</label>
    //                                 <div className="border border-dark">
    //                                     <div className="d-flex">
    //                                         <div className="col-11">
    //                                             <input type={ typeInput[2] } className={`form-control border-0 ${errorRepeatPassword === "" ? "" : "is-invalid"}`} style={{boxShadow: 'none', textDecoration: 'none'}} onChange={validationRepeatPassword} />
    //                                         </div>
    //                                         <div className="col-1 my-auto text-center" style={{paddingLeft: 0}}>
    //                                             <i 
    //                                                 className={ `fa ${ iconClass[2] } fa-lg` } 
    //                                                 onClick={ 
    //                                                     () => { 
    //                                                         setTypeInput([
    //                                                             typeInput[0],
    //                                                             typeInput[1],
    //                                                             typeInput[2] == 'password' ? 'text' : 'password',
    //                                                         ])
    //                                                         setIconClass([
    //                                                             iconClass[0],
    //                                                             typeInput[1],
    //                                                             iconClass[2] == 'password' ? 'fa-eye-slash' : 'fa-eye',
    //                                                         ])
    //                                                     }
    //                                                  }
    //                                             ></i>
    //                                         </div>
    //                                     </div>
    //                                     <div className="row">
    //                                         <div className="col-12">
    //                                             <span className={`text-danger small mx-2 ${errorRepeatPassword === "" ? "d-none" : ""}`} style={{fontSize: '12px'}}> {errorRepeatPassword} </span>
    //                                         </div>
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                             <div className="text-center">
    //                                 <button className="btn btn-login px-5 py-2 fw-medium" type="submit">Submit</button>
    //                             </div>
    //                         </form>
    //                         <ConfirmAlert visible={showPopup} message={alertOption.message} onClick={handlePopup} customClass="col-md-3 col-sm-6 col-9" />
    //                         <LoadingAlert visible={loading} customClass="col-md-2 col-9" />
    //                     </div>
    //                 </div>
    //             </div>
    //         <Footer />
    //     </div>    
    // )
}

export default UpdatePassword

// export default class extends Component {
//     constructor(props) {
//         super(props)

//         this.submit = this.submit.bind(this)
//         this.handlePopup = this.handlePopup.bind(this)
//         this.validationOldPassword = this.validationOldPassword.bind(this)
//         this.validationNewPassword = this.validationNewPassword.bind(this)
//         this.validationRepeatPassword = this.validationRepeatPassword.bind(this)
//         this.state = {
//             showPopup: false,
//             countFileInput: 0,
//             oldPassword: '',
//             newPassword: '',
//             repeatPassword: '',
//             errorOldPassword: '',
//             errorNewPassword: '',
//             errorRepeatPassword: '',
//             alertOption: {
//                 title: '',
//                 message: '',
//                 redirect: false,
//                 url: '',
//             },
//             typeInput: [
//                 'password',
//                 'password',
//                 'password',
//             ],
//             iconClass: [
//                 'fa-eye',
//                 'fa-eye',
//                 'fa-eye',
//             ],
//             loading: false,
//         }
//     }

//     handlePopup(){
//         if(this.state.alertOption.redirect) {
//             this.setState({showPopup:false, loading: true})
//             this.props.router.navigate(this.state.alertOption.url)
//         } else {
//             this.setState({showPopup: false})
//         }
//     }

//     async submit(e){
//         e.preventDefault()
//         if(this.state.newPassword === "") this.setState({errorNewPassword: "Silahkan isi kata sandi baru"})
//         if(this.state.repeatPassword === "") this.setState({errorRepeatPassword: "Silahkan ulangi isi kata sandi"})
//         if(this.state.oldPassword === "") this.setState({errorOldPassword: "Silahkan isi kata sandi lama"})
//         if(this.state.oldPassword === this.state.newPassword && this.state.oldPassword  !== "" && this.state.newPassword !== "" && this.state.repeatPassword) {
//             this.setState({showPopup: true, alertOption: {title: '', message: 'Password baru sama dengan password lama', redirect: false, url: ''}})
//             return
//         }
//         if(this.state.oldPassword !== "" && this.state.newPassword !== "" && this.state.repeatPassword !== ""){
//             const res = await updatePasswordById({userid: localStorage.getItem('id'), oldPassword: this.state.oldPassword, newPassword: this.state.newPassword})
//             if(res.status == 200 && res.data !== null) {
//                 if(res.data === "Old password not match") {
//                     this.setState({showPopup: true, alertOption: {title: '', message: res.data, redirect: false, url: ''}})
//                 } else {
//                     this.setState({showPopup: true, alertOption: {title: '', message: res.data, redirect: true, url: '/dashboard'}})
//                 }
//                 // console.log(res.data)
//             }
//         } else {
//             this.setState({showPopup: true, alertOption: {title: 'Error', message: 'Harap isi seluruh data', redirect: false, url: ''}})
//         }
//     }
    
//     validationNewPassword(e) {
//         e.preventDefault()
//         this.setState({newPassword: e.target.value})
//         if(e.target.value === ""){
//             this.setState({errorNewPassword: "Silahkan isi kata sandi baru"})
//         } else {
//             this.setState({errorNewPassword: ""})
//         }
//     }

//     validationOldPassword(e) {
//         e.preventDefault()
//         this.setState({oldPassword: e.target.value})
//         if(e.target.value === ""){
//             this.setState({errorOldPassword: "Silahkan isi kata sandi lama"})
//         } else {
//             this.setState({errorOldPassword: ""})
//         }
//     }

//     validationRepeatPassword(e) {
//         e.preventDefault()
//         this.setState({repeatPassword: e.target.value})
//         if(e.target.value === ""){
//             this.setState({errorRepeatPassword: "Silahkan isi ulang kata sandi baru"})
//         } else {
//             if(e.target.value !== this.state.newPassword){
//                 this.setState({errorRepeatPassword: "Masukkan sesuai kata sandi baru"})
//             } else {
//                 this.setState({errorRepeatPassword: ""})
//             }
//         }
//     }
    
//     render() {
//         return(    
//         <div className="bg-light">
//             <Navbar versi="2" />
//                 <div className="responsive-bar">
//                     <div className="card-title mx-md-auto my-md-3 my-0" style={{borderBottom: '3px solid #014C90', width: '134px'}}>
//                         <h4 className="title-icare title-fitur m-0 p-0 fw-bold" style={{fontSize: '18px'}}>
//                             <Link to="/settings" className="nav-link d-md-none d-inline me-3">
//                                 <i className="fa fa-arrow-left"></i>
//                             </Link>
//                             Ubah Kata Sandi
//                         </h4>
//                     </div>
//                 </div>
//                 <div className="col-md-7 col-12 mx-auto responsive-ubah-pass">
//                     <div className="card mb-5 px-2 px-md-4">
//                         <div className="card-body p-lg-5 px-0 input-mobile">
//                             <form onSubmit={this.submit}>
//                                 <div className="mb-3">
//                                     <label className="fw-medium form-control border border-dark size-13px" style={{backgroundColor: '#014C90', borderRadius: '0px', color:'white'}}>Masukkan Kata Sandi Baru</label>
//                                     <div className="border border-dark">
//                                         <div className="d-flex">
//                                             <div className="col-11">
//                                                 <input type={ this.state.typeInput[1] } className={`form-control border-0 ${this.state.errorNewPassword === "" ? "" : "is-invalid"}`} style={{boxShadow: 'none', textDecoration: 'none'}} onChange={this.validationNewPassword}/>
//                                             </div>
//                                             <div className="col-1 my-auto text-center" style={{paddingLeft: 0}}>
//                                                 <i 
//                                                     className={ `fa ${ this.state.iconClass[1] } fa-lg` } 
//                                                     onClick={ () => this.setState({
//                                                         typeInput: [
//                                                             this.state.typeInput[0],
//                                                             this.state.typeInput[1] == 'password' ? 'text' : 'password',
//                                                             this.state.typeInput[2],
//                                                         ],
//                                                         iconClass: [
//                                                             this.state.iconClass[0],
//                                                             this.state.typeInput[1] == 'password' ? 'fa-eye-slash' : 'fa-eye',
//                                                             this.state.iconClass[2]
//                                                         ]
//                                                     }) }
//                                                 ></i>
//                                             </div>
//                                         </div>
//                                         <div className="row">
//                                             <div className="col-12">
//                                                 <span className={`text-danger small mx-2 ${this.state.errorNewPassword === "" ? "d-none" : ""}`} style={{fontSize: 12}}>{this.state.errorNewPassword}</span>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="mb-4">
//                                     <label className="fw-medium form-control border border-dark size-13px" style={{backgroundColor: '#014C90', borderRadius: '0px', color:'white'}}>Ulangi Kata Sandi Baru</label>
//                                     <div className="border border-dark">
//                                         <div className="d-flex">
//                                             <div className="col-11">
//                                                 <input type={ this.state.typeInput[2] } className={`form-control border-0 ${this.state.errorRepeatPassword === "" ? "" : "is-invalid"}`} style={{boxShadow: 'none', textDecoration: 'none'}} onChange={this.validationRepeatPassword} />
//                                             </div>
//                                             <div className="col-1 my-auto text-center" style={{paddingLeft: 0}}>
//                                                 <i 
//                                                     className={ `fa ${ this.state.iconClass[2] } fa-lg` } 
//                                                     onClick={ () => this.setState({
//                                                         typeInput: [
//                                                             this.state.typeInput[0],
//                                                             this.state.typeInput[1],
//                                                             this.state.typeInput[2] == 'password' ? 'text' : 'password'
//                                                         ],
//                                                         iconClass: [
//                                                             this.state.iconClass[0],
//                                                             this.state.iconClass[1],
//                                                             this.state.typeInput[2] == 'password' ? 'fa-eye-slash' : 'fa-eye'
//                                                         ]
//                                                     }) }
//                                                     ></i>
//                                             </div>
//                                         </div>
//                                         <div className="row">
//                                             <div className="col-12">
//                                                 <span className={`text-danger small mx-2 ${this.state.errorRepeatPassword === "" ? "d-none" : ""}`} style={{fontSize: '12px'}}> {this.state.errorRepeatPassword} </span>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="text-center">
//                                     <button className="btn btn-login px-5 py-2 fw-medium" type="submit">Submit</button>
//                                 </div>
//                             </form>
//                             <ConfirmAlert visible={this.state.showPopup} message={this.state.alertOption.message} onClick={this.handlePopup} customClass="col-md-3 col-sm-6 col-9" />
//                             <LoadingAlert visible={this.state.loading} customClass="col-md-2 col-9" />
//                         </div>
//                     </div>
//                 </div>
//             <Footer />
//         </div>    
//         )
//     }
// }