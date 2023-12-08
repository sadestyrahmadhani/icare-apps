import { Link } from "react-router-dom";
import bannerUpgrade from '../../images/upgrade.png'

function UpgradeStep1() {
    return (
        <>
            <div className="responsive-bar">
                <div className="card-title mx-auto my-md-3 my-0" style={{ borderBottom: '3px solid #014C90', width: '164px' }}>
                    <h4 className="title-icare title-fitur m-0 p-0 fw-bold" style={{ fontSize: '18px' }}>
                        <Link to="/dashboard" className="nav-link d-md-none d-inline me-3">
                            <i className="fa fa-arrow-left"></i>
                        </Link>
                        <span className="title-bold">Upgrade Akun iCare</span>
                    </h4>
                </div>
            </div>
            <div className="col-md-11 col-12 mx-auto responsive-upgrade-step1">
                <div className="text-center mb-3 margin-bottom-70px">
                    <i className="fa fa-arrow-circle-up fa-4x text-danger"></i>
                </div>
                <div className="col-md-7 col-sm-5 col-9 mx-auto">
                    <div className="card mb-4 px-2 px-md-2 text-center border border-dark" style={{ borderRadius: '20px' }}>
                        <div className="card-body p-lg-4 px-0">
                            <img src={bannerUpgrade} alt="" style={{ width: '28%' }} />
                            <h5 className="mt-4 fw-bold title-icare" style={{ fontSize: '16px' }}>Upgrade akun iCare anda untuk dapat melakukan Consumable Request</h5>
                        </div>
                    </div>
                    <div className="text-center mb-lg-5 mx-auto">
                        <Link className="btn btn-login" style={{ padding: '12px 40px', borderRadius: '10px' }} to="/upgrade_step2">Upgrade Sekarang</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpgradeStep1

// export default class extends Component {
//     render(){
//         return(
//             <>
//                 <div className="responsive-bar">
//                     <div className="card-title mx-auto my-md-3 my-0" style={{borderBottom: '3px solid #014C90', width: '164px'}}>
//                         <h4 className="title-icare title-fitur m-0 p-0 fw-bold" style={{fontSize: '18px'}}>
//                             <Link to="/dashboard" className="nav-link d-md-none d-inline me-3">
//                                 <i className="fa fa-arrow-left"></i>
//                             </Link>
//                             Upgrade Akun iCare
//                         </h4>
//                     </div>
//                 </div>
//                 <div className="col-md-11 col-12 mx-auto responsive-upgrade-step1">
//                     <div className="text-center mb-3 margin-bottom-90px">
//                         <i className="fa fa-arrow-circle-up fa-4x text-danger"></i>
//                     </div>
//                     <div className="col-md-7 col-sm-5 col-9 mx-auto">
//                         <div className="card mb-4 px-2 px-md-2 text-center border border-dark" style={{borderRadius: '20px'}}>
//                             <div className="card-body p-lg-4 px-0">
//                                 <img src="/images/upgrade.png" alt="" style={{width: '28%'}}/>
//                                 <h5 className="mt-4 fw-bold title-icare" style={{fontSize: '16px'}}>Upgrade akun iCare anda untuk dapat melakukan Consumable Request</h5>
//                             </div>
//                         </div>
//                         <div className="text-center mb-5 mx-auto">
//                             {/* <button className="btn btn-login px-5 py-3">Upgrade Sekarang</button> */}
//                             <Link className="btn btn-login" style={{padding: '12px 40px', borderRadius: '10px'}} to="/upgrade_step2">Upgrade Sekarang</Link>
//                         </div>
//                     </div>
//                 </div>
//             </>
//         )
//     }
// }