import React,{ Component } from "react";
import { Link } from "react-router-dom";
import { getTrackingRiwayat, getDetailRiwayatOrder } from "../../../services/API/mod_riwayatOrder";
import { useParams } from "react-router-dom";

// function TrackingAlert() {
//     const [visible, setVisible] = useState(false)

//     const handleClose = () => {
//         setVisible(false)
//     }

export default class extends Component {
    render() {
        return (
            <>
                <div style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, .4)', zIndex: '11111', display: this.props.visible ? 'flex' : 'none', alignItems: 'center', justifyContent: 'center'}}>
                    <div className="col-md-6 col-10">
                        <div className="card rounded-4">
                            <div className="row">
                                <div className="card-body">
                                    <div className="card-title">
                                        <div className="d-flex">
                                            <div className="col-11 mx-2">
                                                <h6 className="text-center fw-bold">Lacak Petugas</h6>
                                            </div>
                                            <div className="col-2">
                                                <button onClick={this.props.onClick} style={{background:'none', border:'none', fontSize:'20px'}}><i className="fa fa-close" style={{color:'black'}}></i></button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-data mx-5 mb-2 pt-3" style={{border:'1px solid black', borderRadius:'8px'}}>
                                        {this.props.data.map((val,key) => (
                                            <div className="d-flex gap-4 mx-5" key={key}>
                                                <div className="nowrap">
                                                    <p style={{fontSize:'14px'}}>{val.StatusUpdate}</p>
                                                </div>
                                                <div className="col-auto pt-1">
                                                    <i className={ val.status === "Accept" ? "fa fa-dot-circle-o text-success" : "fa fa-dot-circle-o text-muted"} style={{fontSize: '18px'}}/>
                                                </div>
                                                <div className="col-auto">
                                                    <Link to={`https://www.google.com/maps/search/?api=1&query=${val.LongLat}&z=15`} target="_blank">
                                                        <img src="/images/map.png" style={{width:'25px'}}></img>
                                                    </Link>
                                                    <p className="mb-0 fw-bold" style={{fontSize:'14px'}}>{val.Username}</p>
                                                    <p className={ val.status === 'Accept' ? "mb-0 text-success" : "mb-0"} style={{fontSize:'13px'}}>{val.status}</p>
                                                    <p style={{fontSize:'12px'}}>{val.notes}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
// }

// export default TrackingAlert

