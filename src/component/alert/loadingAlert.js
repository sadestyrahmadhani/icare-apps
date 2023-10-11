import { Component } from "react";

export default class extends Component {
    render() {
        return (
            <>
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#00000066', zIndex: '11111', display: this.props.visible ? 'flex' : 'none', alignItems: 'center', justifyContent: 'center' }}>
                    <div className={this.props.customClass}>
                        <div className="card rounded-4">
                            <div className="card-body py-4 text-center">
                                <h6>Please Wait</h6>
                                <div className="fa fa-spinner fa-spin fa-3x text-primary"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
