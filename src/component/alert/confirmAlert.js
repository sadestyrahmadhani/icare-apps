import { Component } from 'react'

export default class extends Component {
    render() {
        return (
            <>
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, .4)', zIndex: '11111', display: this.props.visible ? 'flex' : 'none', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="col-md-3 col-sm-6 col-10">
                        <div className="card rounded-4">
                            <div className="card-body py-4 text-center">
                                <p className="mb-4">{ this.props.message }</p>
                                <button className="btn btn-primary" onClick={ this.props.onClick }>Ok</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}