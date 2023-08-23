import { Component } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";


export default class extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checkBoxCheckCount:0,
            checkBoxCheckCountPage:0,
        }
        this.checkCheckBox = this.checkCheckBox.bind(this)
        this.checkCheckBoxPage = this.checkCheckBoxPage.bind(this)
    }

    submit(e) {
        e.preventDefault()
        Swal.fire({
            text:'Mohon isi field yang kosong dan upload foto meter. Untuk field problem isi min.1',
            confirmButtonColor:'#0099ff'
        })
    }

    checkCheckBox() {
        var checkbox = document.querySelectorAll('.problem-checkbox:checked')
        this.setState({checkBoxCheckCount:checkbox.length})
    }

    checkCheckBoxPage() {
        var checkboxPage = document.querySelectorAll('.page-checkbox:checked')
        this.setState({checkBoxCheckCountPage:checkboxPage.length})
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
                        <span className="title-icare fw-bold py-1" style={{borderBottom:'3px solid #014C90', fontSize:'18px'}}>Breakfix Request</span>
                </div>
                <div className="card px-3 shadow">
                    <div className="card-body">
                        <form onSubmit={this.submit}>
                            <div className="row">
                                <div className="card-lable py-1 mb-2" style={{backgroundColor:'#014C90'}}>
                                    <label className="fw-medium" style={{fontSize:'14px', color:'#fff'}}>Equipment Number</label>
                                </div>
                                <Link className="py-4 mb-4" style={{border:'1px solid #000'}} to="/daftar-eq"></Link>
                                <div className="card-lable py-1 mb-2" style={{backgroundColor:'#014C90'}}>
                                    <label className="fw-medium" style={{fontSize:'14px', color:'#fff'}}>Alamat/Lokasi Mesin</label>
                                </div>
                                <Link className="py-4 mb-4" style={{border:'1px solid #000'}} ></Link>
                                <div className="card-lable py-1 mb-4" style={{backgroundColor:'#014C90'}}>
                                    <label className="fw-medium" style={{fontSize:'14px', color:'#fff'}}>Problem&#40;Please Select&#41;</label>
                                </div>
                                <div className="col-md-4 col-sm-6 col-12">
                                    <div className="check-item d-flex align-items-center mb-4 form-check">
                                        <input type="checkbox" style={{ borderRadius: 0, padding:'1px' }} className="me-3 mt-0 form-check-input" id="PaperJam" /> 
                                        <label className="form-check-label" style={{fontSize:'14px'}} htmlFor="PaperJam">Paper Jam</label>
                                    </div>
                                    <div className="check-item d-flex align-items-center mb-4 form-check">
                                        <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="me-3 mt-0 form-check-input" id="HasilKotor"/>
                                        <label className="form-check-label" style={{fontSize:'14px'}} htmlFor="HasilKotor" >Hasil Kotor</label>
                                    </div>
                                    <div className="check-item d-flex align-items-center mb-4 form-check">
                                        <input type="checkbox" style={{borderRadius: 0, padding:'1px'}}  className="me-3 mt-0 form-check-input" id="HasilBergaris"/>
                                        <label className="form-check-label" style={{fontSize:'14px'}} htmlFor=""HasilBergaris >Hasil Bergaris</label>
                                    </div>
                                    <div className="check-item d-flex align-items-center mb-4 form-check">
                                        <input type="checkbox" style={{borderRadius: 0, padding:'1px'}}  className="me-3 mt-0 form-check-input" id="TonerTidakDetect"/>
                                        <label className="form-check-label" style={{fontSize:'14px'}} htmlFor=""TonerTidakDetect >Toner Tidak Detect</label>
                                    </div>
                                    <div className="check-item d-flex align-items-center mb-4">
                                        <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="problem-checkbox me-3 mt-0 form-check-input" id="ErrorCode" onChange={this.checkCheckBox} />
                                        <label className="form-check-label" style={{fontSize:'14px'}} htmlFor="ErrorCode" >Error Code</label>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-6 col-12">
                                    <div className="check-item d-flex align-items-center mb-4 form-check">
                                        <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="me-3 mt-0 form-check-input" id="LayarBlank"/>
                                        <label className="form-check-label" style={{fontSize:'14px'}} htmlFor="LayarBlank" >Layar Blank</label>
                                    </div>
                                    <div className="check-item d-flex align-items-center mb-4 form-check">
                                        <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="me-3 mt-0 form-check-input" id="HasilPudar"/>
                                        <label className="form-check-label" style={{fontSize:'14px'}} htmlFor="HasilPudar" >Hasil Pudar</label>
                                    </div>
                                    <div className="check-item d-flex align-items-center mb-4 form-check">
                                        <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="me-3 mt-0 form-check-input" id="HasilTidakMenempel"/>
                                        <label className="form-check-label" style={{fontSize:'14px'}} htmlFor="HasilTidakMenempel" >Hasil Tidak Menempel</label>
                                    </div>
                                    <div className="check-item d-flex align-items-center mb-4 form-check">
                                        <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="me-3 mt-0 form-check-input" id="ServerFFPS"/>
                                        <label className="form-check-label" style={{fontSize:'14px'}} htmlFor="ServerFFPS" >Server FFPS/Fiery/GX/Revoria</label>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-6 col-12">
                                    <div className="check-item d-flex align-items-center mb-4 form-check">
                                        <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="me-3 mt-0 form-check-input" id="HasilCetakTidakOptimal"/>
                                        <label className="form-check-label" style={{fontSize:'14px'}} htmlFor="HasilCetakTidakOptimal" >Hasil Cetak Tidak Optimal</label>
                                    </div>
                                    <div className="check-item d-flex align-items-center mb-4 form-check">
                                        <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="me-3 mt-0 form-check-input" id="HasilBerbayang"/>
                                        <label className="form-check-label" style={{fontSize:'14px'}} htmlFor="HasilBerbayang" >Hasil Berbayang</label>
                                    </div>
                                    <div className="check-item d-flex align-items-center mb-4 form-check">
                                        <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="me-3 mt-0 form-check-input" id="MesinBerisik"/>
                                        <label className="form-check-label" style={{fontSize:'14px'}} htmlFor="MesinBerisik" >Mesin Berisik</label>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-6 col-12 mb-4">
                                    <input type="text" className="input-error py-2 w-100" disabled={this.state.checkBoxCheckCount == 0} />
                                </div>
                                <div className="card-lable py-1 mb-2" style={{backgroundColor:'#014C90'}}>
                                    <label className="fw-medium" style={{fontSize:'14px', color:'#fff'}}>Tambah Deskripsi</label>
                                </div>
                                <input type="text" className="py-2 mb-4" />
                                <div className="card-lable py-1 mb-2" style={{backgroundColor:'#014C90'}}>
                                    <label className="fw-medium" style={{fontSize:'14px', color:'#fff'}}>Page</label>
                                </div>
                                <div className="check-item d-flex align-items-center py-2 mb-5 form-check">
                                    <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="page-checkbox me-3 mt-0 form-check-input" id="PageToWC" onChange={this.checkCheckBoxPage} />
                                    <label className="form-check-label" style={{fontSize:'14px'}} htmlFor="PageToWC">Page to WC</label>
                                    <input type="text" className="ms-2 py-2 input-page" style={{width:'100px'}} disabled={this.state.checkBoxCheckCountPage == 0} />
                                </div>
                                <div className="text-center">
                                    <p className="text-decoration-underline fw-medium fst-italic text-center mt-3" style={{fontSize:'14px', color:'pink'}}>Please upload photo meter information/photo machine</p>
                                    <input type="file" className="d-none" id="input-file" onChange={this.previewImage} accept="image/*" />
                                    <label className="file-icon mb-3 d-block" htmlFor="input-file">
                                        <i className="fa fa-file-image-o fs-4 rounded-circle p-2" style={{backgroundColor:"#014C90", color:'#fff'}} />
                                    </label>
                                    <div className="d-none col-md-6 col-sm-8 mx-auto my-5" id="display-image">
                                        <img className="w-50" src="#" alt="" id="preview-image" />
                                    </div>
                                    <button className="btn btn-login py-2 px-5" style={{fontSize:'14px'}}>Submit</button>
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


