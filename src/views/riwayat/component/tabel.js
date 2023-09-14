import { Component } from "react";
import { Link } from "react-router-dom";

export default class extends Component {
    render() {
        return (
            <div className="card border-0 mb-3" style={{ boxShadow: '0 0 1.5rem rgba(0, 0, 0, .2' }}>
                <div className="reject-title rounded-top py-3 text-center" style={{backgroundColor: this.props.cardBg[this.props.tabActive - 1].background, fontWeight:'500', color:'#fff'}}>
                    <label>{ this.props.cardBg[this.props.tabActive - 1].title }</label>
                </div>
                <div className="row">
                    <div className="col-md-2 col-sm-4 col-12 p-3 pb-5" style={{ borderRight: '2px solid #333' }}>
                        <p className="m-0 p-0 px-3 small">{ this.props.data.date }</p>
                        <p className="m-0 p-0 px-3 small">{ this.props.data.requestType }</p>
                        <p className="m-0 p-0 px-3 small">{ this.props.data.code }</p>
                    </div>
                    <div className="col-md-2 col-sm-4 col-12 p-3 pb-5" style={{ borderRight: '2px solid #333' }}>
                    <p className="m-0 p-0 px-3 small">{ this.props.data.EQCode }</p>
                        <p className="m-0 p-0 px-3 small">{ this.props.data.items }</p>
                        <p className="m-0 p-0 px-3 small">{ this.props.data.description }</p>
                    </div>
                    <div className="col-md-5 col-sm-7 col-12 p-3 pb-5" style={{ borderRight: '2px solid #333' }}>
                        { this.props.tabActive == 3 ? (
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
                        ) : this.props.tabActive == 4 ? (
                            <div style={{ position: 'relative', width: '70%', marginLeft: 'auto', marginRight: 'auto' }}>
                                <hr style={{ position: 'absolute', top: 0, left: 0, right: '30%', border: '3px solid #23ad4c', opacity: 1 }} />
                                <div style={{ position: 'absolute', textAlign: 'center', left: -40 }}>
                                    <div className="mx-auto" style={{ padding: '4px', background: '#23ad4c', color: '#fff', borderRadius: '50%', border: '3px solid #fff', width: 40 }}>
                                        <i className="fa fa-check"></i>
                                    </div>
                                    Menunggu
                                </div>
                                <div style={{ position: 'absolute', left: '35%', transform: 'translate(-50%, 0)', textAlign: 'center' }}>
                                    <div className="mx-auto" style={{ padding: '4px', background: '#23ad4c', color: '#fff', borderRadius: '50%', border: '3px solid #fff', width: 40 }}>
                                        <i className="fa fa-check"></i>
                                    </div>
                                    Diproses
                                </div>
                                <div style={{ position: 'absolute', left: '70%', transform: 'translate(-50%, 0)', textAlign: 'center' }}>
                                    <div className="mx-auto" style={{ padding: '4px', background: '#23ad4c', color: '#fff', borderRadius: '50%', border: '3px solid #fff', width: 40 }}>
                                        <i className="fa fa-check"></i>
                                    </div>
                                    Selesai
                                </div>
                                <div style={{ position: 'absolute', right: -30, textAlign: 'center' }}>
                                    <div className="mx-auto" style={{ padding: '4px', background: '#ccc', color: '#fff', borderRadius: '50%', border: '3px solid #fff', width: 40 }}>
                                        <i className="fa fa-check"></i>
                                    </div>
                                    Nilai
                                </div>
                            </div>
                        ) : this.props.tabActive == 2 ? (
                            <div style={{ position: 'relative', width: '70%', marginLeft: 'auto', marginRight: 'auto' }}>
                                <hr style={{ position: 'absolute', top: 0, left: 0, right: '60%', border: '3px solid #23ad4c', opacity: 1 }} />
                                <div style={{ position: 'absolute', textAlign: 'center', left: -40 }}>
                                    <div className="mx-auto" style={{ padding: '4px', background: '#23ad4c', color: '#fff', borderRadius: '50%', border: '3px solid #fff', width: 40 }}>
                                        <i className="fa fa-check"></i>
                                    </div>
                                    Menunggu
                                </div>
                                <div style={{ position: 'absolute', left: '35%', transform: 'translate(-50%, 0)', textAlign: 'center' }}>
                                    <div className="mx-auto" style={{ padding: '4px', background: '#23ad4c', color: '#fff', borderRadius: '50%', border: '3px solid #fff', width: 40 }}>
                                        <i className="fa fa-check"></i>
                                    </div>
                                    Diproses
                                </div>
                                <div style={{ position: 'absolute', left: '70%', transform: 'translate(-50%, 0)', textAlign: 'center' }}>
                                    <div className="mx-auto" style={{ padding: '4px', background: '#ccc', color: '#fff', borderRadius: '50%', border: '3px solid #fff', width: 40 }}>
                                        <i className="fa fa-check"></i>
                                    </div>
                                    Selesai
                                </div>
                                <div style={{ position: 'absolute', right: -30, textAlign: 'center' }}>
                                    <div className="mx-auto" style={{ padding: '4px', background: '#ccc', color: '#fff', borderRadius: '50%', border: '3px solid #fff', width: 40 }}>
                                        <i className="fa fa-check"></i>
                                    </div>
                                    Nilai
                                </div>
                            </div>
                        ) : (
                            <div style={{ position: 'relative', width: '70%', marginLeft: 'auto', marginRight: 'auto' }}>
                                {/* <hr style={{ position: 'absolute', top: 0, left: 0, right: 0, border: '3px solid #23ad4c', opacity: 1 }} /> */}
                                <div style={{ position: 'absolute', textAlign: 'center', left: -40 }}>
                                    <div className="mx-auto" style={{ padding: '4px', background: '#ff8000', color: '#fff', borderRadius: '50%', border: '3px solid #fff', width: 40 }}>
                                        <i className="fa fa-check"></i>
                                    </div>
                                    Menunggu
                                </div>
                                <div style={{ position: 'absolute', left: '35%', transform: 'translate(-50%, 0)', textAlign: 'center' }}>
                                    <div className="mx-auto" style={{ padding: '4px', background: '#d6d6d6', color: '#fff', borderRadius: '50%', border: '3px solid #fff', width: 40 }}>
                                        <i className="fa fa-check"></i>
                                    </div>
                                    Diproses
                                </div>
                                <div style={{ position: 'absolute', left: '70%', transform: 'translate(-50%, 0)', textAlign: 'center' }}>
                                    <div className="mx-auto" style={{ padding: '4px', background: '#d6d6d6', color: '#fff', borderRadius: '50%', border: '3px solid #fff', width: 40 }}>
                                        <i className="fa fa-check"></i>
                                    </div>
                                    Selesai
                                </div>
                                <div style={{ position: 'absolute', right: -30, textAlign: 'center' }}>
                                    <div className="mx-auto" style={{ padding: '4px', background: '#d6d6d6', color: '#fff', borderRadius: '50%', border: '3px solid #fff', width: 40 }}>
                                        <i className="fa fa-check"></i>
                                    </div>
                                    Nilai
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="col-md-3 col-sm-5 col-12 p-4">
                        {
                            this.props.tabActive == 4 ? (
                                <Link className="btn-view shadow rounded-2 d-flex align-items-center p-0 mx-auto mb-3" style={{width:'90%', border:'none',backgroundColor:'#01c9d4', textDecoration:'none'}} to="/tulis_review">
                                    <div className="col-9 p-2 text-center" style={{color:'#fff', fontSize:'12px'}}>
                                        BERIKAN NILAI
                                    </div>
                                    <div className="col-3 text-center bg-white text-danger p-2 rounded-end">
                                        <i className="fa fa-external-link-square ms-2" style={{backgroundColor:'#fff', color:'#01c9d4'}}></i>
                                    </div>
                                </Link>
                            ) : ''
                        }
                        {
                            this.props.tabActive == 2 ? (
                                <button className="btn-view shadow rounded-2 d-flex align-items-center p-0 mx-auto mb-3" style={{width:'90%', border:'none',backgroundColor:'#19d4b2'}}>
                                    <div className="col-9 text-center" style={{color:'#fff', fontSize:'12px', whiteSpace: 'nowrap'}}>
                                        PESANAN DITERIMA
                                    </div>
                                    <div className="col-3 text-center bg-white text-danger p-2 rounded-end">
                                        <i className="fa fa-external-link-square ms-2" style={{backgroundColor:'#fff', color:'#19d4b2'}}></i>
                                    </div>
                                </button>
                            ) : ''
                        }
                        <Link className="btn btn-view d-flex shadow rounded-2 d-flex align-items-center p-0 mx-auto" style={{width:'90%', border:'none',backgroundColor:'#014C90'}} to="/detail-permintaan">
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
        )
    }
}