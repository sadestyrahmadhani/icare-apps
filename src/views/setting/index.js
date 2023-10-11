import React from "react";
import { Link } from "react-router-dom";
import { Card, Row, Col } from "react-bootstrap";
import {auth} from '../../services/auth'
function Setting() {
    const logout = () => {
        console.log('logout')
        auth.logout()
    }
    
        return (
            <div className="intro-y">
                <div className="responsive-bar py-3" style={{ fontSize: 20 }}>
                    <Link to="/dashboard" className="nav-link">
                        <i className="fa fa-arrow-left me-4"></i>
                        <span>Pengaturan</span>
                    </Link>
                </div>
                <div className="py-3 mx-2">
                    <Link to="/data_diri" className="nav-link">
                        <Card className="mb-2 shadow-sm">
                            <Card.Body className="p-2" style={{ fontSize: 11 }}>
                                <Row>
                                    <Col xs="8">
                                        <span>Data Diri</span>
                                    </Col>
                                    <Col xs="4" className="text-end">
                                        <i className="fa fa-chevron-right"></i>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Link>
                    <Link to="/daftar_alamat" className="nav-link">
                        <Card className="mb-2 shadow-sm">
                            <Card.Body className="p-2" style={{ fontSize: 11 }}>
                                <Row>
                                    <Col xs="8">
                                        <span>Daftar Alamat</span>
                                    </Col>
                                    <Col xs="4" className="text-end">
                                        <i className="fa fa-chevron-right"></i>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Link>
                    <Link to="/daftar_eq" className="nav-link">
                        <Card className="mb-2 shadow-sm">
                            <Card.Body className="p-2" style={{ fontSize: 11 }}>
                                <Row>
                                    <Col xs="8">
                                        <span>Daftar EQ</span>
                                    </Col>
                                    <Col xs="4" className="text-end">
                                        <i className="fa fa-chevron-right"></i>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Link>
                    <Link to="/ubah_kata_sandi" className="nav-link">
                        <Card className="mb-2 shadow-sm">
                            <Card.Body className="p-2" style={{ fontSize: 11 }}>
                                <Row>
                                    <Col xs="8">
                                        <span>Kata Sandi</span>
                                    </Col>
                                    <Col xs="4" className="text-end">
                                        <i className="fa fa-chevron-right"></i>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Link>
                    <div className="nav-link" onClick={logout}>
                        <Card className="mb-2 shadow-sm">
                            <Card.Body className="p-2" style={{ fontSize: 11 }}>
                                <Row>
                                    <Col xs="8">
                                        <span>Keluar</span>
                                    </Col>
                                    <Col xs="4" className="text-end">
                                        <i className="fa fa-chevron-right"></i>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 20, fontSize: 14 }} className="text-center text-primary fw-bold">
                    Version 3.0.6
                </div>
            </div>
        )
    
}
export default Setting