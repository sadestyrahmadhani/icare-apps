import { Link } from "react-router-dom";

function Chat() {
    return(
        <>
            <div className="py-md-3">
                {/* <div className="responsive-bar" style={{alignItems:'baseline', height:'55px'}}>
                    <Link className="list-items" to="/riwayat">
                        <i className="fa fa-arrow-left me-3" style={{fontSize: 16, color:'#014C90'}}></i>
                        <strong className="title-icare" style={{fontSize: 18, borderBottom:'3px solid #014C90'}}>Tim Support iCare</strong>
                    </Link>
                </div> */}
                <div className="responsive-bar" style={{alignItems:'baseline', height:'55px'}}>
                    <h4 className="title-icare title-fitur m-0 p-0 fw-bold" style={{fontSize: '18px'}}>
                    <Link className="nav-link d-inline me-3" to="/riwayat">
                        <i className="fa fa-arrow-left color-arrow-left" style={{color:'#014C90'}}></i>
                    </Link>
                        <span className="title-bold" style={{borderBottom:'3px solid #014C90'}}>Tim Support iCare</span>
                    </h4>
                </div>
                <div className="responsive-tanya-tim">
                    <div className="card px-3 shadow border-0" style={{borderRadius:'20px'}}>
                        <div className="card-body">
                            <div className="row">
                                <div className="card-support d-flex p-0" style={{height:'400px', border:'2px solid black', borderRadius:'10px', backgroundColor:'white'}}>
                                    <div className="col-md-3 text-center fw-bold info" style={{fontSize:'14px', borderRadius:'10px 0 0 10px', backgroundColor:'white'}}>
                                        <p className="title-icare mt-4 fw-bold fs-5 mb-0 request">Service Request</p>
                                        <p className="mt-2 mb-0 date">7/15/2021 6:21:37 PM</p>
                                        <p className="mt-2 mb-0 code-request">SR-2419</p>
                                        <p className="mt-2 mb-0 noeq">EQ : 8799463</p>
                                        <p className="mt-2 note">Paper Jam</p>
                                    </div>
                                    <div className="col-md-8 chat" style={{backgroundColor:'#bfbfbf', width:'803px', borderLeft:'3px solid #014C90', borderRadius:'0 10px 10px 0'}}>
                                        <div className="card-chat">
                                            <div className="card-bubble mx-3 d-md-block d-none" style={{backgroundColor:'white', width:'52%', height:'50px', borderRadius: '0 5px 5px 5px', marginTop:'27%'}}>
                                                <p className="p-1 mb-0" style={{fontSize:'12px'}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                                <p className="p-1" style={{fontSize:'12px', textAlign:'right'}}>19:12</p>
                                            </div>
                                            <div className="card-bubble-chat" style={{backgroundColor:'#B0E0E6', width:'12%', height:'50px', borderRadius: '5px 0 5px 5px', marginTop:'2%', marginLeft:'86%'}}>
                                                <p className="p-1 mb-0" style={{fontSize:'12px'}}>Hai</p>
                                                <p className="p-1" style={{fontSize:'12px', textAlign:'right'}}>19:12</p>
                                            </div>
                                        </div>
                                        <div className="card-message-send" style={{height:'12%', backgroundColor:'white', borderRadius:' 0 0 10px 0', marginTop:'15px'}}>
                                            <input className="no-hover mx-2 mt-2 input-chat" type="text" style={{width:'94%', height:'33px', border:'2px solid #014C90', borderRadius:'5px', paddingLeft:'10px'}}></input>
                                            <i className="fa fa-paper-plane mx-1" style={{color:'#014C90'}}></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Chat

// export default class extends Component {
//     render() {
//         return(
//             <>
//                 <div className="container">
//                     <div className="responsive-bar" style={{alignItems:'baseline', height:'50px'}}>
//                         <Link className="list-items" to="">
//                             <i className="fa fa-arrow-left me-3" style={{fontSize: 16, color:'#014C90'}}></i>
//                             <strong className="title-icare" style={{fontSize: 18, borderBottom:'3px solid #014C90'}}>Tim Support iCare</strong>
//                         </Link>
//                     </div>
//                     <div className="responsive-tanya-tim">
//                         <div className="card px-3 shadow border-0" style={{borderRadius:'20px'}}>
//                             <div className="card-body">
//                                 <div className="row">
//                                     <div className="card-support d-flex" style={{height:'400px', border:'2px solid black', borderRadius:'10px'}}>
//                                         <div className="col-md-3 text-center fw-bold" style={{fontSize:'14px'}}>
//                                             <p className="title-icare mt-4 fw-bold fs-5 mb-0">Service Request</p>
//                                             <p className="mt-2 mb-0">7/15/2021 6:21:37 PM</p>
//                                             <p className="mt-2 mb-0">SR-2419</p>
//                                             <p className="mt-2 mb-0">EQ : 8799463</p>
//                                             <p className="mt-2">Paper Jam</p>
//                                         </div>
//                                         <div className="col-md-8" style={{backgroundColor:'#bfbfbf', width:'780px', borderLeft:'3px solid #014C90', borderRadius:'0 10px 10px 0'}}>
//                                             <div className="card-chat">
//                                                 <div className="card-bubble mx-3" style={{backgroundColor:'white', width:'52%', height:'50px', borderRadius: '0 5px 5px 5px', marginTop:'27%'}}>
//                                                     <p className="p-1 mb-0" style={{fontSize:'12px'}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
//                                                     <p className="p-1" style={{fontSize:'12px', textAlign:'right'}}>19:12</p>
//                                                 </div>
//                                                 <div className="card-bubble-chat" style={{backgroundColor:'#B0E0E6', width:'12%', height:'50px', borderRadius: '5px 0 5px 5px', marginTop:'2%', marginLeft:'86%'}}>
//                                                     <p className="p-1 mb-0" style={{fontSize:'12px'}}>Hai</p>
//                                                     <p className="p-1" style={{fontSize:'12px', textAlign:'right'}}>19:12</p>
//                                                 </div>
//                                             </div>
//                                             <div className="card-message-send" style={{height:'12%', backgroundColor:'white', borderRadius:' 0 0 10px 0', marginTop:'23px'}}>
//                                                 <input className="no-hover mx-2 mt-2" type="text" style={{width:'94%', height:'33px', border:'2px solid #014C90', borderRadius:'5px', paddingLeft:'10px'}}></input>
//                                                 <i className="fa fa-paper-plane mx-1" style={{color:'#014C90'}}></i>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </>
//         )
//     }
// }