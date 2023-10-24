import React, { useEffect, useState } from 'react'
import styles from './Brands.module.css'
import axios from 'axios';
import { Hourglass } from 'react-loader-spinner';
import { Link } from 'react-router-dom';

export default function Brands() {

  let [Brands, setBrands] = useState([])
  let [isLoading, setisLoading] = useState(true)

  async function getBrands() {
    try {
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
      setBrands(data.data);
      setisLoading(false);
     // console.log("leoo", data.data);
    } catch (error) {
      // console.error("Error fetching brands:", error);
      setisLoading(false); // Set loading to false even in case of an error
    }
  }

  useEffect(() => {
    getBrands();

    // Cleanup function
    return () => {
      // You can include cleanup logic here if needed   ******(this  ComponentWillUnmount)********
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
        <div className="row " > 
          {Brands.map((ele) => (
            <Link key={ele._id} className="col-md-2 " to={"brandsDetails/" + ele._id}>
              <div className="product px-2 py-3 pointer">
                <div className='text-decoration-none' >
                  <img src={ele.image} className='w-100' alt={ele.title} />
                  <p style={{ color: 'green' ,fontWeight:'bold'}} className='text-center '>{ele.name}</p>
                

                </div>

              </div>
            </Link>
          ))}
        </div>}

    </div>
  </>
);
}





// export default function Brands() {
//   let [Brands, setBrands] = useState([])
//   let [isLoading, setisLoading] = useState(true)

//   useEffect(() => {
//     const CancelToken = axios.CancelToken;
//     const source = CancelToken.source();

//     async function getBrands() {
//       try {
//         let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`, {
//           cancelToken: source.token
//         });
//         setBrands(data.data);
//         setisLoading(false);
//         console.log("leoo", data.data);
//       } catch (error) {
//         if (axios.isCancel(error)) {
//           console.log('Request canceled', error.message);
//         } else {
//           console.error("Error fetching brands:", error);
//           setisLoading(false); // Set loading to false even in case of an error
//         }
//       }
//     }

//     getBrands();

//     // cleanup function to cancel the request on component unmount
//     return () => {
//       source.cancel('Operation canceled by the user.');
//     }
//   }, [])

