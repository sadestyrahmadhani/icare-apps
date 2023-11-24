import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getCollectMeterById, getImageCollectMeter } from "../../services/API";
import LoadingAlert from "../../component/alert/loadingAlert";

function DetailHistoryMeter() {
  
  const [dataCollectMeter, setDataCollectMeter] = useState([])
  const [isChecked, setIsChecked] = useState(true)
  const [image, setImage] =  useState(null)
  const [loading, setLoading] = useState(false)
  const { id } = useParams()

  const navigate = useNavigate()
  

  useEffect(() => {
      detailDataCollectMeter()
  }, [id]);

  const detailDataCollectMeter = async () => {
    setLoading(true)
    const res = await getCollectMeterById(id)
    const response = await getImageCollectMeter(id)
    setLoading(false)
    // console.log(res)
    if(res.status == 200 && response.status == 200){
      // console.log('Time : ',response.data)
      setDataCollectMeter(res.data.Table)
      setImage(response.data)
    }
  }

  const handleGoBack = (e) => {
    e.preventDefault()
    navigate("/collect_meter", { 
      state: { selectedTab: "riwayat-meter" },
     })
  }
  
  const previewImage = (e) => {
    const file = e.target;
    if(file.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        document.getElementById("preview-image").src = e.target.result;
      }
      reader.readAsDataURL(file.files[0]);
    }
    document.getElementById("display-image").classList.remove("d-none");
    document.getElementById("display-image").classList.add("d-block");
  }

  return (
    <>
          <div className="responsive-bar">
            <div
              className="d-flex mx-md-auto my-md-2 my-0 default-height"
              style={{ alignItems: "baseline", height: "55px" }}
            >
              <h4 className="title-icare title-fitur m-0 p-0 fw-bold" style={{fontSize: '18px'}}>
                <Link className="nav-link d-inline me-3" onClick={handleGoBack}>
                {/* <Link className="nav-link d-inline me-3" to="/collect_meter"> */}
                  <i
                    className="fa fa-arrow-left color-arrow-left"
                    style={{ color: "#014C90" }}
                  ></i>
                </Link>
              <span
                className="title-bold"
                style={{ borderBottom: "3px solid #014C90" }}
              >
                Riwayat Meter
              </span>
              </h4>

            </div>
          </div>
            {
              dataCollectMeter.map((item, key) => (
            <div className="card px-lg-3 px-1 shadow border-0 responsive-detailriwayatmeter" key={key}>
              <div className="card-body mt-lg-2">
                <div className="mb-2">
                  {/* tabs */}
                  <div className="row">
                    <div
                      className="card-label py-1 "
                      style={{ backgroundColor: "#014C90" }}
                    >
                      <label
                        className="fw-medium"
                        style={{ fontSize: "13px", color: "#fff" }}
                      >
                        Equipment Number
                      </label>
                    </div>
                    <input
                      type="text"
                      className="py-3 mb-2"
                      style={{ border: "1px solid #000" }}
                      value={item.Equipment}
                      disabled
                    />
                   <div
                      className="card-label py-1 "
                      style={{ backgroundColor: "#014C90" }}
                    >
                      <label
                        className="fw-medium"
                        style={{ fontSize: "13px", color: "#fff" }}
                      >
                        Created Date
                      </label>
                    </div>
                    <input
                      type="text"
                      className="py-3 mb-2"
                      style={{ border: "1px solid #000" }}
                      value={item.createDate}
                      disabled
                    />
                    <div className="text-center mt-2">
                      <input
                        type="file"
                        className="d-none"
                        id="input-file"
                        onChange={previewImage}
                        accept="image/*"
                        disabled
                      />
                      <label
                        className="file-icon mb-3 d-block"
                        htmlFor="input-file"
                      >
                        <img
                          className="fs-4 p-2 image-size-capture"
                          src={image}
                          alt="upload image"
                        />
                      </label>
                      <div
                        className="d-none col-md-6 col-sm-8 mx-auto my-5"
                        id="display-image"
                      >
                        <img
                          src="#"
                          alt=""
                          className="w-50"
                          id="preview-image"
                        />
                      </div>
                    </div>

                    {/* input form */}
                    {isChecked && (
                      <div className="card">
                        <div className="card-body col-md-12 col-sm-6 col-12 p-0px">
                          {/* <div className="">
                            <div className=""> */}
                              <div className="check-item d-flex align-items-center mb-2 mt-2">
                                <label style={{fontSize: '14px'}}>Meter 1</label>
                                <input
                                  type="text"
                                  className="py-1 border-only-bottom ms-2"
                                  style={{ fontSize: "14px", width: "92%" }}
                                  value={item.meter1}
                                  disabled
                                />
                              </div>
                              <div className="check-item d-flex align-items-center mb-2">
                                <label style={{fontSize: '14px'}}>Meter 2</label>
                                <input
                                  type="text"
                                  className="py-1 border-only-bottom ms-2"
                                  style={{ fontSize: "14px", width: "92%" }}
                                  value={item.meter2}
                                  disabled
                                />
                              </div>
                              <div className="check-item d-flex align-items-center mb-2">
                                <label style={{fontSize: '14px'}}>Meter 3</label>
                                <input
                                  type="text"
                                  className="py-1 border-only-bottom ms-2"
                                  style={{ fontSize: "14px", width: "92%" }}
                                  value={item.meter3}
                                  disabled
                                />
                              </div>
                              <div className="check-item d-flex align-items-center mb-2">
                                <label style={{fontSize: '14px'}}>Meter 4</label>
                                <input
                                  type="text"
                                  className="py-1 border-only-bottom ms-2"
                                  style={{ fontSize: "14px", width: "92%" }}
                                  value={item.meter4}
                                  disabled
                                />
                              </div>
                            {/* </div>
                          </div> */}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
              ))
            }
        <LoadingAlert visible={loading} customClass="col-md-2 col-8" />
    </>
  )
}

export default DetailHistoryMeter

// export default class extends Component {
//   componentDidMount() {
//     // fetch("https://jsonplaceholder.typicode.com/users")
//     // console.log(`test ${appConfig.BASE_API}/meter/readbyid/5`)
//     // fetch(`${appConfig.BASE_API}/meter/readbyid/5`)
//     //   .then((res) => res.json())
//     //   .then((json) => {
//     //     this.setState({
//     //       items: json,
//     //       DataisLoaded: true,
//     //     });
//     //   });

//     this.init();
//   }

//   async init() {
//     this.setState({
//       DataisLoaded: false,
//     });

    
//     var res = await getCollectMeterById();
//     console.log("res : ", res);


//     var Table = res["Table"];
//     console.log("Table L ", Table);
//     // console.log("Capture", Table[0].Capture);

//     this.setState({
//       DataisLoaded: true,
//       dataCollectMeter: Table,
//     });
//     console.log("dataCollectMeter L ", this.state.dataCollectMeter);
//   }

//   previewImage(e) {
//     const file = e.target;
//     if (file.files[0]) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         document.getElementById("preview-image").src = e.target.result;
//       };
//       reader.readAsDataURL(file.files[0]);
//     }
//     document.getElementById("display-image").classList.remove("d-none");
//     document.getElementById("display-image").classList.add("d-block");
//   }

//   constructor(props) {
//     super(props);
//     this.state = {
//       // checkBoxCheckCount: 0
//       dataCollectMeter: [],
//       isChecked: true,
//       Image: getGambarRiwayatFoto()
      
//     };
//     this.checkCheckBox = this.checkCheckBox.bind(this);
//   }

//   toggleVisibility = () => {
//     this.setState((prevState) => ({
//       isChecked: !prevState.isChecked,
//     }));
//   };

//   checkCheckBox() {
//     var checkbox = document.querySelectorAll(".problem-checkbox:checked");
//     this.setState({ checkBoxCheckCount: checkbox.length });
//   }

//   render() {
//     const { isChecked,Image } = this.state;
//     const { DataisLoaded } = this.state;
//     if (!DataisLoaded)
//       return (
//         <div>
//           <h1></h1>{" "}
//         </div>
//       );

//     return (
//       <>
//         {this.state.dataCollectMeter.map((item) => (
//           <div className="container-fluid py-3">
//             <div
//               key={item.id}
//               className="d-flex mb-4"
//               style={{ alignItems: "baseline", height: "40px" }}
//             >
//               <Link className="list-items" to="/collect_meter">
//                 <i
//                   className="fa fa-arrow-left me-3"
//                   style={{ fontSize: "16px", color: "#014C90" }}
//                 ></i>
//               </Link>

//               <span
//                 className="title-icare fw-bold py-1"
//                 style={{ borderBottom: "3px solid #014C90", fontSize: "18px" }}
//               >
//                 Riwayat Meter
//               </span>
//             </div>
//             <div className="card px-3 shadow border-0">
//               <div className="card-body">
//                 <div className="row mb-2">
//                   {/* tabs */}
//                   <div className="row">
//                     <div
//                       className="card-label py-1 "
//                       style={{ backgroundColor: "#014C90" }}
//                     >
//                       <label
//                         className="fw-medium"
//                         style={{ fontSize: "13px", color: "#fff" }}
//                       >
//                         Equipment Number
//                       </label>
//                     </div>
//                     <input
//                       type="text"
//                       className="py-3 mb-2"
//                       style={{ border: "1px solid #000" }}
//                       value={item.Equipment}
//                       disabled
//                     />
//                    <div
//                       className="card-label py-1 "
//                       style={{ backgroundColor: "#014C90" }}
//                     >
//                       <label
//                         className="fw-medium"
//                         style={{ fontSize: "13px", color: "#fff" }}
//                       >
//                         Created Date
//                       </label>
//                     </div>
//                     <input
//                       type="text"
//                       className="py-3 mb-2"
//                       style={{ border: "1px solid #000" }}
//                       value={item.createDate}
//                       disabled
//                     />
//                     <div className="text-center mt-2">
//                       {/* <p className="text-decoration-underline fw-medium fst-italic text-center mt-3" style={{ fontSize: '13px', color: 'pink' }}>Please upload photo meter on machine</p> */}
//                       <input
//                         type="file"
//                         className="d-none"
//                         id="input-file"
//                         onChange={this.previewImage}
//                         accept="image/*"
//                       />
//                       <label
//                         className="file-icon mb-3 d-block"
//                         htmlFor="input-file"
//                       >
//                         <img
//                           className="fs-4  p-2"
//                           src={`data:image/png;base64,${this.state.Image}`}
//                           alt="upload image"
//                         />
//                       </label>
//                       <div
//                         className="d-none col-md-6 col-sm-8 mx-auto my-5"
//                         id="display-image"
//                       >
//                         <img
//                           src="#"
//                           alt=""
//                           className="w-50"
//                           id="preview-image"
//                         />
//                       </div>
//                     </div>

//                     {/* <hr className="mt-5 mb-5" /> */}
//                     {/* <div className="text-center align-items-center" style={{ fontSize: '15px' }}>
//                                                   <span className="me-2">Apakah anda bersedia input meter manual? </span>
          
//                                                   <input
//                                                       type="checkbox"
//                                                       checked={isChecked}
//                                                       onChange={this.toggleVisibility}
//                                                   />
          
//                                               </div> */}

//                     {/* input form */}
//                     {isChecked && (
//                       <div>
//                         <div class="card card-body col-md-12 col-sm-6 col-12 mb-4 mt-4">
//                           <div className="px-2 py-3">
//                             <div className="col ">
//                               <div className="check-item d-flex align-items-center mb-2 mt-2 ">
//                                 <label>Meter 1</label>
//                                 <input
//                                   type="text"
//                                   className="py-1 border-only-bottom ms-2"
//                                   style={{ fontSize: "12px", width: "92%" }}
//                                   value={item.meter1}
//                                   disabled
//                                 />
//                                 {/* <input type="text" className="py-1 border-only-bottom ms-2" disabled={this.state.checkBoxCheckCount == 0} style={{ fontSize: '14px', width: '92%' }} /> */}
//                               </div>
//                               <div className="check-item d-flex align-items-center mb-2">
//                                 <label>Meter 2</label>
//                                 <input
//                                   type="text"
//                                   className="py-1 border-only-bottom ms-2"
//                                   style={{ fontSize: "12px", width: "92%" }}
//                                   value={item.meter2}
//                                   disabled
//                                 />
//                               </div>
//                               <div className="check-item d-flex align-items-center mb-2">
//                                 <label>Meter 3</label>
//                                 <input
//                                   type="text"
//                                   className="py-1 border-only-bottom ms-2"
//                                   style={{ fontSize: "12px", width: "92%" }}
//                                   value={item.meter3}
//                                   disabled
//                                 />
//                               </div>
//                               <div className="check-item d-flex align-items-center mb-2">
//                                 <label>Meter 4</label>
//                                 <input
//                                   type="text"
//                                   className="py-1 border-only-bottom ms-2"
//                                   style={{ fontSize: "12px", width: "92%" }}
//                                   value={item.meter4}
//                                   disabled
//                                 />
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     )}

//                     {/* <div className="col text-center mt-5">
//                                                   <button className="btn btn-login py-2 px-3" style={{ fontSize: '14px', width: '10%' }}>Submit</button>
//                                               </div> */}
//                   </div>

//                   {/* <div className="navbar navbar-exspand-lg mb-4">
//                                           <ul className="navbar-nav">
//                                               <li className="nav-item">
//                                                   <Link className="btn-proses py-3 px-4 text-center fw-medium">FOTO METER</Link>
//                                               </li>
//                                               <li className="nev-item">
//                                                   <Link className="btn-proses py-3 px-4 text-center fw-medium">RIWAYAT FOTO</Link>
//                                               </li>
//                                           </ul>
//                                       </div> */}
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </>
//     );
//   }
// }
