import { Component } from "react";
import { Link } from "react-router-dom";


export default class extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checkBoxCheckCount:0
        }
        this.checkCheckBox = this.checkCheckBox.bind(this)
    }

    checkCheckBox() {
        var checkbox = document.querySelectorAll('.problem-checkbox:checked')
        this.setState({checkBoxCheckCount:checkbox.length})
    }

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

    render() {
        return(
            <>
            <div className="container-fluid py-3">
                <div className="d-flex align-items-center mb-4">
                    <Link className="list-items" to="/dashboard">
                        <i className="fa fa-arrow-left me-3" style={{fontSize:'16px', color:'#014C90'}}></i>
                    </Link>
                        <span className="title-icare fw-medium py-1" style={{borderBottom:'3px solid #014C90', fontSize:'18px'}}>Breakfix Request</span>
                </div>
                <div className="card px-3 shadow">
                    <div className="card-body">
                        <div className="row">
                            <div className="card-lable py-1 mb-2" style={{backgroundColor:'#014C90'}}>
                                <label className="fw-medium" style={{fontSize:'12px', color:'#fff'}}>Equipment Number</label>
                            </div>
                            <input type="text" className="py-2 mb-4" />
                            <div className="card-lable py-1 mb-2" style={{backgroundColor:'#014C90'}}>
                                <label className="fw-medium" style={{fontSize:'12px', color:'#fff'}}>Alamat/Lokasi Mesin</label>
                            </div>
                            <input type="text" className="py-2 mb-4" />
                            <div className="card-lable py-1 mb-4" style={{backgroundColor:'#014C90'}}>
                                <label className="fw-medium" style={{fontSize:'12px', color:'#fff'}}>Problem&#40;Please Select&#41;</label>
                            </div>
                            <div className="col-md-4 col-sm-6 col-12">
                                <div className="check-item d-flex align-items-center mb-4">
                                    <input type="checkbox" className="problem-checkbox me-2" onChange={this.checkCheckBox} /> 
                                    <label style={{fontSize:'12px'}}>Paper Jam</label>
                                </div>
                                <div className="check-item d-flex align-items-center mb-4">
                                    <input type="checkbox" className="problem-checkbox me-2" onChange={this.checkCheckBox} />
                                    <label style={{fontSize:'12px'}}>Hasil Kotor</label>
                                </div>
                                <div className="check-item d-flex align-items-center mb-4">
                                    <input type="checkbox" className="problem-checkbox me-2" onChange={this.checkCheckBox} />
                                    <label style={{fontSize:'12px'}}>Hasil Bergaris</label>
                                </div>
                                <div className="check-item d-flex align-items-center mb-4">
                                    <input type="checkbox" className="problem-checkbox me-2" onChange={this.checkCheckBox} />
                                    <label style={{fontSize:'12px'}}>Toner Tidak Detect</label>
                                </div>
                                <div className="check-item d-flex align-items-center mb-4">
                                    <input type="checkbox" className="problem-checkbox me-2" onChange={this.checkCheckBox} />
                                    <label style={{fontSize:'12px'}}>Error Code</label>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-6 col-12">
                                <div className="check-item d-flex align-items-center mb-4">
                                    <input type="checkbox" className="problem-checkbox me-2" onChange={this.checkCheckBox} />
                                    <label style={{fontSize:'12px'}}>Layar Blank</label>
                                </div>
                                <div className="check-item d-flex align-items-center mb-4">
                                    <input type="checkbox" className="problem-checkbox me-2" onChange={this.checkCheckBox} />
                                    <label style={{fontSize:'12px'}}>Hasil Pudar</label>
                                </div>
                                <div className="check-item d-flex align-items-center mb-4">
                                    <input type="checkbox" className="problem-checkbox me-2" onChange={this.checkCheckBox} />
                                    <label style={{fontSize:'12px'}}>Hasil Tidak Menempel</label>
                                </div>
                                <div className="check-item d-flex align-items-center mb-4">
                                    <input type="checkbox" className="problem-checkbox me-2" onChange={this.checkCheckBox} />
                                    <label style={{fontSize:'12px'}}>Server FFPS/Fiery/GX/Revoria</label>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-6 col-12">
                                <div className="check-item d-flex align-items-center mb-4">
                                    <input type="checkbox" className="problem-checkbox me-2" onChange={this.checkCheckBox} />
                                    <label style={{fontSize:'12px'}}>Hasil Cetak Tidak Optimal</label>
                                </div>
                                <div className="check-item d-flex align-items-center mb-4">
                                    <input type="checkbox" className="problem-checkbox me-2" onChange={this.checkCheckBox} />
                                    <label style={{fontSize:'12px'}}>Hasil Berbayang</label>
                                </div>
                                <div className="check-item d-flex align-items-center mb-4">
                                    <input type="checkbox" className="problem-checkbox me-2" onChange={this.checkCheckBox} />
                                    <label style={{fontSize:'12px'}}>Mesin Berisik</label>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-6 col-12 mb-4">
                                <input type="text" className="py-2 w-100" disabled={this.state.checkBoxCheckCount == 0} />
                            </div>
                            <div className="card-lable py-1 mb-2" style={{backgroundColor:'#014C90'}}>
                                <label className="fw-medium" style={{fontSize:'12px', color:'#fff'}}>Tambah Deskripsi</label>
                            </div>
                            <input type="text" className="py-2 mb-5" />
                            <div className="text-center">
                                <p className="text-danger text-decoration-underline fst-italic text-center mt-3" style={{fontSize:'10px'}}>Please upload photo meter information/photo machine</p>
                                <input type="file" className="d-none" id="input-file" onChange={this.previewImage} accept="image/*" />
                                <label className="file-icon mb-3 d-block" htmlFor="input-file">
                                    <i className="fa fa-file-image-o fs-4 rounded-circle p-2" style={{backgroundColor:"#014C90", color:'#fff'}} />
                                </label>
                                <div className="d-none col-md-6 col-sm-8 mx-auto my-5" id="display-image">
                                    <img className="w-100" src="#" alt="" id="preview-image" />
                                </div>
                                <button className="btn btn-login py-2 px-5" style={{fontSize:'12px'}}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </>
        )
    }
}


