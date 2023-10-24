import React, { useContext, useEffect, useState } from 'react'
import styles from './Cart.module.css'
import { cartContext } from '../../context/cartContex'
import { Hourglass } from 'react-loader-spinner'
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
export default function Cart() {

  let { getcart, deleteCart, updatetoCart, setnumOfCartItems, clearCart } = useContext(cartContext)
  let [cartDetails, setCartDetails] = useState({})
  let [isLoading, setIsLoading] = useState(true);
  let [isEmpty, setisEmpty] = useState(true)

  async function updateCart(id, count) {

    let { data } = await updatetoCart(id, count)


    if (count === 0) {

      removeCart(id);
      // setCartDetails({})

      return
    }
    setCartDetails(data)
   // console.log(data);
  }


  async function removeCart(id) {

    let { data } = await deleteCart(id);
    setCartDetails(data)
    setnumOfCartItems(data.numOfCartItems)
    // console.log(data);
  }

  function empty() {

    if (isEmpty){
      setIsLoading(false)
    }

  }
  async function clear() {

    let { data } = await clearCart();

    setCartDetails({})
    setnumOfCartItems(null)
    // if (data == 'success') {
    setisEmpty(true);
    //window.location.reload(true); 
    //setCartDetails({});
    //setnumOfCartItems(0);
    //  }
    console.log(data);
  }


  async function getCartDetails() {
    try {
      let { data } = await getcart();

      // Check if data is defined before updating state
      if (data) {
        setCartDetails(data);
        setnumOfCartItems(data?.numOfCartItems);
        setisEmpty(false)
        setIsLoading(false)
      }
    } catch (error) {
      console.error("Error fetching cart details:", error);
    }
  }

  useEffect(() => {
    getCartDetails();
  
    setTimeout(function() {
      empty();
    }, 2000);
  }, []);



  return (

    <>

      <Helmet>
        <meta charSet="utf-8" />
        <title>Cart</title>
        <link rel="canonical" href="" />
      </Helmet>



      {
        isLoading ? (<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Hourglass
            visible={true}
            height="80"
            width="80"
            ariaLabel="hourglass-loading"
            wrapperStyle={{}}
            wrapperClass=""
            colors={['#306cce', '#72a1ed']}
          />
        </div>

        ) : (

          cartDetails?.data ? (
            <div className="container mt-3">
              <div style={{ background: 'lightgrey' }} className="w-75 mx-auto p-5">
                <div className="d-flex justify-content-between align-items-center">
                  <h1 style={{ color: 'black', fontWeight: 'bold' }} className='mb-4'>Cart Shop</h1>
                  <button onClick={() => clear()} className='btn btn-danger text-white' > clear</button></div>

                <div className="d-flex justify-content-between align-items-center">
                  <h3 style={{ color: 'black', fontWeight: 'bold' }} className='h5'>Total price: <span className='text-success'>{cartDetails.data.totalCartPrice} EGP</span></h3>
                  <h3 style={{ color: 'black', fontWeight: 'bold' }} className='h5'>Total cart item: <span className='text-success'>{cartDetails.numOfCartItems}</span></h3>
                </div>

                {cartDetails.data.products.map((ele) => {

                  return (
                    <div key={ele.product._id} className="row py-2 border-bottom">
                      <div className="col-md-1">
                        <img className='w-100' src={ele.product.imageCover} alt="" />
                      </div>
                      <div className="col-md-11">
                        <div className="d-flex justify-content-between">
                          <div className="left-side">
                            <h4>{ele.product.title.split(" ").slice(0, 3).join(" ")}</h4>
                            <p> <span style={{ fontWeight: 'bold' }}>price:</span> {ele.price} EGP  </p>
                            <button onClick={() => removeCart(ele.product._id)} className='btn text-danger p-0'><i className='fa fa-trash-can'></i> remove</button>
                          </div>
                          <div className="right-side">
                            <button onClick={() => updateCart(ele.product._id, ele.count - 1)} className='btn btn-success'>-</button>
                            <span className='mx-2'>  {ele.count} </span>
                            <button onClick={() => updateCart(ele.product._id, ele.count + 1)} className='btn btn-success'> + </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );


                })}

                <Link to={"/checkout"} className="btn btn-success w-100 mta">Go to checkout</Link>
              </div>
            </div>
          )


            : (
              <div className="container">
                <div className="bg-success mx-auto w-50 text-white p-5 my-5 text-center">
                  <h2>Your cart is empty</h2>
                </div>
              </div>

            )
        )}
    </>
  );


}



