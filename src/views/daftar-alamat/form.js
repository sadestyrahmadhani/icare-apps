import { Component } from "react";
import { Link } from "react-router-dom";

export default class extends Component {
    constructor(props){
        super(props)
        this.sumbit  = this.sumbit.bind(this)
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
            errorDeliveryLocation: ''
        }
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
        if(this.state.postalCode !== Number) {
            this.setState({errorPostalCode: "Kode pos harus berupa angka"})
            if (this.state.postalCode === "")this.setState({errorPostalCode: "Silahkan isi kode pos"})
        }
        if(this.state.phoneNumber !== Number) {
            this.setState({errorPhoneNumber: "Nomor tidak valid"})
            if (this.state.phoneNumber === "") this.setState({errorPhoneNumber: "Silahkan isi nomor telepon penerima"})
        }
    }
        
    render(){
        return(
            <>
                <div className="container">
                    <div className="d-flex align-items-center mb-4">
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
                                        <input type="text" className={`py-1 border-only-bottom ${this.state.errorAddressLabel === "" ? "" : "invalid"}`} onChange={(e) => this.setState({addressLabel:e.target.value})} style={{fontSize: '14px', width: '-webkit-fill-available'}}/>
                                        <span className={`${this.state.errorAddressLabel === "" ? "d-none" : ""} text-danger small`} style={{fontSize: '12px'}}> {this.state.errorAddressLabel} </span>
                                        <div className="card-label py-1 mt-3">
                                            <label style={{fontWeight: 'bold'}}>Nama Penerima</label>
                                        </div>
                                        <input type="text" className={`py-1 border-only-bottom ${this.state.errorRecipientName === "" ? "" : "invalid"}`} onChange={(e) => this.setState({recipientName:e.target.value})} style={{fontSize: '14px', width: '-webkit-fill-available'}}/>
                                        <span className={`${this.state.errorRecipientName === "" ? "d-none" : ""} text-danger small`} style={{fontSize: '12px'}}> {this.state.errorRecipientName} </span>
                                    </div>
                                </div>
                                <div className="card p-2 mb-3" style={{borderRadius: '10px', boxShadow: '1px 1px 2px 2px #bfbfbf'}}>
                                    <div className="card-body" style={{fontSize: '14px'}}>
                                        <label className="mb-3" style={{fontWeight: 'bold'}}>Alamat Lengkap</label>
                                        <div className="card-label py-1">
                                            <label style={{}}>Nama Jalan (Contoh: Jl. Keramat Raya)</label>
                                        </div>
                                        <input type="text" className={`py-1 border-only-bottom ${this.state.errorStreetName === "" ? "" : "invalid"}`} onChange={(e) => this.setState({streetName:e.target.value})} style={{fontSize: '14px', width: '-webkit-fill-available'}}/>
                                        <span className={`${this.state.errorStreetName === "" ? "d-none" : ""} text-danger small`} style={{fontSize: '12px'}}> {this.state.errorStreetName} </span>
                                        <div className="card-label py-1 mt-3">
                                            <label style={{}}>Nomor Gedung/Kantor (Contoh: No. 43 / Blok B2 / Kav II)</label>
                                        </div>
                                        <input type="text" className={`py-1 border-only-bottom ${this.state.errorBuildingNumber === "" ? "" : "invalid"}`} onChange={(e) => this.setState({buildingNumber:e.target.value})} style={{fontSize: '14px', width: '-webkit-fill-available'}}/>
                                        <span className={`${this.state.errorBuildingNumber === "" ? "d-none" : ""} text-danger small`} style={{fontSize: '12px'}}> {this.state.errorBuildingNumber} </span>
                                        <div className="card-label py-1 mt-3">
                                            <label style={{}}>Nama Gedung/Kantor (Contoh: Gedung Astagraphia, lantai 4 / Ruko Boulevard / Kios Cetak ABC)</label>
                                        </div>
                                        <input type="text" className={`py-1 border-only-bottom ${this.state.errorBuildingName === "" ? "" : "invalid"}`} onChange={(e) => this.setState({buildingName:e.target.value})} style={{fontSize: '14px', width: '-webkit-fill-available'}}/>
                                        <span className={`${this.state.errorBuildingName === "" ? "d-none" : ""} text-danger small`} style={{fontSize: '12px'}}> {this.state.errorBuildingName} </span>
                                        <div className="card-label py-1 mt-3">
                                            <label style={{}}>Kota (Contoh: Jakarta Pusat)</label>
                                        </div>
                                        <input type="text" className={`py-1 border-only-bottom ${this.state.errorCity === "" ? "" : "invalid"}`} onChange={(e) => this.setState({city:e.target.value})} style={{fontSize: '14px', width: '-webkit-fill-available'}}/>
                                        <span className={`${this.state.errorCity === "" ? "d-none" : ""} text-danger small`} style={{fontSize: '12px'}}> {this.state.errorCity} </span>
                                        <div className="card-label py-1 mt-3">
                                            <label style={{}}>Kode Pos (Contoh: 10450)</label>
                                        </div>
                                        <input type="text" className={`py-1 border-only-bottom ${this.state.errorPostalCode === "" ? "" : "invalid"}`} onChange={(e) => this.setState({postalCode:e.target.value})} style={{fontSize: '14px', width: '-webkit-fill-available'}}/>
                                        <span className={`${this.state.errorPostalCode === "" ? "d-none" : ""} text-danger small`} style={{fontSize: '12px'}}> {this.state.errorPostalCode} </span>
                                    </div>
                                </div>
                                <div className="card p-2 mb-3" style={{borderRadius: '10px', boxShadow: '1px 1px 2px 2px #bfbfbf'}}>
                                    <div className="card-body" style={{fontSize: '14px'}}>
                                        <div className="card-label py-1">
                                            <label style={{fontWeight: 'bold'}}>No Telepon Penerima</label>
                                        </div>
                                        <input type="text" className={`py-1 border-only-bottom ${this.state.errorPhoneNumber === "" ? "" : "invalid"}`} onChange={(e) => this.setState({phoneNumber:e.target.value})} style={{fontSize: '14px', width: '-webkit-fill-available'}}/>
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
                                                <input type="text" className={`border-only-bottom ${this.state.errorDeliveryLocation === "" ? "" : "invalid"}`} onChange={(e) => this.setState({deliveryLocation:e.target.value})} style={{fontSize: '14px', width: '-webkit-fill-available', paddingTop: '20px'}}/>
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
                        </div>
                    </div>
                </div>
            </>
        )
    }
}