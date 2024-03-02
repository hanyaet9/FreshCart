import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { cartContext } from '../../context/CartContext'
import toast from 'react-hot-toast';
import axios from 'axios';
import { Helmet } from 'react-helmet';

function Payment() {

let {cartId , getUserCart, clearCart} = useContext(cartContext);    
let homeNavegate = useNavigate()



async function cashPayment(){

let city = document.getElementById('city').value;
let details = document.getElementById('details').value;
let phone = document.getElementById('phone').value;

let shippingAddress = {"shippingAddress":{
            "details": details,
            "phone": phone,
            "city": city
            }}


await  axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}` , shippingAddress, 
  {headers:{token: localStorage.getItem('tkn')}})
    .then((res)=>{
        // console.log("success" , res.data._id);
        if(res.data.status == "success" && city !== null){
            toast.success("Payment has completed successfully", {position:'top-center'});
            // getUserCart();
            clearCart()
            setTimeout(function(){homeNavegate('/home')}, 2000);
            // console.log(cartId);
        }
    })
    .catch((err)=> {
        console.log("fail" , res);
        if(res.data.status ==  "fail"){
            toast.error("Oops.. Payment has not completed successfully")
        }
    })
}    



async function onlinePayment(){

    let city = document.getElementById('city').value;
    let details = document.getElementById('details').value;
    let phone = document.getElementById('phone').value;
    
    let shippingAddress = {"shippingAddress":{
                "details": details,
                "phone": phone,
                "city": city
                }}
    
    
   return await  axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}` , shippingAddress, 
      {headers:{token: localStorage.getItem('tkn')}, params:{url:'http://localhost:3000'}})
        .then((res)=>{
            // console.log("success" , res.data_id);
            if(res.data.status == "success"){
              return  window.open(res.data.session.url , "_self")
            }
        })
        .catch((err)=> {
            console.log("fail" , res);
            if(res.data.status ==  "fail"){
                toast.error("Oops.. Payment has not completed successfully")
            }
        })
    }    




    return <>

    <Helmet>
        <title>
            Payment
        </title>
    </Helmet>
    
    <div className="container ">
    <div className="row my-5">
    <div className="col-lg-8 mx-auto">
    <h4 className='fw-bold'>Payment Time:</h4>    
    <div className="payment pt-3 pb-5">
    <label htmlFor="city">City</label>
    <input id='city' className='form-control my-2' type="text" /> 
    <label htmlFor="phone">Phone</label>
    <input id='phone' className='form-control my-2' type="text" /> 
    <label htmlFor="details">Address</label>
    <textarea id='details' className='form-control my-2' type="text" ></textarea>  
    <div className="payment-types d-flex justify-content-evenly">
    <button onClick={cashPayment}  className='btn bg-main my-3 text-white'><i class="fa-solid fa-money-bill-1-wave mx-1"></i> cache Payment </button>
    <Link to='/Payment'> <button onClick={onlinePayment} className='btn bg-main my-3 text-white'> <i class="fa-regular fa-credit-card mx-1"></i> Online Payment </button> </Link>
    </div>
    </div>    
    </div>    
    </div>    
    </div>
    
    </>
}

export default Payment
