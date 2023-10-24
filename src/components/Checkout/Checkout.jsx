import React, { useContext } from 'react'
import styles from './Checkout.module.css'
import { useFormik } from 'formik'
import { cartContext } from '../../context/cartContex'

export default function Checkout() {


  let { onlinePayment } = useContext(cartContext)

  async function payment(values) {

    let data = await onlinePayment(values)
   console.log(data );
    window.location.href=data.data.session.url    // to open this URL in another window 

  }
  let formik = useFormik({


    initialValues: {

      "details": "",
      "phone": "",
      "city": ""

    },
    onSubmit: payment
  })




  return (

    <>
      <div className="container">
        <div style={{ background: 'lightgrey' }} className="p-5 mx-auto">
          <h2>Shipping address </h2>
          <form onSubmit={formik.handleSubmit}>

            <div className="form-group mb-3">
              <label htmlFor="details">details</label>
              <input type="text" className='form-control' name='details' id='details' value={formik.values.details} onChange={formik.handleChange} />

            </div>
            <div className="form-group mb-3">
              <label htmlFor="phone">phone</label>
              <input type="text" className='form-control' name='phone' id='phone' value={formik.values.phone} onChange={formik.handleChange} />

            </div>

            <div className="form-group mb-3">
              <label htmlFor="city">city</label>
              <input type="text" className='form-control' name='city' id='city' value={formik.values.city} onChange={formik.handleChange} />

            </div>
            <button  type='submit' className='btn btn-success w-25 mt "'> pay now</button>
          </form>
        </div>
      </div>

    </>


  )
}
