import { Component } from "react";

export default class extends Component {
    render() {
        
        const {visible, customClass, dataInformation, onClick} = this.props;
        if(!dataInformation) {
            return null;
        }

        return (
            <>
                <div style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, .4)', zIndex: '11111', display: this.props.visible ? 'flex' : 'none', alignItems: "center", justifyContent: "center"}}>
                    <div className={customClass}>
                        <div className="card rounded-4">
                            <div className="card-body p-lg-5 p-md-5 p-3" style={{fontSize:'14px', marginLeft:'10px'}}>
                                <button onClick={onClick} style={{background:'none', border:'none', marginLeft:'98%', fontSize:'20px'}}><i className="fa fa-close margin-close"></i></button>
                                <div className="text-center mb-4">
                                    <img src={dataInformation.imgInformation} className="image-information" alt="Image" style={{width:'20%'}}></img>
                                </div>
                                <p style={{marginBottom:'0'}}>{dataInformation.title}</p>
                                <p>{dataInformation.dateInformation}</p>
                                <p style={{marginBottom:'0'}}>{dataInformation.alert}</p>
                                <p>{dataInformation.description}</p>
                                <p>{dataInformation.messageInformation}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}