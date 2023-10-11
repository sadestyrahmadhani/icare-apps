import {  useState, useEffect  } from "react";
import { Link, useLocation, useNavigate} from "react-router-dom";
import Navbar from "../../component/navbar";
import Footer from "../../component/footer";
import ConfirmAlert from "../../component/alert/confirmAlert";
import { verifyOtp } from "../../services";
import { reSendOtp } from "../../services/API/mod_verifyOtp";
import LoadingAlert from "../../component/alert/loadingAlert";

 function Otp() {
    const navigate = useNavigate();
    // const {userid, email, password, telp, msg, firstlogin }= this.props.params; 
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
                                    Silahkan masukkan kode OTP yang telah dikirimkan melalui sms ke No. + 
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
                                    className={`${!resendCodeDisabled ? 'disabled' : 'fw-bold text-primary'}`} 
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

