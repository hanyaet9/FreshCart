import React from 'react'
import amazone from '../../images/amazon-logo-pictures.png'
import american from '../../images/American-Express-Color.png'
import master from '../../images/MasterCard_Logo.svg.png'
import paypal from '../../images/paypal-3.svg'
import Apple from '../../images/apple-app-store-logo.jpg'
import Google from '../../images/Google_Play_Store_badge_EN.svg.webp'



function Footer() {




    return <>
    <div className="footer py-4">
    <div className="container">
    <div className="footer-intro">
    <h4>Get the FreshCart app</h4>
    <p>We will send you a link, open it on your phone to dawnload the app.</p>    
    </div>            
    <div className="row">
    <div className="col-lg-10">
    <input className='form form-control' type="text" placeholder='Email...' />
    </div>  
    <div className="col-lg-2 text-center">
    <button className='btn text-white px-3'>Share App Link</button>
    </div>  

    <div className="row my-5 footer-payment">
    <div className="col-lg-6">
    <div className="payment  py-4 d-flex justify-content-start" >
    <h6 className='fs-4'>Payment Partners</h6>
    <img className='payment-logo ' src={amazone} alt="Amazone" />
    <img className='payment-logo ' src={american} alt="A Express" />
    <img className='payment-logo ' src={master} alt="Master card" />
    <img className='payment-logo ' src={paypal} alt="paypal" />    
    </div>      
    </div> 

    <div className="col-lg-6">
    <div className="stors py-4 d-flex justify-content-end align-items-center">
    <h6>Get Deliveres with FreshCart</h6>  
    <img className='apple' src={Apple} alt="Apple store" />
    <img className='google' src={Google} alt="Google store" />
    </div>   
    </div> 
    
    </div>
    </div>
    </div>
    </div>
    
    
    
    </>
}

export default Footer
