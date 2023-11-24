import { Component } from 'react'


export default class extends Component {
    render() {
        return (
            <>
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, .4)', zIndex: '11111', display: this.props.visible ? 'flex' : 'none', alignItems: 'center', justifyContent: 'center' }}>
                    <div className={this.props.customClass}>
                        <div className="card rounded-4">
                            <div className="card-body py-3 text-center">
                                <p className="mb-4 fw-normal">Anda yakin pesanan telah diterima ?</p>
                                <div className='col-12 text-end'>
                                    <button className="btn btn-primary btn-alert rounded-4 me-3" style={{backgroundColor:'#378aff', border:'none', width: '65px'}} onClick={ this.props.onClick }>Tidak</button>
                                    <button className="btn btn-primary btn-alert rounded-4" style={{backgroundColor:'#378aff', border:'none', width: '65px'}} onClick={ this.props.update } data-id={this.props.dataId}>Ya</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}