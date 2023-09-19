import { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import ConfirmAlert from "../../component/alert/confirmAlert";
import { redirect } from "react-router-dom";

export default class extends Component {
    constructor(props) {
        // console.log('props',props)
        // console.log('tes id', props.router.params.id)
        super(props)
        this.state = {
            noEq:'',
            model:'',
            keterangan:'',
            errorNoEq:'',
            errorModel:'',
            errorKeterangan:'',
            showPopup: false,
            showAddedPopup: false,
            isFormValid: false,
            id:props.router.params.id
        };
        this.submit = this.submit.bind(this)
        this.handlePopup = this.handlePopup.bind(this)

        //console.log('actionType', this.state.actionType)
        //console.log('this.props.location.state',this.props.location.state)
        //console.log('this.props.location.param1 ', this.props.location.param1 )
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
    
    handlePopup() {
        this.setState({showAddedPopup: false, showPopup:false})
        if(this.state.isFormValid) {
            window.location.href = "/#/daftar_eq"
        }
    }

    submit(e) {
        e.preventDefault()

        let isValid = true;
        

        if(this.state.noEq === "") {
            // console.log('this.state.noEq === ""')
            this.setState({errorNoEq:"Silahkan isi nomor equipment"});
            isValid = false;
        } else {
            this.setState({errorNoEq:""});
            
        }

        if(!this.state.noEq.match(/^\d*$/)) {
            // console.log('Nomor equipment harus berupa angka')
            this.setState({errorNoEq: "Nomor equipment harus berupa angka"});
            isValid = false;
        }

        if(this.state.model === "") {
            // console.log('Silahkan isi nama model"')
            this.setState({errorModel:"Silahkan isi nama model"});
            isValid = false;
        } else {
            this.setState({errorModel: ""});
        }

        if(this.state.keterangan === "") {
            // console.log('Silahkan isi keterangan')
            this.setState({errorKeterangan:"Silahkan isi keterangan"});
            isValid = false;
        } else {
            this.setState({errorKeterangan: ""});
        }

        this.setState({isFormValid: isValid});

        if(isValid) {
            this.setState({showAddedPopup: true, showPopup: false});
        } else {
            this.setState({showPopup: true, showAddedPopup: false});
        }

        // if (isValid) {
        //     this.setState({showAddedPopup: true, showPopup: false});
        // } else {
        //     this.setState({showPopup: true, showAddedPopup: false});
        // }
    }

    // submit(e) {
    //     e.preventDefault()

    //     this.setState({showAddedPopup: true, showUpdatePopup: false});
    // }

    render () {
        return (
            <>
            <div className="responsive-bar">
                <div className="d-flex mx-md-auto my-md-2 my-0 default-height" style={{alignItems:'baseline', height:'55px'}}>
                    <h4 className="title-icare title-fitur m-0 p-0 fw-bold" style={{fontSize: '18px'}}>
                        <Link className="nav-link d-inline me-3" to="../daftar_eq">
                            <i className="fa fa-arrow-left color-arrow-left" style={{color:'#014C90'}}></i>
                        </Link>
                            <span style={{borderBottom:'3px solid #014C90'}}>Tambah EQ</span>
                    </h4>
                </div>
            </div>
            <div className="py-lg-0 my-md-0 py-5">
                <div className="card shadow border-0 responsive-form" style={{borderRadius:'20px'}}>
                    <form onSubmit={this.submit}>
                        <div className="card-body px-lg-0 px-md-0 px-2">
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
                    <ConfirmAlert visible={this.state.showPopup} titleMessage="Error" message="Input not valid" customClass="col-md-2" onClick={this.handlePopup} />
                    <ConfirmAlert visible={this.state.showAddedPopup} message={this.state.id === '0' ? 'Berhasil menambahkan Eq' : 'Berhasil update Eq'} customClass="col-md-3" onClick={this.handlePopup}/>
                    {/* <ConfirmAlert visible={this.state.showUpdatePopup} message="Berhasil update Eq" customClass="col-md-3" onClick={this.handlePopup}/> */}
                </div>
            </div>
            </>
        )
    }
}