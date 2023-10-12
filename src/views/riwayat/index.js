import RiwayatTabel from './component/tabel.js'
import AlertConfirm from './../../component/alert/confirmAlert.js'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getRiwayatOrderByRow } from '../../services/API'

function Riwayat() {
    const [tabActivated, setTabActivated] = useState(0)
    const [alertVisible, setAlertVisible] = useState(0)
    const [searchActive, setSearchActive] = useState(false)
    
    const [dataRiwayatOrder, setDataRiwayatOrder] = useState([])
    const [dataRiwayatOrderInit, setDataRiwayatOrderInit] = useState([])
    const [dataNamaProduk, setDataNamaProduk] = useState([])
    const [dataisLoaded, setDataisLoaded] = useState(false)

    const { statusid, requestNo } = useParams()
    // const tabItems = [
    //     'Semua',
    //     'Menunggu Konfirmasi',
    //     'Permintaan Diproses',
    //     'Permintaan Ditolak',
    //     'Permintaan Selesai',
    // ]
    const cardBg = [
        {title: 'Menunggu Konfirmasi', background: '#ff8000'},
        {title: 'Permintaan Diproses', background: '#1eb716'},
        {title: 'Selesai', background: '#009FC7'},
        {title: 'Reject', background: '#ff2020'},
    ]
    const tabItems = [
        {statusid: '0', statusName: 'Semua'},
        {statusid: '1', statusName: 'Menunggu Konfirmasi'},
        {statusid: '2', statusName: 'Permintaan Diproses'},
        {statusid: '4', statusName: 'Permintaan Ditolak'},
        {statusid: '3', statusName: 'Permintaan Selesai'},
    ]

    useEffect(() => {
        init()
        getRiwayatOrderByRow().then(response => {
            console.log(response)
        })
    }, [statusid, requestNo])

    async function init() {
        setDataisLoaded(false)

        var res = await getRiwayatOrderByRow(statusid, requestNo);
        console.log("res : ", res);

        console.log("resrequestNo", res[0].requestNo)
        console.log("resrequestd", res[0].requestd)
        console.log("resrequestd", res[0].requestd[0].qty)

        var getDataNamaRequest = [] 

        for (var i = 0; i<res.length; i++) {
            console.log("resi L ", res[i]);

            var dataRequestType = res[i].requestd.map(o => o.namarequesttype).join(', ')

            getDataNamaRequest.push({
                namarequesttype: dataRequestType,
                createdate: res[i].createdate,
                namarequest: res[i].namarequest,
                requestNo: res[i].requestNo,
                equipment: res[i].equipment,
                keterangan: res[i].keterangan,
                status: res[i].status,
                statusid: res[i].statusid
            })
    }

    console.log("getDataNamaRequest", getDataNamaRequest)

    setDataisLoaded(true)
    setDataRiwayatOrder(res)
    setDataNamaProduk(getDataNamaRequest)
    setDataRiwayatOrderInit(res)

    console.log("dataRiwayatorder L ", dataNamaProduk)
    console.log("dataNamaProduk L ", dataNamaProduk)
}
    

    const toggleSearch = () => {
        setSearchActive(!searchActive)
    }

    // const setTabActive = (statusid) => {
    //     setTabActivated(statusid)
    //     setAlertVisible(statusid === 0 ? (dataRiwayatOrder[0].length === 0 && dataRiwayatOrder[1].length === 0 && dataRiwayatOrder[2].length === 0 && dataRiwayatOrder[3].length === 0) : dataRiwayatOrder[statusid - 1].length === 0)
    // }

    const setTabActive = (statusid) => {
        console.log("status id ", statusid)
        setTabActivated(statusid)
        const isTabZero = statusid === 0
        const filteredData = isTabZero ? dataRiwayatOrder : dataRiwayatOrder.filter(item => item.statusid === statusid)
        // setAlertVisible(tabActivated === 0 ? (dataRiwayatOrder.length === 0) : (dataRiwayatOrder.filter(item => item.statusid === tabActivated).length === 0))
        setAlertVisible(tabActivated === 0 ? (dataRiwayatOrder[0].length === 0 && dataRiwayatOrder[1].length === 0 && dataRiwayatOrder[2].length === 0 && dataRiwayatOrder[3].length === 0) : (dataRiwayatOrder.filter(item => item.statusid === tabActivated).length === 0))
        // setAlertVisible(tabActivated === 0 ? (dataRiwayatOrder.filter(item => item.statusid !== 0 ).length === 0) : (dataRiwayatOrder.filter(item => item.statusid === tabActivated).length === 0))
        // console.log("tab", tabActivated)
        filterDataByStatus(statusid)
    }

    function filterDataByStatus (status_id) {
        if(status_id !== 0) {
            console.log("filter data by status id ", status_id)
        console.log("data riwayat order", dataRiwayatOrderInit)
        var filteredDataByStatus = dataRiwayatOrderInit.filter(x => {
            return x.statusid.includes(status_id)
        })
        console.log("filter data", filteredDataByStatus)
        setDataRiwayatOrder(filteredDataByStatus)
        } else {
            setDataRiwayatOrder(dataRiwayatOrderInit)
        }
    }
        
    return (
        <>
            <div className="row responsive-bar mb-3">
                <div className="card-title col-md-3 col-sm-5 col-xs-6 col-12">
                    {searchActive ? (
                        <div className="d-flex align-items-center">
                            <Link className="nav-link d-inline d-md-none me-3" to="/riwayat" onClick={toggleSearch}>
                                <i className="fa fa-arrow-left color-arrow-left"></i>
                            </Link>
                            <input type="text" className="form-control search-riwayat" placeholder="Telusuri..." style={{position:'absolute', right: 35}}></input>
                        </div>
                    ) : (
                        <>
                            <strong className="title-icare py-2" style={{ fontSize: 18, borderBottom: '3px solid #014C90' }}>Riwayat Permintaan</strong>
                            <span className="my-auto" onClick={toggleSearch}>
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
                <div className="col-md-3 col-sm-5 col-xs-6 col-12"></div>
            </div>

            <div className="card mb-3 border-0 mt-5" style={{ boxShadow: '0 0 3rem rgba(0, 0, 0, .15)' }}>
                <div className="card-body p-3 px-4">
                    <div className="table-responsive mb-5 d-flex px-2" style={{fontSize:'14px'}}>
                        {
                            tabItems.map((val, key) => (
                                <div className="mx-2 d-inline" key={ key }>
                                    <button style={{width:'100%'}} className={ `btn-proses px-5 rounded-4 py-3 small fw-medium ${ key === tabActivated ? 'active' : '' }` } onClick={ () => {
                                        setTabActive(val.statusid)
                                    } }>{ val.statusName }</button>
                                </div>
                            ))
                        }
                    </div>

                    {
                        tabActivated === 0 ? (
                            dataRiwayatOrder.map((val, tabKey) => (
                                    <RiwayatTabel tabActive={ tabKey + 1 } key={ val.requestNo } cardBg={ cardBg } dataRiwayatOrder={ val }/>
                            ))
                        ) : (
                            dataRiwayatOrder.map((val, key) => (
                                <RiwayatTabel tabActive={ tabActivated } key={ key } data={ val } cardBg={ cardBg } dataRiwayatOrder={ val }/>
                            ))
                        )
                    }

                    {/* {
                        tabActivated === 0 ? 
                            dataRiwayatOrder.map((val, tabKey) => (
                                    <RiwayatTabel tabActive={ tabKey + 1 } key={ tabKey } data={ val } cardBg={ cardBg } dataRiwayatOrder={dataRiwayatOrder}/>
                                ))
                            
                         : 
                            dataRiwayatOrder.filter(item => item.statusid === tabActivated).map((val, tabKey) => (
                                <RiwayatTabel tabActive={ tabActivated } key={ val.requestNo } data={ val } cardBg={ cardBg } dataRiwayatOrder={dataRiwayatOrder}/>
                            ))
                        
                    } */}

                </div>
            </div>
            <AlertConfirm visible={ alertVisible } onClick={ () => setAlertVisible(0) } message="Belum pernah melakukan permintaan"/>
        </>
    )
}

export default Riwayat

// export default class extends Component {
//     constructor(props) {
//         super(props)

//         this.state = {
//             tabActivated: 0,
//             alertVisible: 0,
//             tabItems: ['Semua', 'Menunggu Konfirmasi', 'Permintaan Diproses', 'Permintaan Ditolak', 'Permintaan Selesai'],
//             cardBg: [
//                 { title: 'Menunggu Konfirmasi', background: '#ff8000'},
//                 { title: 'Permintaan Diproses', background: '#1eb716'},
//                 { title: 'Reject', background: '#ff2020'},
//                 { title: 'Selesai', background: '#009FC7'}
//             ],
//             tabData: [
//                 [
//                     {
//                         id: 1,
//                         code: 'CR-2310784',
//                         requestType: 'Consumable Request',
//                         date: '4/12/2023 12:41:01 PM',
//                         EQCode: '300822',
//                         items: 'Toner Cyan, Drum Cyan',
//                         description: 'Test12345678',
//                         dataStatus: 'menunggu',
//                     }
//                 ],
//                 [
//                     {
//                         id: 2,
//                         code: 'CR-2310784',
//                         requestType: 'Consumable Request',
//                         date: '4/12/2023 12:41:01 PM',
//                         EQCode: '300822',
//                         items: 'Toner Cyan, Drum Cyan',
//                         description: 'Test12345678',
//                         dataStatus: 'diproses',
//                         statues: 'belum proses'
//                     },
//                     {
//                         id: 6,
//                         code: 'CR-2310784',
//                         requestType: 'Consumable Request',
//                         date: '4/12/2023 12:41:01 PM',
//                         EQCode: '300822',
//                         items: 'Toner Cyan, Drum Cyan',
//                         description: 'Test12345678',
//                         dataStatus: 'diproses',
//                         statues: 'sudah proses'
//                     }
//                 ],
//                 [
//                     {
//                         id: 3,
//                         code: 'CR-2310784',
//                         requestType: 'Consumable Request',
//                         date: '4/12/2023 12:41:01 PM',
//                         EQCode: '300822',
//                         items: 'Toner Cyan, Drum Cyan',
//                         description: 'Test12345678',
//                         dataStatus: 'reject',
//                     },
//                 ],
//                 [
//                     {
//                         id: 4,
//                         code: 'CR-2310784',
//                         requestType: 'Consumable Request',
//                         date: '4/12/2023 12:41:01 PM',
//                         EQCode: '300822',
//                         items: 'Toner Cyan, Drum Cyan',
//                         description: 'Test12345678',
//                         dataStatus: 'selesai',
//                         statues: 'belum nilai'
//                     },
//                     {
//                         id: 4,
//                         code: 'CR-2310784',
//                         requestType: 'Consumable Request',
//                         date: '4/12/2023 12:41:01 PM',
//                         EQCode: '300822',
//                         items: 'Toner Cyan, Drum Cyan',
//                         description: 'Test12345678',
//                         dataStatus: 'selesai',
//                         statues: 'belum nilai'
//                     },
//                     {
//                         id: 5,
//                         code: 'CR-2310784',
//                         requestType: 'Consumable Request',
//                         date: '4/12/2023 12:41:01 PM',
//                         EQCode: '300822',
//                         items: 'Toner Cyan, Drum Cyan',
//                         description: 'Test12345678',
//                         dataStatus: 'selesai',
//                         statues: 'sudah nilai'
//                     },
//                 ],
//             ]
//         }
//     }

//     render() {
//         return (
//             <>
//                 <div className="row mb-3">
//                     <div className="col-md-3 col-sm-5 col-xs-6 col-12">
//                         <strong className="title-icare py-2" style={{ fontSize: 18, borderBottom: '3px solid #014C90' }}>Riwayat Permintaan</strong>
//                     </div>
//                     <div className="col-md-3 col-sm-5 col-xs-6 col-12"></div>
//                 </div>

//                 <div className="card mb-3 border-0 mt-5" style={{ boxShadow: '0 0 3rem rgba(0, 0, 0, .15)' }}>
//                     <div className="card-body p-3 px-4">
//                         <div className="table-responsive mb-5 d-flex px-2" style={{fontSize:'14px'}}>
//                             {
//                                 this.state.tabItems.map((val, key) => (
//                                     <div className="mx-2 d-inline" key={ key }>
//                                         <button style={{width:'100%'}} className={ `btn-proses px-5 rounded-4 py-3 small fw-medium ${ key === this.state.tabActivated ? 'active' : '' }` } onClick={ () => {
//                                             this.setTabActive(key)
//                                         } }>{ val }</button>
//                                     </div>
//                                 ))
//                             }
//                         </div>

//                         {
//                             this.state.tabActivated === 0 ? (
//                                 this.state.tabData.map((value, tabKey) => (
//                                     this.state.tabData[tabKey].map((val, key) => (
//                                         <TabelComponent tabActive={ tabKey + 1 } key={ key } data={ val } cardBg={ this.state.cardBg } belumNilai={val.statues === 'belum nilai'} sudahNilai={val.statues === 'sudah nilai'} />
//                                     ))
//                                 ))
//                             ) : (
//                                 this.state.tabData[this.state.tabActivated - 1].map((val, key) => (
//                                     <TabelComponent tabActive={ this.state.tabActivated } key={ key } data={ val } cardBg={ this.state.cardBg } belumNilai={val.statues === 'belum nilai'} sudahNilai={val.statues === 'sudah nilai'} />
//                                 ))
//                             )
//                         }
//                     </div>
//                 </div>
//                 <AlertConfirm visible={ this.state.alertVisible } onClick={ () => this.setState({ alertVisible: 0 }) } message="Belum pernah melakukan permintaan"/>
//             </>
//         )
//     }

//     setTabActive(key) {
//         this.setState({ tabActivated: key, alertVisible: key === 0 ? (this.state.tabData[0].length === 0 && this.state.tabData[1].length === 0 && this.state.tabData[2].length === 0 && this.state.tabData[3].length === 0) : this.state.tabData[key - 1].length === 0})
//     }
// }