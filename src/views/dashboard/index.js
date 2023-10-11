import { Component, useState } from "react";
import { Link } from "react-router-dom";
import Riwayat from "../riwayat";
import Informasi from "../informasi";

// function Dashboard() {
//     const [ bottomBarLineWidth, setBottomBarLineWidth ] = useState(0)
//     const [ bottomBarLineOffset, setBottomBarLineOffset ] = useState(0)
//     const [ linePosition, setLinePosition ] = useState(0)
//     const menuItems = [
//         {
//             title:'Breakfix',
//             imgIcon:'images/breakfix.png',
//             url:'/breakfix_request/1'
//         },
//         {
//             title:'Supplies',
//             imgIcon:'images/supplies.png',
//             url:'/upgrade_step1'
//         },
//         {
//             title:'Install',
//             imgIcon:'images/install.png',
//             url:'/install_request'
//         },
//         {
//             title:'Collect Meter',
//             imgIcon:'images/collectMeter.png',
//             url:'/collect_meter'
//         },
//         {
//             title:'Call Center',
//             imgIcon:'images/callCenter.png',
//             url:'/call-center'
//         },
//         {
//             title:'Informasi Tagihan',
//             imgIcon:'images/informasiTagihan.png',
//             url:'/informasi'
//         },
//     ]
//     const dataNews = [
//         {
//             imgNews:'images/apeos7580-6580.png',
//             date:'2023-09-15 10:00:00',
//             titleNews:'Apeos 7580 / 6580',
//             redirect:'/product_detail'
//         },
//         {
//             imgNews:'images/astragraphiaNews.png',
//             date:'2023-06-28 10:00:00',
//             titleNews:'Astragraphia Cabang Batam Gelar Workshop dan Update Teknologi Produk Serta Solusi Bagi Pelanggan Di Wilayah Tanjung Pinang'
//         },
//         {
//             imgNews:'images/astragraphiaNews.png',
//             date:'2023-06-28 10:00:00',
//             titleNews:'Astragraphia Cabang Batam Gelar Workshop dan Update Teknologi Produk Serta Solusi Bagi Pelanggan Di Wilayah Tanjung Pinang'
//         },
//         {
//             imgNews:'images/astragraphiaNews.png',
//             date:'2023-06-28 10:00:00',
//             titleNews:'Astragraphia Cabang Batam Gelar Workshop dan Update Teknologi Produk Serta Solusi Bagi Pelanggan Di Wilayah Tanjung Pinang'
//         },
//         {
//             imgNews:'images/astragraphiaNews.png',
//             date:'2023-06-28 10:00:00',
//             titleNews:'Astragraphia Cabang Batam Gelar Workshop dan Update Teknologi Produk Serta Solusi Bagi Pelanggan Di Wilayah Tanjung Pinang'
//         },
//         {
//             imgNews:'images/astragraphiaNews.png',
//             date:'2023-06-28 10:00:00',
//             titleNews:'Astragraphia Cabang Batam Gelar Workshop dan Update Teknologi Produk Serta Solusi Bagi Pelanggan Di Wilayah Tanjung Pinang'
//         },
//     ]

//     const limitChar = (text, limit, surfix) => {
//         var a = ""
//         for(var i = 0; i < limit; i++) {
//             a += text.charAt(i)
//         }
//         a += surfix
//         return a
//     } 

//     const navigationScroll = (e) => {
//         e.preventDefault();
//         var parent = e.target.getAttribute('parent')

//         if(parent == 0) {
//             document.getElementById('contentMenus').scroll({
//                 left: 0,
//                 behavior: 'smooth'
//             })
//             return
//         }

//         if(parent == 1) {
//             document.getElementById('contentMenus').scroll({
//                 left: bottomBarLineWidth,
//                 behavior: 'smooth'
//             })
//             return
//         }

//         if(parent == 2) {
//             document.getElementById('contentMenus').scroll({
//                 left: bottomBarLineWidth * 2,
//                 behavior: 'smooth'
//             })
//             return
//         }
//     }

//     const componentDidMount = () => {
//         var nodes = document.querySelectorAll('.menu-items')
//         setBottomBarLineOffset(nodes[nodes.length - 1].getBoundingClientRect().right - window.innerWidth)
//         setBottomBarLineWidth(nodes[nodes.length - 1].getBoundingClientRect().right / nodes.length)
        
//         document.getElementById('contentMenus').addEventListener('scroll', handleScroll)
//     }

//     const componentWillUnmount = () => {
//         document.getElementById('contentMenus').removeEventListener('scroll', handleScroll)
//     }

//     const handleScroll = (e) => {
//         var state = useState()
//         setLinePosition((e.target.scrollLeft * (bottomBarLineWidth - (bottomBarLineWidth / 3))) / bottomBarLineOffset)

//         e.target.addEventListener('touchend', function() {
//             if(e.target.scrollLeft < (state.bottomBarLineWidth / 2)) {
//                 e.target.scroll({
//                     left: 0,
//                     behavior: 'smooth'
//                 })
//                 return
//             }

//             if(e.target.scrollLeft < (state.bottomBarLineWidth + (state.bottomBarLineWidth / 2))) {
//                 e.target.scroll({
//                     left: state.bottomBarLineWidth,
//                     behavior: 'smooth'
//                 })
//                 return
//             }

//             if(e.target.scrollLeft < ((state.bottomBarLineWidth * 2) - (state.bottomBarLineWidth / 2))) {
//                 e.target.scroll({
//                     left: state.bottomBarLineWidth,
//                     behavior: 'smooth'
//                 })
//                 return
//             }

//             if(e.target.scrollLeft < ((state.bottomBarLineWidth * 2) + (state.bottomBarLineWidth / 2))) {
//                 e.target.scroll({
//                     left: state.bottomBarLineWidth * 2,
//                     behavior: 'smooth'
//                 })
//                 return
//             }
//         })

//         e.target.addEventListener('scrollend', function() {
//             if(e.target.scrollLeft < (state.bottomBarLineWidth / 2)) {
//                 e.target.scroll({
//                     left: 0,
//                     behavior: 'smooth'
//                 })
//                 return
//             }

//             if(e.target.scrollLeft < (state.bottomBarLineWidth + (state.bottomBarLineWidth / 2))) {
//                 e.target.scroll({
//                     left: state.bottomBarLineWidth,
//                     behavior: 'smooth'
//                 })
//                 return
//             }

//             if(e.target.scrollLeft < ((state.bottomBarLineWidth * 2) - (state.bottomBarLineWidth / 2))) {
//                 e.target.scroll({
//                     left: state.bottomBarLineWidth,
//                     behavior: 'smooth'
//                 })
//                 return
//             }

//             if(e.target.scrollLeft < ((state.bottomBarLineWidth * 2) + (state.bottomBarLineWidth / 2))) {
//                 e.target.scroll({
//                     left: state.bottomBarLineWidth * 2,
//                     behavior: 'smooth'
//                 })
//                 return
//             }
//         })
//     }

//     return(
//         <> 
//         <div className="content-menus" id="contentMenus">
//             <div className="menu-items col-12">
//                 <Link className="text-white" to="/settings" style={{ position: 'absolute', top: 15, right: 20, fontSize:'26px', zIndex:'11111' }}><i className="fa fa-cog d-md-none"></i></Link>
//                 <div className="col-md-7 col-12 mx-auto py-xs-0 m-0">
//                     <img className="banner-desktop d-md-block d-none" src="images/banner1.png" alt="Beranda" width='100%'/>
//                     <img className="banner-desktop d-md-none d-block" src="images/bannerMobile-edit.png" alt="Beranda" width='100%'/>
//                     <div className="row col-md-12 col-9 my-md-3 m-0 mx-auto menus justify-content-center">
//                         { menuItems.map((value, key) => (
//                             <div className="col-4 text-center mb-md-4" key={key}>
//                                 <Link className="list-items" to={value.url} >
//                                     <div className="col-md-5 col-12 mx-auto mb-2 menus-icon" style={{width:'45%'}}>
//                                         <img src={value.imgIcon} alt={value.title} width="100%" />
//                                     </div>
//                                     <p className="menus-title small fw-bold">{value.title}</p>
//                                 </Link>
//                             </div>
//                         )) }
//                     </div> 
//                 </div>
//                 <div className="col-10 col-md-12 mx-auto py-xs-0 mb-4">
//                     <div className="d-flex align-items-center w-100 mb-3 mb-md-5">
//                         <hr className="w-100 h-style" style={{border:'1px solid #014C90'}}/>
//                         <h3 className="d-block mx-3 mx-md-5" style={{whiteSpace:'nowrap', color:'#014C90'}}>Astragraphia News</h3>
//                         <hr className="w-100 h-style" style={{border:'1px solid #014C90'}}/>
//                     </div>
//                     <Link to="/news_detail" style={{textDecoration: 'none'}}>
//                     <div className="card news border-0 mx-auto text-white mb-4" style={{position:'relative', background:'rgba(0,0,0,.3'}}>
//                         <div style={{position:"absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: -1, overflow:'hidden'}} >
//                             {/* <img src="images/astragraphiaNews.png" alt="Astragraphia News" width="100%" height="100%" /> */}
//                             <img src="images/banner-news1.jpg" alt="Astragraphia News" className="banner-news"/>
//                         </div> 
//                         <div className="py-4 p-md-5 d-md-block d-none">
//                             <p className="card-text">2023-07-21 19:00:00</p>
//                             <h5 className="card-title fw-bold">Dukung Pelaku Ekonomi Kreatif, Astragraphia Berkolaborasi Dengan Kemenparekraf dalam Program Apresiasi Kreasi Indonesia (AKI) 2023</h5>
//                             <h4 className="card-title fw-bold">Dukung Pelaku Ekonomi Kreatif, Astragraphia Berkolaborasi Dengan Kemenparekraf dalam Program Apresiasi Kreasi Indonesia (AKI) 2023</h4>
//                             <p style={{fontSize:'14px'}}><strong>Jakarta, 8-10 September 2023</strong> { limitChar("- Sudah bukan rahasia lagi bahwa Usaha Kecil dan Menengah (UKM) di Indonesia memiliki potensi ekonomi yang besar, apalagi dengan pengelolaan manajemen yang baik.Oleh karena itu pemerintah melalui lembaga kementerian, salah satunya Kementerian Pariwisata dan Ekonomi Kreatif (Kemenparekraf), menyelenggarakan rangkaian Apresiasi Kreasi Indonesia (AKI) 2023, yang termasuk di dalamnya proses kurasi, pembekalan/bootcamp, pameran, hingga festival puncak.", 280, "...")}</p>
//                         </div>
//                         <div className="p-4 d-md-none d-block">
//                             <p className="card-text fw-bold">2023-07-21 19:00:00</p>
//                             <h5 className="card-title fw-bold"> Dukung Pelaku Ekonomi Kreatif, Astragraphia Berkolaborasi Dengan Kemenparekraf dalam Program Apresiasi Kreasi Indonesia (AKI) 2023</h5> 
//                             <h4 className="card-title fw-bold"> { limitChar("Dukung Pelaku Ekonomi Kreatif, Astragraphia Berkolaborasi Dengan Kemenparekraf dalam Program Apresiasi Kreasi Indonesia (AKI) 2023", 50, "...") } </h4>
//                             <p style={{fontSize: '14px'}}> <strong>Jakarta, 8-10 September 2023</strong> { limitChar(" - Sudah bukan rahasia lagi bahwa Usaha Kecil dan Menengah (UKM) di Indonesia memiliki potensi ekonomi yang besar, apalagi dengan pengelolaan manajemen yang baik.", 70, "...") } </p>
//                         </div>
//                     </div>
//                     </Link>
//                     <div className="row m-0 card-news">
//                         { dataNews.map((value, key) => (
//                             <div className="col-md-4 col-12 mb-5" key={ key }>
//                                 <Link to={value.redirect} style={{textDecoration: 'none'}}>
//                                     <div className="card h-100 border-0 mx-0" style={{backgroundColor:'#EBEBEB'}} >
//                                         <div className="m-2 border">
//                                             <img src={value.imgNews} className=" w-100" alt="Astragraphia News" />
//                                         </div>  
//                                         <div className="card-body" key={key}>
//                                             <p className="card-text">{value.date}</p>
//                                             <h6 className="card-title fw-bold">{value.titleNews}</h6>
//                                         </div>
//                                     </div>
//                                 </Link>
//                             </div>
//                         )) } 
//                     </div>
//                 </div>
//             </div>
//             <div className="menu-items col-12 d-md-none d-block">
//                 <Riwayat />
//             </div>
//             <div className="menu-items col-12 d-md-none d-block">
//                 <Informasi />
//             </div>
//         </div>
//         <div className="bottom-bar d-md-none d-flex">
//             <a href="" onClick={ navigationScroll } parent={ 0 } className="col-4 text-center">
//                 <i style={{ pointerEvents: 'none', fontSize:'22px' }} className="fa fa-home "></i>
//                 <span className="menus-bottom" style={{ pointerEvents: 'none', fontSize:'12px' }}>BERANDA</span>
//             </a>
//             <a href="" onClick={ navigationScroll } parent={ 1 } className="col-4 text-center">
//                 <i style={{ pointerEvents: 'none', fontSize:'22px' }} className="fa fa-clipboard"></i>
//                 <span className="menus-bottom" style={{ pointerEvents: 'none', fontSize:'12px' }}>RIWAYAT</span>
//             </a>
//             <a href="" onClick={ navigationScroll } parent={ 2 } className="col-4 text-center">
//                 <i style={{ pointerEvents: 'none', fontSize:'22px' }} className="fa fa-bell"></i>
//                 <span className="menus-bottom" style={{ pointerEvents: 'none', fontSize:'12px' }}>INFORMASI</span>
//             </a>
//             <div className="bottom-bar-line" style={{ left: linePosition }}></div>
//         </div>
//         </>
//     )
// }

// export default Dashboard

export default class extends Component {
    constructor(props) {
        super(props)
        this.handleScroll = this.handleScroll.bind(this)
        this.navigationScroll = this.navigationScroll.bind(this)
        this.state = {
            bottomBarLineWidth: 0,
            bottomBarLineOffset: 0,
            linePosition: 0,
            menuItems: [
                {
                    title:'Breakfix',
                    imgIcon:'images/breakfix.png',
                    url:'/breakfix_request'
                },
                {
                    title:'Supplies',
                    imgIcon:'images/supplies.png',
                    url:'/upgrade_step1'
                },
                {
                    title:'Install',
                    imgIcon:'images/install.png',
                    url:'/install_request'
                },
                {
                    title:'Collect Meter',
                    imgIcon:'images/collectMeter.png',
                    url:'/collect_meter'
                },
                {
                    title:'Call Center',
                    imgIcon:'images/callCenter.png',
                    url:'/call-center'
                },
                {
                    title:'Informasi Tagihan',
                    imgIcon:'images/informasiTagihan.png',
                    url:'/informasi'
                },
            ],
            dataNews: [
                {
                    imgNews:'images/apeos7580-6580.png',
                    date:'2023-09-15 10:00:00',
                    titleNews:'Apeos 7580 / 6580',
                    redirect:'/product_detail'
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
            <div className="content-menus" id="contentMenus">
                <div className="menu-items col-12">
                    <Link className="text-white" to="/settings" style={{ position: 'absolute', top: 15, right: 20, fontSize:'26px', zIndex:'11111' }}><i className="fa fa-cog d-md-none"></i></Link>
                    <div className="col-md-7 col-12 mx-auto py-xs-0 m-0">
                        <img className="banner-desktop d-md-block d-none" src="images/banner1.png" alt="Beranda" width='100%'/>
                        <img className="banner-desktop d-md-none d-block" src="images/bannerMobile-edit.png" alt="Beranda" width='100%'/>
                        <div className="row col-md-12 col-9 my-md-3 m-0 mx-auto menus justify-content-center">
                            { this.state.menuItems.map((value, key) => (
                                <div className="col-4 text-center mb-md-4" key={key}>
                                    <Link className="list-items" to={value.url} >
                                        <div className="col-md-5 col-12 mx-auto mb-2 menus-icon" style={{width:'45%'}}>
                                            <img src={value.imgIcon} alt={value.title} width="100%" />
                                        </div>
                                        <p className="menus-title small fw-bold">{value.title}</p>
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
                        <Link to="/news_detail" style={{textDecoration: 'none'}}>
                        <div className="card news border-0 mx-auto text-white mb-4" style={{position:'relative', background:'rgba(0,0,0,.3'}}>
                            <div style={{position:"absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: -1, overflow:'hidden'}} >
                                {/* <img src="images/astragraphiaNews.png" alt="Astragraphia News" width="100%" height="100%" /> */}
                                <img src="images/banner-news1.jpg" alt="Astragraphia News" className="banner-news"/>
                            </div> 
                            <div className="py-4 p-md-5 d-md-block d-none">
                                <p className="card-text">2023-07-21 19:00:00</p>
                                <h5 className="card-title fw-bold">Dukung Pelaku Ekonomi Kreatif, Astragraphia Berkolaborasi Dengan Kemenparekraf dalam Program Apresiasi Kreasi Indonesia (AKI) 2023</h5>
                                <h4 className="card-title fw-bold">Dukung Pelaku Ekonomi Kreatif, Astragraphia Berkolaborasi Dengan Kemenparekraf dalam Program Apresiasi Kreasi Indonesia (AKI) 2023</h4>
                                <p style={{fontSize:'14px'}}><strong>Jakarta, 8-10 September 2023</strong> { this.limitChar("- Sudah bukan rahasia lagi bahwa Usaha Kecil dan Menengah (UKM) di Indonesia memiliki potensi ekonomi yang besar, apalagi dengan pengelolaan manajemen yang baik.Oleh karena itu pemerintah melalui lembaga kementerian, salah satunya Kementerian Pariwisata dan Ekonomi Kreatif (Kemenparekraf), menyelenggarakan rangkaian Apresiasi Kreasi Indonesia (AKI) 2023, yang termasuk di dalamnya proses kurasi, pembekalan/bootcamp, pameran, hingga festival puncak.", 280, "...")}</p>
                            </div>
                            <div className="p-4 d-md-none d-block">
                                <p className="card-text fw-bold">2023-07-21 19:00:00</p>
                                <h5 className="card-title fw-bold"> Dukung Pelaku Ekonomi Kreatif, Astragraphia Berkolaborasi Dengan Kemenparekraf dalam Program Apresiasi Kreasi Indonesia (AKI) 2023</h5> 
                                <h4 className="card-title fw-bold"> { this.limitChar("Dukung Pelaku Ekonomi Kreatif, Astragraphia Berkolaborasi Dengan Kemenparekraf dalam Program Apresiasi Kreasi Indonesia (AKI) 2023", 50, "...") } </h4>
                                <p style={{fontSize: '14px'}}> <strong>Jakarta, 8-10 September 2023</strong> { this.limitChar(" - Sudah bukan rahasia lagi bahwa Usaha Kecil dan Menengah (UKM) di Indonesia memiliki potensi ekonomi yang besar, apalagi dengan pengelolaan manajemen yang baik.", 70, "...") } </p>
                            </div>
                        </div>
                        </Link>
                        <div className="row m-0 card-news">
                            { this.state.dataNews.map((value, key) => (
                                <div className="col-md-4 col-12 mb-5" key={ key }>
                                    <Link to={value.redirect} style={{textDecoration: 'none'}}>
                                        <div className="card h-100 border-0 mx-0" style={{backgroundColor:'#EBEBEB'}} >
                                            <div className="m-2 border">
                                                <img src={value.imgNews} className=" w-100" alt="Astragraphia News" />
                                            </div>  
                                            <div className="card-body" key={key}>
                                                <p className="card-text">{value.date}</p>
                                                <h6 className="card-title fw-bold">{value.titleNews}</h6>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            )) } 
                        </div>
                    </div>
                </div>
                <div className="menu-items col-12 d-md-none d-block">
                    <Riwayat />
                </div>
                <div className="menu-items col-12 d-md-none d-block">
                    <Informasi />
                </div>
            </div>
            <div className="bottom-bar d-md-none d-flex">
                <a href="" onClick={ this.navigationScroll } parent={ 0 } className="col-4 text-center">
                    <i style={{ pointerEvents: 'none', fontSize:'22px' }} className="fa fa-home "></i>
                    <span className="menus-bottom" style={{ pointerEvents: 'none', fontSize:'12px' }}>BERANDA</span>
                </a>
                <a href="" onClick={ this.navigationScroll } parent={ 1 } className="col-4 text-center">
                    <i style={{ pointerEvents: 'none', fontSize:'22px' }} className="fa fa-clipboard"></i>
                    <span className="menus-bottom" style={{ pointerEvents: 'none', fontSize:'12px' }}>RIWAYAT</span>
                </a>
                <a href="" onClick={ this.navigationScroll } parent={ 2 } className="col-4 text-center">
                    <i style={{ pointerEvents: 'none', fontSize:'22px' }} className="fa fa-bell"></i>
                    <span className="menus-bottom" style={{ pointerEvents: 'none', fontSize:'12px' }}>INFORMASI</span>
                </a>
                <div className="bottom-bar-line" style={{ left: this.state.linePosition }}></div>
            </div>
            </>
        )
    }

    navigationScroll(e) {
        e.preventDefault();
        var parent = e.target.getAttribute('parent')

        if(parent == 0) {
            document.getElementById('contentMenus').scroll({
                left: 0,
                behavior: 'smooth'
            })
            return
        }

        if(parent == 1) {
            document.getElementById('contentMenus').scroll({
                left: this.state.bottomBarLineWidth,
                behavior: 'smooth'
            })
            return
        }

        if(parent == 2) {
            document.getElementById('contentMenus').scroll({
                left: this.state.bottomBarLineWidth * 2,
                behavior: 'smooth'
            })
            return
        }
    }

    componentDidMount() {
        var nodes = document.querySelectorAll('.menu-items')
        this.setState({ bottomBarLineOffset: nodes[nodes.length - 1].getBoundingClientRect().right - window.innerWidth, bottomBarLineWidth: nodes[nodes.length - 1].getBoundingClientRect().right / nodes.length })
        document.getElementById('contentMenus').addEventListener('scroll', this.handleScroll)
    }

    componentWillUnmount() {
        document.getElementById('contentMenus').removeEventListener('scroll', this.handleScroll)
    }

    handleScroll(e) {
        var state = this.state
        this.setState({
            linePosition: ((e.target.scrollLeft * (this.state.bottomBarLineWidth - (this.state.bottomBarLineWidth / 3))) / this.state.bottomBarLineOffset)
        })

        e.target.addEventListener('touchend', function() {
            if(e.target.scrollLeft < (state.bottomBarLineWidth / 2)) {
                e.target.scroll({
                    left: 0,
                    behavior: 'smooth'
                })
                return
            }

            if(e.target.scrollLeft < (state.bottomBarLineWidth + (state.bottomBarLineWidth / 2))) {
                e.target.scroll({
                    left: state.bottomBarLineWidth,
                    behavior: 'smooth'
                })
                return
            }

            if(e.target.scrollLeft < ((state.bottomBarLineWidth * 2) - (state.bottomBarLineWidth / 2))) {
                e.target.scroll({
                    left: state.bottomBarLineWidth,
                    behavior: 'smooth'
                })
                return
            }

            if(e.target.scrollLeft < ((state.bottomBarLineWidth * 2) + (state.bottomBarLineWidth / 2))) {
                e.target.scroll({
                    left: state.bottomBarLineWidth * 2,
                    behavior: 'smooth'
                })
                return
            }
        })

        e.target.addEventListener('scrollend', function() {
            if(e.target.scrollLeft < (state.bottomBarLineWidth / 2)) {
                e.target.scroll({
                    left: 0,
                    behavior: 'smooth'
                })
                return
            }

            if(e.target.scrollLeft < (state.bottomBarLineWidth + (state.bottomBarLineWidth / 2))) {
                e.target.scroll({
                    left: state.bottomBarLineWidth,
                    behavior: 'smooth'
                })
                return
            }

            if(e.target.scrollLeft < ((state.bottomBarLineWidth * 2) - (state.bottomBarLineWidth / 2))) {
                e.target.scroll({
                    left: state.bottomBarLineWidth,
                    behavior: 'smooth'
                })
                return
            }

            if(e.target.scrollLeft < ((state.bottomBarLineWidth * 2) + (state.bottomBarLineWidth / 2))) {
                e.target.scroll({
                    left: state.bottomBarLineWidth * 2,
                    behavior: 'smooth'
                })
                return
            }
        })
    }
}