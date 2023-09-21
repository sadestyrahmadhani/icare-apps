import React from "react";
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
            errorMessageEqipmentNumber:'',
            errorAddressOrMachineLocation:'',
            errorDescription:'',
            errorPageToWC:'',
            showPopup: false,
            showAddedPopup: false,
        }
        this.submit = this.submit.bind(this)
        this.checkCheckBox = this.checkCheckBox.bind(this)
        this.checkCheckBoxPage = this.checkCheckBoxPage.bind(this)
        this.validationEquipment = this.validationEquipment.bind(this)
        this.validationMachineLocation = this.validationMachineLocation.bind(this)
        this.validationDescription = this.validationDescription.bind(this)
        this.validationPageToWC = this.validationPageToWC.bind(this)
        this.handlePopup = this.handlePopup.bind(this)
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

    handlePopup() {
        this.setState({showPopup:false, showAddedPopup: false})
        if(this.state.isFormValid) {
            window.location.href = "/#/dashboard";
        }
    }

    submit(e) {
        e.preventDefault()
        var checkboxPage = document.querySelectorAll('.page-checkbox:checked')
        let isValid = true;

        if(this.state.equipment === "") { 
            this.setState({errorMessageEqipmentNumber:'Silahkan isi equipment number'})
            // isValid = false;
        }
        if(this.state.machineLocation === "") { 
            this.setState({errorAddressOrMachineLocation:'Silahkan isi alamat/lokasi mesin'})
            // isValid = false;
        }
        if(this.state.description === "") { 
            this.setState({errorDescription:'Silahkan isi deskripsi'})
            isValid = false;
        }
        if(this.state.pageToWC === "") { 
            this.setState({errorPageToWC: checkboxPage.length > 0 ? 'Silahkan isi page' : ''})
            isValid = false;
        }

        this.setState({isFormValid: isValid});

        if(isValid) {
            this.setState({showPopup: false, showAddedPopup: true});
        } else {
            this.setState({showPopup: true, showAddedPopup: false});
        }

        // Swal.fire({
        //     text:'Mohon isi field yang kosong dan upload foto meter. Untuk field problem isi min. 1',
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
        e.preventDefault();
        const description = e.target.value;
        this.setState({ description }); // Perbarui state description
    
        if (description.trim() === "") {
            this.setState({ errorDescription: 'Silahkan isi deskripsi' });
        } else {
            this.setState({ errorDescription: '' });
        }
    }

    // validationDescription(e) {
    //     e.preventDefault()
    //     this.setState({description: e.target.value})
    //     if(this.state.description !== "") {
    //         this.setState({errorDescription:''})
    //     }
    // }

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
        if (checkboxPage.length > 0) {
            this.setState({
                checkBoxCheckCountPage: checkboxPage.length,
                pageToWC: "",
                errorPageToWC: ""
            });
        } else {
            this.setState({
                checkBoxCheckCountPage: 0,
                pageToWC: "",
                errorPageToWC: ""
            })
        }
    }

    // checkCheckBoxPage() {
    //     var checkboxPage = document.querySelectorAll('.page-checkbox:checked')
    //     this.setState({checkBoxCheckCountPage:checkboxPage.length})
    // }

    render () {
        return (
            <>
            <div className="py-md-3 py-2">
                <div className="responsive-bar" style={{alignItems:'baseline', height:'55px'}}>
                    <h4 className="title-icare title-fitur m-0 p-0 fw-bold" style={{fontSize: '18px'}}>
                        <Link className="nav-link d-inline me-3" to="../dashboard">
                            <i className="fa fa-arrow-left color-arrow-left" style={{color: '#014C90'}}></i>
                            {/* <i className="fa fa-arrow-left me-3" style={{fontSize:'16px', color:'#014C90'}}></i> */}
                        </Link>
                        {/* <span className="title-icare title-fitur fw-bold py-1" style={{borderBottom:'3px solid #014C90', fontSize:'18px'}}>Install Request</span> */}
                        <span style={{borderBottom:'3px solid #014C90'}}>Install Request</span>
                    </h4>
                </div>
                <div className="responsive-install">
                    <div className="card px-3 shadow border-0">
                        <form onSubmit={this.submit}>
                            <div className="card-body">
                                <div className="row">
                                    <div className="card-lable py-1 mb-2" style={{backgroundColor:'#014C90'}}>
                                        <label className="fw-medium" style={{fontSize:'12px', color:'#fff'}}>Equipment Number</label>
                                    </div>
                                    
                                    <div className="d-lg-grid d-none p-0">
                                            <Link className="py-4 mb-2" style={{border:'1px solid #000'}} onChange={this.validationEquipment} to="/daftar_eq"></Link>
                                            <span className={`text-danger small mb-4 px-0 ${this.state.errorMessageEqipmentNumber !== '' ? '' : 'd-none'}`} style={{fontSize:'12px'}}> {this.state.errorMessageEqipmentNumber} </span>
                                    </div>


                                    <div className="d-lg-none d-flex p-0">
                                        <div className="col-10 p-0 d-grid">
                                            <Link className="py-4 mb-2" style={{border:'1px solid #000'}} onChange={this.validationEquipment} to="/daftar_eq"></Link>
                                            <span className={`text-danger small mb-4 px-0 ${this.state.errorMessageEqipmentNumber !== '' ? '' : 'd-none'}`} style={{fontSize:'12px'}}> {this.state.errorMessageEqipmentNumber} </span>
                                        </div>
                                        <div className="col-2 text-center my-auto">
                                            <Link className="fa fa-qrcode" style={{fontSize: '45px', textDecoration: 'none', color: '#000', right: 5}}></Link>
                                        </div>
                                    </div>
                                    
                                    <div className="card-lable py-1 mb-2" style={{backgroundColor:'#014C90'}}>
                                        <label className="fw-medium" style={{fontSize:'12px', color:'#fff'}}>Alamat/Lokasi Mesin</label>
                                    </div>
                                    <Link className="py-4 mb-2" style={{border:'1px solid #000'}} ></Link>
                                    <span className={`text-danger small mb-4 px-0 ${ this.state.errorAddressOrMachineLocation !== '' ? '' : 'd-none' }`} style={{fontSize:'12px'}} >{ this.state.errorAddressOrMachineLocation }</span>
                                    
                                    <div className="card-lable py-1 mb-2" style={{backgroundColor:'#014C90'}}>
                                        <label className="fw-medium" style={{fontSize:'12px', color:'#fff'}}>Problem (Please Select)</label>
                                    </div>

                                    <div className="col-md-4 col-sm-6 col-6 input-check d-md-block d-none">
                                        <div className="check-item d-flex align-items-center mb-4 form-check">
                                            <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="mt-0 me-2 form-check-input"/> 
                                            <label className="form-check-label" style={{fontSize:'14px'}}>Install driver printer</label>
                                        </div>
                                        <div className="check-item d-flex align-items-center mb-4 form-check">
                                            <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="mt-0 me-2 form-check-input"/>
                                            <label className="form-check-label" style={{fontSize:'14px'}}>Setting printer</label>
                                        </div>
                                        <div className="check-item d-flex align-items-center mb-4 form-check">
                                            <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="mt-0 me-2 form-check-input"/>
                                            <label className="form-check-label" style={{fontSize:'14px'}}>Setting address book</label>
                                        </div>
                                        <div className="check-item d-flex align-items-center mb-4 form-check">
                                            <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="mt-0 me-2 form-check-input"/>
                                            <label className="form-check-label" style={{fontSize:'14px'}}>Setting Kalibrasi</label>
                                        </div>
                                    </div>

                                    <div className="col-md-4 col-sm-6 col-6 input-check d-md-block d-none">
                                        <div className="check-item d-flex align-items-center mb-4 form-check">
                                            <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="install-checkbox me-2 form-check-input"/> 
                                            <label style={{fontSize:'14px'}}>Install resite</label>
                                        </div>
                                        <div className="check-item d-flex align-items-center mb-4 form-check">
                                            <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="install-checkbox me-2 form-check-input"/>
                                            <label style={{fontSize:'14px'}}>Setting scan</label>
                                        </div>
                                        <div className="check-item d-flex align-items-center mb-4 form-check">
                                            <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="install-checkbox me-2 form-check-input"/>
                                            <label style={{fontSize:'14px'}}>Install New Machine</label>
                                        </div>
                                        <div className="check-item d-flex align-items-center mb-4 form-check">
                                            <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="install-checkbox me-2 form-check-input"/>
                                            <label style={{fontSize:'14px'}}>Setting Warna</label>
                                        </div>
                                    </div>

                                    <div className="col-md-4 col-sm-6 col-6 input-check d-md-block d-none">
                                        <div className="check-item d-flex align-items-center mb-4 form-check">
                                            <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="install-checkbox me-2 form-check-input"/> 
                                            <label style={{fontSize:'14px'}}>Install accessories</label>
                                        </div>
                                        <div className="check-item d-flex align-items-center mb-4 form-check">
                                            <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="install-checkbox me-2 form-check-input"/>
                                            <label style={{fontSize:'14px'}}>Setting Authentication / Auditron</label>
                                        </div>
                                        <div className="check-item d-flex align-items-center mb-4 form-check">
                                            <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="install-checkbox me-2 form-check-input"/>
                                            <label style={{fontSize:'14px'}}>Setting IP Address</label>
                                        </div>
                                        <div className="check-item d-flex align-items-center mb-4 form-check">
                                            <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="form-check-input install-checkbox me-2"/>
                                            <label style={{fontSize:'14px'}}>Setting Fax</label>
                                        </div>
                                    </div>



                                    <div className="col-md-4 col-sm-6 col-6 input-check d-md-none d-block">
                                        <div className="check-item d-flex align-items-center mb-4 form-check">
                                            <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="me-md-3 mt-0 me-2 form-check-input"/> 
                                            <label className="form-check-label" style={{fontSize:'14px'}}>Install driver printer</label>
                                        </div>
                                        <div className="check-item d-flex align-items-center mb-4 form-check">
                                            <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="me-md-3 mt-0 me-2 form-check-input"/>
                                            <label className="form-check-label" style={{fontSize:'14px'}}>Setting printer</label>
                                        </div>
                                        <div className="check-item d-flex align-items-center mb-4 form-check">
                                            <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="me-md-3 mt-0 me-2 form-check-input"/>
                                            <label className="form-check-label" style={{fontSize:'14px'}}>Setting address book</label>
                                        </div>
                                        <div className="check-item d-flex align-items-center mb-4 form-check">
                                            <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="me-md-3 mt-0 me-2 form-check-input"/>
                                            <label className="form-check-label" style={{fontSize:'14px'}}>Setting Kalibrasi</label>
                                        </div>
                                        <div className="check-item d-flex align-items-center mb-4 form-check">
                                            <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="me-md-3 mt-0 me-2 form-check-input"/> 
                                            <label style={{fontSize:'14px'}}>Install resite</label>
                                        </div>
                                        <div className="check-item d-flex align-items-center mb-4 form-check">
                                            <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="me-md-3 mt-0 me-2 form-check-input"/>
                                            <label style={{fontSize:'14px'}}>Setting scan</label>
                                        </div>
                                    </div>
                                    <div className="col-md-4 col-sm-6 col-6 input-check d-md-none d-block mb-2">
                                        <div className="check-item d-flex align-items-center mb-4 form-check">
                                            <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="me-md-3 mt-0 me-2 form-check-input"/>
                                            <label style={{fontSize:'14px'}}>Install New Machine</label>
                                        </div>
                                        <div className="check-item d-flex align-items-center mb-4 form-check">
                                            <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="me-md-3 mt-0 me-2 form-check-input"/>
                                            <label style={{fontSize:'14px'}}>Setting Warna</label>
                                        </div>
                                        <div className="check-item d-flex align-items-center mb-4 form-check">
                                            <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="me-md-3 mt-0 me-2 form-check-input"/> 
                                            <label style={{fontSize:'14px'}}>Install accessories</label>
                                        </div>
                                        <div className="check-item d-flex align-items-center mb-4 form-check">
                                            <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="my-auto me-md-2 me-2 form-check-input"/>
                                            <label style={{fontSize:'14px'}}>Setting Authentication / Auditron</label>
                                        </div>
                                        <div className="check-item d-flex align-items-center mb-4 form-check">
                                            <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="me-md-3 mt-0 me-2 form-check-input"/>
                                            <label style={{fontSize:'14px'}}>Setting IP Address</label>
                                        </div>
                                        <div className="check-item d-flex align-items-center mb-4 form-check">
                                            <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="me-md-3 mt-0 me-2 form-check-input"/>
                                            <label style={{fontSize:'14px'}}>Setting Fax</label>
                                        </div>
                                    </div>

                                    <div className="card-lable py-1 mb-2" style={{backgroundColor:'#014C90'}}>
                                        <label className="fw-medium" style={{fontSize:'12px', color:'#fff'}}>Tambah Deskripsi</label>
                                    </div>
                                    <div className="mb-4 p-0">
                                        <input style={{paddingLeft:'10px'}} type="text" className={ `input-page py-2 w-100 ${ this.state.errorDescription !== '' ? 'border-danger border' : '' }` } onChange={this.validationDescription} />
                                        <span className={`text-danger small px-0 ${ this.state.errorDescription !== '' ? '' : 'd-none' }`} style={{fontSize:'12px'}} >{ this.state.errorDescription }</span>
                                    </div>

                                    <div className="card-lable py-1 mb-2" style={{backgroundColor:'#014C90'}}>
                                        <label className="fw-medium" style={{fontSize:'12px', color:'#fff'}}>Page</label>
                                    </div>
                                    

                                    <div className="d-flex py-2 mb-5">
                                        <div className="form-check py-2">
                                            <input type="checkbox" style={{ borderRadius: 0, padding: '1px' }} className="form-check-input page-checkbox" id="pageToWC" onChange={ this.checkCheckBoxPage } />
                                            <label htmlFor="pageToWC" className="form-check-label">Page to WC</label>
                                        </div>
                                        <div className="ms-2 d-flex flex-column" style={{ width: '110px' }}>
                                            <input type="text" style={{paddingLeft:'10px'}} className={`ms-2 py-2 input-page w-100 ${ this.state.errorPageToWC !== '' ? 'border-danger border' : '' }`} onChange={this.validationPageToWC} disabled={this.state.checkBoxCheckCountPage === 0} value={this.state.pageToWC}  />
                                            <span className={ `text-danger px-2  ${ this.state.errorPageToWC !== '' ? '' : 'd-none' }` } style={{fontSize:'12px', textAlign:'left'}} >{ this.state.errorPageToWC }</span>
                                        </div>
                                    </div>
                                        
                                    <div className="text-center">
                                        <p className="text-decoration-underline fw-medium fst-italic text-center mt-3" style={{fontSize:'14px', color:'pink'}}>Please upload photo meter information/photo machine</p>
                                        <input type="file" className="d-none" id="input-file" onChange={this.previewImage} accept="image/*" />
                                        <label className="file-icon mb-3 d-block" htmlFor="input-file">
                                            <div className="mx-auto rounded-circle p-2" style={{backgroundColor:'#014C90', color:'#fff', width:'50px', height:'50px', marginLeft:'48%'}}>
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
                        <ConfirmAlert visible={this.state.showPopup} message="Mohon isi field yang kosong dan upload foto meter. Untuk field problem isi min. 1" customClass="col-md-5 col-sm-8 col-10" onClick={this.handlePopup} />
                        <ConfirmAlert visible={this.state.showAddedPopup} message="Berhasil melakukan permintaan install" customClass="col-sm-3" onClick={this.handlePopup} />
                    </div>
                </div>
            </div>
            </>
        )
    }
}