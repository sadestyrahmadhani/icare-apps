import { Component } from "react";
import { Link } from "react-router-dom";

function NewsProduct(){
    return (
        <>
            <div className="py-lg-3 py-md-3">
                <div className="responsive-bar p-15px" style={{alignItems: 'baseline', height: '55px'}}>
                    <Link to="/dashboard" className="list-items">
                        <i className="fa fa-arrow-left me-3" style={{fontSize: '18px', color: '#014C90'}}></i>
                    </Link>
                </div>
                <div className="responsive-news card px-md-4 px-1 shadow">
                    <div className="card-body">
                        <div className="row">
                            <div className="mb-3 mt-1 d-lg-none d-md-none">
                                <img src="images/iCareLogo.png" alt="" style={{width: '30%'}}/>
                            </div>
                            <div className="fw-bold mb-3">
                                <h5 className="title-icare fw-bold">Apeos 7580 / 6580</h5>
                                <span style={{fontSize: '14px'}}>2023-09-15 10:00:00</span>
                            </div>
                            <div className="mb-4">
                                <img src="images/apeos7580-6580.png" alt="" style={{maxWidth: 'inherit'}}/>
                            </div>
                            <div className="mb-2">
                                <h5 className="fw-bold"><em>Reliable High Volume Printing with Accelerated Workflows</em></h5>
                                <p>Performa tinggi untuk efisiensi kerja yang lebih baik didukung dengan sistem pengoprasian yang cepat dan sederhana serta melindungi informasi penting dengan sistem pendukung yang handal.</p>
                            </div>
                            <div className="mb-3">
                                <h6 className="fw-bold">Kecepatan Cetak:</h6>
                                <p>65 lembar per menit</p>
                            </div>
                            <div className="mb-3">
                                <h5 className="fw-bold">Spesifikasi</h5>
                                <table class="table table-width border-only-bottom" style={{maxWidth: '50%'}}>
                                    <tbody>
                                      <tr>
                                        <th scope="row">Color Capability</th>
                                        <td>Monochrome</td>
                                      </tr>
                                      <tr>
                                        <th scope="row">Print Speed</th>
                                        <td>Over 56 ppm</td>
                                      </tr>
                                      <tr>
                                        <th scope="row">Paper Size</th>
                                        <td>Up to A3</td>
                                      </tr>
                                      <tr>
                                        <th scope="row">Monthly Print Volume</th>
                                        <td>25100 - 35000</td>
                                      </tr>
                                      <tr>
                                        <th scope="row">Feature</th>
                                        <td>Duplex</td>
                                      </tr>
                                      <tr>
                                        <th scope="row">Product Family</th>
                                        <td>Apeos</td>
                                      </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="mb-5 bottom-position">
                                <button className="btn btn-login me-2 bottom-news" style={{padding: '10px', width: '20%'}}><i className="fa fa-file-pdf-o fa-lg me-2"></i>Unduh PDF</button>
                                <button className="btn btn-login bottom-news" style={{padding: '10px', width: '22%'}}><i className="fa fa-external-link fa-lg me-2"></i>Tautan Driver</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewsProduct