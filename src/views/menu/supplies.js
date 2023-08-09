import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";

export default class extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checkBoxCheckCount:0
        }
    }

    checkCheckBox() {
        var checkbox = document.querySelector('.consumable-checkbox:checked')
        this.setState({checkBoxCheckCount:checkbox.length})
    }

    render () {
        return (
            <>
            <div className="container mt-4 mb-5">
                <div className="d-flex align-items-center mb-4">
                    <Link className="list-items" to="../dashboard">
                        <i className="fa fa-arrow-left me-3" style={{fontSize:'16px', color:'#014C90'}}></i>
                        <span className="title-icare fw-bold py-1" style={{borderBottom:'3px solid #014C90', fontSize:'16px'}}>Supplies Request</span>
                    </Link>
                </div>
                <div className="card px-3 shadow border-0">
                    <div className="card-body">
                        <div className="row">
                            <div className="card-lable py-1 mb-2" style={{backgroundColor:'#014C90'}}>
                                <label className="fw-medium" style={{fontSize:'12px', color:'white'}}>Equipment Number</label>
                            </div>
                            <input className="py-2 mb-4" type="text"></input>

                            <div className="card-lable py-1 mb-2" style={{backgroundColor:'#014C90'}}>
                                <label className="fw-medium" style={{fontSize:'12px', color:'white'}}>Alamat/Lokasi Mesin</label>
                            </div>
                            <input className="py-2 mb-4" type="text"></input>

                            <div className="card-lable py-1 mb-2" style={{backgroundColor:'#014C90'}}>
                                <label className="fw-medium" style={{fontSize:'12px', color:'white'}}>Consumable (Please Select)</label>
                            </div>
                            <div className="col-3">
                                <div className="check-item d-flex align-items-center mb-3" style={{height:'10%'}}>
                                    <input type="checkbox" className="consumable-checkbox me-2" onChange={this.checkCheckBox}></input>
                                    <label style={{fontSize:'12px'}}>Toner Black</label>
                                </div>
                                <div className="check-item d-flex align-items-center mb-3" style={{height:'10%'}}>
                                    <input type="checkbox" className="consumable-checkbox me-2" onChange={this.checkCheckBox}></input>
                                    <label style={{fontSize:'12px'}}>Toner Cyan</label>
                                </div>
                                <div className="check-item d-flex align-items-center mb-3" style={{height:'10%'}}>
                                    <input type="checkbox" className="consumable-checkbox me-2" onChange={this.checkCheckBox}></input>
                                    <label style={{fontSize:'12px'}}>Toner Magenta</label>
                                </div>
                                <div className="check-item d-flex align-items-center mb-3" style={{height:'10%'}}>
                                    <input type="checkbox" className="consumable-checkbox me-2" onChange={this.checkCheckBox}></input>
                                    <label style={{fontSize:'12px'}}>Toner Yellow</label>
                                </div>
                                <div className="check-item d-flex align-items-center mb-3" style={{height:'10%'}}>
                                    <input type="checkbox" className="consumable-checkbox me-2" onChange={this.checkCheckBox}></input>
                                    <label style={{fontSize:'12px'}}>Waste Bottle</label>
                                </div>
                                <div className="check-item d-flex align-items-center mb-3" style={{height:'10%'}}>
                                    <input type="checkbox" className="consumabke-checkbox me-2" onChange={this.checkCheckBox}></input>
                                    <label style={{fontSize:'12px'}}>Cleaning Cartridge</label>
                                </div>
                                <div className="check-item d-flex align-items-center mb-3" style={{height:'10%'}}>
                                    <input type="checkbox" className="consumable-checkbox me-2" onChange={this.checkCheckBox}></input>
                                    <label style={{fontSize:'12px'}}>Other</label>
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="check-item d-flex align-items-center mb-3">
                                    <input type="text" className="py-2" disabled={this.state.checkBoxCheckCount == 0} style={{width:'20%', height:'10%'}}></input>
                                </div>
                                <div className="check-item d-flex align-items-center mb-3">
                                    <input type="text" className="py-2" disabled={this.state.checkBoxCheckCount == 0} style={{width:'20%', height:'10%'}}></input>
                                </div>
                                <div className="check-item d-flex align-items-center mb-3">
                                    <input type="text" className="py-2" disabled={this.state.checkBoxCheckCount == 0} style={{width:'20%', height:'10%'}}></input>
                                </div>
                                <div className="check-item d-flex align-items-center mb-3">
                                    <input type="text" className="py-2" disabled={this.state.checkBoxCheckCount == 0} style={{width:'20%', height:'10%'}}></input>
                                </div>
                                <div className="check-item d-flex align-items-center mb-3">
                                    <input type="text" className="py-2" disabled={this.state.checkBoxCheckCount == 0} style={{width:'20%', height:'10%'}}></input>
                                </div>
                                <div className="check-item d-flex align-items-center mb-3">
                                    <input type="text" className="py-2" disabled={this.state.checkBoxCheckCount == 0} style={{width:'20%', height:'10%'}}></input>
                                </div>
                                <div className="check-item d-flex align-items-center mb-3">
                                    <input type="text" className="py-2" disabled={this.state.checkBoxCheckCount == 0}></input>
                                    <input type="text" className="py-2" disabled={this.state.checkBoxCheckCount == 0} style={{width:'20%', height:'10%', marginLeft:'3%'}}></input>
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="check-item d-flex align-items-center mb-3" style={{height:'10%'}}>
                                    <input type="checkbox" className="consumable-checkbox me-2" onChange={this.checkCheckBox}></input>
                                    <label style={{fontSize:'12px'}}>Drum Black</label>
                                </div>
                                <div className="check-item d-flex align-items-center mb-3" style={{height:'10%'}}>
                                    <input type="checkbox" className="consumable-checkbox me-2" onChange={this.checkCheckBox}></input>
                                    <label style={{fontSize:'12px'}}>Drum Cyan</label>
                                </div>
                                <div className="check-item d-flex align-items-center mb-3" style={{height:'10%'}}>
                                    <input type="checkbox" className="consumable-checkbox me-2" onChange={this.checkCheckBox}></input>
                                    <label style={{fontSize:'12px'}}>Drum Magenta</label>
                                </div>
                                <div className="check-item d-flex align-items-center mb-3" style={{height:'10%'}}>
                                    <input type="checkbox" className="consumable-checkbox me-2" onChange={this.checkCheckBox}></input>
                                    <label style={{fontSize:'12px'}}>Drum Yellow</label>
                                </div>
                                <div className="check-item d-flex align-items-center mb-3" style={{height:'10%'}}>
                                    <input type="checkbox" className="consumable-checkbox me-2" onChange={this.checkCheckBox}></input>
                                    <label style={{fontSize:'12px'}}>Fuser Web</label>
                                </div>
                                <div className="check-item d-flex align-items-center mb-3" style={{height:'10%'}}>
                                    <input type="checkbox" className="consumable-checkbox me-2" onChange={this.checkCheckBox}></input>
                                    <label style={{fontSize:'12px'}}>Corotron</label>
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="check-item d-flex align-items-center mb-3">
                                    <input type="text" className="py-2" disabled={this.state.checkBoxCheckCount == 0} style={{width:'20%', height:'10%'}}></input>
                                </div>
                                <div className="check-item d-flex align-items-center mb-3">
                                    <input type="text" className="py-2" disabled={this.state.checkBoxCheckCount == 0} style={{width:'20%', height:'10%'}}></input>
                                </div>
                                <div className="check-item d-flex align-items-center mb-3">
                                    <input type="text" className="py-2" disabled={this.state.checkBoxCheckCount == 0} style={{width:'20%', height:'10%'}}></input>
                                </div>
                                <div className="check-item d-flex align-items-center mb-3">
                                    <input type="text" className="py-2" disabled={this.state.checkBoxCheckCount == 0} style={{width:'20%', height:'10%'}}></input>
                                </div>
                                <div className="check-item d-flex align-items-center mb-3">
                                    <input type="text" className="py-2" disabled={this.state.checkBoxCheckCount == 0} style={{width:'20%', height:'10%'}}></input>
                                </div>
                                <div className="check-item d-flex align-items-center mb-3">
                                    <input type="text" className="py-2" disabled={this.state.checkBoxCheckCount == 0} style={{width:'20%', height:'10%'}}></input>
                                </div>
                            </div>
                            <div className="card-lable py-1 mb-2" style={{backgroundColor:'#014C90'}}>
                                <label className="fw-medium" style={{fontSize:'12px', color:'white'}}>Tambah Deskripsi</label>
                            </div>
                            <input className="py-2 mb-4" type="text"></input>

                            <div className="card-lable py-1 mb-2" style={{backgroundColor:'#014C90'}}>
                                <label className="fw-medium" style={{fontSize:'12px', color:'white'}}>Total Meter Information / Total Impressions</label>
                            </div>
                            <input className="py-2 mb-4" type="text"></input>

                            <div className="col-6 text-center mb-4">
                                <div className="card-lable py-1 mb-2" style={{backgroundColor:'#014C90'}}>
                                    <label className="fw-medium" style={{fontSize:'12px', color:'white'}}>Photo Meter</label>
                                </div>
                                <p style={{color:'pink', fontStyle:'italic', fontSize:'13px', fontWeight:'bold'}}><u>Please upload photo meter infromation / photo machine.</u></p>
                                <div className="file-icon mb-4">
                                    <i className="fa fa-file-image-o fs-4 rounded-circle p-3" style={{backgroundColor:"#014C90", color:'#fff'}} />
                                </div>
                            </div>

                            <div className="col-6 text-center mb-4">
                                <div className="card-lable py-1 mb-2" style={{backgroundColor:'#014C90'}}>
                                    <label className="fw-medium" style={{fontSize:'12px', color:'white'}}>Photo Status Consumable</label>
                                </div>
                                <p style={{color:'pink', fontStyle:'italic', fontSize:'13px', fontWeight:'bold'}}><u>Please upload photo meter infromation / photo machine.</u></p>
                                <div className="file-icon mb-4">
                                    <i className="fa fa-file-image-o fs-4 rounded-circle p-3" style={{backgroundColor:"#014C90", color:'#fff'}} />
                                </div>
                            </div>
                            <div className="text-center">
                                <button className="btn btn-login py-2 px-5" style={{fontSize:'14px', width:'20%'}}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </>
        )
    }
}
