import { Component } from "react";
import Navbar from "../../component/navbar";
import FormInput from "./../../component/form/input"


export default class extends Component {
    render() {
        return(
            <>
                <Navbar></Navbar>   

                <div className="card mx-auto col-md-4 col-sm-8 col-xs-12">
                    <div className="card-logo mx-auto">
                        <img src="/images/iCareLogo.png" alt="Logo"/>
                    </div>
                    <div className="card-body mx-auto">
                        <form onSubmit={ this.submit }> 
                            <FormInput 
                                type="text"
                                name="Username"
                                label="username"
                            /><br/>
                            <FormInput
                                type="password"
                                name="Passowrd"
                                label="password"
                            /><br/>
                            <button>Login</button>
                        </form>
                    </div>
                </div> 
            </>
        )
    }
}