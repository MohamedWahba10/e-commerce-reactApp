import axios from "axios";
import { createContext, useEffect, useState } from "react";


export let cartContext = createContext();

let headers = {

  token: localStorage.getItem("userToken")
}


function addtocart(id) {
  return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
    {
      productId: id,
    },
    {
      headers: headers,
    }
  )
    .then((res) => res)
    .catch((err) => err);
}

//  value={ addtocart}  --> this means that when using the useContex(),all compntent will see the function ( addtocart() ) as it is putted in the value



function getcart() {
  return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,

    {
      headers: headers,
    }
  )
    .then((res) => res)
    .catch((err) => err);
}

function deleteCart(id) {
  return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,

    {
      headers: headers,
    }
  )
    .then((res) => res)
    .catch((err) => err);
}

function clearCart() {

  return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,

    {
      headers ,
    }
  )
    .then((res) => res)
    .catch((err) => err);
}

function updatetoCart(id,count) {
  return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
    {
      "count": count
    },

    {
      headers: headers,
    }
  )
    .then((res) => res)
    .catch((err) => err);
}

export default function CartContextProvider(props) {  //first letter of context function must be capitallllll

  const [numOfCartItems, setnumOfCartItems] = useState(null)

  const [cardID, setcardID] = useState(null)


/* ********** */ async function getInitialCart() {

    let { data } = await getcart();
    setnumOfCartItems(data?.numOfCartItems);     // this function is like a bridge to get the data first (async & await)  then set it to variable numOFCartItems
    setcardID(data?.data._id)
  }

  function onlinePayment(shippingAddress) {  // this function is here  to be in the scop of CartContextProvide  to bind in the URL API
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cardID}?url=http://localhost:3000`,
      {
  
        shippingAddress: shippingAddress,
      },
      {
        headers: headers,
      }
    )
      .then((res) => res)
      .catch((err) => err);
  }
  

  useEffect(() =>
    getInitialCart()
    , [])


  return <cartContext.Provider value={{ addtocart, getcart, deleteCart, updatetoCart, onlinePayment, numOfCartItems, setnumOfCartItems,clearCart }}>

    {props.children}

  </cartContext.Provider>


}
