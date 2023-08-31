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
                            <form class="d-flex" style={{width:'120%'}}>
                                <span> <i class="fa fa-search fa-fw fa-lg" aria-hidden="true"></i> </span>
                                <input class="form-control form-control-sm ml-3 w-100 border-only-bottom" type="text" aria-label="Search" style={{fontSize: '16px', color:'black'}}></input>
                                <button type="reset" className="btn border-0" style={{background:'none'}}><i className="fa fa-close fa-fw fa-lg" style={{cursor:'pointer'}}></i></button>
                                {/* <input type="reset" class="btn btn-success" value="Reset Button"></input> */}
                            </form>
                        </div>
                        <div className="col-5">
                            <Link to="/form_eq">
                                <button className="btn btn-login" style={{padding: '8px 23px', fontSize: '16px'}}><i className="fa fa-plus" style={{marginRight: '5px'}}></i> Tambah EQ</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="card shadow border-0" style={{borderRadius:'20px'}}>
                        <div className="card-body">
                            <div className="row p-3">
                                <div className="col">
                                    <div className="card border-0" style={{borderRadius:'10px', boxShadow:'1px 1px 3px 3px #bfbfbf'}}>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <span className="text" style={{fontSize:'13px', fontWeight:'bold'}}>71221</span>
                                                        </div>
                                                        <div className="col-12">
                                                            <span className="text" style={{color:'blue', fontSize:'15px', fontWeight:'bold'}}>CobaInsert</span>
                                                        </div>
                                                        <div className="col-12">
                                                            <span className="text" style={{fontSize:'13px', fontWeight:'bold'}}>CobaInsert</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-md-auto">
                                                    <Link className="text-decoration-none" to="/form-eq"><h6 className="text title-icare" style={{marginTop:'50px', fontWeight: 'bold'}}>Ubah</h6></Link>
                                                </div>
                                                <div className="col-md-auto">
                                                    <img src="images/Verified.png" style={{height:'70px'}}></img>
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
                                    <div className="card border-0 mt-2" style={{borderRadius:'10px', boxShadow:'1px 1px 3px 3px #bfbfbf'}}>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <span className="text" style={{fontSize:'13px', fontWeight:'bold'}}>300822</span>
                                                        </div>
                                                        <div className="col-12">
                                                            <span className="text" style={{color:'blue', fontSize:'15px', fontWeight:'bold'}}>model1</span>
                                                        </div>
                                                        <div className="col-12">
                                                            <span className="text" style={{fontSize:'13px', fontWeight:'bold'}}>tes aja</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-auto">
                                                <Link className="text-decoration-none" to="/form-eq"><h6 className="text title-icare" style={{marginTop:'50px', fontWeight: 'bold'}}>Ubah</h6></Link>
                                                </div>
                                                <div className="col-md-auto">
                                                <img src="images/Verified.png" style={{height:'70px'}}></img>
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
                                    <div className="card border-0 mt-2 mb-3" style={{borderRadius:'10px', boxShadow:'1px 1px 3px 3px #bfbfbf'}}>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <span className="text" style={{fontSize:'13px', fontWeight:'bold'}}>798689</span>
                                                        </div>
                                                        <div className="col-12">
                                                            <span className="text" style={{color:'blue', fontSize:'15px', fontWeight:'bold'}}>ApeosPort C2060</span>
                                                        </div>
                                                        <div className="col-12">
                                                            <span className="text" style={{fontSize:'13px', fontWeight:'bold'}}>test</span>
                                                        </div>
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