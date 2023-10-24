import React from 'react'
import styles from './CategoriesSlider.module.css'
import { useQuery } from 'react-query'
import axios from 'axios'
import Slider from "react-slick";
export default function CategoriesSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1
    , autoplay: true
  };
  async function getCategoriesSlider() {

    return await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }

  let { data } = useQuery("allCategories", getCategoriesSlider)
 // console.log(data);

  return (
    <>
      <h2 className='text-black mt-2 ms-3'> shop popular categories</h2>

      <Slider {...settings}>
        {data?.data?.data.map((ele) => <> <img height={300} className='w-100 mt-2' src={ele.image} alt="" />
          <h4>{ele.name}</h4>
        </>
        )}
      </Slider>
    </>
  )
}
