import React, { useEffect, useState } from 'react'
import styles from './SubCategories.module.css'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Hourglass } from 'react-loader-spinner';
export default function SubCategories() {

  let params = useParams();

  let [isLoading, setisLoading] = useState(true)
  let [subcategory, setSubCategoty] = useState([])
  

  async function getSubCategories(category_id) {
    try {
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${category_id}/subcategories`);
     // console.log('Subcategories data:', data);
      setSubCategoty(data.data);
      setisLoading(false);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      setisLoading(false);
    }
  }
  


  useEffect(() => {
    
   // console.log('Fetching subcategories for category_id:', params._id);
    getSubCategories(params.id);
  
    // Cleanup function
    return () => {
      // You can include cleanup logic here if needed
    };
  }, []);
  
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
        </div> :
          <div className="row ">
            {subcategory.map((ele) => (
              <div key={ele.id} className="col-md-12  ">
                <div className="product px-2 py-3 pointer">
                
                    <p style={{ color: 'green', fontWeight: 'bold' }} className='text-center '>{ele.name}</p>


                  

                </div>
              </div>
            ))}
          </div>}

      </div>
    </>
  );
}
