import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../component/navbar";
import Footer from "../../component/footer";
import Swal from "sweetalert2";

function ConditionFooter() {
    const Params = useParams() 
    return(
            <div className="bg-light">
                <Navbar versi="2" />
                <div className="container mb-5">
                    <div className="text-center pt-4">
                        <div className="card-title mx-auto my-3" style={{borderBottom:'3px solid #014C90', width:'155px'}}>
                            <h5 className="title-icare fw-bold">Kebijakan Privasi</h5>
                        </div>
                        <div className="card text-center p-4 mx-auto mb-2 bg-light" style={{border:'1px solid', borderRadius:'30px', width:'70%'}}>
                            <p className="lh-sm mb-0" style={{fontSize:'14px'}}>
                                iCare merupakan aplikasi berbasis internet &#40;selanjutnya disebut &#34;Aplikasi&#34;&#41; yang dikelola oleh PT Astra Graphia Tbk &#40;selanjutnya disebut &#34;Astragraphia&#34;&#41;. Melindungi privasi individu diinternet sangat penting untuk masa depan bisnis berbasis internet dan pergerakan menuju ekonomi internet yang sebenarnya. Astragraphia telah membuat Pernyataan Privasi ini untuk menunjukkan komitmen tegas terhadap hak individu atas perlindungan data dan privasi. Pernyataan ini menguraikan bagaimana Astragraphia menangani informasi yang dapat digunakan untuk mengidentifikasi seseorang secara langsung atau tidak langsung &#40;&#34;Data Pribadi&#34;&#41;. Astragraphia dapat mengubah atau mengganti Kebijakan Data Pribadi ini. <br/><br/>
                                Dengan mendaftar dan menggunakan Aplikasi, Pelanggan menyatakan bahwa setiap data dan informasi yang diberikan adalah benar dan sah serta memberikan persetujuan kepada Astragraphia untuk memperoleh, mengumpulkan, menyimpan, mengelola dan mempergunakan data dan informasi tersebut sesuai dengan Ketentuan dan Kebijakan Privasi ini.
                            </p>
                        </div>
                        <p className="text-danger" style={{fontSize:'14px'}}><u>&#42;Mohon baca sepenuhnya kebijakan ini</u></p>
                        {   
                            Params?.type == 'register' ? <ConditionRegister /> : ""
                        }                        
                    </div>
                </div>
                <Footer />
            </div>
    )
}

function ConditionRegister(props) {
    const [isCheck, setIsCheck] = useState(true)
    const navigate = useNavigate()
    return(
        <div className="text">
            <div className="mb-3 d-flex align-items-center justify-content-center">
                <input className="me-2 mt-0 form-check-input" style={{borderRadius: 0, padding:'1px'}} type="checkbox" id="agree-check" onChange={ () => setIsCheck(!isCheck) } /> 
                <label className="form-check-label" style={{fontSize:'12px'}} htmlFor="agree-check" >Saya setuju dengan kebijakan ini</label> <br/>
            </div>
            <button className={ `btn fw-medium rounded-3 ${ isCheck ? 'btn-secondary-custom' :'btn-login' }` } type="submit" style={{fontSize:'14px', paddingLeft:'60px', paddingRight:'60px', paddingTop:'12px', paddingBottom:'12px'}} onClick={ () => {
                if(isCheck) {
                    Swal.fire({
                        title: 'Error',
                        text: 'Wajib dicentang untuk melanjutkan registrasi anda',
                        confirmButtonColor: '#0099ff'
                    })
                } else {
                    navigate('/register')
                }
            } }>SUBMIT</button>
        </div>
    )
} 

export default ConditionFooter

