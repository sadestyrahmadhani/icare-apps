import { Component, useState, useEffect } from "react";
import { Link, redirect, useNavigate, useLocation } from "react-router-dom";
import { createDaftarAlamat, getDaftarAlamatById } from "../../services/API/mod_daftarAlamat";
import ConfirmAlert from "../../component/alert/confirmAlert";
import LoadingAlert from "../../component/alert/loadingAlert";

function FormAddress(){
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
    
    const [alertOption, setAlertOption] = useState({title: '', message: '', redirect: false})
    const [loading, setLoading] = useState(false)
    const [showPopup, setShowPopup] = useState(false)
    const [validated, setValidated] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    // const { id } = useParams()

    const [errorAddressLabel, setErrorAddressLabel] = useState('')
    const [errorBuildingName, setErrorBuildingName] = useState('')
    const [errorBuildingNumber, setErrorBuildingNumber] = useState('')
    const [errorCity, setErrorCity] = useState('')
    const [errorPostalCode, setErrorPostalCode] = useState('')
    const [errorPhoneNumber, setErrorPhoneNumber] = useState('')
    const [errorRecipientName, setErrorRecipientName] = useState('')
    const [errorStreetName, setErrorStreetName] = useState('')
    const [errorDeliveryLocation, setErrorDeliveryLocation] = useState('')

    const handlePopup = () => {
        setShowPopup(false)
        // console.log(alertOption)
        if(alertOption.redirect){
            navigate('/daftar_alamat')
        }
    }

    const validationAddressLabel = (e) =>{
        e.preventDefault()
        setAddressLabel(e.target.value)
        if(e.target.value === ""){
            setErrorAddressLabel('Silahkan isi simpan alamat sebagai')
        } else {
            setErrorAddressLabel('')
        }
    }

    const validationRecipientName = (e) => {
        e.preventDefault()
        setRecipientName(e.target.value)
        if(e.target.value === ""){
            setErrorRecipientName('Silahkan isi nama penerima')
        } else {
            setErrorRecipientName('')
        }
    }

    const validationStreetName = (e) => {
        e.preventDefault()
        setStreetName(e.target.value)
        if(e.target.value === ""){
            setErrorStreetName('Silahkan isi nama jalan')
        } else {
            setErrorStreetName('')
        }
    }

    const validationBuildingNumber = (e) => {
        e.preventDefault()
        setBuildingNumber(e.target.value)
        if(e.target.value === ""){
            setErrorBuildingNumber('Silahkan isi nomor gedung/kantor')
        } else {
            setErrorBuildingNumber('')
        }
    }

    const validationBuildingName = (e) => {
        e.preventDefault()
        setBuildingName(e.target.value)
        if(e.target.value === ""){
            setErrorBuildingName('Silahkan isi nama gedung/kantor')
        } else {
            setErrorBuildingName('')
        }
    }

    const validationCity = (e) => {
        e.preventDefault()
        setCity(e.target.value)
        if(e.target.value === ""){
            setErrorCity('Silahkan isi kota')
        } else {
            setErrorCity('')
        }
    }

    const validationDeliveryLocation = (e) => {
        e.preventDefault()
        var longLat = e.target.value.split(',')

        setLatitude(longLat[0])
        setLongitude(longLat[1])

        setDeliveryLocation(e.target.value)
        if(e.target.value === ""){
            setErrorDeliveryLocation('Silahkan isi lokasi pengiriman')
        } else {
            setErrorDeliveryLocation('')
        }
    }

    const validationPhoneNumber = (e) =>{
        e.preventDefault()
        setPhoneNumber(e.target.value)
        if(e.target.value === ""){
            setErrorPhoneNumber('Silahkan isi nomor telepon penerima')
        } else {
            if(!e.target.value.match("^[0-9]*$") || e.target.value.length < 9 || e.target.value.length > 16) {
                setErrorPhoneNumber('Nomor tidak valid')
                return
            }
            
            setErrorPhoneNumber('')
        }
    }

    const validationPostalCode = (e) =>{
        e.preventDefault()
        setPostalCode(e.target.value)
        if(e.target.value == ""){
            setErrorPostalCode('Silahkan isi kode pos')
        } else {
            if(!e.target.value.match("^[0-9]*$")){
                setErrorPostalCode('Kode pos harus berupa angka')
                return
            } else {
                if(e.target.value.length > 20){
                    setErrorPostalCode('Kode pos tidak boleh lebih dari 20 karakter')
                    return
                }
            }
            setErrorPostalCode('')
        }
    }

    useEffect(() => {
        return () => {
            if(location.state?.id){
                daftarAlamatById()
            }
        };
    }, []);

    const daftarAlamatById = async () => {
        const res = await getDaftarAlamatById(location.state?.id)
        if(res.status == 200) {
            console.log(res)
        }
    }

    const sumbit = async (e) => {
        e.preventDefault()
        let isValid = true
        if (addressLabel === "") {
            isValid = false
            setErrorAddressLabel("Silahkan isi simpan alamat sebagai")
        } 
        if (recipientName === "") {
            isValid = false
            setErrorRecipientName("Silahkan isi nama penerima")
        } 
        if (streetName === "") {
            isValid = false
            setErrorStreetName("Silahkan isi nama jalan")
        } 
        if (buildingNumber === "") {
            isValid = false
            setErrorBuildingNumber("Silahkan isi nomor gedung/kantor")
        } 
        if (buildingName === "") {
            isValid = false
            setErrorBuildingName("Silahkan isi nama gedung/kantor")
        } 
        if (city === "") {
            isValid = false
            setErrorCity("Silahkan isi kota")
        } 
        if (deliveryLocation === "") {
            isValid = false
            setErrorDeliveryLocation("Silahkan isi lokasi pengiriman")
        } 
        if (postalCode === "") {
            isValid = false
            setErrorPostalCode("Silahkan isi kode pos")
        } 
        if (phoneNumber === "") {
            isValid = false
            setErrorPhoneNumber("Silahkan isi nomor penerima")
        } 
        
        if (!phoneNumber.match("^[0-9]*$") || phoneNumber.length < 9 || phoneNumber.length > 16){
            isValid = false
            setErrorPhoneNumber('Nomor tidak valid')
        }
        if (!postalCode.match("^[0-9]*$")) {
            isValid = false
            setErrorPostalCode('Kode pos harus berupa angka')
        }
        if (postalCode.length > 20) {
            isValid = false
            setErrorPostalCode('Kode pos tidak boleh lebih dari 20 karakter')
        }

        setValidated(isValid)
        if (isValid) {
            setLoading(true)
            const res = await createDaftarAlamat({UserId: localStorage.getItem('id'), Nama_Alamat: addressLabel, Penerima: recipientName, Alamat: streetName, Kota: city, Kode_Pos: postalCode, Telp_Penerima: phoneNumber, Latitude: latitude, Longitude: longitude, Default: 'true', isPin: 'true', NamaGedung: buildingName, NoGedung: buildingNumber})
            setLoading(false)
            if(res.status == 200 && res.data.includes('Succes insert')) {
                setShowPopup(true)
                setAlertOption({
                    title: '', 
                    message: res.data,
                    redirect: true
                })
            } else {
                setShowPopup(true)
                setAlertOption({
                    title: 'Error',
                    message: res.data,
                    redirect: false
                })
            }
        } else {
            setShowPopup(true)
            setAlertOption({
                title: '',
                message: 'Input not valid',
                redirect: false
            })
        }
    }

    return (
        <>
            <div className="responsive-bar">
                    <div className="d-flex mx-md-auto my-md-2 my-0 default-height" style={{alignItems: 'baseline', height: '40px'}}>
                        <h4 className="title-icare title-fitur m-0 p-0 fw-bold" style={{fontSize: '18px'}}>
                            <Link className="nav-link d-inline me-3" to="/daftar_alamat">
                                <i className="fa fa-arrow-left color-arrow-left" style={{ color: '#014C90'}}></i>
                            </Link>
                            <span className="title-bold" style={{borderBottom: '3px solid #014C90'}}>Tambah Alamat</span>
                        </h4>
                    </div>
                </div>
                <div className="py-lg-0 py-md-0 py-5">
                    <div className="card p-lg-2 p-md-2 p-0 py-2 shadow border-0 responsive-form" style={{borderRadius: '20px'}}>
                        <div className="card-body px-lg-0 px-md-0 px-2">
                            <form onSubmit={sumbit}>
                                <div className="card p-2 mb-3" style={{borderRadius: '10px', boxShadow: '1px 1px 2px 2px #bfbfbf'}}>
                                    <div className="card-body" style={{fontSize: '14px'}}>
                                        <div className="card-label py-1">
                                            <label style={{fontWeight: 'bold'}}>Simpan Alamat Sebagai (Contoh: Kantor Pusat PT Angin Ribut)</label>
                                        </div>
                                        <input type="text" className={`py-1 border-only-bottom ${errorAddressLabel === "" ? "" : "invalid"}`} onChange={validationAddressLabel} style={{fontSize: '14px', width: '-webkit-fill-available'}}/>
                                        <span className={`${errorAddressLabel === "" ? "d-none" : ""} text-danger small`} style={{fontSize: '12px'}}> {errorAddressLabel} </span>
                                        <div className="card-label py-1 mt-3">
                                            <label style={{fontWeight: 'bold'}}>Nama Penerima</label>
                                        </div>
                                        <input type="text" className={`py-1 border-only-bottom ${errorRecipientName === "" ? "" : "invalid"}`} onChange={validationRecipientName} style={{fontSize: '14px', width: '-webkit-fill-available'}}/>
                                        <span className={`${errorRecipientName === "" ? "d-none" : ""} text-danger small`} style={{fontSize: '12px'}}> {errorRecipientName} </span>
                                    </div>
                                </div>
                                <div className="card p-2 mb-3" style={{borderRadius: '10px', boxShadow: '1px 1px 2px 2px #bfbfbf'}}>
                                    <div className="card-body" style={{fontSize: '14px'}}>
                                        <label className="mb-3" style={{fontWeight: 'bold'}}>Alamat Lengkap</label>
                                        <div className="card-label py-1">
                                            <label style={{}}>Nama Jalan (Contoh: Jl. Keramat Raya)</label>
                                        </div>
                                        <input type="text" className={`py-1 border-only-bottom ${errorStreetName === "" ? "" : "invalid"}`} onChange={validationStreetName} style={{fontSize: '14px', width: '-webkit-fill-available'}}/>
                                        <span className={`${errorStreetName === "" ? "d-none" : ""} text-danger small`} style={{fontSize: '12px'}}> {errorStreetName} </span>
                                        <div className="card-label py-1 mt-3">
                                            <label style={{}}>Nomor Gedung/Kantor (Contoh: No. 43 / Blok B2 / Kav II)</label>
                                        </div>
                                        <input type="text" className={`py-1 border-only-bottom ${errorBuildingNumber === "" ? "" : "invalid"}`} onChange={validationBuildingNumber} style={{fontSize: '14px', width: '-webkit-fill-available'}}/>
                                        <span className={`${errorBuildingNumber === "" ? "d-none" : ""} text-danger small`} style={{fontSize: '12px'}}> {errorBuildingNumber} </span>
                                        <div className="card-label py-1 mt-3">
                                            <label style={{}}>Nama Gedung/Kantor (Contoh: Gedung Astagraphia, lantai 4 / Ruko Boulevard / Kios Cetak ABC)</label>
                                        </div>
                                        <input type="text" className={`py-1 border-only-bottom ${errorBuildingName === "" ? "" : "invalid"}`} onChange={validationBuildingName} style={{fontSize: '14px', width: '-webkit-fill-available'}}/>
                                        <span className={`${errorBuildingName === "" ? "d-none" : ""} text-danger small`} style={{fontSize: '12px'}}> {errorBuildingName} </span>
                                        <div className="card-label py-1 mt-3">
                                            <label style={{}}>Kota (Contoh: Jakarta Pusat)</label>
                                        </div>
                                        <input type="text" className={`py-1 border-only-bottom ${errorCity === "" ? "" : "invalid"}`} onChange={validationCity} style={{fontSize: '14px', width: '-webkit-fill-available'}}/>
                                        <span className={`${errorCity === "" ? "d-none" : ""} text-danger small`} style={{fontSize: '12px'}}> {errorCity} </span>
                                        <div className="card-label py-1 mt-3">
                                            <label style={{}}>Kode Pos (Contoh: 10450)</label>
                                        </div>
                                        <input type="text" className={`py-1 border-only-bottom ${errorPostalCode === "" ? "" : "invalid"}`} onChange={validationPostalCode} style={{fontSize: '14px', width: '-webkit-fill-available'}}/>
                                        <span className={`${errorPostalCode === "" ? "d-none" : ""} text-danger small`} style={{fontSize: '12px'}}> {errorPostalCode} </span>
                                    </div>
                                </div>
                                <div className="card p-2 mb-3" style={{borderRadius: '10px', boxShadow: '1px 1px 2px 2px #bfbfbf'}}>
                                    <div className="card-body" style={{fontSize: '14px'}}>
                                        <div className="card-label py-1">
                                            <label style={{fontWeight: 'bold'}}>No Telepon Penerima</label>
                                        </div>
                                        <input type="text" className={`py-1 border-only-bottom ${errorPhoneNumber === "" ? "" : "invalid"}`} onChange={validationPhoneNumber} style={{fontSize: '14px', width: '-webkit-fill-available'}}/>
                                        <span className={`${errorPhoneNumber === "" ? "d-none" : ""} text-danger small`} style={{fontSize: '12px'}}> {errorPhoneNumber} </span>
                                    </div>
                                </div>
                                <div className="card p-2 mb-5" style={{borderRadius: '10px', boxShadow: '1px 1px 2px 2px #bfbfbf'}}>
                                    <div className="card-body" style={{fontSize: '14px'}}>
                                        <div className="card-label py-1">
                                            <label style={{fontWeight: 'bold'}}>Lokasi Pengiriman</label>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-1 col-md-1 col-2 mb-2">
                                                <img src="/images/map.png" alt="" style={{width: '50px'}}/>
                                            </div>
                                            <div className="col-lg-11 col-md-11 col-10 mb-2">
                                                <input type="text" className={`border-only-bottom ${errorDeliveryLocation === "" ? "" : "invalid"}`} onChange={validationDeliveryLocation} style={{fontSize: '14px', width: '-webkit-fill-available', paddingTop: '20px'}}/>
                                                <span className={`${errorDeliveryLocation === "" ? "d-none" : ""} text-danger small`} style={{fontSize: '12px'}}> {errorDeliveryLocation} </span>
                                            </div>
                                            <span style={{fontWeight: 'bold'}}>Pastikan lokasi yang anda tandai di peta sesuai dengan alamat yang anda isi diatas</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <button className="btn btn-login fw-bold" type="submit" style={{padding: '10px 50px'}}>SIMPAN</button>
                                </div>
                            </form>
                            <LoadingAlert visible={loading} customClass="col-md-2 col-8" />
                            <ConfirmAlert visible={showPopup} titleMessage={alertOption.title} message={alertOption.message} onClick={handlePopup} customClass="col-md-3 col-sm-6 col-8" />
                        </div>
                    </div>
                </div>
        </>
    )
    
}

export default FormAddress


// export default class extends Component {
//     constructor(props){
//         super(props)
//         this.sumbit  = this.sumbit.bind(this)
//         this.validationAddressLabel = this.validationAddressLabel.bind(this)
//         this.validationBuildingName = this.validationBuildingName.bind(this)
//         this.validationBuildingNumber = this.validationBuildingNumber.bind(this)
//         this.validationCity = this.validationCity.bind(this)
//         this.validationDeliveryLocation = this.validationDeliveryLocation.bind(this)
//         this.validationRecipientName = this.validationRecipientName.bind(this)
//         this.validationStreetName = this.validationStreetName.bind(this)
//         this.validationPhonrNumber = this.validationPhonrNumber.bind(this)
//         this.validationPostalCode = this.validationPostalCode.bind(this)
//         this.handlePopup = this.handlePopup.bind(this)
//         this.state = {
//             addressLabel: '',
//             recipientName: '',
//             streetName: '',
//             buildingNumber: '',
//             buildingName: '',
//             city: '',
//             postalCode: '',
//             phoneNumber: '',
//             deliveryLocation: '',
//             errorAddressLabel: '',
//             errorRecipientName: '',
//             errorStreetName: '',
//             errorBuildingNumber: '',
//             errorBuildingName: '',
//             errorCity: '',
//             errorPostalCode: '',
//             errorPhoneNumber: '',
//             errorDeliveryLocation: '',
            
//             showPopup: false,
//             alertOption: {
//                 title: '',
//                 message: ''
//             },
            
//             // id: props.router.params.id
//         }
//     }

//     handlePopup(){
//         this.setState({showPopup: false})
//         this.props.router.navigate("/daftar_alamat")
//     }

//     sumbit(e){
//         e.preventDefault()
//         if (this.state.addressLabel === "") this.setState({errorAddressLabel: "Silahkan isi simpan alamat sebagai"})
//         if (this.state.recipientName === "") this.setState({errorRecipientName: "Silahkan isi nama penerima"})
//         if (this.state.streetName === "") this.setState({errorStreetName: "Silahkan isi nama jalan"})
//         if (this.state.buildingNumber === "") this.setState({errorBuildingNumber: "Silahkan isi nomor gedung/kantor"})
//         if (this.state.buildingName === "") this.setState({errorBuildingName: "Silahkan isi nama gedung/kantor"})
//         if (this.state.city === "") this.setState({errorCity: "Silahkan isi kota"})
//         if (this.state.deliveryLocation === "") this.setState({errorDeliveryLocation: "Silahkan isi lokasi pengiriman"})
//         if(this.state.postalCode === "") this.setState({errorPostalCode: "Silahkan isi kode pos"})
//         if(this.state.phoneNumber === "") this.setState({errorPhoneNumber: 'Silahkan isi nomor penerima'})

        
//         if(this.state.addressLabel !== "" && this.state.recipientName !== "" && this.state.streetName !== "" && this.state.buildingName !== "" && this.state.buildingNumber !== "" && this.state.city !== "" && this.state.deliveryLocation !== "" && this.state.postalCode !== "" && this.state.phoneNumber !== "") {
//             if (this.state.id === '0') {
//                 this.setState({showPopup: true, alertOption: { title: 'Berhasil', message: 'Alamat berhasil ditambah'}})
//                 return
//             } else {
//                 this.setState({showPopup: true, alertOption: { title: 'Berhasil', message: 'Alamat berhasil diperbarui'}})
//                 return
//             }
//         }
//     }

//     validationAddressLabel(e){
//         e.preventDefault()
//         this.setState({addressLabel: e.target.value})
//         if(e.target.value === ""){
//             this.setState({errorAddressLabel: "Silahkan isi simpan alamat sebagai"})
//             return
//         }
//         this.setState({errorAddressLabel: ""})
//     }

//     validationRecipientName(e){
//         e.preventDefault()
//         this.setState({recipientName: e.target.value})
//         if(e.target.value === ""){
//             this.setState({errorRecipientName: "Silahkan isi nama penerima"})
//             return
//         }
//         this.setState({errorRecipientName: ""})
//     }

//     validationStreetName(e){
//         e.preventDefault()
//         this.setState({streetName: e.target.value})
//         if(e.target.value === ""){
//             this.setState({errorStreetName: "Silahkan isi nama jalan"})
//             return
//         }
//         this.setState({errorStreetName: ""})
//     }

//     validationBuildingNumber(e){
//         e.preventDefault()
//         this.setState({buildingNumber: e.target.value})
//         if(e.target.value === ""){
//             this.setState({errorBuildingNumber: "Silahkan isi nomor gedung/kantor"})
//             return
//         }
//         this.setState({errorBuildingNumber: ""})
//     }

//     validationBuildingName(e){
//         e.preventDefault()
//         this.setState({buildingName: e.target.value})
//         if(e.target.value === ""){
//             this.setState({errorBuildingName: "Silahkan isi nama gedung/kantor"})
//             return
//         }
//         this.setState({errorBuildingName: ""})
//     }

//     validationCity(e){
//         e.preventDefault()
//         this.setState({city: e.target.value})
//         if(e.target.value === ""){
//             this.setState({errorCity: "Silahkan isi kota"})
//             return
//         }
//         this.setState({errorCity: ""})
//     }

//     validationDeliveryLocation(e){
//         e.preventDefault()
//         this.setState({deliveryLocation: e.target.value})
//         if(e.target.value === ""){
//             this.setState({errorDeliveryLocation: "Silahkan isi lokasi pengiriman"})
            
//         }
//         this.setState({errorDeliveryLocation: ""})
//     }

//     validationPhonrNumber(e){
//         e.preventDefault()
//         this.setState({phoneNumber: e.target.value})
//         if(e.target.value === ""){
//             this.setState({errorPhoneNumber: 'Silahkan isi nomor telepon penerima'})
//         } else {
//             if(!e.target.value.match("^[0-9]*$") || e.target.value.length < 9 || e.target.value.length > 16) {
//                 this.setState({errorPhoneNumber: 'Nomor tidak valid'})
//                 return
        
//             }
//             this.setState({errorPhoneNumber: ''})
//         }
//     }

//     validationPostalCode(e){
//         e.preventDefault()
//         this.setState({postalCode: e.target.value})
//         if(e.target.value == ""){
//             this.setState({errorPostalCode: "Silahkan isi kode pos"})
//         } else {
//             if(!e.target.value.match("^[0-9]*$")){
//                 this.setState({errorPostalCode: 'Kode pos harus berupa angka'})
//                 return
//             } else {
//                 if(e.target.value.length > 20){
//                     this.setState({errorPostalCode: "Kode pos tidak boleh lebih dari 20 karakter"})
//                     return
//                 }
//             }
//             this.setState({errorPostalCode: ''})
//         }
//     }
        
//     render(){
//         return(
//             <>
//                 <div className="responsive-bar">
//                     <div className="d-flex mx-md-auto my-md-2 my-0 default-height" style={{alignItems: 'baseline', height: '40px'}}>
//                         <h4 className="title-icare title-fitur m-0 p-0 fw-bold" style={{fontSize: '18px'}}>
//                             <Link className="nav-link d-inline me-3" to="/daftar_alamat">
//                                 <i className="fa fa-arrow-left color-arrow-left" style={{ color: '#014C90'}}></i>
//                             </Link>
//                             <span style={{borderBottom: '3px solid #014C90'}}>Tambah Alamat</span>
//                         </h4>
//                     </div>
//                 </div>
//                 <div className="py-lg-0 py-md-0 py-5">
//                     <div className="card p-lg-2 p-md-2 p-0 py-2 shadow border-0 responsive-form" style={{borderRadius: '20px'}}>
//                         <div className="card-body px-lg-0 px-md-0 px-2">
//                             <form onSubmit={this.sumbit}>
//                                 <div className="card p-2 mb-3" style={{borderRadius: '10px', boxShadow: '1px 1px 2px 2px #bfbfbf'}}>
//                                     <div className="card-body" style={{fontSize: '14px'}}>
//                                         <div className="card-label py-1">
//                                             <label style={{fontWeight: 'bold'}}>Simpan Alamat Sebagai (Contoh: Kantor Pusat PT Angin Ribut)</label>
//                                         </div>
//                                         <input type="text" className={`py-1 border-only-bottom ${this.state.errorAddressLabel === "" ? "" : "invalid"}`} onChange={this.validationAddressLabel} style={{fontSize: '14px', width: '-webkit-fill-available'}}/>
//                                         <span className={`${this.state.errorAddressLabel === "" ? "d-none" : ""} text-danger small`} style={{fontSize: '12px'}}> {this.state.errorAddressLabel} </span>
//                                         <div className="card-label py-1 mt-3">
//                                             <label style={{fontWeight: 'bold'}}>Nama Penerima</label>
//                                         </div>
//                                         <input type="text" className={`py-1 border-only-bottom ${this.state.errorRecipientName === "" ? "" : "invalid"}`} onChange={this.validationRecipientName} style={{fontSize: '14px', width: '-webkit-fill-available'}}/>
//                                         <span className={`${this.state.errorRecipientName === "" ? "d-none" : ""} text-danger small`} style={{fontSize: '12px'}}> {this.state.errorRecipientName} </span>
//                                     </div>
//                                 </div>
//                                 <div className="card p-2 mb-3" style={{borderRadius: '10px', boxShadow: '1px 1px 2px 2px #bfbfbf'}}>
//                                     <div className="card-body" style={{fontSize: '14px'}}>
//                                         <label className="mb-3" style={{fontWeight: 'bold'}}>Alamat Lengkap</label>
//                                         <div className="card-label py-1">
//                                             <label style={{}}>Nama Jalan (Contoh: Jl. Keramat Raya)</label>
//                                         </div>
//                                         <input type="text" className={`py-1 border-only-bottom ${this.state.errorStreetName === "" ? "" : "invalid"}`} onChange={this.validationStreetName} style={{fontSize: '14px', width: '-webkit-fill-available'}}/>
//                                         <span className={`${this.state.errorStreetName === "" ? "d-none" : ""} text-danger small`} style={{fontSize: '12px'}}> {this.state.errorStreetName} </span>
//                                         <div className="card-label py-1 mt-3">
//                                             <label style={{}}>Nomor Gedung/Kantor (Contoh: No. 43 / Blok B2 / Kav II)</label>
//                                         </div>
//                                         <input type="text" className={`py-1 border-only-bottom ${this.state.errorBuildingNumber === "" ? "" : "invalid"}`} onChange={this.validationBuildingNumber} style={{fontSize: '14px', width: '-webkit-fill-available'}}/>
//                                         <span className={`${this.state.errorBuildingNumber === "" ? "d-none" : ""} text-danger small`} style={{fontSize: '12px'}}> {this.state.errorBuildingNumber} </span>
//                                         <div className="card-label py-1 mt-3">
//                                             <label style={{}}>Nama Gedung/Kantor (Contoh: Gedung Astagraphia, lantai 4 / Ruko Boulevard / Kios Cetak ABC)</label>
//                                         </div>
//                                         <input type="text" className={`py-1 border-only-bottom ${this.state.errorBuildingName === "" ? "" : "invalid"}`} onChange={this.validationBuildingName} style={{fontSize: '14px', width: '-webkit-fill-available'}}/>
//                                         <span className={`${this.state.errorBuildingName === "" ? "d-none" : ""} text-danger small`} style={{fontSize: '12px'}}> {this.state.errorBuildingName} </span>
//                                         <div className="card-label py-1 mt-3">
//                                             <label style={{}}>Kota (Contoh: Jakarta Pusat)</label>
//                                         </div>
//                                         <input type="text" className={`py-1 border-only-bottom ${this.state.errorCity === "" ? "" : "invalid"}`} onChange={this.validationCity} style={{fontSize: '14px', width: '-webkit-fill-available'}}/>
//                                         <span className={`${this.state.errorCity === "" ? "d-none" : ""} text-danger small`} style={{fontSize: '12px'}}> {this.state.errorCity} </span>
//                                         <div className="card-label py-1 mt-3">
//                                             <label style={{}}>Kode Pos (Contoh: 10450)</label>
//                                         </div>
//                                         <input type="text" className={`py-1 border-only-bottom ${this.state.errorPostalCode === "" ? "" : "invalid"}`} onChange={this.validationPostalCode} style={{fontSize: '14px', width: '-webkit-fill-available'}}/>
//                                         <span className={`${this.state.errorPostalCode === "" ? "d-none" : ""} text-danger small`} style={{fontSize: '12px'}}> {this.state.errorPostalCode} </span>
//                                     </div>
//                                 </div>
//                                 <div className="card p-2 mb-3" style={{borderRadius: '10px', boxShadow: '1px 1px 2px 2px #bfbfbf'}}>
//                                     <div className="card-body" style={{fontSize: '14px'}}>
//                                         <div className="card-label py-1">
//                                             <label style={{fontWeight: 'bold'}}>No Telepon Penerima</label>
//                                         </div>
//                                         <input type="text" className={`py-1 border-only-bottom ${this.state.errorPhoneNumber === "" ? "" : "invalid"}`} onChange={this.validationPhonrNumber} style={{fontSize: '14px', width: '-webkit-fill-available'}}/>
//                                         <span className={`${this.state.errorPhoneNumber === "" ? "d-none" : ""} text-danger small`} style={{fontSize: '12px'}}> {this.state.errorPhoneNumber} </span>
//                                     </div>
//                                 </div>
//                                 <div className="card p-2 mb-5" style={{borderRadius: '10px', boxShadow: '1px 1px 2px 2px #bfbfbf'}}>
//                                     <div className="card-body" style={{fontSize: '14px'}}>
//                                         <div className="card-label py-1">
//                                             <label style={{fontWeight: 'bold'}}>Lokasi Pengiriman</label>
//                                         </div>
//                                         <div className="row">
//                                             <div className="col-lg-1 col-md-1 col-2 mb-2">
//                                                 <img src="/images/map.png" alt="" style={{width: '50px'}}/>
//                                             </div>
//                                             <div className="col-lg-11 col-md-11 col-10 mb-2">
//                                                 <input type="text" className={`border-only-bottom ${this.state.errorDeliveryLocation === "" ? "" : "invalid"}`} onChange={this.validationDeliveryLocation} style={{fontSize: '14px', width: '-webkit-fill-available', paddingTop: '20px'}}/>
//                                                 <span className={`${this.state.errorDeliveryLocation === "" ? "d-none" : ""} text-danger small`} style={{fontSize: '12px'}}> {this.state.errorDeliveryLocation} </span>
//                                             </div>
//                                             <span style={{fontWeight: 'bold'}}>Pastikan lokasi yang anda tandai di peta sesuai dengan alamat yang anda isi diatas</span>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="text-center">
//                                     <button className="btn btn-login fw-bold" type="submit" style={{padding: '10px 50px'}}>SIMPAN</button>
//                                 </div>
//                             </form>
//                             <ConfirmAlert visible={this.state.showPopup} message={this.state.alertOption.message} onClick={this.handlePopup} customClass="col-md-3 col-sm-6 col-8" />
//                         </div>
//                     </div>
//                 </div>
//             </>
//         )
//     }
// }