import { Component } from "react";
import { Link } from "react-router-dom";

export default class extends Component {
    render(){
        return(
            <>
                <div className="container">
                    <div className="card-title text-center mx-auto mb-2" style={{borderBottom: '3px solid #014C90', width: '165px'}}>
                        <h4 className="title-icare fw-bold" style={{fontSize: '18px'}}>Upgrade Akun iCare</h4>
                    </div>
                    <div className="text-center mb-3">
                        <i className="fa fa-arrow-circle-up fa-4x text-danger"></i>
                    </div>
                    <div className="col-md-7 col-sm-5 col-12 mx-auto">
                        <div className="card mb-4 text-center border border-dark" style={{borderRadius: '20px'}}>
                            <div className="card-body p-3">
                                <img src="/images/upgrade.png" alt="" style={{width: '28%'}}/>
                                <h5 className="mt-4 fw-bold title-icare" style={{fontSize: '16px'}}>Upgrade akun iCare anda untuk dapat melakukan Consumable Request</h5>
                            </div>
                        </div>
                        <div className="text-center mb-5 mx-auto">
                            {/* <button className="btn btn-login px-5 py-3">Upgrade Sekarang</button> */}
                            <Link className="btn btn-login" style={{padding: '12px 40px', borderRadius: '10px'}} to="/upgrade_step2">Upgrade Sekarang</Link>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}