import React, { useState } from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import { appConfig } from "../../config";
import { getCollectMeterById } from "../../services/API";
import ConfirmAlert from "../../component/alert/confirmAlert";

function CollectMeter() {
  const [DataisLoaded, setDataisLoaded] = useState(false)
  const [dataCollectMeter, setDataCollectMeter] = useState([])
  const [showPopup, setShowPopup] = useState(false)
  const [alertOption, setAlertOption] = useState({ title: '', message: '' })
  const [equipmentNumber, setEquipmentNumber] = useState()
  const [isChecked, setIsChecked] = useState(false)
  const [photoMeter, setPhotoMeter] = useState('')
  const [checkBoxCheckCount, setCheckBoxCheckCount] = useState()

  const [errorEquipmentNumber, setErrorEquipmentNumber] = useState('')

  const componentDidMount = () => {
    init()
  }

  async function init() {
    setDataisLoaded(false)

    var res = await getCollectMeterById();
    var Table = res["Table"]

    setDataisLoaded(true)
    setDataCollectMeter(Table)

    console.log("dataCollcetMeter L ", dataCollectMeter)
  }

  const previewImage = (e) => {
    const file = e.target;
    if (file.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        document.getElementById("preview-image").src = e.target.result;
      }
      reader.readAsDataURL(file.files[0]);
    }
    document.getElementById("display-image").classList.remove("d-none")
    document.getElementById("display-image").classList.add("d-block")
  }

  const toggleVisibility = () => {
    setIsChecked((prevState) => !prevState)
  }

  const checkCheckBox = () => {
    var checkbox = document.querySelectorAll(".problem-checkbox:checked")
    setCheckBoxCheckCount(checkbox.length)
  }

  const handlePopup = () => {
    setShowPopup(false)
  }

  const validationEquipmentNumber = (e) => {
    e.preventDefault()
    setEquipmentNumber(e.target.value);
    if (equipmentNumber !== "") {
      setErrorEquipmentNumber('')
    }
  }

  async function submit(e) {
    e.preventDefault()
    // if(equipmentNumber === ""){
    //   setErrorEquipmentNumber("Silahkan isi equipment number")
    // }

    setShowPopup(true)
    if (equipmentNumber !== "") {
      setAlertOption({ title: 'Berhasil', message: 'Berhasil melakukan Collect Meter' })
    } else {
      setAlertOption({ title: 'Error', message: 'Pilih Equipment' })
    }
  }

  return (
    <>

    </>
  )
}

export default class extends Component {
  componentDidMount() {
    // fetch("https://jsonplaceholder.typicode.com/users")
    // console.log(`test ${appConfig.BASE_API}/meter/readbyid/5`)
    // fetch(`${appConfig.BASE_API}/meter/readbyid/5`)
    //   .then((res) => res.json())
    //   .then((json) => {
    //     this.setState({
    //       items: json,
    //       DataisLoaded: true,
    //     });
    //   });

    this.init();
  }

  async init() {
    this.setState({
      DataisLoaded: false,
    });

    var res = await getCollectMeterById();
    console.log("res : ", res);

    var Table = res["Table"];
    // console.log("Table L ", Table);

    this.setState({
      DataisLoaded: true,
      dataCollectMeter: Table,
    });
    console.log("dataCollectMeter L ", this.state.dataCollectMeter);
  }

  previewImage(e) {
    const file = e.target;
    if (file.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        document.getElementById("preview-image").src = e.target.result;
      };
      reader.readAsDataURL(file.files[0]);
    }
    document.getElementById("display-image").classList.remove("d-none");
    document.getElementById("display-image").classList.add("d-block");
  }

  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this)
    this.validationEquipmentNumber = this.validationEquipmentNumber.bind(this)
    this.handlePopup = this.handlePopup.bind(this)
    this.checkCheckBox = this.checkCheckBox.bind(this)
    this.handleInputFile = this.handleInputFile.bind(this)
    this.state = {
      showPopup: false,
      alertOption: {
        title: '',
        message: ''
      },
      equipmentNumber: '',
      errorEquipmentNumber: '',
      // checkBoxCheckCount: 0
      dataCollectMeter: [],
      isChecked: false,
      photoMeter: ''
    };

  }

  toggleVisibility = () => {
    this.setState((prevState) => ({
      isChecked: !prevState.isChecked,
    }));
  };

  checkCheckBox() {
    var checkbox = document.querySelectorAll(".problem-checkbox:checked");
    this.setState({ checkBoxCheckCount: checkbox.length });
  }

  handlePopup() {
    this.setState({ showPopup: false })
  }

  validationEquipmentNumber(e) {
    e.preventDefault()
    this.setState({ equipmentNumber: e.target.value })
    if (this.state.equipmentNumber !== "") this.setState({ errorEquipmentNumber: '' })
  }

  submit(e) {
    e.preventDefault()
    if (this.state.equipmentNumber === "") this.setState({ errorEquipmentNumber: "Silahkan isi equipment number" })
    if (this.state.equipmentNumber !== "") {
      this.setState({ showPopup: true, alertOption: { title: 'Error', message: 'Berhasil melakukan Collect Meter' } })
    } else {
      this.setState({ showPopup: true, alertOption: { title: 'Error', message: 'Pilih Equipment' } })
    }
  }


  render() {
    const { isChecked } = this.state;

    const { DataisLoaded, items } = this.state;
    if (!DataisLoaded)
      return (
        <div>
          <h1></h1>{" "}
        </div>
      );

    // const { DataisLoaded, items } = this.state;
    // if (!DataisLoaded)
    //   return (
    //     <div>
    //       <h1> Pleses wait some time.... </h1>{" "}
    //     </div>
    //   );

    return (
      <>
        {/* <h1> Fetch data from an api in react </h1>{" "}
        {items.map((item) => (
          <ol key={item.id}>
            User_Name: {item.username}, Full_Name: {item.name}, User_Email:{" "}
            {item.email}
          </ol>
        ))} */}
        <div className="py-md-3 py-0">
          <div className="responsive-bar" style={{ alignItems: "baseline", height: "55px" }} >
            <h4 className="title-icare title-fitur m-0 p-0 fw-bold" style={{ fontSize: '18px' }}>
              <Link className="nav-link d-inline me-3" to="/dashboard">
                <i className="fa fa-arrow-left me-3 color-arrow-left" style={{ color: "#014C90" }}></i>
              </Link>
              <span className="title-bold" style={{ borderBottom: "3px solid #014C90" }}>Collect Meter</span>
            </h4>
          </div>


          <div className="card px-md-3 px-0 shadow border-0 responsive-collect-meter">
            <div className="card-body">
              <div className="row mb-2">
                {/* tabs */}

                <ul
                  class="nav nav-underline mb-3"
                  id="pills-tab"
                  role="tablist"
                >
                  <div className="col text-center">
                    <li
                      class="nav-item col-6"
                      role="presentation"
                      style={{ color: "#014C90" }}
                    >
                      <button
                        class="nav-link col-12 active  tab-collect"
                        id="pills-home-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#foto-meter"
                        type="button"
                        role="tab"
                        aria-controls="pills-home"
                        aria-selected="true"
                      >
                        FOTO METER
                      </button>
                    </li>
                    <li class="nav-item col-6" role="presentation">
                      <button
                        class="nav-link col-12  tab-collect"
                        id="pills-profile-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#riwayat-foto"
                        type="button"
                        role="tab"
                        aria-controls="pills-profile"
                        aria-selected="false"
                      >
                        RIWAYAT FOTO
                      </button>
                    </li>
                  </div>
                </ul>
                <div class="tab-content" id="pills-tabContent">
                  <div
                    class="tab-pane fade show active"
                    id="foto-meter"
                    role="tabpanel"
                    aria-labelledby="pills-home-tab"
                    tabindex="0"
                  >
                    <div className="row">
                      <div className="scrolling-riwayat">
                        <form onSubmit={this.submit}>
                          <div
                            className="card-label py-1 "
                            style={{ backgroundColor: "#014C90" }}
                          >
                            <label
                              className="fw-medium mx-3"
                              style={{ fontSize: "13px", color: "#fff" }}
                            >
                              Equipment Number
                            </label>
                          </div>
                          {/* <Link
                            className="py-4 mb-2 d-flex"
                            style={{ border: "1px solid #000" }}
                            to="/daftar_eq"
                          ></Link> */}

                          {/* TEST POPUP BERHASIL */}
                          <input type="text" className={`form-control mb-2 d-flex border-dark ${this.state.errorEquipmentNumber === "" ? "" : "is-invalid"}`} style={{ borderRadius: 0, textDecoration: 'none', boxShadow: 'none' }} onChange={this.validationEquipmentNumber} />
                          <div className="text-center">
                            <p
                              className="text-decoration-underline fw-medium fst-italic text-center mt-3"
                              style={{ fontSize: "13px", color: "pink" }}
                            >
                              Please upload photo meter on machine
                            </p>
                            <input
                              type="file"
                              className="d-none"
                              id="input-file"
                              onChange={this.previewImage}
                              accept="image/*"
                            />
                            <input type="file" className="d-none" id="inputFiles" accept="image/*" onChange={this.previewImage} />
                            <label
                              className="file-icon"
                              htmlFor="inputFiles"
                            >
                              <div
                                className="text-center rounded-circle p2"
                                style={{
                                  backgroundColor: "#014C90",
                                  color: "#fff",
                                  width: "50px",
                                  height: "50px",
                                  // marginLeft: "48%",
                                }}
                              >
                                <img
                                  src="/images/upload.png"
                                  alt="upload image"
                                  style={{
                                    width: "22px",
                                    marginTop: "10px",
                                  }}
                                />
                              </div>
                            </label>
                            <div
                              className=" col-md-6 col-sm-8 mx-auto my-4"
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

                          <div className="">
                            <label className="inputFiles-displayName mt-3" htmlFor="inputFiles" style={{ fontSize: '14px' }}></label>
                          </div>

                          <hr className="mb-5" />
                          <div
                            className="text-center align-items-center"
                            style={{ fontSize: "15px" }}
                          >
                            <span className="me-2">
                              Apakah anda bersedia input meter manual?{" "}
                            </span>

                            <input
                              style={{
                                borderRadius: 0,
                                padding: "1px",
                                width: "20px",
                                minHeight: "18px",
                              }}
                              className="form-check-input mt-1"
                              type="checkbox"
                              checked={isChecked}
                              onChange={this.toggleVisibility}
                            />
                          </div>

                          {/* input form */}
                          {isChecked && (
                            <div>
                              <div class="card card-body col-md-12 col-sm-6 col-12 mb-4 mt-4">
                                <div className="px-lg-2 py-lg-3">
                                  <div className="col ">
                                    {/* <div className="row">
                                      <div className="check-item d-flex align-items-center mb-2 mt-2 ">
                                        <div className="col-lg-0 col-md-0 col-3">
                                          <label>Meter 1</label>
                                        </div>
                                        <div className="col-lg-11 col-md-11 col-9">
                                        <input
                                        type="text"
                                        className="py-1 border-only-bottom ms-2"
                                        style={{fontSize: "12px", width:"92%"}}
                                        />
                                        </div>


                                        <input type="text" className="py-1 border-only-bottom ms-2" disabled={this.state.checkBoxCheckCount == 0} style={{ fontSize: '14px', width: '92%' }} />
                                      
                                      
                                      </div>

                                    </div> */}
                                    <div className="check-item d-flex align-items-center mb-2">
                                      <label>Meter 1</label>
                                      <input
                                        type="text"
                                        className="py-1 border-only-bottom ms-2"
                                        style={{ fontSize: "12px", width: "92%" }}
                                      />
                                    </div>
                                    <div className="check-item d-flex align-items-center mb-2">
                                      <label>Meter 2</label>
                                      <input
                                        type="text"
                                        className="py-1 border-only-bottom ms-2"
                                        style={{ fontSize: "12px", width: "92%" }}
                                      />
                                    </div>
                                    <div className="check-item d-flex align-items-center mb-2">
                                      <label>Meter 3</label>
                                      <input
                                        type="text"
                                        className="py-1 border-only-bottom ms-2"
                                        style={{ fontSize: "12px", width: "92%" }}
                                      />
                                    </div>
                                    <div className="check-item d-flex align-items-center mb-2">
                                      <label>Meter 4</label>
                                      <input
                                        type="text"
                                        className="py-1 border-only-bottom ms-2"
                                        style={{ fontSize: "12px", width: "92%" }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          <div className="col text-center mt-5">
                            <button
                              className="btn btn-login py-2 px-3 button-foto-meter"
                              style={{ fontSize: "14px", width: "16%" }}
                              type="submit"
                            >
                              Submit
                            </button>
                          </div>
                        </form>
                        <ConfirmAlert visible={this.state.showPopup} message={this.state.alertOption.message} onClick={this.handlePopup} customClass="col-md-3 col-sm-7 col-12" />
                      </div>
                    </div>
                  </div>
                  <div
                    class="tab-pane fade"
                    id="riwayat-foto"
                    role="tabpanel"
                    aria-labelledby="pills-profile-tab"
                    tabindex="0"
                  >
                    <div className="scrolling-riwayat">

                      {this.state.dataCollectMeter.map((item) => (
                        <Link
                          className="list-items"
                          to=""
                          style={{ textDecoration: "none" }}
                        >
                          <div className="row" key={item.id}>
                            <div className="col">
                              <div className="card border-0">
                                <div className="card-body">
                                  <Link
                                    to="/riwayat-meter"
                                    className="link-riwayat-meter"
                                  >
                                    <div className="row">
                                      <div className="d-flex col-12">
                                        <div className="col-11">
                                          <h7 className="card-subtitle d-flex align-items-center">
                                            <i
                                              className="fa fa-info-circle"
                                              style={{
                                                marginRight: "10px",
                                                fontSize: "17px",
                                              }}
                                            >
                                              <span
                                                className="info"
                                                style={{
                                                  fontSize: "15px",
                                                  marginLeft: "6px",
                                                }}
                                              >
                                                Info
                                              </span>
                                            </i>
                                            <i
                                              className="fa fa-circle me-1 ms-2"
                                              style={{ fontSize: "10px" }}
                                            >
                                              <span
                                                className="info"
                                                style={{
                                                  fontSize: "15px",
                                                  marginLeft: "6px",
                                                }}
                                              >
                                                {item.createDate}
                                              </span>
                                            </i>
                                          </h7>
                                          <h6
                                            className="card-title "
                                            style={{
                                              marginTop: "10px",
                                              fontSize: "15px",
                                            }}
                                          >
                                            OK, foto meter berhasil disubmit!!
                                          </h6>
                                          <p
                                            className="card-text"
                                            style={{ fontSize: "13px" }}
                                          >
                                            Terima kasih telah memberikan
                                            infromasi meter device dengan nomor
                                            EQ:{item.Equipment}
                                          </p>
                                        </div>
                                        <div className="col-1">
                                          <Link to="/riwayat-meter">
                                            <img
                                              src="images/riwayat-foto-collect.png"
                                              alt="Logo Install"
                                              height={52}
                                            ></img>
                                          </Link>
                                        </div>
                                      </div>
                                    </div>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* <hr className="m-0" /> */}
                        </Link>
                      ))}

                    </div>
                  </div>
                </div>

                {/* <div className="navbar navbar-exspand-lg mb-4">
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <Link className="btn-proses py-3 px-4 text-center fw-medium">FOTO METER</Link>
                                    </li>
                                    <li className="nev-item">
                                        <Link className="btn-proses py-3 px-4 text-center fw-medium">RIWAYAT FOTO</Link>
                                    </li>
                                </ul>
                            </div> */}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  handleInputFile(e) {
    this.setState({ photoMeter: e.target.files.length })
    document.querySelectorAll('.inputFiles-displayName').forEach((val, key) => {
      if (e.target.files.length > 0) {
        val.innerHTML = `
                <div class="d-flex align-items-center">
                    <div class="w-100">${e.target.files[0].name}</div>
                    <i class="fa fa-check text-success d-block d-md-none"></i>
                </div>
            `
      } else {
        val.innerHTML = ""
      }
    })
  }
}
