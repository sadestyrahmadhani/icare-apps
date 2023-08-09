import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";

export default class extends Component {
    render () {
        return (
            <>
            <div className="container pt-3 pb-5">
                <div className="d-flex align-items-center mb-4">
                    <Link className="list-items" to="../dashboard">
                        <i className="fa fa-arrow-left me-3" style={{fontSize:'16px', color:'#014C90'}}></i>
                    </Link>
                    <span className="title-icare fw-bold py-1" style={{borderBottom:'3px solid #014C90', fontSize:'16px'}}>Install Request</span>
                </div>
                <div className="container">
                    <div className="card px-3 shadow border-0">
                        <div className="card-body">
                            <div className="row">
                                <div className="card-lable py-1 mb-2" style={{backgroundColor:'#014C90'}}>
                                    <label className="fw-medium" style={{fontSize:'12px', color:'#fff'}}>Equipment Number</label>
                                </div>
                                <input className="py-2 mb-4" type="text" style={{width:'100%'}}></input>
                                
                                <div className="card-lable py-1 mb-2" style={{backgroundColor:'#014C90'}}>
                                    <label className="fw-medium" style={{fontSize:'12px', color:'#fff'}}>Alamat/Lokasi Mesin</label>
                                </div>
                                <input className="py-2 mb-4" type="text" style={{width:'100%'}}></input>
                                
                                <div className="card-lable py-1 mb-2" style={{backgroundColor:'#014C90'}}>
                                    <label className="fw-medium" style={{fontSize:'12px', color:'#fff'}}>Problem (Please Select)</label>
                                </div>
                                <div className="card-text mb-4">
                                    <div className="row">
                                        <div className="col">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"></input>
                                                <label className="form-check-label" for="flexCheckDefault">
                                                    Install driver printer
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"></input>
                                                <label className="form-check-label" for="flexCheckDefault">
                                                    Setting printer
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"></input>
                                                <label className="form-check-label" for="flexCheckDefault">
                                                    Setting address book
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"></input>
                                                <label className="form-check-label" for="flexCheckDefault">
                                                    Setting Kalibrasi
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"></input>
                                                <label className="form-check-label" for="flexCheckDefault">
                                                    Install resite
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"></input>
                                                <label className="form-check-label" for="flexCheckDefault">
                                                    Setting scan
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"></input>
                                                <label className="form-check-label" for="flexCheckDefault">
                                                    Install New Machine
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"></input>
                                                <label className="form-check-label" for="flexCheckDefault">
                                                    Setting Warna
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"></input>
                                                <label className="form-check-label" for="flexCheckDefault">
                                                    Install accessories
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"></input>
                                                <label className="form-check-label" for="flexCheckDefault">
                                                    Setting Authentication / Auditron
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"></input>
                                                <label className="form-check-label" for="flexCheckDefault">
                                                    Setting IP Address
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"></input>
                                                <label className="form-check-label" for="flexCheckDefault">
                                                    Setting Fax
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-lable py-1 mb-2" style={{backgroundColor:'#014C90'}}>
                                    <label className="fw-medium" style={{fontSize:'12px', color:'#fff'}}>Tambah Deskripsi</label>
                                </div>
                                <input className="py-2 mb-5" type="text" style={{width:'100%'}}></input>
                                <div className="text-center">
                                    <p style={{color:'pink', fontStyle:'italic', fontSize:'13px', fontWeight:'bold'}}><u>Please upload photo meter infromation / photo machine.</u></p>
                                    <div className="file-icon mb-4">
                                        <i className="fa fa-file-image-o fs-4 rounded-circle p-3" style={{backgroundColor:"#014C90", color:'#fff'}} />
                                    </div>
                                    <button className="btn btn-login py-2 px-5 mb-5" style={{fontSize:'14px', width:'20%', height:'23%'}}>Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </>
        )
    }
}