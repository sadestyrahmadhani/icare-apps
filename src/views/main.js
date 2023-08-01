import { Component } from "react";
import { Outlet } from "react-router-dom";

export default class extends Component {
    render() {
        return(
            <>
                <h1> Layout { this.props?.Layer  ?? 'Unset Layer'}</h1>
                <br/>
                <Outlet />
            </>
        )
    }
}