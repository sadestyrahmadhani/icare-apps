import { Component } from "react";


export default class extends Component {
    constructor(props){
        super(props)
        this.state = {
            typeInput:'password',
            // iconClass: 'fa fa-eye'
        }
        this.checkInput = this.checkInput.bind(this)
    }

    checkInput(){
        this.setState({typeInput:'text'})
        // this.setState({iconClass:'fa fa-eye-slash'})
    }

    render(){
        return(
            <>
                <div className="container">
                    <div className="card-title text-center mx-auto my-4 mb-4" style={{borderBottom: '3px solid #014C90', width: '135px'}}>
                        <h4 className="title-icare fw-bold" style={{fontSize: '18px'}}>Ubah Kata Sandi</h4>
                    </div>
                    <div className="col-md-7 col-sm-5 col-12 mx-auto">
                        <div className="card mb-5">
                            <div className="card-body p-5">
                                <form>
                                    <div className="mb-3">
                                        <label className="fw-medium form-control border border-dark size-13px" style={{backgroundColor: '#014C90', borderRadius: '0px', color:'white'}}>Masukkan Kata Sandi Lama</label>
                                        <div className="d-flex border border-dark">
                                            <input type={this.state.typeInput} className="form-control" style={{boxShadow: 'none', textDecoration: 'none', border: 'hidden'}}/>
                                            {/* <span onClick={ this.setState({ typeInput: this.state.typeInput === 'password' ? 'text' : 'password', iconClass: this.state.typeInput === 'password' ? 'fa fa-eye-slash' : 'fa fa-eye' }) }>
                                                <i className={this.state.iconClass}></i>
                                            </span> */}
                                        </div>  
                                    </div>
                                    <div className="mb-3">
                                        <label className="fw-medium form-control border border-dark size-13px" style={{backgroundColor: '#014C90', borderRadius: '0px', color:'white'}}>Masukkan Kata Sandi Baru</label>
                                        <div className="border border-dark d-flex">
                                            <input type={this.state.typeInput} className="form-control" style={{boxShadow: 'none', textDecoration: 'none', border: 'hidden'}}/>
                                            <i className="fa fa-eye fa-lg my-auto me-2"></i>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="fw-medium form-control border border-dark size-13px" style={{backgroundColor: '#014C90', borderRadius: '0px', color:'white'}}>Ulangi Kata Sandi Baru</label>
                                        <div className="d-flex border border-dark">
                                            <input type={this.state.typeInput} className="form-control" style={{boxShadow: 'none', textDecoration: 'none', border: 'hidden'}}/>
                                            <i className="fa fa-eye fa-lg my-auto me-2"></i>

                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <button className="btn btn-login px-5 py-2 fw-medium">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}