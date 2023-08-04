import { Component } from "react";

export default class extends Component {
    render() {
        return(
            <>
            <div className="container mb-5">
                <div className="text-center">
                    <div className="card-title mx-auto my-3" style={{borderBottom:'3px solid #014C90', width:'125px'}}>
                        <h4 className="title-icare" style={{fontSize:'16px'}}>Kebijakan Privasi</h4>
                    </div>
                    <div className="card text-center p-2 mx-auto mb-2" style={{border:'1px solid', borderRadius:'30px', width:'54%'}}>
                        <p className="lh-sm" style={{fontSize:'10.5px'}}>
                            iCare merupakan aplikasi berbasis internet &#40;selanjutnya disebut &#34;Aplikasi&#34;&#41; yang dikelola oleh PT Astra Graphia Tbk &#40;selanjutnya disebut &#34;Astragraphia&#34;&#41;. Melindungi privasi individu diinternet sangat penting untuk masa depan bisnis berbasis internet dan pergerakan menuju ekonomi internet yang sebenarnya. Astragraphia telah membuat Pernyataan Privasi ini untuk menunjukkan komitmen tegas terhadap hak individu atas perlindungan data dan privasi. Pernyataan ini menguraikan bagaimana Astragraphia menangani informasi yang dapat digunakan untuk mengidentifikasi seseorang secara langsung atau tidak langsung &#40;&#34;Data Pribadi&#34;&#41;. Astragraphia dapat mengubah atau mengganti Kebijakan Data Pribadi ini. <br/><br/>
                            Dengan mendaftar dan menggunakan Aplikasi, Pelanggan menyatakan bahwa setiap data dan informasi yang diberikan adalah benar dan sah serta memberikan persetujuan kepada Astragraphia untuk memperoleh, mengumpulkan, menyimpan, mengelola dan mempergunakan data dan informasi tersebut sesuai dengan Ketentuan dan Kebijakan Privasi ini.
                        </p>
                    </div>
                    <p className="text-danger" style={{fontSize:'10.5px'}}><u>&#42;Mohon baca sepenuhnya kebijakan ini</u></p>
                </div>
            </div>
            </>
        )
    }
}