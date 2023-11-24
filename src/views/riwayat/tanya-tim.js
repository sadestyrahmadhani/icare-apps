import { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { getDetailRiwayatOrder, getDataHelpDesk, createQuestionHelpDesk } from "../../services/API";
import LoadingAlert from "../../component/alert/loadingAlert";

function Chat() {
    const [dataRiwayatOrder, setDataRiwayatOrder] = useState([])
    const [dataChat, setDataChat] = useState([])
    const [chatContainerRef, setChatContainerRef] = useState(null);
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(true)
    const [messageRows, setMessageRows] = useState(1)
    const { id } = useParams()

    const chatRef = useRef(null)

    useEffect(() => {
        getDataRiwayatOrder().then(() => {
            setLoading(false)

            if (chatContainerRef) {
                chatContainerRef.scrollTop = chatContainerRef.scrollHeight;
            }
        })
    }, [chatContainerRef]);

    const getDataRiwayatOrder = async () => {
        const res = await getDetailRiwayatOrder(id)
        const response = await getDataHelpDesk(res.data.requestNo)

        if (res.status === 200 && response.status === 200) {
            setDataRiwayatOrder(res.data)
            setDataChat(response.data.Table)
        }
    }
    // console.log('RES 1: ', dataChat)
    // console.log('RES 2: ', dataRiwayatOrder)


    const handleEq = () => {
        if (dataRiwayatOrder && dataRiwayatOrder.equipment) {
            return `EQ : ${dataRiwayatOrder.equipment}`
        } else {
            return ""
        }
    }

    const getNameRequestType = () => {
        if (dataRiwayatOrder && dataRiwayatOrder.requestd) {
            return dataRiwayatOrder.requestd.map((item) => item.namarequesttype).join(", ")
        } else {
            return ""
        }
    }

    const handleChat = (e) => {
        // e.preventDefault()
        setMessage(e.target.value)
        const lineCount = (e.target.value.match(/\n/g) || []).length + 1;
        setMessageRows(lineCount > 4 ? 4 : lineCount); 
    }

    const handleEnter = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            if (messageRows < 4) {
                setMessage((prevMessage) => prevMessage + '\n')
                setMessageRows((prevRows) => prevRows + 1)
            }
        }
    }

    const isQuestion = (item) => item.type === "Tanya";

    const cardMessageSendPosition = dataChat.length > 5 ? {position: 'initial'} : {position: 'absolute'};

    const createFormattedDate = () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const date = String(currentDate.getDate()).padStart(2, '0');
        const hours = String(currentDate.getHours()).padStart(2, '0');
        const minutes = String(currentDate.getMinutes()).padStart(2, '0');
        const seconds = String(currentDate.getSeconds()).padStart(2, '0');
        const milliseconds = String(currentDate.getMilliseconds()).padStart(3, '0');

        return `${year}-${month}-${date}T${hours}:${minutes}:${seconds}.${milliseconds}`;
    }


    const submit = async (e) => {
        e.preventDefault()

        let isValid = true

        if (message === ""){
            isValid = false
        }

        // console.log('Data : ', dataRiwayatOrder.requestNo)

        if(isValid) {
            const newMessage = {
                type: 'Tanya',
                Description: message,
                CreateDate: createFormattedDate()
            }

            // console.log(newMessage)

            setDataChat([...dataChat, newMessage]) 

            try {
                const res = await createQuestionHelpDesk({
                    UserId: localStorage.getItem('id'),
                    tRequestId: dataRiwayatOrder.requestNo,
                    type: 'Tanya',
                    Description: message,
                    UserAgent: ''
                })
    
                if(res.status == 200 && res.data.includes('Succes submit Tanya Jawab')) {
                    setMessage('')
                }
            } catch (error) {
                console.error('Gagal mengirim pesan : ', error)
            }
        }
    }

    return (
        <>
            <div className="py-md-3">
                {/* <div className="responsive-bar" style={{alignItems:'baseline', height:'55px'}}>
                    <Link className="list-items" to="/riwayat">
                        <i className="fa fa-arrow-left me-3" style={{fontSize: 16, color:'#014C90'}}></i>
                        <strong className="title-icare" style={{fontSize: 18, borderBottom:'3px solid #014C90'}}>Tim Support iCare</strong>
                    </Link>
                </div> */}
                <div className="responsive-bar" style={{ alignItems: 'baseline', height: '55px' }}>
                    <h4 className="title-icare title-fitur m-0 p-0 fw-bold" style={{ fontSize: '18px' }}>
                        <Link className="nav-link d-inline me-3" to={`/detail_permintaan/${dataRiwayatOrder.id}`}>
                            <i className="fa fa-arrow-left color-arrow-left" style={{ color: '#014C90' }}></i>
                        </Link>
                        <span className="title-bold" style={{ borderBottom: '3px solid #014C90' }}>Tim Support iCare</span>
                    </h4>
                </div>
                <div className="responsive-tanya-tim">
                    <div className="card px-3 shadow border-0" style={{ borderRadius: '20px' }}>
                        <div className="card-body">
                            <div className="row">
                                <div className="card-support d-flex p-0" style={{ height: '400px', border: '2px solid black', borderRadius: '10px', backgroundColor: 'white' }}>
                                    <div className="col-md-3 text-center info px-lg-2 px-md-2" style={{ fontSize: '13px', borderRadius: '10px 0 0 10px', backgroundColor: 'white' }}>
                                        <p className={`title-icare mt-4 fw-bold fs-5 mb-0 request ${isQuestion(dataRiwayatOrder) ? 'request' : 'response'}`}>{dataRiwayatOrder.namarequest}</p>
                                        <p className="mt-2 mb-0 date">{dataRiwayatOrder.createdate}</p>
                                        <p className="mt-2 mb-0 code-request">{dataRiwayatOrder.requestNo}</p>
                                        <p className="mt-2 mb-0 noeq">{handleEq()}</p>
                                        <p className="mt-2 note">{getNameRequestType()}</p>
                                    </div>
                                    <div className="col-md-8 chat" ref={(ref) => setChatContainerRef(ref)} style={{ backgroundColor: '#bfbfbf', width: '804px', borderLeft: '3px solid #014C90', borderRadius: '0 10px 10px 0', position:'relative'}} >
                                        <div className="card-chat px-3" style={{maxHeight: '348px', overflowY: 'auto', position:'relative' }}>
                                            {
                                                dataChat.map((item, index) => (
                                                    <div
                                                        key={index}
                                                        className={"card-buble card-bubble-chat d-md-block d-block"}
                                                        style={{ backgroundColor: isQuestion(item) ? '#B0E0E6' : 'white', width: 'fit-content', maxWidth: '350px', height: 'fit-content', borderRadius: isQuestion(item) ? '5px 0 5px 5px' : '0 5px 5px 5px', marginTop: '5px', marginLeft: isQuestion(item) ? 'auto' : '0px' }}>
                                                        <p className="p-1 px-2 pe-3 mb-0" style={{ fontSize: '12px' }}>{item.Description}</p>
                                                        <p className="p-lg-1 p-md-1 p-1 py-0" style={{ fontSize: '12px', textAlign: 'right', marginBottom: '10px' }}>{item.CreateDate.split('T')[1].slice(0, 5)}</p>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                        <div className="card-message-send" style={{...cardMessageSendPosition}} >
                                            <form onSubmit={submit} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
                                                {/* <input className="no-hover mx-2 mt-2 input-chat" type="text" style={{width:'92%', height:'auto', border:'2px solid #014C90', borderRadius:'5px', paddingLeft:'10px'}} onChange={handleChat} value={message} onKeyDown={handleEnter}/> */}
                                                <textarea rows={messageRows} className="no-hover mx-2 mt-2 input-chat" style={{width: '92%', height: 'auto', border: '2px solid #014C90', borderRadius: '5px', paddingLeft: '10px'}} onChange={handleChat} value={message} onKeyDown={handleEnter}></textarea>
                                                <button type="submit" style={{ height: '95%', border: 'none', background: 'none', paddingRight: '15px' }}>
                                                    <i className="fa fa-paper-plane mx-1" style={{ color: '#014C90' }}></i>
                                                </button>

                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <LoadingAlert visible={loading} customClass="col-md-2 col-8" />
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