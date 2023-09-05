import { useState } from "react";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Carousel = () => {

    const [slideIndex, setSlideIndex] = useState(0)

    const setting = {
        dots: true,
        infinite: true,
        speed: 3000,
        slidesToShow: 3,
        slidesToScroll:1,
        autoplay: true, 
        autoplaySpeed: 1500,
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
                    <div className={ `card slide-card shadow-lg`} key={key}>
                        <div className="card-body d-flex align-items-center justify-content-center" style={{padding:'1rem'}}>
                            <div className="text-center">
                                <div className="col-12 text-center fs-5">
                                    <i className="fa fa-star text-warning"></i>
                                    <i className="fa fa-star text-warning"></i>
                                    <i className="fa fa-star text-warning"></i>
                                    <i className="fa fa-star text-warning"></i>
                                    <i className="fa fa-star text-warning"></i>
                                </div>
                                <p className="description-rating fst-italic" style={{fontSize:'14px', marginBottom:'180px'}}> { val.description} </p>
                                <h5 className="name-cust fw-bold"> {val.name} </h5>
                                <p className="text-secondary-body fw-medium" style={{fontSize:'14px', color:'#bfbfbf'}}> {val.company} </p>
                            </div>
                        </div>
                    </div>
                )
            })}
        </Slider>
    )
}

export default Carousel

