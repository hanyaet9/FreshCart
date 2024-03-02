import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import myLogo from '../../images/freshcart-logo.svg'
import { useContext } from 'react'
import { userDataContext } from '../../context/userDataContextProvider'
import { cartContext } from '../../context/CartContext'


function Navbar() {

let {userToken , myToken} = useContext(userDataContext)
// console.log('navToken:' , userToken);
let logOutNavegate = useNavigate();
let {numOfCartItems} = useContext(cartContext);

function loggingOut(){
  myToken(null);
  localStorage.removeItem('tkn');
  logOutNavegate('/login')
}



return <>

<nav className="navbar navbar-expand-lg  pt-3">
<div className="container">
<img src={myLogo} alt="fresh cart" />    
<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">

    

      {userToken? <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/products">Products</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/categories">Categories</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/brands">Brands</Link>
        </li>
        <li className="nav-item position-relative">
          <Link className="nav-link" to="/cart">Cart</Link>
          <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{numOfCartItems? numOfCartItems : ''}</span>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/allorders">My Orders</Link>
        </li></ul>
        : ''}
      
      {userToken? <ul className='icons-list ms-auto list-unstyled mb-0'>
        <li className=''><i class="fa-brands fa-instagram"></i></li>
        <li className=''><i class="fa-brands fa-facebook"></i></li>
        <li className=''><i class="fa-brands fa-tiktok"></i></li>
        <li className=''><i class="fa-brands fa-twitter"></i></li>
        <li className=''><i class="fa-brands fa-linkedin"></i></li>
        <li className=''><i class="fa-brands fa-youtube"></i></li>
        <Link to="/wishlist"><li className='mx-3'><i class="fa-regular fa-heart"></i></li></Link>
        <span onClick={loggingOut} role='button' className='regi'>Logout</span>
      </ul> : 
        <ul className='ms-auto d-flex oof my-auto '>
        <ul className='icons-list ms-auto list-unstyled mb-0'>
        <li className=''><i class="fa-brands fa-instagram"></i></li>
        <li className=''><i class="fa-brands fa-facebook"></i></li>
        <li className=''><i class="fa-brands fa-tiktok"></i></li>
        <li className=''><i class="fa-brands fa-twitter"></i></li>
        <li className=''><i class="fa-brands fa-linkedin"></i></li>
        <li className=''><i class="fa-brands fa-youtube"></i></li>
      </ul>  
        <Link className='regi-logout' to="/login"><li><span>Login</span></li></Link>
        <Link className='regi-logout' to="/register"><li><span>Register</span></li></Link></ul>}
      
        
    </div>
  </div>
</nav>
    
    
    
    </>
}

export default Navbar
