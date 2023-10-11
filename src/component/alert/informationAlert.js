import { Component } from "react";

export default class extends Component {
    render() {
        
        const {visible, customClass, dataInformation, onClick} = this.props;
        if(!dataInformation) {
            return null;
        }

        return (
            <>
                <div style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#00000066', zIndex: '11111', display: this.props.visible ? 'flex' : 'none', alignItems: "center", justifyContent: "center"}}>
                    <div className={customClass}>
                        <div className="card rounded-4">
                            <div className="card-body p-lg-5 p-md-5 p-3 popup-content" style={{fontSize:'14px', marginLeft:'10px'}}>
                                <button onClick={onClick} style={{background:'none', border:'none', marginLeft:'98%', fontSize:'20px'}}><i className="fa fa-close margin-close popup-button"></i></button>
                                <div className="text-center mb-4">
                                    <img src={dataInformation.imgInformation} className="image-information popup-img" alt="Image" style={{width:'20%'}}></img>
                                </div>
                                <p className="popup-title" style={{marginBottom:'0'}}>{dataInformation.title}</p>
                                <p className="popup-date">{dataInformation.dateInformation}</p>
                                <p className="popup-alert" style={{marginBottom:'0'}}>{dataInformation.alert}</p>
                                <p className="popup-description">{dataInformation.description}</p>
                                <p className="popup-message d-md-block d-none">{dataInformation.messageInformation}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}