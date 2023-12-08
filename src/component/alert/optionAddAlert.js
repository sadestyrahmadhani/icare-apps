import { Component } from "react";

export default class extends Component {
    render() {
        return (
            <>
                <div style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, .4)', zIndex: '11111', display: this.props.visible ? 'flex' : 'none', alignItems: 'center', justifyContent: 'center'}}>
                    <div className={this.props.customClass}>
                        <div className="card rounded-4">
                            <div className="card-body py-2 text-center mb-2">
                                <h5 className="mb-3">{this.props?.titleMessage}</h5>
                                <p className="mb-3 fw-normal font-size-14px-mobile">{this.props.message}</p>
                                <button className="btn btn-remove me-lg-3 me-md-3 me-2 font-size-14px-mobile" style={{border: '1px solid #014C90'}} onClick={this.props.onList}>Kembali Ke List</button>
                                <button className="btn btn-primary font-size-14px-mobile" style={{border: '1px solid #0D6EFD'}} onClick={this.props.onClick}>{this.props.textButton}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}