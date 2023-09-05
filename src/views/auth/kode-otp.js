import { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../component/navbar";
import Footer from "../../component/footer";
import ConfirmAlert from "../../component/alert/confirmAlert";
// import Swal from "sweetalert2";

export default class extends Component {
    constructor(props) {
        super(props)
        this.submit = this.submit.bind(this)
        this.handlePopup = this.handlePopup.bind(this)
        this.resetIteration = this.resetIteration.bind(this)
        this.state = {
            iteration: 60,
            resendCodeDisabled:true,
            showPopup: false,
            dataPhone: '81984765231'
        }
    }

    handlePopup(){
        this.setState({showPopup:false})
    }

    submit(e) {
        e.preventDefault()
        this.setState({showPopup:true})

        // Swal.fire({
        //     title:'Error',
        //     text:'OTP not match',
        //     confirmButtonColor: '#0099ff'
        // })
    }

    resetIteration(e) {
        e.preventDefault()
        if(this.state.iteration === 0) {
            this.setState({iteration: 60})
        }
    }

    render() {
        return(
            <div className="bg-light">
                <Navbar versi="2" />
                    <div className="card-title text-center mx-auto my-3 mb-5 d-md-block d-none" style={{borderBottom:'3px solid #014C90', width:'92px'}}>
                        <h5 className="title-icare title-fitur fw-bold">Kode OTP</h5>
                    </div>
                    <div className="col-md-5 col-sm-8 col-12 mx-auto responsive-otp">
                        <div className="card mb-5 py-4 px-md-5 px-0 bg-light" style={{border:'1px solid'}}>
                            <div className="card-body text-center px-4">
                                <p className="mb-2 text-otp" style={{fontSize:'14px', textAlign:'justify'}}>Silahkan masukkan kode OTP yang telah dikirimkan melalui sms ke No. +62{this.state.dataPhone}</p>
                                <form className="mb-3" onSubmit={this.submit}>
                                    <input type="number" className="form-control border-only-bottom text-center mb-4" placeholder="Masukkan Kode OTP" style={{fontSize:'14px'}} />
                                    <button className="btn btn-login fw-medium rounded-3 shadow" type="submit" style={{fontSize:'14px', paddingLeft:'60px', paddingRight:'60px', paddingTop:'12px', paddingBottom:'12px'}}>SUBMIT</button>
                                </form>
                                <ConfirmAlert visible={this.state.showPopup} message="OTP not match" onClick={this.handlePopup} customClass="col-md-2 col-sm-6 col-7" />
                                <p className="mb-2" style={{fontSize:'14px'}}>Belum terima SMS kode OTP ?</p>
                                <button className={`${this.state.resendCodeDisabled ? 'disabled' : 'fw-bold text-primary'}`} onClick={this.resetIteration} type="button" style={{textDecoration:'none', color:'#9b9b9b', fontSize:'14px', border:'none', background:'transparent'}}>Kirim Ulang</button>
                                <p className="mt-2" style={{fontSize:'14px'}}>Harap Tunggu {this.state.iteration} detik sebelum kirim ulang otp</p>
                            </div>
                        </div>
                    </div>
                <Footer />
            </div>
        )
    }

    componentDidMount() {
        setInterval(() => {
            this.setState({iteration:this.state.iteration === 0 ? 0 : this.state.iteration - 1})
            if(this.state.iteration === 0) {
                this.setState({resendCodeDisabled:false})
            } else {
                this.setState({resendCodeDisabled:true})
            }
        }, 1000)
    }
}

