import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import RemoveAlert from "../../component/alert/removeAlert";
import ConfirmAlert from "../../component/alert/confirmAlert";
import LoadingAlert from "../../component/alert/loadingAlert";
import { NavDropdown } from "react-bootstrap";
import { deleteMember, getAllDataMember } from "../../services/API/mod_member";

function DaftarAnggota() {
    const { id } = useParams()
    const navigate = useNavigate()
    // const [showPopup, setShowPopup] = useState(false)
    const [showSuccessPopup, setShowSuccessPopup] = useState(false)
    const [showErrorPopup, setShowErrorPopup] = useState(false)
    const [showDeletePopup, setShowDeletePopup] = useState(false)
    const [alertOption, setAlertOption] = useState({ title: '', message: '' })
    const [loading, setLoading] = useState(false)
    const [deletedAnggota, setDeletedAnggota] = useState('')
    const [searchActive, setSearchActive] = useState(false)
    const [isActive, setIsActive] = useState(false)
    const [dataMember, setDataMember] = useState([])
    const [clickSearch, setClickSeacrh] = useState(false)
    const [dataMemberDefault, setDataMemberDefault] = useState([])
    const [showMoreMember, setShowMoreMember] = useState(true)
    const [itemsMember, setItemsMember] = useState(10)

    useEffect(() => {
        init()

    }, []);

    async function init() {
        setLoading(true)
        const res = await getAllDataMember()
        setLoading(false)
        if (res.status == 200) {
            setDataMember(res.data.Table)
            setDataMemberDefault(res.data.Table)
            // console.log(res.data);
            if(res.data.Table.length < itemsMember) {
                setShowMoreMember(false)
            } else {
                setShowMoreMember(true)
            }
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
        document.getElementById('keyword').value = '';
    }

    const handleDeletedAnggota = (id, namalengkap) => {
        setShowDeletePopup(true)
        setDeletedAnggota(id)
        setAlertOption({ title: 'Konfirmasi', message: `Hapus Anggota : ${namalengkap}`, redirect: false })
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
        if (res.status == 200) {
            setDeletedAnggota('')
            setShowSuccessPopup(true)
            setAlertOption({ title: 'Berhasil', message: 'Anggota berhasil dihapus', redirect: false })
            init()
        }
    }

    const handleNavClick = (nav) => {
        setIsActive(false)

        if (nav === "active") {
            setIsActive(true)
        }
    }

    const handleSearchActive = () => {
        setSearchActive(false)
        setClickSeacrh(false)
    }

    const handleSearch = (e) => {
        if(e.target.value != '') {
            var filterData = dataMemberDefault.filter(val => (val.namalengkap.toString().toLowerCase().includes(e.target.value.toLowerCase())) || val.emailaddress.toLowerCase().includes(e.target.value.toLowerCase()) || val.telp.toLowerCase().includes(e.target.value.toLowerCase()))
            setDataMember(filterData)

            if (filterData.length < itemsMember) {
                setShowMoreMember(false)
            } else {
                setShowMoreMember(true)
            }
        } else {
            setDataMember(dataMemberDefault)

            if (dataMemberDefault.length > itemsMember) {
                setShowMoreMember(true)
            } else {
                setShowMoreMember(false)
            }
        }
    }

    const handleResetSearch = () => {
        setDataMember(dataMemberDefault)

        if (dataMemberDefault.length > itemsMember) {
            setShowMoreMember(true)
        } else {
            setShowMoreMember(false)
        }
    }

    const handleShowMoreMember = () => {
        const showItems = 5
        const newItemsMember = itemsMember + showItems

        setItemsMember(newItemsMember)

        if (newItemsMember >= dataMember.length) {
            setShowMoreMember(false)
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
                                    <span className="nav-link d-inline d-md-none me-3" onClick={handleSearchActive}>
                                        <i className="fa fa-arrow-left color-arrow-left"></i>
                                    </span>
                                    <form style={{display: 'contents'}} onSubmit={(e) => e.preventDefault()}>
                                        <input onKeyUp={handleSearch} onClick={() => setClickSeacrh(true)} id="keyword" type="text" className="form-control search-riwayat d-md-none d-inline" placeholder="Telusuri..." style={{position:'absolute', right:65}}/>
                                        <button className="d-md-none d-inline" type="reset" style={{background:'none', cursor:'pointer', border:0, right:35, position:'absolute'}} onClick={handleResetSearch}>
                                            <i className="fa fa-close" style={{color: clickSearch === true ? '#fff' : 'transparent'}}></i>
                                        </button>
                                    </form>
                                    {/* <input onKeyUp="" type="text" className="form-control search-riwayat" placeholder="Telusuri..." style={{position: 'absolute', right: 35}} /> */}
                                    <NavDropdown className={`custom-dropdown text-white ${isActive ? 'active-link' : ''}`} onClick={() => handleNavClick('active')} id="nav-dropdown" title={<i className="fa fa-ellipsis-v d-md-none nav-app" style={{fontSize: '20px'}}></i>} style={{position: 'absolute', right: 20, zIndex: '1111'}}>
                                        <NavDropdown.Item href="/tambah_anggota">
                                            <div className="item-drop d-felx align-items-center">
                                                <div className="col-9">
                                                    <span className="text-decoration-none nav-app" style={{ color: '#000' }}>Tambah Anggota</span>
                                                </div>
                                            </div>
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </div>
                            ) : (
                                <>
                                    <div className="col-md-12 col-8">
                                        <h4 className="title-icare title-fitur m-0 p-0 fw-bold" style={{ fontSize: '18px' }}>
                                            <Link className="nav-link d-inline d-md-none me-3" to="/dashboard">
                                                <i className="fa fa-arrow-left color-arrow-left"></i>
                                            </Link>
                                            <span className="title-bold" style={{ borderBottom: '3px solid #014C90' }}>Daftar Anggota</span>
                                        </h4>
                                    </div>
                                    <div className="col-2 d-md-none d-block text-end">
                                        <Link to="/tambah_anggota">
                                            <i className="fa fa-plus-circle" style={{fontSize: '20px'}}></i>
                                        </Link>
                                    </div>
                                    <div className="col-2 d-md-none d-block text-end">
                                        <span>
                                            <i className="fa fa-search text-white" onClick={() => setSearchActive(true)} style={{ fontSize: '20px' }}></i>
                                        </span>
                                    </div>

                                </>
                            )
                        }
                    </div>
                </div>
                <div className="d-md-flex d-none">
                    <div className="col-sm-12">
                        <form className="d-flex" style={{width:'100%'}} onSubmit={(e) => e.preventDefault()}>
                            <span className="my-auto" style={{color:'#014C90'}}>
                                <i className="fa fa-search fa-fw"></i>
                            </span>
                            <input type="text" onKeyUp={handleSearch} id="keyword" className="form-control me-2 border-0 border-only-bottom" style={{fontSize:'12px', marginLeft:'5px', color:'black'}} />
                            <button style={{margin:'auto', cursor:'pointer', border:'0', background:'none'}} type="reset" onClick={handleResetSearch}>
                                <i className="fa fa-close"></i>
                            </button>
                        </form>
                    </div>
                    <div className="col-md-6 col-3 text-end px-0">
                        <Link to="/tambah_anggota">
                            <button className="btn btn-login" style={{padding:'8px 20px', fontSize:'14px'}}>
                                <i className="fa fa-plus" style={{marginRight:'5px'}}></i>
                                Tambah Anggota
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="">
                <div className="card shadow border-0 px-lg-4 px-md-4 responsive-member rounded-4">
                    <div className="card-body" >
                        <div className="row px-lg-0 px-md-0 px-2">
                            {
                                dataMember.slice(0, itemsMember).map((val,key) => (
                                    <div className="card-anggota d-flex mb-lg-5 mb-3" key={key} style={{borderRadius:'10px', boxShadow:'1px 1px 2px 2px #bfbfbf'}}>
                                        <div className="col-lg-8 col-7 px-2 pt-0 font-size-11px-mobile" style={{fontSize:'13px', fontWeight:'bold'}}>
                                            <p className="mb-1 mt-lg-3 mt-md-3 mt-2">{val.namalengkap}</p>
                                            <p className="mb-1">{val.emailaddress}</p>
                                            <p className="mb-1">{val.telp}</p>
                                        </div>
                                        <div className="col-lg-4 col-5 d-lg-flex d-flex responsive-anggota mb-lg-2 mb-md-2 mb-0 py-lg-2 py-md-2 py-1 text-center">
                                            <div className="col-lg-8 col-5 text-position-right">
                                                <a 
                                                    href="/tambah_anggota"
                                                    className="text-decoration-none"
                                                    onClick={handleUpdate}
                                                    data-id={val.id}
                                                >
                                                    <h6 className="text title-icare font-size-12px-mobile margin-top-52px" style={{marginTop:'70px', fontWeight:'bold', pointerEvents:'none'}}>Ubah</h6>
                                                </a>
                                            </div>
                                            <div className="col-lg-4 col-6 text-position-right">
                                                <button className="title-icare fw-bold font-size-12px-mobile margin-top-49px" style={{background:'none', border:'none', marginTop:'67px'}} onClick={() => handleDeletedAnggota(val.id, val.namalengkap)}>Hapus</button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                            {
                                showMoreMember && (
                                    <div className="p-0 mt-3">
                                        <button className="btn btn-primary font-size-14px-mobile" type="button" style={{width:'100%', height:'50px', background:'#014C90', borderRadius:'15px'}} onClick={handleShowMoreMember}>Lihat lebih banyak...</button>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <LoadingAlert visible={loading} customClass="col-md-2 col-8" />
                    {showDeletePopup && (
                        <RemoveAlert visible={showDeletePopup} message={alertOption.message} customClass="col-md-3 col-9" onCancel={handleCancelDelete} onClick={() => {handleConfirmDelete()}}/>
                        )}
                    {showSuccessPopup && (
                        <ConfirmAlert visible={showSuccessPopup} message={alertOption.message} customClass="col-md-3 col-9" onClick={handlePopup}></ConfirmAlert>
                        )}
                </div>
            </div>
        </>
    )
}

export default DaftarAnggota