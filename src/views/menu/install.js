import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ConfirmAlert from "../../component/alert/confirmAlert";
import { getDaftarEq } from "../../services/API/mod_daftarEQ";
import { uploadImages } from "../../services/API/mod_uploadImages";

function Install() {
    const [checkBoxCheckCount, setCheckBoxCheckCount] = useState(0)
    const [checkBoxCheckCountPage, setCheckBoxCheckCountPage] = useState(0)
    const [equipment, setEquipment] = useState('')
    const [machineLocation, setMachineLocation] = useState('')
    const [description, setDescription] = useState('')
    const [pageToWC, setPageToWC] = useState('')
    const [errorMessageEquipmentNumber, setErrorMessageEquipmentNumber] = useState('')
    const [errorAddressOrMachineLocation, setErrorAddressOrMachineLocation] = useState('')
    const [errorDescription, setErrorDescription] = useState('')
    const [errorPageToWC, setErrorPageToWC] = useState('')
    const [selectedEquipment, setSelectedEquipment] = useState(null)
    const [isFormValid, setIsFormValid] = useState(false)
    const [searchText, setSearchText] = useState('')
    const [showDropdown, setShowDropdown] = useState(false)
    const [showPopup, setShowPopup] = useState(false)
    const [showAddedPopup, setShowAddedPopup] = useState(false)
    const [alertOption, setAlertOption] = useState({title: '', message: ''})
    const [equipmentList, setEquipmentList] = useState([])
    const [originalData, setOriginalData] = useState('')
    const [meterImage, setMeterImage] = useState('')

    useEffect(() => {
        return () => {
            daftarEq()
        };
    }, []);

    const daftarEq = async () => {
        const res = await getDaftarEq()
        if(res.status = 200) {
            console.log(res.data)
            setEquipmentList(res.data.Table)
            setOriginalData(res.data.Table)
        }
    }

    const handleSearchInputChange = (e) => {
        const inputText = e.target.value
        setSearchText(inputText)

        if(inputText.trim() === "") {
            setErrorMessageEquipmentNumber('Silahkan isi equipment number')
        } else {
            setErrorMessageEquipmentNumber('')
        }

        setShowDropdown(!!inputText)
    }

    const handleDropdownItemClick = (item) => {
        setSelectedEquipment(item)
        setSearchText(item.equipment)
        setShowDropdown(false)
        setErrorMessageEquipmentNumber('')
    }

    const filteredEquipmentList = (e) => {
        if(e.target.value != '') {
            var filterData = originalData.filter(val => (val.equipment.toString().toLowerCase().includes(e.target.value.toLowerCase())) || val.eqmodelName.toLowerCase(). includes(e.target.value.toLowerCase()) || val.description.toLowerCase().includes(e.target.value.toLowerCase()))
            setEquipmentList(filterData)
        } else {
            setEquipmentList(originalData)
        }
    }
    
    const handleCheckboxChange = (event) => {
        const isChecked = event.target.checked;
        this.setState((prevState) => ({
            checkBoxCheckCount: isChecked ? prevState.checkBoxCheckCount + 1 : prevState.checkBoxCheckCount - 1,
        }));
    };

    const previewImage = (e) => {
        const file = e.target
        if(file.files[0]) {
            setMeterImage(e.target.files[0])
            const reader = new FileReader()
            reader.onload = (e) => {
                document.getElementById('preview-image').src = e.target.result
            }
            reader.readAsDataURL(file.files[0])
        }
        document.getElementById('display-image').classList.remove('d-none')
        document.getElementById('display-image').classList.add('d-block')
    }

    const handlePopup = () => {
        setShowPopup(false)
        setShowAddedPopup(false)
        if(isFormValid) {
            window.location.href = "/dashboard";
        }
    }

    const submit = async (e) => {
        e.preventDefault()
        var checkboxPage = document.querySelectorAll('.page-checkbox:checked')
        let isValid = true;

        if(equipment === "") { 
            setErrorMessageEquipmentNumber('Silahkan isi equipment number')
        }
        if(machineLocation === "") { 
            setErrorAddressOrMachineLocation('Silahkan isi alamat/lokasi mesin')
        }
        if(description === "") { 
            setErrorDescription('Silahkan isi deskripsi')
            isValid = false;
        }
        if(pageToWC === "") { 
            setErrorPageToWC(checkboxPage.length > 0 ? 'Silahkan isi page' : '')
            isValid = false;
        }

        setIsFormValid(isValid);

        if(isValid) {
            const res = await uploadImages(meterImage)
            if(res.status == 200 && res.data === 'succes upload') {
                setShowPopup(false)
                setShowAddedPopup(true)
                console.log(res.data) 
            }
        } else {
            setShowPopup(true)
            setShowAddedPopup(false)
        }
    }

    const validationEquipment = (e) => {
        e.preventDefault()
        const selectedEquipment = e.target.value;
        setEquipment(selectedEquipment)

        if(equipment !== "") {
            setErrorMessageEquipmentNumber('')
        }
    }

    const validationMachineLocation = (e) => {
        e.preventDefault()
        setMachineLocation(e.target.value)
        if(machineLocation !== "") {
            setErrorAddressOrMachineLocation('')
        }
    }

    const validationDescription = (e) => {
        e.preventDefault()
        const description = e.target.value
        setDescription(description )
    
        if (description.trim() === "") {
            setErrorDescription('Silahkan isi deskripsi')
        } else {
            setErrorDescription('')
        }
    }

    const validationPageToWC = (e) => {
        e.preventDefault()
        setPageToWC(e.target.value)
        if(checkBoxCheckCountPage > 0 && e.target.value === "") {
            setErrorPageToWC('Silahkan isi page')
        } else {
            if(e.target.value.length > 3) {
                setErrorPageToWC('Page to tidak boleh lebih dari 3 karakter')
            } else {
                setErrorPageToWC('')
            }
        }
        
    }

    const checkCheckBox = () => {
        var checkbox = document.querySelectorAll('.problem-checkbox:checked')
        setCheckBoxCheckCount(checkbox.length)
    }

    const checkCheckBoxPage = () => {
        var checkboxPage = document.querySelectorAll('.page-checkbox:checked')
        if (checkboxPage.length > 0) {
            setCheckBoxCheckCountPage(checkboxPage.length)
            setPageToWC('')
            setErrorPageToWC('')
        } else {
            setCheckBoxCheckCountPage(0)
            setPageToWC('')
            setErrorPageToWC('')
        }
    }
    
    return (
        <>
        <div className="py-md-3">
            <div className="responsive-bar" style={{alignItems:'baseline', height:'55px'}}>
                <h4 className="title-icare title-fitur m-0 p-0 fw-bold" style={{fontSize: '18px'}}>
                    <Link className="nav-link d-inline me-3" to="../dashboard">
                        <i className="fa fa-arrow-left color-arrow-left" style={{color: '#014C90'}}></i>
                    </Link>
                    <span className="title-bold" style={{borderBottom:'3px solid #014C90'}}>Install Request</span>
                </h4>
            </div>
            <div className="responsive-install">
                <div className="card px-3 shadow border-0">
                    <form onSubmit={submit}>
                        <div className="card-body">
                            <div className="row">
                                <div className="card-lable py-1 mb-2" style={{backgroundColor:'#014C90'}}>
                                    <label className="fw-medium" style={{fontSize:'12px', color:'#fff'}}>Equipment Number</label>
                                </div>
                                <div className="d-flex p-0">
                                    <div className="col-lg-11 col-9">
                                        <div className="custom-search-dropdown-install mb-4" >
                                                <input type="text" onKeyUp={filteredEquipmentList} className="form-control form-install shadow-none fw-bold small rounded-0" style={{height:'53px', border:'1px solid #797979'}} value={searchText} onChange={handleSearchInputChange} onClick={ () => setShowDropdown(!showDropdown) }></input>
                                                <span className={`text-danger small px-0 ${errorMessageEquipmentNumber !== '' ? '' : 'd-none'}`} style={{fontSize:'12px'}}> {errorMessageEquipmentNumber} </span>
                                                {showDropdown && (
                                                    <div className="dropdown-install" style={{position:'absolute', backgroundColor:'white', overflow:'hidden', width:'88%', top:'12%', zIndex:'1', overflowY:'auto', maxHeight:'300px', borderRight:'1px solid black', borderLeft:'1px solid black', borderTop:'1px solid black'}}>
                                                        {equipmentList.map((item, index) => (
                                                            <div key={index} className="dropdown-item-install" onClick={() => handleDropdownItemClick(item)}>
                                                                <div>{item.equipment} - {item.eqmodelName}</div>
                                                                <div>{item.description}</div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                    </div>
                                    <div className="col-lg-1 col-2 text-center">
                                        <Link to="/form_eq/">
                                            <button className="btn btn-login btn-plus" style={{height:'50px', width:'80px'}}>
                                                <i className="fa fa-plus fs-4 py-auto"></i>
                                            </button>
                                        </Link>
                                    </div>
                                    <div className="col-1 d-block d-lg-none">
                                        <Link className="fa fa-qrcode" style={{fontSize:'34px', textDecoration:'none', color:'#000',right:5}}></Link>
                                    </div>
                                </div>
                                
                                <div className="card-lable py-1 mb-2" style={{backgroundColor:'#014C90'}}>
                                    <label className="fw-medium" style={{fontSize:'12px', color:'#fff'}}>Alamat/Lokasi Mesin</label>
                                </div>
                                <div className="form-install mb-4" style={{border:'1px solid #797979', height:'53px', paddingTop:'1px'}} >
                                    <strong className="small">{selectedEquipment?.Penerima} {selectedEquipment ? "-" : ""} {selectedEquipment?.Nama_Alamat}</strong><br/>
                                    <strong className="small d-flex mt-0">{selectedEquipment?.Alamat} {selectedEquipment ? "-" : ""} {selectedEquipment?.Kota}</strong>
                                </div>
                                <span className={`text-danger small mb-4 px-0 ${ errorAddressOrMachineLocation !== '' ? '' : 'd-none' }`} style={{fontSize:'12px'}} >{ errorAddressOrMachineLocation }</span>
                                
                                <div className="card-lable py-1 mb-2" style={{backgroundColor:'#014C90'}}>
                                    <label className="fw-medium" style={{fontSize:'12px', color:'#fff'}}>Problem (Please Select)</label>
                                </div>

                                <div className="col-md-4 col-sm-6 col-6 input-check d-md-block d-none">
                                    <div className="check-item d-flex align-items-center mb-4 form-check">
                                        <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="mt-0 me-2 form-check-input" id="installDriverPrinter"/> 
                                        <label className="form-check-label" style={{fontSize:'14px'}} htmlFor="installDriverPrinter" >Install driver printer</label>
                                    </div>
                                    <div className="check-item d-flex align-items-center mb-4 form-check">
                                        <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="mt-0 me-2 form-check-input" id="settingPrinter" />
                                        <label className="form-check-label" style={{fontSize:'14px'}} htmlFor="settingPrinter" >Setting printer</label>
                                    </div>
                                    <div className="check-item d-flex align-items-center mb-4 form-check">
                                        <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="mt-0 me-2 form-check-input" id="settingAddressBool" />
                                        <label className="form-check-label" style={{fontSize:'14px'}} htmlFor="settingAddressBool" >Setting address book</label>
                                    </div>
                                    <div className="check-item d-flex align-items-center mb-4 form-check">
                                        <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="mt-0 me-2 form-check-input" id="settingKalibrasi" />
                                        <label className="form-check-label" style={{fontSize:'14px'}} htmlFor="settingKalibrasi" >Setting Kalibrasi</label>
                                    </div>
                                </div>

                                <div className="col-md-4 col-sm-6 col-6 input-check d-md-block d-none">
                                    <div className="check-item d-flex align-items-center mb-4 form-check">
                                        <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="install-checkbox me-2 form-check-input" id="installResite" /> 
                                        <label style={{fontSize:'14px'}} htmlFor="installResite" >Install resite</label>
                                    </div>
                                    <div className="check-item d-flex align-items-center mb-4 form-check">
                                        <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="install-checkbox me-2 form-check-input" id="settingScan" />
                                        <label style={{fontSize:'14px'}} htmlFor="settingScan" >Setting scan</label>
                                    </div>
                                    <div className="check-item d-flex align-items-center mb-4 form-check">
                                        <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="install-checkbox me-2 form-check-input" id="installNewMachine" />
                                        <label style={{fontSize:'14px'}} htmlFor="installNewMachine" >Install New Machine</label>
                                    </div>
                                    <div className="check-item d-flex align-items-center mb-4 form-check">
                                        <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="install-checkbox me-2 form-check-input" id="settingWarna" />
                                        <label style={{fontSize:'14px'}} htmlFor="settingWarna" >Setting Warna</label>
                                    </div>
                                </div>

                                <div className="col-md-4 col-sm-6 col-6 input-check d-md-block d-none">
                                    <div className="check-item d-flex align-items-center mb-4 form-check">
                                        <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="install-checkbox me-2 form-check-input" id="installAccessories" /> 
                                        <label style={{fontSize:'14px'}} htmlFor="installAccessories" >Install accessories</label>
                                    </div>
                                    <div className="check-item d-flex align-items-center mb-4 form-check">
                                        <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="install-checkbox me-2 form-check-input" id="settingAuthenticationAuditron" />
                                        <label style={{fontSize:'14px'}} htmlFor="settingAuthenticationAuditron" >Setting Authentication / Auditron</label>
                                    </div>
                                    <div className="check-item d-flex align-items-center mb-4 form-check">
                                        <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="install-checkbox me-2 form-check-input" id="settingIPAddress" />
                                        <label style={{fontSize:'14px'}} htmlFor="settingIPAddress" >Setting IP Address</label>
                                    </div>
                                    <div className="check-item d-flex align-items-center mb-4 form-check">
                                        <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="form-check-input install-checkbox me-2" id="settingFax" />
                                        <label style={{fontSize:'14px'}} htmlFor="settingFax" >Setting Fax</label>
                                    </div>
                                </div>



                                <div className="col-md-4 col-sm-6 col-6 input-check d-md-none d-block">
                                    <div className="check-item d-flex align-items-center mb-4 form-check">
                                        <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="me-md-3 mt-0 me-2 form-check-input" id="1" /> 
                                        <label className="form-check-label" style={{fontSize:'14px'}} htmlFor="1" >Install driver printer</label>
                                    </div>
                                    <div className="check-item d-flex align-items-center mb-4 form-check">
                                        <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="me-md-3 mt-0 me-2 form-check-input" id="2"/>
                                        <label className="form-check-label" style={{fontSize:'14px'}} htmlFor="2">Setting printer</label>
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
                                    <input style={{paddingLeft:'10px', border:'1px solid #797979', height:'53px'}} type="text" className={ `form-install input-page w-100 ${ errorDescription !== '' ? 'border-danger border' : '' }` } onChange={validationDescription} />
                                    <span className={`text-danger small px-0 ${ errorDescription !== '' ? '' : 'd-none' }`} style={{fontSize:'12px'}} >{ errorDescription }</span>
                                </div>

                                <div className="card-lable py-1 mb-2" style={{backgroundColor:'#014C90'}}>
                                    <label className="fw-medium" style={{fontSize:'12px', color:'#fff'}}>Page</label>
                                </div>
                                

                                <div className="d-flex py-2 mb-5">
                                    <div className="form-check py-2">
                                        <input type="checkbox" style={{ borderRadius: 0, padding: '1px' }} className="form-check-input page-checkbox" id="pageToWC" onChange={ checkCheckBoxPage } />
                                        <label htmlFor="pageToWC" className="form-check-label">Page to WC</label>
                                    </div>
                                    <div className="ms-2 d-flex flex-column" style={{ width: '110px' }}>
                                        <input type="text" style={{paddingLeft:'10px', height:'53px'}} className={`form-install ms-2 input-page w-75 ${ errorPageToWC !== '' ? 'border-danger border' : '' }`} onChange={validationPageToWC} disabled={checkBoxCheckCountPage === 0} value={pageToWC}  />
                                        <span className={ `text-danger px-2  ${ errorPageToWC !== '' ? '' : 'd-none' }` } style={{fontSize:'12px', textAlign:'left'}} >{ errorPageToWC }</span>
                                    </div>
                                </div>
                                    
                                <div className="text-center">
                                    <p className="text-decoration-underline fw-medium fst-italic text-center mt-3" style={{fontSize:'14px', color:'pink'}}>Please upload photo meter information/photo machine</p>
                                    <input type="file" className="d-none" id="input-file" onChange={previewImage} accept="image/*" />
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
                    <ConfirmAlert visible={showPopup} message="Mohon isi field yang kosong dan upload foto meter. Untuk field problem isi min. 1" customClass="col-md-5 col-sm-8 col-10" onClick={handlePopup} />
                    <ConfirmAlert visible={showAddedPopup} message="Berhasil melakukan permintaan install" customClass="col-sm-3" onClick={handlePopup} />
                </div>
            </div>
        </div>
        </>
    )
}

export default Install

// export default class extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             equipmentList: [
//                 {
//                     id: 1,
//                     noEQ: '71221',
//                     namaModel: 'CobaInsert',
//                     keterangan: 'CobaInsert'
//                 },
//                 {
//                     id: 2,
//                     noEQ: '300822',
//                     namaModel: 'model1',
//                     keterangan: 'tes aja'
//                 },
//                 {
//                     id: 3,
//                     noEQ: '798689',
//                     namaModel: 'ApeosPort C2060',
//                     keterangan: 'test'
//                 }
//             ],
//             checkBoxCheckCount:0,
//             checkBoxCheckCountPage:0,
//             equipment:'',
//             machineLocation:'',
//             description:'',
//             pageToWC:'',
//             errorMessageEqipmentNumber:'',
//             errorAddressOrMachineLocation:'',
//             errorDescription:'',
//             errorPageToWC:'',
//             showPopup: false,
//             showAddedPopup: false,
//         }
//         this.submit = this.submit.bind(this)
//         this.checkCheckBox = this.checkCheckBox.bind(this)
//         this.checkCheckBoxPage = this.checkCheckBoxPage.bind(this)
//         this.validationEquipment = this.validationEquipment.bind(this)
//         this.validationMachineLocation = this.validationMachineLocation.bind(this)
//         this.validationDescription = this.validationDescription.bind(this)
//         this.validationPageToWC = this.validationPageToWC.bind(this)
//         this.handlePopup = this.handlePopup.bind(this)
//     }

//     handleCheckboxChange = (event) => {
//         const isChecked = event.target.checked;
//         this.setState((prevState) => ({
//           checkBoxCheckCount: isChecked ? prevState.checkBoxCheckCount + 1 : prevState.checkBoxCheckCount - 1,
//         }));
//     };

//     previewImage(e) {
//         const file = e.target
//         if(file.files[0]) {
//             const reader = new FileReader()
//             reader.onload = (e) => {
//                 document.getElementById('preview-image').src = e.target.result
//             }
//             reader.readAsDataURL(file.files[0])
//         }
//         document.getElementById('display-image').classList.remove('d-none')
//         document.getElementById('display-image').classList.add('d-block')
//     }

//     handlePopup() {
//         this.setState({showPopup:false, showAddedPopup: false})
//         if(this.state.isFormValid) {
//             window.location.href = "/#/dashboard";
//         }
//     }

//     submit(e) {
//         e.preventDefault()
//         var checkboxPage = document.querySelectorAll('.page-checkbox:checked')
//         let isValid = true;

//         if(this.state.equipment === "") { 
//             this.setState({errorMessageEqipmentNumber:'Silahkan isi equipment number'})
//             // isValid = false;
//         }
//         if(this.state.machineLocation === "") { 
//             this.setState({errorAddressOrMachineLocation:'Silahkan isi alamat/lokasi mesin'})
//             // isValid = false;
//         }
//         if(this.state.description === "") { 
//             this.setState({errorDescription:'Silahkan isi deskripsi'})
//             isValid = false;
//         }
//         if(this.state.pageToWC === "") { 
//             this.setState({errorPageToWC: checkboxPage.length > 0 ? 'Silahkan isi page' : ''})
//             isValid = false;
//         }

//         this.setState({isFormValid: isValid});

//         if(isValid) {
//             this.setState({showPopup: false, showAddedPopup: true});
//         } else {
//             this.setState({showPopup: true, showAddedPopup: false});
//         }

//         // Swal.fire({
//         //     text:'Mohon isi field yang kosong dan upload foto meter. Untuk field problem isi min. 1',
//         //     confirmButtonColor:'#0099ff'
//         // })
//     }

//     validationEquipment(e) {
//         e.preventDefault()
//         const selectedEquipment = e.target.value;
//         this.setState({equipment: selectedEquipment})

//         if(this.state.equipment !== "") {
//             this.setState({errorMessageEqipmentNumber: ''})
//         }
//     }

//     // validationEquipment(e) {
//     //     e.preventDefault()
//     //     this.setState({equipment: e.target.value})
//     //     if(this.state.equipment !== "") {
//     //         this.setState({errorMessageEquipmentNumber:''})
//     //     }
//     // }

//     validationMachineLocation(e) {
//         e.preventDefault()
//         this.setState({machineLocation: e.target.value})
//         if(this.state.machineLocation !== "") {
//             this.setState({errorAddressOrMachineLocation:''})
//         }
//     }

//     validationDescription(e) {
//         e.preventDefault();
//         const description = e.target.value;
//         this.setState({ description }); // Perbarui state description
    
//         if (description.trim() === "") {
//             this.setState({ errorDescription: 'Silahkan isi deskripsi' });
//         } else {
//             this.setState({ errorDescription: '' });
//         }
//     }

//     // validationDescription(e) {
//     //     e.preventDefault()
//     //     this.setState({description: e.target.value})
//     //     if(this.state.description !== "") {
//     //         this.setState({errorDescription:''})
//     //     }
//     // }

//     validationPageToWC(e) {
//         e.preventDefault()
//         this.setState({pageToWC: e.target.value})
//         if(this.state.checkBoxCheckCountPage > 0 && e.target.value === "") {
//             this.setState({errorPageToWC:'Silahkan isi page'})
//         } else {
//             if(e.target.value.length > 3) {
//                 this.setState({errorPageToWC:'Page to tidak boleh lebih dari 3 karakter'})
//             } else {
//                 this.setState({errorPageToWC:''})
//             }
//         }
        
//     }

//     checkCheckBox() {
//         var checkbox = document.querySelectorAll('.problem-checkbox:checked')
//         this.setState({checkBoxCheckCount:checkbox.length})
//     }

//     checkCheckBoxPage() {
//         var checkboxPage = document.querySelectorAll('.page-checkbox:checked')
//         if (checkboxPage.length > 0) {
//             this.setState({
//                 checkBoxCheckCountPage: checkboxPage.length,
//                 pageToWC: "",
//                 errorPageToWC: ""
//             });
//         } else {
//             this.setState({
//                 checkBoxCheckCountPage: 0,
//                 pageToWC: "",
//                 errorPageToWC: ""
//             })
//         }
//     }

//     // checkCheckBoxPage() {
//     //     var checkboxPage = document.querySelectorAll('.page-checkbox:checked')
//     //     this.setState({checkBoxCheckCountPage:checkboxPage.length})
//     // }

//     render () {
//         return (
//             <>
//             <div className="py-md-3 py-2">
//                 <div className="responsive-bar" style={{alignItems:'baseline', height:'55px'}}>
//                     <h4 className="title-icare title-fitur m-0 p-0 fw-bold" style={{fontSize: '18px'}}>
//                         <Link className="nav-link d-inline me-3" to="../dashboard">
//                             <i className="fa fa-arrow-left color-arrow-left" style={{color: '#014C90'}}></i>
//                             {/* <i className="fa fa-arrow-left me-3" style={{fontSize:'16px', color:'#014C90'}}></i> */}
//                         </Link>
//                         {/* <span className="title-icare title-fitur fw-bold py-1" style={{borderBottom:'3px solid #014C90', fontSize:'18px'}}>Install Request</span> */}
//                         <span style={{borderBottom:'3px solid #014C90'}}>Install Request</span>
//                     </h4>
//                 </div>
//                 <div className="responsive-install">
//                     <div className="card px-3 shadow border-0">
//                         <form onSubmit={this.submit}>
//                             <div className="card-body">
//                                 <div className="row">
//                                     <div className="card-lable py-1 mb-2" style={{backgroundColor:'#014C90'}}>
//                                         <label className="fw-medium" style={{fontSize:'12px', color:'#fff'}}>Equipment Number</label>
//                                     </div>
//                                     {/* <div className="d-lg-grid d-none p-0">
//                                             <Link className="py-4 mb-2" style={{border:'1px solid #000'}} onChange={this.validationEquipment} to="/daftar_eq"></Link>
//                                             <span className={`text-danger small mb-4 px-0 ${this.state.errorMessageEqipmentNumber !== '' ? '' : 'd-none'}`} style={{fontSize:'12px'}}> {this.state.errorMessageEqipmentNumber} </span>
//                                     </div> */}
//                                     <div className="d-flex p-0">
//                                         <div className="col-lg-11 col-9">
//                                             <select className="input-page select-option w-100 d-block mb-md-4 mb-3" style={{height:'50px', border:'1px solid #797979', paddingLeft:'10px'}} onChange={this.validationEquipment}>
//                                                 <option></option>
//                                                 {this.state.equipmentList.map((group) => (
//                                                     <optgroup key={group.id}>
//                                                         <option style={{fontSize:'14px'}}>{group.noEQ} | {group.namaModel} | {group.keterangan}</option>
//                                                         <hr style={{border:'3px solid black'}}/>
//                                                     </optgroup>
//                                                 ))}
//                                             </select>
//                                             <span className={`text-danger small mb-4 px-0 ${this.state.errorMessageEqipmentNumber !== '' ? '' : 'd-none'}`} style={{fontSize:'12px'}}> {this.state.errorMessageEqipmentNumber} </span>
//                                         </div>
//                                         <div className="col-lg-1 col-2 text-center">
//                                             <Link to="/form_eq/0">
//                                                 <button className="btn btn-login btn-plus" style={{height:'50px', width:'80px'}}>
//                                                     <i className="fa fa-plus fs-4 py-auto"></i>
//                                                 </button>
//                                             </Link>
//                                         </div>
//                                     </div>

//                                     <div className="d-lg-none d-flex p-0">
//                                         <div className="col-10 p-0 d-grid">
//                                             <Link className="py-4 mb-2" style={{border:'1px solid #000'}} onChange={this.validationEquipment} to="/daftar_eq"></Link>
//                                             <span className={`text-danger small mb-4 px-0 ${this.state.errorMessageEqipmentNumber !== '' ? '' : 'd-none'}`} style={{fontSize:'12px'}}> {this.state.errorMessageEqipmentNumber} </span>
//                                         </div>
//                                         <div className="col-2 text-center my-auto">
//                                             <Link className="fa fa-qrcode" style={{fontSize: '45px', textDecoration: 'none', color: '#000', right: 5}}></Link>
//                                         </div>
//                                     </div>
                                    
//                                     <div className="card-lable py-1 mb-2" style={{backgroundColor:'#014C90'}}>
//                                         <label className="fw-medium" style={{fontSize:'12px', color:'#fff'}}>Alamat/Lokasi Mesin</label>
//                                     </div>
//                                     <Link className="py-4 mb-4" style={{border:'1px solid #000'}} ></Link>
//                                     <span className={`text-danger small mb-4 px-0 ${ this.state.errorAddressOrMachineLocation !== '' ? '' : 'd-none' }`} style={{fontSize:'12px'}} >{ this.state.errorAddressOrMachineLocation }</span>
                                    
//                                     <div className="card-lable py-1 mb-2" style={{backgroundColor:'#014C90'}}>
//                                         <label className="fw-medium" style={{fontSize:'12px', color:'#fff'}}>Problem (Please Select)</label>
//                                     </div>

//                                     <div className="col-md-4 col-sm-6 col-6 input-check d-md-block d-none">
//                                         <div className="check-item d-flex align-items-center mb-4 form-check">
//                                             <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="mt-0 me-2 form-check-input"/> 
//                                             <label className="form-check-label" style={{fontSize:'14px'}}>Install driver printer</label>
//                                         </div>
//                                         <div className="check-item d-flex align-items-center mb-4 form-check">
//                                             <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="mt-0 me-2 form-check-input"/>
//                                             <label className="form-check-label" style={{fontSize:'14px'}}>Setting printer</label>
//                                         </div>
//                                         <div className="check-item d-flex align-items-center mb-4 form-check">
//                                             <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="mt-0 me-2 form-check-input"/>
//                                             <label className="form-check-label" style={{fontSize:'14px'}}>Setting address book</label>
//                                         </div>
//                                         <div className="check-item d-flex align-items-center mb-4 form-check">
//                                             <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="mt-0 me-2 form-check-input"/>
//                                             <label className="form-check-label" style={{fontSize:'14px'}}>Setting Kalibrasi</label>
//                                         </div>
//                                     </div>

//                                     <div className="col-md-4 col-sm-6 col-6 input-check d-md-block d-none">
//                                         <div className="check-item d-flex align-items-center mb-4 form-check">
//                                             <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="install-checkbox me-2 form-check-input"/> 
//                                             <label style={{fontSize:'14px'}}>Install resite</label>
//                                         </div>
//                                         <div className="check-item d-flex align-items-center mb-4 form-check">
//                                             <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="install-checkbox me-2 form-check-input"/>
//                                             <label style={{fontSize:'14px'}}>Setting scan</label>
//                                         </div>
//                                         <div className="check-item d-flex align-items-center mb-4 form-check">
//                                             <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="install-checkbox me-2 form-check-input"/>
//                                             <label style={{fontSize:'14px'}}>Install New Machine</label>
//                                         </div>
//                                         <div className="check-item d-flex align-items-center mb-4 form-check">
//                                             <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="install-checkbox me-2 form-check-input"/>
//                                             <label style={{fontSize:'14px'}}>Setting Warna</label>
//                                         </div>
//                                     </div>

//                                     <div className="col-md-4 col-sm-6 col-6 input-check d-md-block d-none">
//                                         <div className="check-item d-flex align-items-center mb-4 form-check">
//                                             <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="install-checkbox me-2 form-check-input"/> 
//                                             <label style={{fontSize:'14px'}}>Install accessories</label>
//                                         </div>
//                                         <div className="check-item d-flex align-items-center mb-4 form-check">
//                                             <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="install-checkbox me-2 form-check-input"/>
//                                             <label style={{fontSize:'14px'}}>Setting Authentication / Auditron</label>
//                                         </div>
//                                         <div className="check-item d-flex align-items-center mb-4 form-check">
//                                             <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="install-checkbox me-2 form-check-input"/>
//                                             <label style={{fontSize:'14px'}}>Setting IP Address</label>
//                                         </div>
//                                         <div className="check-item d-flex align-items-center mb-4 form-check">
//                                             <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="form-check-input install-checkbox me-2"/>
//                                             <label style={{fontSize:'14px'}}>Setting Fax</label>
//                                         </div>
//                                     </div>



//                                     <div className="col-md-4 col-sm-6 col-6 input-check d-md-none d-block">
//                                         <div className="check-item d-flex align-items-center mb-4 form-check">
//                                             <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="me-md-3 mt-0 me-2 form-check-input"/> 
//                                             <label className="form-check-label" style={{fontSize:'14px'}}>Install driver printer</label>
//                                         </div>
//                                         <div className="check-item d-flex align-items-center mb-4 form-check">
//                                             <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="me-md-3 mt-0 me-2 form-check-input"/>
//                                             <label className="form-check-label" style={{fontSize:'14px'}}>Setting printer</label>
//                                         </div>
//                                         <div className="check-item d-flex align-items-center mb-4 form-check">
//                                             <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="me-md-3 mt-0 me-2 form-check-input"/>
//                                             <label className="form-check-label" style={{fontSize:'14px'}}>Setting address book</label>
//                                         </div>
//                                         <div className="check-item d-flex align-items-center mb-4 form-check">
//                                             <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="me-md-3 mt-0 me-2 form-check-input"/>
//                                             <label className="form-check-label" style={{fontSize:'14px'}}>Setting Kalibrasi</label>
//                                         </div>
//                                         <div className="check-item d-flex align-items-center mb-4 form-check">
//                                             <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="me-md-3 mt-0 me-2 form-check-input"/> 
//                                             <label style={{fontSize:'14px'}}>Install resite</label>
//                                         </div>
//                                         <div className="check-item d-flex align-items-center mb-4 form-check">
//                                             <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="me-md-3 mt-0 me-2 form-check-input"/>
//                                             <label style={{fontSize:'14px'}}>Setting scan</label>
//                                         </div>
//                                     </div>
//                                     <div className="col-md-4 col-sm-6 col-6 input-check d-md-none d-block mb-2">
//                                         <div className="check-item d-flex align-items-center mb-4 form-check">
//                                             <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="me-md-3 mt-0 me-2 form-check-input"/>
//                                             <label style={{fontSize:'14px'}}>Install New Machine</label>
//                                         </div>
//                                         <div className="check-item d-flex align-items-center mb-4 form-check">
//                                             <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="me-md-3 mt-0 me-2 form-check-input"/>
//                                             <label style={{fontSize:'14px'}}>Setting Warna</label>
//                                         </div>
//                                         <div className="check-item d-flex align-items-center mb-4 form-check">
//                                             <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="me-md-3 mt-0 me-2 form-check-input"/> 
//                                             <label style={{fontSize:'14px'}}>Install accessories</label>
//                                         </div>
//                                         <div className="check-item d-flex align-items-center mb-4 form-check">
//                                             <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="my-auto me-md-2 me-2 form-check-input"/>
//                                             <label style={{fontSize:'14px'}}>Setting Authentication / Auditron</label>
//                                         </div>
//                                         <div className="check-item d-flex align-items-center mb-4 form-check">
//                                             <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="me-md-3 mt-0 me-2 form-check-input"/>
//                                             <label style={{fontSize:'14px'}}>Setting IP Address</label>
//                                         </div>
//                                         <div className="check-item d-flex align-items-center mb-4 form-check">
//                                             <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="me-md-3 mt-0 me-2 form-check-input"/>
//                                             <label style={{fontSize:'14px'}}>Setting Fax</label>
//                                         </div>
//                                     </div>

//                                     <div className="card-lable py-1 mb-2" style={{backgroundColor:'#014C90'}}>
//                                         <label className="fw-medium" style={{fontSize:'12px', color:'#fff'}}>Tambah Deskripsi</label>
//                                     </div>
//                                     <div className="mb-4 p-0">
//                                         <input style={{paddingLeft:'10px'}} type="text" className={ `input-page py-2 w-100 ${ this.state.errorDescription !== '' ? 'border-danger border' : '' }` } onChange={this.validationDescription} />
//                                         <span className={`text-danger small px-0 ${ this.state.errorDescription !== '' ? '' : 'd-none' }`} style={{fontSize:'12px'}} >{ this.state.errorDescription }</span>
//                                     </div>

//                                     <div className="card-lable py-1 mb-2" style={{backgroundColor:'#014C90'}}>
//                                         <label className="fw-medium" style={{fontSize:'12px', color:'#fff'}}>Page</label>
//                                     </div>
                                    

//                                     <div className="d-flex py-2 mb-5">
//                                         <div className="form-check py-2">
//                                             <input type="checkbox" style={{ borderRadius: 0, padding: '1px' }} className="form-check-input page-checkbox" id="pageToWC" onChange={ this.checkCheckBoxPage } />
//                                             <label htmlFor="pageToWC" className="form-check-label">Page to WC</label>
//                                         </div>
//                                         <div className="ms-2 d-flex flex-column" style={{ width: '110px' }}>
//                                             <input type="text" style={{paddingLeft:'10px'}} className={`ms-2 py-2 input-page w-100 ${ this.state.errorPageToWC !== '' ? 'border-danger border' : '' }`} onChange={this.validationPageToWC} disabled={this.state.checkBoxCheckCountPage === 0} value={this.state.pageToWC}  />
//                                             <span className={ `text-danger px-2  ${ this.state.errorPageToWC !== '' ? '' : 'd-none' }` } style={{fontSize:'12px', textAlign:'left'}} >{ this.state.errorPageToWC }</span>
//                                         </div>
//                                     </div>
                                        
//                                     <div className="text-center">
//                                         <p className="text-decoration-underline fw-medium fst-italic text-center mt-3" style={{fontSize:'14px', color:'pink'}}>Please upload photo meter information/photo machine</p>
//                                         <input type="file" className="d-none" id="input-file" onChange={this.previewImage} accept="image/*" />
//                                         <label className="file-icon mb-3 d-block" htmlFor="input-file">
//                                             <div className="mx-auto rounded-circle p-2" style={{backgroundColor:'#014C90', color:'#fff', width:'50px', height:'50px', marginLeft:'48%'}}>
//                                                 <img className="mt-1" src="images/upload.png" style={{width:'22px'}}></img>
//                                             </div>
//                                         </label>
//                                         <div className="d-none col-md-6 col-sm-8 mx-auto my-5" id="display-image">
//                                             <img className="w-50" src="#" alt="" id="preview-image" />
//                                         </div>
//                                         <button className="btn btn-login py-2 px-5 mt-4" style={{fontSize:'12px', marginLeft:'9px'}}>Submit</button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </form>
//                         <ConfirmAlert visible={this.state.showPopup} message="Mohon isi field yang kosong dan upload foto meter. Untuk field problem isi min. 1" customClass="col-md-5 col-sm-8 col-10" onClick={this.handlePopup} />
//                         <ConfirmAlert visible={this.state.showAddedPopup} message="Berhasil melakukan permintaan install" customClass="col-sm-3" onClick={this.handlePopup} />
//                     </div>
//                 </div>
//             </div>
//             </>
//         )
//     }
// }