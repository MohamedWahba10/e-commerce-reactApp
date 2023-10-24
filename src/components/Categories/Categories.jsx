import React, { useEffect, useState } from 'react'
import styles from './Categories.module.css'
import axios from 'axios'
import { Link } from 'react-router-dom';

export default function Categories() {

  let [category, setCategoty] = useState([])

  async function getcategories() {


    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    setCategoty(data.data)
   // console.log(data.data);
  }


 


  useEffect(() => {
    getcategories();

    // Cleanup function
    return () => {
      // You can include cleanup logic here if needed   ******(this  ComponentWillUnmount)********
    };
  }, []);


  

    return (
      <div className="container mt-5">
        {category.map((ele) => (
          <Link key={ele.id} className="row py-2 border-bottom" to={`/${ele._id}/subcategories`}>

            <div className="col-md-1 ">
              <img  style={{ cursor: 'pointer' }} className="w-100 pointer" height={100} src={ele.image} alt="" />
            </div>
            <div   className="col-md-11">
              <div style={{ cursor: 'pointer' }} className="d-flex justify-content-between pointer">
                <h4>{ele.name}</h4>
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
        }