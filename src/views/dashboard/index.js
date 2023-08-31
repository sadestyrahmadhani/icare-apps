import { Component } from "react";
import footer from "../../component/footer";
import { Link } from "react-router-dom";

export default class extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menuItems: [
                {
                    title:'Breakfix',
                    imgIcon:'images/breakfix.png',
                    url:'/breakfix-request'
                },
                {
                    title:'Supplies',
                    imgIcon:'images/supplies.png',
                    url:'/supplies'
                },
                {
                    title:'Install',
                    imgIcon:'images/install.png',
                    url:'/install'
                },
                {
                    title:'Collect Meter',
                    imgIcon:'images/collectMeter.png',
                    url:'/collect-meter'
                },
                {
                    title:'Call Center',
                    imgIcon:'images/callCenter.png',
                    url:'/call-center'
                },
                {
                    title:'Informasi',
                    imgIcon:'images/informasiTagihan.png',
                    url:'/informasi'
                },
            ],
            dataNews: [
                {
                    imgNews:'images/astragraphiaNews.png',
                    date:'2023-06-28 10:00:00',
                    titleNews:'Astragraphia Cabang Batam Gelar Workshop dan Update Teknologi Produk Serta Solusi Bagi Pelanggan Di Wilayah Tanjung Pinang'
                },
                {
                    imgNews:'images/astragraphiaNews.png',
                    date:'2023-06-28 10:00:00',
                    titleNews:'Astragraphia Cabang Batam Gelar Workshop dan Update Teknologi Produk Serta Solusi Bagi Pelanggan Di Wilayah Tanjung Pinang'
                },
                {
                    imgNews:'images/astragraphiaNews.png',
                    date:'2023-06-28 10:00:00',
                    titleNews:'Astragraphia Cabang Batam Gelar Workshop dan Update Teknologi Produk Serta Solusi Bagi Pelanggan Di Wilayah Tanjung Pinang'
                },
                {
                    imgNews:'images/astragraphiaNews.png',
                    date:'2023-06-28 10:00:00',
                    titleNews:'Astragraphia Cabang Batam Gelar Workshop dan Update Teknologi Produk Serta Solusi Bagi Pelanggan Di Wilayah Tanjung Pinang'
                },
                {
                    imgNews:'images/astragraphiaNews.png',
                    date:'2023-06-28 10:00:00',
                    titleNews:'Astragraphia Cabang Batam Gelar Workshop dan Update Teknologi Produk Serta Solusi Bagi Pelanggan Di Wilayah Tanjung Pinang'
                },
                {
                    imgNews:'images/astragraphiaNews.png',
                    date:'2023-06-28 10:00:00',
                    titleNews:'Astragraphia Cabang Batam Gelar Workshop dan Update Teknologi Produk Serta Solusi Bagi Pelanggan Di Wilayah Tanjung Pinang'
                },
            ]
        }
    }

    limitChar(text, limit, surfix) {
        var a = ""
        for(var i = 0; i < limit; i++) {
            a += text.charAt(i)
        }
        a += surfix
        return a
    } 

    render() {
        return(
            <> 
                <div className="col-md-7 col-12 mx-auto py-xs-0 m-0">
                    <img src="images/beranda.png" alt="Beranda" width='100%' />
                    <div className="row col-md-12 col-10 my-md-5 my-4 m-0 mx-auto menus">
                        { this.state.menuItems.map((value, key) => (
                            <div className="col-4 text-center" key={key}>
                                <Link className="list-items mb-4" to={value.url} >
                                    <div className="col-md-5 col-8 mx-auto mb-2">
                                        <img src={value.imgIcon} alt={value.title} width="100%" />
                                    </div>
                                    <p className="small fw-bold">{value.title}</p>
                                </Link>
                            </div>
                        )) }
                    </div> 
                </div>
                <div className="col-10 col-md-12 mx-auto py-xs-0 mb-4">
                    <div className="d-flex align-items-center w-100 mb-3 mb-md-5">
                        <hr className="w-100 h-style" style={{border:'1px solid #014C90'}}/>
                        <h3 className="d-block mx-3 mx-md-5" style={{whiteSpace:'nowrap', color:'#014C90'}}>Astragraphia News</h3>
                        <hr className="w-100 h-style" style={{border:'1px solid #014C90'}}/>
                    </div>
                    <div className="card news border-0 mx-auto text-white mb-4" style={{position:'relative', background:'rgba(0,0,0,.3'}}>
                        <div style={{position:"absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: -1, overflow:'hidden'}} >
                            <img src="images/astragraphiaNews.png" alt="Astragraphia News" width="100%" height="100%" />
                        </div> 
                        <div className="py-4 p-md-5 d-md-block d-none">
                            <p className="card-text">2023-07-21 19:00:00</p>
                            <h5 className="card-title fw-bold">Astragraphia Customer Gathering 2023: Sebuah Sinergi Untuk Bertumbuh Berkelanjutan dan Terus Berkembang Bersama</h5>
                            <h4 className="card-title fw-bold">Astragraphia Customer Gathering 2023: Sebuah Sinergi Untuk Bertumbuh Berkelanjutan dan Terus Berkembang Bersama</h4>
                            <p style={{fontSize:'14px'}}>Astragraphia selenggarakan Customer Gathering 2023 yang menghadirkan pelanggan Graphic Art dari berbagai daerah untuk Bapak/Ibu dapat memperluas jaringan, berbagai pengetahuan, dan memperoleh inspirasi baru tentang update tren bisnis printing.</p>
                        </div>
                        <div className="p-4 d-md-none d-block">
                            <p className="card-text fw-bold">2023-07-21 19:00:00</p>
                            <h5 className="card-title fw-bold"> Astragraphia Customer Gathering 2023: Sebuah Sinergi Untuk Bertumbuh Berkelanjutan dan Terus Berkembang Bersama </h5> 
                            <h4 className="card-title fw-bold"> { this.limitChar("Astragraphia Customer Gathering 2023: Sebuah Sinergi Untuk Bertumbuh Berkelanjutan dan Terus Berkembang Bersama", 50, "...") } </h4>
                            <p> { this.limitChar("Astragraphia selenggarakan Customer Gathering 2023 yang menghadirkan pelanggan Graphic Art dari berbagai daerah untuk Bapak/Ibu dapat memperluas jaringan, berbagai pengetahuan, dan memperoleh inspirasi baru tentang update tren bisnis printing.", 70, "...") } </p>
                        </div>
                    </div>
                    <div className="row m-0 card-news">
                        { this.state.dataNews.map((value, key) => (
                            <div className="col-md-4 col-12 mb-5">
                                <div className="card h-100 border-0 mx-0" style={{backgroundColor:'#EBEBEB'}} >
                                    <div className="m-2 border">
                                        <img src={value.imgNews} className=" w-100" alt="Astragraphia News" />
                                    </div>  
                                    <div className="card-body" key={key}>
                                        <p className="card-text">{value.date}</p>
                                        <h6 className="card-title fw-bold">{value.titleNews}</h6>
                                    </div>
                                </div>
                            </div>
                        )) } 
                    </div>
                </div>



                {/* <div className="container py-xs-0">
                        <div className="row justify-content-md-center">
                            <div className="col-8">
                                <img src="images/beranda.png" className="img-fluid" alt="Beranda"></img>
                            </div>
                        </div>
                    <div className="container text-center">
                        <div className="row justify-content-md-center">
                            <div className="col-8">
                                <div className="container">
                                    <div className="row mt-4">
                                        <div className="col">
                                            <Link className="list-items" to="../breakfix-request" style={{textDecoration:'none'}}>
                                                <div className="img">
                                                    <img src="images/breakfix.png" alt="Logo Breakfix" height={103}></img>
                                                </div>
                                                <h6 className="mt-2" style={{fontSize:'14px'}}>Breakfix</h6>
                                            </Link>
                                        </div>
                                        <div className="col">
                                            <Link className="list-items" to="../upgrade_step1" style={{textDecoration:'none'}}>
                                                <div className="img">
                                                    <img src="images/supplies.png" alt="Logo Supplies" height={103}></img>
                                                </div>
                                                <h6 className="mt-2" style={{fontSize:'14px'}}>Supplies</h6>
                                            </Link>
                                        </div>
                                        <div className="col">
                                            <Link className="list-items" to="../install" style={{textDecoration:'none'}}>
                                                <div className="img">
                                                    <img src="images/install.png" alt="Logo Install" height={103}></img>
                                                </div>
                                                <h6 className="mt-2" style={{fontSize:'14px'}}>Install</h6>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="container">
                                    <div className="row mt-4">
                                        <div className="col">
                                            <Link className="list-items" to="../collect-meter" style={{textDecoration:'none'}}>
                                                <div className="img">
                                                    <img src="images/collectMeter.png" alt="Logo Collect Meter" height={103}></img>
                                                </div>
                                                <h6 className="mt-2" style={{fontSize:'14px'}}>Collect Meter</h6>
                                            </Link>
                                        </div>
                                        <div className="col">
                                            <Link className="list-items" to="" style={{textDecoration:'none'}}>
                                                <div className="img">
                                                    <img src="images/callCenter.png" alt="Logo Call Center" height={103}></img>
                                                </div>
                                                <h6 className="mt-2" style={{fontSize:'14px'}}>Call Center</h6>
                                            </Link>
                                        </div>
                                        <div className="col">
                                            <Link className="list-items" to="https://ebillingportal.documentsolution.com/#/invoice-customer" style={{textDecoration:'none'}}>
                                                <div className="img">
                                                    <img src="images/informasiTagihan.png" alt="Logo Informasi Tagihan" height={103}></img>
                                                </div>
                                                <h6 className="mt-2" style={{fontSize:'14px'}}>Informasi Tagihan</h6>
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
                </div> */}
            </>
        )
    }
}