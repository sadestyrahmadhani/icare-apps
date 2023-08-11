import { Component } from "react";
import { Link } from "react-router-dom";

export default class extends Component {
    render(){
        return(
            <>
                <div className="container-fluid py-3">
                    <div className="d-flex align-items-center mb-4">
                        <Link className="list-items" to="/address">
                            <i className="fa fa-arrow-left me-3" style={{fontSize: '16px', color: '#014C90'}}></i>
                        </Link>
                        <span className="title-icare fw-bold py-1" style={{borderBottom: '3px solid #014C90', fontSize: '18px'}}>Form Alamat</span>
                    </div>
                    <div className="card p-2 shadow">
                        <div className="card-body">
                            <form>
                                <div className="card p-2 mb-3">
                                    <div className="card-body" style={{fontSize: '14px'}}>
                                        <div className="card-label py-1">
                                            <label style={{fontWeight: 'bold'}}>Simpan Alamat Sebagai (Contoh: Kantor Pusat PT Angin Ribut) <span className="text-danger">*</span></label>
                                        </div>
                                        <input type="text" className="py-1 mb-3 border-only-bottom" style={{fontSize: '14px', width: '-webkit-fill-available'}}/>
                                        <div className="card-label py-1">
                                            <label style={{fontWeight: 'bold'}}>Nama Penerima <span className="text-danger">*</span></label>
                                        </div>
                                        <input type="text" className="py-1 mb-3 border-only-bottom" style={{fontSize: '14px', width: '-webkit-fill-available'}}/>
                                    </div>
                                </div>
                                <div className="card p-2 mb-3">
                                    <div className="card-body" style={{fontSize: '14px'}}>
                                        <label className="mb-3" style={{fontWeight: 'bold'}}>Alamat Lengkap</label>
                                        <div className="card-label py-1">
                                            <label style={{}}>Nama Jalan (Contoh: Jl. Keramat Raya) <span className="text-danger">*</span></label>
                                        </div>
                                        <input type="text" className="py-1 mb-3 border-only-bottom" style={{fontSize: '14px', width: '-webkit-fill-available'}}/>
                                        <div className="card-label py-1">
                                            <label style={{}}>Nomor Gedung/Kantor (Contoh: No. 43 / Blok B2 / Kav II) <span className="text-danger">*</span></label>
                                        </div>
                                        <input type="text" className="py-1 mb-3 border-only-bottom" style={{fontSize: '14px', width: '-webkit-fill-available'}}/>
                                        <div className="card-label py-1">
                                            <label style={{}}>Nama Gedung/Kantor (Contoh: Gedung Astagraphia, lantai 4 / Ruko Boulevard / Kios Cetak ABC) <span className="text-danger">*</span></label>
                                        </div>
                                        <input type="text" className="py-1 mb-3 border-only-bottom" style={{fontSize: '14px', width: '-webkit-fill-available'}}/>
                                        <div className="card-label py-1">
                                            <label style={{}}>Kota (Contoh: Jakarta Pusat) <span className="text-danger">*</span></label>
                                        </div>
                                        <input type="text" className="py-1 mb-3 border-only-bottom" style={{fontSize: '14px', width: '-webkit-fill-available'}}/>
                                        <div className="card-label py-1">
                                            <label style={{}}>Kode Pos (Contoh: 10450) <span className="text-danger">*</span></label>
                                        </div>
                                        <input type="text" className="py-1 mb-3 border-only-bottom" style={{fontSize: '14px', width: '-webkit-fill-available'}}/>
                                    </div>
                                </div>
                                <div className="card p-2 mb-3">
                                    <div className="card-body" style={{fontSize: '14px'}}>
                                        <div className="card-label py-1">
                                            <label style={{fontWeight: 'bold'}}>No Telepon Penerima <span className="text-danger">*</span></label>
                                        </div>
                                        <input type="text" className="py-1 mb-3 border-only-bottom" style={{fontSize: '14px', width: '-webkit-fill-available'}}/>
                                    </div>
                                </div>
                                <div className="card p-2 mb-5">
                                    <div className="card-body" style={{fontSize: '14px'}}>
                                        <div className="card-label py-1">
                                            <label style={{fontWeight: 'bold'}}>Lokasi Pengiriman</label>
                                        </div>
                                        <div className="row">
                                            <div className="col-1 mb-2">
                                                <img src="/images/map.png" alt="" style={{width: '60px'}}/>
                                            </div>
                                            <div className="col-11 mb-2">
                                                <input type="text" className="border-only-bottom" style={{fontSize: '14px', width: '-webkit-fill-available', paddingTop: '30px'}}/>
                                            </div>
                                            <span style={{fontWeight: 'bold'}}>Pastikan lokasi yang anda tandai di peta sesuai dengan alamat yang anda isi diatas</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <button className="btn btn-login fw-bold" type="submit" style={{padding: '10px 50px'}}>SIMPAN</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}