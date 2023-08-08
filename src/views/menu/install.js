import React from "react";
import { Component } from "react";

export default class extends Component {
    render () {
        return (
            <>
            <div className="container pt-5 pb-5">
                <div className="container pt-5">
                    <div className=""></div>
                </div>
                <div className="container">
                    <div className="card">
                        <div className="card-body">
                            <div className="card border-0">
                                <div className="card-header bg-primary" style={{borderRadius:'0px', color:'white'}}>
                                    Equipment Number
                                </div>
                                        <input className="text" type="text" style={{width:'100%'}}></input>
                            </div>
                            <div className="card pt-4 border-0">        
                                <div className="card-header bg-primary" style={{borderRadius:'0px', color:'white'}}>
                                    Alamat/Lokasi Mesin
                                </div>
                                <div className="card-body" style={{border:'1px solid', marginTop:'10px'}}>
                                    <div className="card-text">
                                        <input className="text" type="text" style={{width:'100%', border:'0px'}}></input>
                                    </div>
                                </div>
                            </div>
                            <div className="card pt-4 border-0">        
                                <div className="card-header bg-primary" style={{borderRadius:'0px', color:'white'}}>
                                    Problem (Please Select)
                                </div>
                                <div className="card-body">
                                    <div className="card-text">
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
                                </div>
                            </div>
                            <div className="card pt-4 border-0">
                                <div className="card-header bg-primary" style={{borderRadius:'0px', color:'white'}}>
                                    Tambah Deskripsi
                                </div>
                                <div className="card-body" style={{border:'1px solid', marginTop:'10px'}}>
                                    <div className="card-text">
                                        <input className="text" type="text" style={{width:'100%', border:'0px'}}></input>
                                    </div>
                                </div>
                            </div>
                            <div className="card pt-5 border-0">
                                <div className="card-body text-center">
                                    <div className="card-text">
                                        <p style={{color:'magenta', fontStyle:'italic'}}><u>Please upload photo meter infromation / photo machine.</u></p>
                                        <i className="fa fa-file-image-o" style={{fontSize:'30px', color:'white', backgroundColor:'blue', width:'60px', height:'60px', padding:'15px', borderRadius:'100px'}}></i>
                                    </div>
                                </div>
                            </div>
                            <div className="button-install pt-3">
                                <button type="button" className="btn btn-primary" style={{width:'18%', padding:'7px', marginLeft:'41%'}}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </>
        )
    }
}