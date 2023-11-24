import React, { useState, useEffect } from "react";
import { Link, Navigate, useParams, useLocation, useNavigate } from "react-router-dom";
import ConfirmAlert from "../../component/alert/confirmAlert";
import OptionAlert from "../../component/alert/optionAlert";
import LoadingAlert from "../../component/alert/loadingAlert";
import { redirect } from "react-router-dom";
import { getDaftarEq, getMasterRequest } from "../../services/API";
import { masterRequestSupplies } from "../../services/API/mod_masterRequest";
import { createRequest } from "../../services/API/mod_request";

function Supplies() {
    const navigate = useNavigate()
    const location = useLocation()
    const [showPopup, setShowPopup] = useState(false)
    const [loading, setLoading] = useState(false)
    const [alertOption, setAlertOption] = useState({title: '', message: '', redirect: false})
    const [equipment, setEquipment] = useState('')
    const [machineLocation, setMachineLocation] = useState('')
    const [total, setTotal] = useState('')
    const [errorMessageEquipmentNumber, setErrorMessageEquipmentNumber] = useState('')
    const [errorAddressOrMachineLocation, setErrorAddressOrMachineLocation] = useState('')
    const [errorTotal, setErrorTotal] = useState('')
    const [selectedEquipment, setSelectedEquipment] = useState(null)
    const [isFormValid, setIsFormValid] = useState(false)
    const [searchText, setSearchText] = useState('')
    const [showDropdown, setShowDropdown] = useState(false)
    const [showMoreEquipment, setShowMoreEquipment] = useState(false)
    const [equipmentList, setEquipmentList] = useState([])
    const [originalData, setOriginalData] = useState('')
    const [showOptionAlert, setShowOptionAlert] = useState(false)
    const [masterCheckbox, setMasterCheckbox] = useState([])
    const [requestd, setRequestd] = useState([])
    const [isCheckBoxDisabled, setIsCheckBoxDisabled] = useState(true)
    const [countFileInput, setCountFileInput] = useState(0)
    const [meterImage, setMeterImage] = useState(0)
    const [statusImage, setStatusImage] = useState(0)

    useEffect(() => {
        daftarEq()
        masterRequest()
        if(location.state?.equipment) {
            setSearchText(location.state?.equipment )
            setIsCheckBoxDisabled(false)
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
        if(res.status == 200) {
            // console.log(res.data)
            setEquipmentList(res.data.Table)
            setOriginalData(res.data.Table)
        }
    }

    const compare = (a,b) => {

        if(a.no_urut < b.no_urut) {
            // console.log(-1);
            return -1
        }
        if(a.no_urut > b.no_urut) {
            return 1
        }
        return 0
    }

    const masterRequest = async () => {
        setLoading(true)
        const res = await masterRequestSupplies()
        setLoading(false)
        if(res.status == 200) {
            // console.log(res.data);
            setMasterCheckbox(res.data.Table.sort(compare))
            console.log(res.data.Table.sort(compare));
        }
    }

    const handleConsumableInput = (e) => {
        var target = e.currentTarget.getAttribute('data-target'),
            checkbox = document.querySelector(`input[data-id="${target}"]`)

        // set checkbox checked
        if(!checkbox.checked) {
            checkbox.checked = true
            e.currentTarget.value = 1
        }
    }

    const handleCheckboxRequestValue = (e) => {
        var id = e.currentTarget.getAttribute('data-id'),
            inputTarget = document.querySelector(`input[data-id="input-consumable-${id}"]`)
        
        if(!e.currentTarget.checked) inputTarget.value = ''
        else inputTarget.value = 1

        var temp = requestd
        if(e.currentTarget.checked) {
            temp.push({ requesttypeid: e.currentTarget.getAttribute('data-id'), description: inputTarget.value })
            setRequestd(temp)
        } else {
            var temp = requestd.filter(val => val.requesttypeid != e.currentTarget.getAttribute('data-id'))
            setRequestd(temp)
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

    const handleInputClick = () => {
        setShowDropdown(!showDropdown)
    }

    const handleDropdownItemClick = (item) => {
        setSelectedEquipment(item)
        setSearchText(item.equipment)
        setShowDropdown(false)
        setErrorMessageEquipmentNumber('')

        setIsCheckBoxDisabled(false)
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

    const previewImage = (e, type) => {
        const file = e.target
        if (file.files[0]) {
            setCountFileInput(file.files.length)
            const reader = new FileReader()
            reader.onload = (e) => {
                if (type === 'meter') {
                    setMeterImage(file.files[0])
                    document.getElementById('preview-image-meter').src = e.target.result
                } else if (type === 'status') {
                    setStatusImage(file.files[0])
                    document.getElementById('preview-image-status').src = e.target.result
                }
            }
            reader.readAsDataURL(file.files[0])
        }
        if (type === 'meter') {
            document.getElementById('display-image-meter').classList.remove('d-none')
            document.getElementById('display-image-meter').classList.add('d-block')
        } else if (type === 'status') {
            document.getElementById('display-image-status').classList.remove('d-none')
            document.getElementById('display-image-status').classList.add('d-block')
        }
    }

    const handleOpenOptionAlert = () => {
        setShowOptionAlert(true)
    }

    const handleCloseOptionAlert = () => {
        setShowOptionAlert(false)
    }

    const handlePopup = () => {
        setShowPopup(false) 
        if(alertOption.redirect) {
            navigate('/dashboard')
        }
    }

    const submit = async (e) => {
        e.preventDefault()

        let isValid = true;

        if(!equipment === selectedEquipment?.equipment || selectedEquipment == null) {
            setErrorMessageEquipmentNumber('Silahkan isi equipment number')
            isValid = false
        }   
        if(!machineLocation === selectedEquipment?.AddressId || selectedEquipment == null) { 
            setErrorAddressOrMachineLocation('Silahkan isi alamat/lokasi mesin')
            isValid = false
        }
        if(total === "") { 
            setErrorTotal('Silahkan isi total meter')
            isValid = false;
        }

        setIsFormValid(isValid)

        if(isValid && countFileInput > 0) {
            
            var bodyFormData = new FormData()
            bodyFormData.append('FileMeter', meterImage)
            bodyFormData.append('request', JSON.stringify(
                {
                    RequestId: 3,
                    UserId: localStorage.getItem('id'),
                    statusId: 1,
                    Equipment: selectedEquipment.equipment,
                    Latitude: selectedEquipment.Latitude,
                    Longitude: selectedEquipment.Longitude,
                    UserAddressId: selectedEquipment.AddressId,
                    capture: meterImage.name,
                    keterangan: '',
                    meter_billing: total,
                    requestd: requestd,
                    isPage: 0,
                    wctr: '',
                    captureConsumable: statusImage.name
                }
            ))
            bodyFormData.append('FileConsumable', statusImage)
            setLoading(true)
            const res = await createRequest(bodyFormData)
            // console.log(meterImage.name);
            setLoading(false)
            if(res.status == 200 && res.data.includes('Succes insert request')) {
                setShowPopup(true)
                setAlertOption({title: '', message: 'Berhasil melakukan permintaan consumable', redirect: true})
            } else {
                setShowPopup(true)
                setAlertOption({title: 'Error', message: 'Gagal melakukan permintaan consumable', redirect: false})
            }
        } else {
            setShowPopup(true)
            setAlertOption({title: 'Error', message: 'Mohon isi field yang kosong, upload foto meter dan upload foto status consumable. Untuk field problem isi min. 1', redirect: false})
        }
    }

    // const validationEquipment = (e) => {
    //     e.preventDefault()
    //     setEquipment(e.target.value)
    //     if(equipment !== "") {
    //         setErrorMessageEquipmentNumber('')
    //     }
    // }

    // const validationMachineLocation = (e) => {
    //     e.preventDefault()
    //     setMachineLocation(e.target.value)
    //     if(machineLocation !== "") {
    //         setErrorAddressOrMachineLocation('')
    //     }
    // }

    // const validationDescription = (e) => {
    //     e.preventDefault();
    //     const newdescription = e.target.value
    //     setDescription(newdescription)
    
    //     if (description.trim() === "") {
    //         setErrorDescription('Silahkan isi deskripsi')
    //     } else {
    //         setErrorDescription('')
    //     }
    // }

    const validationTotal = (e) => {
        const value = e.target.value;
        if (value === "") {
            setTotal(value)
            setErrorTotal("Silahkan isi total meter")
        } else if (/^\d*$/.test(value)) {
            setTotal(value)
            setErrorTotal('')
        } else {
            setErrorTotal("Silahkan isi total meter")
        }
    }

    const handleRedirect = (e) => {
        e.preventDefault()
        navigate(`/tambah_eq`, {
            state: {
                redirect: -3
            }
        })
    }

    const handleBreakfix = (e) => {
        e.preventDefault()
        navigate('/breakfix_request', {
            state: {
                redirect: 3
            }
        })
    }
    
    return (
        <>
        <div className="py-md-3">
            <div className="responsive-bar" style={{alignItems:'baseline', height:'55px'}}>
                <h4 className="title-icare title-fitur m-0 p-0 fw-bold" style={{fontSize: '18px'}}>
                    <Link className="nav-link d-inline me-3" to="../dashboard">
                        <i className="fa fa-arrow-left color-arrow-left" style={{color:'#014C90'}}></i>
                    </Link>
                        <span className="title-bold" style={{borderBottom:'3px solid #014C90'}}>Supplies Request</span>
                </h4>
            </div>
            <div className="responsive-supplies card px-lg-3 px-1 shadow border-0">
                <div className="card-body">
                    <form onSubmit={submit}>
                        <div className="row">
                            <div className="card-lable py-1 mb-2" style={{backgroundColor:'#014C90'}}>
                                <label className="fw-medium" style={{fontSize:'12px', color:'white'}}>Equipment Number</label>
                            </div>
                            <div className="d-flex p-0">
                                <div className="col-sm-11 col-9">
                                    <div className="custom-search-dropdown-supplies mb-4">
                                        <input id="search-dropdown-supplies" onKeyUp={filteredEquipmentList} className={`form-control form-supplies shadow-none small fw-bold rounded-0 ${ errorMessageEquipmentNumber !== '' ? 'border-danger border' : '' }`} style={{border:'1px solid #797979', height:'53px'}} type="text" value={searchText} onChange={handleSearchInputChange} onClick={handleInputClick} autoComplete="off" />
                                        <span className={`text-danger small ${ errorMessageEquipmentNumber !== '' ? '' : 'd-none' }`} style={{fontSize:'12px'}} >{ errorMessageEquipmentNumber }</span>
                                        {showDropdown && (
                                            <div className="dropdown-supplies" style={{position:'absolute', backgroundColor:'white', overflow:'hidden', width:'986px', top:'112px', zIndex:'1', overflowY:'auto', maxHeight:'360px', borderRight:'1px solid #797979', borderLeft:'1px solid #797979', borderTop:'1px solid #797979'}}>
                                                {displayEquipmentList.map((item,index) => (
                                                    <div key={index} className="dropdown-item-supplies" onClick={() => handleDropdownItemClick(item)}>
                                                        <div>{item.equipment} - {item.eqmodelName}</div>
                                                        <div>{item.description}</div>
                                                    </div>
                                                ))}
                                                {!showMoreEquipment && equipmentList.length > 5 && (
                                                    <div className="dropdown-item-supplies" onClick={handleShowMoreEquipment} style={{cursor:'pointer'}}>
                                                        <div className="item-eq-lainnya" style={{color:'#014C90'}}>Equipment Lalinnya...</div>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="col-lg-1 col-2 text-center">
                                    <button className="btn btn-login btn-plus" style={{height: '50px', width:'80px'}} onClick={handleRedirect}>
                                        <i className="fa fa-plus fs-4 py-auto"></i>
                                    </button>
                                </div>
                                <div className="col-1 d-block d-lg-none">
                                    <Link className="fa fa-qrcode" to='/qr-scanner' style={{fontSize: '34px', textDecoration: 'none', color: '#000', right: 5}} />
                                </div>
                            </div>

                            <div className="card-lable py-1 mb-2" style={{backgroundColor:'#014C90'}}>
                                <label className="fw-medium" style={{fontSize:'12px', color:'white'}}>Alamat/Lokasi Mesin</label>
                            </div>
                            <div className={`form-supplies w-100 d-block md-4 ${ errorAddressOrMachineLocation !== '' ? 'border-danger border' : '' }`} style={{border:'1px solid #797979', height:'53px    '}} onChange={handleSearchInputChange}>
                                <strong className="small"> {selectedEquipment?.Penerima} {selectedEquipment !== null ? '-' : ''} {selectedEquipment?.Nama_Alamat} </strong><br/>
                                <strong className="small d-flex mt-0"> {selectedEquipment?.Alamat} {selectedEquipment !== null ? '-' : ''} {selectedEquipment?.Kota} </strong>
                            </div>
                            <span className={`text-danger small py-1 p-0 ${ errorAddressOrMachineLocation !== '' ? '' : 'd-none' }`} style={{fontSize:'12px'}} >{ errorAddressOrMachineLocation }</span>

                            <div className="card-lable py-1 mt-4 mb-2" style={{backgroundColor:'#014C90'}}>
                                <label className="fw-medium" style={{fontSize:'12px', color:'white'}}>Consumable (Please Select)</label>
                            </div>
                            <div className="mb-3 px-0" style={{color:'red'}}>
                                <p className="text-help" style={{fontSize:'14px'}}>Apabila pilihan yang dibutuhkan tidak ada pada pilihan di bawah ini, silahkan melakukan service request melalui menu Breakfix atau  
                                <a className="fw-bold fs-6 text-help" style={{color:'red'}} onClick={handleBreakfix}> Klik disini</a>
                                </p>
                            </div>
                            {
                                masterCheckbox.map((value, key) => {
                                    if(key >= 8) {
                                        return (
                                            <div className="col-6" key={key}>
                                                <div className="col-md-9 col-11 d-flex align-items-center input-check">
                                                    <div className="d-flex align-items-center w-100" style={{opacity: isCheckBoxDisabled ? '.7' : '1'}}>
                                                        <div className="form-check d-flex align-items-center">
                                                            <input type="checkbox" style={{borderRadius: 0, padding:'1px', background: isCheckBoxDisabled ? '#ccc' : ''}} className="me-2 form-check-input" id={value.Description} onChange={handleCheckboxRequestValue} data-id={value.Request_TypeId} disabled={isCheckBoxDisabled}></input>
                                                            <label style={{fontSize:'14px',}} htmlFor={value.Description}>{value.Description}</label>
                                                        </div>
                                                    </div>
                                                    <div className="ms-2" style={{backgroundColor: value.color ?? 'transparent', display: 'inline-block', width: '40px', height: '25px'}}></div>
                                                    <input type="number" className="input-consumable custom-input-number ms-3 py-md-2 py-1 my-2" onKeyDown={(e) => {if(e.currentTarget.value.length > 0 && e.keyCode != 8) e.preventDefault()}} data-target={value.Request_TypeId} data-id={`input-consumable-${value.Request_TypeId}`} style={{width:'20%'}} onClick={handleConsumableInput} disabled={isCheckBoxDisabled}></input>
                                                </div>
                                            </div>
                                        )
                                    }
                                    if(key < 4) {
                                        var customKey = key+4
                                        return (
                                            <>
                                                <div className="col-6" key={key}>
                                                    <div className="col-md-9 col-11 d-flex align-items-center input-check">
                                                        <div className="d-flex align-items-center w-100" style={{opacity: isCheckBoxDisabled ? '.7' : '1'}}>
                                                            <div className="form-check d-flex align-items-center">
                                                                <input type="checkbox" style={{borderRadius: 0, padding:'1px', background: isCheckBoxDisabled ? '#ccc' : ''}} className="me-2 form-check-input" id={value.Description} onChange={handleCheckboxRequestValue} data-id={value.Request_TypeId} disabled={isCheckBoxDisabled}></input>
                                                                <label style={{fontSize:'14px',}} htmlFor={value.Description}>{value.Description}</label>
                                                            </div>
                                                        </div>
                                                        <div className="ms-2" style={{backgroundColor: value.color ?? 'transparent', display: 'inline-block', width: '40px', height: '25px'}}></div>
                                                        <input type="number" className="input-consumable custom-input-number ms-3 py-md-2 py-1 my-2" onKeyDown={(e) => {if(e.currentTarget.value.length > 0 && e.keyCode != 8) e.preventDefault()}} data-target={value.Request_TypeId} data-id={`input-consumable-${value.Request_TypeId}`} style={{width:'20%'}} onClick={handleConsumableInput} disabled={isCheckBoxDisabled}></input>
                                                    </div>
                                                </div>
                                                <div className="col-6" key={key}>
                                                    <div className="col-md-9 col-11 d-flex align-items-center input-check">
                                                        <div className="d-flex align-items-center w-100" style={{opacity: isCheckBoxDisabled ? '.7' : '1'}}>
                                                            <div className="form-check d-flex align-items-center">
                                                                <input type="checkbox" style={{borderRadius: 0, padding:'1px', background: isCheckBoxDisabled ? '#ccc' : ''}} className="me-2 form-check-input" id={masterCheckbox[customKey].Description} onChange={handleCheckboxRequestValue} data-id={masterCheckbox[customKey].Request_TypeId} disabled={isCheckBoxDisabled}></input>
                                                                <label style={{fontSize:'14px',}} htmlFor={masterCheckbox[customKey].Description}>{masterCheckbox[customKey].Description}</label>
                                                            </div>
                                                        </div>
                                                        <div className="ms-2" style={{backgroundColor: masterCheckbox[customKey].color ?? 'transparent', display: 'inline-block', width: '40px', height: '25px'}}></div>
                                                        <input type="number" className="input-consumable custom-input-number ms-3 py-md-2 py-1 my-2" onKeyDown={(e) => {if(e.currentTarget.value.length > 0 && e.keyCode != 8) e.preventDefault()}} data-target={masterCheckbox[customKey].Request_TypeId} data-id={`input-consumable-${masterCheckbox[customKey].Request_TypeId}`} style={{width:'20%'}} onClick={handleConsumableInput} disabled={isCheckBoxDisabled}></input>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    }
                                })
                            }
                            <div className="card-lable py-1 mb-2 mt-4" style={{backgroundColor:'#014C90'}}>
                                <label className="fw-medium" style={{fontSize:'12px', color:'white'}}>Total Meter Information / Total Impressions</label>
                            </div>
                            <div className="mb-4 p-0">
                                <input type="text" style={{paddingLeft:'10px', border:'1px solid #797979'}} className={ `input-page py-2 w-100 ${ errorTotal !== '' ? 'border-danger border' : '' }` } onChange={validationTotal} value={total} />
                                <span className={`text-danger small px-0 ${ errorTotal !== '' ? '' : 'd-none' }`} style={{fontSize:'12px'}} >{ errorTotal }</span>
                            </div>

                            <div className="col-md-6 col-sm-12 mb-4 p-0">
                                <div className="card-lable py-1 px-2 mb-2" style={{backgroundColor:'#014C90', width:'99%'}}>
                                    <label className="fw-medium" style={{fontSize:'12px', color:'white'}}>Photo Meter</label>
                                </div>
                                <p className="text-decoration-underline fw-medium fst-italic text-center mt-3" style={{fontSize:'14px', color:'pink'}}>Please upload photo meter information on machine</p>
                                <input type="file" className="d-none" id="input-file-meter" onChange={(e) => previewImage(e, 'meter')} accept="image/*" />
                                <label className="file-icon mb-3 d-block text-center d-md-block d-none" htmlFor="input-file-meter">
                                    <div className="rounded-circle p-2 mx-auto" style={{backgroundColor:'#014C90', color:'#fff', width:'50px', height:'50px'}}>
                                        <img className="mt-1" src="images/upload.png" style={{width:'22px'}}></img>
                                    </div>
                                </label>
                                <label className="file-icon mb-3 d-block text-center d-md-none d-block" onClick={handleOpenOptionAlert}>
                                    <div className="rounded-circle p-2 mx-auto" style={{backgroundColor:'#014C90', color:'#fff', width:'50px', height:'50px'}}>
                                        <i className="fa fa-camera fs-2 my-1"></i>
                                    </div>
                                </label>
                                <div className="d-none col-md-6 col-sm-8 mx-auto my-5 text-center" id="display-image-meter">
                                    <img className="w-100" src="#" alt="" id="preview-image-meter" />
                                </div>
                            </div>

                            <div className="col-md-6 col-sm-12 mb-4 p-0">
                                <div className="card-lable py-1 px-2 mb-2 d-md-block d-none" style={{backgroundColor:'#014C90'}}>
                                    <label className="fw-medium" style={{fontSize:'12px', color:'white'}}>Photo Status Consumable</label>
                                </div>
                                <p className="text-decoration-underline fw-medium fst-italic text-center mt-3" style={{fontSize:'14px', color:'pink'}}>Please upload photo status consumable on machine</p>
                                <input type="file" className="d-none" id="input-file-status" onChange={(e) => previewImage(e, 'status')} accept="image/*" />
                                <label className="file-icon mb-3 d-block text-center d-md-block d-none" htmlFor="input-file-status">
                                    <div className="text-center rounded-circle p-2 mx-auto" style={{backgroundColor:'#014C90', color:'#fff', width:'50px', height:'50px'}}>
                                        <img className="mt-1" src="images/upload.png" style={{width:'22px'}}></img>
                                    </div>
                                </label>
                                <label className="file-icon mb-3 d-block text-center d-md-none d-block" onClick={handleOpenOptionAlert}>
                                    <div className="text-center rounded-circle p-2 mx-auto" style={{backgroundColor:'#014C90', color:'#fff', width:'50px', height:'50px'}}>
                                        <i className="fa fa-camera fs-2 my-1"></i>
                                    </div>
                                </label>
                                <div className="d-none col-md-6 col-sm-8 mx-auto my-5 text-center" id="display-image-status">
                                    <img className="w-100" src="#" alt="" id="preview-image-status" />
                                </div>
                            </div>

                            <div className="col-md-12 text-center d-flex justify-content-center">
                                <button className="btn btn-login py-2 px-5" style={{fontSize:'14px', maxWidth:'200px'}}>Submit</button>
                            </div>
                            
                        </div>
                    </form>
                    <LoadingAlert visible={loading} customClass="col-md-2 col-8" />
                    <ConfirmAlert visible={showPopup} titleMessage={alertOption.title} message={alertOption.message} customClass="col-md-3 col-sm-8 col-8" onClick={handlePopup} />
                    <OptionAlert visible={showOptionAlert} message="Ambil foto dari" customClass="col-sm-3" onClick={handleCloseOptionAlert}/>
                </div>
            </div>
        </div>
        </>
    )
}

export default Supplies

