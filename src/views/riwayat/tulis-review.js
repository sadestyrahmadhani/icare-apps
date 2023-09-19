import { Component } from "react";
import ConfirmAlert from "../../component/alert/confirmAlert";
import { redirect } from "react-router-dom";

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: 0,
            errorRating: false,
            showPopup: false,
        }
        this.handlePopup = this.handlePopup.bind(this)
    }

    handleRatingClick = (rating) => {
        this.setState({rating});
    }

    handlePopup() {
        this.setState({showPopup: false})
    }

    handleSubmit = () => {
        const {rating} = this.state;

        if (rating === 0) {
            this.setState({errorRating: true, showPopup: true});
        } else {
            this.setState({showPopup: false});

            window.location.href = "/#/dashboard";
        }
    }

    renderStars = () => {
        const {rating} = this.state;
        const maxStars = 5;

        const stars = [];

        for (let i = 1; i <= maxStars; i++) {
            const className =
            i <= rating ? "fa fa-star yellow" : "fa fa-star";
            stars.push(
                <i key={i} className={className} onClick={() => this.handleRatingClick(i)} style={{marginRight:'15px'}} />
            );
        }

        return stars;
    }

    render() {
        if(this.state.redirectToHome) {
            return <redirect to="/dashboard" />;
        }

        return (
            <>
                <div className="container">
                    <div className="responsive-bar">
                        <div className="card-title mb-md-4 m-0 p-0">
                            <strong className="title-icare" style={{fontSize:'18px', borderBottom:'3px solid #014C90'}}>Tulis Review</strong>
                        </div>
                    </div>
                    <div className="responsive-tulis-review">
                        <div className="card px-3 mt-4 shadow border-0" style={{borderRadius:'20px'}}>
                            <div className="card-body">
                                <div className="row py-2">
                                    <div className="card-review py-3 px-4" style={{height:'100px', border:'1px solid black', borderRadius:'10px'}}>
                                        <div className="d-flex">
                                            <di className="col-sm-2" style={{width:'12%'}}>
                                                <p>Service Request</p>
                                            </di>
                                            <div className="col-sm-1" style={{width:'10px'}}>
                                                <p>:</p>
                                            </div>
                                            <div className="col-sm-2">
                                                SR-2218547
                                            </div>
                                        </div>
                                        <div className="d-flex">
                                            <di className="col-sm-2" style={{width:'12%'}}>
                                                <p>EQ</p>
                                            </di>
                                            <div className="col-sm-1" style={{width:'10px'}}>
                                                <p>:</p>
                                            </div>
                                            <div className="col-sm-2">
                                                <p>435174</p>
                                            </div>
                                        </div>
                                    </div>
                                    <span className="text-center mt-4" style={{fontSize:'15px'}}>Bagaimana penilaian anda dengan pelayanan dari Astragraphia</span>
                                    <div className="col-12 text-center fs-1 mt-4">
                                        {this.renderStars()}
                                        {/* <i className="fa fa-star px-2"></i>
                                        <i className="fa fa-star px-2"></i>
                                        <i className="fa fa-star px-2"></i>
                                        <i className="fa fa-star px-2"></i>
                                        <i className="fa fa-star px-2"></i> */}
                                    </div>
                                    <span className="py-1 px-0" style={{fontSize:'15px'}}>Berikan Review</span>
                                    <input type="text" className="border-0 mt-2 border-only-bottom" style={{borderRadius:'4px', backgroundColor:'#bfbfbf', paddingLeft:'10px', paddingBottom:'10%'}}></input>
                                    <div className="text-center py-4">
                                        <button className="btn btn-login py-2 px-5" style={{fontSize:'12px'}} onClick={this.handleSubmit}>SUBMIT</button>
                                    </div>
                                </div>
                                <ConfirmAlert visible={this.state.showPopup && this.state.errorRating} message="Mohon isi rating" customClass="col-sm-3" onClick={this.handlePopup}/>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}