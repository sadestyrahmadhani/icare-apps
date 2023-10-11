import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ConfirmAlert from "../../component/alert/confirmAlert";
import { redirect } from "react-router-dom";

function Supplies() {
    const [checkBoxCheckCount, setCheckBoxCheckCount] = useState(0)
    const [showPopup, setShowPopup] = useState(false)
    const [alertOption, setAlertOption] = useState({title: '', message: ''})
    const [showAddedPopup, setShowAddedPopup] = useState(false)
    const [equipment, setEquipment] = useState('')
    const [machineLocation, setMachineLocation] = useState('')
    const [description, setDescription] = useState('')
    const [total, setTotal] = useState('')
    const [errorMessageEquipmentNumber, setErrorMessageEquipmentNumber] = useState('')
    const [errorAddressOrMachineLocation, setErrorAddressOrMachineLocation] = useState('')
    const [errorDescription, setErrorDescription] = useState('')
    const [errorTotal, setErrorTotal] = useState('')
    const [selectedEquipment, setSelectedEquipment] = useState(null)
    const [isFormValid, setIsFormValid] = useState(false)
    const [searchText, setSearchText] = useState('')
    const [showDropdown, setShowDropdown] = useState(false)
    const { id } = useParams()
    const [checkboxStatus, setCheckboxStatus] = useState({
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
    })
    const [checkboxValues, setCheckboxValues] =  useState({
        tonerBlack: checkboxStatus.tonerBlack ? '1' : '',
        tonerCyan: checkboxStatus.tonerCyan ? '1' : '',
        tonerMagenta: checkboxStatus.tonerMagenta ? '1' : '',
        tonerYellow: checkboxStatus.tonerYellow ? '1' : '',
        wasteBottle: checkboxStatus.wasteBottle ? '1' : '',
        cleaningCartridge: checkboxStatus.cleaningCartridge ? '1' : '',
        drumBlack: checkboxStatus.drumBlack ? '1' : '',
        drumCyan: checkboxStatus.drumCyan ? '1' : '',
        drumMagenta: checkboxStatus.drumMagenta ? '1' : '',
        drumYellow: checkboxStatus.drumYellow ? '1' : '',
        fuserWeb: checkboxStatus.fuserWeb ? '1' : '',
        corotron: checkboxStatus.corotron ? '1' : '',
    })
    const equipmentList = [
        {
            id: 1,
            noEQ: '71221',
            namaModel: 'CobaInsert',
            keterangan: 'CobaInsert'
        },
        {
            id: 2,
            noEQ: '300822',
            namaModel: 'model1',
            keterangan: 'tes aja'
        },
        {
            id: 3,
            noEQ: '798689',
            namaModel: 'ApeosPort C2060',
            keterangan: 'test'
        }
    ]

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
        setSearchText(item.noEQ)
        setShowDropdown(false)
        setErrorMessageEquipmentNumber('')
    }

    const filteredEquipmentList = equipmentList.filter((item) => {
        if(typeof searchText === "string") {
            return item.noEQ.toLowerCase().includes(searchText.toLowerCase())
        }
        return false
    })
    
    const checkToggleCheckbox = (checkboxName) => {
        setCheckboxStatus((prevState) => {
            const newcheckboxStatus = {...prevState};
            newcheckboxStatus[checkboxName] = !newcheckboxStatus[checkboxName];

            const newcheckboxValues = {...checkboxValues};
            if (newcheckboxStatus[checkboxName]) {
                newcheckboxValues[checkboxName] = '';
            }

            return newcheckboxStatus
        })
    }

    const handleInputChange = (event, checkboxName) => {
        const newValue = event.target.value;
        if (/^[1-9]*$/.test(newValue)) {
            const newCheckboxValues = { ...checkboxValues };
            newCheckboxValues[checkboxName] = newValue;
    
            setCheckboxValues(newCheckboxValues)
        }
    }

    const previewImage = (e, type) => {
        const file = e.target
        if (file.files[0]) {
            const reader = new FileReader()
            reader.onload = (e) => {
                if (type === 'meter') {
                    document.getElementById('preview-image-meter').src = e.target.result
                } else if (type === 'status') {
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

    const handlePopup = () => {
        setShowPopup(false) 
        setShowAddedPopup(false)
        if(isFormValid) {
            window.location.href = "/dashboard"
        }
    }

    const submit = (e) => {
        e.preventDefault()

        let isValid = true;

        if(equipment === "") { 
            setErrorMessageEquipmentNumber('Silahkan isi equipment number')
        }
        if(machineLocation === "") { 
            setErrorAddressOrMachineLocation('Silahkan isi alamat/lokasi mesin')
        }
        if(total === "") { 
            setErrorTotal('Silahkan isi total meter')
            isValid = false;
        }

        setIsFormValid(isValid)

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
        setEquipment(e.target.value)
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
        e.preventDefault();
        const newdescription = e.target.value
        setDescription(newdescription)
    
        if (description.trim() === "") {
            setErrorDescription('Silahkan isi deskripsi')
        } else {
            setErrorDescription('')
        }
    }

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

    useEffect(() => {
        setCheckboxValues((prevValue) => ({
            ...prevValue,
            tonerBlack: checkboxStatus.tonerBlack ? '1' : '',
            tonerCyan: checkboxStatus.tonerCyan ? '1' : '',
            tonerMagenta: checkboxStatus.tonerMagenta ? '1' : '',
            tonerYellow: checkboxStatus.tonerYellow ? '1' : '',
            wasteBottle: checkboxStatus.wasteBottle ? '1' : '',
            cleaningCartridge: checkboxStatus.cleaningCartridge ? '1' : '',
            drumBlack: checkboxStatus.drumBlack ? '1' : '',
            drumCyan: checkboxStatus.drumCyan ? '1' : '',
            drumMagenta: checkboxStatus.drumMagenta ? '1' : '',
            drumYellow: checkboxStatus.drumYellow ? '1' : '',
            fuserWeb: checkboxStatus.fuserWeb ? '1' : '',
            corotron: checkboxStatus.corotron ? '1' : ''
        }))
    }, [checkboxStatus])

    const checkCheckBox = (checkboxName) => {
        setCheckboxStatus((prevState) => {
            const newcheckboxStatus = { ...prevState}
            newcheckboxStatus[checkboxName] = !newcheckboxStatus[checkboxName]

            setCheckboxValues((prevValues) => ({
                ...prevValues,
                [checkboxName]: newcheckboxStatus[checkboxName] ? '1' : ''
            }))
            // const newcheckboxValues = {...checkboxValues}
            // if(newcheckboxStatus[checkboxName]) {
            //     newcheckboxValues[checkboxName] = '1'
            // } else {
            //     newcheckboxValues[checkboxName] = ''
            // }

            return newcheckboxStatus
        })
    }

    const handleConsumableCheckBox = (checkboxName, checked) => {
        const consumableCheckBoxName = checkboxName.replace('Color', '');
        
        setCheckboxStatus((prevState) => {
            const newcheckboxStatus = { ...prevState }
            newcheckboxStatus[consumableCheckBoxName] = checked
        
            return newcheckboxStatus
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
                                    <div className="custom-search-dropdown-supplies">
                                        <input type="text" id="search-dropdown-supplies" className="search-dropdown-supplies" value={searchText} onChange={handleSearchInputChange} onClick={handleInputClick} />
                                        {showDropdown && (
                                            <div className="dropdown-supplies" style={{position:'absolute', backgroundColor:'white', overflow:'hidden', width:'987px', top:'109px', zIndex:'1', overflowY:'auto', maxHeight:'300px', borderRight:'1px solid black', borderLeft:'1px solid black', borderTop:'1px solid black'}}>
                                                {filteredEquipmentList.map((item,index) => (
                                                    <div key={index} className="dropdown-item-supplies" onClick={() => handleDropdownItemClick(item)}>
                                                        <div>{item.noEQ} - {item.namaModel}</div>
                                                        <div>{item.keterangan}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* <div className="py-4 mb-2" style={{border:'1px solid #000'}} onChange={this.validationEquipment} ></div> */}
                                    {/* <select className="input-page select-option w-100 d-block mb-md-4 mb-3" style={{height:'50px', border:'1px solid #797979', paddingLeft:'10px'}} onChange={validationEquipment}>
                                    <option value="" disabled selected></option>
                                        {equipmentList.map((group) => (
                                            <optgroup key={group.id}>
                                                <option style={{fontSize:'14px'}}>{group.noEQ} - {group.namaModel}</option>
                                                <option style={{fontSize:'14px'}}>{group.keterangan}</option>
                                                <option value="" disabled></option>
                                                <hr style={{border: '3px solid black'}}/>
                                            </optgroup>
                                        ))}
                                    </select> */}
                                    <span className={`text-danger small mb-4 px-0 ${ errorMessageEquipmentNumber !== '' ? '' : 'd-none' }`} style={{fontSize:'12px'}} >{ errorMessageEquipmentNumber }</span>
                                </div>
                                <div className="col-lg-1 col-2 text-center">
                                    <Link to="/form_eq/0">
                                        <button className="btn btn-login btn-plus" style={{height: '50px', width:'80px'}}>
                                            <i className="fa fa-plus fs-4 py-auto"></i>
                                        </button>
                                    </Link>
                                </div>
                                <div className="col-1 d-block d-lg-none">
                                    <Link className="fa fa-qrcode" style={{fontSize: '34px', textDecoration: 'none', color: '#000', right: 5}} />
                                </div>
                            </div>

                            <div className="card-lable py-1 mb-2" style={{backgroundColor:'#014C90'}}>
                                <label className="fw-medium" style={{fontSize:'12px', color:'white'}}>Alamat/Lokasi Mesin</label>
                            </div>
                            <Link className="py-4 mb-4" style={{border:'1px solid #797979'}} ></Link>
                            <span className={`text-danger small mb-4 px-0 ${ errorAddressOrMachineLocation !== '' ? '' : 'd-none' }`} style={{fontSize:'12px'}} >{ errorAddressOrMachineLocation }</span>

                            <div className="card-lable py-1 mb-2" style={{backgroundColor:'#014C90'}}>
                                <label className="fw-medium" style={{fontSize:'12px', color:'white'}}>Consumable (Please Select)</label>
                            </div>
                            <div className="mb-3 px-0" style={{color:'red'}}>
                                <span style={{fontSize:'14px'}}>Apabila pilihan yang dibutuhkan tidak ada pada pilihan di bawah ini, silahkan melakukan service request melalui menu Breakfix atau </span>
                                <Link className="fw-bold fs-6" style={{color:'red'}} to={`/breakfix_request/${id}`}>Klik disini</Link>
                            </div>
                            <div className="col-6">
                            <div className="d-flex input-check">
                                <div className="col-10 margin" style={{width:'40%'}}>
                                    <div className="check-item d-flex align-items-center mt-1 form-check" style={{height:'10%'}}>
                                        <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="consumable-checkbox me-2 form-check-input" id="toner-black" onChange={() => checkCheckBox('tonerBlack')} checked={checkboxStatus.tonerBlack} ></input>
                                        <label style={{fontSize:'14px',}} htmlFor="toner-black">Toner Black</label>
                                        <input type="checkbox" className="consumable-checkbox-color-toner-black me-2 form-check-input" id="toner-black" onChange={() => checkCheckBox('tonerBlack')} checked={checkboxStatus.tonerBlack} style={{backgroundColor:'black', border:0, borderRadius:0, padding:'1px', marginLeft:'3px'}}></input>
                                    </div>
                                    <div className="check-item d-flex align-items-center mt-4 form-check" style={{height:'10%'}}>
                                        <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="consumable-checkbox me-2 form-check-input" id="toner-cyan" onChange={() => checkCheckBox('tonerCyan')} checked={checkboxStatus.tonerCyan} ></input>
                                        <label style={{fontSize:'14px'}} htmlFor="toner-cyan">Toner Cyan</label>
                                        <input type="checkbox" className="consumable-checkbox-color-toner-cyan me-2 form-check-input" id="toner-cyan" onChange={() => checkCheckBox('tonerCyan')} checked={checkboxStatus.tonerCyan} style={{backgroundColor:'cyan', border:0, borderRadius:0, padding:'1px', marginLeft:'4px'}}></input>
                                    </div>
                                    <div className="check-item d-flex align-items-center mt-4 form-check" style={{height:'10%'}}>
                                        <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="consumable-checkbox me-2 form-check-input" id="toner-magenta" onChange={() => checkCheckBox('tonerMagenta')} checked={checkboxStatus.tonerMagenta} ></input>
                                        <label style={{fontSize:'14px'}} htmlFor="toner-magenta">Toner Magenta</label>
                                        <input type="checkbox" className="consumable-checkbox-color-toner-magenta me-2 form-check-input" id="toner-magenta" onChange={() => checkCheckBox('tonerMagenta')} checked={checkboxStatus.tonerMagenta} style={{backgroundColor:'magenta', border:0, borderRadius:0, padding:'1px', marginLeft:'3px'}}></input>
                                    </div>
                                    <div className="check-item d-flex align-items-center mt-4 form-check" style={{height:'10%'}}>
                                        <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="consumable-checkbox me-2 form-check-input" id="toner-yellow" onChange={() => checkCheckBox('tonerYellow')} checked={checkboxStatus.tonerYellow} ></input>
                                        <label style={{fontSize:'14px'}} htmlFor="toner-yellow">Toner Yellow</label>
                                        <input type="checkbox" className="consumable-checkbox-color-toner-yellow me-2 form-check-input" id="toner-yellow" onChange={() => checkCheckBox('tonerYellow')} checked={checkboxStatus.tonerYellow} style={{backgroundColor:'yellow', border:0, borderRadius:0, padding:'1px', marginLeft:'3px'}}></input>
                                    </div>
                                    <div className="check-item d-flex align-items-center mt-4 form-check" style={{height:'10%'}}>
                                        <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="consumable-checkbox me-2 form-check-input" id="waste-bottle" onChange={() => checkCheckBox('wasteBottle')} ></input>
                                        <label style={{fontSize:'14px'}} htmlFor="waste-bottle">Waste Bottle</label>
                                    </div>
                                    <div className="check-item d-flex align-items-center mt-4 form-check" style={{height:'10%'}}>
                                        <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="consumable-checkbox me-2 form-check-input" id="cleaning-cartridge" onChange={() => checkCheckBox('cleaningCartridge')} ></input>
                                        <label style={{fontSize:'14px'}} htmlFor="cleaning-cartridge">Cleaning Cartridge</label>
                                    </div>
                                </div>

                                <div className="col-3 check-check">
                                    <div className="check-item d-flex align-items-center mb-3">
                                        <input type="text" className="input-consumable py-2" maxLength="1" value={checkboxStatus.tonerBlack ? checkboxValues.tonerBlack : ''} onChange={(e) => handleInputChange(e, 'tonerBlack')} disabled={!checkboxStatus.tonerBlack} style={{width:'50%', height:'45px', backgroundColor:'white'}}></input>
                                    </div>
                                    <div className="check-item d-flex align-items-center mb-3">
                                        <input type="text" className="input-consumable py-2" maxLength="1" value={checkboxStatus.tonerCyan ? checkboxValues.tonerCyan : ''} onChange={(e) => handleInputChange(e, 'tonerCyan')} disabled={!checkboxStatus.tonerCyan} style={{width:'50%', height:'45px', backgroundColor:'white'}}></input>
                                    </div>
                                    <div className="check-item d-flex align-items-center mb-3">
                                        <input type="text" className="input-consumable py-2" maxLength="1" value={checkboxStatus.tonerMagenta ? checkboxValues.tonerMagenta : ''} onChange={(e) => handleInputChange(e, 'tonerMagenta')} disabled={!checkboxStatus.tonerMagenta} style={{width:'50%', height:'45px', backgroundColor:'white'}}></input>
                                    </div>
                                    <div className="check-item d-flex align-items-center mb-3">
                                        <input type="text" className="input-consumable py-2" maxLength="1" value={checkboxStatus.tonerYellow ? checkboxValues.tonerYellow : ''} onChange={(e) => handleInputChange(e, 'tonerYellow')} disabled={!checkboxStatus.tonerYellow} style={{width:'50%', height:'45px', backgroundColor:'white'}}></input>
                                    </div>
                                    <div className="check-item d-flex align-items-center mb-3">
                                        <input type="text" className="input-consumable py-2" maxLength="1" value={checkboxStatus.wasteBottle ? checkboxValues.wasteBottle : ''} onChange={(e) => handleInputChange(e, 'wasteBottle')} disabled={!checkboxStatus.wasteBottle} style={{width:'50%', height:'45px', backgroundColor:'white'}}></input>
                                    </div>
                                    <div className="check-item d-flex align-items-center mb-3">
                                        <input type="text" className="input-consumable py-2" maxLength="1" value={checkboxStatus.cleaningCartridge ? checkboxValues.cleaningCartridge : ''} onChange={(e) => handleInputChange(e, 'cleaningCartridge')} disabled={!checkboxStatus.cleaningCartridge} style={{width:'50%', height:'45px', backgroundColor:'white'}}></input>
                                    </div>
                                </div>
                            </div>
                            </div>
                            <div className="col-6 col-sm-3 d-flex input-check">
                                <div className="col-10 margin">
                                    <div className="check-item d-flex align-items-center mt-1 form-check" style={{height:'10%'}}>
                                        <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="consumable-checkbox me-2 form-check-input" id="drum-black" onChange={() => checkCheckBox('drumBlack')} checked={checkboxStatus.drumBlack} ></input>
                                        <label style={{fontSize:'14px'}} htmlFor="drum-black">Drum Black</label>
                                        <input type="checkbox" className="consumable-checkbox-color-drum-black me-2 form-check-input" id="drum-black" onChange={() => checkCheckBox('drumBlack')} checked={checkboxStatus.drumBlack} style={{backgroundColor:'black', border:0, borderRadius:0, padding:'1px', marginLeft:'3px'}}></input>
                                    </div>
                                    <div className="check-item d-flex align-items-center mt-4 form-check" style={{height:'10%'}}>
                                        <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="consumable-checkbox me-2 form-check-input" id="drum-cyan" onChange={() => checkCheckBox('drumCyan')} checked={checkboxStatus.drumCyan} ></input>
                                        <label style={{fontSize:'14px'}} htmlFor="drum-cyan">Drum Cyan</label>
                                        <input type="checkbox" className="consumable-checkbox-color-drum-cyan me-2 form-check-input" id="drum-cyan" onChange={() => checkCheckBox('drumCyan')} checked={checkboxStatus.drumCyan} style={{backgroundColor:'cyan', border:0, borderRadius:0, padding:'1px', marginLeft:'3px'}}></input>
                                    </div>
                                    <div className="check-item d-flex align-items-center mt-4 form-check" style={{height:'10%'}}>
                                        <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="consumable-checkbox me-2 form-check-input" id="drum-magenta" onChange={() => checkCheckBox('drumMagenta')} checked={checkboxStatus.drumMagenta} ></input>
                                        <label style={{fontSize:'14px'}} htmlFor="drum-magenta">Drum Magenta</label>
                                        <input type="checkbox" className="consumable-checkbox-color-drum-magenta me-2 form-check-input" id="drum-magenta" onChange={() => checkCheckBox('drumMagenta')} checked={checkboxStatus.drumMagenta} style={{backgroundColor:'magenta', border:0, borderRadius:0, padding:'1px', marginLeft:'3px'}}></input>
                                    </div>
                                    <div className="check-item d-flex align-items-center mt-4 form-check" style={{height:'10%'}}>
                                        <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="consumable-checkbox me-2 form-check-input" id="drum-yellow" onChange={() => checkCheckBox('drumYellow')} checked={checkboxStatus.drumYellow} ></input>
                                        <label style={{fontSize:'14px'}} htmlFor="drum-yellow">Drum Yellow</label>
                                        <input type="checkbox" className="consumable-checkbox-color-drum-yellow me-2 form-check-input" id="drum-yellow" onChange={() => checkCheckBox('drumYellow')} checked={checkboxStatus.drumYellow} style={{backgroundColor:'yellow', border:0, borderRadius:0, padding:'1px', marginLeft:'3px'}}></input>
                                    </div>
                                    <div className="check-item d-flex align-items-center mt-4 form-check" style={{height:'10%'}}>
                                        <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="consumable-checkbox me-2 form-check-input" id="fuser-web" onChange={() => checkCheckBox('fuserWeb')} ></input>
                                        <label style={{fontSize:'14px'}} htmlFor="fuser-web">Fuser Web</label>
                                    </div>
                                    <div className="check-item d-flex align-items-center mt-4 form-check" style={{height:'10%'}}>
                                        <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="consumable-checkbox me-2 form-check-input" id="corotron" onChange={() => checkCheckBox('corotron')} ></input>
                                        <label style={{fontSize:'14px'}} htmlFor="corotron">Corotron</label>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="check-item d-flex align-items-center mb-3">
                                        <input type="text" className="input-consumable py-2" maxLength="1" value={checkboxStatus.drumBlack ? checkboxValues.drumBlack : ''} onChange={(e) => handleInputChange(e, 'drumBlack')} disabled={!checkboxStatus.drumBlack} style={{width:'100%', height:'45px', backgroundColor:'white'}}></input>
                                    </div>
                                    <div className="check-item d-flex align-items-center mb-3">
                                        <input type="text" className="input-consumable py-2" maxLength="1" value={checkboxStatus.drumCyan ? checkboxValues.drumCyan : ''} onChange={(e) => handleInputChange(e, 'drumCyan')} disabled={!checkboxStatus.drumCyan} style={{width:'100%', height:'45px', backgroundColor:'white'}}></input>
                                    </div>
                                    <div className="check-item d-flex align-items-center mb-3">
                                        <input type="text" className="input-consumable py-2" maxLength="1" value={checkboxStatus.drumMagenta ? checkboxValues.drumMagenta : ''} onChange={(e) => handleInputChange(e, 'drumMagenta')} disabled={!checkboxStatus.drumMagenta} style={{width:'100%', height:'45px', backgroundColor:'white'}}></input>
                                    </div>
                                    <div className="check-item d-flex align-items-center mb-3">
                                        <input type="text" className="input-consumable py-2" maxLength="1" value={checkboxStatus.drumYellow ? checkboxValues.drumYellow : ''} onChange={(e) => handleInputChange(e, 'drumYellow')} disabled={!checkboxStatus.drumYellow} style={{width:'100%', height:'45px', backgroundColor:'white'}}></input>
                                    </div>
                                    <div className="check-item d-flex align-items-center mb-3">
                                        <input type="text" className="input-consumable py-2" maxLength="1" value={checkboxStatus.fuserWeb ? checkboxValues.fuserWeb : ''} onChange={(e) => handleInputChange(e, 'fuserWeb')} disabled={!checkboxStatus.fuserWeb} style={{width:'100%', height:'45px', backgroundColor:'white'}}></input>
                                    </div>
                                    <div className="check-item d-flex align-items-center mb-3">
                                        <input type="text" className="input-consumable y-2" maxLength="1" value={checkboxStatus.corotron ? checkboxValues.corotron : ''} onChange={(e) => handleInputChange(e, 'corotron')} disabled={!checkboxStatus.corotron} style={{width:'100%', height:'45px', backgroundColor:'white'}}></input>
                                    </div>
                                </div>
                            </div>

                            <div className="card-lable py-1 mb-2 mt-2" style={{backgroundColor:'#014C90'}}>
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
                                <label className="file-icon mb-3 d-block text-center" htmlFor="input-file-meter">
                                    <div className="rounded-circle p-2 mx-auto" style={{backgroundColor:'#014C90', color:'#fff', width:'50px', height:'50px'}}>
                                        <img className="mt-1" src="images/upload.png" style={{width:'22px'}}></img>
                                    </div>
                                </label>
                                <div className="d-none col-md-6 col-sm-8 mx-auto my-5 text-center" id="display-image-meter">
                                    <img className="w-50" src="#" alt="" id="preview-image-meter" />
                                </div>
                            </div>

                            <div className="col-md-6 col-sm-12 mb-4 p-0">
                                <div className="card-lable py-1 px-2 mb-2 d-md-block d-none" style={{backgroundColor:'#014C90'}}>
                                    <label className="fw-medium" style={{fontSize:'12px', color:'white'}}>Photo Status Consumable</label>
                                </div>
                                <p className="text-decoration-underline fw-medium fst-italic text-center mt-3" style={{fontSize:'14px', color:'pink'}}>Please upload photo status consumable on machine</p>
                                <input type="file" className="d-none" id="input-file-status" onChange={(e) => previewImage(e, 'status')} accept="image/*" />
                                <label className="file-icon mb-3 d-block text-center" htmlFor="input-file-status">
                                    <div className="text-center rounded-circle p-2 mx-auto" style={{backgroundColor:'#014C90', color:'#fff', width:'50px', height:'50px'}}>
                                        <img className="mt-1" src="images/upload.png" style={{width:'22px'}}></img>
                                    </div>
                                </label>
                                <div className="d-none col-md-6 col-sm-8 mx-auto my-5 text-center" id="display-image-status">
                                    <img className="w-50" src="#" alt="" id="preview-image-status" />
                                </div>
                            </div>

                            <div className="col-md-12 text-center d-flex justify-content-center">
                                <button className="btn btn-login py-2 px-5" style={{fontSize:'14px', maxWidth:'200px'}}>Submit</button>
                            </div>
                            
                        </div>
                    </form>
                    <ConfirmAlert visible={showPopup} message="Mohon isi field yang kosong, upload foto meter dan upload foto status consumable. Untuk field problem isi min. 1" customClass="col-md-5 col-sm-8 col-10" onClick={handlePopup} />
                    <ConfirmAlert visible={showAddedPopup} message="Berhasil melakukan permintaan consumable" customClass="col-sm-4" onClick={handlePopup} />
                </div>
            </div>
        </div>
        </>
    )
}

export default Supplies

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
//             checkboxStatus: {
//                 tonerBlack: false,
//                 tonerCyan: false,
//                 tonerMagenta: false,
//                 tonerYellow: false,
//                 wasteBottle: false,
//                 cleaningCartridge: false,
//                 drumBlack: false,
//                 drumCyan: false,
//                 drumMagenta: false,
//                 drumYellow: false,
//                 fuserWeb: false,
//                 corotron: false,
//                 showPopup: false,
//                 showAddedPopup: false,
//             },
//             checkboxValues: {
//                 tonerBlack: "",
//                 tonerCyan: "",
//                 tonerMagenta: "",
//                 tonerYellow: "",
//                 wasteBottle: "",
//                 cleaningCartridge: "",
//                 drumBlack: "",
//                 drumCyan: "",
//                 drumMagenta: "",
//                 drumYellow: "",
//                 fuserWeb: "",
//                 corotron: "",
//             },
//             equipment:'',
//             machineLocation:'',
//             description:'',
//             total:'',
//             errorMessageEquipmentNumber:'',
//             errorAddressOrMachineLocation:'',
//             errorDescription:'',
//             errorTotal:'',
//         }
//         this.submit = this.submit.bind(this)
//         this.checkCheckBox = this.checkCheckBox.bind(this)
//         this.validationEquipment = this.validationEquipment.bind(this)
//         this.validationMachineLocation = this.validationMachineLocation.bind(this)
//         this.validationDescription = this.validationDescription.bind(this)
//         this.validationTotal = this.validationTotal.bind(this)
//         this.handlePopup = this.handlePopup.bind(this)
//     }

//     checkToggleCheckbox = (checkboxName) => {
//         this.setState((prevState) => {
//             const checkboxStatus = {...prevState.checkboxStatus};
//             checkboxStatus[checkboxName] = !checkboxStatus[checkboxName];

//             const checkboxValues = {...prevState.checkboxValues};
//             if (checkboxStatus[checkboxName]) {
//                 checkboxValues[checkboxName] = "";
//             }

//             return {
//                 checkboxStatus,
//                 checkboxValues,
//             };
//         });
//     };

//     handleInputChange = (event, checkboxName) => {
//         const newValue = event.target.value;
//         if (/^[1-9]*$/.test(newValue)) {
//             const newCheckboxValues = { ...this.state.checkboxValues };
//             newCheckboxValues[checkboxName] = newValue;
    
//             this.setState({
//                 checkboxValues: newCheckboxValues,
//             });
//         }
//     }

//     previewImage(e, type) {
//         const file = e.target;
//         if (file.files[0]) {
//             const reader = new FileReader();
//             reader.onload = (e) => {
//                 if (type === 'meter') {
//                     document.getElementById('preview-image-meter').src = e.target.result;
//                 } else if (type === 'status') {
//                     document.getElementById('preview-image-status').src = e.target.result;
//                 }
//             };
//             reader.readAsDataURL(file.files[0]);
//         }
//         if (type === 'meter') {
//             document.getElementById('display-image-meter').classList.remove('d-none');
//             document.getElementById('display-image-meter').classList.add('d-block');
//         } else if (type === 'status') {
//             document.getElementById('display-image-status').classList.remove('d-none');
//             document.getElementById('display-image-status').classList.add('d-block');
//         }
//     }
    

//     // previewImage(e) {
//     //     const file = e.target
//     //     if(file.files[0]) {
//     //         const reader = new FileReader()
//     //         reader.onload = (e) => {
//     //             document.getElementById('preview-image').src = e.target.result
//     //         }
//     //         reader.readAsDataURL(file.files[0])
//     //     }
//     //     document.getElementById('display-image').classList.remove('d-none')
//     //     document.getElementById('display-image').classList.add('d-block')
//     // }

//     handlePopup() {
//         this.setState({showPopup:false, showAddedPopup: false})
//         if(this.state.isFormValid) {
//             window.location.href = "/#/dashboard"
//         }
//     }

//     submit(e) {
//         e.preventDefault()

//         let isValid = true;

//         if(this.state.equipment === "") { 
//             this.setState({errorMessageEquipmentNumber:'Silahkan isi equipment number'})
//             // isValid = false;
//         }
//         if(this.state.machineLocation === "") { 
//             this.setState({errorAddressOrMachineLocation: 'Silahkan isi alamat/lokasi mesin'})
//             // isValid = false;
//         }
//         // if(this.state.description === "") { 
//         //     this.setState({errorDescription: 'Silahkan isi deskripsi'})
//         //     isValid = false;
//         // }
//         if(this.state.total === "") { 
//             this.setState({errorTotal: 'Silahkan isi total meter'})
//             isValid = false;
//         }

//         this.setState({isFormValid: isValid});

//         if(isValid) {
//             this.setState({showPopup: false, showAddedPopup: true})
//         } else {
//             this.setState({showPopup: true, showAddedPopup: false});
//         }

//         // Swal.fire({
//         //     text:'Mohon isi field yang kosong, upload foto meter dan upload foto status consumable. Untuk field problem isi min. 1',
//         //     confirmButtonColor:'#0099ff'
//         // })
//     }

//     validationEquipment(e) {
//         e.preventDefault()
//         this.setState({equipment: e.target.value})
//         if(this.state.equipment !== "") {
//             this.setState({errorMessageEquipmentNumber: ''})
//         }
//     }

//     validationMachineLocation(e) {
//         e.preventDefault()
//         this.setState({machineLocation: e.target.value})
//         if(this.state.machineLocation !== "") {
//             this.setState({errorAddressOrMachineLocation: ''})
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
//     //         this.setState({errorDescription: ''})
//     //     }
//     // }

//     // handleNoEqChange = (e) => {
//     //     const value = e.target.value;
//     //     if (value === "") {
//     //         this.setState({ noEq: value, errorNoEq: "Silahkan isi nomor equipment" });
//     //     } else if (/^\d*$/.test(value)) {
//     //         this.setState({ noEq: value, errorNoEq: "" }); // Menghapus pesan kesalahan saat input valid
//     //     } else {
//     //         this.setState({ errorNoEq: "Nomor equipment harus berupa angka" });
//     //     }
//     // };

//     validationTotal = (e) => {
//         const value = e.target.value;
//         if (value === "") {
//             this.setState({ total: value, errorTotal: "Silahkan isi total meter" });
//         } else if (/^\d*$/.test(value)) {
//             this.setState({ total: value, errorTotal: "" });
//         } else {
//             this.setState({ errorTotal: "Silahkan isi total meter" });
//         }
//     }

//     checkCheckBox = (checkboxName) => {
//         this.setState((prevState) => {
//             const checkboxStatus = { ...prevState.checkboxStatus };
//             checkboxStatus[checkboxName] = !checkboxStatus[checkboxName];

//             const checkboxValues = {...prevState.checkboxValues};
//             if(checkboxStatus[checkboxName]) {
//                 checkboxValues[checkboxName] = "1";
//             } else {
//                 checkboxValues[checkboxName] = "";
//             }

//             return {
//                 checkboxStatus,
//                 checkboxValues,
//             };
//         }, () => {
//             this.handleConsumableCheckBox(checkboxName, this.state.checkboxStatus[checkboxName]);
//         }
//         );
//     }

//     handleConsumableCheckBox = (checkboxName, checked) => {
//         // Tentukan nama consumable-checkbox yang sesuai berdasarkan checkboxName
//         const consumableCheckBoxName = checkboxName.replace('Color', '');
      
//         this.setState((prevState) => {
//           const checkboxStatus = { ...prevState.checkboxStatus };
//           checkboxStatus[consumableCheckBoxName] = checked;
      
//           return {
//             checkboxStatus,
//           };
//         });
//       };
      

//     render () {
//         return (
//             <>
//             <div className="py-md-3 py-2">
//                 <div className="responsive-bar" style={{alignItems:'baseline', height:'55px'}}>
//                     <h4 className="title-icare title-fitur m-0 p-0 fw-bold" style={{fontSize: '18px'}}>
//                         <Link className="nav-link d-inline me-3" to="../dashboard">
//                             <i className="fa fa-arrow-left color-arrow-left" style={{color:'#014C90'}}></i>
//                         </Link>
//                             <span style={{borderBottom:'3px solid #014C90'}}>Supplies Request</span>
//                     </h4>
//                 </div>
//                 <div className="responsive-supplies">
//                 <div className="card px-lg-3 px-1 shadow border-0">
//                     <div className="card-body">
//                         <form onSubmit={this.submit}>
//                             <div className="row">
//                                 <div className="card-lable py-1 mb-2" style={{backgroundColor:'#014C90'}}>
//                                     <label className="fw-medium" style={{fontSize:'12px', color:'white'}}>Equipment Number</label>
//                                 </div>


//                                 <div className="d-flex p-0">
//                                     <div className="col-sm-11 col-10">
//                                         {/* <div className="py-4 mb-2" style={{border:'1px solid #000'}} onChange={this.validationEquipment} ></div> */}
//                                         <select className="input-page select-option w-100 d-block mb-md-4 mb-3" style={{height:'50px', border:'1px solid #797979', paddingLeft:'10px'}} onChange={this.validationEquipment}>
//                                             <option></option>
//                                             {this.state.equipmentList.map((group) => (
//                                                 <optgroup key={group.id}>
//                                                     <option style={{fontSize:'14px'}}>{group.noEQ} | {group.namaModel} | {group.keterangan}</option>
//                                                     <hr style={{border: '3px solid black'}}/>
//                                                 </optgroup>
//                                             ))}
//                                         </select>
//                                         <span className={`text-danger small mb-4 px-0 ${ this.state.errorMessageEquipmentNumber !== '' ? '' : 'd-none' }`} style={{fontSize:'12px'}} >{ this.state.errorMessageEquipmentNumber }</span>
//                                     </div>
//                                     <div className="col-lg-1 col-2 text-center">
//                                         <Link to="/form_eq/0">
//                                             <button className="btn btn-login btn-plus" style={{height: '50px', width:'80px'}}>
//                                                 <i className="fa fa-plus fs-4 py-auto"></i>
//                                             </button>
//                                         </Link>
//                                     </div>
//                                     <div className="col-2 d-block d-lg-none d-md-none text-center py-1">
//                                         <Link className="fa fa-qrcode" style={{fontSize: '45px', textDecoration: 'none', color: '#000', right: 5}}></Link>
//                                     </div>
//                                 </div>
//                                 <div className="card-lable py-1 mb-2" style={{backgroundColor:'#014C90'}}>
//                                     <label className="fw-medium" style={{fontSize:'12px', color:'white'}}>Alamat/Lokasi Mesin</label>
//                                 </div>
//                                 <Link className="py-4 mb-2" style={{border:'1px solid #000'}} ></Link>
//                                 <span className={`text-danger small mb-4 px-0 ${ this.state.errorAddressOrMachineLocation !== '' ? '' : 'd-none' }`} style={{fontSize:'12px'}} >{ this.state.errorAddressOrMachineLocation }</span>

//                                 <div className="card-lable py-1 mb-2" style={{backgroundColor:'#014C90'}}>
//                                     <label className="fw-medium" style={{fontSize:'12px', color:'white'}}>Consumable (Please Select)</label>
//                                 </div>
//                                 <div className="mb-3 px-0" style={{color:'red'}}>
//                                     <span style={{fontSize:'14px'}}>Apabila pilihan yang dibutuhkan tidak ada pada pilihan di bawah ini, silahkan melakukan service request melalui menu Breakfix atau </span>
//                                     <Link className="fw-bold fs-6" style={{color:'red'}} to={{pathname:'/breakfix_request/0'}}>Klik disini</Link>
//                                 </div>
//                                 <div className="col-12">
//                                 <div className="col-md-3 col-sm-6" style={{width:'190px'}}>
//                                     <div className="check-item d-flex align-items-center mt-1 form-check" style={{height:'10%'}}>
//                                         <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="consumable-checkbox me-2 form-check-input" id="toner-black" onChange={() => this.checkCheckBox('tonerBlack')} checked={this.state.checkboxStatus.tonerBlack} ></input>
//                                         <label style={{fontSize:'14px',}} htmlFor="toner-black">Toner Black</label>
//                                         <input type="checkbox" className="consumable-checkbox-color-toner-black me-2 form-check-input" id="toner-black" onChange={() => this.checkCheckBox('tonerBlack')} checked={this.state.checkboxStatus.tonerBlack} style={{backgroundColor:'black', border:0, borderRadius:0, padding:'1px', marginLeft:'3px'}}></input>
//                                     </div>
//                                     <div className="check-item d-flex align-items-center mt-4 form-check" style={{height:'10%'}}>
//                                         <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="consumable-checkbox me-2 form-check-input" id="toner-cyan" onChange={() => this.checkCheckBox('tonerCyan')} checked={this.state.checkboxStatus.tonerCyan} ></input>
//                                         <label style={{fontSize:'14px'}} htmlFor="toner-cyan">Toner Cyan</label>
//                                         <input type="checkbox" className="consumable-checkbox-color-toner-cyan me-2 form-check-input" id="toner-cyan" onChange={() => this.checkCheckBox('tonerCyan')} checked={this.state.checkboxStatus.tonerCyan} style={{backgroundColor:'cyan', border:0, borderRadius:0, padding:'1px', marginLeft:'4px'}}></input>
//                                     </div>
//                                     <div className="check-item d-flex align-items-center mt-4 form-check" style={{height:'10%'}}>
//                                         <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="consumable-checkbox me-2 form-check-input" id="toner-magenta" onChange={() => this.checkCheckBox('tonerMagenta')} checked={this.state.checkboxStatus.tonerMagenta} ></input>
//                                         <label style={{fontSize:'14px'}} htmlFor="toner-magenta">Toner Magenta</label>
//                                         <input type="checkbox" className="consumable-checkbox-color-toner-magenta me-2 form-check-input" id="toner-magenta" onChange={() => this.checkCheckBox('tonerMagenta')} checked={this.state.checkboxStatus.tonerMagenta} style={{backgroundColor:'magenta', border:0, borderRadius:0, padding:'1px', marginLeft:'3px'}}></input>
//                                     </div>
//                                     <div className="check-item d-flex align-items-center mt-4 form-check" style={{height:'10%'}}>
//                                         <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="consumable-checkbox me-2 form-check-input" id="toner-yellow" onChange={() => this.checkCheckBox('tonerYellow')} checked={this.state.checkboxStatus.tonerYellow} ></input>
//                                         <label style={{fontSize:'14px'}} htmlFor="toner-yellow">Toner Yellow</label>
//                                         <input type="checkbox" className="consumable-checkbox-color-toner-yellow me-2 form-check-input" id="toner-yellow" onChange={() => this.checkCheckBox('tonerYellow')} checked={this.state.checkboxStatus.tonerYellow} style={{backgroundColor:'yellow', border:0, borderRadius:0, padding:'1px', marginLeft:'3px'}}></input>
//                                     </div>
//                                     <div className="check-item d-flex align-items-center mt-4 form-check" style={{height:'10%'}}>
//                                         <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="consumable-checkbox me-2 form-check-input" id="waste-bottle" onChange={() => this.checkCheckBox('wasteBottle')} ></input>
//                                         <label style={{fontSize:'14px'}} htmlFor="waste-bottle">Waste Bottle</label>
//                                     </div>
//                                     <div className="check-item d-flex align-items-center mt-4 form-check" style={{height:'10%'}}>
//                                         <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="consumable-checkbox me-2 form-check-input" id="cleaning-cartridge" onChange={() => this.checkCheckBox('cleaningCartridge')} ></input>
//                                         <label style={{fontSize:'14px'}} htmlFor="cleaning-cartridge">Cleaning Cartridge</label>
//                                     </div>
//                                 </div>

//                                 <div className="col-md-3 col-sm-6 col-6 input-check d-md-block d-none">
//                                     <div className="check-item d-flex align-items-center mb-3">
//                                         <input type="text" className="input-consumable py-2" maxLength="1" value={this.state.checkboxStatus.tonerBlack ? this.state.checkboxValues.tonerBlack : ''} onChange={(e) => this.handleInputChange(e, 'tonerBlack')} disabled={!this.state.checkboxStatus.tonerBlack} style={{width:'20%', height:'45px', backgroundColor:'white'}}></input>
//                                     </div>
//                                     <div className="check-item d-flex align-items-center mb-3">
//                                         <input type="text" className="input-consumable py-2" maxLength="1" value={this.state.checkboxStatus.tonerCyan ? this.state.checkboxValues.tonerCyan : ''} onChange={(e) => this.handleInputChange(e, 'tonerCyan')} disabled={!this.state.checkboxStatus.tonerCyan} style={{width:'20%', height:'45px', backgroundColor:'white'}}></input>
//                                     </div>
//                                     <div className="check-item d-flex align-items-center mb-3">
//                                         <input type="text" className="input-consumable py-2" maxLength="1" value={this.state.checkboxStatus.tonerMagenta ? this.state.checkboxValues.tonerMagenta : ''} onChange={(e) => this.handleInputChange(e, 'tonerMagenta')} disabled={!this.state.checkboxStatus.tonerMagenta} style={{width:'20%', height:'45px', backgroundColor:'white'}}></input>
//                                     </div>
//                                     <div className="check-item d-flex align-items-center mb-3">
//                                         <input type="text" className="input-consumable py-2" maxLength="1" value={this.state.checkboxStatus.tonerYellow ? this.state.checkboxValues.tonerYellow : ''} onChange={(e) => this.handleInputChange(e, 'tonerYellow')} disabled={!this.state.checkboxStatus.tonerYellow} style={{width:'20%', height:'45px', backgroundColor:'white'}}></input>
//                                     </div>
//                                     <div className="check-item d-flex align-items-center mb-3">
//                                         <input type="text" className="input-consumable py-2" maxLength="1" value={this.state.checkboxStatus.wasteBottle ? this.state.checkboxValues.wasteBottle : ''} onChange={(e) => this.handleInputChange(e, 'wasteBottle')} disabled={!this.state.checkboxStatus.wasteBottle} style={{width:'20%', height:'45px', backgroundColor:'white'}}></input>
//                                     </div>
//                                     <div className="check-item d-flex align-items-center mb-3">
//                                         <input type="text" className="input-consumable py-2" maxLength="1" value={this.state.checkboxStatus.cleaningCartridge ? this.state.checkboxValues.cleaningCartridge : ''} onChange={(e) => this.handleInputChange(e, 'cleaningCartridge')} disabled={!this.state.checkboxStatus.cleaningCartridge} style={{width:'20%', height:'45px', backgroundColor:'white'}}></input>
//                                     </div>
//                                 </div>
//                                 </div>
//                                 <div className="col-md-3 col-sm-6" style={{width:'180px', marginLeft:'95px'}}>
//                                     <div className="check-item d-flex align-items-center mt-1 form-check" style={{height:'10%'}}>
//                                         <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="consumable-checkbox me-2 form-check-input" id="drum-black" onChange={() => this.checkCheckBox('drumBlack')} checked={this.state.checkboxStatus.drumBlack} ></input>
//                                         <label style={{fontSize:'14px'}} htmlFor="drum-black">Drum Black</label>
//                                         <input type="checkbox" className="consumable-checkbox-color-drum-black me-2 form-check-input" id="drum-black" onChange={() => this.checkCheckBox('drumBlack')} checked={this.state.checkboxStatus.drumBlack} style={{backgroundColor:'black', border:0, borderRadius:0, padding:'1px', marginLeft:'3px'}}></input>
//                                     </div>
//                                     <div className="check-item d-flex align-items-center mt-4 form-check" style={{height:'10%'}}>
//                                         <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="consumable-checkbox me-2 form-check-input" id="drum-cyan" onChange={() => this.checkCheckBox('drumCyan')} checked={this.state.checkboxStatus.drumCyan} ></input>
//                                         <label style={{fontSize:'14px'}} htmlFor="drum-cyan">Drum Cyan</label>
//                                         <input type="checkbox" className="consumable-checkbox-color-drum-cyan me-2 form-check-input" id="drum-cyan" onChange={() => this.checkCheckBox('drumCyan')} checked={this.state.checkboxStatus.drumCyan} style={{backgroundColor:'cyan', border:0, borderRadius:0, padding:'1px', marginLeft:'3px'}}></input>
//                                     </div>
//                                     <div className="check-item d-flex align-items-center mt-4 form-check" style={{height:'10%'}}>
//                                         <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="consumable-checkbox me-2 form-check-input" id="drum-magenta" onChange={() => this.checkCheckBox('drumMagenta')} checked={this.state.checkboxStatus.drumMagenta} ></input>
//                                         <label style={{fontSize:'14px'}} htmlFor="drum-magenta">Drum Magenta</label>
//                                         <input type="checkbox" className="consumable-checkbox-color-drum-magenta me-2 form-check-input" id="drum-magenta" onChange={() => this.checkCheckBox('drumMagenta')} checked={this.state.checkboxStatus.drumMagenta} style={{backgroundColor:'magenta', border:0, borderRadius:0, padding:'1px', marginLeft:'3px'}}></input>
//                                     </div>
//                                     <div className="check-item d-flex align-items-center mt-4 form-check" style={{height:'10%'}}>
//                                         <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="consumable-checkbox me-2 form-check-input" id="drum-yellow" onChange={() => this.checkCheckBox('drumYellow')} checked={this.state.checkboxStatus.drumYellow} ></input>
//                                         <label style={{fontSize:'14px'}} htmlFor="drum-yellow">Drum Yellow</label>
//                                         <input type="checkbox" className="consumable-checkbox-color-drum-yellow me-2 form-check-input" id="drum-yellow" onChange={() => this.checkCheckBox('drumYellow')} checked={this.state.checkboxStatus.drumYellow} style={{backgroundColor:'yellow', border:0, borderRadius:0, padding:'1px', marginLeft:'3px'}}></input>
//                                     </div>
//                                     <div className="check-item d-flex align-items-center mt-4 form-check" style={{height:'10%'}}>
//                                         <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="consumable-checkbox me-2 form-check-input" id="fuser-web" onChange={() => this.checkCheckBox('fuserWeb')} ></input>
//                                         <label style={{fontSize:'14px'}} htmlFor="fuser-web">Fuser Web</label>
//                                     </div>
//                                     <div className="check-item d-flex align-items-center mt-4 form-check" style={{height:'10%'}}>
//                                         <input type="checkbox" style={{borderRadius: 0, padding:'1px'}} className="consumable-checkbox me-2 form-check-input" id="corotron" onChange={() => this.checkCheckBox('corotron')} ></input>
//                                         <label style={{fontSize:'14px'}} htmlFor="corotron">Corotron</label>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-3 col-sm-6">
//                                     <div className="check-item d-flex align-items-center mb-3">
//                                         <input type="text" className="input-consumable py-2" maxLength="1" value={this.state.checkboxStatus.drumBlack ? this.state.checkboxValues.drumBlack : ''} onChange={(e) => this.handleInputChange(e, 'drumBlack')} disabled={!this.state.checkboxStatus.drumBlack} style={{width:'20%', height:'45px', backgroundColor:'white'}}></input>
//                                     </div>
//                                     <div className="check-item d-flex align-items-center mb-3">
//                                         <input type="text" className="input-consumable py-2" maxLength="1" value={this.state.checkboxStatus.drumCyan ? this.state.checkboxValues.drumCyan : ''} onChange={(e) => this.handleInputChange(e, 'drumCyan')} disabled={!this.state.checkboxStatus.drumCyan} style={{width:'20%', height:'45px', backgroundColor:'white'}}></input>
//                                     </div>
//                                     <div className="check-item d-flex align-items-center mb-3">
//                                         <input type="text" className="input-consumable py-2" maxLength="1" value={this.state.checkboxStatus.drumMagenta ? this.state.checkboxValues.drumMagenta : ''} onChange={(e) => this.handleInputChange(e, 'drumMagenta')} disabled={!this.state.checkboxStatus.drumMagenta} style={{width:'20%', height:'45px', backgroundColor:'white'}}></input>
//                                     </div>
//                                     <div className="check-item d-flex align-items-center mb-3">
//                                         <input type="text" className="input-consumable py-2" maxLength="1" value={this.state.checkboxStatus.drumYellow ? this.state.checkboxValues.drumYellow : ''} onChange={(e) => this.handleInputChange(e, 'drumYellow')} disabled={!this.state.checkboxStatus.drumYellow} style={{width:'20%', height:'45px', backgroundColor:'white'}}></input>
//                                     </div>
//                                     <div className="check-item d-flex align-items-center mb-3">
//                                         <input type="text" className="input-consumable py-2" maxLength="1" value={this.state.checkboxStatus.fuserWeb ? this.state.checkboxValues.fuserWeb : ''} onChange={(e) => this.handleInputChange(e, 'fuserWeb')} disabled={!this.state.checkboxStatus.fuserWeb} style={{width:'20%', height:'45px', backgroundColor:'white'}}></input>
//                                     </div>
//                                     <div className="check-item d-flex align-items-center mb-3">
//                                         <input type="text" className="input-consumable y-2" maxLength="1" value={this.state.checkboxStatus.corotron ? this.state.checkboxValues.corotron : ''} onChange={(e) => this.handleInputChange(e, 'corotron')} disabled={!this.state.checkboxStatus.corotron} style={{width:'20%', height:'45px', backgroundColor:'white'}}></input>
//                                     </div>
//                                 </div>
//                                 {/* <div className="card-lable py-1 mb-2" style={{backgroundColor:'#014C90'}}>
//                                     <label className="fw-medium" style={{fontSize:'12px', color:'white'}}>Tambah Deskripsi</label>
//                                 </div>
//                                 <div className="mb-4 p-0">
//                                     <input type="text" style={{paddingLeft:'10px'}} className={ `input-page py-2 w-100 ${ this.state.errorDescription !== '' ? 'border-danger border' : '' }` } onChange={this.validationDescription} />
//                                     <span className={`text-danger small mx-2 ${ this.state.errorDescription !== '' ? '' : 'd-none' }`} style={{fontSize:'12px'}} >{ this.state.errorDescription }</span>
//                                 </div> */}

//                                 <div className="card-lable py-1 mb-2" style={{backgroundColor:'#014C90'}}>
//                                     <label className="fw-medium" style={{fontSize:'12px', color:'white'}}>Total Meter Information / Total Impressions</label>
//                                 </div>
//                                 <div className="mb-4 p-0">
//                                     <input type="text" style={{paddingLeft:'10px'}} className={ `input-page py-2 w-100 ${ this.state.errorTotal !== '' ? 'border-danger border' : '' }` } onChange={this.validationTotal} value={this.state.total} />
//                                     <span className={`text-danger small px-0 ${ this.state.errorTotal !== '' ? '' : 'd-none' }`} style={{fontSize:'12px'}} >{ this.state.errorTotal }</span>
//                                 </div>

//                                 <div className="col-md-6 col-sm-12 mb-4 p-0">
//                                     <div className="card-lable py-1 px-2 mb-2" style={{backgroundColor:'#014C90', width:'99%'}}>
//                                         <label className="fw-medium" style={{fontSize:'12px', color:'white'}}>Photo Meter</label>
//                                     </div>
//                                     <p className="text-decoration-underline fw-medium fst-italic text-center mt-3" style={{fontSize:'14px', color:'pink'}}>Please upload photo meter information/photo machine</p>
//                                     <input type="file" className="d-none" id="input-file-meter" onChange={(e) => this.previewImage(e, 'meter')} accept="image/*" />
//                                     <label className="file-icon mb-3 d-block text-center" htmlFor="input-file-meter">
//                                         <div className="rounded-circle p-2 mx-auto" style={{backgroundColor:'#014C90', color:'#fff', width:'50px', height:'50px'}}>
//                                             <img className="mt-1" src="images/upload.png" style={{width:'22px'}}></img>
//                                         </div>
//                                     </label>
//                                     <div className="d-none col-md-6 col-sm-8 mx-auto my-5 text-center" id="display-image-meter">
//                                         <img className="w-50" src="#" alt="" id="preview-image-meter" />
//                                     </div>
//                                 </div>

//                                 <div className="col-md-6 col-sm-12 mb-4 p-0">
//                                     <div className="card-lable py-1 px-2 mb-2" style={{backgroundColor:'#014C90'}}>
//                                         <label className="fw-medium" style={{fontSize:'12px', color:'white'}}>Photo Status Consumable</label>
//                                     </div>
//                                     <p className="text-decoration-underline fw-medium fst-italic text-center mt-3" style={{fontSize:'14px', color:'pink'}}>Please upload photo meter information/photo machine</p>
//                                     <input type="file" className="d-none" id="input-file-status" onChange={(e) => this.previewImage(e, 'status')} accept="image/*" />
//                                     <label className="file-icon mb-3 d-block text-center" htmlFor="input-file-status">
//                                         <div className="text-center rounded-circle p-2 mx-auto" style={{backgroundColor:'#014C90', color:'#fff', width:'50px', height:'50px'}}>
//                                             <img className="mt-1" src="images/upload.png" style={{width:'22px'}}></img>
//                                         </div>
//                                     </label>
//                                     <div className="d-none col-md-6 col-sm-8 mx-auto my-5 text-center" id="display-image-status">
//                                         <img className="w-50" src="#" alt="" id="preview-image-status" />
//                                     </div>
//                                 </div>

//                                 <div className="col-md-12 text-center d-flex justify-content-center">
//                                     <button className="btn btn-login py-2 px-5" style={{fontSize:'14px', maxWidth:'200px'}}>Submit</button>
//                                 </div>
                                
//                             </div>
//                         </form>
//                         <ConfirmAlert visible={this.state.showPopup} message="Mohon isi field yang kosong, upload foto meter dan upload foto status consumable. Untuk field problem isi min. 1" customClass="col-md-5 col-sm-8 col-10" onClick={this.handlePopup} />
//                         <ConfirmAlert visible={this.state.showAddedPopup} message="Berhasil melakukan permintaan consumable" customClass="col-sm-4" onClick={this.handlePopup} />
//                     </div>
//                 </div>
//                 </div>
//             </div>
//             </>
//         )
//     }
// }
