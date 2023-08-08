import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";

export default class extends Component {
    render () {
        return (
            <>
            <div className="container pt-2 pb-5">
                <div className="container">
                    <h4 style={{color:'#014C90', borderBottom:'4px solid #014C90', width:'10%'}}>Data Diri</h4>
                </div>
                <div className="container pt-4">
                    <div className="card border-0" style={{boxShadow:'5px 5px 20px 20px rgba(0, 0, 0, 0.1)'}}>
                        <div className="card-body">
                            <div className="row">
                                <div className="col">
                                    <div className="card" style={{borderRadius:'0px', border:'1px solid'}}>
                                        <div className="card-header bg-primary" style={{borderRadius:'0px'}}>
                                            <h6 style={{color:'white'}}>Nama</h6>
                                        </div>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col">
                                                    <div className="card-tex">
                                                        <h6>Indri</h6>
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
                                    <div className="card" style={{borderRadius:'0px', border:'1px solid'}}>
                                        <div className="card-header bg-primary" style={{borderRadius:'0px'}}>
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
                                    <div className="card" style={{borderRadius:'0px', border:'1px solid'}}>
                                        <div className="card-header bg-primary" style={{borderRadius:'0px'}}>
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
                                    <div className="card" style={{borderRadius:'0px', border:'1px solid'}}>
                                        <div className="card-header bg-primary" style={{borderRadius:'0px'}}>
                                            <h6 style={{color:'white'}}>Nama Perusahaan / Instansi</h6>
                                        </div>
                                        <div className="card-body">
                                            <h6>3pm</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="button-data-diri">
                                <button type="button" className="btn btn-primary" style={{width:'20%', padding:'9px', marginLeft:'40%', marginTop:'3%', marginBottom:'1%'}}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </>
        )
    }
}