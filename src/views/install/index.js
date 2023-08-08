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
                                <div className="card-body" style={{border:'1px solid', marginTop:'10px'}}>
                                    <div className="card-text">
                                        <input className="text" type="text" style={{width:'100%', border:'0px'}}></input>
                                    </div>
                                </div>
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
                                <div className="card-body">
                                    <div className="card-text"></div>
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