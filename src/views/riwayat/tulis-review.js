import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ConfirmAlert from "../../component/alert/confirmAlert";
import { createReview } from "../../services/API/mod_riwayatOrder";

function Review() {
    // const { id } = useParams()
    const navigate = useNavigate()
    const location = useLocation()
    const [showPopup, setShowPopup] = useState(false)
    const [alertOption, setAlertOption] = useState({message: '', redirect: false})
    const [errorRating, setErrorRating] = useState(false)
    const [loading, setLoading] = useState(false)
    const [requestId, setRequestId] = useState(location.state.id)
    const [requestNo, setRequestNo] = useState(location.state.serviceRequest)
    const [equipment, setEquipment] = useState(location.state.eq)
    const [namaRequest, setNamaRequest] = useState(location.state.requestName)
    const [description, setDescription] = useState('')
    const [rating, setRating] = useState(0)

    // console.log(location.state);

    const handleRatingClick = (rating) => {
        setRating(rating);
    }

    const handleDescription = (e) => {
        e.preventDefault()
        setDescription(e.target.value)
    }

    const handlePopup = () => {
        setShowPopup(false);
        setErrorRating(false)
        if(alertOption.redirect) {
            navigate("/dashboard")
        }
    }

    const handleSubmit = async () => {
        if (rating === 0) {
            setErrorRating(true);
            setShowPopup(true);
            setAlertOption({message:'Mohon isi rating', redirect: false})
        } else {
            setLoading(true)
            const res = await createReview({trequestid: requestId, review: rating.toString(), description: description})
            setLoading(false)
            if(res.status = 200 && res.data.includes('Succes insert review')) {
                // console.log('berhasil harusnya');
                setShowPopup(true);
                setAlertOption({message:'Berhasil berikan review', redirect: true})
            }
        }
    }

    const renderStars = () => {
        const maxStars = 5;
        const stars = [];

        for (let i = 1; i <= maxStars; i++) {
            const className = i <= rating ? "fa fa-star yellow" : "fa fa-star";
            stars.push(
                <i 
                    key={i} 
                    className={className} 
                    onClick={() => handleRatingClick(i)} 
                    style={{marginRight:'15px'}} 
                />
            );
        }
        // console.log(stars);
        return stars;
    }

    return (
        <>
            <div className="responsive-bar">
                <div className="card-title mb-md-4 m-0 p-0">
                    <h4 className="title-icare title-fitur m-0 p-0 fw-bold" style={{fontSize:'18 px'}}>
                        <Link to="/riwayat" className="nav-link d-inline d-md-none me-3">
                            <i className="fa fa-arrow-left"></i>
                        </Link>
                        <span className="title-bold">Tulis Review</span>
                    </h4>
                    {/* <strong className="title-icare" style={{fontSize:'18px', borderBottom:'3px solid #014C90'}}>Tulis Review</strong> */}
                </div>
            </div>
            <div className="responsive-tulis-review">
                <div className="card px-3 mt-4 shadow border-0" style={{borderRadius:'20px'}}>
                    <div className="card-body">
                        <div className="row py-2">
                            <div className="card-review py-3 px-4" style={{height:'100px', border:'1px solid black', borderRadius:'10px'}}>
                                <th className="pe-3">
                                    <tr>
                                        <td className="pb-3">{namaRequest}</td>
                                    </tr>
                                    <tr>
                                        <td>EQ</td>
                                    </tr>
                                </th>
                                <th className="pe-3">
                                    <tr>
                                        <td className="pb-3">:</td>
                                    </tr>
                                    <tr>
                                        <td>:</td>
                                    </tr>
                                </th>
                                <th>
                                    <tr>
                                        <td className="pb-3">{requestNo}</td>
                                    </tr>
                                    <tr>
                                        <td>{equipment}</td>
                                    </tr>
                                </th>
                                {/* <div className="d-flex">
                                    <di className="col-2">
                                        <p>{namaRequest}</p>
                                    </di>
                                    <div className="col-1">
                                        <p>:</p>
                                    </div>
                                    <div className="col-1">
                                        {requestNo}
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <di className="col-2">
                                        <p>EQ</p>
                                    </di>
                                    <div className="col-1">
                                        <p>:</p>
                                    </div>
                                    <div className="col-1">
                                        <p>{equipment}</p>
                                    </div>
                                </div> */}
                            </div>
                            <span className="text-center mt-4" style={{fontSize:'15px'}}>Bagaimana penilaian anda dengan pelayanan dari Astragraphia</span>
                            <div className="col-12 text-center fs-1 mt-4">
                                {renderStars()}
                            </div>
                            <div className="review-container">
                                <div className="row">
                                    <div className="col-sm-12 d-flex flex-column">
                                        <span className="d-none d-sm-block py-1 px-0" style={{ fontSize: '15px' }}>Berikan Review</span>
                                    </div>
                                    <div className="col-sm-12">
                                        <textarea type="text" className="mt-2 review-text" onChange={handleDescription} style={{border: 'none', backgroundColor:'#d0d0d0', borderRadius:'4px', paddingBottom:'10%', width:'100%'}} />
                                    </div>
                                </div>
                            </div>
                            <div className="text-center py-4">
                                <button className="btn btn-login py-2 px-5" style={{fontSize:'12px'}} onClick={handleSubmit}>SUBMIT</button>
                            </div>
                        </div>
                        <ConfirmAlert visible={showPopup || errorRating} message={alertOption.message} customClass="col-sm-3" onClick={handlePopup}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Review

