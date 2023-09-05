import { Component } from "react";
import { Link } from "react-router-dom";

export default class extends Component {
    render() {
        return(
            <>
                <div className="container-fluid py-4">
                    <div className="d-flex align-items-center">
                        <Link className="list-items" to="/riwayat">
                            <i className="fa fa-arrow-left me-3" style={{fontSize:'18px', color:'#014C90'}}></i>
                            <span className="title-icare fw-medium py-1" style={{borderBottom:'3px solid #014C90', fontSize:'18px'}}>Detail Permintaan</span>
                        </Link>
                    </div>
                    <div className="card shadow p-3 border-0 ">
                        <div className="card-body">
                            <p className="lh-lg" style={{fontSize:'14px'}}>Awal Permintaan <br/> Tanggal Permintaan</p>
                            <div className="daftar-permintaan mb-3">
                                <b className="fw-medium" style={{fontSize:'14px'}}>Daftar Permintaan</b>
                                <div className="card shadow-sm p-3 my-2 rounded-4">
                                    <p className="lh-lg" style={{fontSize:'14px'}}>No. Request : CR-2310784 <br/> Consumable Request <br/> EQ : 300822 <br/> 1 Toner Cyan, 1 Drum Cyan <br/> test 12345</p>
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
                                            <p className="lh-lg" style={{fontSize:'14px'}}>Kantor pusat <br/> ima <br/> 081234567890 <br/> Nama Jalan: unknow 000 city <br/> No Gedung: 30 <br/> Nama Gedung: Gedung1</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tanggal-diproses mb-5">
                                <p style={{fontSize:'14px'}}>Tanggal Diproses</p>
                                <div className="detail-pengerjaan">
                                    <b className="fw-medium" style={{fontSize:'14px'}}>Detail Pengerjaan</b>
                                    <div className="card shadow-sm p-3 my-2 rounded-4">
                                        <p className="lh-lg" style={{fontSize:'14px'}}>Service Order <br/> Nama Petugas <br/> Note</p>
                                    </div>
                                </div>
                            </div>
                            <Link className="shadow-sm border rounded-4 py-2 px-5" style={{color:'#000'}}>
                                <i className="fa fa-truck me-2"></i>
                                    <label style={{fontSize:'14px'}} >
                                        Lacak Petugas
                                    </label>
                            </Link>
                            <hr className="mt-5"/>
                            <p style={{fontSize:'14px'}}>Tanggal selesai</p>
                            <hr/>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}