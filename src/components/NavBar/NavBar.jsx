import React, { useContext } from 'react'
import styles from './NavBar.module.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assests/images/freshcart-logo.jpg'
import { TokenContext } from '../../context/tokenContext';
import { cartContext } from '../../context/cartContex';


export default function NavBar() {

  let pathName = useLocation();


  let links = [
    { path: "/", link: "home" },
    { path: "/cart", link: "cart" },
    { path: "/categories", link: "categories" },
    { path: "/products", link: "products" },
    { path: "/brands", link: "brands" }
  ];

  console.log('pathName:', pathName);

  let { numOfCartItems } = useContext(cartContext);

  let { token, setToken } = useContext(TokenContext);
  let navigate = useNavigate()
  function logout() {

    localStorage.removeItem("userToken")

    setToken(null)
    navigate("/login")


  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <Link style={{ width: '10rem' }} className="navbar-brand" to={"/"}>
          <img className="w-100" src={logo} alt="" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>


        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {token ?


            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

              {links.map((link) => <li className="nav-item" key={link.path}>
                <Link className={pathName.pathname === link.path ? `nav-link  bg-success text-white rounded` : "nav-link"} to={link.path} >{link.link}</Link>
              </li>


              )}

            </ul> : ""
          }

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
            <li className="nav-item">
              <i className="fab fa-facebook-f mx-1"></i>
              <i className="fab fa-instagram mx-1"></i>
              <i className="fab fa-twitter mx-1"></i>
              <i className="fab fa-tiktok mx-1"></i>
              <i className="fab fa-youtube mx-1"></i>
              <i className="fab fa-linkedin mx-2"></i>
            </li>

            {token ? <>
              <li className="nav-item">
                <button className="nav-link active" aria-current="page" onClick={logout} to={"/login"}>LogOut</button>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to={"/cart"}>
                  <i className='fa fa-shopping-cart text-success'>

                    <span className='ms-1 p-2 rounded-circle bg-success text-white text-center small'>{numOfCartItems}</span>
                  </i>


                </Link>
              </li>
            </> :
              <>
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to={"/register"}>Register</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to={"/login"}>Login</Link>
                </li>

              </>}


          </ul>

        </div>
      </div>
    </nav>
  );
}
