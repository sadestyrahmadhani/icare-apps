import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";

export default class extends Component {
    render () {
        return (
            <>
            <div className="container">
                <div className="d-flex align-items-center mb-4">
                    <Link className="list-items" to="../daftar-eq">
                        <i className="fa fa-arrow-left me-3" style={{fontSize:'16px', color:'#014C90'}}></i>
                        <span className="title-icare fw-bold py-1" style={{borderBottom:'3px solid #014C90', fontSize:'16px'}}>Tambah EQ</span>
                    </Link>
                </div>
                <div className="card shadow border-0" style={{borderRadius:'20px'}}>
                    <div className="card-body">
                        <div className="card border-0 mt-2" style={{borderRadius:'15px', boxShadow:'1px 1px 3px 3px #bfbfbf'}}>
                            <div className="card-body">
                                <div className="card-label">
                                    <label style={{fontWeight: 'bold'}}>No EQ</label>
                                </div>
                                <input type="text" className="py-1 border-only-bottom" style={{fontSize: '14px', color:'black', width: '-webkit-fill-available'}}/>
                            </div>
                        </div>
                        <div className="card border-0 mt-4" style={{borderRadius:'15px', boxShadow:'1px 1px 3px 3px #bfbfbf'}}>
                            <div className="card-body">
                                <div className="card-label">
                                    <label style={{fontWeight: 'bold'}}>Nama Model</label>
                                </div>
                                <input type="text" className="py-1 border-only-bottom" style={{fontSize: '14px', color:'black', width: '-webkit-fill-available'}}/>
                            </div>
                        </div>
                        <div className="card border-0 mt-4" style={{borderRadius:'15px', boxShadow:'1px 1px 3px 3px #bfbfbf'}}>
                            <div className="card-body">
                                <div className="card-label">
                                    <label style={{fontWeight: 'bold'}}>Keterangan</label>
                                </div>
                                <input type="text" className="py-1 border-only-bottom" style={{fontSize: '14px', color:'black', width: '-webkit-fill-available'}}/>
                            </div>
                        </div>
                        <Link className="alamat" to="/address">
                        <div className="card border-0 mt-4 pb-5" style={{borderRadius:'15px', boxShadow:'1px 1px 3px 3px #bfbfbf'}}>
                            <div className="card-body">
                                <div className="card-label">
                                    <label style={{fontWeight: 'bold'}}>Alamat</label>
                                </div>
                            </div>
                        </div>
                        </Link>
                    </div>
                    <div className="col text-center mt-4 mb-4">
                        <button className="btn btn-login py-2 px-5" style={{fontSize:'14px', width:'18%', height:'43px'}}>SIMPAN</button>
                    </div>
                </div>
            </div>
            </>
        )
    }
}