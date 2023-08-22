import { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../component/navbar";
import Footer from "../../component/footer";

export default class extends Component {
    constructor(props) {
        super(props)
        this.submit = this.submit.bind(this)
        this.state = {
            email:'',
            phone:'',
            errorEmail:'',
            errorPhone:'',
        }
    }

    submit(e) {
        e.preventDefault()
        if(this.state.email === "") this.setState({errorEmail:"Silahkan isi email"})
        if(this.state.phone === "") this.setState({errorPhone:"Silahkan isi nomor telepon"})
        if(this.state.email !== "" && this.state.phone !== "") {
            this.props.router.navigate("/kode-otp")
        }
    }


    render() {
        return(
            <div className="bg-light">
                <Navbar versi="2" />
                <div className="container">
                    <div className="card-title text-center mx-auto my-3 mb-5 pt-3" style={{borderBottom:'3px solid #014C90', width:'135px'}}>
                        <h5 className="title-icare fw-bold">Lupa Password</h5>
                    </div>
                    <div className="col-md-6 col-sm-7 col-12 mx-auto">
                        <div className="card mb-5 px-4 shadow-sm bg-light" style={{border:'1px solid'}}>
                            <div className="card-body p-5">
                                <form onSubmit={this.submit}>
                                    <div className="mb-3">
                                        <label className="size-13px fw-bold">Email Address</label>
                                        <input type="email"  className={`form-control border-only-bottom ${this.state.errorEmail === "" ? "": "invalid"}`} onChange={(e) => this.setState({email:e.target.value})}/>
                                        <span className={`${this.state.errorEmail === "" ? "d-none": ""} text-danger small`} style={{fontSize:'12px'}}> {this.state.errorEmail} </span>
                                    </div>
                                    <div className="mb-5">
                                        <label className="size-13px fw-bold">Number Phone</label>
                                        <input type="text"  className={`form-control border-only-bottom ${this.state.errorPhone === "" ? "": "invalid"}`} onChange={(e) => this.setState({phone:e.target.value})}/>
                                        <span className={`${this.state.errorPhone === "" ? "d-none": ""} text-danger small`} style={{fontSize:'12px'}}> {this.state.errorPhone} </span>
                                    </div>
                                    <div className="text-center pt-4">
                                        <button className="btn btn-login fw-medium rounded-3" type="submit" style={{fontSize:'14px', paddingLeft:'60px', paddingRight:'60px', paddingTop:'12px', paddingBottom:'12px'}}>SUBMIT</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}