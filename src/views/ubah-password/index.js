import { Component } from "react";
// import {  } from "module";

export default class extends Component {

    // const [password, setPasswordValue] = React.useState("password");
    // const [passwordInput, setPasswordInput] = React.useState("");

    // const onPasswordChange = (e) => {
    //     setPasswordInput(e.target.value)
    // };

    // const toggle = () => {
    //     if(password == "password") {
    //         setPasswordValue("text");
    //         return;
    //     }
    //     setPasswordValue("password");
    // }

    render(){
        return(
            <>
                <div className="container">
                    <div className="card-title text-center mx-auto my-4 mb-4" style={{borderBottom: '3px solid #014C90', width: '185px'}}>
                        <h4 className="title-icare fw-bold" style={{fontSize: '18px'}}>Ubah Kata Sandi</h4>
                    </div>
                    <div className="col-md-7 col-sm-5 col-12 mx-auto">
                        <div className="card mb-5">
                            <div className="card-body p-5">
                                <form>
                                    <div className="mb-3">
                                        <label className="fw-medium form-control border border-dark" style={{backgroundColor: '#014C90', borderRadius: '0px', color:'white', fontSize: '12px'}}>Masukkan Kata Sandi Lama</label>
                                        <div className="d-flex border border-dark">
                                            <input type="password" className="form-control" style={{boxShadow: 'none', textDecoration: 'none'}}/>
                                            <i className="fa fa-eye fa-lg my-auto me-2"></i>
                                        </div>  
                                    </div>
                                    <div className="mb-3">
                                        <label className="fw-medium form-control border border-dark" style={{backgroundColor: '#014C90', borderRadius: '0px', color:'white', fontSize: '12px'}}>Masukkan Kata Sandi Baru</label>
                                        <div className="border border-dark d-flex">
                                            <input type="password" className="form-control" style={{boxShadow: 'none', textDecoration: 'none'}}/>
                                            <i className="fa fa-eye fa-lg my-auto me-2"></i>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="fw-medium form-control border border-dark" style={{backgroundColor: '#014C90', borderRadius: '0px', color:'white', fontSize: '12px'}}>Ulangi Kata Sandi Baru</label>
                                        <div className="d-flex border border-dark">
                                            <input type="password" className="form-control" style={{boxShadow: 'none', textDecoration: 'none'}}/>
                                            <i className="fa fa-eye fa-lg my-auto me-2"></i>

                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <button className="btn btn-login px-5 py-2fw-medium">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}