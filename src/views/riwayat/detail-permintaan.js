import { Link, useParams } from "react-router-dom";
import { getDetailRiwayatOrder } from "../../services/API";
import React, { useEffect, useState } from "react";
import TrackingAlert from "../../component/alert/trackingAlert";

function DetailPermintaan() {
    const [dataisLoaded, setDataisLoaded] = useState(false)
    const [dataRiwayatorder, setDataRiwayatorder] = useState([])
    const [showPopup, setShowPopup] = useState(false)
    const { id } = useParams()

    // useEffect(() => {
    //     init()
    //     getDetailRiwayatOrder().then(response => {
    //         console.log(response)
    //     })
    // }, [])

    useEffect(() => {
        init()
        getDetailRiwayatOrder(id).then(response => {
            console.log(response)
            setDataRiwayatorder(response)
            setDataisLoaded(true)
        })
    }, [id])

    async function getDetailRiwayatOrder(id) {
        const response = await fetch(`/api/getDetailRiwayatOrder/${id}`);
        const data = await response.json();
        return data;
    }    

    // componentDidMount() {
    //     this.init();
    // }

    async function init() {
        setDataisLoaded(false)

        var res = await getDetailRiwayatOrder(id);
        console.log("res : ", res);

        setDataisLoaded(true)
        setDataRiwayatorder(res)
        console.log("dataRiwayatorder L ", dataRiwayatorder);
    }

    const handlePopup = () => {
        setShowPopup(false)
    }
    
    return (
        <>
            <div className="container-fluid py-4">
                <div className="d-flex" style={{ alignItems: 'baseline', height: '55px' }}>
                    <Link className="list-items" to="/riwayat">
                        <i className="fa fa-arrow-left me-3" style={{ fontSize: '18px', color: '#014C90' }}></i>
                        <span className="title-icare fw-bold py-1" style={{ borderBottom: '3px solid #014C90', fontSize: '18px' }}>Detail Permintaan</span>
                    </Link>
                </div>
                {dataRiwayatorder.map((item) => (
                    <div key={item.id} className="card shadow p-3 border-0 ">
                        {parseInt(item.id) === '3' ? (
                        <div className="card-body">
                            <div className="row">
                                <div className="d-flex">
                                    <div className="col-1" style={{width:'4%'}}>
                                        <div style={{ position: 'absolute', transform: 'translate(-50%, 0)', textAlign: 'center' }}>
                                            <div className="mx-auto" style={{ padding: '4px', background: '#23ad4c', color: '#fff', borderRadius: '50%', border: '3px solid #fff', width: 40 }}>
                                                <i className="fa fa-check"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-11">
                                        <p className="lh-lg" style={{fontSize:'14px'}}>Awal Permintaan</p>
                                        <div className="d-flex" style={{fontSize:'14px'}}>
                                                <div className="col-10">
                                                    <p>Tanggal Permintaan</p>
                                                </div>
                                                <div className="col-3">
                                                    <p>{item.createdate}</p>
                                                </div>
                                            </div>
                                        <div className="daftar-permintaan mb-3">
                                            <b className="fw-medium" style={{fontSize:'14px'}}>Daftar Permintaan</b>
                                            <div className="card shadow-sm p-3 my-2 rounded-4">
                                                <p className="lh-lg" style={{fontSize:'14px'}}>No. Request : {item.requestNo}  <br/> {item.namarequest} <br/> EQ : {item.equipment} <br/> 1 Toner Cyan, 1 Drum Cyan <br/> {item.keterangan}</p>
                                            </div>
                                        </div>
                                        <div className="daftar-penerima mb-3">
                                            <b className="fw-medium" style={{fontSize:'14px'}}>Daftar Penerima</b>
                                            <div className="card shadow-sm p-3 my-2 rounded-4">
                                                <div className="row">
                                                    <div className="col-3">
                                                        <p className="lh-lg" style={{fontSize:'14px'}}>Nama Perusahaan <br/> Nama Penerima <br/> No Telepon <br/> Lokasi Penerima</p>
                                                    </div>
                                                    <div className="col-3">
                                                        <p className="lh-lg" style={{fontSize:'14px'}}>Kantor pusat <br/> {item.namalengkap} <br/> {item.telp} <br/> Nama Jalan: unknow 000 city <br/> No Gedung: 30 <br/> Nama Gedung: Gedung1</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="images-ditolak mb-4">
                                            <div className="text-center">
                                                <div className="col-lg-12 mb-4">
                                                    <img src="images/quality.png" style={{width:'25%'}}></img>
                                                </div>
                                                <div className="col-lg-12">
                                                <img src="images/satisfaction.png" style={{width:'25%'}}></img>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <div className="col-1" style={{width:'4%'}}>
                                        <div style={{ position: 'absolute', transform: 'translate(-50%, 0)', textAlign: 'center' }}>
                                            <div className="mx-auto" style={{ padding: '2px 6px', background: '#ff2020', color: '#fff', borderRadius: '50%', border: '3px solid #fff', fontWeight: 'bold', fontSize: 18, width: 38 }}>
                                                &times;
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-11">
                                        <div className="tanggal-ditolak mb-5">
                                            <p style={{fontSize:'14px'}}>Ditolak</p>
                                            <div className="d-flex" style={{fontSize:'14px'}}>
                                                <div className="col-10">
                                                    <p>Tanggal Ditolak</p>
                                                </div>
                                                <div className="col-3">
                                                    <p>4/12/2023 12:44:05 PM</p>
                                                </div>
                                            </div>
                                            <div className="notes">
                                                <b className="fw-bold" style={{fontSize:'14px'}}>Note</b>
                                                <div className="card shadow-sm p-3 my-2 rounded-4">
                                                    <p className="lh-lg" style={{fontSize:'14px'}}> Notes: {item.rejectnote} </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        ) : parseInt(item.id) === '4' ? (
                            <div className="card-body">
                                <div className="row">
                                    <div className="d-flex">
                                        <div className="col-1" style={{width:'4%'}}>
                                            <div style={{ position: 'absolute', transform: 'translate(-50%, 0)', textAlign: 'center' }}>
                                                <div className="mx-auto" style={{ padding: '4px', background: '#23ad4c', color: '#fff', borderRadius: '50%', border: '3px solid #fff', width: 40 }}>
                                                    <i className="fa fa-check"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-11">
                                            <p className="lh-lg" style={{fontSize:'14px'}}>Awal Permintaan</p>
                                            <div className="d-flex" style={{fontSize:'14px'}}>
                                                <div className="col-10">
                                                    <p>Tanggal Permintaan</p>
                                                </div>
                                                <div className="col-3">
                                                    <p>{item.createdate}</p>
                                                </div>
                                            </div>
                                            <div className="daftar-permintaan mb-3">
                                                <b className="fw-medium" style={{fontSize:'14px'}}>Daftar Permintaan</b>
                                                <div className="card shadow-sm p-3 my-2 rounded-4">
                                                    <p className="lh-lg" style={{fontSize:'14px'}}>No. Request : {item.requestNo} <br/> {item.namarequest} <br/> EQ : {item.equipment} <br/> 1 Toner Cyan, 1 Drum Cyan <br/> {item.keterangan}</p>
                                                </div>
                                            </div>
                                            <div className="daftar-penerima mb-3">
                                                <b className="fw-medium" style={{fontSize:'14px'}}>Daftar Penerima</b>
                                                <div className="card shadow-sm p-3 my-2 rounded-4">
                                                    <div className="row">
                                                        <div className="col-3">
                                                            <p className="lh-lg" style={{fontSize:'14px'}}>Nama Perusahaan <br/> Nama Penerima <br/> No Telepon <br/> Lokasi Penerima</p>
                                                        </div>
                                                        <div className="col-3">
                                                            <p className="lh-lg" style={{fontSize:'14px'}}>Kantor pusat <br/> {item.namalengkap} <br/> {item.telp} <br/> Nama Jalan: unknow 000 city <br/> No Gedung: 30 <br/> Nama Gedung: Gedung1</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="images-selesai mb-4">
                                                <div className="text-center">
                                                    <div className="col-lg-12 mb-4">
                                                        <img src="images/beranda.png" style={{width:'25%'}}></img>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <img src="" style={{width:'25%'}}></img>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex mt-5 mb-5">
                                        <div className="col-1" style={{width:'4%'}}>
                                            <div style={{ position: 'absolute', transform: 'translate(-50%, 0)', textAlign: 'center' }}>
                                                <div className="mx-auto" style={{ padding: '4px', background: '#23ad4c', color: '#fff', borderRadius: '50%', border: '3px solid #fff', width: 40 }}>
                                                    <i className="fa fa-check"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-11">
                                            <p>Internal Proses</p>
                                            <div className="d-flex">
                                                <div className="col-10">
                                                    <p>Tanggal Internal Proses</p>
                                                </div>
                                                <div className="col-3">
                                                    <p>8/1/2022 2:20:36 PM</p>
                                                </div>
                                            </div>
                                            <div className="notes">
                                                <b className="fw-bold" style={{fontSize:'14px'}}>Note</b>
                                                <div className="card shadow-sm p-3 my-2 rounded-4">
                                                    <p className="lh-lg" style={{fontSize:'14px'}}> Notes: Permintaan saat ini belum memenuhi rasio pemakaian, namun sudah diajukan dan masih menunggu konfirmasi dari tim terkait.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex">
                                        <div className="col-1" style={{width:'4%'}}>
                                            <div style={{ position: 'absolute', transform: 'translate(-50%, 0)', textAlign: 'center' }}>
                                                <div className="mx-auto" style={{ padding: '4px', background: '#23ad4c', color: '#fff', borderRadius: '50%', border: '3px solid #fff', width: 40 }}>
                                                    <i className="fa fa-check"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-11">
                                            <div className="tanggal-diproses mb-5">
                                                <p style={{fontSize:'14px'}}>Diproses</p>
                                                <div className="d-flex" style={{fontSize:'14px'}}>
                                                    <div className="col-10">
                                                        <p>Tanggal Diproses</p>
                                                    </div>
                                                    <div className="col-3">
                                                        <p>8/1/2022 2:52:12 PM</p>
                                                    </div>
                                                </div>
                                                <div className="detail-pengerjaan">
                                                    <b className="fw-bold" style={{fontSize:'14px'}}>Detail Pengerjaan</b>
                                                    <div className="card shadow-sm p-3 my-2 rounded-4">
                                                        <p className="lh-lg" style={{fontSize:'14px'}}>Service Order <br/> Nama Petugas <br/> Note</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <button className="shadow-sm border rounded-4 py-2 px-5" style={{color:'#000', background:'none'}} onClick={showPopup} >
                                                <i className="fa fa-truck me-2"></i>
                                                    <label style={{fontSize:'14px'}} >
                                                        Lacak Petugas
                                                    </label>
                                            </button>
                                            <TrackingAlert visible={showPopup} titleMessage="Lacak Petugas" customClass="col-sm-8" onClick={handlePopup} />
                                        </div>
                                    </div>
                                    <div className="d-flex mt-5">
                                        <div className="col-1" style={{width:'4%'}}>
                                            <div style={{ position: 'absolute', transform: 'translate(-50%, 0)', textAlign: 'center' }}>
                                                <div className="mx-auto" style={{ padding: '4px', background: '#23ad4c', color: '#fff', borderRadius: '50%', border: '3px solid #fff', width: 40 }}>
                                                    <i className="fa fa-check"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-11">
                                            <p style={{fontSize:'14px'}}>Selesai</p>
                                            <hr/>
                                                <div className="d-flex" style={{fontSize:'14px'}}>
                                                    <div className="col-10">
                                                        <p className="mb-0" style={{fontSize:'14px'}}>Tanggal Selesai</p>
                                                    </div>
                                                    <div className="col-3">
                                                        <p className="mb-0" style={{fontSize:'14px'}}>9/19/2022 10:15:15 AM</p>
                                                    </div>
                                                </div>
                                            <hr/>
                                        </div>
                                    </div>
                                </div>
                        </div>
                        ) : parseInt(item.id) === '2' ? (
                            <div className="card-body">
                                <div className="row">
                                    <div className="d-flex">
                                        <div className="col-1" style={{width:'4%'}}>
                                            <div style={{ position: 'absolute', transform: 'translate(-50%, 0)', textAlign: 'center' }}>
                                                <div className="mx-auto" style={{ padding: '4px', background: '#23ad4c', color: '#fff', borderRadius: '50%', border: '3px solid #fff', width: 40 }}>
                                                    <i className="fa fa-check"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-11">
                                            <p className="lh-lg" style={{fontSize:'14px'}}>Awal Permintaan</p>
                                            <div className="d-flex" style={{fontSize:'14px'}}>
                                                <div className="col-10">
                                                    <p>Tanggal Permintaan</p>
                                                </div>
                                                <div className="col-3">
                                                    <p>{item.createdate}</p>
                                                </div>
                                            </div>
                                            <div className="daftar-permintaan mb-3">
                                                <b className="fw-medium" style={{fontSize:'14px'}}>Daftar Permintaan</b>
                                                <div className="card shadow-sm p-3 my-2 rounded-4">
                                                    <p className="lh-lg" style={{fontSize:'14px'}}>No. Request : {item.requestNo} <br/> {item.namarequest} <br/> EQ : {item.equipment} <br/> 1 Toner Cyan, 1 Drum Cyan <br/> {item.keterangan}</p>
                                                </div>
                                            </div>
                                            <div className="daftar-penerima mb-3">
                                                <b className="fw-medium" style={{fontSize:'14px'}}>Daftar Penerima</b>
                                                <div className="card shadow-sm p-3 my-2 rounded-4">
                                                    <div className="row">
                                                        <div className="col-3">
                                                            <p className="lh-lg" style={{fontSize:'14px'}}>Nama Perusahaan <br/> Nama Penerima <br/> No Telepon <br/> Lokasi Penerima</p>
                                                        </div>
                                                        <div className="col-3">
                                                            <p className="lh-lg" style={{fontSize:'14px'}}>Kantor pusat <br/> {item.namalengkap} <br/> {item.telp} <br/> Nama Jalan: unknow 000 city <br/> No Gedung: 30 <br/> Nama Gedung: Gedung1</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="images-diproses mb-4">
                                                <div className="text-center">
                                                    <div className="col-lg-12 mb-4">
                                                        <img src="images/foto-sticker.png" style={{width:'25%'}}></img>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <img src="" style={{width:'25%'}}></img>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex">
                                        <div className="col-1" style={{width:'4%'}}>
                                            <div style={{ position: 'absolute', transform: 'translate(-50%, 0)', textAlign: 'center' }}>
                                                <div className="mx-auto" style={{ padding: '4px', width: 40 }}>
                                                    {/* <i className="fa fa-check"></i> */}
                                                    <img src="images/icon_diproses_new.png" style={{width:'100%'}}></img>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-11">
                                            <div className="tanggal-diproses mb-5">
                                                <p style={{fontSize:'14px'}}>Diproses</p>
                                                <div className="d-flex" style={{fontSize:'14px'}}>
                                                    <div className="col-10">
                                                        <p>Tanggal Diproses</p>
                                                    </div>
                                                    {/* <div className="col-3">
                                                        <p>9/19/2023 2:02:16 PM</p>
                                                    </div> */}
                                                </div>
                                                <div className="detail-pengerjaan">
                                                    <b className="fw-bold" style={{fontSize:'14px'}}>Detail Pengerjaan</b>
                                                    <div className="card shadow-sm p-3 my-2 rounded-4">
                                                        <div className="d-flex">
                                                            <div className="col-6">
                                                                <p className="lh-lg mb-0" style={{fontSize:'14px'}}>Service Order</p>
                                                                <p className="lh-lg mb-0" style={{fontSize:'14px'}}>Nama Petugas</p>
                                                                <p className="lh-lg mb-0" style={{fontSize:'14px'}}>Note</p>
                                                            </div>
                                                            {/* <div className="col-4">
                                                                <p className="lh-lg mb-0" style={{fontSize:'14px'}}>3517552</p>
                                                                <p className="lh-lg mb-0" style={{fontSize:'14px'}}>STEVEN PRASETYO</p>
                                                                <p className="lh-lg mb-0" style={{fontSize:'14px'}}>Permintaan sudah kami proses</p>
                                                            </div> */}
                                                        </div>
                                                        {/* <p className="lh-lg" style={{fontSize:'14px'}}>Service Order <br/> Nama Petugas <br/> Note</p> */}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="chat text-center">
                                                <Link to="/tanya_tim_support">
                                                    <button className="btn btn-login" style={{width:'25%'}}>Tanya Tim Support</button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        </div>
                        ) : parseInt(item.id) === '5' ? (
                            <div className="card-body">
                                <div className="row">
                                    <div className="d-flex">
                                        <div className="col-1" style={{width:'4%'}}>
                                            <div style={{ position: 'absolute', transform: 'translate(-50%, 0)', textAlign: 'center' }}>
                                                <div className="mx-auto" style={{ padding: '4px', background: '#23ad4c', color: '#fff', borderRadius: '50%', border: '3px solid #fff', width: 40 }}>
                                                    <i className="fa fa-check"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-11">
                                            <p className="lh-lg" style={{fontSize:'14px'}}>Awal Permintaan</p>
                                            <div className="d-flex" style={{fontSize:'14px'}}>
                                                <div className="col-10">
                                                    <p>Tanggal Permintaan</p>
                                                </div>
                                                <div className="col-3">
                                                    <p>{item.createdate}</p>
                                                </div>
                                            </div>
                                            <div className="daftar-permintaan mb-3">
                                                <b className="fw-medium" style={{fontSize:'14px'}}>Daftar Permintaan</b>
                                                <div className="card shadow-sm p-3 my-2 rounded-4">
                                                    <p className="lh-lg" style={{fontSize:'14px'}}>No. Request : {item.requestNo} <br/> {item.namarequest} <br/> EQ : {item.equipment} <br/> 1 Toner Cyan, 1 Drum Cyan <br/> {item.keterangan}</p>
                                                </div>
                                            </div>
                                            <div className="daftar-penerima mb-3">
                                                <b className="fw-medium" style={{fontSize:'14px'}}>Daftar Penerima</b>
                                                <div className="card shadow-sm p-3 my-2 rounded-4">
                                                    <div className="row">
                                                        <div className="col-3">
                                                            <p className="lh-lg" style={{fontSize:'14px'}}>Nama Perusahaan <br/> Nama Penerima <br/> No Telepon <br/> Lokasi Penerima</p>
                                                        </div>
                                                        <div className="col-3">
                                                            <p className="lh-lg" style={{fontSize:'14px'}}>Kantor pusat <br/> {item.namalengkap} <br/> {item.telp} <br/> Nama Jalan: unknow 000 city <br/> No Gedung: 30 <br/> Nama Gedung: Gedung1</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="images-selesai mb-4">
                                                <div className="text-center">
                                                    <div className="col-lg-12 mb-4">
                                                        <img src="images/beranda.png" style={{width:'25%'}}></img>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <img src="" style={{width:'25%'}}></img>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex mt-5 mb-5">
                                        <div className="col-1" style={{width:'4%'}}>
                                            <div style={{ position: 'absolute', transform: 'translate(-50%, 0)', textAlign: 'center' }}>
                                                <div className="mx-auto" style={{ padding: '4px', background: '#23ad4c', color: '#fff', borderRadius: '50%', border: '3px solid #fff', width: 40 }}>
                                                    <i className="fa fa-check"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-11">
                                            <p>Internal Proses</p>
                                            <div className="d-flex">
                                                <div className="col-10">
                                                    <p>Tanggal Internal Proses</p>
                                                </div>
                                                <div className="col-3">
                                                    <p>8/1/2022 2:20:36 PM</p>
                                                </div>
                                            </div>
                                            <div className="notes">
                                                <b className="fw-bold" style={{fontSize:'14px'}}>Note</b>
                                                <div className="card shadow-sm p-3 my-2 rounded-4">
                                                    <p className="lh-lg" style={{fontSize:'14px'}}> Notes: Permintaan saat ini belum memenuhi rasio pemakaian, namun sudah diajukan dan masih menunggu konfirmasi dari tim terkait.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex">
                                        <div className="col-1" style={{width:'4%'}}>
                                            <div style={{ position: 'absolute', transform: 'translate(-50%, 0)', textAlign: 'center' }}>
                                                <div className="mx-auto" style={{ padding: '4px', background: '#23ad4c', color: '#fff', borderRadius: '50%', border: '3px solid #fff', width: 40 }}>
                                                    <i className="fa fa-check"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-11">
                                            <div className="tanggal-diproses mb-5">
                                                <p style={{fontSize:'14px'}}>Diproses</p>
                                                <div className="d-flex" style={{fontSize:'14px'}}>
                                                    <div className="col-10">
                                                        <p>Tanggal Diproses</p>
                                                    </div>
                                                    <div className="col-3">
                                                        <p>8/1/2022 2:52:12 PM</p>
                                                    </div>
                                                </div>
                                                <div className="detail-pengerjaan">
                                                    <b className="fw-bold" style={{fontSize:'14px'}}>Detail Pengerjaan</b>
                                                    <div className="card shadow-sm p-3 my-2 rounded-4">
                                                        <p className="lh-lg" style={{fontSize:'14px'}}>Service Order <br/> Nama Petugas <br/> Note</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <button className="shadow-sm border rounded-4 py-2 px-5" style={{color:'#000', background:'none'}} onClick={this.showPopup.bind(this)}>
                                                <i className="fa fa-truck me-2"></i>
                                                    <label style={{fontSize:'14px'}} >
                                                        Lacak Petugas
                                                    </label>
                                            </button>
                                            <TrackingAlert visible={showPopup} titleMessage="Lacak Petugas" customClass="col-sm-8" onClick={handlePopup} />
                                        </div>
                                    </div>
                                    <div className="d-flex mt-5">
                                        <div className="col-1" style={{width:'4%'}}>
                                            <div style={{ position: 'absolute', transform: 'translate(-50%, 0)', textAlign: 'center' }}>
                                                <div className="mx-auto" style={{ padding: '4px', background: '#23ad4c', color: '#fff', borderRadius: '50%', border: '3px solid #fff', width: 40 }}>
                                                    <i className="fa fa-check"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-11">
                                            <p style={{fontSize:'14px'}}>Selesai</p>
                                                <div className="d-flex" style={{fontSize:'14px'}}>
                                                    <div className="col-10">
                                                        <p className="mb-0" style={{fontSize:'14px'}}>Tanggal Selesai</p>
                                                    </div>
                                                    <div className="col-3">
                                                        <p className="mb-0" style={{fontSize:'14px'}}>9/19/2022 10:15:15 AM</p>
                                                    </div>
                                                </div>
                                        </div>
                                    </div>
                                    <div className="d-flex mt-5">
                                        <div className="col-1" style={{width:'4%'}}>
                                            <div style={{ position: 'absolute', transform: 'translate(-50%, 0)', textAlign: 'center' }}>
                                                <div className="mx-auto" style={{ padding: '4px', background: '#23ad4c', color: '#fff', borderRadius: '50%', border: '3px solid #fff', width: 40 }}>
                                                    <i className="fa fa-check"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-11">
                                            <p style={{fontSize:'14px'}}>Nilai & Review</p>
                                            <div className="nilai fs-2">
                                                <i className="fa fa-star px-1" style={{color: '#FEE717'}}></i>
                                                <i className="fa fa-star px-1" style={{color: '#FEE717'}}></i>
                                                <i className="fa fa-star px-1" style={{color: '#FEE717'}}></i>
                                                <i className="fa fa-star px-1" style={{color: '#FEE717'}}></i>
                                                <i className="fa fa-star px-1" style={{color: '#FEE717'}}></i>
                                            </div>
                                            <div className="review">
                                                <div className="card shadow-sm p-3 my-2 rounded-4">
                                                    <p className="lh-lg" style={{fontSize:'14px'}}> keren </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </div>
                        ) :  parseInt(item.id) === '6' ? (
                            <div className="card-body">
                                <div className="row">
                                    <div className="d-flex">
                                        <div className="col-1" style={{width:'4%'}}>
                                            <div style={{ position: 'absolute', transform: 'translate(-50%, 0)', textAlign: 'center' }}>
                                                <div className="mx-auto" style={{ padding: '4px', background: '#23ad4c', color: '#fff', borderRadius: '50%', border: '3px solid #fff', width: 40 }}>
                                                    <i className="fa fa-check"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-11">
                                            <p className="lh-lg" style={{fontSize:'14px'}}>Awal Permintaan</p>
                                            <div className="d-flex" style={{fontSize:'14px'}}>
                                                <div className="col-10">
                                                    <p>Tanggal Permintaan</p>
                                                </div>
                                                <div className="col-3">
                                                    <p>{item.createdate}</p>
                                                </div>
                                            </div>
                                            <div className="daftar-permintaan mb-3">
                                                <b className="fw-medium" style={{fontSize:'14px'}}>Daftar Permintaan</b>
                                                <div className="card shadow-sm p-3 my-2 rounded-4">
                                                    <p className="lh-lg" style={{fontSize:'14px'}}>No. Request : {item.requestNo} <br/> {item.namarequest} <br/> EQ : {item.equipment} <br/> 1 Toner Cyan, 1 Drum Cyan <br/> {item.keterangan}</p>
                                                </div>
                                            </div>
                                            <div className="daftar-penerima mb-3">
                                                <b className="fw-medium" style={{fontSize:'14px'}}>Daftar Penerima</b>
                                                <div className="card shadow-sm p-3 my-2 rounded-4">
                                                    <div className="row">
                                                        <div className="col-3">
                                                            <p className="lh-lg" style={{fontSize:'14px'}}>Nama Perusahaan <br/> Nama Penerima <br/> No Telepon <br/> Lokasi Penerima</p>
                                                        </div>
                                                        <div className="col-3">
                                                            <p className="lh-lg" style={{fontSize:'14px'}}>Kantor pusat <br/> {item.namalengkap} <br/> {item.telp} <br/> Nama Jalan: unknow 000 city <br/> No Gedung: 30 <br/> Nama Gedung: Gedung1</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="images-diproses mb-4">
                                                <div className="text-center">
                                                    <div className="col-lg-12 mb-4">
                                                        <img src="images/foto-sticker.png" style={{width:'25%'}}></img>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <img src="" style={{width:'25%'}}></img>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex">
                                        <div className="col-1" style={{width:'4%'}}>
                                            <div style={{ position: 'absolute', transform: 'translate(-50%, 0)', textAlign: 'center' }}>
                                                <div className="mx-auto" style={{ padding: '4px', width: 40 }}>
                                                    {/* <i className="fa fa-check"></i> */}
                                                    <img src="images/icon_diproses_new.png" style={{width:'100%'}}></img>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-11">
                                            <div className="tanggal-diproses mb-5">
                                                <p style={{fontSize:'14px'}}>Diproses</p>
                                                <div className="d-flex" style={{fontSize:'14px'}}>
                                                    <div className="col-10">
                                                        <p>Tanggal Diproses</p>
                                                    </div>
                                                    <div className="col-3">
                                                        <p>9/19/2023 2:02:16 PM</p>
                                                    </div>
                                                </div>
                                                <div className="detail-pengerjaan">
                                                    <b className="fw-bold" style={{fontSize:'14px'}}>Detail Pengerjaan</b>
                                                    <div className="card shadow-sm p-3 my-2 rounded-4">
                                                        <div className="d-flex">
                                                            <div className="col-6">
                                                                <p className="lh-lg mb-0" style={{fontSize:'14px'}}>Service Order</p>
                                                                <p className="lh-lg mb-0" style={{fontSize:'14px'}}>Nama Petugas</p>
                                                                <p className="lh-lg mb-0" style={{fontSize:'14px'}}>Note</p>
                                                            </div>
                                                            <div className="col-4">
                                                                <p className="lh-lg mb-0" style={{fontSize:'14px'}}>3517552</p>
                                                                <p className="lh-lg mb-0" style={{fontSize:'14px'}}>STEVEN PRASETYO</p>
                                                                <p className="lh-lg mb-0" style={{fontSize:'14px'}}>Permintaan sudah kami proses</p>
                                                            </div>
                                                        </div>
                                                        {/* <p className="lh-lg" style={{fontSize:'14px'}}>Service Order <br/> Nama Petugas <br/> Note</p> */}
                                                    </div>
                                                </div>
                                            </div>
                                            <button className="shadow-sm border rounded-4 py-2 px-5 mb-5" style={{color:'#000', background:'none'}} onClick={this.showPopup.bind(this)}>
                                                <i className="fa fa-truck me-2"></i>
                                                    <label style={{fontSize:'14px'}} >
                                                        Lacak Petugas
                                                    </label>
                                            </button>
                                            <TrackingAlert visible={showPopup} titleMessage="Lacak Petugas" customClass="col-sm-8" onClick={handlePopup} />
                                            <div className="chat text-center">
                                                <Link to="/tanya_tim_support">
                                                    <button className="btn btn-login" style={{width:'25%'}}>Tanya Tim Support</button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        </div>
                        ) : (
                            <div className="card-body">
                                <div className="row">
                                    <div className="d-flex">
                                        <div className="col-1" style={{width:'4%'}}>
                                            <div style={{ position: 'absolute', transform: 'translate(-50%, 0)', textAlign: 'center' }}>
                                                <div className="mx-auto" style={{ padding: '4px', background: '#23ad4c', color: '#fff', borderRadius: '50%', border: '3px solid #fff', width: 40 }}>
                                                    <i className="fa fa-check"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-11">
                                            <p className="lh-lg" style={{fontSize:'14px'}}>Awal Permintaan</p>
                                            <div className="d-flex" style={{fontSize:'14px'}}>
                                                <div className="col-10">
                                                    <p>Tanggal Permintaan</p>
                                                </div>
                                                <div className="col-3">
                                                    <p>{item.createdate}</p>
                                                </div>
                                            </div>
                                            <div className="daftar-permintaan mb-3">
                                                <b className="fw-medium" style={{fontSize:'14px'}}>Daftar Permintaan</b>
                                                <div className="card shadow-sm p-3 my-2 rounded-4">
                                                    <p className="lh-lg" style={{fontSize:'14px'}}>No. Request : {item.requestNo} <br/> {item.namarequest} <br/> EQ : {item.equipment} <br/> 1 Toner Cyan, 1 Drum Cyan <br/> {item.keterangan}</p>
                                                </div>
                                            </div>
                                            <div className="daftar-penerima mb-3">
                                                <b className="fw-medium" style={{fontSize:'14px'}}>Daftar Penerima</b>
                                                <div className="card shadow-sm p-3 my-2 rounded-4">
                                                    <div className="row">
                                                        <div className="col-3">
                                                            <p className="lh-lg" style={{fontSize:'14px'}}>Nama Perusahaan <br/> Nama Penerima <br/> No Telepon <br/> Lokasi Penerima</p>
                                                        </div>
                                                        <div className="col-3">
                                                            <p className="lh-lg" style={{fontSize:'14px'}}>Kantor pusat <br/> {item.namalengkap} <br/> {item.telp} <br/> Nama Jalan: unknow 000 city <br/> No Gedung: 30 <br/> Nama Gedung: Gedung1</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="images-menunggu-konfirmasi mb-4">
                                                <div className="text-center">
                                                    <div className="col-lg-12 mb-4">
                                                        <img src="images/Cahyo_MFD.png" style={{width:'25%'}}></img>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <img src="" style={{width:'25%'}}></img>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="chat text-center">
                                                <Link to="/tanya_tim_support">
                                                    <button className="btn btn-login" style={{width:'25%'}}>Tanya Tim Support</button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </div>
                        )}
                    </div>
                ))}

                {/* <div className="card shadow p-3 border-0 ">
                    <div className="card-body">
                        <p className="lh-lg" style={{ fontSize: '14px' }}>Awal Permintaan <br /> Tanggal Permintaan : {item.createdate}</p>
                        <div className="daftar-permintaan mb-3">
                            <b className="fw-medium" style={{ fontSize: '14px' }}>Daftar Permintaan</b>
                            <div className="card shadow-sm p-3 my-2 rounded-4">
                                <p className="lh-lg" style={{ fontSize: '14px' }}>No. Request : {item.requestNo} <br /> {item.namarequest} <br /> EQ : {item.equipment} <br /> 1 Toner Cyan, 1 Drum Cyan <br /> {item.keterangan}</p>
                            </div>
                        </div>
                        <div className="daftar-penerima mb-3">
                            <b className="fw-medium" style={{ fontSize: '14px' }}>Daftar Penerima</b>
                            <div className="card shadow-sm p-3 my-2 rounded-4">
                                <div className="row">
                                    <div className="col-3">
                                        <p className="lh-lg" style={{ fontSize: '14px' }}>Nama Perusahaan <br /> Nama Penerima <br /> No Telepon <br /> Lokasi Penerima</p>
                                    </div>
                                    <div className="col-3">
                                        <p className="lh-lg" style={{ fontSize: '14px' }}>Kantor pusat <br /> {item.namalengkap} <br /> {item.telp} <br /> Nama Jalan: unknow 000 city <br /> No Gedung: 30 <br /> Nama Gedung: Gedung1</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tanggal-diproses mb-5">
                            <p style={{ fontSize: '14px' }}>Tanggal Diproses</p>
                            <div className="detail-pengerjaan">
                                <b className="fw-medium" style={{ fontSize: '14px' }}>Detail Pengerjaan</b>
                                <div className="card shadow-sm p-3 my-2 rounded-4">
                                    <p className="lh-lg" style={{ fontSize: '14px' }}>Service Order <br /> Nama Petugas <br /> Note : {item.rejectnote}</p>
                                </div>
                            </div>
                        </div>
                        <Link className="shadow-sm border rounded-4 py-2 px-5" style={{ color: '#000' }}>
                            <i className="fa fa-truck me-2"></i>
                            <label style={{ fontSize: '14px' }} >
                                Lacak Petugas
                            </label>
                        </Link>
                        <hr className="mt-5" />
                        <p style={{ fontSize: '14px' }}>Tanggal selesai</p>
                        <hr />
                    </div>
                </div> */}
            </div>
        </>
    )
}

export default DetailPermintaan

// export default class extends Component {

//     componentDidMount() {
//         this.init();
//     }

//     async init() {
//         this.setState({
//             DataisLoaded: false,
//         });

//         var res = await getDetailRiwayatOrder();
//         console.log("res : ", res);




//         this.setState({
//             DataisLoaded: true,
//             dataRiwayatorder: res,
//         });
//         console.log("dataRiwayatorder L ", this.state.dataRiwayatorder);
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
//                 {this.state.dataRiwayatorder.map((item) => (
//                     <div className="container-fluid py-4">
//                         <div className="d-flex" style={{ alignItems: 'baseline', height: '55px' }}>
//                             <Link className="list-items" to="/riwayat">
//                                 <i className="fa fa-arrow-left me-3" style={{ fontSize: '18px', color: '#014C90' }}></i>
//                                 <span className="title-icare fw-bold py-1" style={{ borderBottom: '3px solid #014C90', fontSize: '18px' }}>Detail Permintaan</span>
//                             </Link>
//                         </div>
//                         <div className="card shadow p-3 border-0 ">
//                             <div className="card-body">
//                                 <p className="lh-lg" style={{ fontSize: '14px' }}>Awal Permintaan <br /> Tanggal Permintaan : {item.createdate}</p>
//                                 <div className="daftar-permintaan mb-3">
//                                     <b className="fw-medium" style={{ fontSize: '14px' }}>Daftar Permintaan</b>
//                                     <div className="card shadow-sm p-3 my-2 rounded-4">
//                                         <p className="lh-lg" style={{ fontSize: '14px' }}>No. Request : {item.requestNo} <br /> {item.namarequest} <br /> EQ : {item.equipment} <br /> 1 Toner Cyan, 1 Drum Cyan <br /> {item.keterangan}</p>
//                                     </div>
//                                 </div>
//                                 <div className="daftar-penerima mb-3">
//                                     <b className="fw-medium" style={{ fontSize: '14px' }}>Daftar Penerima</b>
//                                     <div className="card shadow-sm p-3 my-2 rounded-4">
//                                         <div className="row">
//                                             <div className="col-3">
//                                                 <p className="lh-lg" style={{ fontSize: '14px' }}>Nama Perusahaan <br /> Nama Penerima <br /> No Telepon <br /> Lokasi Penerima</p>
//                                             </div>
//                                             <div className="col-3">
//                                                 <p className="lh-lg" style={{ fontSize: '14px' }}>Kantor pusat <br /> {item.namalengkap} <br /> {item.telp} <br /> Nama Jalan: unknow 000 city <br /> No Gedung: 30 <br /> Nama Gedung: Gedung1</p>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="tanggal-diproses mb-5">
//                                     <p style={{ fontSize: '14px' }}>Tanggal Diproses</p>
//                                     <div className="detail-pengerjaan">
//                                         <b className="fw-medium" style={{ fontSize: '14px' }}>Detail Pengerjaan</b>
//                                         <div className="card shadow-sm p-3 my-2 rounded-4">
//                                             <p className="lh-lg" style={{ fontSize: '14px' }}>Service Order <br /> Nama Petugas <br /> Note : {item.rejectnote}</p>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <Link className="shadow-sm border rounded-4 py-2 px-5" style={{ color: '#000' }}>
//                                     <i className="fa fa-truck me-2"></i>
//                                     <label style={{ fontSize: '14px' }} >
//                                         Lacak Petugas
//                                     </label>
//                                 </Link>
//                                 <hr className="mt-5" />
//                                 <p style={{ fontSize: '14px' }}>Tanggal selesai</p>
//                                 <hr />
//                             </div>
//                         </div>
//                     </div>


//                 ))}
//             </>
//         )
//     }
// }
