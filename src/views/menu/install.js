import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default class extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checkBoxCheckCount:0
        }
        this.submit = this.submit.bind(this)
        this.state = {
            noEq:'',
            alamat:'',
            deskripsi:'',
            errorNoEq:'',
            errorAlamat:'',
            errorDeskripsi:''
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

    submit(e) {
        e.preventDefault()

        if(this.state.noEq === "") {
            this.setState({errorNoEq:"Silahkan isi equipment number"});
        } else {
            this.setState({errorNoEq:""});
        }

        if(this.state.alamat === "") {
            this.setState({errorAlamat:"Silahkan isi alamat/lokasi mesin"});
        } else {
            this.setState({errorAlamat:""});
        }

        if(this.state.deskripsi === "") {
            this.setState({errorDeskripsi:"Silahkan isi deskripsi"});
        } else {
            this.setState({errorDeskripsi:""});
        }

        Swal.fire({
            text:'Mohon isi field yang kosong dan upload foto meter. Untuk field problem isi min. 1',
            confirmButtonColor:'#0099ff'
        })
    }

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
                        <form onSubmit={this.submit}>
                            <div className="card-body">
                                <div className="row">
                                    <div className="card-lable py-1 mb-2" style={{backgroundColor:'#014C90'}}>
                                        <label className="fw-medium" style={{fontSize:'12px', color:'#fff'}}>Equipment Number</label>
                                    </div>
                                    <Link className="py-4 mb-2" style={{border:'1px solid #000'}} to="/daftar-eq"></Link>
                                    <span className={`text-danger small mb-4 ${this.state.errorNoEq === "" ? "d-none": ""}`} style={{fontSize:'12px'}}> {this.state.errorNoEq} </span>
                                    
                                    <div className="card-lable py-1 mb-2" style={{backgroundColor:'#014C90'}}>
                                        <label className="fw-medium" style={{fontSize:'12px', color:'#fff'}}>Alamat/Lokasi Mesin</label>
                                    </div>
                                    <Link className="py-4 mb-2" style={{border:'1px solid #000'}} ></Link>
                                    <span className={`text-danger small mb-4 ${this.state.errorAlamat === "" ? "d-none": ""}`} style={{fontSize:'12px'}}> {this.state.errorAlamat} </span>
                                    
                                    <div className="card-lable py-1 mb-2" style={{backgroundColor:'#014C90'}}>
                                        <label className="fw-medium" style={{fontSize:'12px', color:'#fff'}}>Problem (Please Select)</label>
                                    </div>

                                    <div className="col-md-4 col-sm-6 col-12 mt-3">
                                        <div className="check-item d-flex align-items-center mb-4">
                                            <input type="checkbox" className="me-2"/> 
                                            <label style={{fontSize:'12px'}}>Install driver printer</label>
                                        </div>
                                        <div className="check-item d-flex align-items-center mb-4">
                                            <input type="checkbox" className="me-2"/>
                                            <label style={{fontSize:'12px'}}>Setting printer</label>
                                        </div>
                                        <div className="check-item d-flex align-items-center mb-4">
                                            <input type="checkbox" className="me-2"/>
                                            <label style={{fontSize:'12px'}}>Setting address book</label>
                                        </div>
                                        <div className="check-item d-flex align-items-center mb-4">
                                            <input type="checkbox" className="me-2"/>
                                            <label style={{fontSize:'12px'}}>Setting Kalibrasi</label>
                                        </div>
                                    </div>

                                    <div className="col-md-4 col-sm-6 col-12 mt-3">
                                        <div className="check-item d-flex align-items-center mb-4">
                                            <input type="checkbox" className="me-2"/> 
                                            <label style={{fontSize:'12px'}}>Install resite</label>
                                        </div>
                                        <div className="check-item d-flex align-items-center mb-4">
                                            <input type="checkbox" className="me-2"/>
                                            <label style={{fontSize:'12px'}}>Setting scan</label>
                                        </div>
                                        <div className="check-item d-flex align-items-center mb-4">
                                            <input type="checkbox" className="me-2"/>
                                            <label style={{fontSize:'12px'}}>Install New Machine</label>
                                        </div>
                                        <div className="check-item d-flex align-items-center mb-4">
                                            <input type="checkbox" className="me-2"/>
                                            <label style={{fontSize:'12px'}}>Setting Warna</label>
                                        </div>
                                    </div>

                                    <div className="col-md-4 col-sm-6 col-12 mt-3">
                                        <div className="check-item d-flex align-items-center mb-4">
                                            <input type="checkbox" className="me-2"/> 
                                            <label style={{fontSize:'12px'}}>Install accessories</label>
                                        </div>
                                        <div className="check-item d-flex align-items-center mb-4">
                                            <input type="checkbox" className="me-2"/>
                                            <label style={{fontSize:'12px'}}>Setting Authentication / Auditron</label>
                                        </div>
                                        <div className="check-item d-flex align-items-center mb-4">
                                            <input type="checkbox" className="me-2"/>
                                            <label style={{fontSize:'12px'}}>Setting IP Address</label>
                                        </div>
                                        <div className="check-item d-flex align-items-center mb-4">
                                            <input type="checkbox" className="me-2"/>
                                            <label style={{fontSize:'12px'}}>Setting Fax</label>
                                        </div>
                                    </div>

                                    <div className="card-lable py-1 mb-2" style={{backgroundColor:'#014C90'}}>
                                        <label className="fw-medium" style={{fontSize:'12px', color:'#fff'}}>Tambah Deskripsi</label>
                                    </div>
                                    <input className="py-2 mb-2" type="text" style={{width:'100%'}}></input>
                                    <span className={`text-danger small mb-4 ${this.state.errorDeskripsi === "" ? "d-none": ""}`} style={{fontSize:'12px'}}> {this.state.errorDeskripsi} </span>

                                    <div className="card-lable py-1 mb-2" style={{backgroundColor:'#014C90'}}>
                                        <label className="fw-medium" style={{fontSize:'12px', color:'#fff'}}>Page</label>
                                    </div>
                                    

                                    <div className="row">
                                        <div className="col-2" style={{width:'12%'}}>
                                            <div className="check-item d-flex align-items-center mt-4" style={{height:'10%'}}>
                                            <input type="checkbox" id="checklist" className="page-checkbox me-2" onChange={this.handleCheckboxChange}></input>
                                                <label style={{fontSize:'15px'}}>Page to WC</label>
                                            </div>
                                        </div>
                                        <div className="col-6 mt-1">
                                            <div className="check-item d-flex align-items-center mb-3">
                                                <input type="text" className="py-2" disabled={this.state.checkBoxCheckCount == 0} style={{width:'20%', height:'45px'}}></input>
                                            </div>
                                        </div>
                                    </div>
                                        
                                    <div className="text-center">
                                        <p className="text-decoration-underline fw-medium fst-italic text-center mt-3" style={{fontSize:'12px', color:'pink'}}>Please upload photo meter information/photo machine</p>
                                        <input type="file" className="d-none" id="input-file" onChange={this.previewImage} accept="image/*" />
                                        <label className="file-icon mb-3 d-block" htmlFor="input-file">
                                            <div className="text-center rounded-circle p-2" style={{backgroundColor:'#014C90', color:'#fff', width:'50px', height:'50px', marginLeft:'48%'}}>
                                                <img className="mt-1" src="images/upload.png" style={{width:'22px'}}></img>
                                            </div>
                                        </label>
                                        <div className="d-none col-md-6 col-sm-8 mx-auto my-5" id="display-image">
                                            <img className="w-50" src="#" alt="" id="preview-image" />
                                        </div>
                                        <button className="btn btn-login py-2 px-5 mt-4" style={{fontSize:'12px', marginLeft:'9px'}}>Submit</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            </>
        )
    }
}