import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";

export default class extends Component {
    render () {
        return (
            <>
            <div className="container">
                <div className="container d-flex">
                        <div className="col-6" >
                            <span className="title-icare fw-bold" style={{borderBottom: '3px solid #014C90', width: '110px', fontSize:'20px'}}>Daftar EQ</span>
                        </div>
                        <div className="col-6 row text-end">
                            <div className="col-7">
                                <form className="d-flex" style={{width:'120%'}}>
                                    <span className="my-auto" style={{color: '#014C90'}}><i className="fa fa-search fa-fw fa-lg"></i></span>
                                    <input type="search" className="form-control me-3 border-0 border-only-bottom" style={{fontSize: '16px'}}/>
                                </form>
                            </div>
                            <div className="col-5">
                                <Link to="/form-eq">
                                    <button className="btn btn-login" style={{padding: '8px 23px', fontSize: '16px'}}><i className="fa fa-plus" style={{marginRight: '5px'}}></i> Tambah EQ</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                <div className="container pt-4">
                    <div className="card shadow border-0" style={{borderRadius:'20px'}}>
                        <div className="card-body">
                            <div className="row p-3">
                                <div className="col">
                                    <div className="card shadow-sm border-0" style={{borderRadius:'10px'}}>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col">
                                                    <div className="card-text">
                                                    <h6>71221</h6>
                                                    <h6 className="text" style={{color:'blue'}}>CobaInsert</h6>
                                                    <h6>CobaInsert</h6>
                                                </div>
                                                </div>

                                                <div className="col-md-auto">
                                                    <Link className="text-decoration-none" to="/form-eq"><h6 className="text title-icare" style={{marginTop:'50px', fontWeight: 'bold'}}>Ubah</h6></Link>
                                                </div>
                                                <div className="col-md-auto">
                                                    <img src="images/approved.png" style={{height:'70px'}}></img>
                                                </div>
                                                <div className="col-md-auto">
                                                <h6 className="text title-icare" style={{marginTop:'50px', fontWeight: 'bold'}}>Hapus</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row p-3">
                                <div className="col">
                                    <div className="card shadow-sm border-0 mt-2" style={{borderRadius:'10px'}}>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col">
                                                    <div className="card-text">
                                                    <h6>300822</h6>
                                                    <h6 className="text" style={{color:'blue'}}>model1</h6>
                                                    <h6>tes aja</h6>
                                                </div>
                                                </div>
                                                <div className="col-md-auto">
                                                <Link className="text-decoration-none" to="/form-eq"><h6 className="text title-icare" style={{marginTop:'50px', fontWeight: 'bold'}}>Ubah</h6></Link>
                                                </div>
                                                <div className="col-md-auto">
                                                <img src="images/approved.png" style={{height:'70px'}}></img>
                                                </div>
                                                <div className="col-md-auto">
                                                <h6 className="text title-icare" style={{marginTop:'50px', fontWeight: 'bold'}}>Hapus</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row p-3">
                                <div className="col">
                                    <div className="card shadow-sm border-0 mt-2 mb-3" style={{borderRadius:'10px'}}>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col">
                                                    <div className="card-text">
                                                    <h6>798689</h6>
                                                    <h6 className="text" style={{color:'blue'}}>ApeosPort C2060</h6>
                                                    <h6>test</h6>
                                                </div>
                                                </div>
                                                <div className="col-md-auto">
                                                <Link className="text-decoration-none" to="/form-eq"><h6 className="text title-icare" style={{marginTop:'50px', fontWeight: 'bold'}}>Ubah</h6></Link>
                                                </div>
                                                <div className="col-md-auto" style={{marginRight:'70px'}}>
                                                    {/* <img src="images/approved.png"></img> */}
                                                </div>
                                                <div className="col-md-auto">
                                                <h6 className="text title-icare" style={{marginTop:'50px', fontWeight: 'bold'}}>Hapus</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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