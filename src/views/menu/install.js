import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ConfirmAlert from "../../component/alert/confirmAlert";
import OptionAlert from "../../component/alert/optionAlert";
import { getDaftarEq } from "../../services/API/mod_daftarEQ";
import { masterRequestInstall } from "../../services/API/mod_masterRequest";
import { createRequest } from "../../services/API/mod_request";
import LoadingAlert from "../../component/alert/loadingAlert";

function Install() {
    const navigate = useNavigate()
    const location = useLocation()
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
    const [showPageToWc, setShowPageToWc] = useState(localStorage.getItem('status_internal'))
    const [selectedEquipment, setSelectedEquipment] = useState(null)
    const [isFormValid, setIsFormValid] = useState(false)
    const [searchText, setSearchText] = useState('')
    const [showDropdown, setShowDropdown] = useState(false)
    const [showPopup, setShowPopup] = useState(false)
    // const [showAddedPopup, setShowAddedPopup] = useState(false)
    const [showOptionAlert, setShowOptionAlert] = useState(false)
    const [alertOption, setAlertOption] = useState({title: '', message: '', redirect: false})
    const [loading, setLoading] = useState(false)
    const [equipmentList, setEquipmentList] = useState([])
    const [originalData, setOriginalData] = useState('')
    const [meterImage, setMeterImage] = useState('')
    const [countFileInput, setCountFileInput] = useState(0)
    const [showMoreEquipment, setShowMoreEquipment] = useState(false)
    const [dataProblemRequest, setDataProblemRequest] = useState([])
    const [requestd, setRequestd] = useState([])

    useEffect(() => {
        daftarEq()
        masterRequest()
        if(location.state?.equipment !== '') {
            setSearchText(location.state?.equipment)
            setSelectedEquipment({
                equipment: location.state?.equipment,
                modelName: location.state?.modelName,
                description: location.state?.description,
                AddressId: location.state?.address.id,
                Penerima: location.state?.address.Penerima,
                Nama_Alamat: location.state?.address.Nama_Alamat,
                Alamat: location.state?.address.Alamat,
                Kota: location.state?.address.Kota,
                Latitude: location.state?.address.Latitude,
                Longitude: location.state?.address.Longitude
            })
            // console.log(location.state);
        }
    }, [])

    const daftarEq = async () => {
        const res = await getDaftarEq()
        if(res.status = 200) {
            // console.log(res.data)
            setEquipmentList(res.data.Table)
            setOriginalData(res.data.Table)
        }
    }

    const masterRequest = async () => {
        setLoading(true)
        const res = await masterRequestInstall()
        setLoading(false)
        if(res.status == 200) {
            // console.log(res)
            setDataProblemRequest(res.data.Table)
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

    const displayEquipmentList = showMoreEquipment ? equipmentList : equipmentList.slice(0, 5)
    const handleShowMoreEquipment = () => {
        setShowMoreEquipment(true)
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
            setCountFileInput(e.target.files.length)
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
        setShowOptionAlert(false)
        if(alertOption.redirect) {
            navigate('/dashboard')
        }
    }

    const submit = async (e) => {
        e.preventDefault()
        // console.log(requestd)
        // return
        var checkboxPage = document.querySelectorAll('.page-checkbox:checked')
        let isValid = true;

        if(selectedEquipment === null) { 
            setErrorMessageEquipmentNumber('Silahkan isi equipment number')
        }
        if(selectedEquipment === null) { 
            setErrorAddressOrMachineLocation('Silahkan isi alamat/lokasi mesin')
        }
        if(description === "") { 
            setErrorDescription('Silahkan isi deskripsi')
            isValid = false;
        }
        if(checkboxPage.length > 0 && pageToWC === "") { 
            setErrorPageToWC( pageToWC === "" ? 'Silahkan isi page' : '')
            isValid = false;
        }

        setIsFormValid(isValid);

        if(isValid && countFileInput > 0) {
            console.log(equipment);
            var bodyFormData = new FormData()
            bodyFormData.append('FileMeter', meterImage)
            bodyFormData.append('request', JSON.stringify(
                {
                    RequestId: 2,
                    UserId: localStorage.getItem('id'),
                    statusId: 1,
                    Equipment: selectedEquipment.equipment,
                    Latitude: selectedEquipment.Latitude,
                    Longitude: selectedEquipment.Longitude,
                    UserAddressId: selectedEquipment.AddressId,
                    capture: meterImage.name,
                    keterangan: description,
                    meter_billing: 0,
                    requestd: requestd,
                    isPage: checkBoxCheckCountPage,
                    wctr: pageToWC,
                    captureConsumable: null
                }
            ))
            bodyFormData.append('FileConsumable', null)
            setLoading(true)
            const res = await createRequest(bodyFormData)
            setLoading(false)
            if(res.status ==200 && res.data.includes('Succes insert request')) {
                setShowPopup(true)
                setAlertOption({title: 'Berhasil', message: 'Berhasil melakukan permintaan install', redirect: true})
                // setShowAddedPopup(true)
            } else {
                setShowPopup(true)
                setAlertOption({title: 'Error', message: 'Gagal melakukan permintaan install', redirect: false})
                // setAlertOption({title: 'Error', message: res.data, redirect: false})
            }
        } else {
            setShowPopup(true)
            setAlertOption({title: 'Error', message: 'Mohon isi field yang kosong dan upload foto meter. Untuk field problem isi min. 1', redirect: false})
            // setShowAddedPopup(false)
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

    const handleCheckboxRequestValue = (e) => {
    var temp = requestd
    if(e.currentTarget.checked) {
        temp.push({ requesttypeid: e.currentTarget.getAttribute('data-id'), description: e.currentTarget.getAttribute('data-description') })
            setRequestd(temp)
        } else {
            var temp = requestd.filter(val => val.requesttypeid != e.currentTarget.getAttribute('data-id'))
            setRequestd(temp)
        }
    }

    const handleRedirect= (e) => {
        e.preventDefault()
        navigate(`/tambah_eq`, {
            state: {
                redirect: -1
            }
        })
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
                                                    <div className="dropdown-install" style={{position:'absolute', backgroundColor:'white', overflow:'hidden', width:'88%', top:'110px', zIndex:'1', overflowY:'auto', maxHeight:'360px', borderRight:'1px solid #797979', borderLeft:'1px solid #797979', borderTop:'1px solid #797979'}}>
                                                        {displayEquipmentList.map((item, index) => (
                                                            <div key={index} className="dropdown-item-install" onClick={() => handleDropdownItemClick(item)}>
                                                                <div>{item.equipment} - {item.eqmodelName}</div>
                                                                <div>{item.description}</div>
                                                            </div>
                                                        ))}
                                                        {!showMoreEquipment && equipmentList.length > 5 && (
                                                            <div className="dropdown-item-install" onClick={handleShowMoreEquipment} style={{cursor:'pointer'}}>
                                                                <div className="item-eq-lainnya" style={{color:'#014C90'}}>Equipment Lainnya...</div>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                    </div>
                                    <div className="col-lg-1 col-2 text-center">
                                        <button className="btn btn-login btn-plus" style={{height:'50px', width:'80px'}} onClick={handleRedirect}>
                                            <i className="fa fa-plus fs-4 py-auto"></i>
                                        </button>
                                    </div>
                                    <div className="col-1 d-block d-lg-none">
                                        <Link className="fa fa-qrcode" to="/qr-scanner" style={{fontSize:'34px', textDecoration:'none', color:'#000',right:5}}></Link>
                                    </div>
                                </div>
                                
                                <div className="card-lable py-1 mb-2" style={{backgroundColor:'#014C90'}}>
                                    <label className="fw-medium" style={{fontSize:'12px', color:'#fff'}}>Alamat/Lokasi Mesin</label>
                                </div>
                                <div className="form-install" style={{border:'1px solid #797979', height:'53px', paddingTop:'1px'}} >
                                    <strong className="small">{selectedEquipment?.Penerima} {selectedEquipment && location.state?.equipment ? "-" : ""} {selectedEquipment?.Nama_Alamat}</strong><br/>
                                    <strong className="small d-flex mt-0">{selectedEquipment?.Alamat} {selectedEquipment && location.state?.equipment ? "-" : ""} {selectedEquipment?.Kota}</strong>
                                </div>
                                <span className={`text-danger small py-1 px-0 ${ errorAddressOrMachineLocation !== '' ? '' : 'd-none' }`} style={{fontSize:'12px'}} >{ errorAddressOrMachineLocation }</span>
                                
                                <div className="card-lable py-1 mt-4 mb-2" style={{backgroundColor:'#014C90'}}>
                                    <label className="fw-medium" style={{fontSize:'12px', color:'#fff'}}>Problem (Please Select)</label>
                                </div>
                                {dataProblemRequest.map((value,key) => (
                                    <div className="col-md-4 col-sm-6 col-6 input-check" key={key}>
                                        <div className="check-item d-flex align-items-center mb-4 form-check">
                                            <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="mt-0 me-2 form-check-input" id={value.Description} onChange={handleCheckboxRequestValue} data-id={value.Request_TypeId} data-description={value.Description}/> 
                                            <label className="form-check-label" style={{fontSize:'14px'}} htmlFor={value.Description} >{value.Description}</label>
                                        </div>
                                    </div>
                                ))}                                                            
                                   

                                <div className="card-lable py-1 mb-2" style={{backgroundColor:'#014C90'}}>
                                    <label className="fw-medium" style={{fontSize:'12px', color:'#fff'}}>Tambah Deskripsi</label>
                                </div>
                                <div className="mb-4 p-0">
                                    <input style={{paddingLeft:'10px', border:'1px solid #797979', height:'53px'}} type="text" className={ `form-install input-page w-100 ${ errorDescription !== '' ? 'border-danger border' : '' }` } onChange={validationDescription} />
                                    <span className={`text-danger small px-0 ${ errorDescription !== '' ? '' : 'd-none' }`} style={{fontSize:'12px'}} >{ errorDescription }</span>
                                </div>
                                {
                                    showPageToWc == 1 ? 
                                    (
                                        <div className="card-lable py-1 mb-2" style={{backgroundColor:'#014C90'}}>
                                            <label className="fw-medium" style={{fontSize:'12px', color:'#fff'}}>Page</label>
                                        </div>

                                    ) : (
                                        <div></div>
                                    )
                                }
                                {
                                    showPageToWc == 1 ? 
                                    (
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
                                    ) : (
                                        <div></div>
                                    )
                                }
                                <div className="text-center">
                                    <p className="text-decoration-underline fw-medium fst-italic text-center mt-3" style={{fontSize:'14px', color:'pink'}}>Please upload photo meter information/photo machine</p>
                                    <input type="file" className="d-none" id="input-file" onChange={previewImage} accept="image/*" />
                                    <label className="file-icon mb-3 d-md-block d-none" htmlFor="input-file">
                                        <div className="text-center rounded-circle p-2 mx-auto" style={{backgroundColor:'#014C90', color:'#fff', width:'50px', height:'50px', marginLeft:'48%'}}>
                                            <img className="mt-1" src="images/upload.png" style={{width:'22px'}}></img>
                                        </div>
                                    </label>
                                    <label className="file-icon mb-3 d-md-none d-block" onClick={() => setShowOptionAlert(true)}>
                                        <div className="text-center rounded-circle p-2 mx-auto" style={{backgroundColor:'#014C90', color:'#fff', width:'50px', height:'50px', marginLeft:'48%'}}>
                                            <i className="fa fa-camera fs-2 my-1"></i>
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
                    <LoadingAlert visible={loading} customClass="col-md-2 col-8" />
                    <ConfirmAlert visible={showPopup} message={alertOption.message} customClass="col-md-3 col-sm-8 col-8" onClick={handlePopup} />
                    <OptionAlert visible={showOptionAlert} message="Ambil foto dari" previewImage={previewImage} handlePopup={() => setShowOptionAlert(false)} customClass="col-sm-3"/>
                </div>
            </div>
        </div>
        </>
    )
}

export default Install

