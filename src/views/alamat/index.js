import { Component } from "react";
import 'font-awesome/css/font-awesome.min.css';
import { Link } from "react-router-dom";

export default class extends Component{
    render(){
        return (
            <>
                <div className="header">
                    <div className="container mb-5 d-flex mt-2">
                        <div className="col-6" >
                            <h4 className="title-icare fw-bold" style={{borderBottom: '4px solid #014C90', width: '210px'}}>Pengaturan Alamat</h4>
                        </div>
                        <div className="col-6 row text-end">
                            <div className="col-7">
                                <form className="d-flex">
                                    <span className="my-auto" style={{color: '#014C90'}}><i className="fa fa-search fa-fw fa-lg"></i></span>
                                    <input type="search" className="form-control me-3 border-0 border-only-bottom" style={{fontSize: '16px'}}/>
                                </form>
                            </div>
                            <div className="col-5">
                                <Link to="/form-address">
                                    <button className="btn btn-login" style={{padding: '8px 23px', fontSize: '16px'}}><i className="fa fa-plus" style={{marginRight: '5px'}}></i> Tambah Alamat</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card shadow-sm rounded m-5">
                        <div className="card-body px-3">
                            <h6 className="card-title title-icare fw-bold" >Kantor Pusat</h6>
                            <div className="row fw-bold">
                                <div className="col-6">
                                    <p className="mb-0" style={{fontSize:'14px'}}>Ima</p>
                                    <table className="table table-borderless mb-0">
                                        <thead>
                                            <tbody className="px-auto py-auto">
                                                <tr key="row">
                                                    <td>Jalan</td>
                                                    <td>:</td>
                                                    <td>Blimbing No 47, Pandanwangi</td>
                                                </tr>
                                                <tr key="row">
                                                    <td>No Gedung</td>
                                                    <td>:</td>
                                                    <td>D42</td>
                                                </tr>
                                                <tr key="row">
                                                    <td>Nama Gedung</td>
                                                    <td>:</td>
                                                    <td>Araya Hill</td>
                                                </tr>
                                                <tr key="row">
                                                    <td>082111999765</td>
                                                </tr>  
                                            </tbody>
                                            <i className="fa fa-map-marker fa-lg" style={{marginRight: '5px'}}></i> <span className="title-icare fs-6"> Sudah Pinpoint</span>
                                        </thead>
                                    </table>
                                </div>
                                <div className="col-md-6 col-sm-6 col-12 text-end">
                                    <i className="fa fa-check-square fa-5x text-success me-3"></i>
                                    {/* <img src="images/verify.png" alt="" /> */}
                                    <div className="">
                                        <ol className="title-icare mb-0">
                                            {/* <li className="nav-item">
                                                <Link className="nav-link">Utamakan</Link>
                                            </li> */}
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/form-address">Ubah</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link">Hapus</Link>
                                            </li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card shadow-sm rounded m-5">
                        <div className="card-body px-3">
                            <h6 className="card-title title-icare fw-bold" >Kantor Pusat Cabang 2</h6>
                            <div className="row fw-bold">
                                <div className="col-6">
                                    <p className="mb-0" style={{fontSize:'14px'}}>Andi</p>
                                    <table className="table table-borderless mb-0">
                                        <thead>
                                            <tbody className="px-auto py-auto">
                                                <tr key="row">
                                                    <td>Jalan</td>
                                                    <td>:</td>
                                                    <td>Candi Borobudur No 22, Lowokwaru</td>
                                                </tr>
                                                <tr key="row">
                                                    <td>No Gedung</td>
                                                    <td>:</td>
                                                    <td>8</td>
                                                </tr>
                                                <tr key="row">
                                                    <td>Nama Gedung</td>
                                                    <td>:</td>
                                                    <td>Sukarno Hatta Hill</td>
                                                </tr>
                                                <tr key="row">
                                                    <td>082111999765</td>
                                                </tr>  
                                            </tbody>
                                            <i className="fa fa-map-marker fa-lg"></i> <span className="title-icare fs-6"> Sudah Pinpoint</span>
                                        </thead>
                                    </table>
                                </div>
                                <div className="col-md-6 col-sm-6 col-12 text-end">
                                    {/* <i className="fa fa-check-square fa-5x text-success me-3"></i> */}
                                    {/* <img src="images/verify.png" alt="" /> */}
                                    <div style={{marginTop: "70px"}}>
                                        <ol className="title-icare mb-0">
                                            <li className="nav-item">
                                                <Link className="nav-link">Utamakan</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link">Ubah</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link">Hapus</Link>
                                            </li>
                                        </ol>
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