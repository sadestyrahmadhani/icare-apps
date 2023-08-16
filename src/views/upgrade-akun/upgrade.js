import { Component } from "react";
import { Link } from "react-router-dom";

export default class extends Component {
    render(){
        return(
            <>
                <div className="container">
                    <div className="card-title text-center mx-auto my-5 mb-3" style={{borderBottom: '3px solid #014C90', width: '220px'}}>
                        <h4 className="title-icare fw-bold" style={{fontSize: '22px'}}>Upgrade Akun iCare</h4>
                    </div>
                    <div className="text-center mb-3">
                        <i className="fa fa-arrow-circle-up fa-5x text-danger"></i>
                    </div>
                    <div className="col-md-8 col-sm-4 col-12 mx-auto">
                        <div className="card mb-4 text-center border border-dark" style={{borderRadius: '20px'}}>
                            <div className="card-body p-3">
                                <img src="/images/upgrade.png" alt="" />
                                <h5 className="mt-4 fw-bold title-icare" style={{fontSize: '20px'}}>Upgrade akun iCare anda untuk dapat melakukan Consumable Request</h5>
                            </div>
                        </div>
                        <div className="text-center mb-5 mx-auto">
                            {/* <button className="btn btn-login px-5 py-3">Upgrade Sekarang</button> */}
                            <Link className="btn btn-login px-5 py-3" to="/form-upgrade-account">Upgrade Sekarang</Link>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}