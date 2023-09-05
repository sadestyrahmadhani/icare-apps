import { Component } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default class extends Component {
    constructor(props) {
        super(props)
        this.submit = this.submit.bind(this)
        this.state = {
            noEq:'',
            model:'',
            keterangan:'',
            errorNoEq:'',
            errorModel:'',
            errorKeterangan:''
        };
    }

    handleNoEqChange = (e) => {
        const value = e.target.value;
        if (value === "") {
            this.setState({ noEq: value, errorNoEq: "Silahkan isi nomor equipment" });
        } else if (/^\d*$/.test(value)) {
            this.setState({ noEq: value, errorNoEq: "" }); // Menghapus pesan kesalahan saat input valid
        } else {
            this.setState({ errorNoEq: "Nomor equipment harus berupa angka" });
        }
    };

    handleModelChange = (e) => {
        const value = e.target.value;
        if (value === "") {
            this.setState({ model: value, errorModel: "Silahkan isi nama model" });
        } else {
            this.setState({ model: value, errorModel: "" }); // Menghapus pesan kesalahan saat input valid
        }
    };
    
    handleKeteranganChange = (e) => {
        const value = e.target.value;
        if (value === "") {
            this.setState({ keterangan: value, errorKeterangan: "Silahkan isi keterangan" });
        } else {
            this.setState({ keterangan: value, errorKeterangan: "" }); // Menghapus pesan kesalahan saat input valid
        }
    };           

    submit(e) {
        e.preventDefault()

        if(this.state.noEq === "") {
            this.setState({errorNoEq:"Silahkan isi nomor equipment"});
        } else {
            this.setState({errorNoEq:""});
        }

        if(!this.state.noEq.match(/^\d*$/)) {
            this.setState({errorNoEq: "Nomor equipment harus berupa angka"});
            return;
        }

        if(this.state.model === "") {
            this.setState({errorModel:"Silahkan isi nama model"});
        }

        if(this.state.keterangan === "") {
            this.setState({errorKeterangan:"Silahkan isi keterangan"});
        }

        Swal.fire({
            title:'Error',
            text:'Input not valid',
            confirmButtonColor:'#0099ff'
        })
    }

    render () {
        return (
            <>
            <div className="container">
                <div className="d-flex" style={{alignItems:'baseline', height:'55px'}}>
                    <Link className="list-items" to="../daftar_eq">
                        <i className="fa fa-arrow-left me-3" style={{fontSize:'16px', color:'#014C90'}}></i>
                        <span className="title-icare fw-bold py-1" style={{borderBottom:'3px solid #014C90', fontSize:'18px'}}>Tambah EQ</span>
                    </Link>
                </div>
                <div className="card shadow border-0" style={{borderRadius:'20px'}}>
                    <form onSubmit={this.submit}>
                        <div className="card-body">
                            <div className="card border-0 mt-2" style={{borderRadius:'15px', boxShadow:'1px 1px 3px 3px #bfbfbf'}}>
                                <div className="card-body">
                                    <div className="card-label">
                                        <label style={{fontWeight: 'bold'}}>No EQ</label>
                                    </div>
                                    <input type="text" className={`form-control border-only-bottom ${this.state.errorNoEq === "" ? "": "invalid"}`} onChange={this.handleNoEqChange} value={this.state.noEq}/>
                                    <span className={`text-danger small ${this.state.errorNoEq === "" ? "d-none": ""}`} style={{fontSize:'12px'}}> {" "} {this.state.errorNoEq} {" "} </span>
                                </div>
                            </div>
                            <div className="card border-0 mt-4" style={{borderRadius:'15px', boxShadow:'1px 1px 3px 3px #bfbfbf'}}>
                                <div className="card-body">
                                    <div className="card-label">
                                        <label style={{fontWeight: 'bold'}}>Nama Model</label>
                                    </div>
                                    <input type="text" className={`form-control border-only-bottom ${this.state.errorModel === "" ? "": "invalid"}`} onChange={this.handleModelChange} value={this.state.model}/>
                                    <span className={`text-danger small ${this.state.errorModel === "" ? "d-none": ""}`} style={{fontSize:'12px'}}> {this.state.errorModel} </span>
                                </div>
                            </div>
                            <div className="card border-0 mt-4" style={{borderRadius:'15px', boxShadow:'1px 1px 3px 3px #bfbfbf'}}>
                                <div className="card-body">
                                    <div className="card-label">
                                        <label style={{fontWeight: 'bold'}}>Keterangan</label>
                                    </div>
                                    <input type="text" className={`form-control border-only-bottom ${this.state.errorKeterangan === "" ? "": "invalid"}`} onChange={this.handleKeteranganChange} value={this.state.keterangan}/>
                                    <span className={`text-danger small ${this.state.errorKeterangan === "" ? "d-none": ""}`} style={{fontSize:'12px'}}> {this.state.errorKeterangan} </span>
                                </div>
                            </div>
                            <Link className="alamat" to="/daftar_alamat">
                            <div className="card border-0 mt-4 pb-5" style={{borderRadius:'15px', boxShadow:'1px 1px 3px 3px #bfbfbf'}}>
                                <div className="card-body">
                                    <div className="card-label">
                                        <label style={{fontWeight: 'bold'}}>Alamat</label>
                                    </div>
                                </div>
                            </div>
                            </Link>
                        </div>
                        <div className="col-md-12 mt-4 mb-4 text-center d-flex justify-content-center">
                            <button name="submit" className="btn btn-login py-2 px-5" style={{fontSize:'14px', maxWidth:'200px', height:'43px'}}>SIMPAN</button>
                        </div>
                    </form>
                </div>
            </div>
            </>
        )
    }
}