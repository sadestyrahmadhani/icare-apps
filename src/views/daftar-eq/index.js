import React from "react";
import { Component } from "react";

export default class extends Component {
    render () {
        return (
            <>
            <div className="container pt-5 pb-5">
                <div className="container pt-5">
                    <div className="row">
                        <div className="col">
                            <h4 style={{color:'darkblue'}}>Daftar EQ</h4>
                            <hr style={{width:'20%', border:'2px solid', borderColor:'blue'}}/>
                        </div>
                        <div className="col-md-auto">
                            <form className="search">
                                <i className="fa fa-search"></i>
                                <input type="text" placeholder="" name="search"></input>
                                <i className="fa fa-close"></i>
                            </form>
                        </div>
                        <div className="col-md-auto">
                        <button className="btn btn-primary">
                            <i className="fa fa-plus" style={{marginRight:'10px'}}></i>
                            Tambah EQ
                        </button>
                        </div>
                    </div>
                </div>
                <div className="container pt-4">
                    <div className="card border-0" style={{boxShadow:'5px 5px 20px 20px rgba(0, 0, 0, 0.1)', padding:'30px'}}>
                        <div className="card-body">
                            <div className="row">
                                <div className="col">
                                    <div className="card border-0" style={{boxShadow:'1px 1px 10px 10px rgba(0, 0, 0, 0.1)'}}>
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
                                                    <h6 className="text title-icare" style={{marginTop:'50px'}}>Ubah</h6>
                                                </div>
                                                <div className="col-md-auto">
                                                    <img src="images/approved.png" style={{height:'70px'}}></img>
                                                </div>
                                                <div className="col-md-auto">
                                                <h6 className="text title-icare" style={{marginTop:'50px'}}>Hapus</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row pt-5">
                                <div className="col">
                                    <div className="card border-0" style={{boxShadow:'1px 1px 10px 10px rgba(0, 0, 0, 0.1)'}}>
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
                                                    <h6 className="text title-icare" style={{marginTop:'50px'}}>Ubah</h6>
                                                </div>
                                                <div className="col-md-auto">
                                                <img src="images/approved.png" style={{height:'70px'}}></img>
                                                </div>
                                                <div className="col-md-auto">
                                                <h6 className="text title-icare" style={{marginTop:'50px'}}>Hapus</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row pt-5">
                                <div className="col">
                                    <div className="card border-0" style={{boxShadow:'1px 1px 10px 10px rgba(0, 0, 0, 0.1)'}}>
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
                                                    <h6 className="text title-icare" style={{marginTop:'50px'}}>Ubah</h6>
                                                </div>
                                                <div className="col-md-auto" style={{marginRight:'70px'}}>
                                                    {/* <img src="images/approved.png"></img> */}
                                                </div>
                                                <div className="col-md-auto">
                                                <h6 className="text title-icare" style={{marginTop:'50px'}}>Hapus</h6>
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