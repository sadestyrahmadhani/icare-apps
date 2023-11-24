import React,{ Suspense, lazy,Component, useEffect, useState } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";

import { getDaftarEq, getDataBerita, getDataProduct } from "../../services/API";
import LoadingAlert from "../../component/alert/loadingAlert";
import { getStatusAccountById } from "../../services/API/mod_upgradeAccount";
const Riwayat = React.lazy(() => import('../riwayat'));
const Informasi = React.lazy(() => import('../informasi'));
const innerWidth = window.innerWidth

const ProtectedRoute = ({ children }) => {

  // if (!auth.isAuthenticated()) {
  //   return <Navigate to="/" replace />;
  // }

  return children;
};
function Dashboard() {

    const bottomBarLineOffset = window.innerWidth * 2
    const bottomBarLineWidth = window.innerWidth
    const [linePosition, setLinePosition] = useState(0)
    const [statusAccount, setStatusAccount] = useState(0)
    const [dataNews, setDataNews] = useState([])
    const [hotNews, setHotNews] = useState(null)
    const [dataProduct, setDataProduct] = useState([])
    const [newsNumber, setNewsNumber] = useState('')
    const isDesktop = window.innerWidth > 768
    const [loading, setLoading] = useState(false) //MATIKAN LOADING PADA DASHBOARD
    const { id } = useParams()
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if(location.state?.EQ) {
            checkEQ()
        }
        // Promise.all([
        //     // getDataNews(),
        //     getDataAccount()
        // ]).then(() => {
        //     setLoading(false)
        // })
        getDataNews()
        getDataAccount()
        
        document.getElementById('contentMenus').addEventListener('scroll', handleScroll)
    }, [])

    const checkEQ = async () => {
        const res = await getDaftarEq()

        if(res.status == 200) {
            var isFound = res.data.Table.filter(val => val.equipment == location.state.EQ).length > 0
            
            if(!isFound) {
                navigate('/tambah_eq', {
                    state: {
                        input: {
                            equipment: location.state.EQ,
                            modelName: location.state.ModelName
                        }
                    }
                })
            }
        }
    }

    const getDataAccount = async () => {
        setLoading(true)
        const res = await getStatusAccountById()
        setLoading(false)
        if (res.status === 200) {
            setStatusAccount(res.data.Table[0].upgradestatus)
            // console.log(res);
        }
    }

    const checkPremium = (e) => {
        e.preventDefault()
        if(statusAccount === 3) {
            navigate('/supplies_request')
            return
        }
        if(statusAccount === 0 || statusAccount === 2) {
            navigate('/upgrade_step1')
            return
        }
        if(statusAccount === 1) {
            navigate('/upgrade_step3')
            return
        }
    }


    const getDataNews = async () => {
        setLoading(true)
        const res = await getDataBerita()
        const response = await getDataProduct()
        const newsCount = res.data.news.length
        setLoading(false)
        if (res.status === 200 && response.status === 200) {
            if (newsCount >= 6) {
                const top4News = res.data.news.slice(newsCount - 5, newsCount - 1).sort((a, b) => b.id - a.id)

                setDataProduct(response.data.slice(0, 5))
                setHotNews(res.data.news[newsCount - 1])
                setDataNews(top4News)
                // console.log('Res Data Berita : ', res.data.news[newsCount - 1])
            }
        }
    }

    const removeHTMLTags = (text) => {
        const div = document.createElement("div")
        div.innerHTML = text
        return div.textContent || div.innerHTML || ""
    }

    const handleSelectedItem = (idNews) => {
        setNewsNumber(idNews)
    }

    const limitChar = (text, limit, surfix) => {
        var a = ""
        for (var i = 0; i < limit; i++) {
            a += text.charAt(i)
        }
        a += surfix
        return a
    }

    const redirectToContact = () => {
        if (isDesktop) {
            window.location.href = 'mailto: icare@astragraphia.co.id'
        } else {
            window.location.href = 'tel: +622115003445'
        }
    }

    const navigationScroll = (e) => {
        e.preventDefault();
        var parent = e.target.getAttribute('parent')

        if (parent == 0) {
            document.getElementById('contentMenus').scroll({
                left: 0,
                behavior: 'smooth'
            })
            return
        }

        if (parent == 1) {
            document.getElementById('contentMenus').scroll({
                left: bottomBarLineWidth,
                behavior: 'smooth'
            })
            return
        }

        if (parent == 2) {
            document.getElementById('contentMenus').scroll({
                left: bottomBarLineWidth * 2,
                behavior: 'smooth'
            })
            return
        }
    }

    const handleScroll = (e) => {
        // var state = useState()
        document.getElementById('contentMenus').removeEventListener('scroll', handleScroll)
        setLinePosition((e.target.scrollLeft * (bottomBarLineWidth - (bottomBarLineWidth / 3))) / bottomBarLineOffset)

        e.currentTarget.addEventListener('scrollend', animateBottomBar)

        function animateBottomBar(e) {
            e.currentTarget.removeEventListener('scrollend', animateBottomBar)
            document.querySelector('.bottom-bar').querySelector('.active').classList.remove('active')

            if(e.currentTarget.scrollLeft < (bottomBarLineWidth / 2)) {
                e.currentTarget.scroll({
                    left: 0,
                    behavior: 'smooth'
                })
                document.querySelector('.bottom-bar').querySelectorAll('a')[0].classList.add('active')
                return
            }

            if(e.currentTarget.scrollLeft < bottomBarLineWidth + (bottomBarLineWidth / 2)) {
                e.currentTarget.scroll({
                    left: bottomBarLineWidth,
                    behavior: 'smooth'
                })
                document.querySelector('.bottom-bar').querySelectorAll('a')[1].classList.add('active')
                return
            }

            if(e.currentTarget.scrollLeft < (bottomBarLineWidth * 2) - (bottomBarLineWidth / 2)) {
                e.currentTarget.scroll({
                    left: bottomBarLineWidth,
                    behavior: 'smooth'
                })
                document.querySelector('.bottom-bar').querySelectorAll('a')[1].classList.add('active')
                return
            }

            if(e.currentTarget.scrollLeft < (bottomBarLineWidth * 2) + (bottomBarLineWidth / 2)) {
                e.currentTarget.scroll({
                    left: bottomBarLineWidth * 2,
                    behavior: 'smooth'
                })
                document.querySelector('.bottom-bar').querySelectorAll('a')[2].classList.add('active')
                return
            }
        }

        document.getElementById('contentMenus').addEventListener('scroll', handleScroll)
    }

    return (
        <>
            <div className="content-menus" id="contentMenus">
                <div className="menu-items col-12">
                    <Link className="text-white" to="/settings" style={{ position: 'absolute', top: 15, right: 20, fontSize: '26px', zIndex: '11111' }}><i className="fa fa-cog d-md-none"></i></Link>
                    <div className="col-md-7 col-12 mx-auto py-xs-0 m-0">
                        <img className="banner-desktop d-md-block d-none" src="images/banner1.png" alt="Beranda" width='100%' />
                        <img className="banner-desktop d-md-none d-block" src="images/bannerMobile-edit.png" alt="Beranda" width='100%' />
                        <div className="row col-md-12 col-10 px-2 my-md-3 m-0 mx-auto menus justify-content-center">
                            <div className="col-4 text-center mb-md-4"> 
                                <Link className="list-items" to="/breakfix_request" >
                                    <div className="col-md-5 col-12 mx-auto mb-2 menus-icon" style={{ width: '45%' }}>
                                        <img src="images/breakfix.png" alt="Breakfix" width="100%" />
                                    </div>
                                    <p className="menus-title small fw-bold">Breakfix</p>
                                </Link>
                            </div>
                            <div className="col-4 text-center mb-md-4"> 
                                <Link className="list-items" style={{border: 'none', backgroundColor: '#ffff'}} onClick={checkPremium}>
                                    <div className="col-md-5 col-12 mx-auto mb-2 menus-icon" style={{ width: '45%' }}>
                                        <img src="images/supplies.png" alt="Supplies" width="100%" />
                                    </div>
                                    <p className="menus-title small fw-bold">Supplies</p>
                                </Link>
                            </div>
                            <div className="col-4 text-center mb-md-4"> 
                                <Link className="list-items" to="/install_request" >
                                    <div className="col-md-5 col-12 mx-auto mb-2 menus-icon" style={{ width: '45%' }}>
                                        <img src="images/install.png" alt="Install" width="100%" />
                                    </div>
                                    <p className="menus-title small fw-bold">Install</p>
                                </Link>
                            </div>
                            <div className="col-4 text-center mb-md-4"> 
                                <Link className="list-items" to="/collect_meter" >
                                    <div className="col-md-5 col-12 mx-auto mb-2 menus-icon" style={{ width: '45%' }}>
                                        <img src="images/collectMeter.png" alt="Collect Meter" width="100%" />
                                    </div>
                                    <p className="menus-title small fw-bold">Collect Meter</p>
                                </Link>
                            </div>
                            <div className="col-4 text-center mb-md-4"> 
                                <Link className="list-items" to="" onClick={redirectToContact} >
                                    <div className="col-md-5 col-12 mx-auto mb-2 menus-icon" style={{ width: '45%' }}>
                                        <img src="images/callCenter.png" alt="Call Center" width="100%" />
                                    </div>
                                    <p className="menus-title small fw-bold">Call Center</p>
                                </Link>
                            </div>
                            <div className="col-4 text-center mb-md-4"> 
                                <Link className="list-items" to="/informasi" >
                                    <div className="col-md-5 col-12 mx-auto mb-2 menus-icon" style={{ width: '45%' }}>
                                        <img src="images/informasiTagihan.png" alt="Informasi Tagihan" width="100%" />
                                    </div>
                                    <p className="menus-title small fw-bold nowrap">Informasi Tagihan</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-10 col-md-12 mx-auto py-xs-0 mb-4">
                        <div className="d-flex align-items-center w-100 mb-3 mb-md-5">
                            <hr className="w-100 h-style" style={{ border: '1px solid #014C90' }} />
                            <h6 className="d-block mx-4 mx-md-5 fw-bold d-block d-md-none" style={{ whiteSpace: 'nowrap', color: '#014C90' }}>Astragraphia News</h6>
                            <h3 className="d-block mx-4 mx-md-5 d-none d-md-block" style={{ whiteSpace: 'nowrap', color: '#014C90' }}>Astragraphia News</h3>
                            <hr className="w-100 h-style" style={{ border: '1px solid #014C90' }} />
                        </div>
                        {
                            hotNews && (
                                <Link to={`/news_detail/${hotNews.id}`} onClick={() => handleSelectedItem(hotNews.id)} style={{ textDecoration: 'none' }}>
                                    <div className="card news border-0 mx-auto text-white mb-4" style={{ position: 'relative', background: 'rgba(0,0,0,.3' }}>
                                        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: -1, overflow: 'hidden' }} >
                                            <img src={`https://documentsolution.com/uploads/news/banners/${hotNews.image}`} alt="Astragraphia News" className="banner-news" style={{ objectFit: 'cover' }} />
                                        </div>
                                        <div className="py-4 p-md-5 d-md-block d-none">
                                            <p className="card-text">{hotNews.news_date}</p>
                                            <h5 className="card-title fw-bold">{hotNews.title_ina}</h5>
                                            <h4 className="card-title fw-bold">{hotNews.title_ina}</h4>
                                            <div style={{ fontSize: '14px' }}>
                                                {removeHTMLTags(limitChar(`${hotNews.description_ina}`, 290, "..."))}
                                            </div>
                                        </div>
                                        <div className="p-4 d-md-none d-block">
                                            <p className="card-text fw-bold">{hotNews.news_date}</p>
                                            <h5 className="card-title fw-bold"> {hotNews.title_ina}</h5>
                                            <h4 className="card-title fw-bold"> {limitChar(`${hotNews.title_ina}`, 60, "...")} </h4>
                                            <div style={{ fontSize: '14px' }}>{removeHTMLTags(limitChar(`${hotNews.description_ina}`, 90, "..."))}</div>
                                        </div>
                                    </div>
                                </Link>
                            )}
                        <div className="row m-0 card-news">
                            {
                                dataNews.map((item, key) => (
                                    <div className="col-md-4 col-12 mb-5" key={key}>
                                        <Link style={{ textDecoration: 'none' }} to={`/news_detail/${item.id}`} onClick={() => handleSelectedItem(item.id)}>
                                            <div className="card h-100 border-0 mx-0" style={{ backgroundColor: '#EBEBEB' }} >
                                                <div className="m-2 border" style={{ height: '150px', position: 'relative' }}>
                                                    <img src={`https://documentsolution.com/uploads/news/banners/${item.image}`} className=" w-100 h-100" alt={item.image} style={{ objectFit: 'cover' }} />
                                                </div>
                                                <div className="card-body">
                                                    <p className="card-text">{item.news_date}</p>
                                                    <h6 className="card-title fw-bold">{item.title_ina}</h6>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))
                            }{
                                dataProduct.map((item, key) => (
                                    <div className="col-md-4 col-12 mb-5" key={key}>
                                        <Link style={{ textDecoration: 'none' }} to={`/product_detail/${item.id}`} onClick={() => handleSelectedItem(item.id)}>
                                            <div className="card h-100 border-0 mx-0" style={{ backgroundColor: '#EBEBEB' }} >
                                                <div className="m-2 border" style={{ height: '150px', position: 'relative' }}>
                                                    <img src={`https://documentsolution.com/uploads/products/${item.image}`} className=" w-100 h-100" alt={item.image} style={{ objectFit: 'cover' }} />
                                                </div>
                                                <div className="card-body">
                                                    <p className="card-text">{item.created_at}</p>
                                                    <h6 className="card-title fw-bold">{item.name_ina}</h6>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))
                            }
                        </div>
                        <LoadingAlert visible={loading} customClass="col-md-2 col-8" />
                    </div>
                </div>
                <div className="menu-items col-12 d-md-none d-block">
                    {
                        innerWidth <= 768 && (
                            <Suspense fallback="Loading..."><ProtectedRoute><Riwayat /></ProtectedRoute></Suspense>
                        )
                    }
                </div>
                <div className="menu-items col-12 d-md-none d-block">
                    {
                        innerWidth <= 768 && (
                            <Suspense fallback="Loading..."><ProtectedRoute><Informasi /></ProtectedRoute></Suspense>
                        )
                    }
                </div>
            </div>
            <div className="bottom-bar d-md-none d-flex">
                <a href="" onClick={navigationScroll} parent={0} className="col-4 text-center active">
                    <i style={{ pointerEvents: 'none', fontSize: '22px' }} className="fa fa-home "></i>
                    <span className="menus-bottom" style={{ pointerEvents: 'none', fontSize: '12px' }}>BERANDA</span>
                </a>
                <a href="" onClick={navigationScroll} parent={1} className="col-4 text-center">
                    <i style={{ pointerEvents: 'none', fontSize: '22px' }} className="fa fa-clipboard"></i>
                    <span className="menus-bottom" style={{ pointerEvents: 'none', fontSize: '12px' }}>RIWAYAT</span>
                </a>
                <a href="" onClick={navigationScroll} parent={2} className="col-4 text-center">
                    <i style={{ pointerEvents: 'none', fontSize: '22px' }} className="fa fa-bell"></i>
                    <span className="menus-bottom" style={{ pointerEvents: 'none', fontSize: '12px' }}>INFORMASI</span>
                </a>
                <div className="bottom-bar-line" style={{ left: linePosition }}></div>
            </div>
        </>
    )
}

export default Dashboard


// export default class extends Component {
//     constructor(props) {
//         super(props)
//         this.handleScroll = this.handleScroll.bind(this)
//         this.navigationScroll = this.navigationScroll.bind(this)
//         this.handleResize = this.handleResize.bind(this)
//         this.state = {
//             bottomBarLineWidth: 0,
//             bottomBarLineOffset: 0,
//             linePosition: 0,
//             isDesktop: window.innerWidth > 768,
//             dataNews: [],
//             hotNews: [],
//             dataProduct: [],
//             idNews: '',
//             loading: false,
//             menuItems: [
//                 {
//                     title: 'Breakfix',
//                     imgIcon: 'images/breakfix.png',
//                     url: '/breakfix_request',
//                     mainMenu: true
//                 },
//                 {
//                     title: 'Supplies',
//                     imgIcon: 'images/supplies.png',
//                     url: '/upgrade_step1',
//                     mainMenu: true
//                 },
//                 {
//                     title: 'Install',
//                     imgIcon: 'images/install.png',
//                     url: '/install_request',
//                     mainMenu: true
//                 },
//                 {
//                     title: 'Collect Meter',
//                     imgIcon: 'images/collectMeter.png',
//                     url: '/collect_meter',
//                     mainMenu: true
//                 },
//                 {
//                     title: 'Call Center',
//                     imgIcon: 'images/callCenter.png',
//                     url: '/call-center',
//                     mainMenu: false
//                 },
//                 {
//                     title: 'Informasi Tagihan',
//                     imgIcon: 'images/informasiTagihan.png',
//                     url: '/informasi',
//                     mainMenu: true
//                 },
//             ],
//             newsData: [
//                 {
//                     imgNews: 'images/apeos7580-6580.png',
//                     date: '2023-09-15 10:00:00',
//                     titleNews: 'Apeos 7580 / 6580',
//                     redirect: '/product_detail'
//                 },
//                 {
//                     imgNews: 'images/apeos5330-4830.png',
//                     date: '2023-06-28 10:00:00',
//                     titleNews: 'Apeos 5330 / 4830'
//                 },
//                 {
//                     imgNews: 'images/banner-news3.jpg',
//                     date: '2023-06-28 10:00:00',
//                     titleNews: 'Astragraphia Cabang Batam Gelar Workshop dan Update Teknologi Produk Serta Solusi Bagi Pelanggan Di Wilayah Tanjung Pinang'
//                 },
//                 {
//                     imgNews: 'images/astragraphiaNews.png',
//                     date: '2023-06-28 10:00:00',
//                     titleNews: 'Astragraphia Cabang Batam Gelar Workshop dan Update Teknologi Produk Serta Solusi Bagi Pelanggan Di Wilayah Tanjung Pinang'
//                 },
//                 {
//                     imgNews: 'images/astragraphiaNews.png',
//                     date: '2023-06-28 10:00:00',
//                     titleNews: 'Astragraphia Cabang Batam Gelar Workshop dan Update Teknologi Produk Serta Solusi Bagi Pelanggan Di Wilayah Tanjung Pinang'
//                 },
//                 {
//                     imgNews: 'images/astragraphiaNews.png',
//                     date: '2023-06-28 10:00:00',
//                     titleNews: 'Astragraphia Cabang Batam Gelar Workshop dan Update Teknologi Produk Serta Solusi Bagi Pelanggan Di Wilayah Tanjung Pinang'
//                 },
//             ]
//         }
//     }

//     getDataNews = async () => {
//         this.setState({ loading: true })
//         const res = await getDataBerita()
//         const response = await getDataProduct()
//         const newsCount = res.data.news.length

//         this.setState({ loading: false })

//         if (newsCount >= 6) {
//             const top4News = res.data.news.slice(newsCount - 5, newsCount - 1).sort((a, b) => b.id - a.id)

//             this.setState({
//                 dataProduct: response.data.slice(0, 5),
//                 hotNews: res.data.news[newsCount - 1],
//                 dataNews: top4News
//             })
//         }
//     }

//     removeHTMLTags(text) {
//         const div = document.createElement("div")
//         div.innerHTML = text
//         return div.textContent || div.innerHTML || ''
//     }

//     handleSelectedItem(idBerita) {
//         this.setState({ idNews: idBerita })
//     }

//     limitChar(text, limit, surfix) {
//         var a = ""
//         for (var i = 0; i < limit; i++) {
//             a += text.charAt(i)
//         }
//         a += surfix
//         return a
//     }

//     handleResize = () => {
//         this.setState({
//             isDesktop: window.innerWidth > 768
//         })
//     }

//     redirectToContact = () => {
//         if (this.state.isDesktop) {
//             window.location.href = 'mailto: icare@astragraphia.co.id'
//         } else {
//             window.location.href = 'tel: +622115003445'
//         }
//     }

//     render() {
//         return (
//             <>
//                 <div className="content-menus" id="contentMenus">
//                     <div className="menu-items col-12">
//                         <Link className="text-white" to="/settings" style={{ position: 'absolute', top: 15, right: 20, fontSize: '26px', zIndex: '11111' }}><i className="fa fa-cog d-md-none"></i></Link>
//                         <div className="col-md-7 col-12 mx-auto py-xs-0 m-0">
//                             <img className="banner-desktop d-md-block d-none" src="images/banner1.png" alt="Beranda" width='100%' />
//                             <img className="banner-desktop d-md-none d-block" src="images/bannerMobile-edit.png" alt="Beranda" width='100%' />
//                             <div className="row col-md-12 col-9 my-md-3 m-0 mx-auto menus justify-content-center">
//                                 {this.state.menuItems.map((value, key) => (
//                                     <div className="col-4 text-center mb-md-4" key={key}>
//                                         {
//                                             value.mainMenu ? (
//                                                 <Link className="list-items" to={value.url} >
//                                                     <div className="col-md-5 col-12 mx-auto mb-2 menus-icon" style={{ width: '45%' }}>
//                                                         <img src={value.imgIcon} alt={value.title} width="100%" />
//                                                     </div>
//                                                     <p className="menus-title small fw-bold">{value.title}</p>
//                                                 </Link>
//                                             ) : (
//                                                 <Link className="list-items" onClick={this.redirectToContact} >
//                                                     <div className="col-md-5 col-12 mx-auto mb-2 menus-icon" style={{ width: '45%' }}>
//                                                         <img src={value.imgIcon} alt={value.title} width="100%" />
//                                                     </div>
//                                                     <p className="menus-title small fw-bold">{value.title}</p>
//                                                 </Link>
//                                             )
//                                         }
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                         <div className="col-10 col-md-12 mx-auto py-xs-0 mb-4">
//                             <div className="d-flex align-items-center w-100 mb-3 mb-md-5">
//                                 <hr className="w-100 h-style" style={{ border: '1px solid #014C90' }} />
//                                 <h3 className="d-block mx-3 mx-md-5" style={{ whiteSpace: 'nowrap', color: '#014C90' }}>Astragraphia News</h3>
//                                 <hr className="w-100 h-style" style={{ border: '1px solid #014C90' }} />
//                             </div>
//                             {
//                                 this.state.hotNews && (
//                                     <Link to={`/news_detail/${this.state.hotNews.id}`} onClick={() => this.handleSelectedItem(this.state.hotNews.id)} style={{ textDecoration: 'none' }}>
//                                         <div className="card news border-0 mx-auto text-white mb-4" style={{ position: 'relative', background: 'rgba(0,0,0,.3' }}>
//                                             <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: -1, overflow: 'hidden' }} >
//                                                 <img src={`https://documentsolution.com/uploads/news/banners/${this.state.hotNews.image}`} alt="Astragraphia News" className="banner-news" style={{ objectFit: 'cover' }} />
//                                             </div>
//                                             <div className="py-4 p-md-5 d-md-block d-none">
//                                                 <p className="card-text">{this.state.hotNews.news_date}</p>
//                                                 <h5 className="card-title fw-bold">{this.state.hotNews.title_ina}</h5>
//                                                 <h4 className="card-title fw-bold">{this.state.hotNews.title_ina}</h4>
//                                                 <div style={{ fontSize: '14px' }}>
//                                                     {this.removeHTMLTags(this.limitChar(`${this.state.hotNews.description_ina}`, 290, "..."))}
//                                                 </div>
//                                             </div>
//                                             <div className="p-4 d-md-none d-block">
//                                                 <p className="card-text fw-bold">{this.state.hotNews.news_date}</p>
//                                                 <h5 className="card-title fw-bold"> {this.state.hotNews.title_ina}</h5>
//                                                 <h4 className="card-title fw-bold"> {this.limitChar(`${this.state.hotNews.title_ina}`, 60, "...")} </h4>
//                                                 <div style={{ fontSize: '14px' }}>{this.removeHTMLTags(this.limitChar(`${this.state.hotNews.description_ina}`, 90, "..."))}</div>
//                                             </div>
//                                         </div>
//                                     </Link>
//                                 )}
//                             <div className="row m-0 card-news">
//                                 {
//                                     this.state.dataNews.map((item, key) => (
//                                         <div className="col-md-4 col-12 mb-5" key={key}>
//                                             <Link style={{ textDecoration: 'none' }} to={`/news_detail/${item.id}`} onClick={() => this.handleSelectedItem(item.id)}>
//                                                 <div className="card h-100 border-0 mx-0" style={{ backgroundColor: '#EBEBEB' }} >
//                                                     <div className="m-2 border" style={{ height: '150px', position: 'relative' }}>
//                                                         <img src={`https://documentsolution.com/uploads/news/banners/${item.image}`} className=" w-100 h-100" alt={item.image} style={{ objectFit: 'cover' }} />
//                                                     </div>
//                                                     <div className="card-body">
//                                                         <p className="card-text">{item.news_date}</p>
//                                                         <h6 className="card-title fw-bold">{item.title_ina}</h6>
//                                                     </div>
//                                                 </div>
//                                             </Link>
//                                         </div>
//                                     ))
//                                 }{
//                                     this.state.dataProduct.map((item, key) => (
//                                         <div className="col-md-4 col-12 mb-5" key={key}>
//                                             <Link style={{ textDecoration: 'none' }} to={`/product_detail/${item.id}`} onClick={() => this.handleSelectedItem(item.id)}>
//                                                 <div className="card h-100 border-0 mx-0" style={{ backgroundColor: '#EBEBEB' }} >
//                                                     <div className="m-2 border" style={{ height: '150px', position: 'relative' }}>
//                                                         <img src={`https://documentsolution.com/uploads/products/${item.image}`} className=" w-100 h-100" alt={item.image} style={{ objectFit: 'cover' }} />
//                                                     </div>
//                                                     <div className="card-body">
//                                                         <p className="card-text">{item.created_at}</p>
//                                                         <h6 className="card-title fw-bold">{item.name_ina}</h6>
//                                                     </div>
//                                                 </div>
//                                             </Link>
//                                         </div>
//                                     ))
//                                 }
//                             </div>
//                             <LoadingAlert visible={this.state.loading} customClass="col-md-2 col-8" />
//                         </div>
//                     </div>
//                     <div className="menu-items col-12 d-md-none d-block">
//                         <Riwayat />
//                     </div>
//                     <div className="menu-items col-12 d-md-none d-block">
//                         <Informasi />
//                     </div>
//                 </div>
//                 <div className="bottom-bar d-md-none d-flex">
//                     <a href="" onClick={this.navigationScroll} parent={0} className="col-4 text-center">
//                         <i style={{ pointerEvents: 'none', fontSize: '22px' }} className="fa fa-home "></i>
//                         <span className="menus-bottom" style={{ pointerEvents: 'none', fontSize: '12px' }}>BERANDA</span>
//                     </a>
//                     <a href="" onClick={this.navigationScroll} parent={1} className="col-4 text-center">
//                         <i style={{ pointerEvents: 'none', fontSize: '22px' }} className="fa fa-clipboard"></i>
//                         <span className="menus-bottom" style={{ pointerEvents: 'none', fontSize: '12px' }}>RIWAYAT</span>
//                     </a>
//                     <a href="" onClick={this.navigationScroll} parent={2} className="col-4 text-center">
//                         <i style={{ pointerEvents: 'none', fontSize: '22px' }} className="fa fa-bell"></i>
//                         <span className="menus-bottom" style={{ pointerEvents: 'none', fontSize: '12px' }}>INFORMASI</span>
//                     </a>
//                     <div className="bottom-bar-line" style={{ left: this.state.linePosition }}></div>
//                 </div>
//             </>
//         )
//     }

//     navigationScroll(e) {
//         e.preventDefault();
//         var parent = e.target.getAttribute('parent')

//         if (parent == 0) {
//             document.getElementById('contentMenus').scroll({
//                 left: 0,
//                 behavior: 'smooth'
//             })
//             return
//         }

//         if (parent == 1) {
//             document.getElementById('contentMenus').scroll({
//                 left: this.state.bottomBarLineWidth,
//                 behavior: 'smooth'
//             })
//             return
//         }

//         if (parent == 2) {
//             document.getElementById('contentMenus').scroll({
//                 left: this.state.bottomBarLineWidth * 2,
//                 behavior: 'smooth'
//             })
//             return
//         }
//     }

//     componentDidMount() {
//         window.addEventListener('resize', this.handleResize)
//         var nodes = document.querySelectorAll('.menu-items')
//         this.setState({ bottomBarLineOffset: nodes[nodes.length - 1].getBoundingClientRect().right - window.innerWidth, bottomBarLineWidth: nodes[nodes.length - 1].getBoundingClientRect().right / nodes.length })
//         document.getElementById('contentMenus').addEventListener('scroll', this.handleScroll)

//         this.getDataNews()
//     }

//     componentWillUnmount() {
//         window.removeEventListener('resize', this.handleResize)
//         document.getElementById('contentMenus').removeEventListener('scroll', this.handleScroll)
//     }

//     handleScroll(e) {
//         var state = this.state
//         this.setState({
//             linePosition: ((e.target.scrollLeft * (this.state.bottomBarLineWidth - (this.state.bottomBarLineWidth / 3))) / this.state.bottomBarLineOffset)
//         })

//         e.target.addEventListener('touchend', function () {
//             if (e.target.scrollLeft < (state.bottomBarLineWidth / 2)) {
//                 e.target.scroll({
//                     left: 0,
//                     behavior: 'smooth'
//                 })
//                 return
//             }

//             if (e.target.scrollLeft < (state.bottomBarLineWidth + (state.bottomBarLineWidth / 2))) {
//                 e.target.scroll({
//                     left: state.bottomBarLineWidth,
//                     behavior: 'smooth'
//                 })
//                 return
//             }

//             if (e.target.scrollLeft < ((state.bottomBarLineWidth * 2) - (state.bottomBarLineWidth / 2))) {
//                 e.target.scroll({
//                     left: state.bottomBarLineWidth,
//                     behavior: 'smooth'
//                 })
//                 return
//             }

//             if (e.target.scrollLeft < ((state.bottomBarLineWidth * 2) + (state.bottomBarLineWidth / 2))) {
//                 e.target.scroll({
//                     left: state.bottomBarLineWidth * 2,
//                     behavior: 'smooth'
//                 })
//                 return
//             }
//         })

//         e.target.addEventListener('scrollend', function () {
//             if (e.target.scrollLeft < (state.bottomBarLineWidth / 2)) {
//                 e.target.scroll({
//                     left: 0,
//                     behavior: 'smooth'
//                 })
//                 return
//             }

//             if (e.target.scrollLeft < (state.bottomBarLineWidth + (state.bottomBarLineWidth / 2))) {
//                 e.target.scroll({
//                     left: state.bottomBarLineWidth,
//                     behavior: 'smooth'
//                 })
//                 return
//             }

//             if (e.target.scrollLeft < ((state.bottomBarLineWidth * 2) - (state.bottomBarLineWidth / 2))) {
//                 e.target.scroll({
//                     left: state.bottomBarLineWidth,
//                     behavior: 'smooth'
//                 })
//                 return
//             }

//             if (e.target.scrollLeft < ((state.bottomBarLineWidth * 2) + (state.bottomBarLineWidth / 2))) {
//                 e.target.scroll({
//                     left: state.bottomBarLineWidth * 2,
//                     behavior: 'smooth'
//                 })
//                 return
//             }
//         })
//     }
// }
