import {Component} from "react";
import React, {useState} from 'react';
import { Link } from "react-router-dom";
import ReactModal from "react-modal";

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            activeCard: null,
        };
    }

    handleCardClick = (index) => {
        this.setState({activeCard: index, isModalOpen: true});
    };

    closeModal = () => {
        this.setState({isModalOpen: false});
    };

    render () {
        const data = [
            {
                image: "images/detail-informasi.png",
                info: "INFO",
                date: "2023-04-12",
                text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            },
        ]

        return (
            <>
            <div className="container-fluid">
                <div className="title d-flex align-items-center mb-4">
                    <span className="title-icare fw-medium py-1" style={{borderBottom:'3px solid #014C90', fontSize:'18px'}}>Informasi</span>
                </div>
                <div className="card border-0 shadow-lg">
                    <div className="card-body">
                        <Link className="list-items" to="" style={{textDecoration:'none'}}>
                            <div className="row">
                                {data.map((item, index) => (
                                    <div key={index} className="col">
                                        <div className="card border-0">
                                            <div className="card-body" onClick={() => this.handleCardClick(index)}>
                                                <h7 className="card-subtitle d-flex align-items-center">
                                                    <i className="fa fa-info-circle" style={{marginRight:'10px', fontSize:'17px'}}>
                                                        <span className="info" style={{fontSize:'15px', marginLeft:'6px'}}>Info</span>
                                                    </i> 
                                                    <i className="fa fa-circle me-1 ms-2" style={{fontSize:'10px'}}>
                                                        <span className="info" style={{fontSize:'15px', marginLeft:'6px'}}>2023-04-12</span>
                                                    </i>
                                                </h7> 
                                                <h6 className="card-title" style={{marginTop:'10px', fontSize:'15px'}}>Maaf, permintaan Anda dibatalkan!</h6>
                                                <p className="card-text" style={{fontSize:'13px'}}>Some quick example text to build on the card title and make up the bulk of the card's content.Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Link>
                        {this.state.activeCard !== null && (
                            <div className="row">
                                <ReactModal isOpen={this.state.isModalOpen} onRequestClose={this.closeModal} contentLabel="Informasi">
                                    <div className="col">
                                        <button onClick={this.closeModal}><i className="fa fa-close"></i></button>
                                        <img src={data[this.state.activeCard].image} alt="Image" />
                                        <p style={{fontSize:'14px'}}>{data[this.state.activeCard].info}</p>
                                        <p style={{fontSize:'14px'}}>{data[this.state.activeCard].date}</p>
                                        <p style={{fontSize:'14px'}}>{data[this.state.activeCard].text}</p>
                                        <p style={{fontSize:'14px'}}>{data[this.state.activeCard].description}</p>
                                    </div>
                                </ReactModal>
                            </div>
                        )}
                        
                        <Link className="list-items" to="" style={{textDecoration:'none'}}>
                            <div className="row">
                                <div className="col">
                                    <div className="card border-0">
                                        <div className="card-body">
                                            <h7 className="card-subtitle d-flex align-items-center">
                                            <i className="fa fa-info-circle" style={{marginRight:'10px', fontSize:'17px'}}>
                                                    <span className="info" style={{fontSize:'15px', marginLeft:'6px'}}>Info</span>
                                                </i> 
                                                <i className="fa fa-circle me-1 ms-2" style={{fontSize:'10px'}}>
                                                    <span className="info" style={{fontSize:'15px', marginLeft:'6px'}}>2023-04-12</span>
                                                </i>
                                            </h7> 
                                            <h6 className="card-title" style={{marginTop:'10px', fontSize:'15px'}}>Maaf, permintaan Anda dibatalkan!</h6>
                                            <p className="card-text" style={{fontSize:'13px'}}>Some quick example text to build on the card title and make up the bulk of the card's content.Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <Link className="list-items" to="" style={{textDecoration:'none'}}>
                            <div className="row">
                                <div className="col">
                                    <div className="card border-0">
                                        <div className="card-body">
                                            <h7 className="card-subtitle d-flex align-items-center">
                                            <i className="fa fa-info-circle" style={{marginRight:'10px', fontSize:'17px'}}>
                                                    <span className="info" style={{fontSize:'15px', marginLeft:'6px'}}>Info</span>
                                                </i> 
                                                <i className="fa fa-circle me-1 ms-2" style={{fontSize:'10px'}}>
                                                    <span className="info" style={{fontSize:'15px', marginLeft:'6px'}}>2023-04-12</span>
                                                </i>
                                            </h7> 
                                            <h6 className="card-title" style={{marginTop:'10px', fontSize:'15px'}}>Maaf, permintaan Anda dibatalkan!</h6>
                                            <p className="card-text" style={{fontSize:'13px'}}>Some quick example text to build on the card title and make up the bulk of the card's content.Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <Link className="list-items" to="" style={{textDecoration:'none'}}>
                            <div className="row">
                                <div className="col">
                                    <div className="card border-0">
                                        <div className="card-body">
                                            <h7 className="card-subtitle d-flex align-items-center">
                                            <i className="fa fa-info-circle" style={{marginRight:'10px', fontSize:'17px'}}>
                                                    <span className="info" style={{fontSize:'15px', marginLeft:'6px'}}>Info</span>
                                                </i> 
                                                <i className="fa fa-circle me-1 ms-2" style={{fontSize:'10px'}}>
                                                    <span className="info" style={{fontSize:'15px', marginLeft:'6px'}}>2023-04-12</span>
                                                </i>
                                            </h7> 
                                            <h6 className="card-title" style={{marginTop:'10px', fontSize:'15px'}}>Maaf, permintaan Anda dibatalkan!</h6>
                                            <p className="card-text" style={{fontSize:'13px'}}>Some quick example text to build on the card title and make up the bulk of the card's content.Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <Link className="list-items" to="" style={{textDecoration:'none'}}>
                            <div className="row">
                                <div className="col">
                                    <div className="card border-0">
                                        <div className="card-body">
                                            <h7 className="card-subtitle d-flex align-items-center">
                                            <i className="fa fa-info-circle" style={{marginRight:'10px', fontSize:'17px'}}>
                                                    <span className="info" style={{fontSize:'15px', marginLeft:'6px'}}>Info</span>
                                                </i> 
                                                <i className="fa fa-circle me-1 ms-2" style={{fontSize:'10px'}}>
                                                    <span className="info" style={{fontSize:'15px', marginLeft:'6px'}}>2023-04-12</span>
                                                </i>
                                            </h7> 
                                            <h6 className="card-title" style={{marginTop:'10px', fontSize:'15px'}}>Maaf, permintaan Anda dibatalkan!</h6>
                                            <p className="card-text" style={{fontSize:'13px'}}>Some quick example text to build on the card title and make up the bulk of the card's content.Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <Link className="list-items" to="" style={{textDecoration:'none'}}>
                            <div className="row">
                                <div className="col">
                                    <div className="card border-0">
                                        <div className="card-body">
                                            <h7 className="card-subtitle d-flex align-items-center">
                                            <i className="fa fa-info-circle" style={{marginRight:'10px', fontSize:'17px'}}>
                                                    <span className="info" style={{fontSize:'15px', marginLeft:'6px'}}>Info</span>
                                                </i> 
                                                <i className="fa fa-circle me-1 ms-2" style={{fontSize:'10px'}}>
                                                    <span className="info" style={{fontSize:'15px', marginLeft:'6px'}}>2023-04-12</span>
                                                </i>
                                            </h7> 
                                            <h6 className="card-title" style={{marginTop:'10px', fontSize:'15px'}}>Maaf, permintaan Anda dibatalkan!</h6>
                                            <p className="card-text" style={{fontSize:'13px'}}>Some quick example text to build on the card title and make up the bulk of the card's content.Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <Link className="list-items" to="" style={{textDecoration:'none'}}>
                            <div className="row">
                                <div className="col">
                                    <div className="card border-0">
                                        <div className="card-body">
                                            <h7 className="card-subtitle d-flex align-items-center">
                                            <i className="fa fa-info-circle" style={{marginRight:'10px', fontSize:'17px'}}>
                                                    <span className="info" style={{fontSize:'15px', marginLeft:'6px'}}>Info</span>
                                                </i> 
                                                <i className="fa fa-circle me-1 ms-2" style={{fontSize:'10px'}}>
                                                    <span className="info" style={{fontSize:'15px', marginLeft:'6px'}}>2023-04-12</span>
                                                </i>
                                            </h7> 
                                            <h6 className="card-title" style={{marginTop:'10px', fontSize:'15px'}}>Maaf, permintaan Anda dibatalkan!</h6>
                                            <p className="card-text" style={{fontSize:'13px'}}>Some quick example text to build on the card title and make up the bulk of the card's content.Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <Link className="list-items" to="" style={{textDecoration:'none'}}>
                            <div className="row">
                                <div className="col">
                                    <div className="card bg-primary border-0 mb-3">
                                        <div className="card-body">
                                            <h7 className="card-subtitle d-flex align-items-center">
                                            <i className="fa fa-info-circle" style={{marginRight:'10px', fontSize:'17px'}}>
                                                    <span className="info" style={{fontSize:'15px', marginLeft:'6px'}}>Info</span>
                                                </i> 
                                                <i className="fa fa-circle me-1 ms-2" style={{fontSize:'10px'}}>
                                                    <span className="info" style={{fontSize:'15px', marginLeft:'6px'}}>2023-04-12</span>
                                                </i>
                                            </h7> 
                                            <h6 className="card-title" style={{marginTop:'10px', fontSize:'15px'}}>Maaf, permintaan Anda dibatalkan!</h6>
                                            <p className="card-text" style={{fontSize:'13px'}}>Some quick example text to build on the card title and make up the bulk of the card's content.Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <Link className="list-items" to="" style={{textDecoration:'none'}}>
                            <div className="row">
                                <div className="col">
                                    <div className="card bg-primary border-0 mb-3">
                                        <div className="card-body">
                                            <h7 className="card-subtitle d-flex align-items-center">
                                            <i className="fa fa-info-circle" style={{marginRight:'10px', fontSize:'17px'}}>
                                                    <span className="info" style={{fontSize:'15px', marginLeft:'6px'}}>Info</span>
                                                </i> 
                                                <i className="fa fa-circle me-1 ms-2" style={{fontSize:'10px'}}>
                                                    <span className="info" style={{fontSize:'15px', marginLeft:'6px'}}>2023-04-12</span>
                                                </i>
                                            </h7> 
                                            <h6 className="card-title" style={{marginTop:'10px', fontSize:'15px'}}>Maaf, permintaan Anda dibatalkan!</h6>
                                            <p className="card-text" style={{fontSize:'13px'}}>Some quick example text to build on the card title and make up the bulk of the card's content.Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <Link className="list-items" to="" style={{textDecoration:'none'}}>
                            <div className="row">
                                <div className="col">
                                    <div className="card bg-primary border-0">
                                        <div className="card-body">
                                            <h7 className="card-subtitle d-flex align-items-center">
                                            <i className="fa fa-info-circle" style={{marginRight:'10px', fontSize:'17px'}}>
                                                    <span className="info" style={{fontSize:'15px', marginLeft:'6px'}}>Info</span>
                                                </i> 
                                                <i className="fa fa-circle me-1 ms-2" style={{fontSize:'10px'}}>
                                                    <span className="info" style={{fontSize:'15px', marginLeft:'6px'}}>2023-04-12</span>
                                                </i>
                                            </h7> 
                                            <h6 className="card-title" style={{marginTop:'10px', fontSize:'15px'}}>Maaf, permintaan Anda dibatalkan!</h6>
                                            <p className="card-text" style={{fontSize:'13px'}}>Some quick example text to build on the card title and make up the bulk of the card's content.Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <div className="button-informasi pt-4">
                            <button type="button" className="btn btn-primary" style={{width:'100%', height:'50px', backgroundColor:'#014C90', borderRadius:'15px'}}>Lihat lebih banyak ...</button>
                        </div>
                    </div>
                </div>
            </div>
            
            </>
        )
    }
}

// function App() {
//     const [ismodalOPen, setIsmodalOpen] = useState(false);

//     const openModal = () => {
//         setIsmodalOpen(true);
//     };

//     const closeModal = () => {
//         setIsmodalOpen(false);
//     };

//     return (
//         <div className="App">
//             <button onClick={openModal}>openModal</button>
//             <Modal isOpen={ismodalOPen} onClose={closeModal}>
//                 <h2>Modal Content</h2>
//                 <p>This is the content of the modal.</p>
//             </Modal>
//         </div>
//     );
// }

// export default App;