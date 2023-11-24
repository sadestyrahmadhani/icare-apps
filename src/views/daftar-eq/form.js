import { useState, useEffect } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import ConfirmAlert from "../../component/alert/confirmAlert";
import { createDaftarEq, updateDaftarEq } from "../../services/API/mod_daftarEQ";
import LoadingAlert from "../../component/alert/loadingAlert";
import { getDaftarAlamat } from "../../services/API";

function FormEQ() {
    const location = useLocation()
    const navigate = useNavigate()
    const params = useParams()

    const [noEQ, setNoEQ] = useState('')
    const [model, setModel] = useState('')
    const [keterangan, setKeterangan] = useState('')
    const [machineLocation, setMachineLocation] = useState('')
    const [errorNoEQ, setErrorNoEQ] = useState('')
    const [errorModel, setErrorModel] = useState('')
    const [errorKeterangan, setErrorKeterangan] = useState('')
    const [errorAddressOrMachineLocation, setErrorAddressOrMachineLocation] = useState('')
    const [showPopup, setShowPopup] = useState(false)
    const [showAddedPopup, setShowAddedPopup] = useState(false)
    const [alertOption, setAlertOption] = useState({title: '', message:'', redirect: false})
    const [isFormValid, setIsFormValid] = useState(false)
    const [loading, setLoading] = useState(false)

    const [showDropdown, setShowDropdown] = useState(false)
    const [searchText, setSearchText] = useState('')
    const [dataDaftarAlamat, setDataDaftarAlamat] = useState([])
    const [originalData, setOriginalData] = useState('')
    const [showMoreAlamat, setShowMoreAlamat] = useState(false)
    const [selectedAddress, setSelectedAddress] = useState(null)
    const [selectedRadio, setSelectedRadio] = useState('list')

    const [addressLabel, setAddressLabel] = useState('')
    const [recipientName, setRecipientName] = useState('')
    const [streetName, setStreetName] = useState('')
    const [buildingName, setBuildingName] = useState('')
    const [buildingNumber, setBuildingNumber] = useState('')
    const [city, setCity] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [deliveryLocation, setDeliveryLocation] = useState('')
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [addressid, setAddressid] = useState(null)

    const [errorAddressLabel, setErrorAddressLabel] = useState('')
    const [errorBuildingName, setErrorBuildingName] = useState('')
    const [errorBuildingNumber, setErrorBuildingNumber] = useState('')
    const [errorCity, setErrorCity] = useState('')
    const [errorPostalCode, setErrorPostalCode] = useState('')
    const [errorPhoneNumber, setErrorPhoneNumber] = useState('')
    const [errorRecipientName, setErrorRecipientName] = useState('')
    const [errorStreetName, setErrorStreetName] = useState('')
    const [errorDeliveryLocation, setErrorDeliveryLocation] = useState('')
    const [textareaHeight, setTextareaHeight] = useState('1em')

    const alamatEQ = location.state?.address
    const alamatUpdate = alamatEQ ? `${alamatEQ.Penerima} - ${alamatEQ.Nama_Alamat} \n ${alamatEQ.Alamat}` : ''

    useEffect(() => {
        init()
        setNoEQ(location.state?.input?.equipment || '')
        setModel(location.state?.input?.modelName || '')
        setKeterangan(location.state?.input?.description || '')

        // console.log(location.state?.addressid);
        // if(location.state?.address) {
        //     const alamatEQ = location.state.address
        //     setSearchText(`${alamatEQ.Penerima} - ${alamatEQ.Nama_Alamat} \n ${alamatEQ.Alamat}`)
        // }

    },[]);

    async function init() {
        setLoading(true)
        const res = await getDaftarAlamat()
        setLoading(false)
        if(res.status == 200) {
            setDataDaftarAlamat(res.data.Table)
            setOriginalData(res.data.Table)
        }
    }

    const handleTextareaHeight = (height) => {
        setTextareaHeight(height)
    }

    const handleDropdownItemClick = (item) => {
        setAddressid(item.id.toString())
        setSelectedAddress(item)
        setMachineLocation(item.Penerima + ' - ' + item.Nama_Alamat + '\n' + item.Alamat)
        
        const newSearchText = `${item.Penerima} - ${item.Nama_Alamat} \n ${item.Alamat}`
        setSearchText(newSearchText)

        // setSearchText(item.Penerima + ' - ' + item.Nama_Alamat + '\n' + item.Alamat)
        setShowDropdown(false)
        setErrorAddressOrMachineLocation('')
        setTextareaHeight('55px')
    }

    const displayShowMoreAlamat = showMoreAlamat ? dataDaftarAlamat : dataDaftarAlamat.slice(0, 5)
    const handleShowMoreAlamat = () => {
        setShowMoreAlamat(true)
    }

    const filteredAlamat = (e) => {
        if(e.target.value != '') {
            var filterData = originalData.filter(val => (val.Penerima.toString().toLowerCase().includes(e.target.value.toLowerCase())) || val.Nama_Alamat.toLowerCase(). includes(e.target.value.toLowerCase()) || val.Alamat.toLowerCase().includes(e.target.value.toLowerCase()))
            setDataDaftarAlamat(filterData)
        } else {
            setDataDaftarAlamat(originalData)
        }
    }

    const handleSearchInputChange = (e) => {
        const inputText = e.target.value
        setSearchText(inputText)

        if(inputText.trim() === "") {
            setErrorAddressOrMachineLocation('Silahkan isi alamat/lokasi mesin')
            setTextareaHeight('1em')
        } else {
            setErrorAddressOrMachineLocation('')
        }

        setShowDropdown(!!inputText)
    }
    
    const handleNoEqChange = (e) => {
        e.preventDefault()
        setNoEQ(e.target.value)
        if(selectedRadio === "list") {
            if (e.target.value.trim() === "") {
                setErrorNoEQ("Silahkan isi nomor equipment")
            } else {
                if (!e.target.value.match(/^\d*$/)) {
                    setErrorNoEQ("Nomor equipment harus berupa angka")
                    return
                } else {
                    if(e.target.value.length !== 6) {
                        setErrorNoEQ("Nomor equipment harus terdiri dari 6 digit")
                        return
                    }
                }

                setErrorNoEQ('')
            }
        }
    }

    const handleModelChange = (e) => {
        const value = e.target.value;
        if(selectedRadio === "list") {
            if (value === "") {
                setModel(value)
                setErrorModel("Silahkan isi nama model")
            } else {
                setModel(value)
                setErrorModel('')
            }
        }
    }
    
    const handleKeteranganChange = (e) => {
        const value = e.target.value;
        if(selectedRadio === "list") {
            if (value === "") {
                setKeterangan(value)
                setErrorKeterangan("Silahkan isi keterangan")
            } else {
                setKeterangan(value)
                setErrorKeterangan('')
            }
        }
    }
    
    const handlePopup = () => {
        setShowAddedPopup(false)
        setShowPopup(false)
        if(alertOption.redirect) {
            if(location.state?.redirect === -1) {
                navigate('/install_request', {
                    state: {
                        address: selectedAddress, 
                        description: keterangan, 
                        equipment: noEQ, 
                        modelName: model, 
                        userid: localStorage.getItem('id')
                    }
                })
            } else if(location.state?.redirect === -2) {
                navigate('/breakfix_request', {
                    state: {
                        address: selectedAddress,
                        description: keterangan,
                        equipment: noEQ,
                        modelName: model,
                        userid: localStorage.getItem('id')
                    }
                })
            } else {
                if(location.state?.redirect === -3) {
                    navigate('/supplies_request', {
                        state: {
                            address: selectedAddress,
                            description: keterangan,
                            equipment: noEQ,
                            modelName: model,
                            userid: localStorage.getItem('id')
                        }
                    })
                } else {
                    navigate('/daftar_eq')
                }
            }
        }
    }

    const submit = async (e) => {
        e.preventDefault()

        let isValid = true;

        if(selectedRadio === "list") {
            if(noEQ === "") {
                setErrorNoEQ("Silahkan isi nomor equipment")
                isValid = false;
            } else {
                setErrorNoEQ('')
                
            }
    
            if(!noEQ.match(/^\d*$/)) {
                setErrorNoEQ("Nomor equipment harus berupa angka")
                isValid = false;
            }
    
            if(model === "") {
                setErrorModel("Silahkan isi nama model")
                isValid = false;
            } else {
                setErrorModel('')
            }
    
            if(keterangan === "") {
                setErrorKeterangan("Silahkan isi keterangan")
                isValid = false;
            } else {
                setErrorKeterangan('')
            }

            if (searchText === "") {
                setErrorAddressOrMachineLocation('Silahkan isi alamat/lokasi mesin')
                isValid = false
            } else {
                setErrorAddressOrMachineLocation('')
            }

            // if(machineLocation === "") {
            //     setErrorAddressOrMachineLocation("Silahkan isi alamat/lokasi mesin")
            //     isValid = false
            // } else {
            //     setErrorAddressOrMachineLocation('')
            // }
        } else if (selectedRadio === "baru") {
            if(noEQ === "") {
                setErrorNoEQ("Silahkan isi nomor equipment")
                isValid = false;
            } else {
                setErrorNoEQ('')
                
            }
    
            if(!noEQ.match(/^\d*$/)) {
                setErrorNoEQ("Nomor equipment harus berupa angka")
                isValid = false;
            }
    
            if(model === "") {
                setErrorModel("Silahkan isi nama model")
                isValid = false;
            } else {
                setErrorModel('')
            }
    
            if(keterangan === "") {
                setErrorKeterangan("Silahkan isi keterangan")
                isValid = false;
            } else {
                setErrorKeterangan('')
            }

            if(addressLabel === "") {
                isValid = false
                setErrorAddressLabel("Silahkan isi simpan alamat sebagai")
            }
    
            if(recipientName === ""){
                isValid = false
                setErrorRecipientName("Silahkan isi nama penerima")
            }
    
            if(streetName === "") {
                isValid = false
                setErrorStreetName("Silahkan isi nama jalan & nomor gedung/kantor")
            }
    
            if(buildingName === "") {
                isValid = false
                setErrorBuildingName("Silahkan isi nama gedung/kantor")
            }
    
            if(buildingNumber === "") {
                isValid = false
                setErrorBuildingNumber("Silahkan isi nama gedung/kantor")
            }
    
            if(city === "") {
                isValid = false
                setErrorCity("Silahkan isi kota")
            }
    
            if(deliveryLocation === "") {
                isValid = false
                setErrorDeliveryLocation("Silahkan isi lokasi pengiriman")
            }
    
            if(postalCode === "") {
                isValid = false
                setErrorPostalCode("Silahkan isi kode pos")
            }
    
            if(!postalCode.match("^[0-9]*$")) {
                isValid = false
                setErrorPostalCode("Kode pos harus berupa angka")
            }
    
            if (postalCode.length > 20 ) {
                isValid = false
                setErrorPostalCode("Kode pos tidak boleh lebih dari 20 karakter")
            }
    
            if(phoneNumber === "") {
                isValid = false
                setErrorPhoneNumber("Silahkan isi nomor penerima")
            }
    
            if(!phoneNumber.match("^[0-9]*$") || phoneNumber.length < 9 || phoneNumber.length > 16) {
                isValid = false
                setErrorPhoneNumber("Nomor tidak valid")
            }
        }

        setIsFormValid(isValid)

        if (isValid) {
            setLoading(true);
        
            if (selectedRadio === "list") {
                if(params?.id) {
                    // console.log('ID : ', addressid)
                    // const res = await updateDaftarEq(params.id, {AddressId: location.state.address.id.toString(), description: keterangan, equipment: noEQ, modelName: model})
                    const res = await updateDaftarEq(params.id, {AddressId: addressid, description: keterangan, equipment: noEQ, modelName: model})
                    if(res.status == 200 && res.data.includes('Succes update')) {
                        setShowPopup(true)
                        setAlertOption({
                            title:'Berhasil',
                            message: 'Berhasil update EQ',
                            redirect: true
                        })
                    } else {
                        setShowPopup(true)
                        setAlertOption({
                            title: 'Error',
                            message: 'Gagal update EQ',
                            redirect: false
                        })
                    }
                } else {
                    const res = await createDaftarEq({AddressId: addressid, description: keterangan, equipment: noEQ, modelName: model, userid: localStorage.getItem('id')})
                    if(res.status == 200 && res.data.includes('Succes insert')) {
                        setShowPopup(true)  
                        setAlertOption({
                            title: 'Berhasil',
                            message: 'Berhasil menambahkan equipment',
                            redirect: true
                        })
                    } else {
                        setShowPopup(true)
                        setAlertOption({title:'Error',message:'Input not valid', redirect: false})
                    }
                }
            } 
            // else if (selectedRadio === "baru") {
            //     // Tambahkan logika untuk menyimpan equipment dengan alamat baru.
            //     const res = await createDaftarEq();
            //     // Gantilah createEquipmentWithNewAddress dengan logika yang sesuai.
        
            //     if (res.status === 200 && res.data.includes('Succes insert')) {
            //         setShowPopup(true);
            //         setAlertOption({
            //             title: '',
            //             message: res.data,
            //             redirect: true
            //         });
            //     } else {
            //         setShowPopup(true);
            //         setAlertOption({
            //             title: 'Error',
            //             message: 'Input not valid',
            //             redirect: false
            //         });
            //     }
            // }
        
            setLoading(false);
        } else {
            setShowPopup(true)
            setAlertOption({title: 'Error', message: 'Input not valid', redirect: false})
        }
        

        // if(isValid) { 
        //     if(params?.id) {
        //         setLoading(true)
        //         const res = await updateDaftarEq(params.id, {AddressId: location.state?.address.id.toString(), description: keterangan, equipment: noEQ, modelName: model})
        //         setLoading(false)
        //         if(res.status == 200 && res.data.includes('Succes update')) {
        //             setShowPopup(true)
        //             setAlertOption({
        //                 title:'',
        //                 message: res.data,
        //                 redirect: true
        //             })
        //         } else {
        //             setShowPopup(true)
        //             setAlertOption({
        //                 title: 'Error',
        //                 message: res.data,
        //                 redirect: false
        //             })
        //         }
        //     } else {
        //         setLoading(true)
        //         const res = await createDaftarEq({AddressId: location.state?.address.id.toString(), description: keterangan, equipment: noEQ, modelName: model, userid: localStorage.getItem('id')})
        //         setLoading(false)
        //         if(res.status == 200 && res.data.includes('Succes insert')) {
        //             setShowPopup(true)  
        //             setAlertOption({
        //                 title: '',
        //                 message: res.data,
        //                 redirect: true
        //             })
        //         } else {
        //             setShowPopup(true)
        //             setAlertOption({title:'',message:'Input not valid', redirect: false})
        //         }
        //     }
        // } 
    }

    const validationAddressLabel = (e) => {
        e.preventDefault()
        setAddressLabel(e.target.value)
        if(selectedRadio === "baru") {
            if(e.target.value === "") {
                setErrorAddressLabel('Silahkan isi simpan alamat sebagai')
            } else {
                setErrorAddressLabel('')
            }
        }
    }

    const validationRecipientName = (e) => {
        e.preventDefault()
        setRecipientName(e.target.value)
        if(selectedRadio === "baru") {
            if(e.target.value === "") {
                setErrorRecipientName('Silahkan isi nama penerima')
            } else {
                setErrorRecipientName('')
            }
        }
    }

    const validationStreetName = (e) => {
        e.preventDefault()
        setStreetName(e.target.value)
        if(selectedRadio === "baru") {
            if(e.target.value === "") {
                setErrorStreetName('Silahkan isi nama jalan & nomor gedung/kantor')
            } else {
                setErrorStreetName('')
            }
        }
    }

    const validationBuildingNumber = (e) => {
        e.preventDefault()
        setBuildingNumber(e.target.value)
        if(selectedRadio === "baru") {
            if(e.target.value === "") {
                setErrorBuildingNumber('Silahkan isi nomor gedung/kantor')
            } else {
                setErrorBuildingNumber('')
            }
        }
    }

    const validationBuildingName = (e) => {
        e.preventDefault()
        setBuildingName(e.target.value)
        if(selectedRadio === "baru") {
            if(e.target.value === "") {
                setErrorBuildingName('Silahkan isi nomor gedung/kantor')
            } else {
                setErrorBuildingName('')
            }
        }
    }

    const validationCity = (e) => {
        e.preventDefault()
        setCity(e.target.value)
        if(selectedRadio === "baru") {
            if(e.target.value === "") {
                setErrorCity('Silahkan isi kota')
            } else {
                setErrorCity('')
            }
        }
    }

    const validationDeliveryLocation = (e) => {
        e.preventDefault()
        var longLat = e.target.value.split(',')

        setLatitude(longLat[0])
        setLongitude(longLat[1])

        setDeliveryLocation(e.target.value)
        if(selectedRadio === "baru") {
            if(e.target.value === "") {
                setErrorDeliveryLocation('Silahkan isi lokasi pengiriman')
            } else {
                setErrorDeliveryLocation('')
            }
        }
    }

    const validationPhoneNumber = (e) => {
        e.preventDefault()
        setPhoneNumber(e.target.value)
        if(selectedRadio === "baru") {
            if(e.target.value === "") {
                setErrorPhoneNumber('Silahkan isi nomor telepon penerima')
            } else {
                if(!e.target.value.match("^[0-9]*$") || e.target.value.length < 9 || e.target.value.length > 16) {
                    setErrorPhoneNumber('Nomor tidak valid')
                    return
                }
    
                setErrorPhoneNumber('')
            }
        }
    }

    const validationPostalCode = (e) => {
        e.preventDefault()
        setPostalCode(e.target.value)
        if(selectedRadio === "baru") {
            if(e.target.value.trim() === "") {
                setErrorPostalCode('Silahkan isi kode pos')
            } else {
                if(!e.target.value.match("^[0-9]*$")) {
                    setErrorPostalCode('Kode pos harus berupa angka')
                    return
                } else {
                    if(e.target.value.length !== 5) {
                        setErrorPostalCode('Kode pos harus terdiri dari 5 digit')
                        return
                    }
                }
    
                setErrorPostalCode('')
            }
        }
    }

    return (
        <>
            <div className="responsive-bar">
                <div className="d-flex mx-md-auto my-md-2 my-0 default-height" style={{alignItems:'baseline', height:'55px'}}>
                    <h4 className="title-icare title-fitur m-0 p-0 fw-bold" style={{fontSize: '18px'}}>
                        <Link className="nav-link d-inline me-3" to="javascript:history.back()">
                            <i className="fa fa-arrow-left color-arrow-left" style={{color:'#014C90'}}></i>
                        </Link>
                            <span className="title-bold" style={{borderBottom:'3px solid #014C90'}}>Tambah EQ</span>
                    </h4>
                </div>
            </div>
            <div className="">
                <div className="card shadow border-0 responsive-form" style={{borderRadius:'20px'}}>
                    <form onSubmit={submit}>
                        <div className="card-body px-lg-4 px-md-2 px-2">
                            <div className="row">
                                <div className="d-flex">
                                    <div className="col-6">
                                        <div className="card border-0 mt-2" style={{width:'99%', borderRadius:'15px', boxShadow:'1px 1px 3px 3px #bfbfbf'}}>
                                            <div className="card-body">
                                                <div className="card-label font-size-12px-mobile">
                                                    <label style={{fontWeight: 'bold'}}>No EQ</label>
                                                </div>
                                                <input type="text" maxLength="6" className={`form-control border-only-bottom font-size-11px-mobile  ${errorNoEQ === "" ? "": "invalid"}`} onChange={handleNoEqChange} value={noEQ} inputMode="numeric"/>
                                                <span className={`text-danger small ${errorNoEQ === "" ? "d-none": ""}`} style={{fontSize:'12px'}}> {" "} {errorNoEQ} {" "} </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="card border-0 mt-2 mx-2 nama-model" style={{ width:'98%', borderRadius:'15px', boxShadow:'1px 1px 3px 3px #bfbfbf'}}>
                                            <div className="card-body">
                                                <div className="card-label font-size-12px-mobile">
                                                    <label style={{fontWeight: 'bold'}}>Nama Model</label>
                                                </div>
                                                <input type="text" className={`form-control border-only-bottom font-size-11px-mobile ${errorModel === "" ? "": "invalid"}`} onChange={handleModelChange} value={model}/>
                                                <span className={`text-danger small ${errorModel === "" ? "d-none": ""}`} style={{fontSize:'12px'}}> {errorModel} </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card border-0 mt-4" style={{borderRadius:'15px', boxShadow:'1px 1px 3px 3px #bfbfbf'}}>
                                <div className="card-body">
                                    <div className="card-label font-size-12px-mobile">
                                        <label style={{fontWeight: 'bold'}}>Keterangan</label>
                                    </div>
                                    <input type="text" className={`form-control border-only-bottom font-size-11px-mobile ${errorKeterangan === "" ? "": "invalid"}`} onChange={handleKeteranganChange} value={keterangan}/>
                                    <span className={`text-danger small ${errorKeterangan === "" ? "d-none": ""}`} style={{fontSize:'12px'}}> {errorKeterangan} </span>
                                </div>
                            </div>
                            <div className="card border-0 mt-4" style={{borderRadius:'15px', boxShadow:'1px 1px 3px 3px #bfbfbf'}}>
                                <div className="card-body">
                                    <div className="card-label mb-4 font-size-12px-mobile">
                                        <label style={{fontWeight: 'bold'}}>Alamat</label>
                                    </div>
                                    <div className="radio-button">
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="alamat" id="list" value="alamatlist" checked={selectedRadio === 'list'} onChange={() => setSelectedRadio('list')}></input>
                                            <label className="form-check-label" for="list">Pilih dari list</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="alamat" id="baru" value="alamatbaru" checked={selectedRadio === 'baru'} onChange={() => setSelectedRadio('baru')}></input>
                                            <label className="form-check-label" for="baru">Buat baru</label>
                                        </div>
                                    </div>
                                    {selectedRadio === 'list' && (
                                        <>
                                            <div className="d-flex">
                                                <textarea id="textarea-alamat" onKeyUp={filteredAlamat} className={`form-control border-only-bottom font-size-11px-mobile mt-3 ${errorAddressOrMachineLocation === "" ? "": "invalid"}`} value={searchText} onChange={handleSearchInputChange} onClick={() => setShowDropdown(!showDropdown)} style={{height: textareaHeight, resize:'none'}} placeholder={alamatUpdate? alamatUpdate : ""}/>
                                                {/* {console.log('Data: ',alamatUpdate)} */}
                                                {
                                                    searchText && (
                                                        <button className="d-lg-none d-md-none d-block" style={{margin: 'auto', border: 0, background: 'none'}} type="reset" onClick={() => { setSearchText(""); setErrorAddressOrMachineLocation(""); setTextareaHeight("1em");}} >
                                                            <i className="fa fa-close"></i>
                                                        </button>

                                                    )
                                                }
                                            </div>
                                            <span className={`text-danger small ${errorAddressOrMachineLocation === "" ? "d-none": ""}`} style={{fontSize:'12px'}}>{errorAddressOrMachineLocation}</span>
                                            {showDropdown && (
                                                <div className="dropdown-alamat px-4 " style={{position:'absolute', backgroundColor:'white', overflow:'hidden', width:'97%', top:'auto', zIndex:'1', overflowY:'auto', maxHeight:'360px', boxShadow:' 1px 1px 5px 1px #797979', borderRadius:'5px', paddingTop:'2%'}}>
                                                    {displayShowMoreAlamat.map((item, index) => (
                                                        <div className="dropdown-alamat" key={index} onClick={() => handleDropdownItemClick(item)}>
                                                            {/* {console.log('Data: ', item)} */}
                                                            <div>{item.Penerima} - {item.Nama_Alamat}</div>
                                                            <div className="mb-3">{item.Alamat}</div>
                                                        </div>
                                                    ))}
                                                    {!showMoreAlamat && dataDaftarAlamat.length > 5 && (
                                                        <div className="dropdown-alamat" onClick={handleShowMoreAlamat} style={{cursor:'pointer'}}>
                                                            <div className="moreAlamat" style={{color:'#014C90'}}>Show more...</div>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </>
                                    )}
                                    {selectedRadio === 'baru' && (
                                        <>
                                            <div className="card p-2 mb-3 mt-4" style={{borderRadius:'10px', boxShadow:'1px 1px 2px 2px #bfbfbf'}}>
                                                <div className="card-body" style={{fontSize:'14px'}}>
                                                    <div className="card-label py-1">
                                                        <label style={{fontWeight:'bold'}}>Simpan Alamat Sebagai (Contoh: Kantor Pusat PT Angin Ribut)</label>
                                                    </div>
                                                    <input type="text" className={`py-1 border-only-bottom ${errorAddressLabel === "" ? "" : "invalid"}`} onChange={validationAddressLabel} style={{fontSize:'14px', color:'GrayText', width:'-webkit-fill-available'}} value={addressLabel}></input>
                                                    <span className={`${errorAddressLabel === "" ? "d-none" : ""} text-danger small`} style={{fontSize:'12px'}}>{errorAddressLabel}</span>

                                                    <div className="card-label py-1 mt-3">
                                                        <label style={{fontWeight:'bold'}}>Nama Penerima</label>
                                                    </div>
                                                    <input type="text" className={`py-1 border-only-bottom ${errorRecipientName === "" ? "" : "invalid"}`} onChange={validationRecipientName} style={{fontSize:'14px', color:'GrayText', width:'-webkit-fill-available'}} value={recipientName}></input>
                                                    <span className={`${errorRecipientName === "" ? "d-none" : ""} text-danger small`} style={{fontSize:'12px'}}>{errorRecipientName}</span>
                                                </div>
                                            </div>
                                            <div className="card p-2 mb-3" style={{borderRadius:'10px', boxShadow:'1px 1px 2px 2px #bfbfbf'}}>
                                                <div className="card-body" style={{fontSize:'14px'}}>
                                                    <label className="mb-3" style={{fontWeight:'bold'}}>Alamat Lengkap</label>
                                                    <div className="card-label py-1">
                                                        <label>Nama Jalan & Nomor Gedung/Kantor (Contoh: Jl. Kramat Raya No.43 / Jl. Salemba Tengah Blok B2)</label>
                                                    </div>
                                                    <input type="text" className={`py-1 border-only-bottom ${errorStreetName === "" ? "" : "invalid"}`} onChange={validationStreetName} style={{fontSize:'14px', color:'GrayText', width:'-webkit-fill-available'}} value={streetName}></input>
                                                    <span className={`${errorStreetName === "" ? "d-none" : ""} text-danger small`} style={{fontSize:'12px'}}>{errorStreetName}</span>

                                                    {/* <div className="card-label py-1 mt-3">
                                                        <label>Nomor Gedung/Kantor (Contoh: No.43 / Blok B2 / Kav II)</label>
                                                    </div>
                                                    <input type="text" className={`py-1 border-only-bottom ${errorBuildingNumber === "" ? "" : "invalid"}`} onChange={validationBuildingNumber} style={{fontSize:'14px', color:'GrayText', width:'-webkit-fill-available'}} value={buildingNumber}></input>
                                                    <span className={`${errorBuildingNumber === "" ? "d-none" : ""} text-danger small`} style={{fontSize:'12px'}}>{errorBuildingNumber}</span> */}

                                                    <div className="card-label py-1 mt-3">
                                                        <label>Nama Gedung/Kantor (Contoh: Gedung Astagraphia, lantai 4 / Ruko Boulevard / Kios Cetak ABC)</label>
                                                    </div>
                                                    <input type="text" className={`py-1 border-only-bottom ${errorBuildingName === "" ? "" : "invalid"}`} onChange={validationBuildingName} style={{fontSize:'14px', color:'GrayText', width:'-webkit-fill-available'}} value={buildingName}></input>
                                                    <span className={`${errorBuildingName === "" ? "d-none" : ""} text-danger small`} style={{fontSize:'12px'}}>{errorBuildingName}</span>

                                                    <div className="card-label py-1 mt-3">
                                                        <label>Kota (Contoh: Jakarta Pusat)</label>
                                                    </div>
                                                    <input type="text" className={`py-1 border-only-bottom ${errorCity === "" ? "" : "invalid"}`} onChange={validationCity} style={{fontSize:'14px', color:'GrayText', width:'-webkit-fill-available'}} value={city}></input>
                                                    <span className={`${errorCity === "" ? "d-none" : ""} text-danger small`} style={{fontSize:'12px'}}>{errorCity}</span>

                                                    <div className="card-label py-1 mt-3">
                                                        <label>Kode Pos (Contoh: 10450)</label>
                                                    </div>
                                                    <input type="text" inputMode="numeric" maxLength="5" className={`py-1 border-only-bottom ${errorPostalCode === "" ? "" : "invalid"}`} onChange={validationPostalCode} style={{fontSize:'14px', color:'GrayText', width:'-webkit-fill-available'}} value={postalCode}></input>
                                                    <span className={`${errorPostalCode === "" ? "d-none" : ""} text-danger small`} style={{fontSize:'12px'}}>{errorPostalCode}</span>
                                                </div>
                                            </div>
                                            <div className="card p-2 mb-3" style={{borderRadius:'10px', boxShadow:'1px 1px 2px 2px #bfbfbf'}}>
                                                <div className="card-body" style={{fontSize:'14px'}}>
                                                    <div className="card-label py-1">
                                                        <label style={{fontWeight:'bolder'}}>No Telepon Penerima</label>
                                                    </div>
                                                    <input type="text" inputMode="tel" className={`py-1 border-only-bottom ${errorPhoneNumber === "" ? "" : "invalid"}`} onChange={validationPhoneNumber} style={{fontSize:'14px', color:'GrayText', width:'-webkit-fill-available'}} value={phoneNumber}></input>
                                                    <span className={`${errorPhoneNumber === "" ? "d-none" : ""} text-danger small`} style={{fontSize:'12px'}}>{errorPhoneNumber}</span>
                                                </div>
                                            </div>
                                            <div className="card p-2" style={{borderRadius:'10px', boxShadow:'1px 1px 2px 2px #bfbfbf'}}>
                                                <div className="card-body" style={{fontSize:'14px'}}>
                                                    <div className="card-label py-1">
                                                        <label style={{fontWeight:'bold'}}>Lokasi Pengiriman</label>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-lg-1 col-md-1 col-2 mb-2">
                                                            <img src="/images/map.png" alt="" style={{width:'50px'}}></img>
                                                        </div>
                                                        <div className="col-lg-11 col-md-11 col-10 mb-2">
                                                            <input type="text" className={`border-only-bottom ${errorDeliveryLocation === "" ? "" : "invalid"}`} onChange={validationDeliveryLocation} style={{fontSize:'14px', color:'GrayText', width:'-webkit-fill-available', paddingTop:'20px'}} value={deliveryLocation}></input>
                                                            <span className={`${errorDeliveryLocation === "" ? "d-none" : ""} text-danger small`} style={{fontSize:'12px'}}>{errorDeliveryLocation}</span>
                                                        </div>
                                                        <span style={{fontWeight:'bold'}}>Pastikan lokasi yang anda tandai di peta sesuai dengan alamat yang anda isi diatas</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                    {/* <div className="card-value px-2 font-size-11px-mobile">
                                        <strong>{location.state?.address?.Penerima} {location.state?.address ? "-" : ""} {location.state?.address?.Nama_Alamat}</strong><br />
                                        <strong>{location.state?.address?.Alamat} {location.state?.address?.Kota} {location.state?.address?.Kode_Pos}</strong>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 mt-4 mb-4 text-center d-flex justify-content-center">
                            <button name="submit" className="btn btn-login py-2 px-5" style={{fontSize:'14px', maxWidth:'200px', height:'43px'}}>SIMPAN</button>
                        </div>
                    </form>
                    <ConfirmAlert visible={showPopup} message={alertOption.message} customClass="col-md-3" onClick={handlePopup} />
                    <LoadingAlert visible={loading} customClass="col-md-2 col-8" />
                    {/* <ConfirmAlert visible={showAddedPopup} message={id === '0' ? 'Berhasil menambahkan Eq' : 'Berhasil update Eq'} customClass="col-md-3" onClick={handlePopup}/> */}
                </div>
            </div>
        </>
    )
}

export default FormEQ

// export default class extends Component {
//     constructor(props) {
//         // console.log('props',props)
//         // console.log('tes id', props.router.params.id)
//         super(props)
//         this.state = {
//             noEq:'',
//             model:'',
//             keterangan:'',
//             errorNoEq:'',
//             errorModel:'',
//             errorKeterangan:'',
//             showPopup: false,
//             showAddedPopup: false,
//             isFormValid: false,
//             id:props.router.params.id
//         };
//         this.submit = this.submit.bind(this)
//         this.handlePopup = this.handlePopup.bind(this)

//         //console.log('actionType', this.state.actionType)
//         //console.log('this.props.location.state',this.props.location.state)
//         //console.log('this.props.location.param1 ', this.props.location.param1 )
//     }

//     handleNoEqChange = (e) => {
//         const value = e.target.value;
//         if (value === "") {
//             this.setState({ noEq: value, errorNoEq: "Silahkan isi nomor equipment" });
//         } else if (/^\d*$/.test(value)) {
//             this.setState({ noEq: value, errorNoEq: "" }); // Menghapus pesan kesalahan saat input valid
//         } else {
//             this.setState({ errorNoEq: "Nomor equipment harus berupa angka" });
//         }
//     };

//     handleModelChange = (e) => {
//         const value = e.target.value;
//         if (value === "") {
//             this.setState({ model: value, errorModel: "Silahkan isi nama model" });
//         } else {
//             this.setState({ model: value, errorModel: "" }); // Menghapus pesan kesalahan saat input valid
//         }
//     };
    
//     handleKeteranganChange = (e) => {
//         const value = e.target.value;
//         if (value === "") {
//             this.setState({ keterangan: value, errorKeterangan: "Silahkan isi keterangan" });
//         } else {
//             this.setState({ keterangan: value, errorKeterangan: "" }); // Menghapus pesan kesalahan saat input valid
//         }
//     };  
    
//     handlePopup() {
//         this.setState({showAddedPopup: false, showPopup:false})
//         if(this.state.isFormValid) {
//             window.location.href = "/#/daftar_eq"
//         }
//     }

//     submit(e) {
//         e.preventDefault()

//         let isValid = true;
        

//         if(this.state.noEq === "") {
//             // console.log('this.state.noEq === ""')
//             this.setState({errorNoEq:"Silahkan isi nomor equipment"});
//             isValid = false;
//         } else {
//             this.setState({errorNoEq:""});
            
//         }

//         if(!this.state.noEq.match(/^\d*$/)) {
//             // console.log('Nomor equipment harus berupa angka')
//             this.setState({errorNoEq: "Nomor equipment harus berupa angka"});
//             isValid = false;
//         }

//         if(this.state.model === "") {
//             // console.log('Silahkan isi nama model"')
//             this.setState({errorModel:"Silahkan isi nama model"});
//             isValid = false;
//         } else {
//             this.setState({errorModel: ""});
//         }

//         if(this.state.keterangan === "") {
//             // console.log('Silahkan isi keterangan')
//             this.setState({errorKeterangan:"Silahkan isi keterangan"});
//             isValid = false;
//         } else {
//             this.setState({errorKeterangan: ""});
//         }

//         this.setState({isFormValid: isValid});

//         if(isValid) {
//             this.setState({showAddedPopup: true, showPopup: false});
//         } else {
//             this.setState({showPopup: true, showAddedPopup: false});
//         }

//         // if (isValid) {
//         //     this.setState({showAddedPopup: true, showPopup: false});
//         // } else {
//         //     this.setState({showPopup: true, showAddedPopup: false});
//         // }
//     }

//     // submit(e) {
//     //     e.preventDefault()

//     //     this.setState({showAddedPopup: true, showUpdatePopup: false});
//     // }

//     render () {
//         return (
//             <>
//             <div className="responsive-bar">
//                 <div className="d-flex mx-md-auto my-md-2 my-0 default-height" style={{alignItems:'baseline', height:'55px'}}>
//                     <h4 className="title-icare title-fitur m-0 p-0 fw-bold" style={{fontSize: '18px'}}>
//                         <Link className="nav-link d-inline me-3" to="../daftar_eq">
//                             <i className="fa fa-arrow-left color-arrow-left" style={{color:'#014C90'}}></i>
//                         </Link>
//                             <span style={{borderBottom:'3px solid #014C90'}}>Tambah EQ</span>
//                     </h4>
//                 </div>
//             </div>
//             <div className="py-lg-0 my-md-0 py-5">
//                 <div className="card shadow border-0 responsive-form" style={{borderRadius:'20px'}}>
//                     <form onSubmit={this.submit}>
//                         <div className="card-body px-lg-2 px-md-2 px-2">
//                             <div className="card border-0 mt-2" style={{borderRadius:'15px', boxShadow:'1px 1px 3px 3px #bfbfbf'}}>
//                                 <div className="card-body">
//                                     <div className="card-label">
//                                         <label style={{fontWeight: 'bold'}}>No EQ</label>
//                                     </div>
//                                     <input type="text" className={`form-control border-only-bottom ${this.state.errorNoEq === "" ? "": "invalid"}`} onChange={this.handleNoEqChange} value={this.state.noEq}/>
//                                     <span className={`text-danger small ${this.state.errorNoEq === "" ? "d-none": ""}`} style={{fontSize:'12px'}}> {" "} {this.state.errorNoEq} {" "} </span>
//                                 </div>
//                             </div>
//                             <div className="card border-0 mt-4" style={{borderRadius:'15px', boxShadow:'1px 1px 3px 3px #bfbfbf'}}>
//                                 <div className="card-body">
//                                     <div className="card-label">
//                                         <label style={{fontWeight: 'bold'}}>Nama Model</label>
//                                     </div>
//                                     <input type="text" className={`form-control border-only-bottom ${this.state.errorModel === "" ? "": "invalid"}`} onChange={this.handleModelChange} value={this.state.model}/>
//                                     <span className={`text-danger small ${this.state.errorModel === "" ? "d-none": ""}`} style={{fontSize:'12px'}}> {this.state.errorModel} </span>
//                                 </div>
//                             </div>
//                             <div className="card border-0 mt-4" style={{borderRadius:'15px', boxShadow:'1px 1px 3px 3px #bfbfbf'}}>
//                                 <div className="card-body">
//                                     <div className="card-label">
//                                         <label style={{fontWeight: 'bold'}}>Keterangan</label>
//                                     </div>
//                                     <input type="text" className={`form-control border-only-bottom ${this.state.errorKeterangan === "" ? "": "invalid"}`} onChange={this.handleKeteranganChange} value={this.state.keterangan}/>
//                                     <span className={`text-danger small ${this.state.errorKeterangan === "" ? "d-none": ""}`} style={{fontSize:'12px'}}> {this.state.errorKeterangan} </span>
//                                 </div>
//                             </div>
//                             <Link className="alamat" to="/daftar_alamat">
//                             <div className="card border-0 mt-4 pb-5" style={{borderRadius:'15px', boxShadow:'1px 1px 3px 3px #bfbfbf'}}>
//                                 <div className="card-body">
//                                     <div className="card-label">
//                                         <label style={{fontWeight: 'bold'}}>Alamat</label>
//                                     </div>
//                                 </div>
//                             </div>
//                             </Link>
//                         </div>
//                         <div className="col-md-12 mt-4 mb-4 text-center d-flex justify-content-center">
//                             <button name="submit" className="btn btn-login py-2 px-5" style={{fontSize:'14px', maxWidth:'200px', height:'43px'}}>SIMPAN</button>
//                         </div>
//                     </form>
//                     <ConfirmAlert visible={this.state.showPopup} titleMessage="Error" message="Input not valid" customClass="col-md-2" onClick={this.handlePopup} />
//                     <ConfirmAlert visible={this.state.showAddedPopup} message={this.state.id === '0' ? 'Berhasil menambahkan Eq' : 'Berhasil update Eq'} customClass="col-md-3" onClick={this.handlePopup}/>
//                     {/* <ConfirmAlert visible={this.state.showUpdatePopup} message="Berhasil update Eq" customClass="col-md-3" onClick={this.handlePopup}/> */}
//                 </div>
//             </div>
//             </>
//         )
//     }
// }