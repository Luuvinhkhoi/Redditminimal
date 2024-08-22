import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
export const Carousel=({obj})=>{
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return (
        <div style={{width: '80%'}}>
            <Slider>
                {obj.map((img, index) => (
                    <div key={index} >
                        <img src={img.s.u.replace(/&amp;/g, '&')} alt={`slide-${index}`}/>
                    </div>
                ))}
            </Slider>
        </div>
    )
}