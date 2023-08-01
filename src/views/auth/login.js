import { Component } from "react";
import Navbar from "../../component/navbar";
import FormInput from "./../../component/form/input"


export default class extends Component {
    render() {
        return(
            <>
                <div className="col-md-4 col-sm-7 col-xs-10 col-12 my-5 mx-auto">
                    <div className="card shadow-sm rounded">
                        <div className="card-body">
                            <div className="col-12 text-center my-3">
                                <img src="/images/iCareLogo.png" alt="Logo iCare" height="50" />
                            </div>
                            <form>
                                <div className="mb-3">
                                    <label className="text-primary">EMAIL</label>
                                    <input type="text" className="form-control border-only-bottom"/>
                                </div>
                                <div className="mb-3">
                                    <label className="text-primary">PASSWORD</label>
                                    <input type="password" className="form-control border-only-bottom" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

