import React, { Component, useState, useEffect } from "react";
import { Link, useLocation,useNavigate, useParams } from "react-router-dom";

import RemoveAlert from "../../component/alert/removeAlert";
import ConfirmAlert from "../../component/alert/confirmAlert";
import LoadingAlert from "../../component/alert/loadingAlert";
// import { deleteDaftarEq, getDaftarEq } from "../../services/API/mod_daftarEQ";
import UploadFileAlert from "../../component/alert/uploadFileAlert";
import ErrorAlert from "../../component/alert/errorAlert";
import { deleteDaftarEq, getDaftarEq, getDownloadEquipment, UploadEquipment } from "../../services/API/mod_daftarEQ";
import { NavDropdown } from "react-bootstrap";
function DaftarEQ() {
    const { id } = useParams()
    const location = useLocation()
    const navigate = useNavigate()
    const [showPopup, setShowPopup] = useState(false)
    const [showSuccessPopup, setShowSuccessPopup] = useState(false)
    const [showErrorPopup, setShowErrorPopup] = useState(false)
    const [alertOption, setAlertOption] = useState({ title: '', message: '' })
    // const [itemToDeleted, setItemToDeleted] = useState(null)
    const [nomorEQToDelete, setNomorEQToDelete] = useState('')
    const [loading, setLoading] = useState(false)
    const [daftarEQ, setDaftarEQ] = useState([])
    const [originalData, setOriginalData] = useState('')
    const [searchActive, setSearchActive] = useState(false)
    const [isActive, setIsActive] = useState(false)
    const [showPopupUpload, setShowPopupUpload] = useState(false)
    const [itemDaftarEQ, setItemDaftarEQ] = useState(5)
    const [showMoreDaftarEQ, setShowMoreDaftarEQ] = useState(true)
    const inputFileRef = React.useRef();

    useEffect(() => {
            daftarEq() 
    },[]);

    const daftarEq = async () => {
        setLoading(true)
        const res = await getDaftarEq()
        setLoading(false)
        if(res.status == 200) {
            setDaftarEQ(res.data.Table)
            setOriginalData(res.data.Table)
            // console.log(res)
        }
    }

    const handleUpdate = (e) => {
        // console.log(e.target)
        e.preventDefault()
        var item = 
        JSON.parse(e.target.getAttribute('data-item'))
        navigate(e.target.getAttribute('href'), {
            state: {
                input: {
                    equipment: item.equipment.toString(),
                    modelName: item.eqmodelName,
                    description: item.description,
                },
                address: {
                    id: item.AddressId,
                    Penerima: item.Penerima,
                    Nama_Alamat: item.Nama_Alamat,
                    Alamat: item.Alamat,
                    Kota: item.Kota,
                    Kode_Pos: item.Kode_Pos
                }
            }
        })
    }
    
    const handlePopup = () => {
        setShowPopup(false)
        setShowSuccessPopup(false)        
        setShowErrorPopup(false)
    }

    const handleSuccessPopup = () => {
        setShowPopup(false)
        setShowSuccessPopup(false)
        daftarEq()
        setShowPopupUpload(false)
    }

    const handleDeletedItem = (noEQToDelete) => {
        setShowPopup(true)
        setNomorEQToDelete(noEQToDelete)
    }    

    const getEquipmentToDelete = () => {
        const equipmentToDelete = daftarEQ.find(eq => eq.id === nomorEQToDelete)
        return equipmentToDelete ? equipmentToDelete.equipment : ''
    }

    const handleCancelDelete = () => {
        setShowPopup(false)
        setShowSuccessPopup(false)
    }
    const handleDownloadCSV = () => {
        setLoading(true)
        getDownloadEquipment()
        setLoading(false)
    }
    const handleConfirmDelete = async () => {
        const res = await deleteDaftarEq(nomorEQToDelete)
        if(res.status = 200) {
            getDaftarEq()
            setShowPopup(false)
            setNomorEQToDelete('')
            setShowSuccessPopup(true)
            setAlertOption({title: 'Hapus', message: 'Berhasil hapus EQ', redirect: false})
        }
    }
    const handleUpload = () => {        
        inputFileRef.current.click();
    }
    const handleCSVUpload = async (e) => {
        const file = e.target.files[0];

        if (file) {
            setLoading(true)
            const res=await UploadEquipment(file)
            e.target.value=null
            console.log('upload equipment',res)
            if (res.result=="Sukses") {
                console.log("masuk error")
                setShowSuccessPopup(true)
                setAlertOption({ title: 'Upload', message: `Sukses`, redirect: false })
                daftarEq()
            }else{
                console.log("masuk error")
                setShowErrorPopup(true)
                let message=""
                if (res.error){                    
                    message+="<ul>"
                    res.error.forEach(e=>{
                        message+="<li>"+ e +"</li>"
                    })
                    message+="</ul>"
                }
                setAlertOption({ title: res.result, message: message, redirect: false })
            }
            setLoading(false)
            
        }

    }

    const handleSearch = (e) => {
        if(e.target.value != '') {
            var filterData = originalData.filter(val => (val.equipment.toString().toLowerCase().includes(e.target.value.toLowerCase())) || val.eqmodelName.toLowerCase().includes(e.target.value.toLowerCase()) || val.description.toLowerCase().includes(e.target.value.toLowerCase()))
            setDaftarEQ(filterData)
        } else {
            setDaftarEQ(originalData)
        }
    }

    const handleNavClick = (nav) => {
        setIsActive(false)

        if (nav === "active") {
            setIsActive(true)
        }
    }

    const handleShowMoreDaftarEQ = () => {
        const showItem = 5
        const newItemDaftarEQ = itemDaftarEQ + showItem

        setItemDaftarEQ(newItemDaftarEQ)

        if(newItemDaftarEQ >= daftarEQ.length) {
            setShowMoreDaftarEQ(false)
        }
    }

    // const handleCSVUpload = async () => {
    //     const uploadedCSV = localStorage.getItem('uploadedcsvfile')

    //     if(uploadedCSV) {
    //         const decodedData = atob(uploadedCSV.split(',')[1])
    //         const rows = decodedData.split('\n').map(row => row.trim()).filter(row => row)
    //         const headerRow = rows[0]
    //         const cleanedHeader = headerRow.split(',').map(column => column.trim())
    //         const dataRows = rows.slice(1)

    //         const csvData = dataRows.map(dataRow => {
    //             const rowValues = dataRow.split(',').map(value => value.replace(/"/g, '').trim())
    //             const rowData = {}
    //             cleanedHeader.forEach((column, index) => {
    //                 if(column === "Latitude" || column === "Longitude") {
    //                     rowData[column] = parseFloat(rowValues[index])
    //                 } else {
    //                     rowData[column] = rowValues[index]
    //                 }
    //             })
    //             return rowData
    //         })

    //         csvData.forEach(async(rowData) => {
    //             const requestData = {
    //                 userid: parseInt(localStorage.getItem('id')),
    //                 equipment: rowData.equipment,
    //                 eqmodelName: rowData.eqmodelName,
    //                 description: rowData.description,
    //                 Nama_Alamat: rowData.Nama_Alamat,
    //                 Penerima: rowData.Penerima,
    //                 Alamat: rowData.Alamat
    //             }
    //             console.log('Data : ', requestData)

    //             setShowPopupUpload(false)
    //         })
    //     } else {
    //         console.log("File tidak ditemukan")
    //     }
    // }

        
    // const buttonDaftarEQ = daftarEQ.length > 10;
    
    return (
        <>
            <div className="responsive-bar d-md-flex">
                <div className="col-md-2 col-2 mb-md-5">
                    <div className="row">
                        {
                            searchActive ? (
                                <div className="d-flex align-items-center">
                                    <span className="nav-link d-inline d-md-none me-3" onClick={() => setSearchActive(false)}>
                                        <i className="fa fa-arrow-left color-arrow-left"></i>
                                    </span>
                                    <input type="text" onKeyUp={handleSearch} className="form-control search-riwayat" placeholder="Telusuri..." style={{position: 'absolute', right: 35}} />
                                    <NavDropdown className={`custom-dropdown text-white ${isActive ? 'active-link' : ''}`} onClick={() => handleNavClick('active')} id="nav-dropdown" title={<i className="fa fa-ellipsis-v d-md-none nav-app" style={{fontSize: '20px',}}></i>} style={{position: 'absolute', right: 20, zIndex: '1111'}}>
                                        <NavDropdown.Item href="/tambah_eq/0">
                                            <div className="item-drop d-flex align-items-center">
                                                <div className="col-9">
                                                    <span className="text-decoration-none nav-app" style={{color: '#000'}}>Tambah EQ</span>
                                                </div>
                                            </div>
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </div>
                            ) : (
                                <>
                                    <div className="col-md-12 col-8">
                                        <h4 className="title-icare title-fitur m-0 p-0 fw-bold" style={{fontSize: '18px'}}>
                                            <Link className="nav-link d-inline d-md-none me-3" to="/dashboard">
                                                <i className="fa fa-arrow-left color-arrow-left"></i>
                                            </Link>
                                            <span className="title-bold" style={{borderBottom: '3px solid #014C90'}}>Daftar EQ</span>
                                        </h4>
                                    </div>
                                    <div className="col-2 d-md-none d-block text-center">
                                        <Link to="/tambah_eq/0">
                                            <i className="fa fa-plus-circle" style={{fontSize: '20px'}}></i>
                                        </Link>
                                    </div>
                                    <div className="col-2 d-md-none d-block text-center">
                                        <span>
                                            <i className="fa fa-search text-white" onClick={() => setSearchActive(true)} style={{fontSize: '20px'}}></i>
                                        </span>
                                    </div>
                                
                                </>
                            )
                        }
                    </div>
                </div>
                <div className="d-md-flex d-none">
                    <div className="col-sm-8" style={{marginRight:'10%'}}>
                        <form className="d-flex" style={{ width: '108%' }}>
                            <span className="my-auto" style={{color: '#014C90'}}>
                                <i className="fa fa-search fa-fw" style={{marginRight: 'auto'}}></i>
                            </span>
                            <input type="text" onKeyUp={handleSearch} className="form-control me-2 border-0 border-only-bottom" style={{fontSize: '14px', marginLeft: '5px', color: 'black'}} />
                            <button style={{margin: 'auto', cursor: 'pointer', border: '0', background: 'none' }} type="reset" onClick={() => setDaftarEQ(originalData)}>
                                <i className="fa fa-close"></i>
                            </button>
                        </form>
                    </div>
                    <div className="col-md-8 col-3 text-end px-0">
                        <input type="file" ref={inputFileRef} accept=".xlsx" onChange={handleCSVUpload} className="d-none" />
                        <label htmlFor="csvFile">
                            <button onClick={handleUpload} className="btn btn-outline-danger me-3" style={{ fontSize: '14px', padding: '8px 10px' }}>
                                Upload Equipment <i className="fa fa-upload" style={{ marginLeft: '5px' }}></i>
                            </button>
                        </label>
                        <button onClick={handleDownloadCSV} className="btn btn-outline-primary btn-download me-3" style={{ fontSize: '14px', padding: '8px 23.5px', color: '#014C90' }}>
                            Download <i className="fa fa-download" style={{ marginLeft: '5px' }}></i>
                        </button>                    
                        <Link to="/tambah_eq">
                            <button className="btn btn-login" style={{padding: '8px 20px', fontSize: '14px'}}>
                                <i className="fa fa-plus" style={{marginRight: '5px'}}></i>
                                    Tambah EQ
                            </button>
                        </Link>
                    </div>                    
                </div>
            </div>
                <div className="card shadow border-0 px-lg-4 px-md-4 py-lg-4 py-md-4 pb-lg-0 responsive-form" style={{borderRadius:'20px'}}>
                    <div className="card-body">
                        <div className="row">
                            {
                                daftarEQ.slice(0, itemDaftarEQ).map((value, key) => (
                                    !value.deleted && (
                                    <div className="card-eq d-flex mb-lg-5 mb-3" key={value.id} style={{borderRadius:'10px', boxShadow:'1px 1px 2px 2px #bfbfbf'}}>
                                        <div className="col-lg-9 col-7 px-2 pt-0">
                                            <p className="mb-0 mt-2 fw-bold font-eq" style={{fontSize:'15px'}}>{value.equipment}</p>
                                            <p className="title-icare fw-bold mb-0 font-eq" style={{fontSize:'15px'}}>{value.eqmodelName}</p>
                                            <p className="fw-bold font-eq" style={{fontSize:'14px'}}>{value.description}</p>
                                        </div>
                                        <div className="col-lg-3 col-5 d-lg-flex responsive-eq mb-2 py-2 text-center">
                                            <div className="col-lg-4 col-2 text-position-right ">
                                                <a href={`/tambah_eq/${value.id}`}
                                                    className="text-decoration-none "
                                                    onClick={handleUpdate}
                                                    data-item={JSON.stringify(value)}
                                                >
                                                        <h6 className="text title-icare font-eq" style={{marginTop:'70px', fontWeight: 'bold', pointerEvents: 'none'}}>Ubah</h6>
                                                </a>
                                            </div>
                                            <div className="col-lg-4 col-1 my-lg-0 my-3 ">
                                                {value.eqVerified && (
                                                    <img src="images/Verified.png" style={{height:'70px'}} alt="Image"></img>
                                                )}
                                            </div>
                                            <div className="col-lg-4 col-2 text-position-center">
                                                <button className="title-icare fw-bold font-eq" style={{background:'none', border:'none', marginTop:'70px'}} onClick={() => handleDeletedItem(value.id)}>Hapus</button>
                                            </div>
                                        </div>
                                    </div>
                                )))
                            }
                            { showMoreDaftarEQ && (
                                <div className="button-daftar-eq p-0">
                                    <button type="button" className="btn btn-primary" style={{width:'100%', height:'50px', backgroundColor:'#014C90', borderRadius:'15px'}} onClick={handleShowMoreDaftarEQ}>Lihat lebih banyak ...</button>
                                </div>
                            )
                                // daftarEQ.length > 10 ?
                                // (
                                //     <div className="button-daftar-eq p-0">
                                //         <button type="button" className="btn btn-primary" style={{width:'100%', height:'50px', backgroundColor:'#014C90', borderRadius:'15px'}}>Lihat lebih banyak ...</button>
                                //     </div>
                                // ) : (
                                //     <div></div>
                                // )
                            }
                            {/* {buttonDaftarEQ && (
                                <div className="button-daftar-eq p-0">
                                    <button type="button" className="btn btn-primary" style={{width:'100%', height:'50px', backgroundColor:'#014C90', borderRadius:'15px'}}>Lihat lebih banyak ...</button>
                                </div>
                            )} */}
                        </div> 
                        <LoadingAlert visible={loading} customClass="col-md-2 col-8" />
                        {showPopup && (
                            <RemoveAlert visible={showPopup} message={`Hapus EQ: ${getEquipmentToDelete()}`} customClass="col-md-3 col-8" onCancel={handleCancelDelete} onClick={() => {handleConfirmDelete(); }} />
                        )}
                        {showSuccessPopup && (
                            <ConfirmAlert visible={showSuccessPopup} message={alertOption.message} customClass="col-md-2 col-8" onClick={handleSuccessPopup}/>
                        )}
                        {showPopupUpload && (
                            <UploadFileAlert visible={showPopupUpload} onClick={handleCSVUpload} onCancel={handleSuccessPopup}/>
                        )}
                        {
                            showErrorPopup && (
                                <ErrorAlert visible={showErrorPopup} titleMessage={alertOption.title} message={alertOption.message} onClick={handlePopup} customClass="col-md-3 sol-sm-6 col-9" />
                            )
                        }
                    </div>
                </div>
        </>
    )
}

export default DaftarEQ

// export default class extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             daftarEQ: [
//                 {
//                     id: 1,
//                     noEQ: '71221',
//                     namaModel: 'CobaInsert',
//                     keterangan: 'CobaInsert',
//                     imgEQ: 'images/Verified.png',
//                     deleted: false,
//                 },
//                 {
//                     id: 2,
//                     noEQ: '300822',
//                     namaModel: 'model1',
//                     keterangan: 'tes aja',
//                     imgEQ: 'images/Verified.png',
//                     deleted: false,
//                 },
//                 {
//                     id: 3,
//                     noEQ: '798689',
//                     namaModel: 'ApeosPort C2060',
//                     keterangan: 'test',
//                     deleted: false,
//                 }
//             ],
//             showPopup: false,
//             showSuccessPopup: false,
//             itemToDeleted: null,
//             // nomorEQToDelete:'',
//         };
//         this.handlePopup = this.handlePopup.bind(this)
//         this.handleCancelDelete = this.handleCancelDelete.bind(this)
//     }

//     handlePopup() {
//         this.setState({showPopup: false, showSuccessPopup: false})
//     }

//     setDeletedConfirmation(noEQ) {
//         this.setState({nomorEQToDelete: noEQ});
//     }

//     handleDeletedItem(noEQToDelete) {
//         this.setState({showPopup: true, nomorEQToDelete: noEQToDelete});
//     }    

//     // Di dalam fungsi handleCancelDelete
//     handleCancelDelete() {
//         this.setState({showPopup: false, showSuccessPopup: false})
//     }

//     handleConfirmDelete() {
//         const {daftarEQ, nomorEQToDelete} = this.state;

//         if(nomorEQToDelete) {
//             const updateDaftarEQ = daftarEQ.filter((item) => item.noEQ !== nomorEQToDelete);
//             this.setState({daftarEQ: updateDaftarEQ, showPopup: false, nomorEQToDelete: ''});

//             this.setState({showSuccessPopup: true});
//         }
//     }


//     // setDeletedConfirmation(itemId) {
//     //     const itemToDeleted = this.state.daftarEQ.find(item => item.id === itemId);

//     //     if (itemToDeleted) {
//     //         this.setState({itemToDeleted: itemId, nomorEQToDelete: itemToDeleted.noEQ});
//     //     }
//     //     this.setState({itemToDeleted: itemId});
//     // }

//     // handleDeletedItem(noEQToDelete) {
//     //     this.setDeletedConfirmation(noEQToDelete);
//     //     const itemsCopy = [...this.state.daftarEQ];

//     //     const itemIndex = itemsCopy.findIndex((item) => item.noEQ === noEQToDelete);

//     //     if(itemIndex !== -1) {
//     //         itemsCopy.splice(itemIndex, 1);
//     //     }

//     //     this.setState({daftarEQ: itemsCopy, showPopup: true});
//     // }

//     // handleDeletedItem(itemId) {
//     //     this.setDeletedConfirmation(itemId);
//     //     const itemsCopy = [...this.state.daftarEQ];

//     //     const itemIndex = itemsCopy.findIndex(item => item.id === itemId);

//     //     if (itemIndex !== -1) {
//     //         itemsCopy[itemIndex] = {...itemsCopy[itemIndex], deleted: true};
//     //     }

//     //     this.setState({daftarEQ: itemsCopy, showPopup: true}, () => {
//     //         this.setState({nomorEQToDelete: ''});
//     //     });

//     // }

//     // handleCancelDelete() {
//     //     console.log("BATAL Hapus EQ");
//     //     const {daftarEQ, nomorEQToDelete} = this.state;

//     //     const updateDaftarEQ = daftarEQ.map((item) =>
//     //         item.noEQ === nomorEQToDelete ? {...item, deleted: false} : item
//     //     );

//     //     this.setState({daftarEQ: updateDaftarEQ, showPopup: false, nomorEQToDelete: ''});
        
//     // }

//     render () {

//         const {daftarEQ, showPopup, showSuccessPopup} = this.state;
//         const buttonDaftarEQ = daftarEQ.length > 10;

//         return (
//             <>
//             <div className="responsive-bar d-md-flex">
//                 <div className="col-md-6 col-12 mb-md-5">
//                     <div className="row">
//                         <div className="col-md-12 col-8">
//                             <h4 className="title-icare title-fitur m-0 p-0 fw-bold" style={{fontSize: '18px'}}>
//                                 <Link className="nav-link d-inline d-md-none me-3" to="/settings">
//                                     <i className="fa fa-arrow-left color-arrow-left"></i>
//                                 </Link>
//                                 <span style={{borderBottom: '3px solid #014C90'}}>Daftar EQ</span>
//                             </h4>
//                         </div>
//                         <div className="col-2 d-md-none d-block text-center">
//                             <Link to="/form_eq/0">
//                                 <i className="fa fa-plus-circle" style={{fontSize: '20px'}}></i>
//                             </Link>
//                         </div>
//                         <div className="col-2 d-md-none d-block text-center">
//                             <div>
//                                 <i className="fa fa-search text-white" style={{fontSize: '20px'}}></i>
//                             </div>
//                         </div>
//                     </div>
//                     {/* <div className="col-7 row text-end">
//                         <div className="col-7">
//                             <form className="d-flex" style={{ width: '130%' }}>
//                                 <span className="my-auto" style={{ color: '#014C90' }}>
//                                     <i className="fa fa-search fa-fw" style={{ marginRight: 'auto' }}></i>
//                                 </span>
//                                 <input type="text" className="form-control me-2 border-0 border-only-bottom" style={{ fontSize: '14px', marginLeft: '5px', color: 'black' }} />
//                                 <button style={{ margin: 'auto', cursor: 'pointer', border: '0', background: 'none' }} type="reset">
//                                     <i className="fa fa-close"></i>
//                                 </button>
//                             </form>
//                         </div>
//                         <div className="col-5">
//                             <Link to={{pathname:'/form_eq/0'}}>
//                                 <button className="btn btn-login" style={{padding: '8px 20px', fontSize: '14px'}}><i className="fa fa-plus" style={{marginRight: '5px'}}></i> Tambah EQ</button>
//                             </Link>
//                         </div>
//                     </div> */}
//                 </div>
//                 <div className="col-md-7 row d-md-flex d-none">
//                     <div className="col-lg-7 col-md-7 col-12">
//                         <form className="d-flex" style={{ width: '108%' }}>
//                             <span className="my-auto" style={{color: '#014C90'}}>
//                                 <i className="fa fa-search fa-fw" style={{marginRight: 'auto'}}></i>
//                             </span>
//                             <input type="text" className="form-control me-2 border-0 border-only-bottom" style={{fontSize: '14px', marginLeft: '5px', color: 'black'}} />
//                             <button style={{margin: 'auto', cursor: 'pointer', border: '0', background: 'none' }} type="reset">
//                                 <i className="fa fa-close"></i>
//                             </button>
//                         </form>
//                     </div>
//                     <div className="col-md-4 col-3 text-end" style={{paddingRight: '25px'}}>
//                         <Link to="/form_eq/0">
//                             <button className="btn btn-login" style={{padding: '8px 20px', fontSize: '14px'}}>
//                                 <i className="fa fa-plus" style={{marginRight: '5px'}}></i>
//                                  Tambah Eq
//                             </button>
//                         </Link>
//                     </div>
//                 </div>
//             </div>
//             <div className="py-lg-0 my-md-0 py-3">
//                 <div className="card shadow border-0 px-lg-4 px-md-4 py-lg-4 py-md-4 pb-lg-0 responsive-form" style={{borderRadius:'20px'}}>
//                     <div className="card-body">
//                         <div className="row my-lg-0 my-5">
//                             {
//                                 this.state.daftarEQ.map((value, key) => (
//                                     !value.deleted && (
//                                     <div className="card-eq d-flex mb-lg-5 mb-3" key={value.id} style={{borderRadius:'10px', boxShadow:'1px 1px 2px 2px #bfbfbf'}}>
//                                         <div className="col-lg-9 col-7 px-2 pt-0">
//                                             <p className="mb-0 mt-2 fw-bold" style={{fontSize:'15px'}}>{value.noEQ}</p>
//                                             <p className="title-icare fw-bold mb-0" style={{fontSize:'15px'}}>{value.namaModel}</p>
//                                             <p className="fw-bold" style={{fontSize:'14px'}}>{value.keterangan}</p>
//                                         </div>
//                                         <div className="col-lg-5 col-5 px-lg-5 px-0 d-lg-flex responsive-eq mb-2 py-2">
//                                             <div className="col-2 text-position-right">
//                                                 <Link to={{pathname:'/form_eq/1'}}
//                                                     className="text-decoration-none"><h6 className="text title-icare" style={{marginTop:'70px', fontWeight: 'bold'}}>Ubah</h6>
//                                                 </Link>
//                                             </div>
//                                             <div className="col-lg-3 col-1 my-lg-0 my-3">
//                                                 {value.imgEQ && (
//                                                     <img src={value.imgEQ} style={{height:'70px'}} alt="Image"></img>
//                                                 )}
//                                             </div>
//                                             <div className="col-2 text-position-center">
//                                                 <button className="title-icare fw-bold" style={{background:'none', border:'none', marginTop:'70px'}} onClick={() => this.handleDeletedItem(value.noEQ)}>Hapus</button>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 )))
//                             }
//                             {buttonDaftarEQ && (
//                                 <div className="button-daftar-eq p-0">
//                                     <button type="button" className="btn btn-primary" style={{width:'100%', height:'50px', backgroundColor:'#014C90', borderRadius:'15px'}}>Lihat lebih banyak ...</button>
//                                 </div>
//                             )}
//                         </div>
//                         {showPopup && (
//                             <RemoveAlert visible={this.state.showPopup} message={`Hapus EQ: ${this.state.nomorEQToDelete}`} customClass="col-sm-3" onCancel={this.handleCancelDelete} onClick={() => {this.handleConfirmDelete(); }} />
//                         )}
//                         {showSuccessPopup && (
//                             <ConfirmAlert visible={this.state.showSuccessPopup} message="Berhasil hapus EQ" customClass="col-sm-3" onClick={this.handlePopup}/>
//                         )}


//                     </div>
//                 </div>
//                 {/* <div className="container">
//                     <div className="card shadow border-0" style={{borderRadius:'20px'}}>
//                         <div className="card-body">
//                             <div className="row p-3">
//                                 <div className="col">
//                                     <div className="card border-0" style={{borderRadius:'10px', boxShadow:'1px 1px 3px 3px #bfbfbf'}}>
//                                         <div className="card-body">
//                                             <div className="row">
//                                                 <div className="col">
//                                                     <div className="row">
//                                                         <div className="col-12">
//                                                             <span className="text" style={{fontSize:'13px', fontWeight:'bold'}}>71221</span>
//                                                         </div>
//                                                         <div className="col-12">
//                                                             <span className="text" style={{color:'blue', fontSize:'15px', fontWeight:'bold'}}>CobaInsert</span>
//                                                         </div>
//                                                         <div className="col-12">
//                                                             <span className="text" style={{fontSize:'13px', fontWeight:'bold'}}>CobaInsert</span>
//                                                         </div>
//                                                     </div>
//                                                 </div>

//                                                 <div className="col-md-auto">
//                                                     <Link className="text-decoration-none" to="/form-eq"><h6 className="text title-icare" style={{marginTop:'70px', fontWeight: 'bold'}}>Ubah</h6></Link>
//                                                 </div>
//                                                 <div className="col-md-auto">
//                                                     <img src="images/Verified.png" style={{height:'70px'}}></img>
//                                                 </div>
//                                                 <div className="col-md-auto">
//                                                 <h6 className="text title-icare" style={{marginTop:'70px', fontWeight: 'bold'}}>Hapus</h6>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="row p-3">
//                                 <div className="col">
//                                     <div className="card border-0 mt-2" style={{borderRadius:'10px', boxShadow:'1px 1px 3px 3px #bfbfbf'}}>
//                                         <div className="card-body">
//                                             <div className="row">
//                                                 <div className="col">
//                                                     <div className="row">
//                                                         <div className="col-12">
//                                                             <span className="text" style={{fontSize:'13px', fontWeight:'bold'}}>300822</span>
//                                                         </div>
//                                                         <div className="col-12">
//                                                             <span className="text" style={{color:'blue', fontSize:'15px', fontWeight:'bold'}}>model1</span>
//                                                         </div>
//                                                         <div className="col-12">
//                                                             <span className="text" style={{fontSize:'13px', fontWeight:'bold'}}>tes aja</span>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                                 <div className="col-md-auto">
//                                                 <Link className="text-decoration-none" to="/form-eq"><h6 className="text title-icare" style={{marginTop:'70px', fontWeight: 'bold'}}>Ubah</h6></Link>
//                                                 </div>
//                                                 <div className="col-md-auto">
//                                                 <img src="images/Verified.png" style={{height:'70px'}}></img>
//                                                 </div>
//                                                 <div className="col-md-auto">
//                                                 <h6 className="text title-icare" style={{marginTop:'70px', fontWeight: 'bold'}}>Hapus</h6>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="row p-3">
//                                 <div className="col">
//                                     <div className="card border-0 mt-2 mb-3" style={{borderRadius:'10px', boxShadow:'1px 1px 3px 3px #bfbfbf'}}>
//                                         <div className="card-body">
//                                             <div className="row">
//                                                 <div className="col">
//                                                     <div className="row">
//                                                         <div className="col-12">
//                                                             <span className="text" style={{fontSize:'13px', fontWeight:'bold'}}>798689</span>
//                                                         </div>
//                                                         <div className="col-12">
//                                                             <span className="text" style={{color:'blue', fontSize:'15px', fontWeight:'bold'}}>ApeosPort C2060</span>
//                                                         </div>
//                                                         <div className="col-12">
//                                                             <span className="text" style={{fontSize:'13px', fontWeight:'bold'}}>test</span>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                                 <div className="col-md-auto">
//                                                 <Link className="text-decoration-none" to="/form-eq"><h6 className="text title-icare" style={{marginTop:'70px', fontWeight: 'bold'}}>Ubah</h6></Link>
//                                                 </div>
//                                                 <div className="col-md-auto" style={{marginRight:'70px'}}>
//                                                     <img src="images/approved.png"></img>
//                                                 </div>
//                                                 <div className="col-md-auto">
//                                                 <h6 className="text title-icare" style={{marginTop:'70px', fontWeight: 'bold'}}>Hapus</h6>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div> */}
//             </div>
//             </>
//         )
//     }
// }
