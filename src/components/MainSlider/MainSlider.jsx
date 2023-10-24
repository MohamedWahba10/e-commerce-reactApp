import React from 'react'
import styles from './MainSlider.module.css'
import mainimg from '../../assests/images/leo-hoodie.jpg';
import mainimg2 from '../../assests/images/Screenshot (38).jpg';
import mainimg3 from '../../assests/images/Screenshot (37).jpg';
import blog1 from '../../assests/images/Screenshot (40).jpg';
import blog2 from '../../assests/images/Screenshot (39).jpg';
import Slider from "react-slick";
export default function MainSlider() {

  var settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1
    , autoplay: true
  };


  return (
    <div className="container mt-2">
      <div className="row">
        <div className="col-md-9">
          <Slider {...settings}>

            <img height={400} src={mainimg} className='w-100' alt="" />
            <img height={400} src={mainimg2} className='w-100' alt="" />
            <img height={400} src={mainimg3} className='w-100' alt="" />


          </Slider>
        </div>
        <div className="col-md-3">
          <img height={200} src={blog1} className='w-100' alt="" />
          <img height={200} src={blog2} className='w-100' alt="" />
        </div>
      </div>

    </div>
  )
}
