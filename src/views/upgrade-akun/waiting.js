import { Component } from "react";
import { Link } from "react-router-dom";

export default class extends Component{
    render(){
        return(
            <>
                {/* <div className="container"> */}
                    <div className="card-title text-center mx-auto my-3 mb-5" style={{borderBottom: '3px solid #014C90', width: '165px'}}>
                        <h4 className="title-icare fw-bold" style={{fontSize: '18px'}}>Upgrade Akun iCare</h4>
                    </div>
                    <div className="col-md-8 col-sm-4 col-12 mx-auto">
                        <div className="text-center">
                            <img src="/images/hourglass.png" alt=""  style={{width: '25%'}}/>
                            <h5 className="mt-4 fw-bold title-icare" style={{fontSize: '18px'}}>APLIKASI DALAM PROSES</h5>
                            <h4 className="mt-3" style={{fontSize: '14px'}}>Aplikasi Anda sedang kami proses. Kami akan memberikan notifikasi dalam waktu 24 jam <Link to="/supplies">Klik</Link></h4>
                        </div>
                    </div>
                {/* </div> */}
            </>
        )
    }
}