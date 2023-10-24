import React from 'react'
import styles from './BrandDetails.module.css'
import axios from 'axios'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { Hourglass } from 'react-loader-spinner'
import Slider from "react-slick";
import { Helmet } from "react-helmet";
export default function BrandDetails() {

  let params = useParams()

  async function getBrandsDetails(brands_id) {

    return await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${brands_id}`)

  }

  let { data, isError, isLoading } = useQuery("brandsDetails", () => getBrandsDetails(params.id))

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
      </div> : <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="w-25 text-align-center">
          <img src={data?.data?.data.image} className='w-100' alt="" />
        </div>
      </div>
      }

    </div>


  )
}
