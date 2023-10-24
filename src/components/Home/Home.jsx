import React, { useContext } from 'react'
import styles from './Home.module.css'
import { TokenContext } from '../../context/tokenContext'
import FeatureProducts from '../FeatureProducts/FeatureProducts';
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider';
import MainSlider from '../MainSlider/MainSlider';
import {Helmet} from "react-helmet";
export default function Home() {

  let { token } = useContext(TokenContext);
  console.log(token)

  return (

    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      
      <MainSlider />
      <CategoriesSlider />
      <FeatureProducts />
    </>

  )
}
