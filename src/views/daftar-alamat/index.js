import { Component, useState } from "react";
import 'font-awesome/css/font-awesome.min.css';
import { Link } from "react-router-dom";
import { getDaftarAlamat } from "../../services/API";
import ConfirmAlert from "../../component/alert/confirmAlert";
import RemoveAlert from "../../component/alert/removeAlert";

function AddressList() {

    const [showPopupDelete, setShowPopupDelete] = useState(false)
    const [showPopupPrioritize, setShowPopupPrioritize] = useState(false)
    const [showSuccessPopup, setShowSuccessPopup] = useState(false)
    const [alertOption, setAlertOption] = useState({ title: '', message: '' })
    const [dataisLoaded, setDataisLoaded] = useState(false)
    const [dataDaftarAlamat, setDataDaftarAlamat] = useState('')

    const componentDidMount = () => {
        init();
    }

    async function init() {
        const res = await getDaftarAlamat();
        console.log('res : ', res);

        const Table = res['Table'];
        setDataisLoaded(true);
        setDataDaftarAlamat(Table);

        console.log('dataDaftarAlamat ', setDataDaftarAlamat());
    }

    const handlePopup = () => {
        setShowPopupDelete(false)
        setShowPopupPrioritize(false)
        setShowSuccessPopup(false)
    }

    const handleDelete = (e) => {
        setShowPopupDelete(true)
        setAlertOption({ title: 'Konfirmasi', message: `Hapus alamat : ${e}` })
    }

    const handleConfirmationDelete = () => {
        setShowPopupDelete(false)
        setShowSuccessPopup(true)
        setAlertOption({ title: 'Berhasil', message: 'Alamat berhasil dihapus' })
    }

    const handlePrioritize = (e) => {
        setShowPopupPrioritize(true)
        setAlertOption({ title: 'Konfirmasi', message: `Utamakan alamat ${e} ?` })
    }

    const handleConfirmationPrioritize = () => {
        setShowPopupPrioritize(false)
        setShowSuccessPopup(true)
        setAlertOption({ title: 'Berhasil', message: 'Berhasil mengutamakan' })
    }

        // if (!dataisLoaded) {
        //     return (
        //         <div>
        //             <h3>Halamat tidak ditemukan...</h3>{" "}
        //         </div>
        //     );
        // }

    return (
        <>
            <div className="responsive-bar d-md-flex h-address">
                <div className="col-md-6 col-12 mb-md-5">
                    <div className="row">
                        <div className="col-md-12 col-8" >
                            <h4 className="title-icare title-fitur m-0 p-0 fw-bold" style={{ fontSize: '18px' }}>
                                <Link className="nav-link d-inline d-md-none me-3" to="/settings">
                                    <i className="fa fa-arrow-left color-arrow-left"></i>
                                </Link>
                                <span style={{ borderBottom: '3px solid #014C90' }}>Pengaturan Alamat</span>
                            </h4>
                        </div>
                        <div className="col-2 d-md-none d-block text-end">
                            <Link to="/tambah_alamat/0">
                                <i className="fa fa-plus-circle" style={{ fontSize: '20px' }}></i>
                            </Link>
                        </div>
                        <div className="col-2 d-md-none d-block text-end">
                            <a href="">
                                <i className="fa fa-search text-white" style={{ fontSize: '20px' }}></i>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="col-md-7 row d-md-flex d-none">
                    <div className="col-lg-7 col-md-7 col-12">
                        <form className="d-flex" style={{ width: '108%' }}>
                            <span className="my-auto" style={{ color: '#014C90' }}>
                                <i className="fa fa-search fa-fw" style={{ marginRight: 'auto' }}></i>
                            </span>
                            <input type="text" className="form-control me-2 border-0 border-only-bottom" style={{ fontSize: '14px', marginLeft: '5px', color: 'black' }} />
                            <button style={{ margin: 'auto', cursor: 'pointer', border: '0', background: 'none' }} type="reset">
                                <i className="fa fa-close"></i>
                            </button>
                        </form>
                    </div>
                    <div className="col-md-4 col-3 text-end" style={{ paddingRight: '25px' }}>
                        <Link to="/tambah_alamat/0">
                            <button className="btn btn-login" style={{ padding: '8px 20px', fontSize: '14px' }}><i className="fa fa-plus" style={{ marginRight: '5px' }}></i> Tambah Alamat</button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="py-lg-0 py-md-0 py-3">
                <div className="card shadow border-0 pt-lg-0 pt-5 responsive-form">
                    <div className="card-body px-lg-0 px-md-0 px-1">

                        {init.map((item) => (
                            <div className="card shadow-sm rounded m-lg-4 m-0">
                                <div className="card-body">
                                    <h6 className="card-title title-icare fw-bold" style={{ fontSize: '14px' }}>{item.Nama_Alamat}</h6>
                                    <div className="row fw-bold">
                                        <div className="col-6">
                                            <p className="mb-0" style={{ fontSize: '13px' }}>{item.Penerima}</p>
                                            <table className="table table-borderless mb-0">
                                                <thead>
                                                    <tbody className="px-auto py-auto">
                                                        <tr key="row">
                                                            <td style={{ fontSize: '13px' }}>Jalan : {item.Alamat}</td>
                                                        </tr>
                                                        <tr key="row">
                                                            <td style={{ fontSize: '13px' }}>No Gedung : {item.NoGedung}</td>
                                                        </tr>
                                                        <tr key="row">
                                                            <td style={{ fontSize: '13px' }}>Nama Gedung : {item.NamaGedung}</td>
                                                        </tr>
                                                        <tr key="row">
                                                            <td>{item.Telp_Penerima}</td>
                                                        </tr>
                                                    </tbody>
                                                    {
                                                        item.isPin ?
                                                            (
                                                                <button style={{ border: '0', background: 'none', fontWeight: 'bold' }}>
                                                                    <i className="fa fa-map-marker fa-lg my-auto" style={{ padding: 'initial' }}></i>
                                                                    <span style={{ fontSize: '14px', padding: 'inherit', color: '#014C90' }}> Sudah Pinpoint</span>
                                                                </button>
                                                            ) : (
                                                                <div></div>
                                                            )
                                                    }
                                                </thead>
                                            </table>
                                        </div>
                                        {
                                            item.verified ?
                                                (
                                                    <div className="col-md-6 col-sm-6 col-12 text-end">
                                                        <img src="images/verify.png" alt="" style={{ paddingTop: '32px', paddingBottom: '10px', width: "15%" }} />
                                                        <div className="">
                                                            <ol className="title-icare mb-0" style={{ fontSize: '14px' }}>
                                                                <li className="nav-item" style={{ marginRight: '30px' }}>
                                                                    <Link className="nav-link" to="/tambah_alamat/1">Ubah</Link>
                                                                </li>
                                                                <li className="nav-item">
                                                                    <button onClick={() => handleDelete(item.Nama_Alamat)} className="nav-link" >Hapus</button>
                                                                </li>
                                                            </ol>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="col-md-6 col-sm-6 col-6 text-end">
                                                        <div style={{ marginTop: "70px" }}>
                                                            <ol className="title-icare mb-0" style={{ fontSize: '14px', position: 'relative', bottom: '-25px', paddingTop: '10px' }}>
                                                                <li className="nav-item" style={{ marginRight: '30px' }}>
                                                                    <button onClick={() => handlePrioritize(item.Nama_Alamat)} className="nav-link">Utamakan</button>
                                                                </li>
                                                                <li className="nav-item" style={{ marginRight: '30px' }}>
                                                                    <Link className="nav-link" to="/tambah_alamat/1">Ubah</Link>
                                                                </li>
                                                                <li className="nav-item">
                                                                    <button onClick={() => handleDelete(item.Nama_Alamat)} className="nav-link" >Hapus</button>
                                                                </li>
                                                            </ol>
                                                        </div>
                                                    </div>
                                                )
                                        }
                                        {
                                            showPopupDelete && (
                                                <RemoveAlert visible={showPopupDelete} message={alertOption.message} onCancel={handlePopup} onClick={handleConfirmationDelete} customClass="col-md-3 col-sm-6 col-9" />
                                            )
                                        }
                                        {
                                            showPopupPrioritize && (
                                                <RemoveAlert visible={showPopupPrioritize} message={alertOption.message} onCancel={handlePopup} onClick={handleConfirmationPrioritize} customClass="col-md-3 col-sm-6 col-9" />
                                            )
                                        }
                                        {
                                            showSuccessPopup && (
                                                <ConfirmAlert visible={showSuccessPopup} message={alertOption.message} onClick={handlePopup} customClass="col-md-3 sol-sm-6 col-9" />
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {
                dataDaftarAlamat.length > 10 ?
                    (
                        <div className="m-5">
                            <button type="button" className="btn btn-primary" style={{ width: '100%', height: '50px', backgroundColor: '#014C90', borderRadius: '10px' }}>Lihat lebih banyak...</button>
                        </div>
                    ) : (
                        <div></div>
                    )
            }

        </>
    )
}

export default AddressList

// export default class extends Component {
//     componentDidMount() {
//         this.init();
//     }

//     async init() {
//         this.setState({
//             DataisLoaded: false,
//         });

//         var res = await getDaftarAlamat();
//         console.log("res : ", res);

//         var Table = res["Table"];
//         // console.log("Table L ", Table);

//         this.setState({
//             DataisLoaded: true,
//             dataDaftarAlamat: Table,
//         });
//         console.log("dataDaftarAlamat L ", this.state.dataDaftarAlamat);
//     }



//     constructor(props) {
//         super(props)
//         this.handlePopup = this.handlePopup.bind(this)
//         this.handleDelete = this.handleDelete.bind(this)
//         this.handleConfirmationDelete = this.handleConfirmationDelete.bind(this)
//         this.handlePrioritize = this.handlePrioritize.bind(this)
//         this.handleConfirmationPrioritize = this.handleConfirmationPrioritize.bind(this)
//         this.state = {
//             showPopupDelete: false,
//             showPopupPrioritize: false,
//             showSuccessPopup: false,
//             addressItems: '',
//             alertOption: {
//                 title: '',
//                 message: ''
//             },
//             dataItems: [
//                 {
//                     addressLabel: 'Kantor Pusat',
//                     recipientName: 'Ima',
//                     streetName: 'Blimbing No 47, Pandanwangi',
//                     buildingNumber: 'D42',
//                     buildingName: 'Araya Hill',
//                     phoneNumber: '082111999765',
//                     deliveryLocation: true
//                 },
//                 {
//                     addressLabel: 'Kantor Cabang 2',
//                     recipientName: 'Ima',
//                     streetName: 'Blimbing No 47, Pandanwangi',
//                     buildingNumber: 'D42',
//                     buildingName: 'Araya Hill',
//                     phoneNumber: '082111999765',
//                     deliveryLocation: true
//                 },
//                 {
//                     addressLabel: 'Kantor Cabang 3',
//                     recipientName: 'Ima',
//                     streetName: 'Blimbing No 47, Pandanwangi',
//                     buildingNumber: 'D42',
//                     buildingName: 'Araya Hill',
//                     phoneNumber: '082111999765',
//                     deliveryLocation: false
//                 },
//                 {
//                     addressLabel: 'Kantor Cabang 4',
//                     recipientName: 'Ima',
//                     streetName: 'Blimbing No 47, Pandanwangi',
//                     buildingNumber: 'D42',
//                     buildingName: 'Araya Hill',
//                     phoneNumber: '082111999765',
//                     deliveryLocation: false
//                 },
//             ],
//             dataDaftarAlamat: []
//         }
//     }

//     handlePopup() {
//         this.setState({ showPopupDelete: false, showPopupPrioritize: false, showSuccessPopup: false })
//     }

//     handleDelete(e) {
//         this.setState({ showPopupDelete: true, alertOption: { title: 'Konfirmasi', message: `Hapus alamat: ${e}` } })
//     }

//     handleConfirmationDelete() {
//         this.setState({ showPopupDelete: false, showSuccessPopup: true, alertOption: { title: 'Berhasil', message: 'Alamat berhasil dihapus' } })
//     }

//     handlePrioritize(e) {
//         this.setState({ showPopupPrioritize: true, alertOption: { title: 'Konfirmasi', message: `Utamakan alamat ${e} ?` } })
//     }

//     handleConfirmationPrioritize() {
//         this.setState({ showPopupPrioritize: false, showSuccessPopup: true, alertOption: { title: 'Berhasil', message: 'Berhasil mengutamakan' } })
//     }

//     render() {

//         const { DataisLoaded, items, showPopupDelete, showSuccessPopup, showPopupPrioritize } = this.state;
//         if (!DataisLoaded)
//             return (
//                 <div>
//                     <h1></h1>{" "}
//                 </div>
//             );


//         return (
//             <>
//                 <div className="responsive-bar d-md-flex h-address">
//                     <div className="col-md-6 col-12 mb-md-5">
//                         <div className="row">
//                             <div className="col-md-12 col-8" >
//                                 <h4 className="title-icare title-fitur m-0 p-0 fw-bold" style={{ fontSize: '18px' }}>
//                                     <Link className="nav-link d-inline d-md-none me-3" to="/settings">
//                                         <i className="fa fa-arrow-left color-arrow-left"></i>
//                                     </Link>
//                                     <span style={{ borderBottom: '3px solid #014C90' }}>Pengaturan Alamat</span>
//                                 </h4>
//                             </div>
//                             <div className="col-2 d-md-none d-block text-end">
//                                 <Link to="/tambah_alamat/0">
//                                     <i className="fa fa-plus-circle" style={{ fontSize: '20px' }}></i>
//                                 </Link>
//                             </div>
//                             <div className="col-2 d-md-none d-block text-end">
//                                 <a href="">
//                                     <i className="fa fa-search text-white" style={{ fontSize: '20px' }}></i>
//                                 </a>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="col-md-7 row d-md-flex d-none">
//                         <div className="col-lg-7 col-md-7 col-12">
//                             <form className="d-flex" style={{ width: '108%' }}>
//                                 <span className="my-auto" style={{ color: '#014C90' }}>
//                                     <i className="fa fa-search fa-fw" style={{ marginRight: 'auto' }}></i>
//                                 </span>
//                                 <input type="text" className="form-control me-2 border-0 border-only-bottom" style={{ fontSize: '14px', marginLeft: '5px', color: 'black' }} />
//                                 <button style={{ margin: 'auto', cursor: 'pointer', border: '0', background: 'none' }} type="reset">
//                                     <i className="fa fa-close"></i>
//                                 </button>
//                             </form>
//                         </div>
//                         <div className="col-md-4 col-3 text-end" style={{ paddingRight: '25px' }}>
//                             <Link to="/tambah_alamat/0">
//                                 <button className="btn btn-login" style={{ padding: '8px 20px', fontSize: '14px' }}><i className="fa fa-plus" style={{ marginRight: '5px' }}></i> Tambah Alamat</button>
//                             </Link>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="py-lg-0 py-md-0 py-3">
//                     <div className="card shadow border-0 pt-lg-0 pt-5 responsive-form">
//                         <div className="card-body px-lg-0 px-md-0 px-1">

//                             {this.state.dataDaftarAlamat.map((item) => (
//                                 <div className="card shadow-sm rounded m-lg-4 m-0">
//                                     <div className="card-body">
//                                         <h6 className="card-title title-icare fw-bold" style={{ fontSize: '14px' }}>{item.Nama_Alamat}</h6>
//                                         <div className="row fw-bold">
//                                             <div className="col-6">
//                                                 <p className="mb-0" style={{ fontSize: '13px' }}>{item.Penerima}</p>
//                                                 <table className="table table-borderless mb-0">
//                                                     <thead>
//                                                         <tbody className="px-auto py-auto">
//                                                             <tr key="row">
//                                                                 <td style={{ fontSize: '13px' }}>Jalan : {item.Alamat}</td>
//                                                             </tr>
//                                                             <tr key="row">
//                                                                 <td style={{ fontSize: '13px' }}>No Gedung : {item.NoGedung}</td>
//                                                             </tr>
//                                                             <tr key="row">
//                                                                 <td style={{ fontSize: '13px' }}>Nama Gedung : {item.NamaGedung}</td>
//                                                             </tr>
//                                                             <tr key="row">
//                                                                 <td>{item.Telp_Penerima}</td>
//                                                             </tr>
//                                                         </tbody>
//                                                         {
//                                                             item.isPin ?
//                                                                 (
//                                                                     <button style={{ border: '0', background: 'none', fontWeight: 'bold' }}>
//                                                                         <i className="fa fa-map-marker fa-lg my-auto" style={{ padding: 'initial' }}></i>
//                                                                         <span style={{ fontSize: '14px', padding: 'inherit', color: '#014C90' }}> Sudah Pinpoint</span>
//                                                                     </button>
//                                                                 ) : (
//                                                                     <div></div>
//                                                                 )
//                                                         }
//                                                     </thead>
//                                                 </table>
//                                             </div>
//                                             {
//                                                 item.verified ?
//                                                     (
//                                                         <div className="col-md-6 col-sm-6 col-12 text-end">
//                                                             <img src="images/verify.png" alt="" style={{ paddingTop: '32px', paddingBottom: '10px', width: "15%" }} />
//                                                             <div className="">
//                                                                 <ol className="title-icare mb-0" style={{ fontSize: '14px' }}>
//                                                                     <li className="nav-item" style={{ marginRight: '30px' }}>
//                                                                         <Link className="nav-link" to="/tambah_alamat/1">Ubah</Link>
//                                                                     </li>
//                                                                     <li className="nav-item">
//                                                                         <button onClick={() => this.handleDelete(item.Nama_Alamat)} className="nav-link" >Hapus</button>
//                                                                     </li>
//                                                                 </ol>
//                                                             </div>
//                                                         </div>
//                                                     ) : (
//                                                         <div className="col-md-6 col-sm-6 col-6 text-end">
//                                                             <div style={{ marginTop: "70px" }}>
//                                                                 <ol className="title-icare mb-0" style={{ fontSize: '14px', position: 'relative', bottom: '-25px', paddingTop: '10px' }}>
//                                                                     <li className="nav-item" style={{ marginRight: '30px' }}>
//                                                                         <button onClick={() => this.handlePrioritize(item.Nama_Alamat)} className="nav-link">Utamakan</button>
//                                                                     </li>
//                                                                     <li className="nav-item" style={{ marginRight: '30px' }}>
//                                                                         <Link className="nav-link" to="/tambah_alamat/1">Ubah</Link>
//                                                                     </li>
//                                                                     <li className="nav-item">
//                                                                         <button onClick={() => this.handleDelete(item.Nama_Alamat)} className="nav-link" >Hapus</button>
//                                                                     </li>
//                                                                 </ol>
//                                                             </div>
//                                                         </div>
//                                                     )
//                                             }
//                                             {
//                                                 showPopupDelete && (
//                                                     <RemoveAlert visible={this.state.showPopupDelete} message={this.state.alertOption.message} onCancel={this.handlePopup} onClick={this.handleConfirmationDelete} customClass="col-md-3 col-sm-6 col-9" />
//                                                 )
//                                             }
//                                             {
//                                                 showPopupPrioritize && (
//                                                     <RemoveAlert visible={this.state.showPopupPrioritize} message={this.state.alertOption.message} onCancel={this.handlePopup} onClick={this.handleConfirmationPrioritize} customClass="col-md-3 col-sm-6 col-9" />
//                                                 )
//                                             }
//                                             {
//                                                 showSuccessPopup && (
//                                                     <ConfirmAlert visible={this.state.showSuccessPopup} message={this.state.alertOption.message} onClick={this.handlePopup} customClass="col-md-3 sol-sm-6 col-9" />
//                                                 )
//                                             }
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//                 {
//                     this.state.dataDaftarAlamat.length > 10 ?
//                         (
//                             <div className="m-5">
//                                 <button type="button" className="btn btn-primary" style={{ width: '100%', height: '50px', backgroundColor: '#014C90', borderRadius: '10px' }}>Lihat lebih banyak...</button>
//                             </div>
//                         ) : (
//                             <div></div>
//                         )
//                 }

//             </>
//         )
//     }
// }