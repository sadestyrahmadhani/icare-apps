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
                    <div className="card-title text-center mx-auto my-3 mb-5" style={{borderBottom:'3px solid #014C90', width:'110px'}}>
                        <h4 className="title-icare" style={{fontSize:'16px'}}>Lupa Password</h4>
                    </div>
                    <div className="col-md-5 col-sm-7 col-12 mx-auto">
                        <div className="card mb-5">
                            <div className="card-body p-5">
                                <form>
                                    <div className="mb-3">
                                        <label className="size-10px fw-medium">Email Address</label>
                                        <input type="email"  className="form-control border-only-bottom"/>
                                    </div>
                                    <div className="mb-5">
                                        <label className="size-10px fw-medium">Number Phone</label>
                                        <input type="text"  className="form-control border-only-bottom"/>
                                    </div>
                                </form>
                                <div className="text-center">
                                    <Link className="btn btn-login px-5 py-2 fw-medium" style={{fontSize:'11px'}} to="/kode-otp">SUBMIT</Link>
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