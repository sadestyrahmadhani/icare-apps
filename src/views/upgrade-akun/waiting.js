import { Component } from "react";

export default class extends Component{
    render(){
        return(
            <>
                <div className="container">
                    <div className="card-title text-center mx-auto my-5 mb-5" style={{borderBottom: '3px solid #014C90', width: '225px'}}>
                        <h4 className="title-icare fw-bold" style={{fontSize: '22px'}}>Upgrade Akun iCare</h4>
                    </div>
                    <div className="col-md-8 col-sm-4 col-12 mx-auto">
                        <div className="text-center">
                            <img src="/images/hourglass.png" alt="" />
                            <h5 className="mt-4 fw-bold title-icare" style={{fontSize: '20px'}}>APLIKASI DALAM PROSES</h5>
                            <h4 className="mt-3" style={{fontSize: '18px'}}>Aplikasi Anda sedang kami proses. Kami akan memberikan notifikasi dalam waktu 24 jam</h4>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}