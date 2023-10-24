import React, { useContext, useEffect, useState } from 'react';
import styles from './FeatureProducts.module.css';
import axios from 'axios';
import { Hourglass } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { cartContext } from '../../context/cartContex';
import toast from 'react-hot-toast';

export default function FeatureProducts() {

  let [products, setproducts] = useState([])
  let [isLoading, setisLoading] = useState(true)

  let { addtocart, setnumOfCartItems } = useContext(cartContext)


  async function getProduct() {
    let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products')

    setproducts(data.data);
    setisLoading(false)

  }

  useEffect(() => {

    getProduct()
  }, [])


  async function addCart(id) {

    let res = await addtocart(id)
    if (res.data.status == "success") {
      setnumOfCartItems(res.data.numOfCartItems)
      toast.success("product added Successfully")
    } else { toast.error(" failed to add product") }

  }
  return (
    <>
      <div className="container  py-5">
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
        </div> : <div className="row ">

          {products.map((ele) => <div key={ele.id} /*  this key is for virtual DOM */ className="col-md-2">
            <div className="product px-2 py-3">

              <Link className='text-decoration-none' to={"details/" + ele.id}>  {/* concate the id of the product to the url of routing */}
                <img src={ele.imageCover} className='w-100 ' alt={ele.title} />
                <p style={{ color: 'blue' }} className='text-center'>{ele.category.name}</p>
                <h3 style={{ color: 'black', fontWeight: 'bold' }} className='h6 text-black text-center '>{ele.title.split(" ").slice(0, 3).join(" ")}</h3>
                <div className="d-flex text-black justify-content-center">

                  <p className='pe-4'>{ele.price} EGP</p>
                  <p>
                    <i style={{ color: 'gold' }} className='fa fa-star rating-color'></i>
                    {ele.ratingsAverage}
                  </p>

                </div> </Link>

              <button onClick={() => addCart(ele.id)} className='btn bg-success w-100 text-white'>Add to cart</button>
            </div>
          </div>
          )}

        </div>}

      </div>

    </>
  )
}
