import { useState } from "react";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Carousel = () => {

    const [slideIndex, setSlideIndex] = useState(0)

    const setting = {
        dots: true,
        infinite: true,
        speed: 5000,
        slidesToShow: 3,
        slidesToScroll:1,
        autoplay: true, 
        autoplaySpeed: 1000,
        beforeChange : (current, next) => setSlideIndex(next),
        centerMode: true
        
    }

    const carouselData = [
        {
            name: 'Ananta Ajeng',
            company: 'Multimedia Sinergi',
            description: 'Terima kasih pengirimannya sangat cepat, kurirnya sangat baik dan ramah.'
        },
        {
            name: 'Ananta Ajeng',
            company: 'Multimedia Sinergi',
            description: 'Terima kasih pengirimannya sangat cepat, kurirnya sangat baik dan ramah.'
        },
        {
            name: 'Ananta Ajeng',
            company: 'Multimedia Sinergi',
            description: 'Terima kasih pengirimannya sangat cepat, kurirnya sangat baik dan ramah.'
        },
        {
            name: 'Ananta Ajeng',
            company: 'Multimedia Sinergi',
            description: 'Terima kasih pengirimannya sangat cepat, kurirnya sangat baik dan ramah.'
        },
        {
            name: 'Ananta Ajeng',
            company: 'Multimedia Sinergi',
            description: 'Terima kasih pengirimannya sangat cepat, kurirnya sangat baik dan ramah.'
        },
        {
            name: 'Ananta Ajeng',
            company: 'Multimedia Sinergi',
            description: 'Terima kasih pengirimannya sangat cepat, kurirnya sangat baik dan ramah.'
        },
    ]

    return (
        <Slider {...setting}>
            { carouselData.map((val, key) => {
                return(
                    <div className={ `card slide-card custom-height shadow-lg ${ slideIndex == key ? 'active' : ''}`} key={key}>
                        <div className="card-body d-flex align-items-center justify-content-center" style={{padding:'5rem'}}>
                            <div className="text-center">
                                <div className="col-12 text-center">
                                    <i className="fa fa-star text-warning"></i>
                                    <i className="fa fa-star text-warning"></i>
                                    <i className="fa fa-star text-warning"></i>
                                    <i className="fa fa-star text-warning"></i>
                                    <i className="fa fa-star text-warning"></i>
                                </div>
                                <p className="description-rating fst-italic mb-5" style={{fontSize:'10px'}}> { val.description} </p>
                                <h6 className="name-cust fw-bold"> {val.name} </h6>
                                <p className="text-secondary-body fw-medium" style={{fontSize:'12px', color:'#bfbfbf'}}> {val.company} </p>
                            </div>
                        </div>
                    </div>
                )
            })}
        </Slider>
    )
}

export default Carousel

