import { Component } from "react";
import { Link } from "react-router-dom";
import ConfirmAlert from "../../component/alert/confirmAlert";
// import Swal from "sweetalert2";


export default class extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checkBoxCheckCount:0,
            checkBoxCheckCountPage:0,
            equipment:'',
            machineLocation:'',
            description:'',
            pageToWC:'',
            errorDescription: '',
            errorPageToWC: '',
            errorMessageEquipmentNumber: '',
            errorAddressOrMachineLocation: '',
            showPopup: false,
        }
        this.checkCheckBox = this.checkCheckBox.bind(this)
        this.checkCheckBoxPage = this.checkCheckBoxPage.bind(this)
        this.submit = this.submit.bind(this)
        this.validationEquipment = this.validationEquipment.bind(this)
        this.validationMachineLocation = this.validationMachineLocation.bind(this)
        this.validationDescription = this.validationDescription.bind(this)
        this.validationPageToWC = this.validationPageToWC.bind(this)
        this.handlePopup = this.handlePopup.bind(this)
    }

    handlePopup() {
        this.setState({showPopup:false})
    }

    submit(e) {
        e.preventDefault()
        var checkboxPage = document.querySelectorAll('.page-checkbox:checked')
        if(this.state.equipment === "") this.setState({errorMessageEquipmentNumber:'Silahkan isi quipment number'})
        if(this.state.machineLocation === "") this.setState({errorAddressOrMachineLocation:'Silahkan isi alamat/lokasi mesin'})
        if(this.state.description === "") this.setState({errorDescription:'Silahkan isi deskripsi'})
        if(this.state.pageToWC === "") this.setState({errorPageToWC: checkboxPage.length > 0 ? 'Silahkan isi page' : ''})

        this.setState({showPopup: true})


        // this.setState({
        //     errorMessageEquipmentNumber: 'Silahkan isi equipment number',
        //     errorAddressOrMachineLocation: 'Silahkan isi alamat/lokasi mesin',
        //     errorDescription: 'Silahkan isi deskripsi',
        //     errorPageToWC: checkboxPage.length > 0 ? 'Silahakn isi page' : ''
        // })


        // Swal.fire({
        //     text:'Mohon isi field yang kosong dan upload foto meter. Untuk field problem isi min.1',
        //     confirmButtonColor:'#0099ff'
        // })
    }


    validationEquipment(e) {
        e.preventDefault()
        this.setState({equipment: e.target.value})
        if(this.state.equipment !== "") {
            this.setState({errorMessageEquipmentNumber:''})
        }
    }

    validationMachineLocation(e) {
        e.preventDefault()
        this.setState({machineLocation: e.target.value})
        if(this.state.machineLocation !== "") {
            this.setState({errorAddressOrMachineLocation:''})
        }
    }

    validationDescription(e) {
        e.preventDefault()
        this.setState({description: e.target.value})
        if(e.target.value !== "") {
            this.setState({errorDescription:''})
        }
    }

    validationPageToWC(e) {
        e.preventDefault()
        this.setState({pageToWC: e.target.value})
        if(this.state.checkBoxCheckCountPage > 0 && e.target.value === "") {
            this.setState({errorPageToWC:'Silahkan isi page'})
        } else {
            if(e.target.value.length > 3) {
                this.setState({errorPageToWC:'Page to tidak boleh lebih dari 3 karakter'})
            } else {
                this.setState({errorPageToWC:''})
            }
        }
        
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
            <div className="py-3"> 
                <div className="responsive-bar mb-4 ">
                    <Link className="list-items" to="/dashboard">
                        <i className="fa fa-arrow-left me-3" style={{fontSize:'16px', color:'#014C90'}}></i>
                        <span className="title-icare fw-bold py-1" style={{borderBottom:'3px solid #014C90', fontSize:'18px'}}>Breakfix Request</span>
                    </Link>
                </div>
                <div className="row-height">
                    <div className="card px-3 shadow">
                        <div className="card-body">
                            <form onSubmit={this.submit}>
                                <div className="row">
                                    <div className="card-lable py-1 mb-2" style={{backgroundColor:'#014C90'}}>
                                        <label className="fw-medium" style= {{fontSize:'14px', color:'#fff'}}>Equipment Number</label>
                                    </div>
                                        <Link className="py-md-4 py-3 w-100 d-block input-text" style={{border:'1px solid #797979'}} onChange={this.validationEquipment} to="/daftar-eq"></Link>
                                        <span className={`text-danger small mx-2 ${ this.state.errorMessageEquipmentNumber !== '' ? '' : 'd-none' }`} style={{fontSize:'12px'}} >{ this.state.errorMessageEquipmentNumber }</span>
                                    <div className="card-lable py-1 mb-2" style={{backgroundColor:'#014C90'}}>
                                        <label className="fw-medium" style={{fontSize:'14px', color:'#fff'}}>Alamat/Lokasi Mesin</label>
                                    </div>
                                    <div className="mb-4 p-0">
                                        <Link className="py-md-4 py-3 w-100 d-block" style={{border:'1px solid #797979'}} onChange={this.validationMachineLocation} to="/data-diri" ></Link>
                                        <span className={`text-danger mx-2 small ${ this.state.errorAddressOrMachineLocation !== '' ? '' : 'd-none' }`} style={{fontSize:'12px'}} >{ this.state.errorAddressOrMachineLocation }</span>
                                    </div>
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
                                            <label className="form-check-label" style={{fontSize:'14px'}} htmlFor="HasilBergaris" >Hasil Bergaris</label>
                                        </div>
                                        <div className="check-item d-flex align-items-center mb-4 form-check">
                                            <input type="checkbox" style={{borderRadius: 0, padding:'1px'}}  className="me-3 mt-0 form-check-input" id="TonerTidakDetect"/>
                                            <label className="form-check-label" style={{fontSize:'14px'}} htmlFor="TonerTidakDetect" >Toner Tidak Detect</label>
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
                                        <input type="text" className="input-error py-2 w-100" style={{paddingLeft:'10px', paddingRight:'10px'}} disabled={this.state.checkBoxCheckCount == 0} />
                                    </div>
                                    <div className="card-lable py-1 mb-2" style={{backgroundColor:'#014C90'}}>
                                        <label className="fw-medium" style={{fontSize:'14px', color:'#fff'}}>Tambah Deskripsi</label>
                                    </div>
                                    <div className="mb-4 p-0">
                                        <input type="text" className={ `input-page py-md-3 py-2 w-100 ${ this.state.errorDescription !== '' ? 'border-danger border' : '' }` } style={{paddingLeft:'10px', paddingRight:'10px'}} onChange={this.validationDescription} />
                                        <span className={`text-danger small mx-2 ${ this.state.errorDescription !== '' ? '' : 'd-none' }`} style={{fontSize:'12px'}} >{ this.state.errorDescription }</span>
                                    </div>
                                    <div className="card-lable py-1 mb-2" style={{backgroundColor:'#014C90'}}>
                                        <label className="fw-medium" style={{fontSize:'14px', color:'#fff'}}>Page</label>
                                    </div>
                                    <div className="d-flex py-2 mb-5">
                                        <div className="form-check py-2">
                                            <input type="checkbox" style={{ borderRadius: 0, padding: '1px' }} className="form-check-input page-checkbox" id="pageToWC" onChange={ this.checkCheckBoxPage } />
                                            <label htmlFor="pageToWC" className="form-check-label">Page to WC</label>
                                        </div>
                                        <div className="ms-2" style={{ width: '110px' }}>
                                            <input type="text" className={`ms-2 py-2 input-page w-100 ${ this.state.errorPageToWC !== '' ? 'border-danger border' : '' }`} style={{paddingLeft:'10px', paddingRight:'10px'}} onChange={this.validationPageToWC} disabled={this.state.checkBoxCheckCountPage == 0}  />
                                            <span className={ `text-danger px-2  ${ this.state.errorPageToWC !== '' ? '' : 'd-none' }` } style={{fontSize:'12px'}} >{ this.state.errorPageToWC }</span>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-decoration-underline fw-medium fst-italic text-center mt-3" style={{fontSize:'14px', color:'pink'}}>Please upload photo meter information/photo machine</p>
                                        <input type="file" className="d-none" id="input-file" onChange={this.previewImage} accept="image/*" />
                                        <label className="file-icon mb-3 d-block" htmlFor="input-file">
                                            <div className="text-center rounded-circle p-2" style={{backgroundColor:'#014C90', color:'#fff', width:'50px', height:'50px', marginLeft:'48%'}}>
                                                <img className="mt-1" src="images/upload.png" style={{width:'22px'}}></img>
                                            </div>
                                        </label>
                                        <div className="d-none col-md-6 col-sm-8 mx-auto my-5" id="display-image">
                                            <img className="w-50" src="#" alt="" id="preview-image" />
                                        </div>
                                        <button className="btn btn-login py-2 px-5" style={{fontSize:'14px'}}>Submit</button>
                                    </div>
                                </div>
                            </form>
                            <ConfirmAlert visible={this.state.showPopup} message="Mohon isi field yang kosong dengan foto meter. Untuk field problem isi min.1" customClass="col-md-5 col-sm-8 col-12" onClick={this.handlePopup} />
                        </div>
                    </div>
                </div>
            </div>
            </>
        )
    }
}

