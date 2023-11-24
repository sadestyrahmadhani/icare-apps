/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-use-before-define */
import RiwayatTabel from './component/tabel.js'
import AlertConfirm from './../../component/alert/confirmAlert.js'
import LoadingAlert from './../../component/alert/loadingAlert.js'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { getRiwayatOrderByStatus } from '../../services/API/mod_riwayatOrder.js'

function Riwayat() {
    const location = useLocation()
    // const history = useHistory()
    // console.log(location.state);
    
    const [tabActivated, setTabActivated] = useState(location.state?.currentTabActive ?? 'all')
    const [alertVisible, setAlertVisible] = useState(false)
    const [searchActive, setSearchActive] = useState(false)
    // const [pageSize, setPageSize] = useState(10)
    
    const [originalData, setOriginalData] = useState([])
    const [dataRiwayatOrder, setDataRiwayatOrder] = useState([])
    const [skipData, setSkipData] = useState(0)
    const [rowCount, setRowCount] = useState(location.state?.currentSkip ? location.state?.currentSkip + 10 : 10)
    const [searchValue, setSearchValue] = useState('')
    const [loading, setLoading] = useState(false)
    const [showPopup, setShowPopup] = useState(false)
    const [alertOption, setAlertOption] = useState({title:'', message: ''})

    const cardBg = {
        1: {
            title: 'Menunggu Konfirmasi',
            background: '#ff8000'
        },
        2: {
            title: 'Permintaan Diproses',
            background: '#1eb716'
        },
        4: {
            title: 'Reject',
            background: '#ff2020'
        },
        3: {
            title: 'Selesai',
            background: '#009FC7'
        },
        5: {
            title: 'Internal Proses',
            background: '#ffbf00'
        }
    }

    useEffect(() => {
        // alert(1)
        window.history.replaceState({}, document.title)
        init(tabActivated === 'all' ? "0" : tabActivated.toString(), skipData.toString(), rowCount.toString())
    }, [])

    const init = async (status, skip, row) => {
        setDataRiwayatOrder([])
        setLoading(true)
        var res = await getRiwayatOrderByStatus({status: status, skip: skip, rowcount: row})
        setLoading(false)
        console.log(status);
        if(res.status == 200 && res.data !== 'Not Found') {
            var data = res.data.map(({id, namarequest, requestNo, requestd, statusid, keterangan, equipment, createdate, review}) => {
                var requesttype = requestd.map(val => val.namarequesttype).join(', ')
                return{id, namarequest, requestNo, requesttype, statusid, keterangan, equipment, createdate, review}
            })
            console.log(data);
            setOriginalData(data)
            setDataRiwayatOrder(data)
        } else {
            setShowPopup(true)
            setAlertOption({title: 'Error', message: 'Oops! Terjadi kesalahan'})
        }

    }

    const tabItems = [
        {status: 'all', name: 'Semua'},
        {status: '1', name: 'Menunggu Konfirmasi'},
        {status: '2', name: 'Permintaan Diproses'},
        {status: '4', name: 'Permintaan Ditolak'},
        {status: '3', name: 'Permintaan Selesai'},
    ]

    const changeTabActive = (status) => {
        setTabActivated(status)
        setSkipData(0)
        setRowCount(10)
        if(status === 'all') {
            init("0", skipData.toString(), rowCount.toString())
        } else {
            init(status.toString(), skipData.toString(), rowCount.toString())
        }
    }

    const handleSearch = (e) => {
        var searchValue = e.target.value.toLowerCase()
        var tempData = originalData
        if(tabActivated !== 'all') {
            tempData = originalData.filter(val => val.statusid === tabActivated)
        }

        const filteredData = tempData.filter(val => (val.namarequest.toLowerCase().includes(searchValue) || val.requesttype.toLowerCase().includes(searchValue) || val.equipment.toLowerCase().includes(searchValue) || val.requestNo.toLowerCase().includes(searchValue) || val.createdate.toLowerCase().includes(searchValue)))
        setDataRiwayatOrder(filteredData)
        
        setSearchValue(e.currentTarget.value)
    }

    const handleClear = () => {
        var filteredData = originalData.filter(val => val.statusid === tabActivated)
        if(tabActivated !== 'all') {
            setDataRiwayatOrder(filteredData)
        } else {
            setDataRiwayatOrder(originalData)
        }
    }

    const handleShowMore = async () => {
        setSkipData(skipData + 10)
        // setRowCount(rowCount + 10)
        setLoading(true)
        const res = await getRiwayatOrderByStatus({status: tabActivated === 'all' ? '0' : tabActivated.toString(), skip: (skipData+10).toString(), rowcount: rowCount.toString()})
        setLoading(false)
        if(res.status == 200) {
            var temp = originalData
            var data = res.data.map(({id, namarequest, requestNo, requestd, statusid, keterangan, equipment, createdate, review}) => {
                var requesttype = requestd.map(val => val.namarequesttype).join(', ')
                return{id, namarequest, requestNo, requesttype, statusid, keterangan, equipment, createdate, review}
            })
            temp = [...originalData, ...data]
            console.log(temp);
            setOriginalData(temp)
            setDataRiwayatOrder(temp)
        }
    }
        
    return (
        <>
            <div className="responsive-bar">
                <div className="row">
                    <div className="card-title col-md-3 col-12">
                        {searchActive ? (
                            <div className="d-flex align-items-center">
                                <span className="nav-link d-inline d-md-none me-3" onClick={ () => setSearchActive(false) }>
                                    <i className="fa fa-arrow-left color-arrow-left"></i>
                                </span>
                                <input type="text" className="form-control search-riwayat d-md-none d-inline" placeholder="Telusuri..." style={{position:'absolute', right: 35}}></input>
                            </div>
                        ) : (
                            <>
                                <strong className="title-icare py-2" style={{ fontSize: 18, borderBottom: '3px solid #014C90' }}>Riwayat Permintaan</strong>
                                <span className="my-auto" onClick={ () => setSearchActive(true) }>
                                    <i className="fa fa-search fa-fw text-white" style={{ fontSize: '20px', position:'absolute', right: 60 }}></i>
                                </span>
                            </>
                        )}
                        <Link className="text-white" to="/settings" style={{position:'absolute', top: 12, right: 20, fontSize:'26px', zIndex:'11111'}}>
                            {searchActive ? (
                                <i className="fa fa-ellipsis-v d-md-none"></i>
                            ) : (
                                <i className="fa fa-cog d-md-none"></i>
                            )}
                        </Link>
                    </div>
                    <div className='d-md-flex d-none col-md-9'>
                        <form className='w-75' onSubmit={(e) => e.preventDefault()}>    
                            <div className="col-6 d-flex ms-auto">
                                <span className="my-auto" style={{ color: '#014C90' }}>
                                    <i className="fa fa-search fa-fw" style={{ marginRight: 'auto' }}></i>
                                </span>
                                <input type="text" className="form-control me-2 border-0 border-only-bottom" style={{ fontSize: '14px', marginLeft: '5px', color: 'black' }} onKeyUp={ handleSearch } defaultValue={searchValue} onKeyDown={(e) => 
                                {if(typeof e.key != 'undefined' && e.keyCode === 13) {
                                    e.currentTarget.blur()
                                    return
                                }}} />
                                <button style={{ margin: 'auto', cursor: 'pointer', border: '0', background: 'none' }} type="reset" onClick={handleClear}>
                                    <i className="fa fa-close"></i>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="card mb-3 border-0 mt-5 responsive-riwayat" style={{ boxShadow: '0 0 3rem rgba(0, 0, 0, .15)' }}>
                <div className="card-body p-3 px-4">
                    <div className="table-responsive mb-4 d-flex px-1 pb-md-2 pb-1 mt-1" style={{fontSize:'14px'}}>
                        {
                            tabItems.map((val, key) => (
                                <div className="me-md-4 me-2 d-inline" key={ key }>
                                    <button style={{width:'100%', whiteSpace: 'nowrap'}} className={ `btn-proses px-md-5 px-4 rounded-4 py-3 small fw-medium ${ val.status === tabActivated ? 'active' : '' }` } onClick={ () => {
                                        changeTabActive(val.status)
                                    } }>{ val.name }</button>
                                </div>
                            ))
                        }
                    </div>

                    {
                        dataRiwayatOrder.map((val, key) => (
                            <RiwayatTabel tabActive={ tabActivated } skip={ skipData } key={ key } data={ val } cardBg={ cardBg } dataRiwayatOrder={ val } />
                        ))
                    }
                    {
                        dataRiwayatOrder.length >= 10 ? (
                            <div className="button-list-riwayat p-0">
                                <button type="button" className="btn btn-list-riwayat btn-primary" style={{width:'100%', height:'50px', backgroundColor:'#014C90', borderRadius:'15px'}} onClick={handleShowMore} >Lihat lebih banyak ...</button>
                            </div>
                        ) : (
                            <div></div>
                        )
                    }
                </div>
            </div>
            <AlertConfirm visible={showPopup} titleMessage={alertOption.title} message={alertOption.message} customClass="col-md-3 col-9" onClick={() => setShowPopup(false)} />
            <AlertConfirm visible={ alertVisible } onClick={ () => setAlertVisible(0) } message="Belum pernah melakukan permintaan"/>
            <LoadingAlert visible={loading} customClass="col-md-2 col-8" />
        </>
    )
}

export default Riwayat