import React, { Component } from "react";

export default class extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: this.props.visible || false,
            csvFile: null,
            fileName: "",
            uploading: false,
        };
    }

    handleFileInputChange = (e) => {
        const file = e.target.files.length;
        // console.log(e.target.files)
        document.querySelectorAll('.upload-label').forEach((val, key) => {
            if (file > 0) {
                val.innerHTML = `
                    <span className="">${e.target.files[0].name}</span>
                `
            } else {
                val.innerHTML = `
                    <span className="">Choose File</span>
                `
            }

        })

        if (e.target.files[0]) {
            const reader = new FileReader()
            reader.onload = (event) => {
                localStorage.setItem('uploadedcsvfile', event.target.result)
            }

            reader.readAsDataURL(e.target.files[0])
        }
    };




    render() {
        return (
            <div
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.4)",
                    zIndex: 11111,
                    display: this.state.visible ? "flex" : "none",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <div className="col-3">
                    <div className="card rounded-4">
                        <div className="card-body py-2 text-center">
                            <h5 className="mb-3" style={{ borderBottom: "1px solid #D8D8D8", fontSize: '16px' }}>
                                Upload CSV File
                            </h5>
                            <div className="upload-container">
                                <div className="border rounded-3" style={{ margin: "10% 25%", display: 'grid' }}>
                                    <input
                                        type="file"
                                        accept="text/csv"
                                        id="csvFileInput"
                                        className="csv-file-input d-none"
                                        accept=".xlsx, .xls"
                                        onChange={(e) => {
                                            this.handleFileInputChange(e)
                                        }}
                                    />
                                    <label htmlFor="csvFileInput" style={{cursor: 'pointer'}}>
                                        <i style={{ color: 'gray' }} className="fa fa-cloud-upload fa-4x"></i>
                                    </label>
                                    <span style={{ color: 'gray', fontSize: '14px', cursor: 'pointer' }} className="upload-label">Choose File</span>
                                </div>
                            </div>
                            <div className="text-end">
                                <button
                                    className="btn btn-remove fw-bold rounded-4"
                                    style={{ marginRight: "10px" }}
                                    onClick={this.props.onCancel}
                                >
                                    BATAL
                                </button>
                                <button
                                    className="btn btn-remove fw-bold rounded-4"
                                    onClick={this.props.onClick}
                                >
                                    UPLOAD
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
