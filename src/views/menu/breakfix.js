import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ConfirmAlert from "../../component/alert/confirmAlert";
import LoadingAlert from "../../component/alert/loadingAlert"
import OptionAlert from "../../component/alert/optionAlert";
import { getDaftarEq } from "../../services/API"
import { masterRequestBreakfix } from "../../services/API/mod_masterRequest";
import { createRequest } from "../../services/API/mod_request";

function Breakfix () {
    const navigate = useNavigate()
    const location = useLocation()
    const [showPopup, setShowPopup] = useState(false)
    const [loading, setLoading] = useState(false)
    const [alertOption, setAlertOption] = useState({title: '', message: '', redirect: false})
    const [showOptionAlert, setShowOptionAlert] = useState(false)
    const [checkBoxCheckCount, setCheckBoxCheckCount] = useState(0)
    const [checkBoxCheckCountPage, setCheckBoxCheckCountPage] = useState(0)
    const [equipment, setEquipment] = useState('')
    const [machineLocation, setMachineLocation] = useState('')
    const [description, setDescription] = useState('')
    const [pageToWC, setPageToWC] = useState('')
    const [showPageToWc, setShowPageToWc] = useState(localStorage.getItem('status_internal'))
    const [errorCode, setErrorCode] = useState('')
    const [errorMessageEquipmentNumber, setErrorMessageEquipmentNumber] = useState('')
    const [errorAddressOrMachineLocation, setErrorAddressOrMachineLocation] = useState('')
    const [errorDescription, setErrorDescription] = useState('')
    const [errorPageToWC, setErrorPageToWC] = useState('')
    const [errorInput, setErrorInput] = useState('')
    const [selectedEquipment, setSelectedEquipment] = useState(null)
    const [isFormValid, setIsFormValid] = useState(false)
    const [searchText, setSearchText] = useState('')
    const [showDropdown, setShowDropdown] = useState(false)
    const [originalData, setOriginalData] = useState('')
    const [showMoreEquipment, setShowMoreEquipment] = useState(false)
    const { id } = useParams()
    const [equipmentList, setEquipmentList] = useState([])
    const [dataProblemRequest, setDataProblemRequest] = useState([])
    const [requestd, setRequestd] = useState([])
    const [dataProblemWithoutErrorCode, seDataProblemWithoutErrorCode] = useState([])
    const [meterImage, setMeterImage] = useState(0)
    const [countFileInput, setCountFileInput] = useState(0)


    useEffect(() => {
        daftarEq()
        masterRequest()
        if(location.state?.equipment) {
            setSearchText(location.state?.equipment )
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

    const handleRedirect = (e) => {
        e.preventDefault()
        navigate(`/tambah_eq`, {
            state: {
                redirect: -2
            }
        })
    }

    const handleBack = () => {
        if(location.state?.redirect === 3) {
            navigate('/supplies_request')
        } else {
            navigate('/dashboard')
        }
    }

    const daftarEq = async () => {
        const res = await getDaftarEq()
        if(res.status == 200) {
            setEquipmentList(res.data.Table)
            setOriginalData(res.data.Table)
        }
    }

    const masterRequest = async () => {
        setLoading(true)
        const res = await masterRequestBreakfix()
        setLoading(false)
        if(res.status == 200) {
            // console.log(res)
            setDataProblemRequest(res.data.Table.filter(value => value.Description.includes('Error code')))
            seDataProblemWithoutErrorCode(res.data.Table.filter(value => !value.Description.includes('Error code')))
        }
    }

    const handleSearchInputChange = (e) => {
        const inputText = e.target.value
        setSearchText(inputText)

        if(inputText.trim() === "") {
            setErrorMessageEquipmentNumber('Silahkan isi equipment number')
        } else {
            setErrorMessageEquipmentNumber('')
            setErrorAddressOrMachineLocation('')
        }

        setShowDropdown(!!inputText)
    }

    const handleInputClick = () => {
        setShowDropdown(!showDropdown)
    }

    const handleDropdownItemClick = (item) => {
        setSelectedEquipment(item)
        setSearchText(item.equipment)
        setShowDropdown(false)
        setErrorMessageEquipmentNumber('')
        setErrorAddressOrMachineLocation('')
    }

    const displayEquipmentList = showMoreEquipment ? equipmentList : equipmentList.slice(0, 5)
    const handleShowMoreEquipment = () => {
        setShowMoreEquipment(true)
    }

    const filteredEquipmentList = (e) => {
        if(e.target.value != '') {
            var filterData = originalData.filter(val => (val.equipment.toString().toLowerCase().includes(e.target.value.toLowerCase())) || val.eqmodelName.toLowerCase().includes(e.target.value.toLowerCase()) || val.description.toLowerCase().includes(e.target.value.toLowerCase()))
            setEquipmentList(filterData)
        } else {
            setEquipmentList(originalData)
        }
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
        var checkboxPage = document.querySelectorAll('.page-checkbox:checked')
        var checkbox = document.querySelectorAll('.problem-checkbox:checked')

        let isValid = true

        if(!equipment === selectedEquipment?.equipment || selectedEquipment == null) {
            setErrorMessageEquipmentNumber('Silahkan isi equipment number')
            isValid = false
        }   
        if(!machineLocation === selectedEquipment?.AddressId || selectedEquipment == null) { 
            setErrorAddressOrMachineLocation('Silahkan isi alamat/lokasi mesin')
            isValid = false
        }
        if(checkbox.length > 0 && errorCode === "") {  
            setErrorInput(checkbox.length > 0 ? 'Silahkan isi error code' : '')
            isValid = false
            console.log(errorCode);
        }
        if(description === "") { 
            setErrorDescription('Silahkan isi deskripsi')
            isValid = false
        }
        if(pageToWC === "" && checkboxPage.length > 0) { 
            setErrorPageToWC(checkboxPage.length > 0 ? 'Silahkan isi page' : '')
            isValid = false
        }

        setIsFormValid(isValid);

        if(isValid && countFileInput > 0) {
            setLoading(true)
            var bodyFormData = new FormData()
            bodyFormData.append('FileMeter', meterImage)
            bodyFormData.append('request', JSON.stringify(
                {
                    RequestId: 1,
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
            const res = await createRequest(bodyFormData)
            // console.log(res);
            setLoading(false)
            if(res.status == 200 && res.data.includes('Succes insert request')) {
                setShowPopup(true)
                setAlertOption({title: '', message: 'Berhasil melakukan permintaan breakfix', redirect: true})
                // setShowAddedPopup(true)
            } else {
                setShowPopup(true)
                setAlertOption({title: 'Error', message: 'Gagal melakukan permintaan breakfix', redirect: false})
            }
        } else {
            setShowPopup(true)
            setAlertOption({title: 'Error', message: 'Mohon isi field yang kosong dan upload foto meter. Untuk field problem isi min. 1', redirect: false})
            // setShowAddedPopup(false)
        }
    }

    // const validationEquipment = (e) => {
    //     e.preventDefault()
    //     const selectedEquipment = e.target.value
    //     setEquipment(selectedEquipment)

    //     if(equipment !== "") {
    //         setErrorMessageEquipmentNumber('');
    //     }
    // }

    // const validationMachineLocation  = (e) => {
    //     e.preventDefault()
    //     setMachineLocation(e.target.value)
    //     if(machineLocation === selectedEquipment?.AddressId) {
    //         setErrorAddressOrMachineLocation('')
    //     }
    // }
    
    const validationErrorCode = (e) => {
        e.preventDefault()
        setErrorCode(e.target.value)
        var temp = requestd.map((val) => {
            if(parseInt(val.requesttypeid) === 17) {
                val.description = e.target.value
            }
            return val
        })
        setRequestd(temp)
        // console.log(temp)
        if(checkBoxCheckCount != 0 && e.target.value === "") {
            setErrorInput('Silahkan isi error code') 
        } else {
            setErrorInput('')
        }
    }

    const validationDescription = (e) => {
        e.preventDefault()
        const description = e.target.value
        setDescription(description)
    
        if (description.trim() === "") {
            setErrorDescription('Silahkan isi deskripsi' )
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
        var checkbox = document.querySelectorAll('.problem-checkbox:checked');

        if(checkbox.length > 0) {
            setCheckBoxCheckCount(checkbox.length)
            // setErrorCode('')
            setErrorInput('')
        } else {
            setCheckBoxCheckCount(0)
            setErrorCode('')
            setErrorInput('')
            document.getElementById('input-error').value = '';
            // document.getElementById('input-error-responsive').value = '';
        }
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

    const previewImage = (e) => {
        const file = e.target
        if(file.files[0]) {
            setCountFileInput(file.files.length)
            setMeterImage(file.files[0])
            const reader = new FileReader()
            reader.onload = (e) => {
                document.getElementById('preview-image').src = e.target.result
            }
            reader.readAsDataURL(file.files[0])
        }
        document.getElementById('display-image').classList.remove('d-none')
        document.getElementById('display-image').classList.add('d-block')
    }

    const handleCheckboxRequestValue = (e) => {
        checkCheckBox() 
        var temp = requestd
        if(e.currentTarget.checked) {
            temp.push({ requesttypeid: e.currentTarget.getAttribute('data-id'), description: '' })
            setRequestd(temp)
        } else {
            var temp = requestd.filter(val => val.requesttypeid != e.currentTarget.getAttribute('data-id'))
            setRequestd(temp)
        }
    }
    
    return(
        <>
        <div className="py-md-3"> 
            <div className="responsive-bar" style={{alignItems:'baseline', height:'55px'}}>
                <h4 className="title-icare title-fitur m-0 p-0 fw-bold" style={{fontSize: '18px'}}>
                    <Link className="nav-link d-inline me-3" to="" onClick={handleBack} >
                        <i className="fa fa-arrow-left color-arrow-left" style={{color:'#014C90'}}></i>
                    </Link>
                        <span className="title-bold" style={{borderBottom:'3px solid #014C90'}}>Breakfix Request</span>
                </h4>
            </div>
            <div className="responsive-breakfix card px-md-4 px-1 shadow">
                <div className="card-body">
                    <form onSubmit={submit}>
                        <div className="row">
                            <div className="card-lable py-1 mb-2" style={{backgroundColor:'#014C90'}}>
                                <label className="fw-medium title-lable" style= {{fontSize:'14px', color:'#fff'}}>Equipment Number</label>
                            </div>
                            <div className="d-flex p-0">
                                <div className="col-lg-11 col-9 mb-4">
                                    <input id="search-dropdown-breakfix" onKeyUp={filteredEquipmentList} className={`form-control form-breakfix shadow-none small fw-bold rounded-0 ${ errorMessageEquipmentNumber !== '' ? 'border-danger border' : '' }`} style={{border:'1px solid #797979', height:'53px'}} type="text" value={searchText} onChange={handleSearchInputChange} onClick={handleInputClick} autoComplete="off" />
                                    <span className={`text-danger small ${ errorMessageEquipmentNumber !== '' ? '' : 'd-none' }`} style={{fontSize:'12px'}} >{ errorMessageEquipmentNumber }</span>
                                    {showDropdown && (
                                        <div className="dropdown-breakfix" style={{position:'absolute', backgroundColor:'white', overflow:'hidden', width:'87%', top:'10%', zIndex:'1', overflowY:'auto', maxHeight:'360px', borderRight:'1px solid #797979', borderLeft:'1px solid #797979', borderTop:'1px solid #797979'}}>
                                            {displayEquipmentList.map((item, index) => (
                                                <div key={index} className="dropdown-item-breakfix" onClick={() => handleDropdownItemClick(item)}>
                                                    <div>{item.equipment} - {item.eqmodelName}</div>
                                                    <div>{item.description}</div>
                                                </div>
                                            ))}
                                            {!showMoreEquipment && equipmentList.length > 5 && (
                                                <div className="dropdown-item-breakfix" onClick={handleShowMoreEquipment} style={{cursor:'pointer'}}>
                                                    <div className="item-eq-lainnya" style={{color:'#014C90'}}>Equipment Lainnya...</div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                                <div className="col-lg-1 col-2 text-center">
                                    <button className="btn btn-login btn-plus" style={{height: '50px', width:'80px'}} onClick={handleRedirect}>
                                        <i className="fa fa-plus fs-4 py-auto"></i>
                                    </button>
                                </div>
                                <div className="col-1 d-block d-lg-none">
                                    <Link className="fa fa-qrcode" to={'/qr-scanner'} style={{fontSize:'34px', textDecoration:'none', color:'#000', right:5}} />
                                </div>
                            </div>
                            <div className="card-lable py-1 mb-2" style={{backgroundColor:'#014C90'}}>
                                <label className="fw-medium title-lable" style={{fontSize:'14px', color:'#fff'}}>Alamat/Lokasi Mesin</label>
                            </div>
                            <div className={`form-breakfix w-100 d-block md-4 ${ errorAddressOrMachineLocation !== '' ? 'border-danger border' : '' }`} style={{border:'1px solid #797979', height:'53px    '}} onChange={handleSearchInputChange}>
                                <strong className="small"> {selectedEquipment?.Penerima} {selectedEquipment !== null ? '-' : ''} {selectedEquipment?.Nama_Alamat} </strong><br/>
                                <strong className="small d-flex mt-0"> {selectedEquipment?.Alamat} {selectedEquipment !== null ? '-' : ''} {selectedEquipment?.Kota} </strong>
                            </div>
                            <span className={`text-danger small py-1 p-0 ${ errorAddressOrMachineLocation !== '' ? '' : 'd-none' }`} style={{fontSize:'12px'}} >{ errorAddressOrMachineLocation }</span>
                            <div className="card-lable py-1 mb-md-4 mb-2 mt-4" style={{backgroundColor:'#014C90'}}>
                                <label className="fw-medium title-lable" style={{fontSize:'14px', color:'#fff'}}>Problem <i>&#40;Please Select&#41;</i></label>
                            </div>
                            {dataProblemWithoutErrorCode.map((value, key) => (
                                <div className="col-md-4 col-sm-6 col-6 input-check d-block" key={key}>
                                    <div className="check-item d-flex align-items-center mb-4 form-check">
                                        <input type="checkbox" style={{ borderRadius: 0, padding:'1px' }} className="me-3 mt-0 form-check-input" id={value.Description} onChange={handleCheckboxRequestValue} data-id={value.Request_TypeId} /> 
                                        <label className="form-check-label" style={{fontSize:'14px'}} htmlFor={value.Description}>{value.Description}</label>
                                    </div>
                                </div>
                            ))}
                            {dataProblemRequest.map((value, key) => (
                                <div className="col-12 mb-4 input-check" key={key}>
                                    <div className="check-item d-flex align-items-center mt-1 form-check">
                                        <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="problem-checkbox me-3 mt-0 form-check-input" id={value.Description} onChange={handleCheckboxRequestValue} data-id={value.Request_TypeId} />
                                        <label className="form-check-label" style={{fontSize:'14px'}} htmlFor={value.Description}>{value.Description}</label>
                                        <div className="col-md-4 col-6 d-md-none d-flex ms-3 align-items-center">
                                            <input type="text" className={`input-error w-50 ${ errorInput !== '' ? 'border-danger border' : '' }`} id="input-error" style={{paddingLeft:'10px', paddingRight:'10px', height: 30}} disabled={checkBoxCheckCount == 0} onChange={validationErrorCode} />  
                                            <span className={`text-danger small py-1 p-0 ${ errorInput !== '' ? '' : 'd-none' }`} style={{fontSize:'12px'}} >{ errorInput }</span>
                                        </div>
                                    </div>
                                    <div className="col-md-4 col-6 mb-4 d-md-block d-none mt-4">
                                        <input type="text" className={`input-error py-2 w-100 ${ errorInput !== '' ? 'border-danger border' : '' }`} id="input-error" style={{paddingLeft:'10px', paddingRight:'10px'}} disabled={checkBoxCheckCount == 0} onChange={validationErrorCode} />
                                        <span className={`text-danger small py-1 p-0 ${ errorInput !== '' ? '' : 'd-none' }`} style={{fontSize:'12px'}} >{ errorInput }</span>
                                    </div>
                                </div>
                            ))}
                            
                            
                            <div className="card-lable py-1 mb-2" style={{backgroundColor:'#014C90'}}>
                                <label className="fw-medium title-lable" style={{fontSize:'14px', color:'#fff'}}>Tambah Deskripsi <i>&#40;Maksimal 15 karakter&#41;</i></label>
                            </div>
                            <div className="mb-4 p-0">
                                <input type="text" maxLength="15" className={ `input-page py-md-3 py-1 w-100 ${ errorDescription !== '' ? 'border-danger border' : '' }` } style={{paddingLeft:'10px', paddingRight:'10px', border:'1px solid #797979'}} onChange={validationDescription} />
                                <span className={`text-danger small ${ errorDescription !== '' ? '' : 'd-none' }`} style={{fontSize:'12px'}} >{ errorDescription }</span>
                            </div>
                            {
                                showPageToWc == 1 ?
                                (
                                    <div className="card-lable py-1 mb-2" style={{backgroundColor:'#014C90'}}>
                                        <label className="fw-medium title-lable" style={{fontSize:'14px', color:'#fff'}}>Page</label>
                                    </div>

                                ) : (
                                    <div></div>
                                )
                            }
                            {
                                showPageToWc == 1 ? 
                                    (
                                        <div className="d-flex py-2 mb-md-5 mb-2 input-check">
                                            <div className="form-check py-2">
                                                <input type="checkbox" style={{ borderRadius: 0, padding: '1px' }} className="form-check-input page-checkbox" id="pageToWC" onChange={ checkCheckBoxPage } />
                                                <label htmlFor="pageToWC" className="form-check-label">Page to WC</label>
                                            </div>
                                            <div className="ms-2 d-flex flex-column" style={{ width: '110px' }}>
                                                <input type="text" className={`form-breakfix ms-2 py-2 input-page w-75 ${ errorPageToWC !== '' ? 'border-danger border' : '' }`} style={{paddingLeft:'10px', paddingRight:'10px'}} onChange={validationPageToWC} disabled={checkBoxCheckCountPage == 0} value={pageToWC}  />
                                                <span className={ `text-danger px-2  ${ errorPageToWC !== '' ? '' : 'd-none' }` } style={{fontSize:'12px'}} >{ errorPageToWC }</span>
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
                                    <div className="text-center rounded-circle p-2 mx-auto" style={{backgroundColor:'#014C90', color:'#fff', width:'50px', height:'50px'}}>
                                        <div className="d-md-block d-none">
                                            <img className="mt-1" src="images/upload.png" style={{width:'22px'}}></img>
                                        </div>
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
                                <button className="btn btn-login py-2 px-5" style={{fontSize:'14px'}}>Submit</button>
                            </div>
                        </div>
                    </form>
                    <LoadingAlert visible={loading} customClass="col-md-2 col-8" />
                    <ConfirmAlert visible={showPopup} titleMessage={alertOption.title} message={alertOption.message} customClass="col-md-3 col-sm-8 col-10" onClick={handlePopup} />
                    <OptionAlert visible={showOptionAlert} message="Ambil foto dari" previewImage={previewImage} handlePopup={() => setShowOptionAlert(false)} customClass="col-md-3" />
                </div>
            </div>
        </div>
        </>
    )
}

export default Breakfix