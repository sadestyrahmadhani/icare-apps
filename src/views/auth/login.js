import { Component } from "react";
import { Link } from "react-router-dom";
import FormInput from "./../../component/form/input";


export default class extends Component {
    render() {
        return(
            <>
                <div className="row my-5">
                    <div className="col-9">
                        <div className="col-sm-10 col-12 my-5 ">
                            <div className="card shadow-sm rounded">
                                <div className="card-body">
                                    <div className="col-12 text-center my-3">
                                        <img src="/images/iCareLogo.png" alt="Logo iCare" height="50" />
                                    </div>
                                    <form>
                                        <div className="mb-3">
                                            <label className="size-10px fw-medium">EMAIL</label>
                                            <input type="text" className="form-control border-only-bottom"/>
                                        </div>
                                        <div className="mb-4">
                                            <label className="size-10px fw-medium">PASSWORD</label>
                                            <input type="password" className="form-control border-only-bottom" />
                                        </div>
                                        <div className="mb-2 mx-auto text-center">
                                            <button className="btn btn-login px-5 py-1 my-1">LOGIN</button>
                                        </div>
                                        <div className="text-center">
                                            <Link className="nav-link size-10px fw-medium my-2" to="">Belum Punya akun ?</Link>
                                            <Link className="nav-link size-10px fw-medium my-2"  to="">Lupa Password ?</Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="background col-3">
                        <img src="/images/Cahyo_MFD.png" alt="images 1" width="100%" />
                    </div>
                </div>
            </>
        )
    }
}

