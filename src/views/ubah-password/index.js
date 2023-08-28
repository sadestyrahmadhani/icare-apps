import { Component } from "react";
import Swal from "sweetalert2";


export default class extends Component {
    constructor(props) {
        super(props)
        this.submit = this.submit.bind(this)
        this.state = {
            typeInput: [
                'password',
                'password',
                'password',
            ],
            iconClass: [
                'fa-eye',
                'fa-eye',
                'fa-eye',
            ]
        }
    }

    submit(e){
        e.preventDefault()
        Swal.fire({
            title: 'Error',
            text: 'Harap isi seluruh data',
            confirmButtonColor: '#0099ff'
        })
        
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
                                <form onSubmit={this.submit}>
                                    <div className="mb-3">
                                        <label className="fw-medium form-control border border-dark size-13px" style={{backgroundColor: '#014C90', borderRadius: '0px', color:'white'}}>Masukkan Kata Sandi Lama</label>
                                        <div className="d-flex border border-dark">
                                            <input type={ this.state.typeInput[0] } className="form-control" style={{boxShadow: 'none', textDecoration: 'none', border: 'hidden'}}/>
                                            <i 
                                                className={ `fa ${ this.state.iconClass[0] } fa-lg my-auto me-2` } 
                                                onClick={ () => this.setState({
                                                    typeInput: [
                                                        this.state.typeInput[0] == 'password' ? 'text' : 'password',
                                                        this.state.typeInput[1],
                                                        this.state.typeInput[2],
                                                    ],
                                                    iconClass: [
                                                        this.state.typeInput[0] == 'password' ? 'fa-eye-slash' : 'fa-eye',
                                                        this.state.iconClass[1],
                                                        this.state.iconClass[2]
                                                    ]
                                                }) }
                                            ></i>
                                        </div>  
                                    </div>
                                    <div className="mb-3">
                                        <label className="fw-medium form-control border border-dark size-13px" style={{backgroundColor: '#014C90', borderRadius: '0px', color:'white'}}>Masukkan Kata Sandi Baru</label>
                                        <div className="border border-dark d-flex">
                                            <input type={ this.state.typeInput[1] } className="form-control" style={{boxShadow: 'none', textDecoration: 'none', border: 'hidden'}}/>
                                            <i 
                                                className={ `fa ${ this.state.iconClass[1] } fa-lg my-auto me-2` } 
                                                onClick={ () => this.setState({
                                                    typeInput: [
                                                        this.state.typeInput[0],
                                                        this.state.typeInput[1] == 'password' ? 'text' : 'password',
                                                        this.state.typeInput[2],
                                                    ],
                                                    iconClass: [
                                                        this.state.iconClass[0],
                                                        this.state.typeInput[1] == 'password' ? 'fa-eye-slash' : 'fa-eye',
                                                        this.state.iconClass[2]
                                                    ]
                                                }) }
                                            ></i>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="fw-medium form-control border border-dark size-13px" style={{backgroundColor: '#014C90', borderRadius: '0px', color:'white'}}>Ulangi Kata Sandi Baru</label>
                                        <div className="d-flex border border-dark">
                                            <input type={ this.state.typeInput[2] } className="form-control" style={{boxShadow: 'none', textDecoration: 'none', border: 'hidden'}}/>
                                            <i 
                                                className={ `fa ${ this.state.iconClass[2] } fa-lg my-auto me-2` } 
                                                onClick={ () => this.setState({
                                                    typeInput: [
                                                        this.state.typeInput[0],
                                                        this.state.typeInput[1],
                                                        this.state.typeInput[2] == 'password' ? 'text' : 'password'
                                                    ],
                                                    iconClass: [
                                                        this.state.iconClass[0],
                                                        this.state.iconClass[1],
                                                        this.state.typeInput[2] == 'password' ? 'fa-eye-slash' : 'fa-eye'
                                                    ]
                                                }) }
                                            ></i>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <button className="btn btn-login px-5 py-2 fw-medium" type="submit">Submit</button>
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