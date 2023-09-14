import { Component } from "react";
import { Link } from "react-router-dom";
import Carousel from "../../component/carousel";
import { authUser } from "../../services/API"
import { setNamaPerusahaan, setUser } from "../../core/local-storage";
import { setEmail } from "../../core/local-storage";
import { setTelp } from "../../core/local-storage";
import { getNamaPerusahaan } from "../../core/local-storage";

import {
    settoken,setrefreshtoken
} from '../../services/fetchTools';
import FiturCard from "./component/fitur-card";
import ConfirmAlert from "../../component/alert/confirmAlert";
import LoadingAlert from "../../component/alert/loadingAlert";

export default class extends Component {
    constructor(props) {
        super(props)
        this.submit = this.submit.bind(this)
        this.handlePopup = this.handlePopup.bind(this)
        this.inputChange = this.inputChange.bind(this)
        this.state = {
        alertOption:{
            title:'',
            message:''
        },
	    username: "",
          password: "",
          loading: false,
          error: false,
          errMsg: "",
          login: false,
          showPopup: false,
          email:'',
          
          errorEmail:'', 
          errorPassword:'',
            fiturData: [
                {
                    lg: 3,
                    md: 3,
                    sm: 6,
                    xs: 12,
                    imgHeight: 140,
                    borderColor: '#2DB5F9',
                    img: '/images/breakfix-fitur.png',
                    title: 'Breakfix',
                    description: 'Sebagai layanan customer untuk permintaan perbaikan pada mesin.'
                },
                {
                    lg: 3,
                    md: 3,
                    sm: 6,
                    xs: 12,
                    imgHeight: 140,
                    borderColor: '#F58B09',
                    img: '/images/supplies-fitur.png',
                    title: 'Supplies',
                    description: 'Sebagai layanan customer untuk permintaan consumable dan sparepart.'
                },
                {
                    lg: 3,
                    md: 3,
                    sm: 6,
                    xs: 12,
                    imgHeight: 140,
                    borderColor: '#0EDA52',
                    img: '/images/collect-meter-install.png',
                    title: 'Install',
                    description: 'Sebagai layanan customer untuk permintaan setting konfigurasi mesin.'
                },
                {
                    lg: 3,
                    md: 3,
                    sm: 6,
                    xs: 12,
                    imgHeight: 140,
                    borderColor: '#B40EDE',
                    img: '/images/collect-meter-install.png',
                    title: 'Collect Meter',
                    description: 'Sebagai layanan customer untuk permintaan informasi billing meter yang ada pada mesin printer Astragraphia.'
                },
                {
                    lg: 4,
                    md: 4,
                    sm: 6,
                    xs: 12,
                    imgHeight: 70,
                    style: {marginBottom:'1.5rem', marginTop:'2rem'},
                    borderColor: '#E23845',
                    img: '/images/riwayat.png',
                    title: 'Riwayat',
                    description: 'Untuk melihat histori permintaan layanan sebelumnya.'
                },
                {
                    lg: 4,
                    md: 4,
                    sm: 6,
                    xs: 12,
                    imgHeight: 70,
                    style: {marginBottom:'1.5rem', marginTop:'2rem'},
                    borderColor: '#B629DD',
                    img: '/images/informasi.png',
                    title: 'Informasi',
                    description: 'Untuk melihat status notifikasi dari permintaan layanan yang dibuat.'
                },
                {
                    lg: 4,
                    md: 4,
                    sm: 6,
                    xs: 12,
                    imgHeight: 70,
                    style: {marginBottom:'1.5rem', marginTop:'2rem'},
                    borderColor: '#EE31A3',
                    img: '/images/setting.png',
                    title: 'Setting',
                    description: 'Untuk melihat konfigurasi pada aplikasi iCare seperti perubahan Data Diri, Alamat, EQ, dll.'
                },

            ]
        }
    }

    inputChange = (event) => {
        event.preventDefault()
        this.setState({ [event.target.name] : event.target.value })
        this.setState({email: event.target.value})
        if(event.target.value === "") {
            this.setState({[event.target.name === 'username' ? 'errorEmail' : 'errorPassword'] : event.target.name === 'username' ? 'Silahkan isi email' : 'Silahkan isi password'})
        } else {
            this.setState({[event.target.name === 'username' ? 'errorEmail' : 'errorPassword'] : event.target.name === 'username' ? '' : ''})
        }
      }

    render() {
        return(
            <div className="intro-y">
                {/* Beranda */}
                <div className="d-lg-block d-none" style={{ background: 'url(/images/Vector1.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', height: '100vh', position: 'absolute', top: 0, left: 0, right: 0, zIndex: -1 }} id="beranda"></div>

                <div className="d-flex align-items-center row-height" style={{ height: '85vh' }}>
                    <div className="col-lg-6 col-md-8 col-sm-10 col-12 mx-lg-0 mx-auto">
                        <div className="card shadow-sm" style={{border:'1px solid #a2d2ff'}}>
                            <div className="card-body px-4 py-5">
                                <div className="col-12 text-center mb-3">
                                    <img src="/images/iCareLogo.png" alt="Logo iCare" className="h-50 login-image"/>
                                </div>
                                <form onSubmit={ this.submit }>
                                    <div className="mb-3">
                                        <label className="size-13px fw-bold">EMAIL</label>
                                        <input type="text"  name="username"  onChange={this.inputChange} autocomplete="email" className={`form-control border-only-bottom ${ this.state.errorEmail !== "" ? "is-invalid" : ""}`}/>
                                        <span className={`invalid-feedback ${this.state.errorEmail === "" ? "d-none": ""}`} style={{ fontSize: 12 }}>{this.state.errorEmail}</span>
                                    </div>
                                    <div className="mb-4">
                                        <label className="size-13px fw-bold">PASSWORD</label>
                                        <input type="password"  name="password" onChange={this.inputChange} autocomplete="password" className={`form-control border-only-bottom ${ this.state.errorPassword !== "" ? "is-invalid" : ""}`}/>
                                        <span className={`invalid-feedback ${this.state.errorPassword === "" ? "d-none": ""}`} style={{ fontSize: 12 }}>{this.state.errorPassword}</span>
                                    </div>
                                    <div className="mb-2 mx-auto text-center">
                                        <button className="btn btn-login my-1" style={{paddingLeft:'70px', paddingRight:'70px', paddingBottom:'10px', paddingTop:'10px'}}>LOGIN</button>
                                    </div>
                                    <div className="text-center">
                                        <Link className="nav-link size-13px fw-medium my-2" to="kebijakan-privasi/register">Belum Punya akun ?</Link>
                                        <Link className="nav-link size-13px fw-medium my-2 mb-3"  to="/lupa-password">Lupa Password ?</Link>
                                        <button type="button" className="btn btn-google shadow-sm me-2 fw-medium px-3 text-muted py-1" >
                                            <img src="/images/google-icons.png" alt="google-icons" height="20" className="me-3" />
                                            Sign in with Google
                                        </button>
                                    </div>
                                </form>
                                <ConfirmAlert visible={this.state.showPopup} titleMessage={this.state.alertOption.title} message={this.state.alertOption.message} onClick={this.handlePopup} customClass="col-md-2 col-sm-4 col-8" />
                                <LoadingAlert visible={this.state.loading} customClass="col-md-2 col-sm-4 col-8"  />
                            </div>
                        </div>
                    </div>
                    <div className="col-4 ms-auto d-lg-block d-none">
                        <img src="/images/Cahyo_MFD.png" alt="images 1" width="80%" className="mb-3" style={{marginLeft:'70px'}}/>
                        <h2 className="title-icare title-solusi text-center fw-bold" style={{marginLeft:'70px', fontSize:'35px'}}>Solusi untuk eskalasi problem dan permintaan layanan.</h2>
                    </div>
                </div>

                {/* About */}
                <section className="section-about py-5 my-5 d-lg-block d-none" id="about">
                    <div className="row">
                        <div className="card-about col-5 p-0 ms-auto">
                            <div className="card-body py-5 px-3 mx-5">
                                <h3 className="title-icare text-center fw-bold mb-5">Mengapa iCare?</h3>
                                <p className="card-text description-icare lh-sm" style={{fontSize:'14px'}}>iCare adalah aplikasi mobile yang dapat digunakan untuk mempermudah <b>eskalasi problem</b> dan <b>permintaan layanan</b> yang dibutuhkan oleh pelanggan Astragraphia.</p>
                            </div>
                        </div>
                        <div className="col-6 p-0 me-auto">
                            <iframe width="100%" height="255" src="https://www.youtube-nocookie.com/embed/WthGEU-Rig4" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                        </div>
                    </div>
                </section>

                {/* Features */}
                <section className="section-fitur d-lg-block d-none" id="fitur">
                    <div className="container mb-5">
                        <h3 className="title-icare text-center fw-bold mb-5"> Fitur iCare</h3>
                        <FiturCard data={this.state.fiturData} />
                    </div>
                </section>

                {/* Profit */}
                <section className="benefit-section d-lg-block d-none" id="benefit">
                    <div className="container pt-5 mb-5">
                        <h3 className="title-icare text-center fw-bold mb-5">Keuntungan</h3>
                        <div className="row">
                            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                                <div className="card custom-height shadow-lg mb-5">
                                    <div className="card-body d-flex align-items-center justify-content-center" style={{padding:'5rem 3rem'}}>
                                        <div className="text-center">
                                            <img src="/images/easy.png" alt="riwayat" width="50" />
                                            <h5 className="card-title mt-3 fw-bold"> Riwayat </h5>
                                            <p className="card-text" style={{fontSize:'14px'}}>Memudahkan customer pada saat permintaan layanan.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                                <div className="card custom-height shadow-lg mb-5">
                                    <div className="card-body d-flex align-items-center justify-content-center" style={{padding:'5rem 3rem'}}>
                                        <div className="text-center">
                                            <img src="/images/monitoring.png" alt="monitoring" width="50" />
                                            <h5 className="card-title mt-3 fw-bold"> Monitoring </h5>
                                            <p className="card-text" style={{fontSize:'14px'}}>Customer dapat memonitor status permintaan layanan.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                                <div className="card custom-height shadow-lg mb-5">
                                    <div className="card-body d-flex align-items-center justify-content-center" style={{padding:'5rem 3rem'}}>
                                        <div className="text-center">
                                            <img src="/images/quality.png" alt="setting" width="50" />
                                            <h5 className="card-title mt-3 fw-bold"> Settings </h5>
                                            <p className="card-text" style={{fontSize:'14px'}}>Meningkatkan kualitas layanan Astragraphia.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                                <div className="card custom-height shadow-lg mb-5">
                                    <div className="card-body d-flex align-items-center justify-content-center" style={{padding:'5rem 3rem'}}>
                                        <div className="text-center">
                                            <img src="/images/satisfaction.png" alt="satisfaction" width="50" />
                                            <h5 className="card-title mt-3 fw-bold "> Satisfaction </h5>
                                            <p className="card-text" style={{fontSize:'14px'}}>Meningkatkan kepuasan pelanggan.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Testimonial */}
                <section className="testimonials-section d-lg-block d-none" id="testimonial">
                    <div className="container pt-5 mb-5">
                        <h3 className="title-icare text-center fw-bold">Testimonials</h3>
                        <Carousel />
                    </div>
                </section>

                {/* Use iCare Now */}
                <div className="row d-lg-flex d-none" style={{borderTop: '1px solid #d4d8ff', marginTop: '6rem'}}>
                    <div className="col-lg-5 col-md-5 col-12 py-5">
                        <img src="/images/iCareLogo.png" alt="Logo iCare" className="mb-2" width="150" />
                        <p className="mb-1" style={{fontSize:'28px'}}>Pakai iCare Sekarang!</p>
                        <p className="text-danger" style={{fontSize:'14px'}}>Kemudahan <b>eskalasi problem</b> dan <b>permintaan layanan</b> dalam satu genggaman.</p>
                    </div>
                    <div className="col-lg-7 col-md-7 col-12">
                        <div className="container">
                            <img src="/images/peta.png" alt="iCare" height="260" />
                        </div>
                    </div>
                </div>
                <p className="cp-mobile text-center d-md-none d-block">iCare &copy; PT ASTRA GRAPHIA TBK</p>
            </div>
        )
    } 
    

    handlePopup() {
        this.setState({showPopup: false})
    }

    async submit(e) {
        e.preventDefault() 
        if(this.state.email === "" || this.state.password === "") {
            this.setState({showPopup: true, alertOption:{title:"Error", message:"Form not Valid"}}) 
            if(this.state.email === "") this.setState({errorEmail:"Silahkan isi email"})
            if(this.state.password === "") this.setState({errorPassword:"Silahkan isi password"})
            return
        }
        
        const {username, password} = this.state
        this.setState({loading:true, error: false})
        const response = await authUser({
            username: username, password: password, type:"normal"
          });

        this.setState({loading: false})

        if (response != null) {
        console.log('testingresponseLogin', response)
            settoken(response.token)
            setrefreshtoken(response.refreshtoken)
            setUser(response.namalengkap)
            console.log('testingnamalengkap :', response.namalengkap)
            setEmail(response.emailaddress)
            setTelp(response.telp)
            console.log('testingtelp :', response.telp)
            setNamaPerusahaan(response.namaperusahaan)
            console.log('testingnamaperusahaan :', response.namaperusahaan)


            




            // console.log('iCare_user', cookies.get('iCare_user')); // Pacman
                // this.setState({loading:false, error: false, login: true})
            // window.location.reload(false);
            this.props.router.navigate("/dashboard")
        } else {
            this.setState({showPopup: true, alertOption:{title:"Error", message:"Invalid username/password"}})
        }

        
        
    }

    
    
}

