import React from 'react'
import styles from './Products.module.css'
import FeatureProducts from '../FeatureProducts/FeatureProducts';
import {Helmet} from "react-helmet";

export default function Products() {
 

  return (



    <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>products</title>
      <link rel="canonical" href="http://mysite.com/example" />
    </Helmet>
    

    <FeatureProducts />
  </>
  )
}
