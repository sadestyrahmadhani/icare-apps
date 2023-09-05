import React from "react";
import {Component} from "react";
import Swal from "sweetalert2";

export default class extends Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this)
        this.state = {
            isEditName: false,
            isEditPhone: false,
            name: "Indri",
            email: "indri_moshy@yahoo.com",
            phone: "+6289619333857",
            instansi: "3pm",
            dataName: "",
            dataPhone: "",
            errorDataName: "",
            errorDataPhone: "",
        };
    }

    handleEditName = () => {
        this.setState({isEditName: true});
    };

    handleEditPhone = () => {
        this.setState({isEditPhone: true});
    };

    handleChangeName = (event) => {
        this.setState({name: event.target.value,});
    };

    handleChangePhone = (event) => {
        this.setState({phone: event.target.value});
    };

    handleSubmitName = () => {
        this.setState({isEditName: false});
    }

    handleSubmitPhone = () => {
        this.setState({isEditPhone: false});
    }

    submit(e) {
        e.preventDefault();

        let isValid = true;
    
        if (this.state.name === "") {
            this.setState({ errorDataName: 'Silahkan isi nama' });
            isValid = false;
        } else {
            this.setState({ errorDataName: '' });
        }
    
        if (this.state.phone === "") {
            this.setState({ errorDataPhone: 'Silahkan isi nomor telepon' });
            isValid = false;
        } else {
            this.setState({ errorDataPhone: '' });
        }
    
        if (this.state.name !== "" && this.state.phone !== "") {
            Swal.fire({
                text: `Success update nama & email: ${this.state.name}`,
                confirmButtonColor: '#0099ff',
            });
        } else {
            Swal.fire({
                title: 'Error',
                text: 'Input tidak valid',
                confirmButtonColor: '#0099ff',
            });
        }
    }
    

    render () {
        return (
            <>
            <div className="container">
                <div className="responsive-bar">
                    <div className="card-title mb-md-4 m-0 p-0">
                        <strong className="title-icare" style={{ fontSize: 20, borderBottom: '3px solid #014C90' }} > Data Diri </strong>
                    </div>
                </div>
                <div className="responsive-data-diri">
                    <div className="card px-3 mt-4 shadow border-0" style={{borderRadius:'20px'}}>
                        <div className="card-body">
                            <div className="row">
                                <div className="card-lable p-md-2 py-0" style={{backgroundColor:'#014C90'}}>
                                    <label className="fw-medium" style={{fontSize:'13px', color:'white'}}>Nama</label>
                                </div>
                                <div className="card-body d-flex align-items-center mb-4 custom-width" style={{border: '1px solid black', height: '45px', position:'relative'}}>
                                    {this.state.isEditName ? (
                                        <div className="card-text flex-grow-1">
                                            <input type="text" className={`form-control w-100 no-hover ${ this.state.errorDataName !== '' ? 'border-danger border' : '' }` } value={this.state.name} onChange={this.handleChangeName} />
                                            <span className={`text-danger small ${ this.state.errorDataName !== '' ? '' : 'd-none' }`} style={{fontSize:'12px', position:'absolute'}} >{ this.state.errorDataName }</span>
                                        </div>
                                    ) : (
                                        <div className="card-text flex-grow-1 p-2 mt-2 w-100">
                                            <h6>{this.state.name}</h6>
                                        </div>
                                    )}
                                    <div className="col-md-auto">
                                        {this.state.isEditName ? (
                                            <button
                                                className="btn data-diri w-100"
                                                onClick={this.handleSubmitName}
                                            >
                                                Submit
                                            </button>
                                        ) : (
                                            <button
                                                className="btn data-diri w-100"
                                                onClick={this.handleEditName}
                                            >
                                                Edit
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <div className="card-lable p-2" style={{backgroundColor:'#014C90'}}>
                                    <label className="fw-medium" style={{fontSize:'13px', color:'white'}}>Email</label>
                                </div>
                                <div className="mb-4 p-2" style={{border: '1px solid black'}}>
                                    <h6>{this.state.email}</h6>
                                </div>
                                <div className="card-lable p-2" style={{backgroundColor:'#014C90'}}>
                                    <label className="fw-medium" style={{fontSize:'13px', color:'white'}}>No Telepon</label>
                                </div>
                                <div className="card-body d-flex align-items-center mb-4 custom-width" style={{border: '1px solid black', height: '45px', position:'relative'}}>
                                    {this.state.isEditPhone ? (
                                        <div className="card-text flex-grow-1">
                                                <input type="text" className={ `form-control input-data py-2 w-100 no-hover ${ this.state.errorDataPhone !== '' ? 'border-danger border' : '' }` } value={this.state.phone} onChange={this.handleChangePhone}/>
                                                <span className={`text-danger small ${ this.state.errorDataPhone !== '' ? '' : 'd-none' }`} style={{fontSize:'12px', position:'absolute'}} >{ this.state.errorDataPhone }</span>
                                        </div>
                                    ) : (
                                        <div className="card-text flex-grow-1 p-2 mt-2 w-100">
                                            <h6>{this.state.phone}</h6>
                                        </div>
                                    )}
                                    <div className="col-md-auto">
                                        {this.state.isEditPhone ? (
                                            <button
                                                className="btn data-diri w-100"
                                                onClick={this.handleSubmitPhone}
                                            >
                                                Submit
                                            </button>
                                        ) : (
                                            <button
                                                className="btn data-diri w-100"
                                                onClick={this.handleEditPhone}
                                            >
                                                Edit
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <div className="card-lable p-2" style={{backgroundColor:'#014C90'}}>
                                    <label className="fw-medium" style={{fontSize:'13px', color:'white'}}>Nama Perusahaan/Instansi</label>
                                </div>
                                <div className="mb-4 p-2" style={{border: '1px solid black'}}>
                                    <h6>{this.state.instansi}</h6>
                                </div>
                                <div className="col-md-12 text-center d-flex justify-content-center">
                                    <button className="btn btn-login py-2 px-5" style={{fontSize:'12px', maxWidth:'200px'}} onClick={this.submit}>SUBMIT</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </>
        )
    }
}