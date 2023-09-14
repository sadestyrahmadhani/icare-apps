import { Component } from "react";
import { Link } from "react-router-dom";
import ConfirmAlert from "../../component/alert/confirmAlert";

export default class extends Component {
    constructor(props){
        super(props)
        this.sumbit  = this.sumbit.bind(this)
        this.validationAddressLabel = this.validationAddressLabel.bind(this)
        this.validationBuildingName = this.validationBuildingName.bind(this)
        this.validationBuildingNumber = this.validationBuildingNumber.bind(this)
        this.validationCity = this.validationCity.bind(this)
        this.validationDeliveryLocation = this.validationDeliveryLocation.bind(this)
        this.validationRecipientName = this.validationRecipientName.bind(this)
        this.validationStreetName = this.validationStreetName.bind(this)
        this.validationPhonrNumber = this.validationPhonrNumber.bind(this)
        this.validationPostalCode = this.validationPostalCode.bind(this)
        this.handlePopup = this.handlePopup.bind(this)
        this.state = {
            addressLabel: '',
            recipientName: '',
            streetName: '',
            buildingNumber: '',
            buildingName: '',
            city: '',
            postalCode: '',
            phoneNumber: '',
            deliveryLocation: '',
            errorAddressLabel: '',
            errorRecipientName: '',
            errorStreetName: '',
            errorBuildingNumber: '',
            errorBuildingName: '',
            errorCity: '',
            errorPostalCode: '',
            errorPhoneNumber: '',
            errorDeliveryLocation: '',

            showPopup: false,
            alertOption: {
                title: '',
                message: ''
            }
        }
    }

    handlePopup(){
        this.setState({showPopup: false})
        this.props.router.navigate("/daftar_alamat")
    }

    sumbit(e){
        e.preventDefault()
        if (this.state.addressLabel === "") this.setState({errorAddressLabel: "Silahkan isi simpan alamat sebagai"})
        if (this.state.recipientName === "") this.setState({errorRecipientName: "Silahkan isi nama penerima"})
        if (this.state.streetName === "") this.setState({errorStreetName: "Silahkan isi nama jalan"})
        if (this.state.buildingNumber === "") this.setState({errorBuildingNumber: "Silahkan isi nomor gedung/kantor"})
        if (this.state.buildingName === "") this.setState({errorBuildingName: "Silahkan isi nama gedung/kantor"})
        if (this.state.city === "") this.setState({errorCity: "Silahkan isi kota"})
        if (this.state.deliveryLocation === "") this.setState({errorDeliveryLocation: "Silahkan isi lokasi pengiriman"})

        if(this.state.postalCode === "") this.setState({errorPostalCode: "Silahkan isi kode pos"})
        if(this.state.phoneNumber === "") this.setState({errorPhoneNumber: 'Silahkan isi nomor penerima'})
        
        if(this.state.addressLabel !== "" && this.state.recipientName !== "" && this.state.streetName !== "" && this.state.buildingName !== "" && this.state.buildingNumber !== "" && this.state.city !== "" && this.state.deliveryLocation !== "" && this.state.postalCode !== "" && this.state.phoneNumber !== "") {
            // this.props.router.navigate("/daftar_alamat")
            this.setState({showPopup: true, alertOption: { title: 'Berhasil', message: 'Alamat berhasil ditambah'}})
            return
        }

        // if(this.state.addressLabel === "" )
    }

    validationAddressLabel(e){
        e.preventDefault()
        this.setState({addressLabel: e.target.value})
        if(e.target.value === ""){
            this.setState({errorAddressLabel: "Silahkan isi simpan alamat sebagai"})
        }
        this.setState({errorAddressLabel: ""})
    }

    validationRecipientName(e){
        e.preventDefault()
        this.setState({recipientName: e.target.value})
        if(e.target.value === ""){
            this.setState({errorRecipientName: "Silahkan isi nama penerima"})
        }
        this.setState({errorRecipientName: ""})
    }

    validationStreetName(e){
        e.preventDefault()
        this.setState({streetName: e.target.value})
        if(e.target.value === ""){
            this.setState({errorStreetName: "Silahkan isi nama jalan"})
        }
        this.setState({errorStreetName: ""})
    }

    validationBuildingNumber(e){
        e.preventDefault()
        this.setState({buildingNumber: e.target.value})
        if(e.target.value === ""){
            this.setState({errorBuildingNumber: "Silahkan isi nomor gedung/kantor"})
        }
        this.setState({errorBuildingNumber: ""})
    }

    validationBuildingName(e){
        e.preventDefault()
        this.setState({buildingName: e.target.value})
        if(e.target.value === ""){
            this.setState({errorBuildingName: "Silahkan isi nama gedung/kantor"})
        }
        this.setState({errorBuildingName: ""})
    }

    validationCity(e){
        e.preventDefault()
        this.setState({city: e.target.value})
        if(e.target.value === ""){
            this.setState({errorCity: "Silahkan isi kota"})
        }
        this.setState({errorCity: ""})
    }

    validationDeliveryLocation(e){
        e.preventDefault()
        this.setState({deliveryLocation: e.target.value})
        if(e.target.value === ""){
            this.setState({errorDeliveryLocation: "Silahkan isi lokasi pengiriman"})
        }
        this.setState({errorDeliveryLocation: ""})
    }

    validationPhonrNumber(e){
        e.preventDefault()
        this.setState({phoneNumber: e.target.value})
        if(!e.target.value.match("^[0-9]*$") || e.target.value.length < 9 || e.target.value.length > 16) {
            this.setState({errorPhoneNumber: 'Nomor tidak valid'})
            return
        }
        this.setState({errorPhoneNumber: ''})
    }

    validationPostalCode(e){
        e.preventDefault()
        this.setState({postalCode: e.target.value})
        if(e.target.value == ""){
            this.setState({errorPostalCode: "Silahkan isi kode pos"})
        } else {
            if(!e.target.value.match("^[0-9]*$")){
                this.setState({errorPostalCode: 'Kode pos harus berupa angka'})
                return
            } else {
                if(e.target.value.length > 20){
                    this.setState({errorPostalCode: "Kode pos tidak boleh lebih dari 20 karakter"})
                    return
                }
            }
            this.setState({errorPostalCode: ''})
        }
    }
        
    render(){
        return(
            <>
                <div className="container">
                    <div className="d-flex mb-4" style={{alignItems: 'baseline', height: '40px'}}>
                        <Link className="list-items" to="/daftar_alamat">
                            <i className="fa fa-arrow-left me-3" style={{fontSize: '16px', color: '#014C90'}}></i>
                        </Link>
                        <span className="title-icare fw-bold py-1" style={{borderBottom: '3px solid #014C90', fontSize: '16px'}}>Tambah Alamat</span>
                    </div>
                    <div className="card p-2 shadow border-0" style={{borderRadius: '20px'}}>
                        <div className="card-body">
                            <form onSubmit={this.sumbit}>
                                <div className="card p-2 mb-3" style={{borderRadius: '10px', boxShadow: '1px 1px 2px 2px #bfbfbf'}}>
                                    <div className="card-body" style={{fontSize: '14px'}}>
                                        <div className="card-label py-1">
                                            <label style={{fontWeight: 'bold'}}>Simpan Alamat Sebagai (Contoh: Kantor Pusat PT Angin Ribut)</label>
                                        </div>
                                        <input type="text" className={`py-1 border-only-bottom ${this.state.errorAddressLabel === "" ? "" : "invalid"}`} onChange={this.validationAddressLabel} style={{fontSize: '14px', width: '-webkit-fill-available'}}/>
                                        <span className={`${this.state.errorAddressLabel === "" ? "d-none" : ""} text-danger small`} style={{fontSize: '12px'}}> {this.state.errorAddressLabel} </span>
                                        <div className="card-label py-1 mt-3">
                                            <label style={{fontWeight: 'bold'}}>Nama Penerima</label>
                                        </div>
                                        <input type="text" className={`py-1 border-only-bottom ${this.state.errorRecipientName === "" ? "" : "invalid"}`} onChange={this.validationRecipientName} style={{fontSize: '14px', width: '-webkit-fill-available'}}/>
                                        <span className={`${this.state.errorRecipientName === "" ? "d-none" : ""} text-danger small`} style={{fontSize: '12px'}}> {this.state.errorRecipientName} </span>
                                    </div>
                                </div>
                                <div className="card p-2 mb-3" style={{borderRadius: '10px', boxShadow: '1px 1px 2px 2px #bfbfbf'}}>
                                    <div className="card-body" style={{fontSize: '14px'}}>
                                        <label className="mb-3" style={{fontWeight: 'bold'}}>Alamat Lengkap</label>
                                        <div className="card-label py-1">
                                            <label style={{}}>Nama Jalan (Contoh: Jl. Keramat Raya)</label>
                                        </div>
                                        <input type="text" className={`py-1 border-only-bottom ${this.state.errorStreetName === "" ? "" : "invalid"}`} onChange={this.validationStreetName} style={{fontSize: '14px', width: '-webkit-fill-available'}}/>
                                        <span className={`${this.state.errorStreetName === "" ? "d-none" : ""} text-danger small`} style={{fontSize: '12px'}}> {this.state.errorStreetName} </span>
                                        <div className="card-label py-1 mt-3">
                                            <label style={{}}>Nomor Gedung/Kantor (Contoh: No. 43 / Blok B2 / Kav II)</label>
                                        </div>
                                        <input type="text" className={`py-1 border-only-bottom ${this.state.errorBuildingNumber === "" ? "" : "invalid"}`} onChange={this.validationBuildingNumber} style={{fontSize: '14px', width: '-webkit-fill-available'}}/>
                                        <span className={`${this.state.errorBuildingNumber === "" ? "d-none" : ""} text-danger small`} style={{fontSize: '12px'}}> {this.state.errorBuildingNumber} </span>
                                        <div className="card-label py-1 mt-3">
                                            <label style={{}}>Nama Gedung/Kantor (Contoh: Gedung Astagraphia, lantai 4 / Ruko Boulevard / Kios Cetak ABC)</label>
                                        </div>
                                        <input type="text" className={`py-1 border-only-bottom ${this.state.errorBuildingName === "" ? "" : "invalid"}`} onChange={this.validationBuildingName} style={{fontSize: '14px', width: '-webkit-fill-available'}}/>
                                        <span className={`${this.state.errorBuildingName === "" ? "d-none" : ""} text-danger small`} style={{fontSize: '12px'}}> {this.state.errorBuildingName} </span>
                                        <div className="card-label py-1 mt-3">
                                            <label style={{}}>Kota (Contoh: Jakarta Pusat)</label>
                                        </div>
                                        <input type="text" className={`py-1 border-only-bottom ${this.state.errorCity === "" ? "" : "invalid"}`} onChange={this.validationCity} style={{fontSize: '14px', width: '-webkit-fill-available'}}/>
                                        <span className={`${this.state.errorCity === "" ? "d-none" : ""} text-danger small`} style={{fontSize: '12px'}}> {this.state.errorCity} </span>
                                        <div className="card-label py-1 mt-3">
                                            <label style={{}}>Kode Pos (Contoh: 10450)</label>
                                        </div>
                                        <input type="text" className={`py-1 border-only-bottom ${this.state.errorPostalCode === "" ? "" : "invalid"}`} onChange={this.validationPostalCode} style={{fontSize: '14px', width: '-webkit-fill-available'}}/>
                                        <span className={`${this.state.errorPostalCode === "" ? "d-none" : ""} text-danger small`} style={{fontSize: '12px'}}> {this.state.errorPostalCode} </span>
                                    </div>
                                </div>
                                <div className="card p-2 mb-3" style={{borderRadius: '10px', boxShadow: '1px 1px 2px 2px #bfbfbf'}}>
                                    <div className="card-body" style={{fontSize: '14px'}}>
                                        <div className="card-label py-1">
                                            <label style={{fontWeight: 'bold'}}>No Telepon Penerima</label>
                                        </div>
                                        <input type="text" className={`py-1 border-only-bottom ${this.state.errorPhoneNumber === "" ? "" : "invalid"}`} onChange={this.validationPhonrNumber} style={{fontSize: '14px', width: '-webkit-fill-available'}}/>
                                        <span className={`${this.state.errorPhoneNumber === "" ? "d-none" : ""} text-danger small`} style={{fontSize: '12px'}}> {this.state.errorPhoneNumber} </span>
                                    </div>
                                </div>
                                <div className="card p-2 mb-5" style={{borderRadius: '10px', boxShadow: '1px 1px 2px 2px #bfbfbf'}}>
                                    <div className="card-body" style={{fontSize: '14px'}}>
                                        <div className="card-label py-1">
                                            <label style={{fontWeight: 'bold'}}>Lokasi Pengiriman</label>
                                        </div>
                                        <div className="row">
                                            <div className="col-1 mb-2">
                                                <img src="/images/map.png" alt="" style={{width: '50px'}}/>
                                            </div>
                                            <div className="col-11 mb-2">
                                                <input type="text" className={`border-only-bottom ${this.state.errorDeliveryLocation === "" ? "" : "invalid"}`} onChange={this.validationDeliveryLocation} style={{fontSize: '14px', width: '-webkit-fill-available', paddingTop: '20px'}}/>
                                                <span className={`${this.state.errorDeliveryLocation === "" ? "d-none" : ""} text-danger small`} style={{fontSize: '12px'}}> {this.state.errorDeliveryLocation} </span>
                                            </div>
                                            <span style={{fontWeight: 'bold'}}>Pastikan lokasi yang anda tandai di peta sesuai dengan alamat yang anda isi diatas</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <button className="btn btn-login fw-bold" type="submit" style={{padding: '10px 50px'}}>SIMPAN</button>
                                </div>
                            </form>
                            <ConfirmAlert visible={this.state.showPopup} message={this.state.alertOption.message} onClick={this.handlePopup} customClass="col-md-3 col-sm-6 col-12" />
                        </div>
                    </div>
                </div>
            </>
        )
    }
}