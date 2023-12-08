import React, { Component, useState, useRef, useEffect } from "react";
import 'font-awesome/css/font-awesome.min.css';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getDaftarAlamat, getDownloadAlamat, UploadAlamat, deleteDaftarAlamat, updateDefault, updateVerified } from "../../services/API";
import ConfirmAlert from "../../component/alert/confirmAlert";
import RemoveAlert from "../../component/alert/removeAlert";
import LoadingAlert from "../../component/alert/loadingAlert";
import UploadFileAlert from "../../component/alert/uploadFileAlert";
import { NavDropdown } from "react-bootstrap";
import ErrorAlert from "../../component/alert/errorAlert";
import verifyIcon from './../../images/verify.png'



function AddressList() {
    const location = useLocation()
    const navigate = useNavigate()
    const [showPopupDelete, setShowPopupDelete] = useState(false)
    const [showPopupPrioritize, setShowPopupPrioritize] = useState(false)
    const [showSuccessPopup, setShowSuccessPopup] = useState(false)
    const [showErrorPopup, setShowErrorPopup] = useState(false)
    const [alertOption, setAlertOption] = useState({ title: '', message: '', reload: false })
    const [dataDaftarAlamat, setDataDaftarAlamat] = useState([])
    const [loading, setLoading] = useState(false)
    const [dataDaftarAlamatDefault, setDataDaftarAlamatDefault] = useState([])
    const [daftarAlamatToDelete, setDaftarAlamatToDelete] = useState('')
    const [addressDefault, setAddressDefault] = useState('')
    const [addressId, setAddressId] = useState('')
    const [addressVerified, setAddressVerified] = useState('')
    const [searchActive, setSearchActive] = useState(false)
    const [isActive, setIsActive] = useState(false)
    const [itemsAddress, setItemsAddress] = useState(10)
    const [showMoreAddress, setShowMoreAddress] = useState(true)
    const [clickSearch, setClickSearch] = useState(false)

    const inputFileRef = React.useRef();


    useEffect(() => {
        init()
    }, []);

    async function init() {
        setLoading(true)
        const res = await getDaftarAlamat();
        setLoading(false)
        // console.log(res.data.Table)
        if (res.status == 200) {
            setDataDaftarAlamat(res.data.Table)
            setDataDaftarAlamatDefault(res.data.Table)
            // console.log(res)

            if (res.data.Table.length <= itemsAddress) {
                setShowMoreAddress(false)
            } else {
                setShowMoreAddress(true)
            }
        }
    }

    const getAddressWithoutLoading = async () => {
        const res = await getDaftarAlamat()

        if (res.status === 200) {
            setDataDaftarAlamat(res.data.Table)
            setDataDaftarAlamatDefault(res.data.Table)

            if (res.data.Table.length <= itemsAddress) {
                setShowMoreAddress(false)
            } else {
                setShowMoreAddress(true)
            }
        }
    }

    const handleAddressItem = (e) => {
        if (location.state?.isSelectAddress) {
            // console.log(e.target.getAttribute('data-item'))
            navigate(`/tambah_eq/${location.state.id}`, {
                state: {
                    address: JSON.parse(e.currentTarget.getAttribute('data-item')),
                    input: location.state.input,
                    redirect: location.state?.redirect
                }
            })
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
        setShowPopupDelete(false)
        setShowPopupPrioritize(false)
        setShowSuccessPopup(false)
        setShowErrorPopup(false)
        document.getElementById('keyword').value = '';

        if (alertOption.reload) {
            init()
        } else {
            getAddressWithoutLoading()
        }
    }

    const handleDelete = (e, Nama_Alamat) => {
        setShowPopupDelete(true)
        setDaftarAlamatToDelete(e)
        setAlertOption({ title: 'Konfirmasi', message: `Hapus alamat : ${Nama_Alamat}`, reload: false })
    }

    const handleConfirmationDelete = async () => {
        setShowPopupDelete(false)
        setLoading(true)
        const res = await deleteDaftarAlamat(daftarAlamatToDelete)
        setLoading(false)
        if (res.status == 200) {
            setShowSuccessPopup(true)
            setDaftarAlamatToDelete('')

            if (res.data.includes('Succes delete')) {
                setAlertOption({ title: 'Berhasil', message: 'Alamat berhasil dihapus', reload: true })
            } else if (res.data.includes('User Address terpakai pada equipment, tidak bisa dihapus')) {
                setAlertOption({ title: 'Error', message: 'Alamat tidak bisa dihapus karena terkait pada equipment', redirect: false })
            }
        }
    }

    const handlePrioritize = (id, Default, Nama_Alamat) => {
        setShowPopupPrioritize(true)
        setAddressDefault(Default)
        setAddressId(id)
        setAlertOption({ title: 'Konfirmasi', message: `Utamakan alamat ${Nama_Alamat} ?`, reload: false })
        // console.log(Nama_Alamat);
    }

    const handleConfirmationPrioritize = async () => {
        setShowPopupPrioritize(false)
        setLoading(true)
        const res = await updateDefault(addressId, { Default: true })
        setLoading(false)
        console.log(res);
        if (res.status == 200) {
            // dataDaftarAlamat.forEach(async (val, key) => {
            //     var payload = {}
            //     if(val.id.toString() == addressId.toString()) {
            //         payload = {Default: true}
            //     } else {
            //         payload = {Default: false}
            //         const res = await updateDefault(val.id, payload)
            //         console.log(val.id, payload)
            //     }
            // })

            setAddressId('')
            setAddressDefault('')
            setShowSuccessPopup(true)
            setAlertOption({ title: 'Berhasil', message: 'Berhasil mengutamakan', reload: true })
            // init()
        } else {
            setShowSuccessPopup(true)
            setAlertOption({ title: 'Error', message: 'Opss! terjadi kesalahan', reload: false })
        }
    }

    const handleSearch = (e) => {
        if (e.target.value != '') {
            var filterData = dataDaftarAlamatDefault.filter(val => (val.Nama_Alamat.toString().toLowerCase().includes(e.target.value.toLowerCase())) || val.Penerima.toLowerCase().includes(e.target.value.toLowerCase()) || val.Alamat.toLowerCase().includes(e.target.value.toLowerCase()) || val.Kota.toLowerCase().includes(e.target.value.toLowerCase()) || val.Kode_Pos.toLowerCase().includes(e.target.value.toLowerCase()) || val.Telp_Penerima.toLowerCase().includes(e.target.value.toLowerCase()) || val.NamaGedung.toLowerCase().includes(e.target.value.toLowerCase()))
            setDataDaftarAlamat(filterData)

            if ( filterData.length <= itemsAddress ) {
                setShowMoreAddress(false)
            } else {
                setShowMoreAddress(true)
            }
        } else {
            setDataDaftarAlamat(dataDaftarAlamatDefault)
            
            if ( dataDaftarAlamatDefault.length >= itemsAddress ) {
                setShowMoreAddress(true)
            } else {
                setShowMoreAddress(false)
            }
        }
    }

    const handleSearchActive = () => {
        setSearchActive(false)
        setClickSearch(false)
    }

    const handleResetSearch = () => {
        setDataDaftarAlamat(dataDaftarAlamatDefault)

        if ( dataDaftarAlamatDefault.length >= itemsAddress ) {
            setShowMoreAddress(true)
        } else {
            setShowMoreAddress(false)
        }
    }

    const handleDownloadCSV = async () => {
        setLoading(true)
        await getDownloadAlamat()
        setLoading(false)
        // const header = 'Nama_Alamat, Penerima, Telp_Penerima, NamaGedung, Alamat, Kode_Pos, Kota, Latitude, Longitude'
        // const csv = [header]

        // dataDaftarAlamat.forEach((item) => {
        //     const row = `${item.Nama_Alamat}, ${item.Penerima}, ${item.Telp_Penerima.toString()}, ${item.NamaGedung}, ${item.Alamat}, ${item.Kode_Pos}, ${item.Kota}, ${item.Latitude}, ${item.Longitude}`
        //     csv.push(row)
        // })

        // const csvContent = 'data:text/csv;charset=utf-8,' + csv.join('\n')
        // const encodedUri = encodeURI(csvContent)
        // const link = document.createElement('a')
        // link.setAttribute('href', encodedUri)
        // link.setAttribute('download', 'daftar_alamat.csv')
        // link.click()
    }

    const handleCSVUpload = async (e) => {
        const file = e.target.files[0];

        if (file) {
            setLoading(true)
            const res = await UploadAlamat(file)
            e.target.value = null
            // console.log('upload address', res)
            if (res.result == "Sukses") {
                setShowSuccessPopup(true)
                setAlertOption({ title: 'Upload', message: `Berhasil upload`, reload: true })
                init()
            } else {
                // console.log("masuk error")
                setShowErrorPopup(true)
                let message = ""
                if (res.error) {
                    message += "<p>"
                    res.error.forEach(e => {
                        message += "<span>" + e + "</span>"
                    })
                    message += "</p>"
                }
                setAlertOption({ title: res.result, message: message, redirect: false })
            }
            setLoading(false)

        }

    }

    const handleUpload = () => {
        inputFileRef.current.click();
    }

    const handleNavClick = (nav) => {
        setIsActive(false)

        if (nav === "active") {
            setIsActive(true)
        }
    }

    const handleShowMoreAddress = () => {
        const showItems = 5
        const newItemsAddress = itemsAddress + showItems

        setItemsAddress(newItemsAddress)

        if (newItemsAddress >= dataDaftarAlamat.length) {
            setShowMoreAddress(false)
        }
    }

    const sortedAddresses = dataDaftarAlamat.slice().sort((a, b) => {
        return b.Default - a.Default
    })

    return (
        <>
            <div className="responsive-bar d-md-flex">
                <div className="col-md-3 col-12 mb-md-5">
                    <div className="row">
                        {
                            searchActive ? (
                                <div className="d-flex align-items-center">
                                    <span className="nav-link d-inline d-md-none me-3" onClick={handleSearchActive}>
                                        <i className="fa fa-arrow-left color-arrow-left"></i>
                                    </span>
                                    <form style={{ display: 'contents' }} onSubmit={(e) => e.preventDefault()}>
                                        <input onKeyUp={handleSearch} id="keyword" onClick={() => setClickSearch(true)} type="text" className="form-control search-riwayat d-md-none d-inline" placeholder="Telusuri..." style={{ position: 'absolute', right: 65 }} />
                                        <button className="d-md-none d-inline" type="reset" style={{ background: 'none', cursor: 'pointer', border: 0, right: 35, position: 'absolute' }} onClick={handleResetSearch}>
                                            <i className="fa fa-close" style={{ color: clickSearch === true ? '#fff' : 'transparent' }}></i>
                                        </button>
                                    </form>
                                    <NavDropdown className={`custom-dropdown text-white ${isActive ? 'active-link' : ''}`} onClick={() => handleNavClick('active')} id="nav-dropdown" title={<i className="fa fa-ellipsis-v d-md-none nav-app" style={{ fontSize: '20px' }}></i>} style={{ position: 'absolute', right: 20, zIndex: '1111' }}>
                                        {/* <i className="fa fa-ellipsis-v d-md-none"></i> */}
                                        <NavDropdown.Item href="/tambah_alamat">
                                            <div classname="item-drop d-flex align-items-center">
                                                <div className="col-9">
                                                    <span className="text-decoration-none nav-app font-size-12px-mobile" style={{ color: '#000' }}>Tambah Alamat</span>
                                                </div>
                                            </div>
                                        </NavDropdown.Item>
                                    </NavDropdown>

                                    {/* </div> */}
                                </div>
                            ) : (
                                <>
                                    <div className="col-md-12 col-8" >
                                        <h4 className="title-icare title-fitur m-0 p-0 fw-bold" style={{ fontSize: '18px' }}>
                                            <Link className="nav-link d-inline d-md-none me-3" to="/dashboard">
                                                <i className="fa fa-arrow-left color-arrow-left"></i>
                                            </Link>
                                            <span className="title-bold" style={{ borderBottom: '3px solid #014C90' }}>Pengaturan Alamat</span>
                                        </h4>
                                    </div>
                                    <div className="col-2 d-md-none d-block text-end">
                                        <Link to="/tambah_alamat">
                                            <i className="fa fa-plus-circle" style={{ fontSize: '20px' }}></i>
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

                <div className="col-md-10 row d-md-flex d-none">
                    <div className="col-lg-5 col-md-5 col-12 px-lg-0">
                        <form className="d-flex" style={{ width: '100%' }} onSubmit={(e) => e.preventDefault()}>
                            <span className="my-auto" style={{ color: '#014C90' }}>
                                <i className="fa fa-search fa-fw" style={{ marginRight: 'auto' }}></i>
                            </span>
                            <input onKeyUp={handleSearch} type="text" id="keyword" className="form-control me-2 border-0 border-only-bottom" style={{ fontSize: '14px', marginLeft: '5px', color: 'black' }} />
                            <button style={{ margin: 'auto', cursor: 'pointer', border: '0', background: 'none' }} type="reset" onClick={handleResetSearch}>
                                <i className="fa fa-close"></i>
                            </button>
                        </form>
                    </div>
                    {/* <div className="col-md-6 col-3 text-end" style={{ paddingRight: '25px' }}> */}
                    <div className="col-md-6 col-3 text-end px-0" style={{ paddingRight: '5px !important' }}>
                        <input type="file" ref={inputFileRef} accept=".xlsx" onChange={handleCSVUpload} className="d-none" />
                        <label htmlFor="csvFile">
                            <button onClick={handleUpload} className="btn btn-outline-danger me-3" style={{ fontSize: '14px', padding: '8px 10px' }}>
                                Upload Alamat <i className="fa fa-upload" style={{ marginLeft: '5px' }}></i>
                            </button>
                        </label>
                        <button onClick={handleDownloadCSV} className="btn btn-outline-primary btn-download me-3" style={{ fontSize: '14px', padding: '8px 23.5px', color: '#014C90' }}>
                            Download <i className="fa fa-download" style={{ marginLeft: '5px' }}></i>
                        </button>
                        <Link to="/tambah_alamat">
                            <button className="btn btn-login" style={{ padding: '8px 15px', fontSize: '14px' }}><i className="fa fa-plus" style={{ marginRight: '5px' }}></i> Tambah Alamat</button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="p-3 shadow rounded-4">
                {sortedAddresses.slice(0, itemsAddress).map((item, key) => (!item.deleted && (
                    <div className="card responsive-form rounded m-lg-4 m-0 mb-lg-0 mb-3" onClick={handleAddressItem} data-item={JSON.stringify(item)} key={key}>
                        <div className="card-body py-md-3 py-2 px-md-3">
                            <h6 className="card-title title-icare fw-bold font-size-12px-mobile" style={{ fontSize: '14px' }}>{item.Nama_Alamat}</h6>
                            <div className="col-12">
                                <div className="row fw-bold">
                                    <div className="col-8 pe-0">
                                        <p className="mb-0 font-size-11px-mobile" style={{ fontSize: '13px' }}>{item.Penerima}</p>
                                        <table className="table table-borderless mb-0">
                                            <thead>
                                                <tbody className="px-auto py-auto">
                                                    <tr>
                                                        <td className="font-size-11px-mobile" style={{ fontSize: '13px' }}>Jalan : {item.Alamat} {item.NoGedung}</td>
                                                    </tr>
                                                    {/* <tr>
                                                            <td className="font-size-11px-mobile" style={{ fontSize: '13px' }}>No Gedung : {item.NoGedung}</td>
                                                        </tr> */}
                                                    <tr>
                                                        <td className="font-size-11px-mobile" style={{ fontSize: '13px' }}>Nama Gedung : {item.NamaGedung}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="font-size-11px-mobile" style={{ fontSize: '13px' }} >{item.Telp_Penerima}</td>
                                                    </tr>
                                                </tbody>
                                                {
                                                    item.isPin ?
                                                        (
                                                            <div className="font-size-12px-mobile" style={{ border: '0', background: 'none', fontWeight: 'bold' }}>
                                                                <i className="fa fa-map-marker fa-lg my-auto font-size-12px-mobile" style={{ padding: 'initial' }}></i>
                                                                <span className="font-size-12px-mobile" style={{ fontSize: '14px', padding: 'inherit', color: '#014C90' }}> Sudah Pinpoint</span>
                                                            </div>
                                                        ) : (
                                                            <div></div>
                                                        )
                                                }
                                            </thead>
                                        </table>
                                    </div>
                                    <div className="col-md-4 col-4 d-block ms-md-0 text-end">
                                        {
                                            item.verified ? (
                                                <img src={ verifyIcon} alt="" style={{ width: '25%' }} className="mt-md-0 mt-4 verified-icon" />
                                            ) : (
                                                <div style={{ height: '100%' }}></div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 d-block text-end">
                                <ol className="title-icare mb-0 p-0" style={{ fontSize: '14px' }}>
                                    {
                                        !item.Default ?
                                            (
                                                <li className="nav-item space-option">
                                                    <button onClick={() => handlePrioritize(item.id, item.Default, item.Nama_Alamat)} className="nav-link font-size-12px-mobile fw-bold">Utamakan</button>
                                                </li>
                                            ) : (
                                                <div></div>
                                            )
                                    }
                                    <li className="nav-item space-option ms-md-4">
                                        <a
                                            href="/tambah_alamat"
                                            className="nav-link font-size-12px-mobile fw-bold"
                                            onClick={handleUpdate}
                                            data-id={item.id}
                                        >
                                            Ubah
                                        </a>
                                    </li>
                                    <li className="nav-item p-0 ms-md-4">
                                        <button onClick={() => handleDelete(item.id, item.Nama_Alamat)} className="nav-link font-size-12px-mobile fw-bold" >Hapus</button>
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                )))}
                {
                    showMoreAddress &&
                    (
                        <div className="p-0 mx-4 mt-3">
                            <button type="button" className="btn btn-primary font-size-14px-mobile" style={{ width: '100%', height: '50px', backgroundColor: '#014C90', borderRadius: '15px' }} onClick={handleShowMoreAddress}>Lihat lebih banyak...</button>
                        </div>
                    )
                }
                {/* <ConfirmAlert visible={showPopup} message={alertOption.message} onClick={handlePopup} /> */}
                <LoadingAlert visible={loading} customClass="col-md-2 col-8" />
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
                {
                    showErrorPopup && (
                        <ErrorAlert visible={showErrorPopup} message={alertOption.message} onClick={handlePopup} customClass="col-md-3 sol-sm-6 col-9" />
                    )
                }
                {/* {
                        showPopupUpload && (
                            <UploadFileAlert visible={showPopupUpload} onClick={handleCSVUpload} onCancel={() => setShowPopupUpload(false)} />
                        )
                    } */}
            </div>
            {/*<div className="p-3 shadow rounded-4">
                {dataDaftarAlamat.slice(0, itemsAddress).map((item, key) => (!item.deleted && (
                    <div className="card responsive-form rounded m-lg-4 m-0 mb-lg-0 mb-3" onClick={handleAddressItem} data-item={JSON.stringify(item)} key={key}>
                        <div className="card-body py-md-3 py-1 px-3">
                            <h6 className="card-title title-icare fw-bold font-size-12px-mobile" style={{ fontSize: '14px' }}>{item.Nama_Alamat}</h6>
                            <div className="row fw-bold">
                                <div className="col-6 pe-0">
                                    <p className="mb-0 font-size-11px-mobile" style={{ fontSize: '13px' }}>{item.Penerima}</p>
                                    <table className="table table-borderless mb-0">
                                        <thead>
                                            <tbody className="px-auto py-auto">
                                                <tr>
                                                    <td className="font-size-11px-mobile" style={{ fontSize: '13px' }}>Jalan : {item.Alamat} {item.NoGedung}</td>
                                                </tr>
                                                <tr>
                                                    <td className="font-size-11px-mobile" style={{ fontSize: '13px' }}>Nama Gedung : {item.NamaGedung}</td>
                                                </tr>
                                                <tr>
                                                    <td className="font-size-11px-mobile" style={{ fontSize: '13px' }} >{item.Telp_Penerima}</td>
                                                </tr>
                                            </tbody>
                                            {
                                                item.isPin ?
                                                    (
                                                        <div className="font-size-12px-mobile" style={{ border: '0', background: 'none', fontWeight: 'bold' }}>
                                                            <i className="fa fa-map-marker fa-lg my-auto font-size-12px-mobile" style={{ padding: 'initial' }}></i>
                                                            <span className="font-size-12px-mobile" style={{ fontSize: '14px', padding: 'inherit', color: '#014C90' }}> Sudah Pinpoint</span>
                                                        </div>
                                                    ) : (
                                                        <div></div>
                                                    )
                                            }
                                        </thead>
                                    </table>
                                </div>
                                <div className="col-6 text-end px-0">
                                    <div className="d-lg-block d-md-block d-none me-3">
                                        {
                                            item.verified ? (
                                                <img src="images/verify.png" alt="" style={{ paddingTop: '5px', paddingBottom: '10px', height: "100px" }} />
                                            ) : (
                                                <div style={{ height: '100px' }}></div>
                                            )
                                        }
                                        <div className="d-block mb-0">
                                            <ol className="title-icare mb-0" style={{ fontSize: '14px' }}>
                                                {
                                                    !item.Default ?
                                                        (
                                                            <li className="nav-item" style={{ marginRight: '30px' }}>
                                                                <button onClick={() => handlePrioritize(item.id, item.Default, item.Nama_Alamat)} className="nav-link">Utamakan</button>
                                                            </li>
                                                        ) : (
                                                            <div></div>
                                                        )
                                                }
                                                <li className="nav-item" style={{ marginRight: '30px' }}>
                                                    <a
                                                        href="/tambah_alamat/1"
                                                        className="nav-link"
                                                        onClick={handleUpdate}
                                                        data-id={item.id}
                                                    >
                                                        Ubah
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <button onClick={() => handleDelete(item.id, item.Nama_Alamat)} className="nav-link" >Hapus</button>
                                                </li>
                                            </ol>
                                        </div>
                                    </div>
                                    <div className="d-lg-none d-md-none d-block me-2">
                                        {
                                            item.verified ? (
                                                <img src="images/verify.png" alt="" style={{ width: '32%' }} className="my-3" />
                                            ) : (
                                                <div style={{ height: '90px' }}></div>
                                            )
                                        }
                                        <div className="d-block mb-0 mt-1">
                                            <ol className="title-icare mb-0 p-0" style={{ fontSize: '14px' }}>
                                                {
                                                    !item.Default ?
                                                        (
                                                            <li className="nav-item space-option" style={{ marginRight: '5px' }}>
                                                                <button onClick={() => handlePrioritize(item.id, item.Default, item.Nama_Alamat)} className="nav-link font-size-12px-mobile">Utamakan</button>
                                                            </li>
                                                        ) : (
                                                            <div></div>
                                                        )
                                                }
                                                <li className="nav-item space-option" style={{ marginRight: '5px' }}>
                                                    <a
                                                        href="/tambah_alamat/1"
                                                        className="nav-link font-size-12px-mobile"
                                                        onClick={handleUpdate}
                                                        data-id={item.id}
                                                    >
                                                        Ubah
                                                    </a>
                                                </li>
                                                <li className="nav-item p-0">
                                                    <button onClick={() => handleDelete(item.id, item.Nama_Alamat)} className="nav-link font-size-12px-mobile" >Hapus</button>
                                                </li>
                                            </ol>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )))}
                {
                    showMoreAddress &&
                    (
                        <div className="p-0 mx-4 mt-3">
                            <button type="button" className="btn btn-primary" style={{ width: '100%', height: '50px', backgroundColor: '#014C90', borderRadius: '15px' }} onClick={handleShowMoreAddress}>Lihat lebih banyak...</button>
                        </div>
                    )
                }
                <LoadingAlert visible={loading} customClass="col-md-2 col-8" />
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
                {
                    showErrorPopup && (
                        <ErrorAlert visible={showErrorPopup} titleMessage={alertOption.title} message={alertOption.message} onClick={handlePopup} customClass="col-md-3 sol-sm-6 col-9" />
                    )
                }
            </div>*/}
        </>
    )

}

export default AddressList



