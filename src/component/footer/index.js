import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class extends React.Component {
    render () {
        return (
        <>
            <footer className="footer bg-light p-3">
                <div className="col">
                    <ul>
                        <li>
                            <Link to="">Bantuan dan Panduan</Link>
                        </li>
                        <li>
                            <Link to="">Kebijakan Privasi</Link>
                        </li>
                        <li>
                            <Link to="">Tentang iCare</Link>
                        </li>
                        <li>
                            <Link to="">Astra Graphia Contact Center</Link>
                        </li>
                    </ul>
                </div>
            </footer>
        </>
        )
    }
}