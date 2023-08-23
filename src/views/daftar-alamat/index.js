import { Component } from "react";
import 'font-awesome/css/font-awesome.min.css';
import { Link } from "react-router-dom";

export default class extends Component{
    render(){
        return (
            <>
                <div className="container">
                    <div className="container mb-5 d-flex mt-2">
                        <div className="col-6" >
                            <span className="title-icare fw-bold" style={{borderBottom: '4px solid #014C90', width: '210px', fontSize:'18px', marginLeft: '20px'}}>Pengaturan Alamat</span>
                        </div>
                        <div className="col-6 row text-end">
                            <div className="col-8">
                                <form className="d-flex" style={{width: '105%'}}>
                                    <span className="my-auto" style={{color: '#014C90'}}>
                                        <i className="fa fa-search fa-fw" style={{marginRight: 'auto'}}></i>
                                    </span>
                                    <input type="text" className="form-control me-2 border-0 border-only-bottom" style={{fontSize: '14px', marginLeft: '5px', color: 'black'}}/>
                                    <button style={{margin: 'auto', cursor: 'pointer', border: '0', background: 'none'}} type="reset">
                                        <i className="fa fa-close"></i>
                                    </button>
                                </form>
                            </div>
                            <div className="col-4">
                                <Link to="/form-address">
                                    <button className="btn btn-login" style={{padding: '8px 20px', fontSize: '14px'}}><i className="fa fa-plus" style={{marginRight: '5px'}}></i> Tambah Alamat</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card shadow-sm rounded m-5">
                        <div className="card-body" style={{height: '210px'}}>
                            <h6 className="card-title title-icare fw-bold" style={{fontSize: '14px'}}>Kantor Pusat</h6>
                            <div className="row fw-bold">
                                <div className="col-6">
                                    <p className="mb-0" style={{fontSize:'13px'}}>Ima</p>
                                    <table className="table table-borderless mb-0">
                                        <thead>
                                            <tbody className="px-auto py-auto">
                                                <tr key="row">
                                                    <td style={{fontSize:'13px'}}>Jalan</td>
                                                    <td style={{fontSize:'13px'}}>:</td>
                                                    <td style={{fontSize:'13px'}}>Blimbing No 47, Pandanwangi</td>
                                                </tr>
                                                <tr key="row">
                                                    <td style={{fontSize:'13px'}}>No Gedung</td>
                                                    <td style={{fontSize:'13px'}}>:</td>
                                                    <td style={{fontSize:'13px'}}>D42</td>
                                                </tr>
                                                <tr key="row">
                                                    <td style={{fontSize:'13px'}}>Nama Gedung</td>
                                                    <td style={{fontSize:'13px'}}>:</td>
                                                    <td style={{fontSize:'13px'}}>Araya Hill</td>
                                                </tr>
                                                <tr key="row">
                                                    <td style={{fontSize:'13px'}}>082111999765</td>
                                                </tr>  
                                            </tbody>
                                            <button style={{border: '0', background: 'none', fontWeight: 'bold'}}>
                                                <i className="fa fa-map-marker fa-lg my-auto" style={{padding: 'initial'}}></i> 
                                                <span style={{fontSize: '14px', padding: 'inherit', color: '#014C90'}}> Sudah Pinpoint</span>  
                                            </button>
                                        </thead>
                                    </table>
                                </div>
                                <div className="col-md-6 col-sm-6 col-12 text-end">
                                    <img src="images/verify.png" alt="" style={{marginRight: '35px'}} />
                                    <div className="">
                                        <ol className="title-icare mb-0" style={{fontSize: '14px'}}>
                                            {/* <li className="nav-item">
                                                <Link className="nav-link">Utamakan</Link>
                                            </li> */}
                                            <li className="nav-item" style={{marginRight: '30px'}}>
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
                        <div className="card-body">
                            <h6 className="card-title title-icare fw-bold" style={{fontSize: '14px'}}>Kantor Pusat Cabang 2</h6>
                            <div className="row fw-bold">
                                <div className="col-6">
                                    <p className="mb-0" style={{fontSize:'13px'}}>Andi</p>
                                    <table className="table table-borderless mb-0">
                                        <thead>
                                            <tbody className="px-auto py-auto">
                                                <tr key="row">
                                                    <td style={{fontSize:'13px'}}>Jalan</td>
                                                    <td style={{fontSize:'13px'}}>:</td>
                                                    <td style={{fontSize:'13px'}}>Candi Borobudur No 22, Lowokwaru</td>
                                                </tr>
                                                <tr key="row">
                                                    <td style={{fontSize:'13px'}}>No Gedung</td>
                                                    <td style={{fontSize:'13px'}}>:</td>
                                                    <td style={{fontSize:'13px'}}>8</td>
                                                </tr>
                                                <tr key="row">
                                                    <td style={{fontSize:'13px'}}>Nama Gedung</td>
                                                    <td style={{fontSize:'13px'}}>:</td>
                                                    <td style={{fontSize:'13px'}}>Sukarno Hatta Hill</td>
                                                </tr>
                                                <tr key="row">
                                                    <td>082111999765</td>
                                                </tr>  
                                            </tbody>
                                            <button style={{border: '0', background: 'none', fontWeight: 'bold'}}>
                                                <i className="fa fa-map-marker fa-lg my-auto" style={{padding: 'initial'}}></i> 
                                                <span style={{fontSize: '14px', padding: 'inherit', color: '#014C90'}}> Sudah Pinpoint</span>  
                                            </button>
                                        </thead>
                                    </table>
                                </div>
                                <div className="col-md-6 col-sm-6 col-12 text-end">
                                    {/* <img src="images/verify.png" alt="" /> */}
                                    <div style={{marginTop: "70px"}}>
                                        <ol className="title-icare mb-0" style={{fontSize:'14px', position: 'relative', bottom: '-25px'}}>
                                            <li className="nav-item" style={{marginRight: '30px'}}>
                                                <Link className="nav-link">Utamakan</Link>
                                            </li>
                                            <li className="nav-item" style={{marginRight: '30px'}}>
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