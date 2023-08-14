import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";

export default class extends Component {
    previewImage(e){
        const file = e.target
        if(file.files[0]){
            const reader = new FileReader()
            reader.onload = (e) => {
                document.getElementById('preview-image').src = e.target.result
            }
            reader.readAsDataURL(file.files[0])
        }
        document.getElementById('display-image').classList.remove('d-none')
        document.getElementById('display-image').classList.add('d-block')
    }

    constructor(props){
        super(props)
        this.state = {
            checkBoxCheckCount:0
        }
        this.checkCheckBox = this.checkCheckBox.bind(this)
    }

    checkCheckBox(){
        var checkbox = document.querySelectorAll('.problem-checkbox:check')
        this.setState({checkBoxCheckCount:checkbox.length})
    }
    render () {
        return (
            <>
            <div className="container-fluid py-3">
                <div className="d-flex align-items-center mb-4">
                    <Link className="list-items" to="/dashboard">
                        <i className="fa fa-arrow-left me-3" style={{fontSize: '16px', color: '#014C90'}}></i>
                    </Link>
                    <span className="title-icare fw-bold py-1" style={{borderBottom: '3px solid #014C90', fontSize:'18px'}}>Collect Meter</span>
                </div>
                <div className="card px-3 shadow">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-6">
                                <Link className="btn-proses">FOTO METER</Link>
                            </div>
                            {/* <div className="navbar navbar-exspand-lg mb-4">
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <Link className="btn-proses py-3 px-4 text-center fw-medium">FOTO METER</Link>
                                    </li>
                                    <li className="nev-item">
                                        <Link className="btn-proses py-3 px-4 text-center fw-medium">RIWAYAT FOTO</Link>
                                    </li>
                                </ul>
                            </div> */}
                        </div>
                        <div className="row">
                            <div className="card-label py-1 mb-2" style={{backgroundColor: '#014C90'}}>
                                <label className="fw-medium" style={{fontSize: '13px', color: '#fff'}}>Equipment Number</label>
                            </div>
                            <Link className="py-4 mb-4" style={{border: '1px solid #000'}} to="/daftar-eq"></Link>
                            <div className="text-center">
                                <p className="text-decoration-underline fw-medium fst-italic text-center mt-3" style={{fontSize: '13px', color: 'pink'}}>Please upload photo meter information/photo machine</p>
                                <input type="file" className="d-none" id="input-file" onChange={this.previewImage} accept="image/*"/>
                                <label className="file-icon mb-3 d-block" htmlFor="input-file">
                                    <i className="fa fa-file-image-o fs-4 rounded-circle p-2" style={{backgroundColor: '#014C90', color:'#fff'}}></i>
                                </label>
                                <div className="d-none col-md-6 col-sm-8 mx-auto my-5" id="display-image">
                                    <img src="#" alt="" className="w-50" id="preview-image"/>
                                </div>
                            </div>
                            <div className="text-center">
                                <span className="me-2">Apakah anda bersedia input meter manual? </span>
                                <input type="checkbox" className="problem-checkbox" onChange={this.checkCheckBox}/>
                            </div>
                            <div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </>
        )
    }
}