import { Component } from "react";
import { Link } from "react-router-dom";
import AlertConfirm from './../../component/alert/confirmAlert'
import TabelComponent from './component/tabel'

export default class extends Component {
    constructor(props) {
        super(props)

        this.state = {
            tabActivated: 0,
            alertVisible: 0,
            tabItems: ['Semua', 'Menunggu Konfirmasi', 'Permintaan Diproses', 'Permintaan Ditolak', 'Permintaan Selesai'],
            cardBg: [
                { title: 'Menunggu Konfirmasi', background: '#ff8000'},
                { title: 'Permintaan Diproses', background: '#1eb716'},
                { title: 'Reject', background: '#ff2020'},
                { title: 'Selesai', background: '#009FC7'}
            ],
            tabData: [
                [
                    {
                        code: 'CR-2310784',
                        requestType: 'Consumable Request',
                        date: '4/12/2023 12:41:01 PM',
                        EQCode: '300822',
                        items: 'Toner Cyan, Drum Cyan',
                        description: 'Test12345678'
                    },
                    {
                        code: 'CR-2310784',
                        requestType: 'Consumable Request',
                        date: '4/12/2023 12:41:01 PM',
                        EQCode: '300822',
                        items: 'Toner Cyan, Drum Cyan',
                        description: 'Test12345678'
                    },
                    {
                        code: 'CR-2310784',
                        requestType: 'Consumable Request',
                        date: '4/12/2023 12:41:01 PM',
                        EQCode: '300822',
                        items: 'Toner Cyan, Drum Cyan',
                        description: 'Test12345678'
                    },
                ],
                [
                    {
                        code: 'CR-2310784',
                        requestType: 'Consumable Request',
                        date: '4/12/2023 12:41:01 PM',
                        EQCode: '300822',
                        items: 'Toner Cyan, Drum Cyan',
                        description: 'Test12345678'
                    },
                    {
                        code: 'CR-2310784',
                        requestType: 'Consumable Request',
                        date: '4/12/2023 12:41:01 PM',
                        EQCode: '300822',
                        items: 'Toner Cyan, Drum Cyan',
                        description: 'Test12345678'
                    },
                    {
                        code: 'CR-2310784',
                        requestType: 'Consumable Request',
                        date: '4/12/2023 12:41:01 PM',
                        EQCode: '300822',
                        items: 'Toner Cyan, Drum Cyan',
                        description: 'Test12345678'
                    },
                ],
                [
                    {
                        code: 'CR-2310784',
                        requestType: 'Consumable Request',
                        date: '4/12/2023 12:41:01 PM',
                        EQCode: '300822',
                        items: 'Toner Cyan, Drum Cyan',
                        description: 'Test12345678'
                    }
                ],
                [
                    {
                        code: 'CR-2310784',
                        requestType: 'Consumable Request',
                        date: '4/12/2023 12:41:01 PM',
                        EQCode: '300822',
                        items: 'Toner Cyan, Drum Cyan',
                        description: 'Test12345678'
                    },
                    {
                        code: 'CR-2310784',
                        requestType: 'Consumable Request',
                        date: '4/12/2023 12:41:01 PM',
                        EQCode: '300822',
                        items: 'Toner Cyan, Drum Cyan',
                        description: 'Test12345678'
                    },
                ]
            ]
        }
    }

    render() {
        return (
            <>
                <div className="row mb-3">
                    <div className="col-md-3 col-sm-5 col-xs-6 col-12">
                        <strong className="title-icare py-2" style={{ fontSize: 20, borderBottom: '3px solid #014C90' }}>Riwayat Permintaan</strong>
                    </div>
                    <div className="col-md-3 col-sm-5 col-xs-6 col-12"></div>
                </div>

                <div className="card mb-3 border-0 mt-5" style={{ boxShadow: '0 0 3rem rgba(0, 0, 0, .15)' }}>
                    <div className="card-body p-3 px-4">
                        <div className="table-responsive mb-5">
                            {
                                this.state.tabItems.map((val, key) => (
                                    <div className="mx-2 d-inline" key={ key }>
                                        <button className={ `btn-proses px-5 rounded-4 py-3 small fw-medium ${ key == this.state.tabActivated ? 'active' : '' }` } onClick={ () => {
                                            this.setTabActive(key)
                                        } }>{ val }</button>
                                    </div>
                                ))
                            }
                        </div>

                        {
                            this.state.tabActivated == 0 ? (
                                this.state.tabData.map((value, tabKey) => (
                                    this.state.tabData[tabKey].map((val, key) => (
                                        <TabelComponent tabActive={ tabKey + 1 } key={ key } data={ val } cardBg={ this.state.cardBg } />
                                    ))
                                ))
                            ) : (
                                this.state.tabData[this.state.tabActivated - 1].map((val, key) => (
                                    <TabelComponent tabActive={ this.state.tabActivated } key={ key } data={ val } cardBg={ this.state.cardBg } />
                                ))
                            )
                        }
                    </div>
                </div>
                <AlertConfirm visible={ this.state.alertVisible } onClick={ () => this.setState({ alertVisible: 0 }) } message="Belum pernah melakukan permintaan" />
            </>
        )
    }

    setTabActive(key) {
        this.setState({ tabActivated: key, alertVisible: key == 0 ? (this.state.tabData[0].length == 0 && this.state.tabData[1].length == 0 && this.state.tabData[2].length == 0 && this.state.tabData[3].length == 0) : this.state.tabData[key - 1].length == 0})
    }
}