import { Component } from "react";
import { Link } from "react-router-dom";
import AlertConfirm from './../../component/alert/confirmAlert.js'

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
                {/* <div className="container-fluid py-4">
                    <div className="title d-flex align-items-center mb-5">
                        <span className="title-icare fw-medium py-1" style={{borderBottom:'3px solid #014C90', fontSize:'18px'}}>Riwayat Permintaan</span>
                    </div>
                    <div className="card border-0 shadow-lg p-2 mb-3">
                        <div className="card-body">
                            <div className="navbar navbar-exspand-lg mb-4">
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <Link className="btn-proses py-3 px-4 text-center rounded-4 fw-medium">Semua</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="btn-proses py-3 px-4 text-center rounded-4 fw-medium">Menunggu Konfirmasi</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="btn-proses py-3 px-4 text-center rounded-4 fw-medium">Permintaan Diproses</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="btn-proses py-3 px-4 text-center rounded-4 fw-medium">Permintaan Ditolak</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="btn-proses py-3 px-4 text-center rounded-4 fw-medium">Permintaan Selesai</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="card border-0 shadow mb-3">
                                <div className="reject-title rounded-top py-3 text-center" style={{backgroundColor:'#ff2020', fontWeight:'500', color:'#fff'}}>
                                    <label>Reject</label>
                                </div>
                                <div className="row">
                                    <div className="border-end col-md-2 col-sm-4 col-12">
                                        <p className="px-3 py-2">lorem</p>
                                    </div>
                                    <div className="border-end col-md-2 col-sm-4 col-12">
                                        <p className="px-3 py-2">lorem</p>
                                    </div>
                                    <div className="border-end col-md-5 col-sm-7 col-12">
                                        
                                    </div>
                                    <div className="col-md-3 col-sm-5 col-12 p-4">
                                        <Link className="btn-view d-flex shadow rounded-2 d-flex align-items-center p-0 mx-auto" style={{width:'70%', border:'none',backgroundColor:'#014C90'}} to="/detail-permintaan">
                                            <div className="col-9 p-2 text-center" style={{color:'#fff', fontSize:'12px'}}>
                                                VIEW DETAIL
                                            </div>
                                            <div className="col-3 text-center bg-white text-danger p-2 rounded-end">
                                                <i className="fa fa-chevron-right ms-2" style={{backgroundColor:'#fff'}}></i>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="card border-0 shadow mb-3">
                                <div className="selesai-title rounded-top py-3 text-center" style={{backgroundColor:'#009FC7', fontWeight:'500', color:'#fff'}}>
                                    <label>Selesai</label>
                                </div>
                                <div className="row">
                                    <div className="border-end col-md-2 col-sm-4 col-12">
                                        <p className="px-3 py-2">lorem</p>
                                    </div>
                                    <div className="border-end col-md-2 col-sm-4 col-12">
                                        <p className="px-3 py-2">lorem</p>
                                    </div>
                                    <div className="border-end col-md-5 col-sm-7 col-12">
                                        
                                    </div>
                                    <div className="col-md-3 col-sm-5 col-12 p-4">
                                        <button className="btn-view shadow rounded-2 d-flex align-items-center p-0 mx-auto mb-3" style={{width:'70%', border:'none',backgroundColor:'#01c9d4'}}>
                                            <div className="col-9 p-2 text-center" style={{color:'#fff', fontSize:'12px'}}>
                                                BERIKAN NILAI
                                            </div>
                                            <div className="col-3 text-center bg-white text-danger p-2 rounded-end">
                                                <i className="fa fa-external-link-square ms-2" style={{backgroundColor:'#fff', color:'#01c9d4'}}></i>
                                            </div>
                                        </button>
                                        <button className="btn-view shadow rounded-2 d-flex align-items-center p-0 mx-auto" style={{width:'70%', border:'none',backgroundColor:'#014C90'}}>
                                            <div className="col-9 p-2 text-center" style={{color:'#fff', fontSize:'12px'}}>
                                                VIEW DETAIL
                                            </div>
                                            <div className="col-3 text-center bg-white text-danger p-2 rounded-end">
                                                <i className="fa fa-chevron-right ms-2" style={{backgroundColor:'#fff'}}></i>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="card border-0 shadow mb-3">
                                <div className="selesai-title rounded-top py-3 text-center" style={{backgroundColor:'#ff8000', fontWeight:'500', color:'#fff'}}>
                                    <label>Menunggu Konfirmasi</label>
                                </div>
                                <div className="row">
                                    <div className="border-end col-md-2 col-sm-4 col-12">
                                        <p className="px-3 py-2">lorem</p>
                                    </div>
                                    <div className="border-end col-md-2 col-sm-4 col-12">
                                        <p className="px-3 py-2">lorem</p>
                                    </div>
                                    <div className="border-end col-md-5 col-sm-7 col-12">
                                        
                                    </div>
                                    <div className="col-md-3 col-sm-5 col-12 p-4">
                                        <button className="btn-view shadow rounded-2 d-flex align-items-center p-0 mx-auto" style={{width:'70%', border:'none',backgroundColor:'#014C90'}}>
                                            <div className="col-9 p-2 text-center" style={{color:'#fff', fontSize:'12px'}}>
                                                VIEW DETAIL
                                            </div>
                                            <div className="col-3 text-center bg-white text-danger p-2 rounded-end">
                                                <i className="fa fa-chevron-right ms-2" style={{backgroundColor:'#fff'}}></i>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="card border-0 shadow mb-3">
                                <div className="selesai-title rounded-top py-3 text-center" style={{backgroundColor:'#1eb716', fontWeight:'500', color:'#fff'}}>
                                    <label>Permintaan Diproses</label>
                                </div>
                                <div className="row">
                                    <div className="border-end col-md-2 col-sm-4 col-12">
                                        <p className="px-3 py-2">lorem</p>
                                    </div>
                                    <div className="border-end col-md-2 col-sm-4 col-12">
                                        <p className="px-3 py-2">lorem</p>
                                    </div>
                                    <div className="border-end col-md-5 col-sm-7 col-12">
                                        
                                    </div>
                                    <div className="col-md-3 col-sm-5 col-12 p-4">
                                        <button className="btn-view shadow rounded-2 d-flex align-items-center p-0 mx-auto" style={{width:'70%', border:'none',backgroundColor:'#014C90'}}>
                                            <div className="col-9 p-2 text-center" style={{color:'#fff', fontSize:'12px'}}>
                                                VIEW DETAIL
                                            </div>
                                            <div className="col-3 text-center bg-white text-danger p-2 rounded-end">
                                                <i className="fa fa-chevron-right ms-2" style={{backgroundColor:'#fff'}}></i>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center mt-4">
                                <button className="btn btn-login w-100 py-3 shadow-sm">Lihat Lebih Banyak...</button>
                            </div>
                        </div>
                    </div>
                </div> */}
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
                                        <div className="card border-0 mb-3" style={{ boxShadow: '0 0 1.5rem rgba(0, 0, 0, .2' }} key={ key }>
                                            <div className="reject-title rounded-top py-3 text-center" style={{backgroundColor: this.state.cardBg[tabKey].background, fontWeight:'500', color:'#fff'}}>
                                                <label>{ this.state.cardBg[tabKey].title }</label>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-2 col-sm-4 col-12 p-3 pb-5" style={{ borderRight: '2px solid #333' }}>
                                                    <p className="m-0 p-0 px-3 small">{ val.date }</p>
                                                    <p className="m-0 p-0 px-3 small">{ val.requestType }</p>
                                                    <p className="m-0 p-0 px-3 small">{ val.code }</p>
                                                </div>
                                                <div className="col-md-2 col-sm-4 col-12 p-3 pb-5" style={{ borderRight: '2px solid #333' }}>
                                                <p className="m-0 p-0 px-3 small">{ val.EQCode }</p>
                                                    <p className="m-0 p-0 px-3 small">{ val.items }</p>
                                                    <p className="m-0 p-0 px-3 small">{ val.description }</p>
                                                </div>
                                                <div className="col-md-5 col-sm-7 col-12 p-3 pb-5" style={{ borderRight: '2px solid #333' }}>
                                                    <div style={{ position: 'relative', width: '70%', marginLeft: 'auto', marginRight: 'auto' }}>
                                                        <hr style={{ position: 'absolute', top: 0, left: 0, right: 0, border: '3px solid #23ad4c', opacity: 1 }} />
                                                        <div style={{ position: 'absolute', textAlign: 'center', left: -40 }}>
                                                            <div className="mx-auto" style={{ padding: '4px', background: '#23ad4c', color: '#fff', borderRadius: '50%', border: '3px solid #fff', width: 40 }}>
                                                                <i className="fa fa-check"></i>
                                                            </div>
                                                            Menunggu
                                                        </div>
                                                        <div style={{ position: 'absolute', left: '50%', transform: 'translate(-50%, 0)', textAlign: 'center' }}>
                                                            <div className="mx-auto" style={{ padding: '2px 6px', background: '#ff2020', color: '#fff', borderRadius: '50%', border: '3px solid #fff', fontWeight: 'bold', fontSize: 18, width: 38 }}>
                                                                &times;
                                                            </div>
                                                            Ditolak
                                                        </div>
                                                        <div style={{ position: 'absolute', right: -30, textAlign: 'center' }}>
                                                            <div className="mx-auto" style={{ padding: '4px', background: '#23ad4c', color: '#fff', borderRadius: '50%', border: '3px solid #fff', width: 40 }}>
                                                                <i className="fa fa-check"></i>
                                                            </div>
                                                            Selesai
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-3 col-sm-5 col-12 p-4">
                                                    {
                                                        this.state.tabActivated == 4 ? (
                                                            <button className="btn-view shadow rounded-2 d-flex align-items-center p-0 mx-auto mb-3" style={{width:'70%', border:'none',backgroundColor:'#01c9d4'}}>
                                                                <div className="col-9 p-2 text-center" style={{color:'#fff', fontSize:'12px'}}>
                                                                    BERIKAN NILAI
                                                                </div>
                                                                <div className="col-3 text-center bg-white text-danger p-2 rounded-end">
                                                                    <i className="fa fa-external-link-square ms-2" style={{backgroundColor:'#fff', color:'#01c9d4'}}></i>
                                                                </div>
                                                            </button>
                                                        ) : ''
                                                    }
                                                    <Link className="btn btn-view d-flex shadow rounded-2 d-flex align-items-center p-0 mx-auto" style={{width:'70%', border:'none',backgroundColor:'#014C90'}} to="/detail-permintaan">
                                                        <div className="col-9 p-2 text-center" style={{color:'#fff', fontSize:'12px'}}>
                                                            VIEW DETAIL
                                                        </div>
                                                        <div className="col-3 text-center bg-white text-danger p-2 rounded-end">
                                                            <i className="fa fa-chevron-right ms-2" style={{backgroundColor:'#fff'}}></i>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ))
                            ) : (
                                this.state.tabData[this.state.tabActivated - 1].map((val, key) => (
                                    <div className="card border-0 mb-3" style={{ boxShadow: '0 0 1.5rem rgba(0, 0, 0, .2' }} key={ key }>
                                        <div className="reject-title rounded-top py-3 text-center" style={{backgroundColor: this.state.cardBg[this.state.tabActivated - 1].background, fontWeight:'500', color:'#fff'}}>
                                            <label>{ this.state.cardBg[this.state.tabActivated - 1].title }</label>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-2 col-sm-4 col-12 p-3 pb-5" style={{ borderRight: '2px solid #333' }}>
                                                <p className="m-0 p-0 px-3 small">{ val.date }</p>
                                                <p className="m-0 p-0 px-3 small">{ val.requestType }</p>
                                                <p className="m-0 p-0 px-3 small">{ val.code }</p>
                                            </div>
                                            <div className="col-md-2 col-sm-4 col-12 p-3 pb-5" style={{ borderRight: '2px solid #333' }}>
                                            <p className="m-0 p-0 px-3 small">{ val.EQCode }</p>
                                                <p className="m-0 p-0 px-3 small">{ val.items }</p>
                                                <p className="m-0 p-0 px-3 small">{ val.description }</p>
                                            </div>
                                            <div className="col-md-5 col-sm-7 col-12 p-3 pb-5" style={{ borderRight: '2px solid #333' }}>
                                                <div style={{ position: 'relative', width: '70%', marginLeft: 'auto', marginRight: 'auto' }}>
                                                    <hr style={{ position: 'absolute', top: 0, left: 0, right: 0, border: '3px solid #23ad4c', opacity: 1 }} />
                                                    <div style={{ position: 'absolute', textAlign: 'center', left: -40 }}>
                                                        <div className="mx-auto" style={{ padding: '4px', background: '#23ad4c', color: '#fff', borderRadius: '50%', border: '3px solid #fff', width: 40 }}>
                                                            <i className="fa fa-check"></i>
                                                        </div>
                                                        Menunggu
                                                    </div>
                                                    <div style={{ position: 'absolute', left: '50%', transform: 'translate(-50%, 0)', textAlign: 'center' }}>
                                                        <div className="mx-auto" style={{ padding: '2px 6px', background: '#ff2020', color: '#fff', borderRadius: '50%', border: '3px solid #fff', fontWeight: 'bold', fontSize: 18, width: 38 }}>
                                                            &times;
                                                        </div>
                                                        Ditolak
                                                    </div>
                                                    <div style={{ position: 'absolute', right: -30, textAlign: 'center' }}>
                                                        <div className="mx-auto" style={{ padding: '4px', background: '#23ad4c', color: '#fff', borderRadius: '50%', border: '3px solid #fff', width: 40 }}>
                                                            <i className="fa fa-check"></i>
                                                        </div>
                                                        Selesai
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-3 col-sm-5 col-12 p-4">
                                                {
                                                    this.state.tabActivated == 4 ? (
                                                        <button className="btn-view shadow rounded-2 d-flex align-items-center p-0 mx-auto mb-3" style={{width:'70%', border:'none',backgroundColor:'#01c9d4'}}>
                                                            <div className="col-9 p-2 text-center" style={{color:'#fff', fontSize:'12px'}}>
                                                                BERIKAN NILAI
                                                            </div>
                                                            <div className="col-3 text-center bg-white text-danger p-2 rounded-end">
                                                                <i className="fa fa-external-link-square ms-2" style={{backgroundColor:'#fff', color:'#01c9d4'}}></i>
                                                            </div>
                                                        </button>
                                                    ) : ''
                                                }
                                                <Link className="btn btn-view d-flex shadow rounded-2 d-flex align-items-center p-0 mx-auto" style={{width:'70%', border:'none',backgroundColor:'#014C90'}} to="/detail-permintaan">
                                                    <div className="col-9 p-2 text-center" style={{color:'#fff', fontSize:'12px'}}>
                                                        VIEW DETAIL
                                                    </div>
                                                    <div className="col-3 text-center bg-white text-danger p-2 rounded-end">
                                                        <i className="fa fa-chevron-right ms-2" style={{backgroundColor:'#fff'}}></i>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
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