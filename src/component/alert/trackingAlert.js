import { Component } from "react";

export default class extends Component {
    render() {

        const { onClick, trackingData } = this.props;

        return (
            <>
                <div style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, .4)', zIndex: '11111', display: this.props.visible ? 'flex' : 'none', alignItems: 'center', justifyContent: 'center'}}>
                    <div className={this.props.customClass}>
                        <div className="card rounded-4">
                            <div className="row">
                                <div className="card-body">
                                    <div className="card-title">
                                        <div className="d-flex">
                                            <div className="col-11 mx-2">
                                                <h6 className="text-center fw-bold">{this.props?.titleMessage}</h6>
                                            </div>
                                            <div className="col-2">
                                                <button onClick={onClick} style={{background:'none', border:'none', fontSize:'20px'}}><i className="fa fa-close" style={{color:'black'}}></i></button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-data mx-5 mb-2 pt-3" style={{border:'1px solid black', borderRadius:'8px', width:'89%'}}>
                                            {trackingData.map((data, index) => (
                                                <div className="d-flex mx-5" key={index}>
                                                    <div className="col-3">
                                                        <p style={{fontSize:'14px'}}>{data.date}</p>
                                                    </div>
                                                    <div className="col-1">
                                                        <div className="form-check">
                                                            <input className="form-check-input custom-radio" type="radio" name="flexRadioDefault" id="flexRadioDefault1"></input>
                                                        </div>
                                                    </div>
                                                    <div className="col-2">
                                                        <img src={data.img} style={{width:'25px'}}></img>
                                                        <p className="mb-0 fw-bold" style={{fontSize:'14px'}}>{data.name}</p>
                                                        <p className="mb-0" style={{fontSize:'13px'}}>{data.status}</p>
                                                        <p style={{fontSize:'12px'}}>{data.note}</p>
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