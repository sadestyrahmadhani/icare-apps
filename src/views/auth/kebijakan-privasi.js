import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "../../component/navbar";
import Footer from "../../component/footer";
import ConfirmAlert from "../../component/alert/confirmAlert";
// import Swal from "sweetalert2";

function ConditionFooter() {
    const Params = useParams() 
    return(
            <div className="bg-light intro-y">
                <Navbar versi="2" />
                <div className="text-md-center text-start mb-5">
                    <div className="responsive-bar">
                        <div className="mx-md-auto my-md-3 my-0 my-md-3 pb-2" style={{borderBottom:'3px solid #014C90', width:'155px'}}>
                            <h5 className="title-icare title-fitur fw-bold m-0 p-0">
                                <Link to="/" className="nav-link d-md-none d-inline me-3">
                                    <i className="fa fa-arrow-left"></i>
                                </Link>
                                <span className="title-bold">Kebijakan Privasi</span>
                            </h5>
                        </div>
                    </div>
                    <div className="card text-center p-4 mx-auto mb-md-2 mb-3 bg-light col-md-7 col-11 custom-card" style={{border:'1px solid', borderRadius:'30px'}}>
                        <p className="lh-sm mb-0" style={{fontSize:'14px'}}>
                            iCare merupakan aplikasi berbasis internet &#40;selanjutnya disebut &#34;Aplikasi&#34;&#41; yang dikelola oleh PT Astra Graphia Tbk &#40;selanjutnya disebut &#34;Astragraphia&#34;&#41;. Melindungi privasi individu diinternet sangat penting untuk masa depan bisnis berbasis internet dan pergerakan menuju ekonomi internet yang sebenarnya. Astragraphia telah membuat Pernyataan Privasi ini untuk menunjukkan komitmen tegas terhadap hak individu atas perlindungan data dan privasi. Pernyataan ini menguraikan bagaimana Astragraphia menangani informasi yang dapat digunakan untuk mengidentifikasi seseorang secara langsung atau tidak langsung &#40;&#34;Data Pribadi&#34;&#41;. Astragraphia dapat mengubah atau mengganti Kebijakan Data Pribadi ini. <br/><br/>
                            Dengan mendaftar dan menggunakan Aplikasi, Pelanggan menyatakan bahwa setiap data dan informasi yang diberikan adalah benar dan sah serta memberikan persetujuan kepada Astragraphia untuk memperoleh, mengumpulkan, menyimpan, mengelola dan mempergunakan data dan informasi tersebut sesuai dengan Ketentuan dan Kebijakan Privasi ini.
                        </p>
                    </div>
                    <p className="text-danger mb-md-3 mb-3 text-center" style={{fontSize:'14px'}}>&#42;Mohon baca sepenuhnya kebijakan ini</p>
                    {   
                        Params?.type == 'register' ? <ConditionRegister /> : ""
                    }                        
                </div>
                <Footer />
            </div>
    )
}

function ConditionRegister(props) {
    const [isCheck, setIsCheck] = useState(true)
    const [popup, setPopup] = useState(false)
    const navigate = useNavigate()
    return(
        <div className="text-center">
            <div className="mb-md-4 mb-5 d-flex align-items-center justify-content-center">
                <input className="me-2 mt-0 form-check-input" style={{borderRadius: 0, padding:'1px'}} type="checkbox" id="agree-check" onChange={ () => setIsCheck(!isCheck) } /> 
                <label className="form-check-label" style={{fontSize:'12px'}} htmlFor="agree-check" >Saya setuju dengan kebijakan ini</label>
            </div>
            <button className={ `btn fw-medium rounded-3 ${ isCheck ? 'btn-secondary-custom' :'btn-login' }` } type="submit" style={{fontSize:'14px', paddingLeft:'75px', paddingRight:'75px', paddingTop:'8px', paddingBottom:'8px'}} onClick={ () => {
                if(isCheck) {
                    setPopup(true)
                } else {
                    navigate('/register')
                }
            } }>SUBMIT</button>
            <ConfirmAlert visible={popup} titleMessage="Error" message="Wajib centang untuk melanjutkan registrasi anda" customClass="col-md-3 col-sm-8 col-9" onClick={() => setPopup(false)} />
        </div>
    )
} 

export default ConditionFooter

