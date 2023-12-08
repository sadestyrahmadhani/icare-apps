import { Component } from "react";
import { Link } from "react-router-dom";

import bannerWaiting from '../../images/hourglass.png'

function UpgradeStep3() {
    return (
        <>
            <div className="responsive-bar  ">
                    <div className="card-title mx-auto my-md-3 my-0" style={{borderBottom: '3px solid #014C90', width: '164px'}}>
                        <h4 className="title-icare title-fitur m-0 p-0 fw-bold" style={{fontSize: '18px'}}>
                            <Link to="/dashboard" className="nav-link d-md-none d-inline me-3">
                            {/* <Link to="/upgrade_step2" className="nav-link d-md-none d-inline me-3"> */}
                                <i className="fa fa-arrow-left"></i>
                            </Link>
                            <span className="title-bold">Upgrade Akun iCare</span>
                        </h4>
                    </div>
                </div>
                <div className="responsive-upgrade-step3">
                    <div className="col-md-8 col-sm-4 col-12 mx-auto">
                        <div className="text-center">
                            <img src={bannerWaiting} alt=""  style={{width: '24%'}}/>
                            <h5 className="mt-4 fw-bold title-icare" style={{fontSize: '18px'}}>APLIKASI DALAM PROSES</h5>
                            <h4 className="mt-3" style={{fontSize: '14px'}}>Aplikasi Anda sedang kami proses. Kami akan memberikan notifikasi dalam waktu 24 jam.</h4>
                        </div>
                    </div>
                </div>
        </>
    )
}

export default UpgradeStep3

// export default class extends Component{
//     render(){
//         return(
//             <>
//                 <div className="responsive-bar  ">
//                     <div className="card-title mx-auto my-md-3 my-0" style={{borderBottom: '3px solid #014C90', width: '164px'}}>
//                         <h4 className="title-icare title-fitur m-0 p-0 fw-bold" style={{fontSize: '18px'}}>
//                             <Link to="/upgrade_step2" className="nav-link d-md-none d-inline me-3">
//                                 <i className="fa fa-arrow-left"></i>
//                             </Link>
//                             Upgrade Akun iCare
//                         </h4>
//                     </div>
//                 </div>
//                 <div className="responsive-upgrade-step3">
//                     <div className="col-md-8 col-sm-4 col-12 mx-auto">
//                         <div className="text-center">
//                             <img src="/images/hourglass.png" alt=""  style={{width: '24%'}}/>
//                             <h5 className="mt-4 fw-bold title-icare" style={{fontSize: '18px'}}>APLIKASI DALAM PROSES</h5>
//                             <h4 className="mt-3" style={{fontSize: '14px'}}>Aplikasi Anda sedang kami proses. Kami akan memberikan notifikasi dalam waktu 24 jam <Link to="/supplies_request">Klik</Link></h4>
//                         </div>
//                     </div>
//                 </div>
//             </>
//         )
//     }
// }