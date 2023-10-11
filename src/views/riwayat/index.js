import RiwayatTabel from './component/tabel.js'
import AlertConfirm from './../../component/alert/confirmAlert.js'
import { useState } from 'react'

function Riwayat() {
    const [tabActivated, setTabActivated] = useState(0)
    const [alertVisible, setAlertVisible] = useState(0)
    const tabItems = [
        'Semua',
        'Menunggu Konfirmasi',
        'Permintaan Diproses',
        'Permintaan Ditolak',
        'Permintaan Selesai',
    ]
    const cardBg = [
        {title: 'Menunggu Konfirmasi', background: '#ff8000'},
        {title: 'Permintaan Diproses', background: '#1eb716'},
        {title: 'Reject', background: '#ff2020'},
        {title: 'Selesai', background: '#009FC7'},
        {title: 'Internal Proses', background: '#ff8000'},
    ]
    const tabData = [
        [
            {
                id: 1,
                code: 'CR-2310784',
                requestType: 'Consumable Request',
                date: '4/12/2023 12:41:01 PM',
                EQCode: '300822',
                items: 'Toner Cyan, Drum Cyan',
                description: 'Test12345678',
                dataStatus: 'menunggu',
            }
        ],
        [
            {
                id: 2,
                code: 'CR-2310784',
                requestType: 'Consumable Request',
                date: '4/12/2023 12:41:01 PM',
                EQCode: '300822',
                items: 'Toner Cyan, Drum Cyan',
                description: 'Test12345678',
                dataStatus: 'diproses',
                statues: 'belum proses'
            },
            {
                id: 6,
                code: 'CR-2310784',
                requestType: 'Consumable Request',
                date: '4/12/2023 12:41:01 PM',
                EQCode: '300822',
                items: 'Toner Cyan, Drum Cyan',
                description: 'Test12345678',
                dataStatus: 'diproses',
                statues: 'sudah proses'
            }
        ],
        [
            {
                id: 3,
                code: 'CR-2310784',
                requestType: 'Consumable Request',
                date: '4/12/2023 12:41:01 PM',
                EQCode: '300822',
                items: 'Toner Cyan, Drum Cyan',
                description: 'Test12345678',
                dataStatus: 'reject',
            },
        ],
        [
            {
                id: 4,
                code: 'CR-2310784',
                requestType: 'Consumable Request',
                date: '4/12/2023 12:41:01 PM',
                EQCode: '300822',
                items: 'Toner Cyan, Drum Cyan',
                description: 'Test12345678',
                dataStatus: 'selesai',
                statues: 'belum nilai'
            },
            {
                id: 4,
                code: 'CR-2310784',
                requestType: 'Consumable Request',
                date: '4/12/2023 12:41:01 PM',
                EQCode: '300822',
                items: 'Toner Cyan, Drum Cyan',
                description: 'Test12345678',
                dataStatus: 'selesai',
                statues: 'belum nilai'
            },
            {
                id: 5,
                code: 'CR-2310784',
                requestType: 'Consumable Request',
                date: '4/12/2023 12:41:01 PM',
                EQCode: '300822',
                items: 'Toner Cyan, Drum Cyan',
                description: 'Test12345678',
                dataStatus: 'selesai',
                statues: 'sudah nilai'
            },
        ],
        [
            {
                id: 1,
                code: 'CR-2310784',
                requestType: 'Consumable Request',
                date: '4/12/2023 12:41:01 PM',
                EQCode: '300822',
                items: 'Toner Cyan, Drum Cyan',
                description: 'Test12345678',
            }
        ]
    ]

    const setTabActive = (key) => {
        setTabActivated(key)
        setAlertVisible(key === 0 ? (tabData[0].length === 0 && tabData[1].length === 0 && tabData[2].length === 0 && tabData[3].length === 0) : tabData[key - 1].length === 0)
    }
        
    return (
        <>
            <div className="row mb-3">
                <div className="col-md-3 col-sm-5 col-xs-6 col-12">
                    <strong className="title-icare py-2" style={{ fontSize: 18, borderBottom: '3px solid #014C90' }}>Riwayat Permintaan</strong>
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
                                        setTabActive(key)
                                    } }>{ val }</button>
                                </div>
                            ))
                        }
                    </div>

                    {
                        tabActivated === 0 ? (
                            tabData.map((value, tabKey) => (
                                tabData[tabKey].map((val, key) => (
                                    <RiwayatTabel tabActive={ tabKey + 1 } key={ key } data={ val } cardBg={ cardBg } belumNilai={val.statues === 'belum nilai'} sudahNilai={val.statues === 'sudah nilai'} />
                                ))
                            ))
                        ) : (
                            tabData[tabActivated - 1].map((val, key) => (
                                <RiwayatTabel tabActive={ tabActivated } key={ key } data={ val } cardBg={ cardBg } belumNilai={val.statues === 'belum nilai'} sudahNilai={val.statues === 'sudah nilai'} />
                            ))
                        )
                    }
                </div>
            </div>
            <AlertConfirm visible={ alertVisible } onClick={ () => this.setState({ alertVisible: 0 }) } message="Belum pernah melakukan permintaan"/>
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