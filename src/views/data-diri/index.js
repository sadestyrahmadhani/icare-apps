import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";

export default class extends Component {
    render () {
        return (
            <>
            <div className="container">
                <div className="title d-flex align-items-center">
                    <strong className="title-icare py-2" style={{ fontSize: 20, borderBottom: '3px solid #014C90' }} > Data Diri </strong>
                </div>
                <div className="container pt-4">
                    <div className="card px-3 shadow border-0" style={{borderRadius:'20px'}}>
                        <div className="card-body">
                            <div className="row">
                                <div className="col">
                                    <div className="card" style={{borderRadius:'0px', border:'1px solid', height:'90px'}}>
                                        <div className="card-header" style={{borderRadius:'0px', backgroundColor:'#014C90'}}>
                                            <h6 style={{color:'white'}}>Nama</h6>
                                        </div>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col">
                                                    <div className="card-tex">
                                                        <span className="text">Indri</span>
                                                    </div>
                                                </div>
                                                <div className="col-md-auto">
                                                    <Link className="nav-link" to="">Ubah</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row pt-4">
                                <div className="col">
                                    <div className="card" style={{borderRadius:'0px', border:'1px solid', height:'90px'}}>
                                        <div className="card-header" style={{borderRadius:'0px', backgroundColor:'#014C90'}}>
                                            <h6 style={{color:'white'}}>Email</h6>
                                        </div>
                                        <div className="card-body">
                                            <h6>indri_moshy@yahoo.com</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row pt-4">
                                <div className="col">
                                    <div className="card" style={{borderRadius:'0px', border:'1px solid', height:'90px'}}>
                                        <div className="card-header" style={{borderRadius:'0px', backgroundColor:'#014C90'}}>
                                            <h6 style={{color:'white'}}>No Telepon</h6>
                                        </div>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col">
                                                    <div className="card-text">
                                                        <h6>+6289619333857</h6>
                                                    </div>
                                                </div>
                                                <div className="col-md-auto">
                                                    <div className="card-text">
                                                        <Link className="nav-link" to="">Ubah</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row pt-4">
                                <div className="col">
                                    <div className="card" style={{borderRadius:'0px', border:'1px solid', height:'90px'}}>
                                        <div className="card-header" style={{borderRadius:'0px', backgroundColor:'#014C90'}}>
                                            <h6 style={{color:'white'}}>Nama Perusahaan / Instansi</h6>
                                        </div>
                                        <div className="card-body">
                                            <h6>3pm</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="button-data-diri">
                                <button type="button" className="btn btn-login" style={{width:'20%', padding:'9px', marginLeft:'40%', marginTop:'3%', marginBottom:'1%'}}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </>
        )
    }
}