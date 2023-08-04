import { Component } from "react";

export default class extends Component {
    render() {
        return(
            <>
                <div className="container">
                    <div className="card-title text-center mx-auto my-3" style={{borderBottom:'3px solid #014C90', width:'125px'}}>
                        <h4 className="title-icare" style={{fontSize:'16px'}}>Registrasi</h4>
                    </div>
                    <div className="card p-5">
                        <div className="row justify-content-center">
                            <div className="col-lg-4 col-md-6 col-12">
                                <form>
                                    <div className="mb-3">
                                        <label className="size-10px fw-medium">Email Address</label>
                                        <input type="text" className="form-control  border-only-bottom" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="size-10px fw-medium">Mobile Phone Number</label>
                                        <input type="text" className="form-control border-only-bottom" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="size-10px fw-medium">Password</label>
                                        <input type="password" className="form-control border-only-bottom" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="size-10px fw-medium">Re-enter Password</label>
                                        <input type="password" className="form-control border-only-bottom" />
                                    </div>
                                </form>
                            </div>
                            <div className="col-lg-4 col-md-6 col-12 ">
                                <form>
                                    <div className="mb-3">
                                        <label className="size-10px fw-medium">Nama Lengkap</label>
                                        <input type="text" className="form-control border-only-bottom" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="size-10px fw-medium">Nama Perusahaan / Instansi</label>
                                        <input type="text" className="form-control border-only-bottom" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="size-10px fw-medium">Nomor Equipment</label>
                                        <input type="password" className="form-control border-only-bottom" />
                                    </div>
                                    <div className="mb-5">
                                        <label className="size-10px fw-medium">Foto Sticker Equipment</label>
                                        <input type="password" className="form-control border-only-bottom" />
                                    </div>
                                </form>
                            </div>
                            <button className="btn btn-login py-1">SUBMIT</button>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}