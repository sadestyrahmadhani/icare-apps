import { useEffect, useState } from "react";
import { Link, redirect, useLocation, useNavigate, useParams } from "react-router-dom";
import { getCollectMeterByUserId, getImageCollectMeter, createCollectMeter, getDaftarEq, collectMeterImage } from "../../services/API";
import ConfirmAlert from "../../component/alert/confirmAlert";
import OptionAlert from "../../component/alert/optionAlert";
import LoadingAlert from "../../component/alert/loadingAlert";

import uploadImage from '../../images/upload.png'
import riwayatFotoCollect from './../../images/riwayat-foto-collect.png'

function CollectMeter() {
  const params = useParams()
  const location = useLocation()
  const navigate = useNavigate()

  const [dataCollectMeter, setDataCollectMeter] = useState([])
  const [equipmentList, setEquipmentList] = useState([])
  const [checkBoxCheckCount, setCheckBoxCheckCount] = useState()
  const [selectedEquipment, setSelectedEquipment] = useState(null)
  const [alertOption, setAlertOption] = useState({ title: '', message: '', redirect: false })
  const [showPopup, setShowPopup] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [showOptionAlert, setShowOptionAlert] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false)
  const [showMoreEquipment, setShowMoreEquipment] = useState(false)
  const [meterOne, setMeterOne] = useState(0)
  const [meterTwo, setMeterTwo] = useState(0)
  const [meterThree, setMeterThree] = useState(0)
  const [meterFour, setMeterFour] = useState(0)
  const [photoMeter, setPhotoMeter] = useState('')
  const [searchText, setSearchText] = useState('')
  const [collectMeterNumber, setCollectMeterNumber] = useState('')
  const [image, setImage] = useState('')
  const [errorEquipmentNumber, setErrorEquipmentNumber] = useState('')
  const [originalData, setOriginalData] = useState('')
  const [imageName, setImageName] = useState('')
  const [loading, setLoading] = useState(true)

  const [activeTab, setActiveTab] = useState("foto-meter")

  useEffect(() => {
    Promise.all([
      dataCollcetMeter(),
      dataEq()
    ]).then(() => {
      setLoading(false)
    })
    if (location.state?.equipment !== '') {
      setSearchText(location.state?.equipment)
    //   setSelectedEquipment({
    //     equipment: location.state?.equipment,
    //     modelName: location.state?.modelName,
    //     description: location.state?.description,
    //     AddressId: location.state?.address.id,
    //     Penerima: location.state?.address.Penerima,
    //     Nama_Alamat: location.state?.address.Nama_Alamat,
    //     Alamat: location.state?.address.Alamat,
    //     Kota: location.state?.address.Kota,
    //     Latitude: location.state?.address.Latitude,
    //     Longitude: location.state?.address.Longitude
    //   })
    }
    
    // console.log("RES : ", location.state)

    if (location.state?.selectedTab) {
      setActiveTab(location.state?.selectedTab)
    }
  }, []);

  const dataCollcetMeter = async () => {
    const res = await getCollectMeterByUserId()
    if (res.status == 200) {
      const data = res.data.Table
      data.sort((a, b) => b.id - a.id)
      // console.log('Response getDataCollcetMeter : ', data)
      setDataCollectMeter(data)
    }
  }

  const dataEq = async () => {
    const res = await getDaftarEq()
    if (res.status == 200) {
      setEquipmentList(res.data.Table)
      setOriginalData(res.data.Table)
    }
  }

  const handleClickItems = (e, dataId) => {
    e.preventDefault()
    navigate('/riwayat_meter', {
      state: {
        id: dataId
      }
    })
  }

  const toggleVisibility = () => {
    setIsChecked((prevState) => !prevState)
  }

  const handlePopup = () => {
    setShowPopup(false)
    setShowOptionAlert(false)
    if (alertOption.redirect) {
      // navigate('/dashboard')
      setLoading(true)
      window.location.reload(true)
      // setLoading(false)
    }
  }

  const handleMeterOne = (e) => {
    e.preventDefault()
    setMeterOne(e.target.value)
  }
  const handleMeterTwo = (e) => {
    e.preventDefault()
    setMeterTwo(e.target.value)
  }
  const handleMeterThree = (e) => {
    e.preventDefault()
    setMeterThree(e.target.value)
  }
  const handleMeterFour = (e) => {
    e.preventDefault()
    setMeterFour(e.target.value)
  }

  const handleDropdownItemClick = (item) => {
    setSelectedEquipment(item)
    setSearchText(item.equipment)
    setShowDropdown(false)
    setErrorEquipmentNumber('')
  }

  const handleSearchInputChange = (e) => {
    const inputText = e.target.value
    setSearchText(inputText)

    if (inputText.trim() === "") {
      setErrorEquipmentNumber('Silahkan isi equipment number')
    } else {
      setErrorEquipmentNumber('')
    }

    setShowDropdown(!!inputText)
  }

  const handleInputClick = () => {
    setShowDropdown(!showDropdown)
  }

  const displayEquipmentList = showMoreEquipment ? equipmentList : equipmentList.slice(0, 5)
  const handleShowMoreEquipment = () => {
    setShowMoreEquipment(true)
  }

  const filteredEquipmentList = (e) => {
    if (e.target.value != '') {
      var filterData = originalData.filter(val => (val.equipment.toString().toLowerCase().includes(e.target.value.toLowerCase())) || val.eqmodelName.toLowerCase().includes(e.target.value.toLowerCase()) || val.description.toLowerCase().includes(e.target.value.toLowerCase()))
      setEquipmentList(filterData)
    } else {
      setEquipmentList(originalData)
    }
  }

  const handleInputFile = (e) => {
    setPhotoMeter(e.target.files.length)
    setImage(e.target.files[0])
    setImageName(e.target.files[0].name)
    document.querySelectorAll('.inputFiles-displayName').forEach((val, key) => {
      if (e.target.files.length > 0) {
        val.innerHTML = `
                <div class="d-flex align-items-center text-black">
                    <div class="w-100">${e.target.files[0].name}</div>
                    <i class="fa fa-check text-success d-block d-md-none"></i>
                </div>
            `
      } else {
        val.innerHTML = ""
      }
    })
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        document.getElementById("preview-image").src = e.target.result
      }
      reader.readAsDataURL(file)
    }
    document.getElementById("display-image").classList.remove("d-none")
    document.getElementById("display-image").classList.add("d-block")
  }

  const handleScanRedirect = (e) => {
    e.preventDefault()
    navigate('/qr-scanner', {
      state: {
        redirect: '/collect_meter'
        }
    })
  }


  // async function submit(e) {
  const submit = async (e) => {
    e.preventDefault()

    let isValid = true;

    if (!selectedEquipment.equipment || !searchText) {
      isValid = false
      setShowPopup(true)
      setAlertOption({ title: 'Error', message: 'Pilih Equipment', redirect: false })
    } else if (!imageName) {
      isValid = false
      setShowPopup(true)
      setAlertOption({ title: 'Error', message: 'Unggah Photo Meter', redirect: false })
    }

    setIsFormValid(isValid)

    // console.log('Test : ', isValid)

    if (isValid) {
      setLoading(true)
      // console.log('Test : ', imageName)
      var bodyFormData = new FormData()
      bodyFormData.append('file', image)

      // try {
      const res = await collectMeterImage(bodyFormData)
      const response = await createCollectMeter({
        equipment: selectedEquipment.equipment.toString(),
        userid: localStorage.getItem('id').toString(),
        latitude: selectedEquipment.Latitude.toString(),
        longitude: selectedEquipment.Longitude.toString(),
        capture: imageName,
        meter1: meterOne.toString(),
        meter2: meterTwo.toString(),
        meter3: meterThree.toString(),
        meter4: meterFour.toString()
      })
      // console.log("API: ", response)
      if (res.status === 200 && res.data.includes('Succes upload') && response.status === 200 && response.data.includes('Succes insert collect meter')) {
        setLoading(false)
        setShowPopup(true)
        setAlertOption({ title: 'Berhasil', message: "Berhasil melakukan Collect Meter", redirect: true })
      } else {
        setLoading(false)
        setShowPopup(true)
        setAlertOption({ title: 'Error', message: 'Gagal melakukan Collect Meter', redirect: false })
      }
      // }
    }
  }

  return (
    <>
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
                className="nav nav-underline mb-3"
                id="pills-tab"
                role="tablist"
              >
                <div className="col text-center">
                  <li
                    className="nav-item col-6"
                    role="presentation"
                    style={{ color: "#014C90" }}
                  >
                    <button
                      className={`nav-link col-12 tab-collect ${activeTab === "foto-meter" ? "active" : ""}`}
                      onClick={() => setActiveTab("foto-meter")}
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
                  <li className="nav-item col-6" role="presentation">
                    <button
                      className={`nav-link col-12 tab-collect ${activeTab === "riwayat-meter" ? "active" : ""}`}
                      onClick={() => setActiveTab("riwayat-meter")}
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
              <div className="tab-content" id="pills-tabContent">
                {
                  activeTab === "foto-meter" && (

                    <div
                      className="tab-pane fade show active"
                      id="foto-meter"
                      role="tabpanel"
                      aria-labelledby="pills-home-tab"
                      tabIndex="0"
                    >
                      <div className="row">
                        <div className="scrolling-riwayat">
                          <form onSubmit={submit}>
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
                            <div className="custom-search-dropdown-breakfix d-flex">
                              <div className="col-11 col-lg-12 padding-right-10px-mobile mt-lg-0 mt-1">
                                <input type="text" onKeyUp={filteredEquipmentList} id="search-dropdown-breakfix" className="search-dropdown-breakfix" value={searchText} onChange={handleSearchInputChange} onClick={handleInputClick} />
                                {
                                  showDropdown && (
                                    <div className={`${isChecked ? 'dropdown-collect-meter-ischecked' : 'dropdown-collect-meter'}`} style={{ position: 'absolute', backgroundColor: 'white', overflow: 'hidden', width: '93.8%', top: '31%', zIndex: '1', overflowY: 'auto', maxHeight: '300px', borderTop: '1px solid', borderRight: '1px solid black', borderLeft: '1px solid black' }}>
                                      {
                                        displayEquipmentList.map((item, index) => (
                                          <div key={index} className="dropdown-item-breakfix" onClick={() => handleDropdownItemClick(item)}>
                                            <div>{item.equipment} - {item.eqmodelName}</div>
                                            <div>{item.description}</div>
                                          </div>
                                        ))
                                      }
                                      {
                                        !showMoreEquipment && equipmentList.length > 5 && (
                                          <div className="dropdown-item-install" onClick={handleShowMoreEquipment} style={{ cursor: "pointer" }}>
                                            <div className="item-eq-lainnya" style={{ color: '#014C90' }}>Equipment Lainnya...</div>
                                          </div>
                                        )
                                      }
                                    </div>
                                  )
                                }
                                <LoadingAlert visible={loading} customClass="col-md-2 col-8" />
                              </div>
                              <div className="col-1 col-lg-0 d-lg-none d-block my-auto text-center">
                                <Link className="fa fa-qrcode" onClick={handleScanRedirect} style={{ fontSize: '34px', textDecoration: 'none', color: '#000', right: 5 }}></Link>
                              </div>
                            </div>

                            <div className="text-center">
                              <p className="text-decoration-underline fw-medium fst-italic text-center mt-3" style={{ fontSize: "13px", color: "pink" }} >
                                Please upload photo meter on machine
                              </p>
                              <input type="file" className="d-none" id="inputFiles-displayName" accept="image/*" onChange={handleInputFile} />
                              <div className="d-md-block d-none">
                                <label className="file-icon" htmlFor="inputFiles-displayName">
                                  <div className="text-center rounded-circle p2" style={{ backgroundColor: "#014C90", color: "#fff", width: "50px", height: "50px" }}>
                                    <img src={uploadImage} alt="upload image"
                                      style={{ width: "22px", marginTop: "10px" }} />
                                  </div>
                                </label>
                              </div>
                              <div className="d-md-none d-block">
                                <label className="file-icon" onClick={() => setShowOptionAlert(true)} >
                                  <div className="text-center rounded-circle p2" style={{ backgroundColor: "#014C90", color: "#fff", width: "50px", height: "50px", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <i className="fa fa-camera fs-2"></i>
                                  </div>
                                </label>
                              </div>
                              <div className=" col-md-6 col-sm-8 mx-auto my-4 d-block d-lg-none" id="display-image" >
                                <img src="#" alt="" className="w-50" id="preview-image" style={{ maxWidth: '800px', maxHeight: '600px' }} />
                              </div>
                            </div>

                            <div className="d-lg-block d-none">
                              <label className="inputFiles-displayName mt-3" htmlFor="inputFiles" style={{ fontSize: '14px' }}></label>
                            </div>

                            <hr className="mb-5" />
                            <div
                              className="text-center align-items-center text-black"
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
                                onChange={toggleVisibility}
                              />
                            </div>

                            {/* input form */}
                            {isChecked && (
                              <div>
                                <div class="card card-body col-md-12 col-sm-6 col-12 mb-4 mt-4">
                                  <div className="px-lg-2 py-lg-3">
                                    <div className="col ">
                                      <div className="check-item d-flex align-items-center mb-2 font-size-12px-mobile text-black">
                                        <div className="col-2 col-lg-1">
                                          <label>Meter 1</label>
                                        </div>
                                        <div className="col-10 col-lg-11">
                                          <input
                                            type="text"
                                            className="py-1 border-only-bottom ms-2"
                                            style={{ fontSize: "12px", width: "97%" }} value={meterOne}
                                            onChange={handleMeterOne}
                                          />
                                        </div>
                                      </div>
                                      <div className="check-item d-flex align-items-center mb-2 font-size-12px-mobile text-black">
                                        <div className="col-2 col-lg-1">
                                          <label>Meter 2</label>
                                        </div>
                                        <div className="col-10 col-lg-11">
                                          <input
                                            type="text"
                                            className="py-1 border-only-bottom ms-2"
                                            style={{ fontSize: "12px", width: "97%" }} value={meterTwo}
                                            onChange={handleMeterTwo}
                                          />
                                        </div>
                                      </div>
                                      <div className="check-item d-flex align-items-center mb-2 font-size-12px-mobile text-black">
                                        <div className="col-2 col-lg-1">
                                          <label>Meter 3</label>
                                        </div>
                                        <div className="col-10 col-lg-11">
                                          <input
                                            type="text"
                                            className="py-1 border-only-bottom ms-2"
                                            style={{ fontSize: "12px", width: "97%" }} value={meterThree}
                                            onChange={handleMeterThree}
                                          />
                                        </div>
                                      </div>
                                      <div className="check-item d-flex align-items-center mb-2 font-size-12px-mobile text-black">
                                        <div className="col-2 col-lg-1">
                                          <label>Meter 4</label>
                                        </div>
                                        <div className="col-10 col-lg-11">
                                          <input
                                            type="text"
                                            className="py-1 border-only-bottom ms-2"
                                            style={{ fontSize: "12px", width: "97%" }} value={meterFour}
                                            onChange={handleMeterFour}
                                          />
                                        </div>
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
                          <ConfirmAlert visible={showPopup} message={alertOption.message} onClick={handlePopup} customClass="col-md-3 col-sm-7 col-9" />
                          <OptionAlert visible={showOptionAlert} message="Ambil foto dari" previewImage={handleInputFile} handlePopup={() => setShowOptionAlert(false)} customClass="col-sm-3" onClick={handlePopup} />
                        </div>
                      </div>
                    </div>
                  )
                }
                {
                  activeTab === "riwayat-meter" && (

                    <div
                      className="tab-pane active"
                      id="riwayat-foto"
                      role="tabpanel"
                      aria-labelledby="pills-profile-tab"
                      tabIndex="0"
                    >
                      <div className="scrolling-riwayat">

                        {
                          dataCollectMeter.map((value, index) => (
                            // !value.deleted && ()
                            <Link
                              key={index}
                              className="mb-lg-0 mb-2"
                              onClick={(e) => handleClickItems(e, value.id)}
                              style={{ textDecoration: "none", color: '#000', fontSize: '16px', display: 'block' }}>
                              <div className="row" >
                                <div className="col">
                                  <div className="card border-0">
                                    <div className="card-body p-5px">
                                      <Link
                                        className="link-riwayat-meter"
                                      >
                                        <div className="row">
                                          <div className="d-flex col-12">
                                            <div className="col-10 col-lg-11 col-md-11">
                                              <h6 className="card-subtitle d-flex align-items-center">
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
                                                    className="info font-size-12px-mobile"
                                                    style={{
                                                      fontSize: "15px",
                                                      marginLeft: "6px",
                                                    }}
                                                  >
                                                    {value.createDate}
                                                  </span>
                                                </i>
                                              </h6>
                                              <h6
                                                className="card-title font-size-12px-mobile"
                                                style={{
                                                  marginTop: "10px",
                                                  fontSize: "15px",
                                                }}
                                              >
                                                OK, foto meter berhasil disubmit!!
                                              </h6>
                                              <p
                                                className="card-text font-size-12px-mobile"
                                                style={{ fontSize: "13px" }}
                                              >
                                                Terima kasih telah memberikan
                                                infromasi meter device dengan nomor
                                                EQ: {value.Equipment}
                                              </p>
                                            </div>
                                            <div className="col-2 col-lg-1 col-md-1 my-auto text-position-right">
                                              <img
                                                className="image-collect-meter"
                                                src={ riwayatFotoCollect }
                                                alt="Logo Install"
                                              // height={52}
                                              ></img>
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
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CollectMeter