import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import RemoveAlert from "../../component/alert/removeAlert";

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            daftarEQ: [
                {
                    id: 1,
                    noEQ: '71221',
                    namaModel: 'CobaInsert',
                    keterangan: 'CobaInsert',
                    imgEQ: 'images/Verified.png',
                    deleted: false,
                },
                {
                    id: 2,
                    noEQ: '300822',
                    namaModel: 'model1',
                    keterangan: 'tes aja',
                    imgEQ: 'images/Verified.png',
                    deleted: false,
                },
                {
                    id: 3,
                    noEQ: '798689',
                    namaModel: 'ApeosPort C2060',
                    keterangan: 'test',
                    deleted: false,
                }
            ],
            showPopup: false,
            itemToDeleted: null,
            // nomorEQToDelete:'',
        };
        this.handlePopup = this.handlePopup.bind(this)
        this.handleCancelDelete = this.handleCancelDelete.bind(this)
    }

    handlePopup() {
        this.setState({showPopup: false})
    }

    setDeletedConfirmation(noEQ) {
        this.setState({nomorEQToDelete: noEQ});
    }

    handleDeletedItem(noEQToDelete) {
        this.setState({showPopup: true, nomorEQToDelete: noEQToDelete});
    }    

    // Di dalam fungsi handleCancelDelete
    handleCancelDelete() {
        this.setState({showPopup: false})
    }

    handleConfirmDelete() {
        const {daftarEQ, nomorEQToDelete} = this.state;

        if(nomorEQToDelete) {
            const updateDaftarEQ = daftarEQ.filter((item) => item.noEQ !== nomorEQToDelete);
            this.setState({daftarEQ: updateDaftarEQ, showPopup: false, nomorEQToDelete: ''});
        }
    }


    // setDeletedConfirmation(itemId) {
    //     const itemToDeleted = this.state.daftarEQ.find(item => item.id === itemId);

    //     if (itemToDeleted) {
    //         this.setState({itemToDeleted: itemId, nomorEQToDelete: itemToDeleted.noEQ});
    //     }
    //     this.setState({itemToDeleted: itemId});
    // }

    // handleDeletedItem(noEQToDelete) {
    //     this.setDeletedConfirmation(noEQToDelete);
    //     const itemsCopy = [...this.state.daftarEQ];

    //     const itemIndex = itemsCopy.findIndex((item) => item.noEQ === noEQToDelete);

    //     if(itemIndex !== -1) {
    //         itemsCopy.splice(itemIndex, 1);
    //     }

    //     this.setState({daftarEQ: itemsCopy, showPopup: true});
    // }

    // handleDeletedItem(itemId) {
    //     this.setDeletedConfirmation(itemId);
    //     const itemsCopy = [...this.state.daftarEQ];

    //     const itemIndex = itemsCopy.findIndex(item => item.id === itemId);

    //     if (itemIndex !== -1) {
    //         itemsCopy[itemIndex] = {...itemsCopy[itemIndex], deleted: true};
    //     }

    //     this.setState({daftarEQ: itemsCopy, showPopup: true}, () => {
    //         this.setState({nomorEQToDelete: ''});
    //     });

    // }

    // handleCancelDelete() {
    //     console.log("BATAL Hapus EQ");
    //     const {daftarEQ, nomorEQToDelete} = this.state;

    //     const updateDaftarEQ = daftarEQ.map((item) =>
    //         item.noEQ === nomorEQToDelete ? {...item, deleted: false} : item
    //     );

    //     this.setState({daftarEQ: updateDaftarEQ, showPopup: false, nomorEQToDelete: ''});
        
    // }

    render () {

        const {daftarEQ, showPopup} = this.state;

        return (
            <>
            <div className="container">
                <div className="container d-flex">
                    <div className="col-6 mb-5">
                        <span className="title-icare fw-bold" style={{borderBottom: '3px solid #014C90', width: '110px', fontSize:'18px'}}>Daftar EQ</span>
                    </div>
                    <div className="col-6 row text-end">
                        <div className="col-7">
                            <form class="d-flex" style={{width:'120%'}}>
                                <span> <i class="fa fa-search fa-fw fa-lg" aria-hidden="true"></i> </span>
                                <input class="form-control form-control-sm ml-3 w-100 border-only-bottom" type="text" aria-label="Search" style={{fontSize: '16px', color:'black'}}></input>
                                <button type="reset" className="btn border-0" style={{background:'none'}}><i className="fa fa-close fa-fw fa-lg" style={{cursor:'pointer'}}></i></button>
                                {/* <input type="reset" class="btn btn-success" value="Reset Button"></input> */}
                            </form>
                        </div>
                        <div className="col-5">
                            <Link to="/form_eq">
                                <button className="btn btn-login" style={{padding: '8px 23px', fontSize: '16px'}}><i className="fa fa-plus" style={{marginRight: '5px'}}></i> Tambah EQ</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="card shadow border-0 px-4 py-4 pb-0" style={{borderRadius:'20px'}}>
                    <div className="card-body">
                        <div className="row">
                            {
                                this.state.daftarEQ.map((value, key) => (
                                    !value.deleted && (
                                    <div className="card-eq d-flex mb-5" key={value.id} style={{borderRadius:'10px', boxShadow:'1px 1px 2px 2px #bfbfbf'}}>
                                        <div className="col-9 px-2 pt-0">
                                            <p className="mb-0 mt-2 fw-bold" style={{fontSize:'15px'}}>{value.noEQ}</p>
                                            <p className="title-icare fw-bold mb-0" style={{fontSize:'15px'}}>{value.namaModel}</p>
                                            <p className="fw-bold" style={{fontSize:'14px'}}>{value.keterangan}</p>
                                        </div>
                                        <div className="col-5 px-5 d-flex mb-2 py-2">
                                            <div className="col-2">
                                                <Link className="text-decoration-none" to="/form_eq"><h6 className="text title-icare" style={{marginTop:'70px', fontWeight: 'bold'}}>Ubah</h6></Link>
                                            </div>
                                            <div className="col-3">
                                                {value.imgEQ && (
                                                    <img src={value.imgEQ} style={{height:'70px'}} alt="Image"></img>
                                                )}
                                            </div>
                                            <div className="col-2">
                                                <button className="title-icare fw-bold" style={{background:'none', border:'none', marginTop:'70px'}} onClick={() => this.handleDeletedItem(value.noEQ)}>Hapus</button>
                                            </div>
                                        </div>
                                    </div>
                                )))
                            }
                        </div>
                        {showPopup && (
                            <RemoveAlert visible={this.state.showPopup} message={`Hapus EQ: ${this.state.nomorEQToDelete}`} customClass="col-sm-3" onCancel={this.handleCancelDelete} onClick={() => {this.handleConfirmDelete(); }} />
                        )}


                    </div>
                </div>
                {/* <div className="container">
                    <div className="card shadow border-0" style={{borderRadius:'20px'}}>
                        <div className="card-body">
                            <div className="row p-3">
                                <div className="col">
                                    <div className="card border-0" style={{borderRadius:'10px', boxShadow:'1px 1px 3px 3px #bfbfbf'}}>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <span className="text" style={{fontSize:'13px', fontWeight:'bold'}}>71221</span>
                                                        </div>
                                                        <div className="col-12">
                                                            <span className="text" style={{color:'blue', fontSize:'15px', fontWeight:'bold'}}>CobaInsert</span>
                                                        </div>
                                                        <div className="col-12">
                                                            <span className="text" style={{fontSize:'13px', fontWeight:'bold'}}>CobaInsert</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-md-auto">
                                                    <Link className="text-decoration-none" to="/form-eq"><h6 className="text title-icare" style={{marginTop:'70px', fontWeight: 'bold'}}>Ubah</h6></Link>
                                                </div>
                                                <div className="col-md-auto">
                                                    <img src="images/Verified.png" style={{height:'70px'}}></img>
                                                </div>
                                                <div className="col-md-auto">
                                                <h6 className="text title-icare" style={{marginTop:'70px', fontWeight: 'bold'}}>Hapus</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row p-3">
                                <div className="col">
                                    <div className="card border-0 mt-2" style={{borderRadius:'10px', boxShadow:'1px 1px 3px 3px #bfbfbf'}}>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <span className="text" style={{fontSize:'13px', fontWeight:'bold'}}>300822</span>
                                                        </div>
                                                        <div className="col-12">
                                                            <span className="text" style={{color:'blue', fontSize:'15px', fontWeight:'bold'}}>model1</span>
                                                        </div>
                                                        <div className="col-12">
                                                            <span className="text" style={{fontSize:'13px', fontWeight:'bold'}}>tes aja</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-auto">
                                                <Link className="text-decoration-none" to="/form-eq"><h6 className="text title-icare" style={{marginTop:'70px', fontWeight: 'bold'}}>Ubah</h6></Link>
                                                </div>
                                                <div className="col-md-auto">
                                                <img src="images/Verified.png" style={{height:'70px'}}></img>
                                                </div>
                                                <div className="col-md-auto">
                                                <h6 className="text title-icare" style={{marginTop:'70px', fontWeight: 'bold'}}>Hapus</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row p-3">
                                <div className="col">
                                    <div className="card border-0 mt-2 mb-3" style={{borderRadius:'10px', boxShadow:'1px 1px 3px 3px #bfbfbf'}}>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <span className="text" style={{fontSize:'13px', fontWeight:'bold'}}>798689</span>
                                                        </div>
                                                        <div className="col-12">
                                                            <span className="text" style={{color:'blue', fontSize:'15px', fontWeight:'bold'}}>ApeosPort C2060</span>
                                                        </div>
                                                        <div className="col-12">
                                                            <span className="text" style={{fontSize:'13px', fontWeight:'bold'}}>test</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-auto">
                                                <Link className="text-decoration-none" to="/form-eq"><h6 className="text title-icare" style={{marginTop:'70px', fontWeight: 'bold'}}>Ubah</h6></Link>
                                                </div>
                                                <div className="col-md-auto" style={{marginRight:'70px'}}>
                                                    <img src="images/approved.png"></img>
                                                </div>
                                                <div className="col-md-auto">
                                                <h6 className="text title-icare" style={{marginTop:'70px', fontWeight: 'bold'}}>Hapus</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
            </>
        )
    }
}