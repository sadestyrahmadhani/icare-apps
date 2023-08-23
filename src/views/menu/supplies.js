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

    handleCheckboxChange = (event) => {
        const isChecked = event.target.checked;
        this.setState((prevState) => ({
          checkBoxCheckCount: isChecked ? prevState.checkBoxCheckCount + 1 : prevState.checkBoxCheckCount - 1,
        }));
    };

    previewImage(e) {
        const file = e.target
        if(file.files[0]) {
            const reader = new FileReader()
            reader.onload = (e) => {
                document.getElementById('preview-image').src = e.target.result
            }
            reader.readAsDataURL(file.files[0])
        }
        document.getElementById('display-image').classList.remove('d-none')
        document.getElementById('display-image').classList.add('d-block')
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
                            <Link className="py-4 mb-4" style={{border:'1px solid #000'}} to="/daftar-eq"></Link>

                            <div className="card-lable py-1 mb-2" style={{backgroundColor:'#014C90'}}>
                                <label className="fw-medium" style={{fontSize:'12px', color:'white'}}>Alamat/Lokasi Mesin</label>
                            </div>
                            <Link className="py-4 mb-4" style={{border:'1px solid #000'}} ></Link>

                            <div className="card-lable py-1 mb-2" style={{backgroundColor:'#014C90'}}>
                                <label className="fw-medium" style={{fontSize:'12px', color:'white'}}>Consumable (Please Select)</label>
                            </div>
                            <div className="col-3" style={{width:'145px'}}>
                                <div className="check-item d-flex align-items-center mt-1" style={{height:'10%'}}>
                                    <input type="checkbox" className="consumable-checkbox me-2" onChange={this.handleCheckboxChange}></input>
                                    <label style={{fontSize:'12px'}}>Toner Black</label>
                                </div>
                                <div className="check-item d-flex align-items-center mt-4" style={{height:'10%'}}>
                                    <input type="checkbox" className="consumable-checkbox me-2" onChange={this.handleCheckboxChange}></input>
                                    <label style={{fontSize:'12px'}}>Toner Cyan</label>
                                </div>
                                <div className="check-item d-flex align-items-center mt-4" style={{height:'10%'}}>
                                    <input type="checkbox" className="consumable-checkbox me-2" onChange={this.checkCheckBox}></input>
                                    <label style={{fontSize:'12px'}}>Toner Magenta</label>
                                </div>
                                <div className="check-item d-flex align-items-center mt-4" style={{height:'10%'}}>
                                    <input type="checkbox" className="consumable-checkbox me-2" onChange={this.checkCheckBox}></input>
                                    <label style={{fontSize:'12px'}}>Toner Yellow</label>
                                </div>
                                <div className="check-item d-flex align-items-center mt-4" style={{height:'10%'}}>
                                    <input type="checkbox" className="consumable-checkbox me-2" onChange={this.checkCheckBox}></input>
                                    <label style={{fontSize:'12px'}}>Waste Bottle</label>
                                </div>
                                <div className="check-item d-flex align-items-center mt-4" style={{height:'10%'}}>
                                    <input type="checkbox" className="consumabke-checkbox me-2" onChange={this.checkCheckBox}></input>
                                    <label style={{fontSize:'12px'}}>Cleaning Cartridge</label>
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="check-item d-flex align-items-center mb-3">
                                    <input type="text" className="py-2" disabled={this.state.checkBoxCheckCount == 0} style={{width:'20%', height:'45px'}}></input>
                                </div>
                                <div className="check-item d-flex align-items-center mb-3">
                                    <input type="text" className="py-2" disabled={this.state.checkBoxCheckCount == 0} style={{width:'20%', height:'45px'}}></input>
                                </div>
                                <div className="check-item d-flex align-items-center mb-3">
                                    <input type="text" className="py-2" disabled={this.state.checkBoxCheckCount == 0} style={{width:'20%', height:'45px'}}></input>
                                </div>
                                <div className="check-item d-flex align-items-center mb-3">
                                    <input type="text" className="py-2" disabled={this.state.checkBoxCheckCount == 0} style={{width:'20%', height:'45px'}}></input>
                                </div>
                                <div className="check-item d-flex align-items-center mb-3">
                                    <input type="text" className="py-2" disabled={this.state.checkBoxCheckCount == 0} style={{width:'20%', height:'45px'}}></input>
                                </div>
                                <div className="check-item d-flex align-items-center mb-3">
                                    <input type="text" className="py-2" disabled={this.state.checkBoxCheckCount == 0} style={{width:'20%', height:'45px'}}></input>
                                </div>
                            </div>
                            <div className="col-3" style={{width:'125px', marginLeft:'100px'}}>
                                <div className="check-item d-flex align-items-center mt-1" style={{height:'10%'}}>
                                    <input type="checkbox" className="consumable-checkbox me-2" onChange={this.checkCheckBox}></input>
                                    <label style={{fontSize:'12px'}}>Drum Black</label>
                                </div>
                                <div className="check-item d-flex align-items-center mt-4" style={{height:'10%'}}>
                                    <input type="checkbox" className="consumable-checkbox me-2" onChange={this.checkCheckBox}></input>
                                    <label style={{fontSize:'12px'}}>Drum Cyan</label>
                                </div>
                                <div className="check-item d-flex align-items-center mt-4" style={{height:'10%'}}>
                                    <input type="checkbox" className="consumable-checkbox me-2" onChange={this.checkCheckBox}></input>
                                    <label style={{fontSize:'12px'}}>Drum Magenta</label>
                                </div>
                                <div className="check-item d-flex align-items-center mt-4" style={{height:'10%'}}>
                                    <input type="checkbox" className="consumable-checkbox me-2" onChange={this.checkCheckBox}></input>
                                    <label style={{fontSize:'12px'}}>Drum Yellow</label>
                                </div>
                                <div className="check-item d-flex align-items-center mt-4" style={{height:'10%'}}>
                                    <input type="checkbox" className="consumable-checkbox me-2" onChange={this.checkCheckBox}></input>
                                    <label style={{fontSize:'12px'}}>Fuser Web</label>
                                </div>
                                <div className="check-item d-flex align-items-center mt-4" style={{height:'10%'}}>
                                    <input type="checkbox" className="consumable-checkbox me-2" onChange={this.checkCheckBox}></input>
                                    <label style={{fontSize:'12px'}}>Corotron</label>
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="check-item d-flex align-items-center mb-3">
                                    <input type="text" className="py-2" disabled={this.state.checkBoxCheckCount == 0} style={{width:'20%', height:'45px'}}></input>
                                </div>
                                <div className="check-item d-flex align-items-center mb-3">
                                    <input type="text" className="py-2" disabled={this.state.checkBoxCheckCount == 0} style={{width:'20%', height:'45px'}}></input>
                                </div>
                                <div className="check-item d-flex align-items-center mb-3">
                                    <input type="text" className="py-2" disabled={this.state.checkBoxCheckCount == 0} style={{width:'20%', height:'45px'}}></input>
                                </div>
                                <div className="check-item d-flex align-items-center mb-3">
                                    <input type="text" className="py-2" disabled={this.state.checkBoxCheckCount == 0} style={{width:'20%', height:'45px'}}></input>
                                </div>
                                <div className="check-item d-flex align-items-center mb-3">
                                    <input type="text" className="py-2" disabled={this.state.checkBoxCheckCount == 0} style={{width:'20%', height:'45px'}}></input>
                                </div>
                                <div className="check-item d-flex align-items-center mb-3">
                                    <input type="text" className="py-2" disabled={this.state.checkBoxCheckCount == 0} style={{width:'20%', height:'45px'}}></input>
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

                            <div className="row">
                                <div className="col-6 text-center mb-4">
                                    <div className="card-lable py-1 mb-2" style={{backgroundColor:'#014C90'}}>
                                        <label className="fw-medium" style={{fontSize:'12px', color:'white'}}>Photo Meter</label>
                                    </div>
                                    <p className="text-decoration-underline fw-medium fst-italic text-center mt-3" style={{fontSize:'12px', color:'pink'}}>Please upload photo meter information/photo machine</p>
                                    <input type="file" className="d-none" id="input-file" onChange={this.previewImage} accept="image/*" />
                                    <label className="file-icon mb-3 d-block" htmlFor="input-file">
                                        <div className="rounded-circle p-2" style={{backgroundColor:'#014C90', color:'#fff', width:'50px', height:'50px', marginLeft:'45%'}}>
                                            <img className="mt-1" src="images/upload.png" style={{width:'22px'}}></img>
                                        </div>
                                    </label>
                                    <div className="d-none col-md-6 col-sm-8 mx-auto my-5" id="display-image">
                                        <img className="w-50" src="#" alt="" id="preview-image" />
                                    </div>
                                </div>

                                <div className="col-6 text-center mb-4">
                                    <div className="card-lable py-1 mb-2" style={{backgroundColor:'#014C90'}}>
                                        <label className="fw-medium" style={{fontSize:'12px', color:'white'}}>Photo Status Consumable</label>
                                    </div>
                                    <p className="text-decoration-underline fw-medium fst-italic text-center mt-3" style={{fontSize:'12px', color:'pink'}}>Please upload photo meter information/photo machine</p>
                                    <input type="file" className="d-none" id="input-file" onChange={this.previewImage} accept="image/*" />
                                    <label className="file-icon mb-3 d-block text-center" htmlFor="input-file">
                                        <div className="text-center rounded-circle p-2" style={{backgroundColor:'#014C90', color:'#fff', width:'50px', height:'50px', marginLeft:'45%'}}>
                                            <img className="mt-1" src="images/upload.png" style={{width:'22px'}}></img>
                                        </div>
                                    </label>
                                    <div className="d-none col-md-6 col-sm-8 mx-auto my-5" id="display-image">
                                        <img className="w-50" src="#" alt="" id="preview-image" />
                                    </div>
                                </div>
                                <div className="col text-center">
                                    <button className="btn btn-login py-2 px-5" style={{fontSize:'14px', width:'20%'}}>Submit</button>
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
