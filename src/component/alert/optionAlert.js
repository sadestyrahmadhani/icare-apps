import React, { Component } from "react";

export default class extends Component {
    handleFileInput = (source) => {
        const input = document.createElement("input")
        input.type = "file"
        input.accept = "image/*"
        // input.capture = source === "CAMERA" ? "environment" : "user"
        if(source === "CAMERA") {
            input.capture = "environment"
        } else {
            input.capture = ""
        }

        input.onchange = this.props.previewImage
        input.click()
    }
    render() {
        return(
                <div style={{position:'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor:'rgba(0, 0, 0, .4)', zIndex: '11111', display: this.props.visible ? 'flex' : 'none', alignItems: 'center', justifyContent: 'center'}} onClick={this.props.handlePopup}>
                    <div className={this.props.customClass}>
                        <div className="card rounded-4">
                            <div className="card-body py-2">
                                <h5 className='mb-3'>{this.props?.titleMessage}</h5>
                                <p className="mb-4">{ this.props.message }</p>
                                <button className="btn text-primary" style={{marginLeft:'65px', border:'none'}} onClick={() => this.handleFileInput("GALERI")}>
                                    GALERI
                                </button>
                                <button className="btn text-primary" style={{border:'none'}} onClick={() => this.handleFileInput("CAMERA")}>
                                    CAMERA
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}