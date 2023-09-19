import { Component } from "react";
import { Link } from "react-router-dom";


export default class extends Component {
    render(){
        return(
            <>
                <div className="py-lg-3 py-md-3 py-5">
                    <div className="responsive-bar p-15px" style={{alignItems: 'baseline', height: '55px'}}>
                        <Link className="nav-link" to="/dashboard">
                            <i className="fa fa-arrow-left me-3" style={{color: '#014C90', fontSize: '18px'}}></i>
                        </Link>
                    </div>
                    <div className="responsive-news card px-md-4 px-1 shadow">
                        <div className="card-body">
                            <div className="row">
                                <div className="fw-bold mb-3">
                                    <h5 className="title-icare fw-bold">Dukung Pelaku Ekonomi Kreatif, Astragraphia Berkolaborasi Dengan Kemenparekraf dalam Program Apresiasi Kreasi Indonesia (AKI) 2023</h5>
                                    <span style={{fontSize: '14px'}}>2023-09-10 09:00:00</span>
                                </div>
                                <div className="mb-3">
                                    <img src="images/banner-news1.jpg" alt="" style={{maxWidth: 'inherit'}}/>
                                </div>
                                <div style={{fontSize: '14px'}}>
                                    <p>Sudah bukan rahasia lagi bahwa Usaha Kecil dan Menengah (UKM) di Indonesia memiliki potensi ekonomi yang besar, apalagi dengan pengelolaan manajemen yang baik. Oleh karena itu pemerintah melalui lembaga kementerian, salah satunya Kementerian Pariwisata dan Ekonomi Kreatif (Kemenparekraf), menyelenggarakan rangkaian Apresiasi Kreasi Indonesia (AKI) 2023, yang termasuk di dalamnya proses kurasi, pembekalan/bootcamp, pameran, hingga festival puncak.</p>
                                    
                                    <p>Astragraphia sebagai perusahaan publik yang juga berkomitmen pada peningkatan ekonomi kreatif, turut berperan serta pada event pameran AKI 2023, yang diikuti oleh 316 UKM sektor kuliner, kriya, fesyen, aplikasi, film dan musik, dan dijadwalkan berlangsung selama bulan Juni – Agustus 2023 di 16 kota/kabupaten di Indonesia. </p>
                                    
                                    <p>Pada bulan Juni Astragraphia hadir di lima kota yaitu Jakarta, Bangka, Kudus, Purwokerto dan Mojokerto, diwakili oleh tim dari kantor cabang masing-masing. Astragraphia membuka booth yang memamerkan berbagai contoh aplikasi kemasan kreatif, yang dicetak dengan mesin cetak produksi FUJIFILM Business Innovation.</p>
                                    
                                    <p>Astragraphia secara khusus juga memberikan konsultasi desain dengan menggandeng graphic art rekanan dan Asosiasi Profesional Desain Komunikasi Visual Indonesia (AIDIA) sebagai narasumber yang memberikan masukan seputar kemasan kreatif. Ke-316 UKM yang berhasil lolos kurasi Kemenparekraf dan mengikuti pameran AKI 2023, juga berkesempatan untuk mendapatkan voucer cetak stiker, label, serta berbagai kebutuhan promosi lainnya secara gratis, di graphic art rekanan Astragraphia, sesuai dengan domisili UKM.</p>
                                    
                                    <p>Di tahun ketiganya ini, rangkaian event Apresiasi Kreasi Indonesia (AKI) 2023 masih akan berlanjut di kota-kota lainnya antara lain: Samarinda, Jayapura, Batam, Bengkulu, Gorontalo, Palangkaraya, Manado, Kupang, Surabaya, Karawang, dan Bogor. </p>
                                    
                                    <p>Peran serta Astragraphia dalam AKI 2023 ini merupakan perwujudan tanggung jawab sosial perusahaan di pilar kewirausahaan, sejalan dengan budaya perusahaan <strong>Valuable to The Nation and Life</strong>, serta mendukung program pembangunan nasional Social Development Goals (SDGs) 8 tentang Decent Work and Economic Growth.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}