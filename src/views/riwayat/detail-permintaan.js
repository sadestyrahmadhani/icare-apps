import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { getDetailRiwayatOrder, getTrackingRiwayat, getDaftarAlamatById, getImageRiwayatOrder } from "../../services/API";
import React, { useEffect, useState } from "react";
import TrackingAlert from "./component/trackingAlert";
import LoadingAlert from "../../component/alert/loadingAlert";
import ConfirmAlert from "../../component/alert/confirmAlert";
import { getReviewByTRequestId } from "../../services/API/mod_riwayatOrder";

function DetailRiwayat() {
    const params = useParams()
    const navigate = useNavigate()
    const location = useLocation()
    const [dataDetailRiwayat, setDataDetailRiwayat] = useState([])
    const [imageDetailRiwayat, setImageDetailRiwayat] = useState(null)
    const [imageDetailRiwayatConsumable, setImageDetailRiwayatConsumable] = useState(null)
    const [tracking, setTracking] = useState([])
    const [address, setAddress] = useState([])
    const [loading, setLoading] = useState(false)
    const [showPopup, setShowPopup] = useState(false)
    const [showErrorPopup, setShowErrorPopup] = useState(false)
    const [ratting, setRatting] = useState([])
    const [alertOption, setAlertOption] = useState({title: '', message: ''})

    // console.log(location.state);
    

    useEffect(() => {
        init()
    }, []);

    async function init() {
        setLoading(true)
        const res = await getDetailRiwayatOrder(params.id)
        setLoading(false)
        if(res.status == 200) {
            setDataDetailRiwayat(res.data)
            if(res.data.capture){
                setLoading(true)
                const resImg = await getImageRiwayatOrder(res.data.capture)
                setLoading(false)
                if(resImg.status == 200) {
                    setImageDetailRiwayat(resImg.data)
                }
            }
            if(res.data.CaptureConsumable) {
                setLoading(true)
                const resImgConsumable = await getImageRiwayatOrder(res.data.CaptureConsumable)
                setLoading(false)
                if(resImgConsumable.status == 200) {
                    setImageDetailRiwayatConsumable(resImgConsumable.data)
                }
            }
        } else {
            setShowPopup(true)
            setAlertOption({title: 'Error', message: 'Oops! Terjadi kesalahan'})
        }
        
        setLoading(true)
        const resAddress = await getDaftarAlamatById(res.data.userAddressId)
        setLoading(false)
        if(resAddress.status == 200) {
            console.log(resAddress.data);   
            setAddress(resAddress.data.Table[0])
        }

        if(res.data.statusid == 2 || res.data.statusid == 3) {
            setLoading(true)
            const resTrack = await getTrackingRiwayat(params.id)
            setLoading(false)
            if(resTrack.status == 200) {
                setTracking(resTrack.data.Table)
            }
        }

        const resReview = await getReviewByTRequestId(params.id)
        if(resReview.status == 200) {
            console.log(resReview.data)
            setRatting(resReview.data.Table)
        }
    }

    const handlePopup = () => {
        setShowPopup(true)
        setShowErrorPopup(false)
    }

    const handleRedirect = (e) => {
        e.preventDefault()
        
        navigate(-1, {
            state: {
                currentTabActive: location.state?.currentTabActive
            }
        })
    }


    // console.log(dataDetailRiwayat.requestd?.lenght);

    return (
        <>
        <div className="responsive-bar d-flex" style={{ alignItems: 'baseline', height: '55px' }}>
            <Link className="list-items" onClick={handleRedirect}>
                <i className="fa fa-arrow-left me-3" style={{ fontSize: '18px', color: '#014C90' }}></i>
                <span className="title-icare fw-bold py-1" style={{ borderBottom: '3px solid #014C90', fontSize: '18px' }}>Detail Permintaan</span>
            </Link>
        </div>
            <div className="card shadow-sm mb-3 rounded-4">
                <div className="card-body p-md-4 p-0" style={{fontSize: '14px'}}>
                        <div className="tracking-vertical">
                            <div className="tracking-item">
                                <div className="track-icon">
                                    <div className="track-icon-container bg-succes">
                                        <i className="fa fa-check"></i>
                                    </div>
                                </div>
                                <div className="track-content mb-4">
                                    <div className="row">
                                        <div className="col-12 mb-3">
                                            Awal Permintaan
                                        </div>
                                        <div className="col-6 mb-3">Tanggal Permintaan</div>

                                        <div className="col-6 text-end mb-3">{dataDetailRiwayat
                                        .createdate}</div>
                                        <div className="col-12 mb-3">
                                            <div className="mb-4">
                                                <h6 className="mb-3 fw-bold">Daftar Permintaan</h6>
                                                <div className="rounded-4 px-4 py-2 border border-black">
                                                    <p className="mb-2 mt-2">No. Request : {dataDetailRiwayat.requestNo}</p>
                                                    <p className="mb-2">{dataDetailRiwayat.namarequest}</p>
                                                    <p className="mb-2">EQ : {dataDetailRiwayat.equipment}</p>
                                                    <p className="mb-2">{dataDetailRiwayat.requestd?.map(val => val.namarequesttype).join(', ')}</p>
                                                    <p className="mb-2">{dataDetailRiwayat.keterangan}</p>
                                                </div>
                                            </div>
                                            <div className="mb-4">
                                                <h6 className="mb-3 fw-bold">Detail Penerima</h6>
                                                <div className="rounded-4 px-4 py-2 border border-black">
                                                    <table width="100%" cellpadding="5">
                                                        <tr>
                                                            <td width="40%">Nama Perusahaan</td>
                                                            <td>{dataDetailRiwayat.namaperusahaan}</td>
                                                        </tr>
                                                        <tr>
                                                            <td width="40%">Nama Penerima</td>
                                                            <td>{dataDetailRiwayat.namalengkap}</td>
                                                        </tr>
                                                        <tr>
                                                            <td width="40%">No Telepon</td>
                                                            <td>{dataDetailRiwayat.telp}</td>
                                                        </tr>
                                                        <tr>
                                                            <td width="40%" valign="top">Lokasi Penerima</td>
                                                            <td>
                                                                <p>Nama Jalan & Nomor Gedung/Kantor : {address.Alamat}</p>
                                                                <p>Nama Gedung : {address.NamaGedung}</p>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 text-center mb-3">
                                            <img src={imageDetailRiwayat} alt="" className="w-md-25 w-75"></img>
                                        </div>
                                        <div className="col-12 text-center">
                                            <img src={imageDetailRiwayatConsumable} alt="" className="w-md-25 w-75"></img>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {dataDetailRiwayat.statusid == 4 && (
                                <div className="tracking-item">
                                    <div className="track-icon">
                                        <div className="track-icon-container bg-danger">
                                            <i className="fa fa-times"></i>
                                        </div>
                                    </div>
                                    <div className="track-content">
                                        <div className="row">
                                            <div className="col-12 mb-3">
                                                Ditolak
                                            </div>
                                            <div className="col-6 mb-3">Tanggal Ditolak</div>
                                            <div className="col-6 text-end mb-3">{dataDetailRiwayat.rejectdate}</div>
                                            <div className="col-12 mb-3">
                                                <div className="mb-4">
                                                    <h6 className="mb-3 fw-bold">Note</h6>
                                                    <div className="rounded-4 p-md-4 p-2 border border-black">
                                                    {dataDetailRiwayat.rejectnote}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {(dataDetailRiwayat.statusid == 5 || (dataDetailRiwayat.statusid == 3 && dataDetailRiwayat.internalprosesdate !== "")) && (
                            <div className="tracking-item">
                                    <div className="track-icon">
                                        <div className="track-icon-container bg-light">
                                            <img src="/images/warn-icon.png" width="35" />
                                        </div>
                                    </div>
                                    <div className="track-content">
                                        <div className="row">
                                            <div className="col-12 mb-3">
                                                Internal Proses
                                            </div>
                                            <div className="col-6 mb-3">Tanggal Internal Proses</div>
                                            <div className="col-6 text-end mb-3">{dataDetailRiwayat.internalprosesdate}</div>
                                            <div className="col-12 mb-3">
                                                <div className="mb-5">
                                                    <h6 className="mb-3 fw-bold">Note</h6>
                                                    <div className="rounded-4 p-md-4 p-2 border border-black">
                                                    {dataDetailRiwayat.internalprosesnote}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {(dataDetailRiwayat.statusid == 2 || dataDetailRiwayat.statusid == 3) && (
                                <div className="tracking-item">
                                    {dataDetailRiwayat.statusid == 3 ? (
                                    <div className="track-icon">
                                        <div className="track-icon-container bg-succes">
                                            <i className="fa fa-check"></i>
                                        </div>
                                    </div>
                                    ) : (
                                    <div className="track-icon">
                                        <div className="track-icon-container bg-light">
                                            <img src="/images/icon_diproses_new.png" width="35"/>
                                        </div>
                                    </div>
                                    )}
                                    <div className="track-content">
                                        <div className="row">
                                            <div className="col-12 mb-3">
                                                Diproses
                                            </div>
                                            <div className="col-6 mb-3">Tanggal Diproses</div>
                                            <div className="col-6 text-end mb-3">{dataDetailRiwayat.prosesdate}</div>
                                            <div className="col-12 mb-1">
                                                <div className="mb-4">
                                                    <h6 className="mb-3 fw-bold">Detail Pengerjaan</h6>
                                                    <div className="row rounded-4 p-md-4 p-2 py-2 border border-black">
                                                        {tracking.filter(val => val.status === 'Accept').map((val,key) => (
                                                            <table width="100%" cellPadding="5" key={key}>
                                                                <tr>
                                                                    <td width="50%">Service order</td>
                                                                    <td>{val.serviceorder}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td width="50%">Nama Petugas</td>
                                                                    <td>{val.Username}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td width="50%">Note</td>
                                                                    <td>{val.notes}</td>
                                                                </tr>
                                                            </table>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="rounded-3 px-5 py-2 mb-4" style={{background: 'white', border: "1px solid", whiteSpace: 'nowrap'}} onClick={handlePopup} >
                                            <i className="fa fa-truck me-2" style={{fontSize: '20px'}} />
                                            Lacak Petugas
                                        </button>
                                    </div>
                                    <TrackingAlert visible={showPopup} data={tracking} onClick={() => setShowPopup(false)} />
                                </div>
                            )}
                            
                            {dataDetailRiwayat.statusid == 3 && (
                                <div className="tracking-item">
                                        <div className="track-icon">
                                        <div className="track-icon-container bg-succes">
                                            <i className="fa fa-check"></i>
                                        </div>
                                    </div>
                                    <div className="track-content">
                                        <div className="row">
                                            <div className={dataDetailRiwayat.review ? "col-12 pb-2 mb-1" : "col-12 pb-2 mb-1 border-bottom border-dark"}>
                                                Selesai
                                            </div>
                                            <div className={dataDetailRiwayat.review ? "col-6 pb-1 mb-5" : "col-6 pb-1 mb-5 border-bottom border-dark"}>Tanggal Diproses</div>
                                            <div className={dataDetailRiwayat.review ? "col-6 text-end pb-1 mb-5" : "col-6 text-end pb-1 mb-5 border-bottom border-dark"}>{dataDetailRiwayat.finishdate}</div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {dataDetailRiwayat.review && (
                                <div className="tracking-item">
                                        <div className="track-icon">
                                        <div className="track-icon-container bg-succes">
                                            <i className="fa fa-check"></i>
                                        </div>
                                    </div>
                                    <div className="track-content">
                                        <div className="row">
                                            <div className="col-12 pb-2 mb-1">
                                                Nilai & Review
                                            </div>
                                            <div className="col-12 mb-3">
                                                <i class={ ratting[ratting.length - 1]?.Review > 0 ? 'fa fa-star fa-2x me-1 text-warning' : 'fa fa-star fa-2x me-1' }/>
                                                <i class={ ratting[ratting.length - 1]?.Review > 1 ? 'fa fa-star fa-2x me-1 text-warning' : 'fa fa-star fa-2x me-1' }/>
                                                <i class={ ratting[ratting.length - 1]?.Review > 2 ? 'fa fa-star fa-2x me-1 text-warning' : 'fa fa-star fa-2x me-1' }/>
                                                <i class={ ratting[ratting.length - 1]?.Review > 3 ? 'fa fa-star fa-2x me-1 text-warning' : 'fa fa-star fa-2x me-1' }/>
                                                <i class={ ratting[ratting.length - 1]?.Review > 4 ? 'fa fa-star fa-2x me-1 text-warning' : 'fa fa-star fa-2x me-1' }/>
                                            </div>
                                            <div className="col-12 mb-3">
                                                <div className="mb-4">
                                                    <div className="rounded-4 px-4 py-2 border border-black">{ratting[ratting.length - 1]?.Description}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            
                            
                        </div>
                        {(dataDetailRiwayat.statusid == 1 || dataDetailRiwayat.statusid == 2 || dataDetailRiwayat.statusid == 5) && (
                            <div className="col-12 text-center">
                                <button className="btn btn-login px-5" onClick={() => navigate(`/tanya_tim_support/${params.id}`)}>Tanya Tim Support</button>
                            </div>
                        )}
                </div>
                <ConfirmAlert visible={showErrorPopup} titleMessage={alertOption.title} message={alertOption.message} customClass="col-md-3 col-9" onClick={handlePopup} />
                <LoadingAlert visible={loading} customClass="col-md-2 col-8" />
            </div>
        </>
    )
}

export default DetailRiwayat