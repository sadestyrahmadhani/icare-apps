import React, {useState, useEffect} from 'react';
import InformationAlert from "../../component/alert/informationAlert";
import { Link } from 'react-router-dom';
import { getInformasiByUserid, updateIsRead } from '../../services/API/mod_informasi';
import LoadingAlert from '../../component/alert/loadingAlert';

function Information(props) {
    const [showPopup, setShowPopup] = useState(false)
    const [selectedInformation, setSelectedInformation] = useState(null)
    const [clickedCard, setClickedCard] = useState([])
    const [dataInformation, setDataInformation] = useState([])
    const [number, setNumber] = useState(10)
    const [loading, setLoading] = useState(false)
    const [defaultLoading, setDefaultLoading] = useState(props?.loading ?? true)

    useEffect(() => {
        init()
    }, [number]);


    const init = async () => {
        setLoading(defaultLoading)
        setDefaultLoading(true)
        const res = await getInformasiByUserid(number)
        setLoading(false)
        if(res.status == 200) {
            setDataInformation(res.data.Table)
        }
    }

    const showPopupHandler = (value) => {
        document.body.style.overflow = 'hidden';
        setShowPopup(true) 
        setSelectedInformation(value)
    }
    
    const hidePopupHandler = () => {
        document.body.style.overflow = 'auto';
        setShowPopup(false)
        setSelectedInformation(null)
    }
    const formatDate = (val) => {
        var date = new Date(val)
        return `${ date.getDate().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) }-${ date.getMonth().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) }-${ date.getFullYear().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) }`
    }

    

    // const handleCardClick = (value) => {
    //     setShowPopup()
    //     setSelectedInformation(value)
    // }

    // const handlePopup = () => {
    //     hidePopup();
    // }

    return (
        <>
            <div className="responsive-bar">
                <div className="card-title mb-md-4 m-0 p-0">
                    <span className="title-icare title-fitur fw-bold py-1" style={{borderBottom:'3px solid #014C90', fontSize:'18px'}}> Informasi </span>
                    <Link className="text-white" to="/settings" style={{position:'absolute', top: 12, right: 20, fontSize:'26px', zIndex:'11111'}}><i className="fa fa-cog d-md-none"></i></Link>
                </div>
            </div>
            <div className="responsive-informasi">
                <div className="card border-0 shadow-lg px-3">
                    <div className="card-body">
                        <div className="row">
                            {
                                dataInformation.map((value, key) => (
                                    <div style={{cursor:'pointer'}} className={`card-information col-md-12 mb-4 ${value.isRead ? '' : 'info-card'}`} key={key} onClick={async () => { showPopupHandler(value); await updateIsRead(value.id.toString()); init()}}>
                                        <div className="d-flex align-items-center mt-2 mb-2">
                                            <i className="fa fa-info-circle" style={{fontSize:'18px'}}>
                                                <span className="info mx-2" style={{fontSize:'15px'}}>Info</span>
                                            </i>
                                            <i className="fa fa-circle align-items-center mx-2" style={{fontSize:'12px'}}>
                                                <span className="date mx-2" style={{fontSize:'15px'}}>{formatDate(value.createDate)}</span>
                                            </i>
                                        </div>
                                        <h6 style={{color:'black'}}>{value.title}</h6>
                                        <p className="list-description" style={{fontSize:'14px'}}>{value.message}</p>
                                    </div>
                                ))
                            }
                        
                            <div className="button-informasi p-0 pb-lg-0 pb-3">
                                <button type="button" className="btn btn-informasi btn-primary font-size-14px-mobile" style={{width:'100%', height:'50px', backgroundColor:'#014C90', borderRadius:'15px'}} onClick={() => setNumber(number+10)}>Lihat lebih banyak...</button>
                            </div>
                        </div>
                        <LoadingAlert visible={loading} customClass="col-md-2 col-8" />
                        <InformationAlert visible={showPopup} customClass={`col-9 ${showPopup ? 'information-popup' : ''}`} dataInformation={selectedInformation} onClick={hidePopupHandler} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Information

// export default class extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             showPopup: false,
//             // isModalOpen: false,
//             // activeCard: null,
//             dataInformation: [
//                 {
//                     imgInformation: "images/detail-informasi.png",
//                     title: "INFO",
//                     dateInformation: "2023-04-12",
//                     alert: "Maaf, permintaan Anda dibatalkan!",
//                     description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
//                     messageInformation: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
//                 },
//                 {
//                     imgInformation: "images/detail-informasi.png",
//                     title: "INFO",
//                     dateInformation: "2023-04-13",
//                     alert: "Maaf, permintaan Anda dibatalkan!",
//                     description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
//                     messageInformation: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
//                 },
//                 {
//                     imgInformation: "images/detail-informasi.png",
//                     title: "INFO",
//                     dateInformation: "2023-04-12",
//                     alert: "Hai, permintaanmu sedang di validasi.",
//                     description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
//                     messageInformation: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
//                 },
//                 {
//                     imgInformation: "images/detail-informasi.png",
//                     title: "INFO",
//                     dateInformation: "2023-04-12",
//                     alert: "Maaf, permintaan Anda dibatalkan!",
//                     description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
//                     messageInformation: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
//                 },
//                 {
//                     imgInformation: "images/detail-informasi.png",
//                     title: "INFO",
//                     dateInformation: "2023-04-12",
//                     alert: "Maaf, permintaan Anda dibatalkan!",
//                     description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
//                     messageInformation: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
//                 },
//                 {
//                     imgInformation: "images/detail-informasi.png",
//                     title: "INFO",
//                     dateInformation: "2023-04-12",
//                     alert: "Maaf, permintaan Anda dibatalkan!",
//                     description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
//                     messageInformation: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
//                 },
//                 {
//                     imgInformation: "images/detail-informasi.png",
//                     title: "INFO",
//                     dateInformation: "2023-04-12",
//                     alert: "Maaf, permintaan Anda dibatalkan!",
//                     description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
//                     messageInformation: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
//                 }
//             ]
//         };
//         this.handlePopup = this.handlePopup.bind(this)
//     }

//     // Metode untuk menampilkan pop-up
//     showPopup() {
//         // Menambahkan properti CSS untuk mengatur overflow pada elemen body
//         document.body.style.overflow = 'hidden';
//         this.setState({ showPopup: true, isListScrollable: false });
//     }
  
//     // Metode untuk menyembunyikan pop-up
//     hidePopup() {
//         // Menghapus properti CSS untuk mengatur overflow pada elemen body
//         document.body.style.overflow = 'auto';
//         this.setState({ showPopup: false, isListScrollable: true });
//     }

//     handleCardClick(value) {
//         this.showPopup();
//         this.setState({selectedInformation: value});
//     }

//     handlePopup() {
//         this.hidePopup();
//         // this.setState({showPopup: false, isListScrollable: true})
//     }

//     // handleCardClick = (index) => {
//     //     this.setState({activeCard: index, isModalOpen: true});
//     // };

//     // closeModal = () => {
//     //     this.setState({isModalOpen: false});
//     // };

//     render () {
//         return (
//             <>
//             <div className="container">
//                 <div className="card-title mb-md-4 m-0 p-0">
//                     <span className="title-icare fw-bold py-1" style={{borderBottom:'3px solid #014C90', fontSize:'18px'}}> Informasi </span>
//                 </div>
//                 <div className="card border-0 shadow-lg">
//                     <div className="card-body">
//                         <div className="row">
//                             {
//                                 this.state.dataInformation.map((value, key) => (
//                                     <div style={{cursor:'pointer'}} className="card-information col-md-12 mb-4" key={key} onClick={() => this.handleCardClick(value)}>
//                                         <div className="d-flex align-items-center mt-2 mb-2">
//                                             <i className="fa fa-info-circle" style={{fontSize:'18px'}}>
//                                                 <span className="mx-2" style={{fontSize:'15px'}}>Info</span>
//                                             </i>
//                                             <i className="fa fa-circle align-items-center mx-2" style={{fontSize:'12px'}}>
//                                                 <span className="mx-2" style={{fontSize:'15px'}}>{value.dateInformation}</span>
//                                             </i>
//                                         </div>
//                                         <h6 style={{color:'black'}}>{value.alert}</h6>
//                                         <p style={{fontSize:'14px'}}>{value.description}</p>
//                                     </div>
//                                 ))
//                             }
                        

//                             {/* <Link className="list-items" to="" style={{textDecoration:'none'}}>
                                
//                                     {data.map((item, index) => (
//                                         <div key={index} className="col">
//                                             <div className="card border-0">
//                                                 <div className="card-body" onClick={() => this.handleCardClick(index)}>
//                                                     <h7 className="card-subtitle d-flex align-items-center">
//                                                         <i className="fa fa-info-circle" style={{marginRight:'10px', fontSize:'17px'}}>
//                                                             <span className="info" style={{fontSize:'15px', marginLeft:'6px'}}>Info</span>
//                                                         </i> 
//                                                         <i className="fa fa-circle me-1 ms-2" style={{fontSize:'10px'}}>
//                                                             <span className="info" style={{fontSize:'15px', marginLeft:'6px'}}>2023-04-12</span>
//                                                         </i>
//                                                     </h7> 
//                                                     <h6 className="card-title" style={{marginTop:'10px', fontSize:'15px'}}>Maaf, permintaan Anda dibatalkan!</h6>
//                                                     <p className="card-text" style={{fontSize:'13px'}}>Some quick example text to build on the card title and make up the bulk of the card's content.Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     ))}
                                
//                             </Link>
//                             {this.state.activeCard !== null && (
                                
//                                     <ReactModal isOpen={this.state.isModalOpen} onRequestClose={this.closeModal} contentLabel="Informasi">
//                                         <div className="col">
//                                             <button onClick={this.closeModal}><i className="fa fa-close"></i></button>
//                                             <img src={data[this.state.activeCard].image} alt="Image" />
//                                             <p style={{fontSize:'14px'}}>{data[this.state.activeCard].info}</p>
//                                             <p style={{fontSize:'14px'}}>{data[this.state.activeCard].date}</p>
//                                             <p style={{fontSize:'14px'}}>{data[this.state.activeCard].text}</p>
//                                             <p style={{fontSize:'14px'}}>{data[this.state.activeCard].description}</p>
//                                         </div>
//                                     </ReactModal>
                                
//                             )} */}
                            
//                             {/* <Link className="list-items" to="" style={{textDecoration:'none'}}>
                                
//                                     <div className="col">
//                                         <div className="card border-0">
//                                             <div className="card-body">
//                                                 <h7 className="card-subtitle d-flex align-items-center">
//                                                 <i className="fa fa-info-circle" style={{marginRight:'10px', fontSize:'17px'}}>
//                                                         <span className="info" style={{fontSize:'15px', marginLeft:'6px'}}>Info</span>
//                                                     </i> 
//                                                     <i className="fa fa-circle me-1 ms-2" style={{fontSize:'10px'}}>
//                                                         <span className="info" style={{fontSize:'15px', marginLeft:'6px'}}>2023-04-12</span>
//                                                     </i>
//                                                 </h7> 
//                                                 <h6 className="card-title" style={{marginTop:'10px', fontSize:'15px'}}>Maaf, permintaan Anda dibatalkan!</h6>
//                                                 <p className="card-text" style={{fontSize:'13px'}}>Some quick example text to build on the card title and make up the bulk of the card's content.Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//                                             </div>
//                                         </div>
//                                     </div>
                                
//                             </Link> */}
                        
//                             <div className="button-informasi">
//                                 <button type="button" className="btn btn-primary" style={{width:'100%', height:'50px', backgroundColor:'#014C90', borderRadius:'15px'}}>Lihat lebih banyak ...</button>
//                             </div>
//                         </div>
//                         <InformationAlert visible={this.state.showPopup} customClass="col-sm-9" dataInformation={this.state.selectedInformation} onClick={this.handlePopup} />
//                     </div>
//                 </div>
//             </div>
            
//             </>
//         )
//     }
// }
