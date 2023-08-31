import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";


export default class extends Component {
    previewImage(e) {
        const file = e.target
        if (file.files[0]) {
            const reader = new FileReader()
            reader.onload = (e) => {
                document.getElementById('preview-image').src = e.target.result
            }
            reader.readAsDataURL(file.files[0])
        }
        document.getElementById('display-image').classList.remove('d-none')
        document.getElementById('display-image').classList.add('d-block')
    }

    constructor(props) {
        super(props)
        this.state = {
            // checkBoxCheckCount: 0
            isChecked: true,

        }
        this.checkCheckBox = this.checkCheckBox.bind(this)
    }

    toggleVisibility = () => {
        this.setState((prevState) => ({
            isChecked: !prevState.isChecked,
        }));
    };

    checkCheckBox() {
        var checkbox = document.querySelectorAll('.problem-checkbox:checked')
        this.setState({ checkBoxCheckCount: checkbox.length })
    }



    render() {
        const { isChecked } = this.state;

        return (
            <>

                <div className="container-fluid py-3">
                    <div className="d-flex align-items-center mb-4">
                        <Link className="list-items" to="/collect-meter">
                            <i className="fa fa-arrow-left me-3" style={{ fontSize: '16px', color: '#014C90' }}></i>
                        </Link>

                        <span className="title-icare fw-bold py-1" style={{ borderBottom: '3px solid #014C90', fontSize: '18px' }}>Riwayat Meter</span>
                    </div>
                    <div className="card px-3 shadow">
                        <div className="card-body">
                            <div className="row mb-2">



                                {/* tabs */}
                                <div className="row">
                                    <div className="card-label py-1 " style={{ backgroundColor: '#014C90' }}>
                                        <label className="fw-medium" style={{ fontSize: '13px', color: '#fff' }}>Equipment Number</label>
                                    </div>
                                    <Link className="py-4 mb-2" style={{ border: '1px solid #000' }} to=""></Link>
                                    <div className="card-label py-1 " style={{ backgroundColor: '#014C90' }}>
                                        <label className="fw-medium" style={{ fontSize: '13px', color: '#fff' }}>Created Date</label>
                                    </div>
                                    <Link className="py-4 mb-2" style={{ border: '1px solid #000' }} to=""></Link>
                                    <div className="text-center mt-2">
                                        {/* <p className="text-decoration-underline fw-medium fst-italic text-center mt-3" style={{ fontSize: '13px', color: 'pink' }}>Please upload photo meter on machine</p> */}
                                        <input type="file" className="d-none" id="input-file" onChange={this.previewImage} accept="image/*" />
                                        <label className="file-icon mb-3 d-block" htmlFor="input-file">
                                            <img className="fs-4  p-2" src="/images/contoh-foto-riwayat.png" alt="upload image" />
                                        </label>
                                        <div className="d-none col-md-6 col-sm-8 mx-auto my-5" id="display-image">
                                            <img src="#" alt="" className="w-50" id="preview-image" />
                                        </div>
                                    </div>

                                    {/* <hr className="mt-5 mb-5" /> */}
                                    {/* <div className="text-center align-items-center" style={{ fontSize: '15px' }}>
                                        <span className="me-2">Apakah anda bersedia input meter manual? </span>

                                        <input
                                            type="checkbox"
                                            checked={isChecked}
                                            onChange={this.toggleVisibility}
                                        />

                                    </div> */}

                                    {/* input form */}
                                    {isChecked && <div>
                                        <div class="card card-body col-md-12 col-sm-6 col-12 mb-4 mt-4">
                                            <div className="px-2 py-3">
                                                <div className="col ">
                                                    <div className="check-item d-flex align-items-center mb-2 mt-2 ">
                                                        <label>Meter 1</label>
                                                        <input type="text" className="py-1 border-only-bottom ms-2"  style={{ fontSize: '12px', width: '92%' }} disabled />
                                                        {/* <input type="text" className="py-1 border-only-bottom ms-2" disabled={this.state.checkBoxCheckCount == 0} style={{ fontSize: '14px', width: '92%' }} /> */}
                                                    </div>
                                                    <div className="check-item d-flex align-items-center mb-2">
                                                        <label>Meter 2</label>
                                                        <input type="text" className="py-1 border-only-bottom ms-2" style={{ fontSize: '12px', width: '92%' }} disabled />
                                                    </div>
                                                    <div className="check-item d-flex align-items-center mb-2">
                                                        <label>Meter 3</label>
                                                        <input type="text" className="py-1 border-only-bottom ms-2" style={{ fontSize: '12px', width: '92%' }} disabled />
                                                    </div>
                                                    <div className="check-item d-flex align-items-center mb-2">
                                                        <label>Meter 4</label>
                                                        <input type="text" className="py-1 border-only-bottom ms-2" style={{ fontSize: '12px', width: '92%' }} disabled />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>}







                                    {/* <div className="col text-center mt-5">
                                        <button className="btn btn-login py-2 px-3" style={{ fontSize: '14px', width: '10%' }}>Submit</button>
                                    </div> */}




                                </div>







                                {/* <div className="navbar navbar-exspand-lg mb-4">
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <Link className="btn-proses py-3 px-4 text-center fw-medium">FOTO METER</Link>
                                    </li>
                                    <li className="nev-item">
                                        <Link className="btn-proses py-3 px-4 text-center fw-medium">RIWAYAT FOTO</Link>
                                    </li>
                                </ul>
                            </div> */}
                            </div>

                        </div>

                    </div>
                </div>


            </>


        )
    }
}