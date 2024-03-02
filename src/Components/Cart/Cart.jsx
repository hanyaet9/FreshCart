import React, { useContext } from 'react'
import { cartContext } from '../../context/CartContext'
import { Puff } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

function Cart() {


let {allCartProducts , totalCartPrice , numOfCartItems , updateProductCount, deleteSpacificProduct, clearCart, cartId} = useContext(cartContext);


if(!allCartProducts){
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

async function updateNewProductCount(id , newCount){

let res = await updateProductCount(id , newCount);
console.log(res);

if(res){toast.success("Your product has been updated", {position:'top-center'})}

else{toast.error("Error..the product has not been updated", {position:'top-center'})}

}

async function myDeletedProduct(id){
   let res = await deleteSpacificProduct(id)
   console.log(res);

if(res){toast.success("Your have deleted your product", {position:'top-center'})}

else{toast.error("Error..the product has not been daleted", {position:'top-center'})}
}

async function myclearCart(){
    let res = await clearCart()

if(res){toast.success("Your have deleted your product", {position:'top-center'})}
else{toast.error("Error..the product has not been daleted", {position:'top-center'})}
}


    return <>

<Helmet>
    <title>
        Cart
    </title>
</Helmet>



{allCartProducts.length? <div className="container vh-100 cart-container mt-3">
<div className="cart-intro d-flex justify-content-between align-items-center px-2">
<div className="intro-left">
<h3 className='pt-4'>Shop Cart:</h3>
<h5 className='text-danger py-3'><span className='price'>Total Cart Price:</span> {totalCartPrice} LE</h5>
</div>
<div className="intro-right d-flex flex-column">
<button onClick={()=> myclearCart()} className='btn btn-outline-danger'><i class="fa-solid fa-broom"></i> Clear Cart</button>

<Link to='/Payment'> <button  className='btn btn-outline-success my-3'><i class="fa-regular fa-credit-card"></i> Confirm Parches</button> </Link>
</div>    
</div>
{allCartProducts?.map((cartProduct , idx) => <div className="row  align-items-center mb-2 border-2 border-bottom "> 
 
<div key={idx} className="row ">

<div className="col-lg-1">
<figure>
<img className='w-100' src={cartProduct.product.imageCover} alt={cartProduct.product.title} />    
</figure>
</div>

<div className="col-lg-10">
<div className="product-details">
<h4>{cartProduct.product.title}</h4>  
<h5>Price: {cartProduct.price}</h5>
<button onClick={()=> myDeletedProduct(cartProduct.product.id)} className='btn btn-outline-success border-0 border-primary border-bottom-1'><i class="fa-regular fa-trash-can"></i> Remove</button>
</div>
</div>

<div className="col-lg-1">
<div className="counter d-flex justify-content-between align-items-center">
<button onClick={()=> updateNewProductCount(cartProduct.product.id , cartProduct.count + 1)} className='btn btn-outline-success p-1 px-2'>+</button> 
<h6 className='mx-2 mb-0'>{cartProduct.count}</h6>
<button disabled={cartProduct.count == 0} onClick={()=> updateNewProductCount(cartProduct.product.id , cartProduct.count - 1)} className='btn btn-outline-success p-1 px-2'>-</button> 
</div>    
</div>

</div>

</div>)}


</div>  : <div className='py-5 my-5'><h2 className='bg-success py-5 my-5 text-white fw-bold text-center'>Your Cart is empty...</h2></div> }

   

    
    
    </>
}

export default Cart
