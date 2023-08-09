import { Component } from "react";
import { Link } from "react-router-dom";

export default class extends Component {
    render() {
        return (
            <>
            <div className="container-fluid py-4">
                <div className="title d-flex align-items-center mb-5">
                    <span className="title-icare fw-medium py-1" style={{borderBottom:'3px solid #014C90', fontSize:'18px'}}>Riwayat Permintaan</span>
                </div>
                <div className="card border-0 shadow-lg p-2 mb-3">
                    <div className="card-body">
                        <div className="navbar navbar-exspand-lg mb-4">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="btn-proses py-3 px-5 text-center rounded-4 fw-medium">Semua</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="btn-proses py-3 px-5 text-center rounded-4 fw-medium">Menunggu Konfirmasi</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="btn-proses py-3 px-5 text-center rounded-4 fw-medium">Permintaan Diproses</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="btn-proses py-3 px-5 text-center rounded-4 fw-medium">Permintaan Ditolak</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="btn-proses py-3 px-5 text-center rounded-4 fw-medium">Permintaan Selesai</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="card border-0 shadow mb-3">
                            <div className="reject-title rounded-top py-3 text-center" style={{backgroundColor:'#ff2020', fontWeight:'500', color:'#fff'}}>
                                <label>Reject</label>
                            </div>
                            <div className="row">
                                <div className="border-end col-md-2 col-sm-4 col-12">
                                    <p className="px-3 py-2">lorem</p>
                                </div>
                                <div className="border-end col-md-2 col-sm-4 col-12">
                                    <p className="px-3 py-2">lorem</p>
                                </div>
                                <div className="border-end col-md-5 col-sm-7 col-12">
                                    
                                </div>
                                <div className="col-md-3 col-sm-5 col-12 p-4">
                                    <Link className="btn-view d-flex shadow rounded-2 d-flex align-items-center p-0 mx-auto" style={{width:'70%', border:'none',backgroundColor:'#014C90'}} to="/detail-permintaan">
                                        <div className="col-9 p-2 text-center" style={{color:'#fff', fontSize:'12px'}}>
                                            VIEW DETAIL
                                        </div>
                                        <div className="col-3 text-center bg-white text-danger p-2 rounded-end">
                                            <i className="fa fa-chevron-right ms-2" style={{backgroundColor:'#fff'}}></i>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="card border-0 shadow mb-3">
                            <div className="selesai-title rounded-top py-3 text-center" style={{backgroundColor:'#009FC7', fontWeight:'500', color:'#fff'}}>
                                <label>Selesai</label>
                            </div>
                            <div className="row">
                                <div className="border-end col-md-2 col-sm-4 col-12">
                                    <p className="px-3 py-2">lorem</p>
                                </div>
                                <div className="border-end col-md-2 col-sm-4 col-12">
                                    <p className="px-3 py-2">lorem</p>
                                </div>
                                <div className="border-end col-md-5 col-sm-7 col-12">
                                    
                                </div>
                                <div className="col-md-3 col-sm-5 col-12 p-4">
                                    <button className="btn-view shadow rounded-2 d-flex align-items-center p-0 mx-auto mb-3" style={{width:'70%', border:'none',backgroundColor:'#014C90'}}>
                                        <div className="col-9 p-2 text-center" style={{color:'#fff', fontSize:'12px'}}>
                                            PESANAN DITERIMA
                                        </div>
                                        <div className="col-3 text-center bg-white text-danger p-2 rounded-end">
                                            <i className="fa fa-chevron-right ms-2" style={{backgroundColor:'#fff'}}></i>
                                        </div>
                                    </button>
                                    <button className="btn-view shadow rounded-2 d-flex align-items-center p-0 mx-auto" style={{width:'70%', border:'none',backgroundColor:'#014C90'}}>
                                        <div className="col-9 p-2 text-center" style={{color:'#fff', fontSize:'12px'}}>
                                            VIEW DETAIL
                                        </div>
                                        <div className="col-3 text-center bg-white text-danger p-2 rounded-end">
                                            <i className="fa fa-chevron-right ms-2" style={{backgroundColor:'#fff'}}></i>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="text-center mt-4">
                            <button className="btn btn-login w-100 py-3 shadow-sm">Lihat Lebih Banyak...</button>
                        </div>
                    </div>
                </div>
            </div>
            </>
        )
    }
}