import React, { useContext, useState } from 'react'
import styles from './Login.module.css'
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios'
import { TokenContext } from '../../context/tokenContext';


export default function Login() {
  const [isLoading, setIsLoaiding] = useState(false);
  const [apiError, setApierror] = useState("")
  let navigate = useNavigate();
  let { setToken } = useContext(TokenContext)
  let validationSchema = Yup.object({



    email: Yup.string().email("Email is not valid").required("Email is required"),

    password: Yup.string().matches(/^[A-Z][a-z0-9]{5,9}$/, "Password should start with a capital letter").required("Password is required"),

  });

  async function login(values) {

    setApierror("");
    setIsLoaiding("true");

    let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values).catch((err) => {
      setApierror(err.response.data.message)
    })

    if (data.message == "success") {
      setIsLoaiding(true);
      localStorage.setItem("userToken", data.token);
      setToken(data.token);

      navigate("/");

    }


  }

  let formik = useFormik({

    initialValues: {

      email: "",
      password: "",

    },
    validationSchema: validationSchema,

    onSubmit: (values) => login(values)
  })


  return (

    <div className="container">

      <h2 className='mt-3 mb-3'>Login :</h2>

      {apiError && <div className='alert alert-danger'>{apiError}</div>}

      <form className="w-75 mx-autp" onSubmit={formik.handleSubmit}>

        <div className='form-group mb-2'>


          <label htmlFor="email">Email</label>
          <input type="text" className='form-control' id='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />

          {formik.errors.email && formik.touched.email ? <div className="alert alert-danger">{formik.errors.email}</div> : ""}

          <label htmlFor="password">Password</label>
          <input type="password" className='form-control' id='password' value={formik.values.password} onChange={formik.handleChange} />
          {formik.errors.password && formik.touched.password ? <div className='alert alert-danger'>{formik.errors.password}</div> : ""}


          {isLoading ? <button className='bg-primary rounded border-0 p-2 mt-4 text-white d-block ms-auto btn mb-5'>
            <i className='fa fa-spin fa-spinner'> </i>
          </button> : <button disabled={!(formik.isValid && formik.dirty)} className='bg-primary rounded border-0 p-2 mt-4 text-white d-block ms-auto btn mb-5' type="submit">login</button>

          }

        </div>
      </form>
    </div>

  )
}
