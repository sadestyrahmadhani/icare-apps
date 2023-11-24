import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import RemoveAlert from "../../component/alert/removeAlert";
import ConfirmAlert from "../../component/alert/confirmAlert";
import LoadingAlert from "../../component/alert/loadingAlert";
import { NavDropdown } from "react-bootstrap";
import { deleteMember, getAllDataMember } from "../../services/API/mod_member";

function DaftarAnggota() {
    const navigate = useNavigate()
    // const [showPopup, setShowPopup] = useState(false)
    const [showSuccessPopup, setShowSuccessPopup] = useState(false)
    const [showErrorPopup, setShowErrorPopup] = useState(false)
    const [showDeletePopup, setShowDeletePopup] =  useState(false)
    const [alertOption, setAlertOption] = useState({title: '', message: ''})
    const [loading, setLoading] = useState(false)
    const [deletedAnggota, setDeletedAnggota] = useState('')
    const [searchActive, setSearchActive] = useState(false)
    const [isActive, setIsActive]= useState(false)
    const [dataMember, setDataMember] = useState([])

    useEffect(() => {
        init()
        
    }, []);

    async function init() {
        setLoading(true)
        const res = await getAllDataMember()
        setLoading(false)
        if(res.status == 200) {
            setDataMember(res.data.Table)
            // console.log(res.data);
        }
    }

    const handleUpdate = (e) => {
        e.preventDefault()
        navigate(e.target.getAttribute('href'), {
            state: {
                id: e.target.getAttribute('data-id')
            }
        })
    }

    const handlePopup = () => {
        setShowSuccessPopup(false)
        setShowErrorPopup(false)
    }

    const handleDeletedAnggota = (id, namalengkap) => {
        setShowDeletePopup(true)
        setDeletedAnggota(id)
        setAlertOption({title: 'Konfirmasi', message: `Hapus Anggota ${namalengkap}`, redirect: false})
    }

    const handleCancelDelete = () => {
        setShowDeletePopup(false)
        setShowSuccessPopup(false)
    }

    const handleConfirmDelete = async () => {
        setShowDeletePopup(false)
        setLoading(true)
        const res = await deleteMember(deletedAnggota)
        setLoading(false)
        if(res.status == 200) {
            setDeletedAnggota('')
            setShowSuccessPopup(true)
            setAlertOption({title: 'Berhasil', message: 'Anggota berhasil dihapus', redirect: false})
            init()
        }
    }

    const handleNavClick = (nav) => {
        setIsActive(false)

        if (nav === "active") {
            setIsActive(true)
        }
    }


    return (
        <>
            <div className="responsive-bar d-md-flex">
                <div className="col-md-6 col-6 mb-md-5">
                    <div className="row">
                        {
                            searchActive ? (
                                <div className="d-flex align-items-center">
                                    <span className="nav-link d-inline d-md-none me-3" onClick={() => setSearchActive(false)}>
                                        <i className="fa fa-arrow-left color-arrow-left"></i>
                                    </span>
                                    <input onKeyUp="" type="text" className="form-control search-riwayat" placeholder="Telusuri..." style={{position: 'absolute', right: 35}} />
                                    <NavDropdown className={`custom-dropdown text-white ${isActive ? 'active-link' : ''}`} onClick={() => handleNavClick('active')} id="nav-dropdown" title={<i className="fa fa-ellipsis-v d-md-none nav-app" style={{fontSize: '20px'}}></i>} style={{position: 'absolute', right: 20, zIndex: '1111'}}>
                                        <NavDropdown.Item href="/tambah_anggota">
                                            <div className="item-drop d-felx align-items-center">
                                                <div className="col-9">
                                                    <span className="text-decoration-none nav-app" style={{color: '#000'}}>Tambah Anggota</span>
                                                </div>
                                            </div>
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </div>
                            ) : (
                                <>
                                    <div className="col-md-12 col-8">
                                        <h4 className="title-icare title-fitur m-0 p-0 fw-bold" style={{fontSize:'18px'}}>
                                            <Link className="nav-link d-inline d-md-none me-3" to="/dashboard">
                                                <i className="fa fa-arrow-left color-arrow-left"></i>
                                            </Link>
                                            <span className="title-bold" style={{borderBottom:'3px solid #014C90'}}>Daftar Anggota</span>
                                        </h4>
                                    </div>
                                    <div className="col-2 d-md-none d-block text-end">
                                        <Link to="/tambah_anggota">
                                            <i className="fa fa-plus-circle" style={{fontSize: '20px'}}></i>
                                        </Link>
                                    </div>
                                    <div className="col-2 d-md-none d-block text-end">
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
                    <div className="col-sm-12">
                        <form className="d-flex" style={{width:'100%'}}>
                            <span className="my-auto" style={{color:'#014C90'}}>
                                <i className="fa fa-search fa-fw"></i>
                            </span>
                            <input type="text" className="form-control me-2 border-0 border-only-bottom" style={{fontSize:'12px', marginLeft:'5px', color:'black'}} />
                            <button style={{margin:'auto', cursor:'pointer', border:'0', background:'none'}} type="reset">
                                <i className="fa fa-close"></i>
                            </button>
                        </form>
                    </div>
                    <div className="col-md-6 col-3 text-end px-0">
                        <Link to="/tambah_anggota/0">
                            <button className="btn btn-login" style={{padding:'8px 20px', fontSize:'14px'}}>
                                <i className="fa fa-plus" style={{marginRight:'5px'}}></i>
                                Tambah Anggota
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="">
                <div className="card shadow border-0 px-lg-4 px-md-4 responsive-form rounded-4">
                    <div className="card-body" >
                        <div className="row">
                            {
                                dataMember.map((val,key) => (
                                    <div className="card-anggota d-flex mb-lg-5 mb-3" key={key} style={{borderRadius:'10px', boxShadow:'1px 1px 2px 2px #bfbfbf'}}>
                                        <div className="col-lg-8 col-7 px-2 pt-0" style={{fontSize:'14px', fontWeight:'bold'}}>
                                            <p className="mb-1 mt-3">{val.namalengkap}</p>
                                            <p className="mb-1">{val.emailaddress}</p>
                                            <p className="mb-1">{val.telp}</p>
                                        </div>
                                        <div className="col-lg-4 col-5 d-lg-flex d-flex responsive-anggota mb-2 py-2 text-center">
                                            <div className="col-lg-8 col-5 text-position-right">
                                                <a 
                                                    href="/tambah_anggota/1"
                                                    className="text-decoration-none"
                                                    onClick={handleUpdate}
                                                    data-id={val.id}
                                                >
                                                    <h6 className="text title-icare font-anggota" style={{marginTop:'70px', fontWeight:'bold', pointerEvents:'none'}}>Ubah</h6>
                                                </a>
                                            </div>
                                            <div className="col-lg-4 col-6 text-position-right">
                                                <button className="title-icare fw-bold font-anggota" style={{background:'none', border:'none', marginTop:'67px'}} onClick={() => handleDeletedAnggota(val.id, val.namalengkap)}>Hapus</button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <LoadingAlert visible={loading} customClass="col-md-2 col-8"/>
                    {showDeletePopup && (
                        <RemoveAlert visible={showDeletePopup} titleMessage={alertOption.title} message={alertOption.message} customClass="col-md-3 col-8" onCancel={handleCancelDelete} onClick={() => {handleConfirmDelete()}}/>
                        )}
                    {showSuccessPopup && (
                        <ConfirmAlert visible={showSuccessPopup} titleMessage={alertOption.title} message={alertOption.message} customClass="col-md-2 col-8" onClick={handlePopup}></ConfirmAlert>
                        )}
                </div>
            </div>
        </>
    )
}

export default DaftarAnggota