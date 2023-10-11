import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ConfirmAlert from "../../component/alert/confirmAlert";
import { getDaftarEq, getMasterRequest } from "../../services/API"
import { redirect } from "react-router-dom";

function Breakfix () {
    const [showPopup, setShowPopup] = useState(false)
    const [alertOption, setAlertOption] = useState({title: '', message: ''})
    const [showAddedPopup, setShowAddedPopup] = useState(false)
    const [checkBoxCheckCount, setCheckBoxCheckCount] = useState(0)
    const [checkBoxCheckCountPage, setCheckBoxCheckCountPage] = useState(0)
    const [equipment, setEquipment] = useState('')
    const [machineLocation, setMachineLocation] = useState('')
    const [description, setDescription] = useState('')
    const [pageToWC, setPageToWC] = useState('')
    const [inputError, setInputError] = useState('')
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
    const { id } = useParams()
    const [equipmentList, setEquipmentList] = useState([
        {
            id: '1',
            noEQ: '71221',
            namaModel: 'CobaInsert',
            keterangan: 'CobaInsert'
        },
        {
            id: '2',
            noEQ: '300822',
            namaModel: 'model1',
            keterangan: 'tes aja',
        },
        {
            id: '3',
            noEQ: '798689',
            namaModel: 'ApeosPort C2060',
            keterangan: 'test',
        }
    ])

    
    useEffect(() => {
        return () => {
            daftarEq()
        }
    }, [])

    const daftarEq = async () => {
        const res = await getDaftarEq()
        if(res.status == 200) {
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

    const handleInputClick = () => {
        setShowDropdown(!showDropdown)
    }

    const handleDropdownItemClick = (item) => {
        setSelectedEquipment(item)
        setSearchText(item.equipment)
        setShowDropdown(false)
        setErrorMessageEquipmentNumber('')
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
        setShowAddedPopup(false)
        if(isFormValid) {
            window.location.href = "/dashboard"
        }
    }

    const submit = (e) => {
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
            setShowPopup(false)
            setShowAddedPopup(true)
        } else {
            setShowPopup(true)
            setShowAddedPopup(false)
        }
    }

    const validationEquipment = (e) => {
        e.preventDefault()
        const selectedEquipment = e.target.value
        setEquipment(selectedEquipment)

        if(equipment !== "") {
            setErrorMessageEquipmentNumber('');
        }
    }

    const validationMachineLocation  = (e) => {
        e.preventDefault()
        setMachineLocation(e.target.value)
        if(machineLocation !== "") {
            setErrorAddressOrMachineLocation('')
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
            setInputError('')
            setErrorInput('')
        } else {
            setCheckBoxCheckCount(0)
            setInputError('')
            setErrorInput('')
            document.getElementById('input-error').value = '';
            document.getElementById('input-error-responsive').value = '';
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
            const reader = new FileReader()
            reader.onload = (e) => {
                document.getElementById('preview-image').src = e.target.result
            }
            reader.readAsDataURL(file.files[0])
        }
        document.getElementById('display-image').classList.remove('d-none')
        document.getElementById('display-image').classList.add('d-block')
    }

    // const handleEquipmentSelect = (e) => {
    //     const selectedValue = e.target.value;
    // };
    
    return(
        <>
        <div className="py-md-3"> 
            <div className="responsive-bar" style={{alignItems:'baseline', height:'55px'}}>
                <h4 className="title-icare title-fitur m-0 p-0 fw-bold" style={{fontSize: '18px'}}>
                    <Link className="nav-link d-inline me-3" to={id === '0' ? '/supplies_request' : '/dashboard'} >
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
                                <label className="fw-medium" style= {{fontSize:'14px', color:'#fff'}}>Equipment Number</label>
                            </div>
                            <div className="d-flex p-0">
                                <div className="col-lg-11 col-9 mb-4">
                                        <input id="search-dropdown-breakfix" onKeyUp={filteredEquipmentList} className="form-control form-breakfix shadow-none small fw-bold rounded-0" style={{border:'1px solid #797979', height:'53px'}} type="text" value={searchText} onChange={handleSearchInputChange} onClick={handleInputClick}></input>
                                        <span className={`text-danger small mx-2 ${ errorMessageEquipmentNumber !== '' ? '' : 'd-none' }`} style={{fontSize:'12px'}} >{ errorMessageEquipmentNumber }</span>
                                        {showDropdown && (
                                            <div className="dropdown-breakfix" style={{position:'absolute', backgroundColor:'white', overflow:'hidden', width:'88%', top:'10%', zIndex:'1', overflowY:'auto', maxHeight:'300px', borderRight:'1px solid #ababab', borderLeft:'1px solid #ababab', borderTop:'1px solid #ababab'}}>
                                                {equipmentList.map((item, index) => (
                                                    <div key={index} className="dropdown-item-breakfix" onClick={() => handleDropdownItemClick(item)}>
                                                        <div>{item.equipment} - {item.eqmodelName}</div>
                                                        <div>{item.description}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                <div className="col-lg-1 col-2 text-center">
                                    <Link to="/form_eq/0">
                                        <button className="btn btn-login btn-plus" style={{height: '50px', width:'80px'}}>
                                            <i className="fa fa-plus fs-4 py-auto"></i>
                                        </button>
                                    </Link>
                                </div>
                                <div className="col-1 d-block d-lg-none">
                                    <Link className="fa fa-qrcode" style={{fontSize:'34px', textDecoration:'none', color:'#000', right:5}} />
                                </div>
                            </div>
                            <div className="card-lable py-1 mb-2" style={{backgroundColor:'#014C90'}}>
                                <label className="fw-medium" style={{fontSize:'14px', color:'#fff'}}>Alamat/Lokasi Mesin</label>
                            </div>
                            <div className="form-breakfix w-100 d-block mb-md-4 mb-3" style={{border:'1px solid #797979', height:'53px    '}} onChange={validationMachineLocation}>
                                <strong className="small"> {selectedEquipment?.Penerima} {selectedEquipment ? '-' : ''} {selectedEquipment?.Nama_Alamat} </strong><br/>
                                <strong className="small d-flex mt-0"> {selectedEquipment?.Alamat} {selectedEquipment ? '-' : ''} {selectedEquipment?.Kota} </strong>
                            </div>
                            <span className={`text-danger mx-2 small ${ errorAddressOrMachineLocation !== '' ? '' : 'd-none' }`} style={{fontSize:'12px'}} >{ errorAddressOrMachineLocation }</span>
                            <div className="card-lable py-1 mb-md-4 mb-2" style={{backgroundColor:'#014C90'}}>
                                <label className="fw-medium" style={{fontSize:'14px', color:'#fff'}}>Problem&#40;Please Select&#41;</label>
                            </div>
                            <div className="col-md-4 col-sm-6 col-6 input-check d-md-block d-none">
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
                                <div className="check-item d-flex align-items-center mb-4 form-check">
                                    <input type="checkbox" style={{borderRadius: 0, padding:'1px'}}  className="me-3 mt-0 form-check-input" id="LayarBerubahWarna"/>
                                    <label className="form-check-label" style={{fontSize:'14px'}} htmlFor="LayarBerubahWarna" >Layar Berubah warna</label>
                                </div>
                                <div className="check-item d-flex align-items-center mb-4">
                                    <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="problem-checkbox me-3 mt-0 form-check-input" id="ErrorCode" onChange={checkCheckBox} />
                                    <label className="form-check-label" style={{fontSize:'14px'}} htmlFor="ErrorCode" >Error Code</label>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-6 col-6 input-check d-md-block d-none">
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
                            <div className="col-md-4 col-sm-6 col-6 input-check d-md-block d-none">
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

                            

                            <div className="col-md-4 col-sm-6 col-6 input-check d-md-none d-block">
                                <div className="check-item d-flex align-items-center mb-4 form-check">
                                    <input type="checkbox" style={{ borderRadius: 0, padding:'1px' }} className="me-md-3 me-2 mt-0 form-check-input" id="PaperJam" /> 
                                    <label className="form-check-label" style={{fontSize:'14px'}} htmlFor="PaperJam">Paper Jam</label>
                                </div>
                                <div className="check-item d-flex align-items-center mb-4 form-check">
                                    <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="me-md-3 me-2 mt-0 form-check-input" id="HasilCetakTidakOptimal"/>
                                    <label className="form-check-label" style={{fontSize:'14px'}} htmlFor="HasilCetakTidakOptimal" >Hasil Cetak Tidak Optimal</label>
                                </div>
                                <div className="check-item d-flex align-items-center mb-4 form-check">
                                    <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="me-md-3 me-2 mt-0 form-check-input" id="HasilPudar"/>
                                    <label className="form-check-label" style={{fontSize:'14px'}} htmlFor="HasilPudar" >Hasil Pudar</label>
                                </div>
                                <div className="check-item d-flex align-items-center mb-4 form-check">
                                    <input type="checkbox" style={{borderRadius: 0, padding:'1px'}}  className="me-md-3 me-2 mt-0 form-check-input" id="HasilBergaris"/>
                                    <label className="form-check-label" style={{fontSize:'14px'}} htmlFor="HasilBergaris" >Hasil Bergaris</label>
                                </div>
                                <div className="check-item d-flex align-items-center mb-4 form-check">
                                    <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="me-md-3 me-2 mt-0 form-check-input" id="MesinBerisik"/>
                                    <label className="form-check-label" style={{fontSize:'14px'}} htmlFor="MesinBerisik" >Mesin Berisik</label>
                                </div>
                                <div className="check-item d-flex align-items-center mb-4 form-check">
                                    <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="me-md-3 me-2 mt-0 form-check-input" id="LayarBerubahWarna"/>
                                    <label className="form-check-label" style={{fontSize:'14px'}} htmlFor="LayarBerubahWarna" >Layar Berubah Warna</label>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-6 col-6 input-check d-md-none d-block">
                                <div className="check-item d-flex align-items-center mb-4 form-check">
                                    <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="me-md-3 me-2 mt-0 form-check-input" id="LayarBlank"/>
                                    <label className="form-check-label" style={{fontSize:'14px'}} htmlFor="LayarBlank" >Layar Blank</label>
                                </div>
                                <div className="check-item d-flex align-items-center mb-4 form-check">
                                    <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="me-md-3 me-2 mt-0 form-check-input" id="HasilKotor"/>
                                    <label className="form-check-label" style={{fontSize:'14px'}} htmlFor="HasilKotor" >Hasil Kotor</label>
                                </div>
                                <div className="check-item d-flex align-items-center mb-4 form-check">
                                    <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="me-md-3 me-2 mt-0 form-check-input" id="HasilBerbayang"/>
                                    <label className="form-check-label" style={{fontSize:'14px'}} htmlFor="HasilBerbayang" >Hasil Berbayang</label>
                                </div>
                                <div className="check-item d-flex align-items-center mb-4 form-check">
                                    <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="me-md-3 me-2 mt-0 form-check-input" id="HasilTidakMenempel"/>
                                    <label className="form-check-label" style={{fontSize:'14px'}} htmlFor="HasilTidakMenempel" >Hasil Tidak Menempel</label>
                                </div>
                                <div className="check-item d-flex align-items-center mb-4 form-check">
                                    <input type="checkbox" style={{borderRadius: 0, padding:'1px'}}  className="me-md-3 me-2 mt-0 form-check-input" id="TonerTidakDetect"/>
                                    <label className="form-check-label" style={{fontSize:'14px'}} htmlFor="TonerTidakDetect" >Toner Tidak Detect</label>
                                </div>
                                <div className="check-item d-flex align-items-center mb-4 form-check">
                                    <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="me-md-3 me-2 mt-0 form-check-input" id="ServerFFPS"/>
                                    <label className="form-check-label" style={{fontSize:'14px'}} htmlFor="ServerFFPS" >Server FFPS/Fiery/GX/ Revoria</label>
                                </div>
                            </div>
                            <div className="col-md-4 col-4 d-md-none d-block input-check">
                                <div className="check-item d-flex align-items-center mb-4">
                                    <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="problem-checkbox me-md-3 me-2 mt-0 form-check-input" id="ErrorCode" onChange={checkCheckBox} />
                                    <label className="form-check-label" style={{fontSize:'14px'}} htmlFor="ErrorCode" >Error Code</label>
                                </div>
                            </div>
                            <div className="col-md-4 col-6 mb-4 d-md-none d-block">
                                <input type="text" className="input-error py-0 ms-0" id="input-error-responsive" style={{paddingLeft:'10px', paddingRight:'10px', width:'100px'}} disabled={checkBoxCheckCount == 0}/>
                            </div>
                            <div className="col-md-4 col-6 mb-4 d-md-block d-none">
                                <input type="text" className="input-error py-2 w-100" id="input-error" style={{paddingLeft:'10px', paddingRight:'10px'}} disabled={checkBoxCheckCount == 0}/>
                            </div>
                            <div className="card-lable py-1 mb-2" style={{backgroundColor:'#014C90'}}>
                                <label className="fw-medium" style={{fontSize:'14px', color:'#fff'}}>Tambah Deskripsi</label>
                            </div>
                            <div className="mb-4 p-0">
                                <input type="text" className={ `input-page py-md-3 py-1 w-100 ${ errorDescription !== '' ? 'border-danger border' : '' }` } style={{paddingLeft:'10px', paddingRight:'10px', border:'1px solid #797979'}} onChange={validationDescription} />
                                <span className={`text-danger small mx-2 ${ errorDescription !== '' ? '' : 'd-none' }`} style={{fontSize:'12px'}} >{ errorDescription }</span>
                            </div>
                            <div className="card-lable py-1 mb-2" style={{backgroundColor:'#014C90'}}>
                                <label className="fw-medium" style={{fontSize:'14px', color:'#fff'}}>Page</label>
                            </div>
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
                            <div className="text-center">
                                <p className="text-decoration-underline fw-medium fst-italic text-center mt-3" style={{fontSize:'14px', color:'pink'}}>Please upload photo meter information/photo machine</p>
                                <input type="file" className="d-none" id="input-file" onChange={previewImage} accept="image/*" />
                                <label className="file-icon mb-3 d-block" htmlFor="input-file">
                                    <div className="text-center rounded-circle p-2 mx-auto" style={{backgroundColor:'#014C90', color:'#fff', width:'50px', height:'50px'}}>
                                        <div className="d-md-block d-none">
                                            <img className="mt-1" src="images/upload.png" style={{width:'22px'}}></img>
                                        </div>
                                        <div className="d-md-none d-block">
                                            <i className="fa fa-camera fs-2 my-1" /> 
                                        </div>
                                    </div>
                                </label>
                                <div className="d-none col-md-6 col-sm-8 mx-auto my-5" id="display-image">
                                    <img className="w-50" src="#" alt="" id="preview-image" />
                                </div>
                                <button className="btn btn-login py-2 px-5" style={{fontSize:'14px'}}>Submit</button>
                            </div>
                        </div>
                    </form>
                    <ConfirmAlert visible={showPopup} message="Mohon isi field yang kosong dengan foto meter. Untuk field problem isi min.1" customClass="col-md-5 col-sm-8 col-10" onClick={handlePopup} />
                    <ConfirmAlert visible={showAddedPopup} message="Berhasil melakukan permintaan breakfix" customClass="col-sm-3" onClick={handlePopup}/>
                </div>
            </div>
        </div>
        </>
    )
}

export default Breakfix


// export default class extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             equipmentList: [
//                 {
//                     id: '1',
//                     noEQ: '71221',
//                     namaModel: 'CobaInsert',
//                     keterangan: 'CobaInsert'
//                     // option: [
//                     //     { value: 'noEQ', label: '71221', },
//                     //     { value: 'namaModel', label: 'CobaInsert' },
//                     //     { value: 'keterangan', label: 'CobaInsert' },
//                     // ],
//                 },
//                 {
//                     id: '2',
//                     noEQ: '300822',
//                     namaModel: 'model1',
//                     keterangan: 'tes aja',
//                     // option: [
//                     //     { value: 'noEQ', label: '300822' },
//                     //     { value: 'namaModel', label: 'model1' },
//                     //     { value: 'keterangan', label: 'tes aja' },
//                     // ]
//                 },
//                 {
//                     id: '3',
//                     noEQ: '798689',
//                     namaModel: 'ApeosPort C2060',
//                     keterangan: 'test',
//                     // option: [
//                     //     { value: 'noEQ', label: '798689' },
//                     //     { value: 'namaModel', label: 'ApeosPort C2060' },
//                     //     { value: 'keterangan', label: 'test' },
//                     // ]
//                 }
//             ],
//             checkBoxCheckCount:0,
//             checkBoxCheckCountPage:0,
//             equipment:'',
//             machineLocation:'',
//             description:'',
//             pageToWC:'',
//             inputError: '',
//             errorDescription: '',
//             errorPageToWC: '',
//             errorMessageEquipmentNumber: '',
//             errorAddressOrMachineLocation: '',
//             errorInput:'',
//             showPopup: false,
//             showAddedPopup: false,
//             selectedEquipment: null,
//             id:props.router.params.id
//         }
//         this.checkCheckBox = this.checkCheckBox.bind(this)
//         this.checkCheckBoxPage = this.checkCheckBoxPage.bind(this)
//         this.submit = this.submit.bind(this)
//         this.validationEquipment = this.validationEquipment.bind(this)
//         this.validationMachineLocation = this.validationMachineLocation.bind(this)
//         this.validationDescription = this.validationDescription.bind(this)
//         this.validationPageToWC = this.validationPageToWC.bind(this)
//         this.handlePopup = this.handlePopup.bind(this)
//         getMasterRequest().then(response => {
//             console.log(response)    
//         })
        
//     }

//     handlePopup() {
//         this.setState({showPopup:false, showAddedPopup: false})
//         if(this.state.isFormValid) {
//             window.location.href = "/#/dashboard"
//         }
//     }

//     submit(e) {
//         e.preventDefault()
//         var checkboxPage = document.querySelectorAll('.page-checkbox:checked')

//         let isValid = true;

//         if(this.state.equipment === "") {
//             this.setState({errorMessageEquipmentNumber:'Silahkan isi equipment number'})
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


//         // this.setState({
//         //     errorMessageEquipmentNumber: 'Silahkan isi equipment number',
//         //     errorAddressOrMachineLocation: 'Silahkan isi alamat/lokasi mesin',
//         //     errorDescription: 'Silahkan isi deskripsi',
//         //     errorPageToWC: checkboxPage.length > 0 ? 'Silahakn isi page' : ''
//         // })


//         // Swal.fire({
//         //     text:'Mohon isi field yang kosong dan upload foto meter. Untuk field problem isi min.1',
//         //     confirmButtonColor:'#0099ff'
//         // })
//     }

//     // validationEquipment(e) {
//     //     const selectedEquipment = e.target.value;
//     //     this.setState({selectedEquipment});
//     //     if(selectedEquipment !== '') {
//     //         this.setState({errorMessageEquipmentNumber: ''});
//     //     }
//     // }

//     validationEquipment(e) {
//         e.preventDefault()
//         const selectedEquipment = e.target.value;
//         this.setState({equipment: selectedEquipment})

//         if(this.state.equipment !== "") {
//             this.setState({errorMessageEquipmentNumber:''})
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
//     //     if(e.target.value !== "") {
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
//         var checkbox = document.querySelectorAll('.problem-checkbox:checked');
//         // this.setState({checkBoxCheckCount:checkbox.length});

//         if(checkbox.length > 0) {
//             this.setState({
//                 checkBoxCheckCount: checkbox.length,
//                 inputError: "",
//                 errorInput:"",
//             })
//         } else {
//             this.setState({
//                 checkBoxCheckCount: 0,
//                 inputError: "",
//                 errorInput: ""
//             })
//             document.getElementById('input-error').value = "";
//         }
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

//     handleEquipmentSelect = (e) => {
//         const selectedValue = e.target.value;
//         // const selectedEquipmentId = e.target.value;
//         // const selectedEquipment = this.state.equipmentList.find(
//         //   (equipment) => equipment.id === parseInt(selectedEquipmentId)
//         // );
//         // this.setState({ selectedEquipment });
//       };            

//     // componentDidMount() {
//     //     getMasterRequest()
//     //     .then(response => {
//     //         const equipmentList = response.data.equipmentList;
//     //         this.setState({equipmentList});
//     //     })
//     //     .catch(error => {
//     //         console.error('Error fetching equipment data:', error);
//     //     })
//     // }

//     render() {
//         return(
//             <>
//             <div className="py-md-3 py-2"> 
//                 <div className="responsive-bar" style={{alignItems:'baseline', height:'55px'}}>
//                     <h4 className="title-icare title-fitur m-0 p-0 fw-bold" style={{fontSize: '18px'}}>
//                         <Link className="nav-link d-inline me-3" to={this.state.id === '0' ? '/supplies_request' : '/dashboard'}>
//                             <i className="fa fa-arrow-left color-arrow-left" style={{color:'#014C90'}}></i>
//                         </Link>
//                             <span style={{borderBottom:'3px solid #014C90'}}>Breakfix Request</span>
//                     </h4>
//                     {/* <Link className="list-items" to={this.state.id === '0' ? '/supplies_request' : '/dashboard'}>
//                         <i className="fa fa-arrow-left me-3" style={{fontSize:'16px', color:'#014C90'}}></i>
//                         <span className="title-icare title-fitur fw-bold py-1" style={{borderBottom:'3px solid #014C90', fontSize:'18px'}}>Breakfix Request</span>
//                     </Link> */}
//                 </div>
//                 <div className="responsive-breakfix card px-md-4 px-1 shadow">
//                     <div className="card-body">
//                         <form onSubmit={this.submit}>
//                             <div className="row">
//                                 <div className="card-lable py-1 mb-2" style={{backgroundColor:'#014C90'}}>
//                                     <label className="fw-medium" style= {{fontSize:'14px', color:'#fff'}}>Equipment Number</label>
//                                 </div>
//                                 <div className="d-flex p-0">
//                                     <div className="col-lg-11 col-9">
//                                         {/* <div className="py-md-4 py-3 w-100 d-block mb-md-4 mb-3" style={{border:'1px solid #797979'}} onChange={this.validationEquipment} ></div> */}
//                                         <select className="input-page select-option w-100 d-block mb-md-4 mb-3" style={{height:'50px', border:'1px solid #797979', paddingLeft:'10px'}} onChange={this.validationEquipment} >
//                                             <option></option>
//                                             {this.state.equipmentList.map((group) => (
//                                                 <optgroup key={group.id}>
//                                                     <option style={{fontSize:'14px'}}>{group.noEQ} | {group.namaModel} | {group.keterangan}</option>
//                                                     {/* {group.option.map((options) =>
//                                                         <option value={options.value} key={options.value}>
//                                                             {options.label}
//                                                         </option>
//                                                     )}      */}
//                                                     <hr style={{border: '3px solid black' }} />
//                                                 </optgroup>
//                                             ))}
//                                         </select>
//                                         <span className={`text-danger small mx-2 ${ this.state.errorMessageEquipmentNumber !== '' ? '' : 'd-none' }`} style={{fontSize:'12px'}} >{ this.state.errorMessageEquipmentNumber }</span>
//                                     </div>
//                                     <div className="col-lg-1 col-2 text-center">
//                                         <Link to="/form_eq/0">
//                                             <button className="btn btn-login btn-plus" style={{height: '50px', width:'80px'}}>
//                                                 <i className="fa fa-plus fs-4 py-auto"></i>
//                                             </button>
//                                         </Link>
//                                     </div>
//                                     <div className="col-1 d-block d-lg-none">
//                                         <Link className="fa fa-qrcode" style={{fontSize:'34px', textDecoration:'none', color:'#000', right:5}} />
//                                     </div>
//                                 </div>

//                                 <div className="card-lable py-1 mb-2" style={{backgroundColor:'#014C90'}}>
//                                     <label className="fw-medium" style={{fontSize:'14px', color:'#fff'}}>Alamat/Lokasi Mesin</label>
//                                 </div>
//                                 <Link className="py-md-4 py-3 w-100 d-block mb-md-4 mb-3" style={{border:'1px solid #797979'}} onChange={this.validationMachineLocation} to="" ></Link>
//                                 <span className={`text-danger mx-2 small ${ this.state.errorAddressOrMachineLocation !== '' ? '' : 'd-none' }`} style={{fontSize:'12px'}} >{ this.state.errorAddressOrMachineLocation }</span>
//                                 <div className="card-lable py-1 mb-md-4 mb-2" style={{backgroundColor:'#014C90'}}>
//                                     <label className="fw-medium" style={{fontSize:'14px', color:'#fff'}}>Problem&#40;Please Select&#41;</label>
//                                 </div>
//                                 <div className="col-md-4 col-sm-6 col-6 input-check d-md-block d-none">
//                                     <div className="check-item d-flex align-items-center mb-4 form-check">
//                                         <input type="checkbox" style={{ borderRadius: 0, padding:'1px' }} className="me-3 mt-0 form-check-input" id="PaperJam" /> 
//                                         <label className="form-check-label" style={{fontSize:'14px'}} htmlFor="PaperJam">Paper Jam</label>
//                                     </div>
//                                     <div className="check-item d-flex align-items-center mb-4 form-check">
//                                         <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="me-3 mt-0 form-check-input" id="HasilKotor"/>
//                                         <label className="form-check-label" style={{fontSize:'14px'}} htmlFor="HasilKotor" >Hasil Kotor</label>
//                                     </div>
//                                     <div className="check-item d-flex align-items-center mb-4 form-check">
//                                         <input type="checkbox" style={{borderRadius: 0, padding:'1px'}}  className="me-3 mt-0 form-check-input" id="HasilBergaris"/>
//                                         <label className="form-check-label" style={{fontSize:'14px'}} htmlFor="HasilBergaris" >Hasil Bergaris</label>
//                                     </div>
//                                     <div className="check-item d-flex align-items-center mb-4 form-check">
//                                         <input type="checkbox" style={{borderRadius: 0, padding:'1px'}}  className="me-3 mt-0 form-check-input" id="TonerTidakDetect"/>
//                                         <label className="form-check-label" style={{fontSize:'14px'}} htmlFor="TonerTidakDetect" >Toner Tidak Detect</label>
//                                     </div>
//                                     <div className="check-item d-flex align-items-center mb-4">
//                                         <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="problem-checkbox me-3 mt-0 form-check-input" id="ErrorCode" onChange={this.checkCheckBox} />
//                                         <label className="form-check-label" style={{fontSize:'14px'}} htmlFor="ErrorCode" >Error Code</label>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-4 col-sm-6 col-6 input-check d-md-block d-none">
//                                     <div className="check-item d-flex align-items-center mb-4 form-check">
//                                         <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="me-3 mt-0 form-check-input" id="LayarBlank"/>
//                                         <label className="form-check-label" style={{fontSize:'14px'}} htmlFor="LayarBlank" >Layar Blank</label>
//                                     </div>
//                                     <div className="check-item d-flex align-items-center mb-4 form-check">
//                                         <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="me-3 mt-0 form-check-input" id="HasilPudar"/>
//                                         <label className="form-check-label" style={{fontSize:'14px'}} htmlFor="HasilPudar" >Hasil Pudar</label>
//                                     </div>
//                                     <div className="check-item d-flex align-items-center mb-4 form-check">
//                                         <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="me-3 mt-0 form-check-input" id="HasilTidakMenempel"/>
//                                         <label className="form-check-label" style={{fontSize:'14px'}} htmlFor="HasilTidakMenempel" >Hasil Tidak Menempel</label>
//                                     </div>
//                                     <div className="check-item d-flex align-items-center mb-4 form-check">
//                                         <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="me-3 mt-0 form-check-input" id="ServerFFPS"/>
//                                         <label className="form-check-label" style={{fontSize:'14px'}} htmlFor="ServerFFPS" >Server FFPS/Fiery/GX/Revoria</label>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-4 col-sm-6 col-6 input-check d-md-block d-none">
//                                     <div className="check-item d-flex align-items-center mb-4 form-check">
//                                         <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="me-3 mt-0 form-check-input" id="HasilCetakTidakOptimal"/>
//                                         <label className="form-check-label" style={{fontSize:'14px'}} htmlFor="HasilCetakTidakOptimal" >Hasil Cetak Tidak Optimal</label>
//                                     </div>
//                                     <div className="check-item d-flex align-items-center mb-4 form-check">
//                                         <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="me-3 mt-0 form-check-input" id="HasilBerbayang"/>
//                                         <label className="form-check-label" style={{fontSize:'14px'}} htmlFor="HasilBerbayang" >Hasil Berbayang</label>
//                                     </div>
//                                     <div className="check-item d-flex align-items-center mb-4 form-check">
//                                         <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="me-3 mt-0 form-check-input" id="MesinBerisik"/>
//                                         <label className="form-check-label" style={{fontSize:'14px'}} htmlFor="MesinBerisik" >Mesin Berisik</label>
//                                     </div>
//                                 </div>

                                

//                                 <div className="col-md-4 col-sm-6 col-6 input-check d-md-none d-block">
//                                     <div className="check-item d-flex align-items-center mb-4 form-check">
//                                         <input type="checkbox" style={{ borderRadius: 0, padding:'1px' }} className="me-md-3 me-2 mt-0 form-check-input" id="PaperJam" /> 
//                                         <label className="form-check-label" style={{fontSize:'14px'}} htmlFor="PaperJam">Paper Jam</label>
//                                     </div>
//                                     <div className="check-item d-flex align-items-center mb-4 form-check">
//                                         <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="me-md-3 me-2 mt-0 form-check-input" id="HasilCetakTidakOptimal"/>
//                                         <label className="form-check-label" style={{fontSize:'14px'}} htmlFor="HasilCetakTidakOptimal" >Hasil Cetak Tidak Optimal</label>
//                                     </div>
//                                     <div className="check-item d-flex align-items-center mb-4 form-check">
//                                         <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="me-md-3 me-2 mt-0 form-check-input" id="HasilPudar"/>
//                                         <label className="form-check-label" style={{fontSize:'14px'}} htmlFor="HasilPudar" >Hasil Pudar</label>
//                                     </div>
//                                     <div className="check-item d-flex align-items-center mb-4 form-check">
//                                         <input type="checkbox" style={{borderRadius: 0, padding:'1px'}}  className="me-md-3 me-2 mt-0 form-check-input" id="HasilBergaris"/>
//                                         <label className="form-check-label" style={{fontSize:'14px'}} htmlFor="HasilBergaris" >Hasil Bergaris</label>
//                                     </div>
//                                     <div className="check-item d-flex align-items-center mb-4 form-check">
//                                         <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="me-md-3 me-2 mt-0 form-check-input" id="MesinBerisik"/>
//                                         <label className="form-check-label" style={{fontSize:'14px'}} htmlFor="MesinBerisik" >Mesin Berisik</label>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-4 col-sm-6 col-6 input-check d-md-none d-block">
//                                     <div className="check-item d-flex align-items-center mb-4 form-check">
//                                         <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="me-md-3 me-2 mt-0 form-check-input" id="LayarBlank"/>
//                                         <label className="form-check-label" style={{fontSize:'14px'}} htmlFor="LayarBlank" >Layar Blank</label>
//                                     </div>
//                                     <div className="check-item d-flex align-items-center mb-4 form-check">
//                                         <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="me-md-3 me-2 mt-0 form-check-input" id="HasilKotor"/>
//                                         <label className="form-check-label" style={{fontSize:'14px'}} htmlFor="HasilKotor" >Hasil Kotor</label>
//                                     </div>
//                                     <div className="check-item d-flex align-items-center mb-4 form-check">
//                                         <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="me-md-3 me-2 mt-0 form-check-input" id="HasilBerbayang"/>
//                                         <label className="form-check-label" style={{fontSize:'14px'}} htmlFor="HasilBerbayang" >Hasil Berbayang</label>
//                                     </div>
//                                     <div className="check-item d-flex align-items-center mb-4 form-check">
//                                         <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="me-md-3 me-2 mt-0 form-check-input" id="HasilTidakMenempel"/>
//                                         <label className="form-check-label" style={{fontSize:'14px'}} htmlFor="HasilTidakMenempel" >Hasil Tidak Menempel</label>
//                                     </div>
//                                     <div className="check-item d-flex align-items-center mb-4 form-check">
//                                         <input type="checkbox" style={{borderRadius: 0, padding:'1px'}}  className="me-md-3 me-2 mt-0 form-check-input" id="TonerTidakDetect"/>
//                                         <label className="form-check-label" style={{fontSize:'14px'}} htmlFor="TonerTidakDetect" >Toner Tidak Detect</label>
//                                     </div>
//                                 </div>
//                                 <div className="col-12 input-check">
//                                     <div className="check-item d-flex align-items-center mb-4 form-check">
//                                         <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="me-md-3 me-2 mt-0 form-check-input" id="ServerFFPS"/>
//                                         <label className="form-check-label" style={{fontSize:'14px'}} htmlFor="ServerFFPS" >Server FFPS/Fiery/GX/Revoria</label>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-4 col-4 d-md-none d-block input-check">
//                                     <div className="check-item d-flex align-items-center mb-4">
//                                         <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="problem-checkbox me-md-3 me-2 mt-0 form-check-input" id="ErrorCode" onChange={this.checkCheckBox} />
//                                         <label className="form-check-label" style={{fontSize:'14px'}} htmlFor="ErrorCode" >Error Code</label>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-4 col-6 mb-4 d-md-none d-block">
//                                     <input type="text" className="input-error py-0 ms-0" id="input-error" style={{paddingLeft:'10px', paddingRight:'10px', width:'100px'}} disabled={this.state.checkBoxCheckCount == 0}/>
//                                 </div>
//                                 <div className="col-md-4 col-6 mb-4 d-md-block d-none">
//                                     <input type="text" className="input-error py-2 w-100" id="input-error" style={{paddingLeft:'10px', paddingRight:'10px'}} disabled={this.state.checkBoxCheckCount == 0}/>
//                                 </div>
//                                 <div className="card-lable py-1 mb-2" style={{backgroundColor:'#014C90'}}>
//                                     <label className="fw-medium" style={{fontSize:'14px', color:'#fff'}}>Tambah Deskripsi</label>
//                                 </div>
//                                 <div className="mb-4 p-0">
//                                     <input type="text" className={ `input-page py-md-3 py-1 w-100 ${ this.state.errorDescription !== '' ? 'border-danger border' : '' }` } style={{paddingLeft:'10px', paddingRight:'10px'}} onChange={this.validationDescription} />
//                                     <span className={`text-danger small mx-2 ${ this.state.errorDescription !== '' ? '' : 'd-none' }`} style={{fontSize:'12px'}} >{ this.state.errorDescription }</span>
//                                 </div>
//                                 <div className="card-lable py-1 mb-2" style={{backgroundColor:'#014C90'}}>
//                                     <label className="fw-medium" style={{fontSize:'14px', color:'#fff'}}>Page</label>
//                                 </div>
//                                 <div className="d-flex py-2 mb-md-5 mb-2 input-check">
//                                     <div className="form-check py-2">
//                                         <input type="checkbox" style={{ borderRadius: 0, padding: '1px' }} className="form-check-input page-checkbox" id="pageToWC" onChange={ this.checkCheckBoxPage } />
//                                         <label htmlFor="pageToWC" className="form-check-label">Page to WC</label>
//                                     </div>
//                                     <div className="ms-2 d-flex flex-column" style={{ width: '110px' }}>
//                                         <input type="text" className={`ms-2 py-2 input-page w-100 ${ this.state.errorPageToWC !== '' ? 'border-danger border' : '' }`} style={{paddingLeft:'10px', paddingRight:'10px'}} onChange={this.validationPageToWC} disabled={this.state.checkBoxCheckCountPage == 0} value={this.state.pageToWC}  />
//                                         <span className={ `text-danger px-2  ${ this.state.errorPageToWC !== '' ? '' : 'd-none' }` } style={{fontSize:'12px'}} >{ this.state.errorPageToWC }</span>
//                                     </div>
//                                 </div>
//                                 <div className="text-center">
//                                     <p className="text-decoration-underline fw-medium fst-italic text-center mt-3" style={{fontSize:'14px', color:'pink'}}>Please upload photo meter information/photo machine</p>
//                                     <input type="file" className="d-none" id="input-file" onChange={this.previewImage} accept="image/*" />
//                                     <label className="file-icon mb-3 d-block" htmlFor="input-file">
//                                         <div className="text-center rounded-circle p-2 mx-auto" style={{backgroundColor:'#014C90', color:'#fff', width:'50px', height:'50px'}}>
//                                             <div className="d-md-block d-none">
//                                                 <img className="mt-1" src="images/upload.png" style={{width:'22px'}}></img>
//                                             </div>
//                                             <div className="d-md-none d-block">
//                                                 <i className="fa fa-camera fs-2 my-1" /> 
//                                             </div>
//                                         </div>
//                                     </label>
//                                     <div className="d-none col-md-6 col-sm-8 mx-auto my-5" id="display-image">
//                                         <img className="w-50" src="#" alt="" id="preview-image" />
//                                     </div>
//                                     <button className="btn btn-login py-2 px-5" style={{fontSize:'14px'}}>Submit</button>
//                                 </div>
//                             </div>
//                         </form>
//                         <ConfirmAlert visible={this.state.showPopup} message="Mohon isi field yang kosong dengan foto meter. Untuk field problem isi min.1" customClass="col-md-5 col-sm-8 col-10" onClick={this.handlePopup} />
//                         <ConfirmAlert visible={this.state.showAddedPopup} message="Berhasil melakukan permintaan breakfix" customClass="col-sm-3" onClick={this.handlePopup}/>
//                     </div>
//                 </div>
//             </div>
//             </>
//         )
//     }
// }

