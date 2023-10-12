import { Component } from "react";

export default class extends Component {
    render() {
        return(
            <>
                <div style={{position:'fixed', top: 0, left: 0, bottom: 0, backgroundColor:'rgba(0, 0, 0, .4)', zIndex: '11111', display: this.props.visible ? 'flex' : 'none', alignItems: 'center', justifyContent: 'center'}}>
                    <div className={this.props.customClass}>
                        <div className="card rounded-4">
                            <div className="card-body py-2 text-center">
                                <h5 className='mb-3'>{this.props?.titleMessage}</h5>
                                <p className="mb-4">{ this.props.message }</p>
                                <button className="text-primary" onClick={this.props.onClick}>
                                    <input type="file d-none" />
                                    GALERI
                                </button>
                                <button className="text-primary" onClick={this.props.onClick}>
                                    <input type="file d-none" />
                                    CAMERA
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}