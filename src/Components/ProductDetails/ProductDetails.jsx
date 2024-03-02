import React, { useContext } from 'react'
import axios from 'axios'
import { Navigate, useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { Puff } from 'react-loader-spinner';
import { cartContext } from '../../context/CartContext';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';

function ProductDetails() {

let {addProductToCart , addToWishList} = useContext(cartContext);  
// console.log("addProductToCart" , addProductToCart);
let {id} = useParams();

async function addProduct(id){

let res = await addProductToCart(id);

// console.log("response from productDetails" , res );
if (res.status === "success"){
toast.success("The product added successfully to your Cart" , {duration: 2000 , position:'bottom-center'})
}
else{toast.error("Sorry... Error occured" , {duration: 2000 , position:'bottom-center'})
}

}

async function addWishList(id){
let res =  await addToWishList(id)

 if (res.status === "success"){

     toast.success("The product added successfully to your Wishlist" , {duration: 2000 , position:'top-center'})
     }
     else{toast.error("Sorry... Error occured" , {duration: 2000 , position:'top-center'})
     }
}

function getProductDetails(){

return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)

}

let {data , isLoading , isError , isFetching} = useQuery(`getProductDetails-${id}` , getProductDetails)

if(isLoading){
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
if(isError){<Navigate to='home'/>}



    return <>

<Helmet>
    <title>
    {data.data.data.title}
    </title>
</Helmet>



    <div className="container py-1">
    <div className="row align-items-center">
    <div className="col-lg-4">
    <figure><img className='w-100' src={data.data.data.imageCover} alt={data.data.data.title} /></figure>    
    </div>

    <div className="col-lg-8">
    <div className="details">
    <div className="wish d-flex justify-content-between align-items-center">
    <h5 className='fw-bold'>{data.data.data.title}</h5>
    <i role='button' onClick={()=> addWishList(data.data.data.id)} class="fa-regular fa-heart me-3 mt-2 fs-4"></i>
    </div>  
    <p className='p-1 desc'>{data.data.data.description}</p>
    <p>{data.data.data.category.name}</p>
    <div className=" d-flex justify-content-between  px-1">
    {data.data.data.priceAfterDiscount ? <h6> <span className='text-decoration-line-through'>{data.data.data.price}</span> <span className='egy'>EGP</span> - {data.data.data.priceAfterDiscount} </h6> : <><h6>{data.data.data.price} <span className='egy'>EGP</span></h6></>}    
    <div className="rate d-flex  "><i class="fa-solid fa-star"></i> <p>{data.data.data.ratingsAverage}</p></div>
    </div>
    <p>id: {data.data.data.id}</p>
    <button onClick={ ()=> addProduct(data.data.data.id) } className='btn bg-main w-100 text-white'>+Add to cart</button>
    </div>
    </div>

    </div>    
    </div>

    
    </>
}

export default ProductDetails
