import React from 'react'
import styles from './Register.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import axios from 'axios'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Register() {

  const [isLoading, setIsLoaiding] = useState(false);
  const [apiError, setApierror] = useState("")
  let navigate = useNavigate();

  let validationSchema = Yup.object({

    name: Yup.string().max(15, "Name should be less than 15").min(2, "Name is too short").required("Name is required"),

    email: Yup.string().email("Email is not valid").required("Email is required"),

    password: Yup.string().matches(/^[A-Z][a-z0-9]{5,9}$/, "Password should start with a capital letter").required("Password is required"),

    rePassword: Yup.string().oneOf([Yup.ref('password')], "Passwords do not match").required("Re-enter password is required"),

    phone: Yup.string().matches(/^01[0125][0-9]{8}$/, "Invalid phone number").required("Phone number is required"),


  });

  async function register(values) {

    setApierror("");
    setIsLoaiding("true");
   

    let { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values).catch((err) => {
      setApierror(err.response.data.message)
     // console.log(err);
    })

    //console.log(data);


    if (data.message =="success") {
    //  console.log(data);
      setIsLoaiding(true);
      navigate("/login");
    }


  }

  let formik = useFormik({

    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",

    },
    validationSchema: validationSchema,

    onSubmit: (values) => register(values)
  })


  return (

    <div className="container">

      <h2 className='mt-3 mb-3'> Register :</h2>

      {apiError && <div className='alert alert-danger'>{apiError}</div>}

      <form className="w-75 mx-autp" onSubmit={formik.handleSubmit}>

        <div className='form-group mb-2'>
          <label htmlFor="name">Name</label>
          <input type="text" className='form-control' id='name' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {formik.errors.name && formik.touched.name ? <div className='alert alert-danger'>{formik.errors.name}</div> : ""}


          <label htmlFor="email">Email</label>
          <input type="text" className='form-control' id='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />

          {formik.errors.email && formik.touched.email ? <div className="alert alert-danger">{formik.errors.email}</div> : ""}

          <label htmlFor="password">Password</label>
          <input type="password" className='form-control' id='password' value={formik.values.password} onChange={formik.handleChange} />
          {formik.errors.password && formik.touched.password ? <div className='alert alert-danger'>{formik.errors.password}</div> : ""}
          <label htmlFor="rePassword">RePassword</label>
          <input type="password" className='form-control' id='rePassword' value={formik.values.rePassword} onChange={formik.handleChange} />
          {formik.errors.repassword && formik.touched.repassword ? <div className='alert alert-danger'>{formik.errors.rePassword}</div> : ""}
          <label htmlFor="phone">Phone</label>
          <input type="tel" className='form-control' id='phone' value={formik.values.phone} onChange={formik.handleChange} />
          {formik.errors.phone && formik.touched.phone ? <div className='alert alert-danger'>{formik.errors.phone}</div> : ""}

          {isLoading ? <button className='bg-primary rounded border-0 p-2 mt-4 text-white d-block ms-auto btn mb-5'>
            <i className='fa fa-spin fa-spinner'> </i>
          </button> : <button className='bg-primary rounded border-0 p-2 mt-4 text-white d-block ms-auto btn mb-5' type="submit"> Register</button>

          }

        </div>
      </form>
    </div>

  )
}
