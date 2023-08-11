import { Component } from "react";
import Navbar from "../../component/navbar";
import Footer from "../../component/footer";
import { Link } from "react-router-dom";

export default class extends Component {
    render() {
        return(
            <>
                <Navbar versi="2" />
                <div className="container">
                    <div className="card-title text-center mx-auto my-3 mb-5 pt-3" style={{borderBottom:'3px solid #014C90', width:'135px'}}>
                        <h4 className="title-icare" style={{fontSize:'20px'}}>Lupa Password</h4>
                    </div>
                    <div className="col-md-6 col-sm-7 col-12 mx-auto">
                        <div className="card mb-5 px-5">
                            <div className="card-body p-5">
                                <form>
                                    <div className="mb-3">
                                        <label className="size-13px fw-medium">Email Address</label>
                                        <input type="email"  className="form-control border-only-bottom"/>
                                    </div>
                                    <div className="mb-5">
                                        <label className="size-13px fw-medium">Number Phone</label>
                                        <input type="text"  className="form-control border-only-bottom"/>
                                    </div>
                                </form>
                                <div className="text-center pt-4">
                                    <Link className="btn btn-login fw-medium" style={{fontSize:'14px', paddingLeft:'70px', paddingRight:'70px', paddingTop:'15px', paddingBottom:'15px'}} to="/kode-otp">SUBMIT</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        )
    }
}