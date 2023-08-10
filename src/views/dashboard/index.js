import { Component } from "react";
import footer from "../../component/footer";
import { Link } from "react-router-dom";

export default class extends Component {
    render() {
        return(
            <>
                <div className="container">
                        <div className="row justify-content-md-center">
                            <div className="col-8">
                                <img src="images/beranda.png" className="img-fluid" alt="Beranda"></img>
                            </div>
                        </div>
                    <div className="container text-center">
                        <div className="row justify-content-md-center">
                            <div className="col-6">
                                <div className="container">
                                    <div className="row pt-5">
                                        <div className="col">
                                            <Link className="list-items" to="../breakfix" style={{textDecoration:'none'}}>
                                                <div className="img">
                                                    <img src="images/breakfix.png" alt="Logo Breakfix" height={100}></img>
                                                </div>
                                                <h6 className="pt-2">Breakfix</h6>
                                            </Link>
                                        </div>
                                        <div className="col">
                                            <Link className="list-items" to="../supplies" style={{textDecoration:'none'}}>
                                                <div className="img">
                                                    <img src="images/supplies.png" alt="Logo Supplies" height={100}></img>
                                                </div>
                                                <h6 className="pt-2">Supplies</h6>
                                            </Link>
                                        </div>
                                        <div className="col">
                                            <Link className="list-items" to="../install" style={{textDecoration:'none'}}>
                                                <div className="img">
                                                    <img src="images/install.png" alt="Logo Install" height={100}></img>
                                                </div>
                                                <h6 className="pt-2">Install</h6>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="container">
                                    <div className="row pt-5">
                                        <div className="col">
                                            <Link className="list-items" to="../collect-meter" style={{textDecoration:'none'}}>
                                                <div className="img">
                                                    <img src="images/collectMeter.png" alt="Logo Collect Meter" height={100}></img>
                                                </div>
                                                <h6 className="pt-2">Collect Meter</h6>
                                            </Link>
                                        </div>
                                        <div className="col">
                                            <Link className="list-items" to="" style={{textDecoration:'none'}}>
                                                <div className="img">
                                                    <img src="images/callCenter.png" alt="Logo Call Center" height={100}></img>
                                                </div>
                                                <h6 className="pt-2">Call Center</h6>
                                            </Link>
                                        </div>
                                        <div className="col">
                                            <Link className="list-items" to="" style={{textDecoration:'none'}}>
                                                <div className="img">
                                                    <img src="images/informasiTagihan.png" alt="Logo Informasi Tagihan" height={100}></img>
                                                </div>
                                                <h6 className="pt-2">Informasi Tagihan</h6>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container pt-5 pb-5">
                        <div className="news pt-5">
                            <div className="d-flex align-items-center w-100 pt-5">
                                <hr className="w-100" style={{color:'#014C90', border:'1px solid'}}/>
                                <div className="title-icare d-block px-4" style={{whiteSpace:'nowrap', fontSize:'30px'}}>Astragraphia News</div>
                                <hr className="w-100" style={{color:'#014C90', border:'1px solid'}}/>
                            </div>
                            <div className="container pt-5">
                                <div className="card text-bg-dark border-0">
                                    <img src="images/astragraphiaNews.png" className="card-img" alt="Astragraphia News"></img>
                                    <div className="card-img-overlay">
                                        <p className="card-text">2023-07-21 19:00:00</p>
                                        <h5 className="card-title">Astragraphia Customer Gathering 2023: Sebuah Sinergi Untuk Bertumbuh Berkelanjutan dan Terus Berkembang Bersama</h5>
                                        <h3 className="card-title">Astragraphia Customer Gathering 2023: Sebuah Sinergi Untuk Bertumbuh Berkelanjutan dan Terus Berkembang Bersama</h3>
                                        <ul>
                                            <li>Astragraphia selenggarakan Customer Gathering 2023 yang menghadirkan pelanggan Graphic Art dari berbagai daerah untuk Bapak/Ibu dapat memperluas jaringan, berbagai pengetahuan, dan memperoleh inspirasi baru tentang update tren bisnis printing.</li>
                                            <li>Astragraphia Customer Gathering 2023 merupakan salah satu dari wujud nyata komitmen Astragraphiadalam melanjutkan implementasi inisiaif serta sebagai sebuah bentuk ungkapan terimakasih Astragraphia untuk Bapak/Ibu yang senantiasa mempercayakan Astragraphia sebagai mitra Graphic Communication dalam mendukung perjalanan bisnis printing Anda dar...</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="container pt-5">
                                <div className="row row-cols-1 row-cols-md-3 g-4">
                                    <div className="col">
                                        <div className="card h-100 border-0" style={{backgroundColor:'#EBEBEB'}}>
                                            <img src="images/astragraphiaNews.png" className="card-img-top" alt="Astragraphia News"></img>
                                            <div className="card-body">
                                                <p className="card-text">2023-06-28 10:00:00</p>
                                                <h6 className="card-title">Astragraphia Cabang Batam Gelar Workshop dan Update Teknologi Produk Serta Solusi Bagi Pelanggan Di Wilayah Tanjung Pinang</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="card h-100 border-0" style={{backgroundColor:'#EBEBEB'}}>
                                            <img src="images/astragraphiaNews.png" className="card-img-top" alt="Astragraphia News"></img>
                                            <div className="card-body">
                                                <p className="card-text">2023-06-28 10:00:00</p>
                                                <h6 className="card-title">Astragraphia Cabang Batam Gelar Workshop dan Update Teknologi Produk Serta Solusi Bagi Pelanggan Di Wilayah Tanjung Pinang</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="card h-100 border-0" style={{backgroundColor:'#EBEBEB'}}>
                                            <img src="images/astragraphiaNews.png" className="card-img-top" alt="Astragraphia News"></img>
                                            <div className="card-body">
                                                <p className="card-text">2023-06-28 10:00:00</p>
                                                <h6 className="card-title">Astragraphia Cabang Batam Gelar Workshop dan Update Teknologi Produk Serta Solusi Bagi Pelanggan Di Wilayah Tanjung Pinang</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="card h-100 border-0" style={{backgroundColor:'#EBEBEB'}}>
                                            <img src="images/astragraphiaNews.png" className="card-img-top" alt="Astragraphia News"></img>
                                            <div className="card-body">
                                                <p className="card-text">2023-06-28 10:00:00</p>
                                                <h6 className="card-title">Astragraphia Cabang Batam Gelar Workshop dan Update Teknologi Produk Serta Solusi Bagi Pelanggan Di Wilayah Tanjung Pinang</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="card h-100 border-0" style={{backgroundColor:'#EBEBEB'}}>
                                            <img src="images/astragraphiaNews.png" className="card-img-top" alt="Astragraphia News"></img>
                                            <div className="card-body">
                                                <p className="card-text">2023-06-28 10:00:00</p>
                                                <h6 className="card-title">Astragraphia Cabang Batam Gelar Workshop dan Update Teknologi Produk Serta Solusi Bagi Pelanggan Di Wilayah Tanjung Pinang</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="card h-100 border-0" style={{backgroundColor:'#EBEBEB'}}>
                                            <img src="images/astragraphiaNews.png" className="card-img-top" alt="Astragraphia News"></img>
                                            <div className="card-body">
                                                <p className="card-text">2023-06-28 10:00:00</p>
                                                <h6 className="card-title">Astragraphia Cabang Batam Gelar Workshop dan Update Teknologi Produk Serta Solusi Bagi Pelanggan Di Wilayah Tanjung Pinang</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="card h-100 border-0" style={{backgroundColor:'#EBEBEB'}}>
                                            <img src="images/astragraphiaNews.png" className="card-img-top" alt="Astragraphia News"></img>
                                            <div className="card-body">
                                                <p className="card-text">2023-06-28 10:00:00</p>
                                                <h6 className="card-title">Astragraphia Cabang Batam Gelar Workshop dan Update Teknologi Produk Serta Solusi Bagi Pelanggan Di Wilayah Tanjung Pinang</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="card h-100 border-0" style={{backgroundColor:'#EBEBEB'}}>
                                            <img src="images/astragraphiaNews.png" className="card-img-top" alt="Astragraphia News"></img>
                                            <div className="card-body">
                                                <p className="card-text">2023-06-28 10:00:00</p>
                                                <h6 className="card-title">Astragraphia Cabang Batam Gelar Workshop dan Update Teknologi Produk Serta Solusi Bagi Pelanggan Di Wilayah Tanjung Pinang</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="card h-100 border-0" style={{backgroundColor:'#EBEBEB'}}>
                                            <img src="images/astragraphiaNews.png" className="card-img-top" alt="Astragraphia News"></img>
                                            <div className="card-body">
                                                <p className="card-text">2023-06-28 10:00:00</p>
                                                <h6 className="card-title">Astragraphia Cabang Batam Gelar Workshop dan Update Teknologi Produk Serta Solusi Bagi Pelanggan Di Wilayah Tanjung Pinang</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}