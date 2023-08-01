import { Component } from "react";

export default class extends Component {
    render() {
        return(
            <>
                <label> { this.props.label } </label> <br/>
                <input
                    type={ this.props.type }
                    name={ this.props.name }
                    className={ this.props.className + "form-control" }
                    placeholder={ this.props.label }
                />
            </>
        )
    }
}