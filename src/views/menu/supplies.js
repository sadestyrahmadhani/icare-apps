import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default class extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checkBoxCheckCount:0,
            checkboxStatus: {
                tonerBlack: false,
                tonerCyan: false,
                tonerMagenta: false,
                tonerYellow: false,
                wasteBottle: false,
                cleaningCartridge: false,
                drumBlack: false,
                drumCyan: false,
                drumMagenta: false,
                drumYellow: false,
                fuserWeb: false,
                corotron: false,
            },
            checkboxValues: {
                tonerBlack: "",
                tonerCyan: "",
                tonerMagenta: "",
                tonerYellow: "",
                wasteBottle: "",
                cleaningCartridge: "",
                drumBlack: "",
                drumCyan: "",
                drumMagenta: "",
                drumYellow: "",
                fuserWeb: "",
                corotron: "",
            },
            equipment:'',
            machineLocation:'',
            description:'',
            total:'',
            errorMessageEquipmentNumber:'',
            errorAddressOrMachineLocation:'',
            errorDescription:'',
            errorTotal:'',
        }
        this.submit = this.submit.bind(this)
        this.checkCheckBox = this.checkCheckBox.bind(this)
        this.validationEquipment = this.validationEquipment.bind(this)
        this.validationMachineLocation = this.validationMachineLocation.bind(this)
        this.validationDescription = this.validationDescription.bind(this)
        this.validationTotal = this.validationTotal.bind(this)
    }

    handleInputChange = (event, checkboxName) => {
        const newValue = event.target.value;
        if (/^[1-9]*$/.test(newValue)) {
            const newCheckboxValues = { ...this.state.checkboxValues };
            newCheckboxValues[checkboxName] = newValue;
    
            this.setState({
                checkboxValues: newCheckboxValues,
            });
        }
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

    submit(e) {
        e.preventDefault()

        if(this.state.equipment === "") this.setState({errorMessageEquipmentNumber:'Silahkan isi equipment number'})
        if(this.state.machineLocation === "") this.setState({errorAddressOrMachineLocation: 'Silahkan isi alamat/lokasi mesin'})
        if(this.state.description === "") this.setState({errorDescription: 'Silahkan isi deskripsi'})
        if(this.state.total === "") this.setState({errorTotal: 'Silahkan isi total meter'})

        Swal.fire({
            text:'Mohon isi field yang kosong, upload foto meter dan upload foto status consumable. Untuk field problem isi min. 1',
            confirmButtonColor:'#0099ff'
        })
    }

    validationEquipment(e) {
        e.preventDefault()
        this.setState({equipment: e.target.value})
        if(this.state.equipment !== "") {
            this.setState({errorMessageEquipmentNumber: ''})
        }
    }

    validationMachineLocation(e) {
        e.preventDefault()
        this.setState({machineLocation: e.target.value})
        if(this.state.machineLocation !== "") {
            this.setState({errorAddressOrMachineLocation: ''})
        }
    }

    validationDescription(e) {
        e.preventDefault()
        this.setState({description: e.target.value})
        if(this.state.description !== "") {
            this.setState({errorDescription: ''})
        }
    }

    validationTotal(e) {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            this.setState({ total: value, errorTotal: "" });
        } 
    }

    checkCheckBox = (checkboxName) => {
        this.setState((prevState) => {
            const checkboxStatus = { ...prevState.checkboxStatus };
            checkboxStatus[checkboxName] = !checkboxStatus[checkboxName];

            return {
                checkboxStatus,
            };
        });
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
                        <form onSubmit={this.submit}>
                            <div className="row">
                                <div className="card-lable py-1 mb-2" style={{backgroundColor:'#014C90'}}>
                                    <label className="fw-medium" style={{fontSize:'12px', color:'white'}}>Equipment Number</label>
                                </div>
                                <Link className="py-4 mb-2" style={{border:'1px solid #000'}} onChange={this.validationEquipment} to="/daftar_eq"></Link>
                                <span className={`text-danger small mx-2 mb-4 ${ this.state.errorMessageEquipmentNumber !== '' ? '' : 'd-none' }`} style={{fontSize:'12px'}} >{ this.state.errorMessageEquipmentNumber }</span>

                                <div className="card-lable py-1 mb-2" style={{backgroundColor:'#014C90'}}>
                                    <label className="fw-medium" style={{fontSize:'12px', color:'white'}}>Alamat/Lokasi Mesin</label>
                                </div>
                                <Link className="py-4 mb-2" style={{border:'1px solid #000'}} ></Link>
                                <span className={`text-danger small mx-2 mb-4 ${ this.state.errorAddressOrMachineLocation !== '' ? '' : 'd-none' }`} style={{fontSize:'12px'}} >{ this.state.errorAddressOrMachineLocation }</span>

                                <div className="card-lable py-1 mb-2" style={{backgroundColor:'#014C90'}}>
                                    <label className="fw-medium" style={{fontSize:'12px', color:'white'}}>Consumable (Please Select)</label>
                                </div>
                                <div className="col-md-3 col-sm-6" style={{width:'165px'}}>
                                    <div className="check-item d-flex align-items-center mt-1" style={{height:'10%'}}>
                                        <input type="checkbox" className="consumable-checkbox me-2 form-check-input" id="toner-black" onChange={() => this.checkCheckBox('tonerBlack')} ></input>
                                        <label style={{fontSize:'14px'}} htmlFor="toner-black">Toner Black</label>
                                    </div>
                                    <div className="check-item d-flex align-items-center mt-4" style={{height:'10%'}}>
                                        <input type="checkbox" className="consumable-checkbox me-2 form-check-input" id="toner-cyan" onChange={() => this.checkCheckBox('tonerCyan')} ></input>
                                        <label style={{fontSize:'14px'}} htmlFor="toner-cyan">Toner Cyan</label>
                                    </div>
                                    <div className="check-item d-flex align-items-center mt-4" style={{height:'10%'}}>
                                        <input type="checkbox" className="consumable-checkbox me-2 form-check-input" id="toner-magenta" onChange={() => this.checkCheckBox('tonerMagenta')} ></input>
                                        <label style={{fontSize:'14px'}} htmlFor="toner-magenta">Toner Magenta</label>
                                    </div>
                                    <div className="check-item d-flex align-items-center mt-4" style={{height:'10%'}}>
                                        <input type="checkbox" className="consumable-checkbox me-2 form-check-input" id="toner-yellow" onChange={() => this.checkCheckBox('tonerYellow')} ></input>
                                        <label style={{fontSize:'14px'}} htmlFor="toner-yellow">Toner Yellow</label>
                                    </div>
                                    <div className="check-item d-flex align-items-center mt-4" style={{height:'10%'}}>
                                        <input type="checkbox" className="consumable-checkbox me-2 form-check-input" id="waste-bottle" onChange={() => this.checkCheckBox('wasteBottle')} ></input>
                                        <label style={{fontSize:'14px'}} htmlFor="waste-bottle">Waste Bottle</label>
                                    </div>
                                    <div className="check-item d-flex align-items-center mt-4" style={{height:'10%'}}>
                                        <input type="checkbox" className="consumable-checkbox me-2 form-check-input" id="cleaning-cartridge" onChange={() => this.checkCheckBox('cleaningCartridge')} ></input>
                                        <label style={{fontSize:'14px'}} htmlFor="cleaning-cartridge">Cleaning Cartridge</label>
                                    </div>
                                </div>
                                <div className="col-md-3 col-sm-6">
                                    <div className="check-item d-flex align-items-center mb-3">
                                        <input type="text" className="input-consumable py-2" maxLength="1" value={this.state.checkboxStatus.tonerBlack ? this.state.checkboxValues.tonerBlack : ''} onChange={(e) => this.handleInputChange(e, 'tonerBlack')} disabled={!this.state.checkboxStatus.tonerBlack} style={{width:'20%', height:'45px'}}></input>
                                    </div>
                                    <div className="check-item d-flex align-items-center mb-3">
                                        <input type="text" className="input-consumable py-2" maxLength="1" value={this.state.checkboxStatus.tonerCyan ? this.state.checkboxValues.tonerCyan : ''} onChange={(e) => this.handleInputChange(e, 'tonerCyan')} disabled={!this.state.checkboxStatus.tonerCyan} style={{width:'20%', height:'45px'}}></input>
                                    </div>
                                    <div className="check-item d-flex align-items-center mb-3">
                                        <input type="text" className="input-consumable py-2" maxLength="1" value={this.state.checkboxStatus.tonerMagenta ? this.state.checkboxValues.tonerMagenta : ''} onChange={(e) => this.handleInputChange(e, 'tonerMagenta')} disabled={!this.state.checkboxStatus.tonerMagenta} style={{width:'20%', height:'45px'}}></input>
                                    </div>
                                    <div className="check-item d-flex align-items-center mb-3">
                                        <input type="text" className="input-consumable py-2" maxLength="1" value={this.state.checkboxStatus.tonerYellow ? this.state.checkboxValues.tonerYellow : ''} onChange={(e) => this.handleInputChange(e, 'tonerYellow')} disabled={!this.state.checkboxStatus.tonerYellow} style={{width:'20%', height:'45px'}}></input>
                                    </div>
                                    <div className="check-item d-flex align-items-center mb-3">
                                        <input type="text" className="input-consumable py-2" maxLength="1" value={this.state.checkboxStatus.wasteBottle ? this.state.checkboxValues.wasteBottle : ''} onChange={(e) => this.handleInputChange(e, 'wasteBottle')} disabled={!this.state.checkboxStatus.wasteBottle} style={{width:'20%', height:'45px'}}></input>
                                    </div>
                                    <div className="check-item d-flex align-items-center mb-3">
                                        <input type="text" className="input-consumable py-2" maxLength="1" value={this.state.checkboxStatus.cleaningCartridge ? this.state.checkboxValues.cleaningCartridge : ''} onChange={(e) => this.handleInputChange(e, 'cleaningCartridge')} disabled={!this.state.checkboxStatus.cleaningCartridge} style={{width:'20%', height:'45px'}}></input>
                                    </div>
                                </div>
                                <div className="col-md-3 col-sm-6" style={{width:'138px', marginLeft:'95px'}}>
                                    <div className="check-item d-flex align-items-center mt-1" style={{height:'10%'}}>
                                        <input type="checkbox" className="consumable-checkbox me-2" id="drum-black" onChange={() => this.checkCheckBox('drumBlack')} ></input>
                                        <label style={{fontSize:'14px'}} htmlFor="drum-black">Drum Black</label>
                                    </div>
                                    <div className="check-item d-flex align-items-center mt-4" style={{height:'10%'}}>
                                        <input type="checkbox" className="consumable-checkbox me-2" id="drum-cyan" onChange={() => this.checkCheckBox('drumCyan')} ></input>
                                        <label style={{fontSize:'14px'}} htmlFor="drum-cyan">Drum Cyan</label>
                                    </div>
                                    <div className="check-item d-flex align-items-center mt-4" style={{height:'10%'}}>
                                        <input type="checkbox" className="consumable-checkbox me-2" id="drum-magenta" onChange={() => this.checkCheckBox('drumMagenta')} ></input>
                                        <label style={{fontSize:'14px'}} htmlFor="drum-magenta">Drum Magenta</label>
                                    </div>
                                    <div className="check-item d-flex align-items-center mt-4" style={{height:'10%'}}>
                                        <input type="checkbox" className="consumable-checkbox me-2" id="drum-yellow" onChange={() => this.checkCheckBox('drumYellow')} ></input>
                                        <label style={{fontSize:'14px'}} htmlFor="drum-yellow">Drum Yellow</label>
                                    </div>
                                    <div className="check-item d-flex align-items-center mt-4" style={{height:'10%'}}>
                                        <input type="checkbox" className="consumable-checkbox me-2" id="fuser-web" onChange={() => this.checkCheckBox('fuserWeb')} ></input>
                                        <label style={{fontSize:'14px'}} htmlFor="fuser-web">Fuser Web</label>
                                    </div>
                                    <div className="check-item d-flex align-items-center mt-4" style={{height:'10%'}}>
                                        <input type="checkbox" className="consumable-checkbox me-2" id="corotron" onChange={() => this.checkCheckBox('corotron')} ></input>
                                        <label style={{fontSize:'14px'}} htmlFor="corotron">Corotron</label>
                                    </div>
                                </div>
                                <div className="col-md-3 col-sm-6">
                                    <div className="check-item d-flex align-items-center mb-3">
                                        <input type="text" className="input-consumable py-2" maxLength="1" value={this.state.checkboxStatus.drumBlack ? this.state.checkboxValues.drumBlack : ''} onChange={(e) => this.handleInputChange(e, 'drumBlack')} disabled={!this.state.checkboxStatus.drumBlack} style={{width:'20%', height:'45px'}}></input>
                                    </div>
                                    <div className="check-item d-flex align-items-center mb-3">
                                        <input type="text" className="input-consumable py-2" maxLength="1" value={this.state.checkboxStatus.drumCyan ? this.state.checkboxValues.drumCyan : ''} onChange={(e) => this.handleInputChange(e, 'drumCyan')} disabled={!this.state.checkboxStatus.drumCyan} style={{width:'20%', height:'45px'}}></input>
                                    </div>
                                    <div className="check-item d-flex align-items-center mb-3">
                                        <input type="text" className="input-consumable py-2" maxLength="1" value={this.state.checkboxStatus.drumMagenta ? this.state.checkboxValues.drumMagenta : ''} onChange={(e) => this.handleInputChange(e, 'drumMagenta')} disabled={!this.state.checkboxStatus.drumMagenta} style={{width:'20%', height:'45px'}}></input>
                                    </div>
                                    <div className="check-item d-flex align-items-center mb-3">
                                        <input type="text" className="input-consumable py-2" maxLength="1" value={this.state.checkboxStatus.drumYellow ? this.state.checkboxValues.drumYellow : ''} onChange={(e) => this.handleInputChange(e, 'drumYellow')} disabled={!this.state.checkboxStatus.drumYellow} style={{width:'20%', height:'45px'}}></input>
                                    </div>
                                    <div className="check-item d-flex align-items-center mb-3">
                                        <input type="text" className="input-consumable py-2" maxLength="1" value={this.state.checkboxStatus.fuserWeb ? this.state.checkboxValues.fuserWeb : ''} onChange={(e) => this.handleInputChange(e, 'fuserWeb')} disabled={!this.state.checkboxStatus.fuserWeb} style={{width:'20%', height:'45px'}}></input>
                                    </div>
                                    <div className="check-item d-flex align-items-center mb-3">
                                        <input type="text" className="input-consumable y-2" maxLength="1" value={this.state.checkboxStatus.corotron ? this.state.checkboxValues.corotron : ''} onChange={(e) => this.handleInputChange(e, 'corotron')} disabled={!this.state.checkboxStatus.corotron} style={{width:'20%', height:'45px'}}></input>
                                    </div>
                                </div>
                                <div className="card-lable py-1 mb-2" style={{backgroundColor:'#014C90'}}>
                                    <label className="fw-medium" style={{fontSize:'12px', color:'white'}}>Tambah Deskripsi</label>
                                </div>
                                <div className="mb-4 p-0">
                                    <input type="text" className={ `input-page py-2 w-100 ${ this.state.errorDescription !== '' ? 'border-danger border' : '' }` } onChange={this.validationDescription} />
                                    <span className={`text-danger small mx-2 ${ this.state.errorDescription !== '' ? '' : 'd-none' }`} style={{fontSize:'12px'}} >{ this.state.errorDescription }</span>
                                </div>

                                <div className="card-lable py-1 mb-2" style={{backgroundColor:'#014C90'}}>
                                    <label className="fw-medium" style={{fontSize:'12px', color:'white'}}>Total Meter Information / Total Impressions</label>
                                </div>
                                <div className="mb-4 p-0">
                                    <input type="text" className={ `input-page py-2 w-100 ${ this.state.errorTotal !== '' ? 'border-danger border' : '' }` } onChange={this.validationTotal} value={this.state.total} />
                                    <span className={`text-danger small mx-2 ${ this.state.errorTotal !== '' ? '' : 'd-none' }`} style={{fontSize:'12px'}} >{ this.state.errorTotal }</span>
                                </div>

                                <div className="row">
                                    <div className="col-md-6 col-sm-12 text-center mb-4">
                                        <div className="card-lable py-1 mb-2" style={{backgroundColor:'#014C90'}}>
                                            <label className="fw-medium" style={{fontSize:'12px', color:'white'}}>Photo Meter</label>
                                        </div>
                                        <p className="text-decoration-underline fw-medium fst-italic text-center mt-3" style={{fontSize:'14px', color:'pink'}}>Please upload photo meter information/photo machine</p>
                                        <input type="file" className="d-none" id="input-file" onChange={this.previewImage} accept="image/*" />
                                        <label className="file-icon mb-3 d-block" htmlFor="input-file">
                                            <div className="rounded-circle p-2 mx-auto" style={{backgroundColor:'#014C90', color:'#fff', width:'50px', height:'50px'}}>
                                                <img className="mt-1" src="images/upload.png" style={{width:'22px'}}></img>
                                            </div>
                                        </label>
                                        <div className="d-none col-md-6 col-sm-8 mx-auto my-5" id="display-image">
                                            <img className="w-50" src="#" alt="" id="preview-image" />
                                        </div>
                                    </div>

                                    <div className="col-md-6 col-sm-12 text-center mb-4">
                                        <div className="card-lable py-1 mb-2" style={{backgroundColor:'#014C90'}}>
                                            <label className="fw-medium" style={{fontSize:'12px', color:'white'}}>Photo Status Consumable</label>
                                        </div>
                                        <p className="text-decoration-underline fw-medium fst-italic text-center mt-3" style={{fontSize:'14px', color:'pink'}}>Please upload photo meter information/photo machine</p>
                                        <input type="file" className="d-none" id="input-file" onChange={this.previewImage} accept="image/*" />
                                        <label className="file-icon mb-3 d-block text-center" htmlFor="input-file">
                                            <div className="text-center rounded-circle p-2 mx-auto" style={{backgroundColor:'#014C90', color:'#fff', width:'50px', height:'50px'}}>
                                                <img className="mt-1" src="images/upload.png" style={{width:'22px'}}></img>
                                            </div>
                                        </label>
                                        <div className="d-none col-md-6 col-sm-8 mx-auto my-5" id="display-image">
                                            <img className="w-50" src="#" alt="" id="preview-image" />
                                        </div>
                                    </div>
                                    <div className="col-md-12 text-center d-flex justify-content-center">
                                        <button className="btn btn-login py-2 px-5" style={{fontSize:'14px', maxWidth:'200px'}}>Submit</button>
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
