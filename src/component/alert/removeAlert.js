import { Component } from "react";

export default class extends Component {
    render() {
        return (
            <>
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, .4)', zIndex: '11111', display: this.props.visible ? 'flex' : 'none', alignItems: 'center', justifyContent: 'center' }}>
                    <div className={this.props.customClass}>
                        <div className="card rounded-4">
                            <div className="card-body py-2 text-start">
                                <h5 className="mb-3">{this.props?.titleMessage}</h5>
                                <p className="mb-4 fw-normal">{this.props.message}</p>
                                <div className="text-end">
                                    <button className="btn btn-remove fw-bold rounded-4" style={{marginRight: '10px'}} onClick={this.props.onCancel}>BATAL</button>
                                    <button className="btn btn-remove fw-bold rounded-4" onClick={this.props.onClick}>OK</button>
                {/* <div style={{position:'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, .4)', zIndex: '11111', display: this.props.visible ? 'flex' : 'none', alignItems: 'center', justifyContent:'center'}}>
                    <div className={this.props.customClass}>
                        <div className="card rounded-4">
                            <div className="card-body py-2">
                                <h5 className="mb-3">{this.props?.titleMessage}</h5>
                                <p className="mb-4">{this.props.message}</p>
                                <div style={{textAlign:'right'}}>
                                    <button className="btn btn-remove border-0 title-icare fw-bold rounded-4" onClick={this.props.onCancel}>BATAL</button>
                                    <button className="btn btn-remove border-0 title-icare fw-bold rounded-4" onClick={this.props.onClick}>OK</button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}