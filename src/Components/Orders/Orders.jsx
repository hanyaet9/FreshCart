import React, { useContext, useEffect, useState } from 'react'
import { cartContext } from '../../context/CartContext'
import axios from 'axios'
import { Puff } from 'react-loader-spinner'
import { Helmet } from 'react-helmet';

function Orders() {

let {usertId} = useContext(cartContext)
let [allOrders , setAllOrders] = useState(null)

async function getAllOrders(){

 return await  axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${usertId}`)
        .then((res) => {
            // console.log("ana allOrders",res.data);
            setAllOrders(res.data)
            return res.data
        })
        .catch((err)=> {
            console.log("allOrders" , err);
        })
}

useEffect(()=> {getAllOrders()} , [] )


if(!allOrders){
    return <div className="d-flex justify-content-center align-items-center vh-100">

    <Puff
      visible={true}
      height="80"
      width="80"
      color="#4fa94d"
      ariaLabel="puff-loading"
      wrapperStyle={{}}
      wrapperClass=""
      />
    
    </div>
}


    return <>

    <Helmet>
        <title>My Orders</title>
    </Helmet>
    
    <div className="container mt-5 orders">
    <div className="row allorders py-5">
    <h2 className='text-success'>Hi {allOrders[0].user.name} ...</h2>    
    {allOrders.map((order , idx)=> {

      return  <div key={idx} className="col-lg-3">
        <div className="container row innerOrder   my-1">
         {/* <figure><img className='w-100' src={order.imageCover} alt= {order.title} /></figure> */}

         <h6>{order.title}</h6>
         <h6>Payment Method: <span className='text-danger'>{order.paymentMethodType}</span></h6> 
         <h6>Order Price: <span className='text-danger'>{order.totalOrderPrice}</span></h6>
         <p className="info">
        <p>This order is delivering at: {order.shippingAddress.city}</p> 
        <p>On Number: {order.shippingAddress.phone}</p> 
        <p>Details: {order.shippingAddress.details}</p> 
        </p>  
        </div>
        </div>
    })}
    
    </div>    
    </div>
    
    
    </>
}

export default Orders
