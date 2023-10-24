import React, { useContext } from 'react'
import styles from './Details.module.css'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { Hourglass } from 'react-loader-spinner'
import Slider from "react-slick";
import { cartContext } from '../../context/cartContex';
import toast from 'react-hot-toast'
import { Helmet } from "react-helmet";

export default function Details() {
  let { setnumOfCartItems } = useContext(cartContext)
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
    , autoplay: true
  };
  let params = useParams();   // hook to get the variable that I put in the URL (params.id)

  let { addtocart } = useContext(cartContext)

  async function getProductDetails(id) {

    return await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  };


  let { data, isError, isLoading } = useQuery("details", () => getProductDetails(params.id))     //  details => is  unique key 



  async function addcart(id) {

    let res = await addtocart(id)
    if (res.data.status == "success") {
      setnumOfCartItems(res.data.numOfCartItems)
      toast.success("product added Successfully")
    } else { toast.error(" failed to add product") }

  }


  return (

    <div className="container ">

      <Helmet>
        <meta charSet="utf-8" />
        <title>{data?.data?.data.title}</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>


      {isLoading ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Hourglass
          visible={true}
          height="80"
          width="80"
          ariaLabel="hourglass-loading"
          wrapperStyle={{}}
          wrapperClass=""
          colors={['#306cce', '#72a1ed']}
        />
      </div> : <div className="row align-items-center">
        <div className="col-md-4">
          <Slider {...settings}>
            {data?.data?.data.images.map((ele, index) => (<img key={index} src={ele} className='w-100' alt="" />
            ))}
          </Slider>
        </div>
        <div className="col-md-8">
          <h2>{data?.data?.data.title}</h2>
          <p>{data?.data?.data.description}</p>
          <p>{data?.data?.data.category.name}</p>

          <div className="d-flex justify-content-between">
            <h5 className='pe-4'>{data?.data?.data.price} LE</h5>
            <h5> <i style={{ color: 'gold' }} className='fa fa-star rating-color'></i> {data?.data?.data.ratingsAverage}</h5>
          </div>
          <button onClick={() => addcart(data?.data?.data.id)} className='btn bg-success w-100 text-white'>Add to cart</button>
        </div>
      </div>}

    </div>


  )
}
