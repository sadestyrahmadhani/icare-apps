<<<<<<< HEAD
import {  useState, useEffect  } from "react";
import { Link, useLocation, useNavigate} from "react-router-dom";
=======
import { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
>>>>>>> 369b0c44ad81728eb46d7df279bac46a5937db58
import Navbar from "../../component/navbar";
import Footer from "../../component/footer";
import ConfirmAlert from "../../component/alert/confirmAlert";
import { verifyOtp } from "../../services";
import { reSendOtp } from "../../services/API/mod_verifyOtp";
import LoadingAlert from "../../component/alert/loadingAlert";

<<<<<<< HEAD
 function Otp() {
    const navigate = useNavigate();
    // const {userid, email, password, telp, msg, firstlogin }= this.props.params; 
=======
function Otp() {
    const navigate = useNavigate();
    // const {userid, email, password, telp, msg, firstlogin }= this.props.params;
>>>>>>> 369b0c44ad81728eb46d7df279bac46a5937db58
    // this.submit = this.submit.bind(this)
    // this.handlePopup = this.handlePopup.bind(this)
    // this.handleReSendOtp = this.handleReSendOtp.bind(this)
    // this.resetIteration = this.resetIteration.bind(this)
    // console.log(this.props)
    const location=useLocation()    
    const [iteration, setIteration]= useState(60)       
    const [resendCodeDisabled,setresendCodeDisabled]=useState(true)
    const [showPopup,setshowPopup]=useState( false)
    const [loading,setLoading]=useState( false)
    const [otp,setotp]=useState( '')
    const [titleMessage,settitleMessage]=useState('')
    const [errorMessage,seterrorMessage]=useState('')
    const [userid,setuserid]=useState(location.state.userid)
    const [email,setemail]=useState(location.state.email)
    const [password,setpassword]=useState(location.state.password)
    const [telp,settelp]=useState(location.state.telp)
    const [msg,setmsg]=useState(location.state.msg)
    const [firstlogin,setfirstlogin]=useState(location.state.firstlogin)
    
        
    useEffect(()=> {
        
        const interval=setInterval(() => {
<<<<<<< HEAD
            if(iteration === 0) {
                setresendCodeDisabled(true)
            } else {
                setIteration(iteration - 1)
                setresendCodeDisabled(false)
            }
        }, 1000);
        return () => clearInterval(interval);
    },[iteration]);


    // componentDidMount(){        
    // }

    const handlePopup = ( )=>{
        setshowPopup(false)
    }

    async function useSubmit(e) {
        e.preventDefault()
        const res = await verifyOtp({userid: userid, action: msg.action , otp: otp})
        if(res.status == 200 && res.data !== 'Succes, OTP match') {
            setshowPopup(true) 
            seterrorMessage(res.data)
        } else {
            if(msg.action === "Change Telp") { 
                localStorage.setItem('username', location.state.name)
                localStorage.setItem('telp', location.state.phone)
                navigate('/data_diri')
            } else {
                var data = res.data
                navigate('/update_password', {
                    state: {
                        firstlogin: false,
                        userid: location.state.userid,
                        otp: otp,
                        msg: data
                    }
                })
=======
            setIteration(iteration - 1)
            if(iteration === 0) {
                setresendCodeDisabled(true)
            } else {
                setresendCodeDisabled(false)
            }
        }, 1000);
        return () => clearInterval(interval);
    },[iteration]);


    // componentDidMount(){        
    // }

    const handlePopup= ()=>{
        setshowPopup=false
    }

    async function useSubmit(e) {
        e.preventDefault()
        const res = await verifyOtp({userid: userid, action: msg.action , otp: otp})
        if(res.status == 200 && res.data !== 'Succes, OTP match') {
            setshowPopup(true) 
            seterrorMessage(res.data)
        } else {
            if(msg.action === "Change Telp") {
                localStorage.setItem('username', this.state.userInfo.name)
                localStorage.setItem('telp', this.state.userInfo.telp)
                navigate('/data_diri')
            } else {
                navigate('/ubah_kata_sandi')
>>>>>>> 369b0c44ad81728eb46d7df279bac46a5937db58
            }
        } 
    } 

    const handleReSendOtp = async () => {
        if(iteration === 0 ) {
            const res = await reSendOtp({email: email, telp: telp, action: msg.action})
            if(res.status == 200 && res.data === null) {
                setshowPopup(true)
                seterrorMessage('Opps! terjadi kesalahan')
                return
            }
            resetIteration()
        }
    }

    const resetIteration= () => {
        if(iteration === 0) {
            setIteration(60)
            setresendCodeDisabled(true)
        }
    }

<<<<<<< HEAD
=======
    
>>>>>>> 369b0c44ad81728eb46d7df279bac46a5937db58
        return(
            <div className="bg-light">
                <Navbar versi="2" />
                    <div className="card-title text-center mx-auto my-3 mb-5 d-md-block d-none" style={{borderBottom:'3px solid #014C90', width:'92px'}}>
                        <h5 className="title-icare title-fitur fw-bold">Kode OTP</h5>
                    </div>
                    <div className="col-md-5 col-sm-8 col-12 mx-auto responsive-otp">
                        <div 
                            className="card mb-5 py-4 px-md-5 px-0 bg-light" 
                            style={{border:'1px solid'}}
                        >
                            <div className="card-body text-center px-4">
                                <p 
                                    className="mb-2 text-otp" 
                                    style={{fontSize:'14px', textAlign:'justify'}}
                                >
<<<<<<< HEAD
                                    Silahkan masukkan kode OTP yang telah dikirimkan melalui sms ke No. + 
=======
                                    Silahkan masukkan kode OTP yang telah dikirimkan melalui sms ke No. 
>>>>>>> 369b0c44ad81728eb46d7df279bac46a5937db58
                                    {telp}
                                </p>
                                <form 
                                    className="mb-3" 
                                    onSubmit={useSubmit}
                                >
                                    <input 
                                        className="form-control border-only-bottom custom-input-number text-center mb-4" 
                                        type="number" 
                                        onChange={(e) => setotp(e.target.value)} 
                                        placeholder="Masukkan Kode OTP" 
                                        style={{fontSize:'14px'}} 
                                    />
                                    <button 
                                    className="btn btn-login fw-medium rounded-3 shadow" 
                                    type="submit" 
                                    style={{fontSize:'14px', paddingLeft:'60px', paddingRight:'60px', paddingTop:'12px', paddingBottom:'12px'}}
                                    >
                                        SUBMIT
                                    </button>
                                </form>
                                <ConfirmAlert 
                                    visible={showPopup} 
                                    titleMessage="Error"
                                    message={errorMessage} 
                                    onClick={handlePopup} 
                                    customClass="col-md-3 col-sm-6 col-7" 
                                />
                                <LoadingAlert 
                                visible={loading}
                                customClass="col-md-2 col-8"
                                />
                                <p 
                                    className="mb-2" 
                                    style={{fontSize:'14px'}}
                                >
                                    Belum terima SMS kode OTP ?
                                </p>
                                <button 
<<<<<<< HEAD
                                    className={`${!resendCodeDisabled ? 'disabled' : 'fw-bold text-primary'}`} 
=======
                                    className={`${resendCodeDisabled ? 'disabled' : 'fw-bold text-primary'}`} 
>>>>>>> 369b0c44ad81728eb46d7df279bac46a5937db58
                                    type="button" 
                                    onClick={handleReSendOtp} 
                                    style={{textDecoration:'none', color:'#9b9b9b', fontSize:'14px', border:'none', background:'transparent'}}
                                >
                                    Kirim Ulang
                                </button>
                                <p 
                                    className="mt-2" 
                                    style={{fontSize:'14px'}}
                                >
                                    Harap Tunggu {iteration} detik sebelum kirim ulang otp
                                </p>
                            </div>
                        </div>
                    </div>
                <Footer />
            </div>
        ) 

}
export default Otp
<<<<<<< HEAD
=======



// export default class extends Component {
//     constructor(props) {
//         super(props)
//         this.submit = this.submit.bind(this)
//         this.handlePopup = this.handlePopup.bind(this)
//         this.handleReSendOtp = this.handleReSendOtp.bind(this)
//         this.resetIteration = this.resetIteration.bind(this)
//         this.state = {
//             iteration: 60,
//             resendCodeDisabled:true,
//             showPopup: false,
//             loading: false,
//             otp: '',
//             titleMessage:'',
//             errorMessage:'',
//             userInfo: JSON.parse(window.atob(this.props.router.params.id))
//         }
//     }

//     handlePopup(){
//         this.setState({showPopup:false})
//     }

//     async submit(e) {
//         e.preventDefault()
//         this.setState({loading: true})
//         const res = await verifyOtp({userid: this.state.userInfo.userid, action: this.state.userInfo.action , otp: this.state.otp})
//         this.setState({loading: false})
//         if(res.status == 200 && res.data !== 'Succes, OTP match') {
//             this.setState({showPopup:true, errorMessage: res.data})
//         } else {
//             if(this.state.userInfo.action === "Change Telp") {
//                 localStorage.setItem('username', this.state.userInfo.name)
//                 localStorage.setItem('telp', this.state.userInfo.telp)
//                 this.props.router.navigate('/data_diri')
//             } else {
//                 this.props.router.navigate('/update_password')
//             }
//         } 
//     } 

//     async handleReSendOtp() {
//         if(this.state.iteration === 0 ) {
//             const res = await reSendOtp({email: this.state.userInfo.email, telp: this.state.userInfo.telp, action: this.state.userInfo.action})
//             if(res.status == 200 && res.data === null) {
//                 this.setState({showPopup: true, errorMessage:'Opps! terjadi kesalahan'})
//                 return
//             }
//             this.resetIteration()
//         }
//     }

//     resetIteration() {
//         if(this.state.iteration === 0) {
//             this.setState({iteration: 60, resendCodeDisabled: true})
//         }
//     }
    
//     render() {  
//         return(
//             <div className="bg-light">
//                 <Navbar versi="2" />
//                     <div className="card-title text-center mx-auto my-3 mb-5 d-md-block d-none" style={{borderBottom:'3px solid #014C90', width:'92px'}}>
//                         <h5 className="title-icare title-fitur fw-bold">Kode OTP</h5>
//                     </div>
//                     <div className="col-md-5 col-sm-8 col-12 mx-auto responsive-otp">
//                         <div 
//                             className="card mb-5 py-4 px-md-5 px-0 bg-light" 
//                             style={{border:'1px solid'}}
//                         >
//                             <div className="card-body text-center px-4">
//                                 <p 
//                                     className="mb-2 text-otp" 
//                                     style={{fontSize:'14px', textAlign:'justify'}}
//                                 >
//                                     Silahkan masukkan kode OTP yang telah dikirimkan melalui sms ke No. 
//                                     {this.state.userInfo.telp}
//                                 </p>
//                                 <form 
//                                     className="mb-3" 
//                                     onSubmit={this.submit}
//                                 >
//                                     <input 
//                                         className="form-control border-only-bottom custom-input-number text-center mb-4" 
//                                         type="number" 
//                                         onChange={(e) => this.setState({otp: e.target.value})} 
//                                         placeholder="Masukkan Kode OTP" 
//                                         style={{fontSize:'14px'}} 
//                                     />
//                                     <button 
//                                     className="btn btn-login fw-medium rounded-3 shadow" 
//                                     type="submit" 
//                                     style={{fontSize:'14px', paddingLeft:'60px', paddingRight:'60px', paddingTop:'12px', paddingBottom:'12px'}}
//                                     >
//                                         SUBMIT
//                                     </button>
//                                 </form>
//                                 <ConfirmAlert 
//                                     visible={this.state.showPopup} 
//                                     titleMessage="Error"
//                                     message={this.state.errorMessage} 
//                                     onClick={this.handlePopup} 
//                                     customClass="col-md-3 col-sm-6 col-7" 
//                                 />
//                                 <LoadingAlert 
//                                 visible={this.state.loading}
//                                 customClass="col-md-2 col-8"
//                                 />
//                                 <p 
//                                     className="mb-2" 
//                                     style={{fontSize:'14px'}}
//                                 >
//                                     Belum terima SMS kode OTP ?
//                                 </p>
//                                 <button 
//                                     className={`${this.state.resendCodeDisabled ? 'disabled' : 'fw-bold text-primary'}`} 
//                                     type="button" 
//                                     onClick={this.handleReSendOtp} 
//                                     style={{textDecoration:'none', color:'#9b9b9b', fontSize:'14px', border:'none', background:'transparent'}}
//                                 >
//                                     Kirim Ulang
//                                 </button>
//                                 <p 
//                                     className="mt-2" 
//                                     style={{fontSize:'14px'}}
//                                 >
//                                     Harap Tunggu {this.state.iteration} detik sebelum kirim ulang otp
//                                 </p>
//                             </div>
//                         </div>
//                     </div>
//                 <Footer />
//             </div>
//         )
//     }

//     componentDidMount() {
//         setInterval(() => {
//             this.setState({iteration:this.state.iteration === 0 ? 0 : this.state.iteration - 1})
//             if(this.state.iteration === 0) {
//                 this.setState({resendCodeDisabled:false})
//             } else {
//                 this.setState({resendCodeDisabled:true})
//             }
//         }, 1000)
//     }
// }
>>>>>>> 369b0c44ad81728eb46d7df279bac46a5937db58

