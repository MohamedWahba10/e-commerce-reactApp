import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Layout from './components/Layout/Layout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home/Home';
import Products from './components/Products/Products'
import Categories from './components/Categories/Categories'
import Cart from './components/Cart/Cart'
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import NotFound from './components/NotFound/NotFound';
import Brands from './components/Brands/Brands';
import { useContext, useEffect } from 'react';
import { TokenContext } from './context/tokenContext';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';
import Details from './components/Details/Details';
import Checkout from './components/Checkout/Checkout'
import Allorders from './components/Allorders/Allorders';
import SubCategories from './components/SubCategories/SubCategories';
import BrandDetails from './components/BrandDetails/BrandDetails';
let routers = createBrowserRouter([

  {
    path: "/", element: <Layout />, children: [

      { index: true, element: <ProtectedRoutes> <Home /> </ProtectedRoutes> },
      { path: "products", element: <ProtectedRoutes><Products /> </ProtectedRoutes> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "cart", element: <ProtectedRoutes> <Cart /></ProtectedRoutes> },
      { path: "categories", element: <ProtectedRoutes><Categories /> </ProtectedRoutes> },
      { path: "brands", element: <ProtectedRoutes> <Brands /> </ProtectedRoutes> },
      { path: "details/:id", element: <ProtectedRoutes> <Details /> </ProtectedRoutes> },
      // :id -----> means that id is a variable
      { path: ":id/subcategories", element: <ProtectedRoutes> <SubCategories /> </ProtectedRoutes> },
      { path: "checkout", element: <ProtectedRoutes> <Checkout /> </ProtectedRoutes> },
      { path: "products/details/:id", element: <ProtectedRoutes> <Details /> </ProtectedRoutes> },
      { path: "brands/brandsDetails/:id", element: <ProtectedRoutes> <BrandDetails/> </ProtectedRoutes> },
      { path: "allorders", element: <ProtectedRoutes> <Allorders /> </ProtectedRoutes> },
      { path: "*", element: <NotFound /> }

    ]
  }
])    

function App() {

  let { setToken } = useContext(TokenContext);

  useEffect(() => {

    if (localStorage.getItem("userToken"))
      setToken(localStorage.getItem("userToken"))
  }, [])

  return (
    <RouterProvider router={routers}> </RouterProvider>
  );
}

export default App;
