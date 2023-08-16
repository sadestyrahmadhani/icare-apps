import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../../component/navbar";
import Footer from "../../component/footer";

function ConditionFooter() {
    const Params = useParams() 
    return(
            <>
                <Navbar versi="2" />
                <div className="container mb-5">
                    <div className="text-center pt-4">
                        <div className="card-title mx-auto my-3" style={{borderBottom:'3px solid #014C90', width:'155px'}}>
                            <h5 className="title-icare fw-bold">Kebijakan Privasi</h5>
                        </div>
                        <div className="card text-center p-2 mx-auto mb-2" style={{border:'1px solid', borderRadius:'30px', width:'70%'}}>
                            <p className="lh-sm" style={{fontSize:'13px'}}>
                                iCare merupakan aplikasi berbasis internet &#40;selanjutnya disebut &#34;Aplikasi&#34;&#41; yang dikelola oleh PT Astra Graphia Tbk &#40;selanjutnya disebut &#34;Astragraphia&#34;&#41;. Melindungi privasi individu diinternet sangat penting untuk masa depan bisnis berbasis internet dan pergerakan menuju ekonomi internet yang sebenarnya. Astragraphia telah membuat Pernyataan Privasi ini untuk menunjukkan komitmen tegas terhadap hak individu atas perlindungan data dan privasi. Pernyataan ini menguraikan bagaimana Astragraphia menangani informasi yang dapat digunakan untuk mengidentifikasi seseorang secara langsung atau tidak langsung &#40;&#34;Data Pribadi&#34;&#41;. Astragraphia dapat mengubah atau mengganti Kebijakan Data Pribadi ini. <br/><br/>
                                Dengan mendaftar dan menggunakan Aplikasi, Pelanggan menyatakan bahwa setiap data dan informasi yang diberikan adalah benar dan sah serta memberikan persetujuan kepada Astragraphia untuk memperoleh, mengumpulkan, menyimpan, mengelola dan mempergunakan data dan informasi tersebut sesuai dengan Ketentuan dan Kebijakan Privasi ini.
                            </p>
                        </div>
                        <p className="text-danger" style={{fontSize:'12px'}}><u>&#42;Mohon baca sepenuhnya kebijakan ini</u></p>
                        {   
                            Params?.type == 'register' ? <ConditionRegister /> : ""
                        }                        
                    </div>
                </div>
                <Footer />
            </>
    )
}

function ConditionRegister(props) {
    const [isCheck, setIsCheck] = useState(true)
    return(
        <div className="text">
            <input type="checkbox" id="checklist" onChange={ () => setIsCheck(!isCheck) } /> 
            <label className="mb-4" style={{fontSize:'12px'}} htmlFor="checklist" >Saya setuju dengan kebijakan ini</label> <br/>
            <Link className={ `btn btn-login fw-medium rounded-3 ${ isCheck ? 'disabled' :'' }` } style={{fontSize:'14px', paddingLeft:'70px', paddingRight:'70px', paddingTop:'15px', paddingBottom:'15px'}} to="/register" >SUBMIT</Link>
        </div>
    )
} 

export default ConditionFooter

