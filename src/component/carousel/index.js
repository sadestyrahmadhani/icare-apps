import { useState } from "react";
import React from "react";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Carousel = () => {

    const setting = {
        dots: true,
        infinite: true,
        speed: 5000,
        slidesToShow: 3,
        slidesToScroll:1,
        autoplay: true, 
        autoplaySpeed: 2000,
        
    }

    return (
        <Slider {...setting}>
            <div className="card custom-height shadow-lg mb-3">
                <div className="card-body d-flex align-items-center justify-content-center" style={{padding:'5rem'}}>
                    <div className="text-center">
                        <img src="/images/bintang.png" alt="ratting" />
                        <p className="description-ratting fst-italic mb-5" style={{fontSize:'10px'}}>Terimakasih pengirimannya sangat cepat, kurirnya sangat baik dan ramah.</p>
                        <h6 className="name-cust fw-bold">Ananta Ajeng</h6>
                        <p className="text-secondary-body fw-medium">Multimedia Sinergi</p>
                    </div>
                </div>
            </div>
            <div className="card custom-height shadow-lg mb-3">
                <div className="card-body d-flex align-items-center justify-content-center" style={{padding:'5rem'}}>
                    <div className="text-center">
                        <img src="/images/bintang.png" alt="ratting" />
                        <p className="description-ratting fst-italic mb-5" style={{fontSize:'10px'}}>Terimakasih pengirimannya sangat cepat, kurirnya sangat baik dan ramah.</p>
                        <h6 className="name-cust fw-bold">Ananta Ajeng</h6>
                        <p className="text-secondary-body fw-medium">Multimedia Sinergi</p>
                    </div>
                </div>
            </div>
            <div className="card custom-height shadow-lg mb-3">
                <div className="card-body d-flex align-items-center justify-content-center" style={{padding:'5rem'}}>
                    <div className="text-center">
                        <img src="/images/bintang.png" alt="ratting" />
                        <p className="description-ratting fst-italic mb-5" style={{fontSize:'10px'}}>Terimakasih pengirimannya sangat cepat, kurirnya sangat baik dan ramah.</p>
                        <h6 className="name-cust fw-bold">Ananta Ajeng</h6>
                        <p className="text-secondary-body fw-medium">Multimedia Sinergi</p>
                    </div>
                </div>
            </div>
            <div className="card custom-height shadow-lg mb-3">
                <div className="card-body d-flex align-items-center justify-content-center" style={{padding:'5rem'}}>
                    <div className="text-center">
                        <img src="/images/bintang.png" alt="ratting" />
                        <p className="description-ratting fst-italic mb-5" style={{fontSize:'10px'}}>Terimakasih pengirimannya sangat cepat, kurirnya sangat baik dan ramah.</p>
                        <h6 className="name-cust fw-bold">Ananta Ajeng</h6>
                        <p className="text-secondary-body fw-medium">Multimedia Sinergi</p>
                    </div>
                </div>
            </div>
            <div className="card custom-height shadow-lg mb-3">
                <div className="card-body d-flex align-items-center justify-content-center" style={{padding:'5rem'}}>
                    <div className="text-center">
                        <img src="/images/bintang.png" alt="ratting" />
                        <p className="description-ratting fst-italic mb-5" style={{fontSize:'10px'}}>Terimakasih pengirimannya sangat cepat, kurirnya sangat baik dan ramah.</p>
                        <h6 className="name-cust fw-bold">Ananta Ajeng</h6>
                        <p className="text-secondary-body fw-medium">Multimedia Sinergi</p>
                    </div>
                </div>
            </div>
            <div className="card custom-height shadow-lg mb-3">
                <div className="card-body d-flex align-items-center justify-content-center" style={{padding:'5rem'}}>
                    <div className="text-center">
                        <img src="/images/bintang.png" alt="ratting" />
                        <p className="description-ratting fst-italic mb-5" style={{fontSize:'10px'}}>Terimakasih pengirimannya sangat cepat, kurirnya sangat baik dan ramah.</p>
                        <h6 className="name-cust fw-bold">Ananta Ajeng</h6>
                        <p className="text-secondary-body fw-medium">Multimedia Sinergi</p>
                    </div>
                </div>
            </div>
        </Slider>
    )
}

export default Carousel