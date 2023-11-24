import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import PesananditerimaAlert from "./pesananditerimaAlert";
import { updateStatusId } from "../../../services/API/mod_riwayatOrder";

function RiwayatTabel({tabActive, skip, cardBg, data}) {
    const navigate = useNavigate()
    const [showPopup, setShowPopup] = useState(false)
    // console.log(data.requesttype);

    const handleRatting = () => {
        navigate('/tulis_review', {
            state: {
                id: data.id,
                serviceRequest: data.requestNo,
                eq: data.equipment,
                requestName: data.namarequest
            }
        })
    }

    const pesananDiterima = async (e) => {
        // console.log(e.currentTarget.getAttribute('data-id'));
        const res = await updateStatusId(e.currentTarget.getAttribute('data-id'),{
            statusid: '3',
            useragent: localStorage.getItem('id'),
            responnote: 'Pesanan telah diterima oleh user',
            rejectnote: '',
            internalprosesnote: ''
        })
        if(res.status == 200) {
            navigate(0)
        }
    }

    const handlePopup = () => {
        setShowPopup(true)
    }

    const handleRedirect = (e) => {
        e.preventDefault()
        window.history.replaceState({ currentTabActive: tabActive, currentSkip: skip }, document.title)
        navigate( `/detail_permintaan/${data.id}`,{
            state: {
                currentTabActive: tabActive
            }
        })
    }

    return (
        <>
                <div className="card border-0 mb-3" style={{ boxShadow: '0 0 1.5rem rgba(0, 0, 0, .2', overflow: 'hidden' }}>
                    <div className="reject-title rounded-top py-3 text-center" style={{ backgroundColor: cardBg[data.statusid]?.background, fontWeight: '500', color: '#fff' }}>
                        <label style={{fontSize: '14px'}}>{cardBg[data.statusid]?.title}</label>
                    </div>
                    <div className="row">
                        <div className="col-md-3 col-sm-4 col-12 p-md-3 p-1 pb-md-5 column-request" style={{ borderRight: '1px solid #333' }}>
                            <p className="m-0 p-0 px-3 mb-md-2 mb-1" style={{fontSize: '12px'}}>{data.createdate}</p>
                            <p className="m-0 p-0 px-3 mb-md-2 mb-1" style={{fontSize: '12px'}}>{data.namarequest}</p>
                            <p className="m-0 p-0 px-3 mb-md-2 mb-1" style={{fontSize: '12px'}}>{data.requestNo}</p>
                        </div>
                        <div className="col-md-3 col-sm-4 col-12 px-md-2 py-md-3 p-1 pb-md-5 column-request" style={{ borderRight: '1px solid #333' }}>
                            <p className="m-0 p-0 px-3 mb-md-2 mb-1" style={{fontSize: '12px'}}>EQ : {data.equipment}</p>
                            <p className="m-0 p-0 px-3 mb-md-2 mb-1" style={{fontSize: '12px'}}>{data.requesttype}</p>
                            <p className="m-0 p-0 px-3 mb-md-2 mb-1" style={{fontSize: '12px'}}>{data.keterangan}</p>
                        </div>
                        <div className="col-md-4 col-sm-7 col-12 p-md-3 pb-md-5 column-track remove-border" style={{ borderRight: '1px solid #333' }}>
                            <div className="mt-md-4 mt-2" style={{ position: 'relative', width: '70%', marginLeft: 'auto', marginRight: 'auto' }}>
                                { parseInt(data.statusid) !== 1 && (
                                    <hr style={{ position: 'absolute', top: 0, left: 0, right: parseInt(data.statusid) === 4 || parseInt(data.statusid) === 3 && data.review ? 0 : (parseInt(data.statusid) === 3 ? '35%' : '71%'), border: '3px solid #23ad4c', opacity: 1 }} />
                                )}
                                <div style={{ position: 'absolute', fontSize: '12px', textAlign: 'center', left: -40 }}>
                                    <div className="mx-auto" style={{ padding: '4px', background: parseInt(data.statusid) === 5 || parseInt(data.statusid) === 4 || parseInt(data.statusid) === 3 || parseInt(data.statusid) === 2 ? '#23ad4c' : (parseInt(data.statusid) === 1 ? '#ff8000' : '#ccc'), color: '#fff', borderRadius: '50%', border: '3px solid #fff', width: 35 }}>
                                        <i className="fa fa-check"></i>
                                    </div>
                                    Menunggu
                                </div>
                                {
                                    (parseInt(data.statusid) === 1 || parseInt(data.statusid) === 3) && (
                                    <div style={{ position: 'absolute', fontSize: '12px', left: '35%', transform: 'translate(-50%, 0)', textAlign: 'center' }}>
                                        <div className="mx-auto" style={{ padding: '4px', background: parseInt(data.statusid) === 3 ? '#23ad4c' : '#ccc', color: '#fff', borderRadius: '50%', border: '3px solid #fff', width: 35 }}>
                                            <i className="fa fa-check"></i>
                                        </div>
                                        Diproses
                                    </div>

                                    )
                                }
                                {
                                    parseInt(data.statusid) === 2 && (
                                        <div style={{ position: 'absolute', fontSize: '12px', left: '35%', transform: 'translate(-50%, 0)', textAlign: 'center' }}>
                                            <div className="mx-auto" style={{ padding: '4px', width: 35 }}>
                                                <img src="images/icon_diproses_new.png" style={{width:'100%'}}></img>
                                            </div>
                                            Diproses
                                        </div>
                                    )
                                }
                                {
                                    parseInt(data.statusid) === 5 && (
                                        <div style={{ position: 'absolute', fontSize: '12px', left: '35%', transform: 'translate(-50%, 0)', textAlign: 'center' }}>
                                            <div className="mx-auto" style={{ padding: '4px', width: 35 }}>
                                                <img src="images/warn-icon.png" style={{width:'100%'}}></img>
                                            </div>
                                            Diproses
                                        </div>
                                    )
                                }
                                {
                                    parseInt(data.statusid) === 4 && (
                                        <div style={{ position: 'absolute', fontSize: '12px', left: '50%', transform: 'translate(-50%, 0)', textAlign: 'center' }}>
                                            <div className="mx-auto" style={{ padding: '2px 6px', background: '#ff2020', color: '#fff', borderRadius: '50%', border: '3px solid #fff', fontWeight: 'bold', fontSize: 18, width: 35 }}>
                                                &times;
                                            </div>
                                            Ditolak
                                        </div>
                                    )
                                }
                                <div style={{ position: 'absolute', fontSize: '12px', left: parseInt(data.statusid) === 4 ? '100%' : '70%', transform: 'translate(-50%, 0)', textAlign: 'center' }}>
                                    <div className="mx-auto" style={{ padding: '4px', background: parseInt(data.statusid) === 4 || parseInt(data.statusid) === 3 ? '#23ad4c' : '#ccc', color: '#fff', borderRadius: '50%', border: '3px solid #fff', width: 35 }}>
                                        <i className="fa fa-check"></i>
                                    </div>
                                    Selesai
                                </div>
                                {
                                    parseInt(data.statusid) !== 4 && (
                                        <div style={{ position: 'absolute', fontSize: '12px', right: -30, textAlign: 'center' }}>
                                            <div className="mx-auto" style={{ padding: '4px', background: data.review ? '#23ad4c' : '#ccc', color: '#fff', borderRadius: '50%', border: '3px solid #fff', width: 35 }}>
                                                <i className="fa fa-check"></i>
                                            </div>
                                            Nilai
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        <div className="col-md-2 col-12 p-4 column-btn remove-border">
                            {
                                data.statusid == 2 && (
                                    <button className="btn btn-view d-flex shadow rounded-2 d-flex align-items-center p-0 mx-auto mb-3 ms-2" style={{ width: '90%', border: 'none', backgroundColor: '#14caa9', position: 'relative', overflow: 'hidden' }} type="submit" onClick={handlePopup} >
                                        <div className="w-100 p-2 text-center" style={{ color: '#fff', fontSize: '11px', whiteSpace: 'nowrap', zIndex: 1111 }}>
                                            PESANAN DITERIMA
                                        </div>
                                        <div className="col-3 text-center bg-white text-danger p-2 rounded-end" style={{ width: 50, backgroundColor: '#fff', position: 'relative', overflow: 'hidden' }}>
                                            <div style={{ position: 'absolute', width: 30, height: 30, borderRadius: '50%', background: '#14caa9', left: '-18px', top: '-.5rem' }} />
                                            <div style={{ position: 'absolute', width: 30, height: 30, borderRadius: '50%', background: '#14caa9', left: '-18px', top: '1.3rem' }} />
                                            <i className="fa fa-external-link-square ms-2" style={{ color: '#14caa9' }}></i>
                                        </div>
                                    </button>
                                )
                            }
                            {
                            data && (
                            <Link className="btn btn-view d-flex shadow rounded-2 d-flex align-items-center p-0 mx-auto mb-3 ms-2" style={{ width: '90%', border: 'none', backgroundColor: '#014C90', position: 'relative', overflow: 'hidden' }} onClick={handleRedirect}>
                                <div className="w-100 p-2 text-center" style={{ color: '#fff', fontSize: '11px' }}>
                                    VIEW DETAIL
                                </div>
                                <div className="col-3 text-center bg-white text-danger p-2 rounded-end" style={{ width: 50, backgroundColor: '#fff', position: 'relative', overflow: 'hidden' }}>
                                    <div style={{ position: 'absolute', width: 30, height: 30, borderRadius: '50%', background: '#014C90', left: '-18px', top: '-.5rem' }} />
                                    <div style={{ position: 'absolute', width: 30, height: 30, borderRadius: '50%', background: '#014C90', left: '-18px', top: '1.3rem' }} />
                                    <i className="fa fa-chevron-right ms-2"></i>
                                </div>
                            </Link>
                            )}
                            {
                                (data.statusid == 3 && !data.review )&& (
                                    <button className="btn btn-view d-flex shadow rounded-2 d-flex align-items-center p-0 mx-auto mb-3 ms-2" style={{ width: '90%', border: 'none', backgroundColor: '#14caa9', position: 'relative', overflow: 'hidden' }} onClick={handleRatting}>
                                        <div className="w-100 p-2 text-center" style={{ color: '#fff', fontSize: '11px', zIndex: 1111 }}>
                                            BERIKAN NILAI
                                        </div>
                                        <div className="col-3 text-center bg-white text-danger p-2 rounded-end" style={{backgroundColor: '#fff', width: 50, position: 'relative', overflow: 'hidden'}}>
                                            <div style={{ position: 'absolute', width: 30, height: 30, borderRadius: '50%', background: '#14caa9', right: '2.2rem', top: '-.5rem' }} />
                                            <div style={{ position: 'absolute', width: 30, height: 30, borderRadius: '50%', background: '#14caa9', right: '2.2rem', top: '1.3rem' }} />
                                            <i className="fa fa-external-link-square ms-2" style={{ color: '#14caa9' }}></i>
                                        </div>
                                    </button>
                                )
                            }
                        </div>
                        <PesananditerimaAlert visible={showPopup} customClass="col-md-3 col-8" onClick={() => setShowPopup(false)} update={pesananDiterima} dataId={data.id} />
                    </div>
                </div>
            {/* {
                data.length >= 10 ?
                (
                    <div className="button-riwayat p-0">
                        <button type="button" className="btn btn-primary" style={{width:'100%', height:'50px', backgroundColor:'#014C90', borderRadius:'15px'}}>Lihat lebih banyak ...</button>
                    </div>
                ) : (
                    <div></div>
                )
            } */}
        </>
    )
}

export default RiwayatTabel


// export default class extends Component {

//     componentDidMount() {
//         this.init();
//     }

//     async init() {
//         this.setState({
//             DataisLoaded: false,
//         });

//         var res = await getRiwayatOrderByRow();
//         console.log("res : ", res);




//         this.setState({
//             DataisLoaded: true,
//             data: res,
//         });
//         console.log("data L ", this.state.data);
//     }



//     constructor(props) {
//         super(props)
//         this.state = {

//             dataRiwayatorder: [
//                 {

//                 }
//             ],
//         }
//     }


//     render() {
//         return (
//             <>
//                 {this.state.dataRiwayatorder.map((item) => (console.log(item),
//                     <div className="card border-0 mb-3" style={{ boxShadow: '0 0 1.5rem rgba(0, 0, 0, .2' }}>
//                         <div className="reject-title rounded-top py-3 text-center" style={{ backgroundColor: this.props.cardBg[this.props.tabActive - 1].background, fontWeight: '500', color: '#fff' }}>
//                             <label>{this.props.cardBg[this.props.tabActive - 1].title}</label>
//                         </div>
//                         <div className="row">
//                             <div className="col-md-2 col-sm-4 col-12 p-3 pb-5" style={{ borderRight: '2px solid #333' }}>
//                                 <p className="m-0 p-0 px-3 small">{item.createdate}</p>
//                                 <p className="m-0 p-0 px-3 small">{item.namarequest}</p>
//                                 <p className="m-0 p-0 px-3 small">{item.requestNo}</p>
//                             </div>
//                             <div className="col-md-2 col-sm-4 col-12 p-3 pb-5" style={{ borderRight: '2px solid #333' }}>
//                                 <p className="m-0 p-0 px-3 small">{item.equipment}</p>
//                                 <p className="m-0 p-0 px-3 small">{this.props.data.items}</p>
//                                 <p className="m-0 p-0 px-3 small">{item.keterangan}</p>
//                             </div>
//                             <div className="col-md-5 col-sm-7 col-12 p-3 pb-5" style={{ borderRight: '2px solid #333' }}>
//                                 {this.props.tabActive == 3 ? (
//                                     <div style={{ position: 'relative', width: '70%', marginLeft: 'auto', marginRight: 'auto' }}>
//                                         <hr style={{ position: 'absolute', top: 0, left: 0, right: 0, border: '3px solid #23ad4c', opacity: 1 }} />
//                                         <div style={{ position: 'absolute', textAlign: 'center', left: -40 }}>
//                                             <div className="mx-auto" style={{ padding: '4px', background: '#23ad4c', color: '#fff', borderRadius: '50%', border: '3px solid #fff', width: 40 }}>
//                                                 <i className="fa fa-check"></i>
//                                             </div>
//                                             Menunggu
//                                         </div>
//                                         <div style={{ position: 'absolute', left: '50%', transform: 'translate(-50%, 0)', textAlign: 'center' }}>
//                                             <div className="mx-auto" style={{ padding: '2px 6px', background: '#ff2020', color: '#fff', borderRadius: '50%', border: '3px solid #fff', fontWeight: 'bold', fontSize: 18, width: 38 }}>
//                                                 &times;
//                                             </div>
//                                             Ditolak
//                                         </div>
//                                         <div style={{ position: 'absolute', right: -30, textAlign: 'center' }}>
//                                             <div className="mx-auto" style={{ padding: '4px', background: '#23ad4c', color: '#fff', borderRadius: '50%', border: '3px solid #fff', width: 40 }}>
//                                                 <i className="fa fa-check"></i>
//                                             </div>
//                                             Selesai
//                                         </div>
//                                     </div>
//                                 ) : this.props.tabActive == 4 ? (
//                                     <div style={{ position: 'relative', width: '70%', marginLeft: 'auto', marginRight: 'auto' }}>
//                                         <hr style={{ position: 'absolute', top: 0, left: 0, right: '30%', border: '3px solid #23ad4c', opacity: 1 }} />
//                                         <div style={{ position: 'absolute', textAlign: 'center', left: -40 }}>
//                                             <div className="mx-auto" style={{ padding: '4px', background: '#23ad4c', color: '#fff', borderRadius: '50%', border: '3px solid #fff', width: 40 }}>
//                                                 <i className="fa fa-check"></i>
//                                             </div>
//                                             Menunggu
//                                         </div>
//                                         <div style={{ position: 'absolute', left: '35%', transform: 'translate(-50%, 0)', textAlign: 'center' }}>
//                                             <div className="mx-auto" style={{ padding: '4px', background: '#23ad4c', color: '#fff', borderRadius: '50%', border: '3px solid #fff', width: 40 }}>
//                                                 <i className="fa fa-check"></i>
//                                             </div>
//                                             Diproses
//                                         </div>
//                                         <div style={{ position: 'absolute', left: '70%', transform: 'translate(-50%, 0)', textAlign: 'center' }}>
//                                             <div className="mx-auto" style={{ padding: '4px', background: '#23ad4c', color: '#fff', borderRadius: '50%', border: '3px solid #fff', width: 40 }}>
//                                                 <i className="fa fa-check"></i>
//                                             </div>
//                                             Selesai
//                                         </div>
//                                         <div style={{ position: 'absolute', right: -30, textAlign: 'center' }}>
//                                             <div className="mx-auto" style={{ padding: '4px', background: '#ccc', color: '#fff', borderRadius: '50%', border: '3px solid #fff', width: 40 }}>
//                                                 <i className="fa fa-check"></i>
//                                             </div>
//                                             Nilai
//                                         </div>
//                                     </div>
//                                 ) : this.props.tabActive == 2 ? (
//                                     <div style={{ position: 'relative', width: '70%', marginLeft: 'auto', marginRight: 'auto' }}>
//                                         <hr style={{ position: 'absolute', top: 0, left: 0, right: '60%', border: '3px solid #23ad4c', opacity: 1 }} />
//                                         <div style={{ position: 'absolute', textAlign: 'center', left: -40 }}>
//                                             <div className="mx-auto" style={{ padding: '4px', background: '#23ad4c', color: '#fff', borderRadius: '50%', border: '3px solid #fff', width: 40 }}>
//                                                 <i className="fa fa-check"></i>
//                                             </div>
//                                             Menunggu
//                                         </div>
//                                         <div style={{ position: 'absolute', left: '35%', transform: 'translate(-50%, 0)', textAlign: 'center' }}>
//                                             <div className="mx-auto" style={{ padding: '4px', background: '#23ad4c', color: '#fff', borderRadius: '50%', border: '3px solid #fff', width: 40 }}>
//                                                 <i className="fa fa-check"></i>
//                                             </div>
//                                             Diproses
//                                         </div>
//                                         <div style={{ position: 'absolute', left: '70%', transform: 'translate(-50%, 0)', textAlign: 'center' }}>
//                                             <div className="mx-auto" style={{ padding: '4px', background: '#ccc', color: '#fff', borderRadius: '50%', border: '3px solid #fff', width: 40 }}>
//                                                 <i className="fa fa-check"></i>
//                                             </div>
//                                             Selesai
//                                         </div>
//                                         <div style={{ position: 'absolute', right: -30, textAlign: 'center' }}>
//                                             <div className="mx-auto" style={{ padding: '4px', background: '#ccc', color: '#fff', borderRadius: '50%', border: '3px solid #fff', width: 40 }}>
//                                                 <i className="fa fa-check"></i>
//                                             </div>
//                                             Nilai
//                                         </div>
//                                     </div>
//                                 ) : (
//                                     <div style={{ position: 'relative', width: '70%', marginLeft: 'auto', marginRight: 'auto' }}>
//                                         {/* <hr style={{ position: 'absolute', top: 0, left: 0, right: 0, border: '3px solid #23ad4c', opacity: 1 }} /> */}
//                                         <div style={{ position: 'absolute', textAlign: 'center', left: -40 }}>
//                                             <div className="mx-auto" style={{ padding: '4px', background: '#ff8000', color: '#fff', borderRadius: '50%', border: '3px solid #fff', width: 40 }}>
//                                                 <i className="fa fa-check"></i>
//                                             </div>
//                                             Menunggu
//                                         </div>
//                                         <div style={{ position: 'absolute', left: '35%', transform: 'translate(-50%, 0)', textAlign: 'center' }}>
//                                             <div className="mx-auto" style={{ padding: '4px', background: '#d6d6d6', color: '#fff', borderRadius: '50%', border: '3px solid #fff', width: 40 }}>
//                                                 <i className="fa fa-check"></i>
//                                             </div>
//                                             Diproses
//                                         </div>
//                                         <div style={{ position: 'absolute', left: '70%', transform: 'translate(-50%, 0)', textAlign: 'center' }}>
//                                             <div className="mx-auto" style={{ padding: '4px', background: '#d6d6d6', color: '#fff', borderRadius: '50%', border: '3px solid #fff', width: 40 }}>
//                                                 <i className="fa fa-check"></i>
//                                             </div>
//                                             Selesai
//                                         </div>
//                                         <div style={{ position: 'absolute', right: -30, textAlign: 'center' }}>
//                                             <div className="mx-auto" style={{ padding: '4px', background: '#d6d6d6', color: '#fff', borderRadius: '50%', border: '3px solid #fff', width: 40 }}>
//                                                 <i className="fa fa-check"></i>
//                                             </div>
//                                             Nilai
//                                         </div>
//                                     </div>
//                                 )}
//                             </div>
//                             <div className="col-md-3 col-sm-5 col-12 p-4">
//                                 {
//                                     this.props.tabActive == 4 ? (
//                                         <Link className="btn-view shadow rounded-2 d-flex align-items-center p-0 mx-auto mb-3" style={{ width: '90%', border: 'none', backgroundColor: '#01c9d4', textDecoration: 'none' }} to="/tulis_review">
//                                             <div className="col-9 p-2 text-center" style={{ color: '#fff', fontSize: '12px' }}>
//                                                 BERIKAN NILAI
//                                             </div>
//                                             <div className="col-3 text-center bg-white text-danger p-2 rounded-end">
//                                                 <i className="fa fa-external-link-square ms-2" style={{ backgroundColor: '#fff', color: '#01c9d4' }}></i>
//                                             </div>
//                                         </Link>
//                                     ) : ''
//                                 }
//                                 {
//                                     this.props.tabActive == 2 ? (
//                                         <button className="btn-view shadow rounded-2 d-flex align-items-center p-0 mx-auto mb-3" style={{ width: '90%', border: 'none', backgroundColor: '#19d4b2' }}>
//                                             <div className="col-9 text-center" style={{ color: '#fff', fontSize: '12px', whiteSpace: 'nowrap' }}>
//                                                 PESANAN DITERIMA
//                                             </div>
//                                             <div className="col-3 text-center bg-white text-danger p-2 rounded-end">
//                                                 <i className="fa fa-external-link-square ms-2" style={{ backgroundColor: '#fff', color: '#19d4b2' }}></i>
//                                             </div>
//                                         </button>
//                                     ) : ''
//                                 }
//                                 <Link className="btn btn-view d-flex shadow rounded-2 d-flex align-items-center p-0 mx-auto" style={{ width: '90%', border: 'none', backgroundColor: '#014C90' }} to="/detail-permintaan">
//                                     <div className="col-9 p-2 text-center" style={{ color: '#fff', fontSize: '12px' }}>
//                                         VIEW DETAIL
//                                     </div>
//                                     <div className="col-3 text-center bg-white text-danger p-2 rounded-end">
//                                         <i className="fa fa-chevron-right ms-2" style={{ backgroundColor: '#fff' }}></i>
//                                     </div>
//                                 </Link>
//                             </div>
//                         </div>
//                     </div>))
//                 }





//             </>
//         )
//     }
// }


// {tabActive == 3 ? (
//     <div style={{ position: 'relative', width: '70%', marginLeft: 'auto', marginRight: 'auto' }}>
//         {data.statusid === false && (
//             <hr style={{ position: 'absolute', top: 0, left: 0, right: '30%', border: '3px solid #23ad4c', opacity: 1 }} />
//         )}
//         {data.statusid === '3' && (
//             <hr style={{ position: 'absolute', top: 0, left: 0, right: 0, border: '3px solid #23ad4c', opacity: 1 }} />
//         )}
//         <div style={{ position: 'absolute', textAlign: 'center', left: -40 }}>
//             <div className="mx-auto" style={{ padding: '4px', background: '#23ad4c', color: '#fff', borderRadius: '50%', border: '3px solid #fff', width: 40 }}>
//                 <i className="fa fa-check"></i>
//             </div>
//             Menunggu
//         </div>
//         <div style={{ position: 'absolute', left: '35%', transform: 'translate(-50%, 0)', textAlign: 'center' }}>
//             <div className="mx-auto" style={{ padding: '4px', background: '#23ad4c', color: '#fff', borderRadius: '50%', border: '3px solid #fff', width: 40 }}>
//                 <i className="fa fa-check"></i>
//             </div>
//             Diproses
//         </div>
//         <div style={{ position: 'absolute', left: '70%', transform: 'translate(-50%, 0)', textAlign: 'center' }}>
//             <div className="mx-auto" style={{ padding: '4px', background: '#23ad4c', color: '#fff', borderRadius: '50%', border: '3px solid #fff', width: 40 }}>
//                 <i className="fa fa-check"></i>
//             </div>
//             Selesai
//         </div>
//         {data.statusid === false && (
//         <div style={{ position: 'absolute', right: -30, textAlign: 'center' }}>
//             <div className="mx-auto" style={{ padding: '4px', background: '#ccc', color: '#fff', borderRadius: '50%', border: '3px solid #fff', width: 40 }}>
//                 <i className="fa fa-check"></i>
//             </div>
//             Nilai
//         </div>
//         )}
//         {data.statusid === '3' && (
//             <div style={{ position: 'absolute', right: -30, textAlign: 'center' }}>
//                 <div className="mx-auto" style={{ padding: '4px', background: '#23ad4c', color: '#fff', borderRadius: '50%', border: '3px solid #fff', width: 40 }}>
//                     <i className="fa fa-check"></i>
//                 </div>
//                 Nilai
//             </div>
//         )}
//     </div>
// ) : tabActive == 4 ? (
//     <div style={{ position: 'relative', width: '70%', marginLeft: 'auto', marginRight: 'auto' }}>
//         <hr style={{ position: 'absolute', top: 0, left: 0, right: 0, border: '3px solid #23ad4c', opacity: 1 }} />
//         <div style={{ position: 'absolute', textAlign: 'center', left: -40 }}>
//             <div className="mx-auto" style={{ padding: '4px', background: '#23ad4c', color: '#fff', borderRadius: '50%', border: '3px solid #fff', width: 40 }}>
//                 <i className="fa fa-check"></i>
//             </div>
//             Menunggu
//         </div>
//         <div style={{ position: 'absolute', left: '50%', transform: 'translate(-50%, 0)', textAlign: 'center' }}>
//             <div className="mx-auto" style={{ padding: '2px 6px', background: '#ff2020', color: '#fff', borderRadius: '50%', border: '3px solid #fff', fontWeight: 'bold', fontSize: 18, width: 38 }}>
//                 &times;
//             </div>
//             Ditolak
//         </div>
//         <div style={{ position: 'absolute', right: -30, textAlign: 'center' }}>
//             <div className="mx-auto" style={{ padding: '4px', background: '#23ad4c', color: '#fff', borderRadius: '50%', border: '3px solid #fff', width: 40 }}>
//                 <i className="fa fa-check"></i>
//             </div>
//             Selesai
//         </div>
//     </div>
// ) : tabActive == 2 ? (
//     <div style={{ position: 'relative', width: '70%', marginLeft: 'auto', marginRight: 'auto' }}>
//         <hr style={{ position: 'absolute', top: 0, left: 0, right: '71%', border: '3px solid #23ad4c', opacity: 1 }} />
//         <div style={{ position: 'absolute', textAlign: 'center', left: -40 }}>
//             <div className="mx-auto" style={{ padding: '4px', background: '#23ad4c', color: '#fff', borderRadius: '50%', border: '3px solid #fff', width: 40 }}>
//                 <i className="fa fa-check"></i>
//             </div>
//             Menunggu
//         </div>
//         <div style={{ position: 'absolute', left: '35%', transform: 'translate(-50%, 0)', textAlign: 'center' }}>
//             <div className="mx-auto" style={{ padding: '4px', width: 40 }}>
//                 <img src="images/icon_diproses_new.png" style={{width:'100%'}}></img>
//             </div>
//             Diproses
//         </div>
//         <div style={{ position: 'absolute', left: '70%', transform: 'translate(-50%, 0)', textAlign: 'center' }}>
//             <div className="mx-auto" style={{ padding: '4px', background: '#ccc', color: '#fff', borderRadius: '50%', border: '3px solid #fff', width: 40 }}>
//                 <i className="fa fa-check"></i>
//             </div>
//             Selesai
//         </div>
//         <div style={{ position: 'absolute', right: -30, textAlign: 'center' }}>
//             <div className="mx-auto" style={{ padding: '4px', background: '#ccc', color: '#fff', borderRadius: '50%', border: '3px solid #fff', width: 40 }}>
//                 <i className="fa fa-check"></i>
//             </div>
//             Nilai
//         </div>
//     </div>
// ) : (
//     <div style={{ position: 'relative', width: '70%', marginLeft: 'auto', marginRight: 'auto' }}>
//         {/* <hr style={{ position: 'absolute', top: 0, left: 0, right: 0, border: '3px solid #23ad4c', opacity: 1 }} /> */}
//         <div style={{ position: 'absolute', textAlign: 'center', left: -40 }}>
//             <div className="mx-auto" style={{ padding: '4px', background: '#ff8000', color: '#fff', borderRadius: '50%', border: '3px solid #fff', width: 40 }}>
//                 <i className="fa fa-check"></i>
//             </div>
//             Menunggu
//         </div>
//         <div style={{ position: 'absolute', left: '35%', transform: 'translate(-50%, 0)', textAlign: 'center' }}>
//             <div className="mx-auto" style={{ padding: '4px', background: '#d6d6d6', color: '#fff', borderRadius: '50%', border: '3px solid #fff', width: 40 }}>
//                 <i className="fa fa-check"></i>
//             </div>
//             Diproses
//         </div>
//         <div style={{ position: 'absolute', left: '70%', transform: 'translate(-50%, 0)', textAlign: 'center' }}>
//             <div className="mx-auto" style={{ padding: '4px', background: '#d6d6d6', color: '#fff', borderRadius: '50%', border: '3px solid #fff', width: 40 }}>
//                 <i className="fa fa-check"></i>
//             </div>
//             Selesai
//         </div>
//         <div style={{ position: 'absolute', right: -30, textAlign: 'center' }}>
//             <div className="mx-auto" style={{ padding: '4px', background: '#d6d6d6', color: '#fff', borderRadius: '50%', border: '3px solid #fff', width: 40 }}>
//                 <i className="fa fa-check"></i>
//             </div>
//             Nilai
//         </div>
//     </div>
// )}