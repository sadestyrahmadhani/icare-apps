import React, { useState } from "react";
import { Component } from "react";
import ConfirmAlert from "../../component/alert/confirmAlert";
import { updateDataDiriById } from "../../services/API";
import LoadingAlert from "../../component/alert/loadingAlert";
import { Link, useNavigate } from "react-router-dom";


function DataDiri() {
  const [ isEditName, setIsEditName ] = useState(false)
  const [ isEditPhone, setIsEditPhone ] = useState(false)
  const [ showSuccessPopup, setShowSuccessPopup ] = useState(false)
  const [ showErrorPopup, setShowErrorPopup ] = useState(false)
  const [ loading, setLoading ] = useState(false)
  const [ name, setName ] = useState(localStorage.getItem('username'))
  const [ email, setEmail ] = useState(localStorage.getItem('emailaddress'))
  const [ phone, setPhone ] = useState(localStorage.getItem('telp'))
  const [ instansi, setInstansi ] = useState(localStorage.getItem('namaperusahaan'))
  const [ dataName, setDataName ] = useState('')
  const [ dataPhone, setDataPhone ] = useState('')
  const [ errorDataName, setErrorDataName ] = useState('')
  const [ errorDataPhone, setErrorDataPhone ] = useState('')
  const [ dataCollectMeter, setDataCollectMeter ] = useState([])
  const [ dataDiri, setDataDiri ] = useState([])
  const [ errorMessage, setErrorMessage ] = useState('')

  const navigate = useNavigate()


  const handlePopup = () => {
    setShowSuccessPopup(false)
    setShowErrorPopup(false)
  }

  const handleEditName = () => {
    setIsEditName(true)
  }

  const handleEditPhone = () => {
    setIsEditPhone(true)
  }

  const handleChangeName = (event) => {
    const value = event.target.value;
    if(value === "") {
      setName(event.target.value)
      setErrorDataName('Silahkan isi nama')
    } else {
      setName(event.target.value)
      setErrorDataName('')
    }
  }

  const handleChangePhone = (event) => {
    if(event.target.value.charAt(0) === '0') {
      setPhone(`+62${event.target.value.substring(1)}`)
    } else {
      if(event.target.value.charAt(0) === '+') {
        setPhone(event.target.value)
      } else {
        setPhone(`+${event.target.value}`)
      }
    }

    const value = event.target.value;
    if(value === "") {
      setPhone(event.target.value)
      setErrorDataPhone('Silahkan isi nomor telepon')
      return
    } else {
      setPhone(event.target.value)
      setErrorDataPhone('')
      return
    }
  }

  const handleSubmitName = () => {
    setIsEditName(false)
  }

  const handleSubmitPhone = () => {
    setIsEditPhone(false)
  };

  async function submit(e) {
    e.preventDefault();

    let isValid = true;
    setShowSuccessPopup(false)
    setShowErrorPopup(false)

    if (name === "") {
      setErrorDataName('Silahkan isi nama')
      isValid = false;
    } else {
      setErrorDataName('')
    }

    if (phone === "") {
      setErrorDataPhone('Silahkan isi nomor telepon')
      isValid = false;
    } else {
      setErrorDataPhone('')
    }

    if (isValid) { 
      setLoading(true)
      const res = await updateDataDiriById({namalengkap: name, emailaddress: email, telp: phone.toString().trim(), namaperusahaan: instansi})
      setLoading(false)
      if(res.status == 200 && res.data !== null) {
        if(!res.data.includes('action')) {
          if(res.data !== 'Nomer telepon sudah terdaftar') {
            setShowSuccessPopup(true)
          } else {
            setShowErrorPopup(true)
            setErrorMessage(res.data)
          }
        } else {
          var data = JSON.parse(res.data)
          navigate(`/kode-otp/${window.btoa(JSON.stringify({...data, email: email, telp: phone.toString().trim(), name: name}))}`)
        }
      } else {
        setShowErrorPopup(true)
      } 
    } else {
      setShowErrorPopup(true)
    }
  }

  return(
    <>
        {dataDiri.map((item) => (
            <h5>{item.username}</h5>
        ))}


        <div className="input-mobile">
          <div className="responsive-bar">
            <div className="card-title mb-md-4 m-0 p-0">
              <h4 className="title-icare title-fitur m-0 p-0 fw-bold" style={{fontSize: '18px'}}>
                <Link to="/settings" className="nav-link d-inline d-md-none me-3">
                  <i className="fa fa-arrow-left"></i>
                </Link>
                Data Diri
              </h4>
              {/* <strong
                className="title-icare"
                style={{ fontSize: 18, borderBottom: "3px solid #014C90" }}
              >
                {" "}
                Data Diri{" "}
              </strong> */}
            </div>
          </div>
          <div className="responsive-data-diri">
            <div className="card px-3 mt-4 shadow border-0" style={{ borderRadius: "20px" }} >
              <div className="card-body p-2">
                <div className="row">
                  
                  <div className="border border-dark mb-4">
                    <div className="row" style={{height:'85px'}}>
                        <div className="card-lable p-md-2 py-2" style={{ backgroundColor: "#014C90" }} >
                          <label className="fw-medium" style={{ fontSize: "13px", color: "white" }} >
                            Nama
                          </label>
                        </div>
                        <div className="card-body d-flex align-items-center mb-4 custom-width" >
                          {isEditName ? (
                            <div className="card-text flex-grow-1">
                              <input type="text" className={`form-control w-100 no-hover ${errorDataName !== "" ? "border-danger border" : "" }`} value={name} onChange={handleChangeName} />
                              
                            </div>
                          ) : (
                            <div className="card-text flex-grow-1 p-2 mt-1 w-100">
                              <h6>{name}</h6>
                            </div>
                          )}
                          <div className="col-md-auto">
                            {isEditName ? (
                              <button className="btn data-diri title-icare fw-bold w-100" onClick={handleSubmitName} style={{fontSize: 14}} >
                                Submit
                              </button>
                            ) : (
                              <button className="btn data-diri title-icare fw-bold w-100" onClick={handleEditName} style={{fontSize: 14}} >
                                Ubah
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <span className={`text-danger small ${ errorDataName !== "" ? "" : "d-none" }`} style={{ fontSize: "12px"}} > {errorDataName} </span>
                        </div>
                      </div>
                  </div>

                  <div className="card-lable p-2" style={{ backgroundColor: "#014C90" }} >
                    <label className="fw-medium" style={{ fontSize: "13px", color: "white" }} >
                      Email
                    </label>
                  </div>
                  <div className="mb-4 p-2" style={{ border: "1px solid black" }} >
                    <h6>{email}</h6>
                  </div>

                  <div className="border border-dark mb-4">
                    <div className="row" style={{height:'85px'}}>
                      <div className="card-lable p-2" style={{ backgroundColor: "#014C90" }} >
                        <label className="fw-medium" style={{ fontSize: "13px", color: "white" }} >
                          No Telepon
                        </label>
                      </div>
                      <div className="card-body d-flex align-items-center mb-4 custom-width" >
                        {isEditPhone ? (
                          <div className="card-text flex-grow-1">
                            <input type="tel" className={`form-control input-data py-2 w-100 no-hover ${errorDataPhone !== "" ? "border-danger border" : ""}`} value={phone} onChange={handleChangePhone} />
                            
                          </div>
                        ) : (
                          <div className="card-text flex-grow-1 p-2 mt-1 w-100">
                            <h6>{phone}</h6>
                          </div>
                        )}
                        <div className="col-md-auto">
                          {isEditPhone ? (
                            <button className="btn data-diri title-icare fw-bold w-100" onClick={handleSubmitPhone} style={{fontSize: 14}}>
                              Submit
                            </button>
                          ) : (
                            <button className="btn data-diri title-icare fw-bold w-100" onClick={handleEditPhone} style={{fontSize: 14}}>
                              Ubah
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                      <span className={`text-danger small ${errorDataPhone !== "" ? "" : "d-none" }`} style={{ fontSize: "12px"}} > {errorDataPhone} </span>
                      </div>
                    </div>
                  </div>

                  <div className="card-lable p-2" style={{ backgroundColor: "#014C90" }} >
                    <label className="fw-medium" style={{ fontSize: "13px", color: "white" }} >
                      Nama Perusahaan/Instansi
                    </label>
                  </div>
                  <div className="mb-4 p-2" style={{ border: "1px solid black" }} >
                    <h6>{instansi}</h6>
                  </div>

                  <div className="col-md-12 text-center d-flex justify-content-center">
                    <button className="btn btn-login py-2 px-5" style={{ fontSize: "12px", maxWidth: "200px" }} onClick={submit} >
                      SUBMIT
                    </button>
                  </div>
                </div>
                <LoadingAlert visible={loading} customClass="col-md-2 col-8" />
                <ConfirmAlert visible={showSuccessPopup} message={`Success update nama : ${name}`} customClass="col-sm-3" onClick={handlePopup}></ConfirmAlert>
                <ConfirmAlert visible={showErrorPopup} titleMessage="Error" message={errorMessage} customClass="col-sm-2" onClick={handlePopup}></ConfirmAlert>
              </div>
            </div>
          </div>
        </div>
      </>
  )
}

export default DataDiri

// export default class extends Component {

//   componentDidMount() {
//     this.init();
//   }

//   async init() {
//     this.setState({
//       DataisLoaded: false,
//     });


//     this.setState({
//       DataisLoaded: true,
//       dataDiri: [],
//     });
//     console.log("dataDiri L ", this.state.dataDiri);
//   }

//   constructor(props) {
//     super(props);
//     this.state = {
//       isEditName: false,
//       isEditPhone: false,
//       showSuccessPopup: false,
//       showErrorPopup: false,
//       loading: false,
//       name: localStorage.getItem('username'),
//       email: localStorage.getItem('emailaddress'),
//       phone: localStorage.getItem('telp'),
//       instansi: localStorage.getItem('namaperusahaan'),
//       dataName: "",
//       dataPhone: "",
//       errorDataName: "",
//       errorDataPhone: "",
//       dataCollectMeter: [],
//       dataDiri: [],
//       errorMessage: "",
//     };
//     this.submit = this.submit.bind(this);
//     this.handlePopup = this.handlePopup.bind(this)
//   }

//   handlePopup() {
//     this.setState({showSuccessPopup:false, showErrorPopup: false})
//   }

//   handleEditName = () => {
//     this.setState({ isEditName: true });
//   };

//   handleEditPhone = () => {
//     this.setState({ isEditPhone: true });
//   };

//   handleChangeName = (event) => {
//     const value = event.target.value;
//     if(value === "") {
//       this.setState({ name: event.target.value, errorDataName: "Silahkan isi nama" });
//     } else {
//       this.setState({ name: event.target.value, errorDataName: "" });
//     }
//   };


//   handleChangePhone = (event) => {
//     if(event.target.value.charAt(0) === '0') {
//       this.setState({phone: `+62${event.target.value.substring(1)}`})
//     } else {
//       if(event.target.value.charAt(0) === '+') {
//         this.setState({phone: event.target.value})
//       } else {
//         this.setState({phone: `+${event.target.value}`})
//       }
//     }

//     const value = event.target.value;
//     if(value === "") {
//       this.setState({ phone: event.target.value, errorDataPhone: "Silahkan isi nomor telepon" });
//       return
//     } else {
//       this.setState({ phone: event.target.value, errorDataPhone: "" });
//       return
//     }
//   };



//   handleSubmitName = () => {
//     this.setState({ isEditName: false });
//   };

//   handleSubmitPhone = () => {
//     this.setState({ isEditPhone: false });
//   };

//   async submit(e) {
//     e.preventDefault();

//     let isValid = true;
//     this.setState({showSuccessPopup: false, showErrorPopup: false})

//     if (this.state.name === "") {
//       this.setState({ errorDataName: "Silahkan isi nama" });
//       isValid = false;
//     } else {
//       this.setState({ errorDataName: "" });
//     }

//     if (this.state.phone === "") {
//       this.setState({ errorDataPhone: "Silahkan isi nomor telepon" });
//       isValid = false;
//     } else {
//       this.setState({ errorDataPhone: "" });
//     }

//     if (isValid) { 
//       this.setState({loading: true})
//       const res = await updateDataDiriById({namalengkap: this.state.name, emailaddress: this.state.email, telp: this.state.phone.toString().trim(), namaperusahaan: this.state.instansi})
//       this.setState({loading: false})
//       if(res.status == 200 && res.data !== null) {
//         if(!res.data.includes('action')) {
//           if(res.data !== 'Nomer telepon sudah terdaftar') {
//             this.setState({ showSuccessPopup: true })
//           } else {
//             this.setState({ showErrorPopup: true, errorMessage: res.data})
//           }
//         } else {
//           var data = JSON.parse(res.data)
//           this.props.router.navigate(`/kode-otp/${window.btoa(JSON.stringify({...data, email: this.state.email, telp: this.state.phone.toString().trim(), name: this.state.name}))}`)
//         }
//       } else {
//         this.setState({showErrorPopup: true})
//       } 
//     } else {
//       this.setState({showErrorPopup: true})
//     }
//   }

//   render() {
//     const { DataisLoaded, items } = this.state;
//     if (!DataisLoaded)
//       return (
//         <div>
//           <h1></h1>{" "}
//         </div>
//       );
//     return (
//       <>
//         {this.state.dataDiri.map((item) => (
//             <h5>{item.username}</h5>
//         ))}


//         <div className="input-mobile">
//           <div className="responsive-bar">
//             <div className="card-title mb-md-4 m-0 p-0">
//               <h4 className="title-icare title-fitur m-0 p-0 fw-bold" style={{fontSize: '18px'}}>
//                 <Link to="/settings" className="nav-link d-inline d-md-none me-3">
//                   <i className="fa fa-arrow-left"></i>
//                 </Link>
//                 Data Diri
//               </h4>
//             </div>
//           </div>
//           <div className="responsive-data-diri">
//             <div className="card px-3 mt-4 shadow border-0" style={{ borderRadius: "20px" }} >
//               <div className="card-body p-2">
//                 <div className="row">
                  
//                   <div className="border border-dark mb-4">
//                     <div className="row" style={{height:'85px'}}>
//                         <div className="card-lable p-md-2 py-2" style={{ backgroundColor: "#014C90" }} >
//                           <label className="fw-medium" style={{ fontSize: "13px", color: "white" }} >
//                             Nama
//                           </label>
//                         </div>
//                         <div className="card-body d-flex align-items-center mb-4 custom-width" >
//                           {this.state.isEditName ? (
//                             <div className="card-text flex-grow-1">
//                               <input type="text" className={`form-control w-100 no-hover ${this.state.errorDataName !== "" ? "border-danger border" : "" }`} value={this.state.name} onChange={this.handleChangeName} />
                              
//                             </div>
//                           ) : (
//                             <div className="card-text flex-grow-1 p-2 mt-1 w-100">
//                               <h6>{this.state.name}</h6>
//                             </div>
//                           )}
//                           <div className="col-md-auto">
//                             {this.state.isEditName ? (
//                               <button className="btn data-diri title-icare fw-bold w-100" onClick={this.handleSubmitName} style={{fontSize: 14}} >
//                                 Submit
//                               </button>
//                             ) : (
//                               <button className="btn data-diri title-icare fw-bold w-100" onClick={this.handleEditName} style={{fontSize: 14}} >
//                                 Ubah
//                               </button>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                       <div className="row">
//                         <div className="col-12">
//                           <span className={`text-danger small ${ this.state.errorDataName !== "" ? "" : "d-none" }`} style={{ fontSize: "12px"}} > {this.state.errorDataName} </span>
//                         </div>
//                       </div>
//                   </div>

//                   <div className="card-lable p-2" style={{ backgroundColor: "#014C90" }} >
//                     <label className="fw-medium" style={{ fontSize: "13px", color: "white" }} >
//                       Email
//                     </label>
//                   </div>
//                   <div className="mb-4 p-2" style={{ border: "1px solid black" }} >
//                     <h6>{this.state.email}</h6>
//                   </div>

//                   <div className="border border-dark mb-4">
//                     <div className="row" style={{height:'85px'}}>
//                       <div className="card-lable p-2" style={{ backgroundColor: "#014C90" }} >
//                         <label className="fw-medium" style={{ fontSize: "13px", color: "white" }} >
//                           No Telepon
//                         </label>
//                       </div>
//                       <div className="card-body d-flex align-items-center mb-4 custom-width" >
//                         {this.state.isEditPhone ? (
//                           <div className="card-text flex-grow-1">
//                             <input type="tel" className={`form-control input-data py-2 w-100 no-hover ${this.state.errorDataPhone !== "" ? "border-danger border" : ""}`} value={this.state.phone} onChange={this.handleChangePhone} />
                            
//                           </div>
//                         ) : (
//                           <div className="card-text flex-grow-1 p-2 mt-1 w-100">
//                             <h6>{this.state.phone}</h6>
//                           </div>
//                         )}
//                         <div className="col-md-auto">
//                           {this.state.isEditPhone ? (
//                             <button className="btn data-diri title-icare fw-bold w-100" onClick={this.handleSubmitPhone} style={{fontSize: 14}}>
//                               Submit
//                             </button>
//                           ) : (
//                             <button className="btn data-diri title-icare fw-bold w-100" onClick={this.handleEditPhone} style={{fontSize: 14}}>
//                               Ubah
//                             </button>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                     <div className="row">
//                       <div className="col-12">
//                       <span className={`text-danger small ${this.state.errorDataPhone !== "" ? "" : "d-none" }`} style={{ fontSize: "12px"}} > {this.state.errorDataPhone} </span>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="card-lable p-2" style={{ backgroundColor: "#014C90" }} >
//                     <label className="fw-medium" style={{ fontSize: "13px", color: "white" }} >
//                       Nama Perusahaan/Instansi
//                     </label>
//                   </div>
//                   <div className="mb-4 p-2" style={{ border: "1px solid black" }} >
//                     <h6>{this.state.instansi}</h6>
//                   </div>

//                   <div className="col-md-12 text-center d-flex justify-content-center">
//                     <button className="btn btn-login py-2 px-5" style={{ fontSize: "12px", maxWidth: "200px" }} onClick={this.submit} >
//                       SUBMIT
//                     </button>
//                   </div>
//                 </div>
//                 <LoadingAlert visible={this.state.loading} customClass="col-md-2 col-8" />
//                 <ConfirmAlert visible={this.state.showSuccessPopup} message={`Success update nama : ${this.state.name}`} customClass="col-sm-3" onClick={this.handlePopup}></ConfirmAlert>
//                 <ConfirmAlert visible={this.state.showErrorPopup} titleMessage="Error" message={this.state.errorMessage} customClass="col-sm-2" onClick={this.handlePopup}></ConfirmAlert>
//               </div>
//             </div>
//           </div>
//         </div>
//       </>
//     );
//   }
// }
