import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { getDetailRiwayatOrder, getTrackingRiwayat, getDaftarAlamatById, getImageRiwayatOrder } from "../../services/API";
import React, { useEffect, useState } from "react";
import TrackingAlert from "./component/trackingAlert";
import LoadingAlert from "../../component/alert/loadingAlert";
import ConfirmAlert from "../../component/alert/confirmAlert";
import { getReviewByTRequestId, insertNotifRequest } from "../../services/API/mod_riwayatOrder";

import warnIcon from './../../images/warn-icon.png'
import processIcon from './../../images/icon_diproses_new.png'

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
    const [alertOption, setAlertOption] = useState({ title: '', message: '' })
    const [sendEmail, setSendEmail] = useState([])

    // console.log(location.state);


    useEffect(() => {
        init()
        // console.log(location.state);
    }, []);

    async function init() {
        setLoading(true)
        const res = await getDetailRiwayatOrder(location.state?.id)
        // const res = await getDetailRiwayatOrder(params.id)
        setLoading(false)
        if (res.status == 200) {
            setDataDetailRiwayat(res.data)
            if (res.data.capture) {
                setLoading(true)
                const resImg = await getImageRiwayatOrder(res.data.capture)
                setLoading(false)
                if (resImg.status == 200) {
                    setImageDetailRiwayat(resImg.data)
                }
            }
            if (res.data.CaptureConsumable) {
                setLoading(true)
                const resImgConsumable = await getImageRiwayatOrder(res.data.CaptureConsumable)
                setLoading(false)
                if (resImgConsumable.status == 200) {
                    setImageDetailRiwayatConsumable(resImgConsumable.data)
                }
            }
        } else {
            setShowPopup(true)
            setAlertOption({ title: 'Error', message: 'Oops! Terjadi kesalahan' })
        }

        setLoading(true)
        const resAddress = await getDaftarAlamatById(res.data.userAddressId)
        setLoading(false)
        if (resAddress.status == 200) {
            // console.log(resAddress.data);   
            setAddress(resAddress.data.Table[0])
        }

        if (res.data.statusid == 2 || res.data.statusid == 3) {
            setLoading(true)
            const resTrack = await getTrackingRiwayat(params.id)
            setLoading(false)
            if (resTrack.status == 200) {
                setTracking(resTrack.data.Table)
            }
        }

        const resReview = await getReviewByTRequestId(params.id)
        if (resReview.status == 200) {
            // console.log(resReview.data)
            setRatting(resReview.data.Table)
        }
    }

    const SendNotif = async () => {
        const res = await insertNotifRequest(params.id, { email: sendEmail })
        if (res.status == 200) {
            console.log(res);
        }
    }

    const handlePopup = () => {
        setShowPopup(true)
        setShowErrorPopup(false)
    }

    const handleRedirect = (e) => {
        e.preventDefault()

        console.log(location.state);
        navigate('/riwayat', {
            state: {
                currentTabActive: location.state?.currentTabActive,
                currentSkip: location.state?.currentSkip
            }
        })
    }

    const handleChatTeamSupport = (e) => {
        e.preventDefault()
        navigate('/tanya_tim_support', {
            state: {
                id: location.state?.id
            }
        })
    }


    // console.log(dataDetailRiwayat.requestd);

    return (
        <>
            <div className="responsive-bar" >
                <div className="d-flex mx-md-auto my-md-2 my-0 default-height" style={{height: '55px', alignItems: 'baseline'}}>
                    <h4 className="title-icare title-fitur m-0 p-0 fw-bold" style={{ fontSize: '18px' }}>
                        <Link className="nav-link d-inline me-3" onClick={handleRedirect}>
                            <i className="fa fa-arrow-left color-arrow-left" style={{ color: '#014C90' }}></i>
                        </Link>
                        <span className="title-bold" style={{ borderBottom: '3px solid #014C90' }}>Detail Permintaan</span>
                    </h4>
                </div>
            </div>
            <div className="card shadow-sm mb-3 rounded-4 responsive-detail-permintaan">
                <div className="card-body p-md-4 p-0" style={{ fontSize: '14px' }}>
                    <div className="tracking-vertical">
                        <div className="tracking-item">
                            <div className="track-icon">
                                <div className="track-icon-container bg-succes">
                                    <i className="fa fa-check"></i>
                                </div>
                            </div>
                            <div className="track-content mb-4">
                                <div className="row font-size-12px-mobile">
                                    <div className="col-12 mb-3 mt-lg-3 mt-md-3 mt-2">
                                        Awal Permintaan
                                    </div>
                                    <div className="col-6 mb-3">Tanggal Permintaan</div>

                                    <div className="col-6 text-end mb-3">{dataDetailRiwayat
                                        .createdate}</div>
                                    <div className="col-12 mb-3">
                                        <div className="mb-4">
                                            <h6 className="mb-3 fw-bold font-size-14px-mobile">Daftar Permintaan</h6>
                                            <div className="rounded-4 px-4 py-2 border border-black">
                                                <p className="mb-2 mt-2">No. Request : {dataDetailRiwayat.requestNo}</p>
                                                <p className="mb-2">{dataDetailRiwayat.namarequest}</p>
                                                <p className="mb-2">EQ : {dataDetailRiwayat.equipment}</p>
                                                <p className="mb-2">{dataDetailRiwayat.requestd?.map(val => [val.description, val.namarequesttype].join(' ')).join(', ')}</p>
                                                <p className="mb-2">{dataDetailRiwayat.keterangan}</p>
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <h6 className="mb-3 fw-bold font-size-14px-mobile">Detail Penerima</h6>
                                            <div className="rounded-4 px-4 py-2 border border-black">
                                                <table width="100%" cellpadding="5">
                                                    <tr>
                                                        <td width="40%" className="font-size-12px-mobile">Nama Perusahaan</td>
                                                        <td className="font-size-12px-mobile">{dataDetailRiwayat.namaperusahaan}</td>
                                                    </tr>
                                                    <tr>
                                                        <td width="40%" className="font-size-12px-mobile">Nama Penerima</td>
                                                        <td className="font-size-12px-mobile">{dataDetailRiwayat.namalengkap}</td>
                                                    </tr>
                                                    <tr>
                                                        <td width="40%" className="font-size-12px-mobile">No Telepon</td>
                                                        <td className="font-size-12px-mobile">{dataDetailRiwayat.telp}</td>
                                                    </tr>
                                                    <tr>
                                                        <td width="40%" valign="top" className="font-size-12px-mobile">Lokasi Penerima</td>
                                                        <td className="font-size-12px-mobile">
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
                                    <div className="row font-size-12px-mobile">
                                        <div className="col-12 mb-3 mt-2 mt-lg-3 mt-md-3">
                                            Ditolak
                                        </div>
                                        <div className="col-6 mb-3">Tanggal Ditolak</div>
                                        <div className="col-6 text-end mb-3">{dataDetailRiwayat.rejectdate}</div>
                                        <div className="col-12 mb-3">
                                            <div className="mb-4">
                                                <h6 className="mb-3 fw-bold font-size-14px-mobile">Note</h6>
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
                                        <img src={warnIcon} width="35" />
                                    </div>
                                </div>
                                <div className="track-content fo-12px-mobilent-size">
                                    <div className="row mt-2 mt-lg-3 mt-md-3">
                                        <div className="col-12 mb-3">
                                            Internal Proses
                                        </div>
                                        <div className="col-6 mb-3">Tanggal Internal Proses</div>
                                        <div className="col-6 text-end mb-3">{dataDetailRiwayat.internalprosesdate}</div>
                                        <div className="col-12 mb-3">
                                            <div className="mb-5">
                                                <h6 className="mb-3 fw-bold font-size-14px-mobile">Note</h6>
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
                                            <img src={processIcon} width="35" />
                                        </div>
                                    </div>
                                )}
                                <div className="track-content font-size-12px-mobile">
                                    <div className="row">
                                        <div className="col-12 mb-3 mt-lg-3 mt-md-3 mt-2">
                                            Diproses
                                        </div>
                                        <div className="col-6 mb-3">Tanggal Diproses</div>
                                        <div className="col-6 text-end mb-3">{dataDetailRiwayat.prosesdate}</div>
                                        <div className="col-12 mb-1">
                                            <div className="mb-4">
                                                <h6 className="mb-3 fw-bold font-size-14px-mobile">Detail Pengerjaan</h6>
                                                <div className="row rounded-4 p-md-4 p-2 py-2 border border-black mx-lg-0 mx-md-0 mx-1">
                                                    {tracking.filter(val => val.status === 'Accept').map((val, key) => (
                                                        <table width="100%" cellPadding="5" key={key}>
                                                            <tr>
                                                                <td width="50%" className="font-size-12px-mobile">Service order</td>
                                                                <td className="font-size-12px-mobile">{val.serviceorder}</td>
                                                            </tr>
                                                            <tr>
                                                                <td width="50%" className="font-size-12px-mobile">Nama Petugas</td>
                                                                <td className="font-size-12px-mobile">{val.Username}</td>
                                                            </tr>
                                                            <tr>
                                                                <td width="50%" className="font-size-12px-mobile">Note</td>
                                                                <td className="font-size-12px-mobile">{val.notes}</td>
                                                            </tr>
                                                        </table>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="rounded-3 px-5 py-2 mb-4" style={{ background: 'white', border: "1px solid", whiteSpace: 'nowrap' }} onClick={handlePopup} >
                                        <i className="fa fa-truck me-2" style={{ fontSize: '20px' }} />
                                        <span className="font-size-14px-mobile">Lacak Petugas</span>
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
                                <div className="track-content font-size-12px-mobile">
                                    <div className="row mt-2 mt-lg-3 mt-md-3">
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
                                <div className="track-content font-size-12px-mobile">
                                    <div className="row mt-2 mt-lg-3 mt-md-3">
                                        <div className="col-12 pb-2 mb-1">
                                            Nilai & Review
                                        </div>
                                        <div className="col-12 mb-3">
                                            <i class={ratting[ratting.length - 1]?.Review > 0 ? 'fa fa-star fa-2x me-1 text-warning' : 'fa fa-star fa-2x me-1'} />
                                            <i class={ratting[ratting.length - 1]?.Review > 1 ? 'fa fa-star fa-2x me-1 text-warning' : 'fa fa-star fa-2x me-1'} />
                                            <i class={ratting[ratting.length - 1]?.Review > 2 ? 'fa fa-star fa-2x me-1 text-warning' : 'fa fa-star fa-2x me-1'} />
                                            <i class={ratting[ratting.length - 1]?.Review > 3 ? 'fa fa-star fa-2x me-1 text-warning' : 'fa fa-star fa-2x me-1'} />
                                            <i class={ratting[ratting.length - 1]?.Review > 4 ? 'fa fa-star fa-2x me-1 text-warning' : 'fa fa-star fa-2x me-1'} />
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

                    <div className="col-10 col-md-11 mb-5 text-end margin-left" style={{ marginLeft: '4rem'}}>
                        <div className="w-100 w-95-mobile">
                            <p className="text-start mb-2 fw-bold font-size-12px-mobile">Kirim email ke:</p>
                            <div className="p-0 text-start mb-2">
                                <input type="email" className=" p-3 border border-black rounded-2 font-size-11px-mobile w-input-mobile" style={{width: "91%"}} value={sendEmail} ></input>
                                <button className="btn btn-login d-inline border py-2 ms-md-3 ms-1 px-4 mt-0" type="submit" onClick={SendNotif}>Kirim</button>
                            </div>
                        </div>
                    </div>

                    {(dataDetailRiwayat.statusid == 1 || dataDetailRiwayat.statusid == 2 || dataDetailRiwayat.statusid == 5) && (
                        <div className="col-12 text-center">
                            <button className="btn btn-login px-5" onClick={handleChatTeamSupport}>Tanya Tim Support</button>
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