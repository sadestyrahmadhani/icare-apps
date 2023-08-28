import { Component } from "react";
import { Link } from "react-router-dom";
import Carousel from "../../component/carousel";
import { authUser } from "../../services/API"
import { setToken } from "../../core/local-storage";
import Cookies from 'universal-cookie'
import FiturCard from "./component/fitur-card";
import ConfirmAlert from "../../component/alert/confirmAlert";
const cookies = new Cookies();



export default class extends Component {
    constructor(props) {
        super(props)
        this.submit = this.submit.bind(this)
        this.handlePopup = this.handlePopup.bind(this)
        this.inputChange = this.inputChange.bind(this)
        this.state = {
	  username: "",
          password: "",
          loading: false,
          error: false,
          errMsg: "",
          login: false,
          showPopup: false,
          email:'',
          password:'',
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
            this.setState({errorEmail :"Silahkan isi email"})
        } else {
            this.setState({errorEmail:""})
        }
      }

    render() {
        return(
            <>
            {/* main-background */}
                <div className="main-background" id="beranda">
                    <img src="/images/Vector1.png" alt="background" width="100%"/>
                </div>

            {/* beranda/login */}
                <div className="container">
                    <div className="row row-height mb-5">
                        <div className="col-8" style={{paddingRight:'50px'}}>
                            <div className="col-sm-10 col-12 my-5">
                                <div className="card shadow-sm rounded p-4" style={{border:'1px solid #a2d2ff'}}>
                                    <div className="card-body px-2">
                                        <div className="col-12 text-center mb-3">
                                            <img src="/images/iCareLogo.png" alt="Logo iCare" className="h-50"/>
                                        </div>
                                        <form onSubmit={ this.submit }>
                                            <div className="mb-3">
                                                <label className="size-13px fw-bold">EMAIL</label>
                                                <input type="text"  name="username"  onChange={this.inputChange} className={`form-control border-only-bottom ${ this.state.errorEmail === "" ? "invalid" : ""}`}/>
                                                <span className={`invalid-feedback ${this.state.errorEmail === "" ? "d-none": ""}`} style={{ fontSize: 12 }}>{this.state.errorEmail}</span>
                                            </div>
                                            <div className="mb-4">
                                                <label className="size-13px fw-bold">PASSWORD</label>
                                                <input type="password"  name="password" onChange={this.inputChange} className="form-control border-only-bottom" />
                                            </div>
                                            <div className="mb-2 mx-auto text-center">
                                                <button className="btn btn-login my-1" style={{paddingLeft:'70px', paddingRight:'70px', paddingBottom:'10px', paddingTop:'10px'}}>LOGIN</button>
                                            </div>
                                            <div className="text-center">
                                                <Link className="nav-link size-13px fw-medium my-2" to="kebijakan-privasi/register">Belum Punya akun ?</Link>
                                                <Link className="nav-link size-13px fw-medium my-2 mb-3"  to="/lupa-password">Lupa Password ?</Link>
                                                <button className="btn btn-google shadow-sm me-2 fw-medium px-5 text-muted py-1" >Sign in with Google</button>
                                            </div>
                                        </form>
                                        <ConfirmAlert visible={this.state.showPopup} titleMessage="Error" message="Form not valid" onClick={this.handlePopup} customClass="col-md-2 col-sm-6 col-12" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="background col-4">
                            <img src="/images/Cahyo_MFD.png" alt="images 1" width="80%" className="mb-3" style={{marginLeft:'70px'}}/>
                            <h2 className="title-icare text-center fw-bold" style={{marginLeft:'70px', fontSize:'35px'}}>Solusi untuk eskalasi problem dan permintaan layanan.</h2>
                        </div>
                    </div>
                </div>


            {/* about section */}
                    <section className="section-about" style={{marginTop:'150px'}} id="about">
                        <div className="card-about mb-5" height="250" style={{marginLeft:'80px', marginRight:'80px'}}>
                            <div className="row g-0 mx-auto">
                                <div className="col-md-6">
                                    <div className="card-body py-5 px-3 mx-5">
                                        <h3 className="title-icare text-center fw-bold mb-5">Mengapa iCare?</h3>
                                        <p className="card-text description-icare lh-sm" style={{fontSize:'14px'}}>iCare adalah aplikasi mobile yang dapat digunakan untuk mempermudah <b>eskalasi problem</b> dan <b>permintaan layanan</b> yang dibutuhkan oleh pelanggan Astragraphia.</p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <iframe width="100%" height="255" src="https://www.youtube-nocookie.com/embed/WthGEU-Rig4" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                                </div>
                            </div>
                        </div>
                    </section>


            {/* fitur section */}
                <section className="section-fitur" id="fitur">
                    <div className="container mb-5">
                        <h3 className="title-icare text-center fw-bold mb-5"> Fitur iCare</h3>
                        <FiturCard data={this.state.fiturData} />
                    </div>
                </section>


            {/* profit-section */}
                <section className="benefit-section" id="benefit">
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


            {/* testimonials-section */}
                <section className="testimonials-section" id="testimonial">
                    <div className="container pt-5 mb-5">
                        <h3 className="title-icare text-center fw-bold">Testimonials</h3>
                        <Carousel />
                    </div>
                </section>


            {/* pakai iCare sekarang */}
                <div className="row" style={{borderTop: '1px solid #d4d8ff'}}>
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
            </>
        )
    }

    handlePopup() {
        this.setState({showPopup: false})
    }

    async submit(e) {
        e.preventDefault() 
        this.setState({showPopup: true})
        if(this.state.email === "") this.setState({errorEmail:"Silahkan isi email"})
        if(this.state.password === "") this.setState({errorPassword:"Silahkan isi password"})
        
        const {username, password} = this.state
        this.setState({loading:true, error: false})
        const response = await authUser({
            username: username, password: password, type:"normal"
          });
        if (response != null) {
        console.log('response', response)
        
            
            cookies.set('iCare_user', JSON.stringify(response), { path: '/' });
            // console.log('iCare_user', cookies.get('iCare_user')); // Pacman
                // this.setState({loading:false, error: false, login: true})
            // window.location.reload(false);
            this.props.router.navigate("/dashboard")
        }
        
    }

    
    
}

