import { Component } from "react";
import 'font-awesome/css/font-awesome.min.css';
import { Link } from "react-router-dom";

export default class extends Component{
    constructor(props){
        super(props)
        this.state = {
            dataItems: [
                {
                    addressLabel: 'Kantor Pusat',
                    recipientName: 'Ima',
                    streetName: 'Blimbing No 47, Pandanwangi',
                    buildingNumber: 'D42',
                    buildingName: 'Araya Hill',
                    phoneNumber: '082111999765',
                    deliveryLocation: true
                },
                {
                    addressLabel: 'Kantor Cabang 2',
                    recipientName: 'Ima',
                    streetName: 'Blimbing No 47, Pandanwangi',
                    buildingNumber: 'D42',
                    buildingName: 'Araya Hill',
                    phoneNumber: '082111999765',
                    deliveryLocation: true
                },
                {
                    addressLabel: 'Kantor Cabang 3',
                    recipientName: 'Ima',
                    streetName: 'Blimbing No 47, Pandanwangi',
                    buildingNumber: 'D42',
                    buildingName: 'Araya Hill',
                    phoneNumber: '082111999765',
                    deliveryLocation: false
                },
                {
                    addressLabel: 'Kantor Cabang 4',
                    recipientName: 'Ima',
                    streetName: 'Blimbing No 47, Pandanwangi',
                    buildingNumber: 'D42',
                    buildingName: 'Araya Hill',
                    phoneNumber: '082111999765',
                    deliveryLocation: false
                },
            ]
        }
    }
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
                                <Link to="/tambah_alamat">
                                    <button className="btn btn-login" style={{padding: '8px 20px', fontSize: '14px'}}><i className="fa fa-plus" style={{marginRight: '5px'}}></i> Tambah Alamat</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    
                    {this.state.dataItems.map((value, key) => (
                        <div className="card shadow-sm rounded m-5">
                            <div className="card-body" style={{height: '210px'}} key={key}>
                                <h6 className="card-title title-icare fw-bold" style={{fontSize: '14px'}}>{value.addressLabel}</h6>
                                <div className="row fw-bold">
                                    <div className="col-6">
                                        <p className="mb-0" style={{fontSize:'13px'}}>{value.recipientName}</p>
                                        <table className="table table-borderless mb-0">
                                            <thead>
                                                <tbody className="px-auto py-auto">
                                                    <tr key="row">
                                                        <td style={{fontSize:'13px'}}>Jalan</td>
                                                        <td style={{fontSize:'13px'}}>:</td>
                                                        <td style={{fontSize:'13px'}}>{value.streetName}</td>
                                                    </tr>
                                                    <tr key="row">
                                                        <td style={{fontSize:'13px'}}>No Gedung</td>
                                                        <td style={{fontSize:'13px'}}>:</td>
                                                        <td style={{fontSize:'13px'}}>{value.buildingNumber}</td>
                                                    </tr>
                                                    <tr key="row">
                                                        <td style={{fontSize:'13px'}}>Nama Gedung</td>
                                                        <td style={{fontSize:'13px'}}>:</td>
                                                        <td style={{fontSize:'13px'}}>{value.buildingName}</td>
                                                    </tr>
                                                    <tr key="row">
                                                        <td style={{fontSize:'13px'}}>{value.phoneNumber}</td>
                                                    </tr>  
                                                </tbody>
                                                <button style={{border: '0', background: 'none', fontWeight: 'bold'}}>
                                                    <i className="fa fa-map-marker fa-lg my-auto" style={{padding: 'initial'}}></i> 
                                                    <span style={{fontSize: '14px', padding: 'inherit', color: '#014C90'}}> Sudah Pinpoint</span>  
                                                </button>
                                            </thead>
                                        </table>
                                    </div>
                                    {
                                        value.deliveryLocation ?
                                        (
                                            <div className="col-md-6 col-sm-6 col-12 text-end">
                                                <img src="images/verify.png" alt="" style={{marginRight: '35px'}} />
                                                <div className="">
                                                    <ol className="title-icare mb-0" style={{fontSize: '14px'}}>
                                                        <li className="nav-item" style={{marginRight: '30px'}}>
                                                            <Link className="nav-link" to="/tambah_alamat">Ubah</Link>
                                                        </li>
                                                        <li className="nav-item">
                                                            <Link className="nav-link">Hapus</Link>
                                                        </li>
                                                    </ol>
                                                </div>
                                            </div>                               
                                        ) : (
                                            <div className="col-md-6 col-sm-6 col-12 text-end">
                                            <div style={{marginTop: "70px"}}>
                                                <ol className="title-icare mb-0" style={{fontSize:'14px', position: 'relative', bottom: '-25px'}}>
                                                    <li className="nav-item" style={{marginRight: '30px'}}>
                                                        <Link className="nav-link">Utamakan</Link>
                                                    </li>
                                                    <li className="nav-item" style={{marginRight: '30px'}}>
                                                        <Link className="nav-link" to="/tambah_alamat">Ubah</Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link className="nav-link">Hapus</Link>
                                                    </li>
                                                </ol>
                                            </div>
                                        </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>

                    ))}
                    <div className="m-5">
                        <button type="button" className="btn btn-primary" style={{width: '100%', height: '50px', backgroundColor: '#014C90', borderRadius: '10px'}}>Lihat lebih banyak...</button>
                    </div>
                </div>
            </>
        )
    }
}