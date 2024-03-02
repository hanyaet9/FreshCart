import axios from 'axios';
import React, { useContext } from 'react'
import toast from 'react-hot-toast';
import { Puff } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { cartContext } from '../../context/CartContext';
import { Helmet } from 'react-helmet';

function Products() {

    let {addProductToCart} = useContext(cartContext);  

    async function addProduct(id){
      let res = await addProductToCart(id)
    //   console.log("res from Home" , res);
    if (res.status === "success"){
        toast.success("The product added successfully to your Cart" , {duration: 2000 , position:'top-center'})
        }
        else{toast.error("Sorry... Error occured" , {duration: 2000 , position:'top-center'})
        }
    
    }
    
    
    async function getAllProducts(){
    
    return axios.get('https://ecommerce.routemisr.com/api/v1/products')
    
    }
    
    
let {data , error , isError , isLoading , isFetching} = useQuery('getAllProducts' , getAllProducts , {refetchOnMount: false});
    
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

    return <>
    
    <Helmet>
    <title>
        Products
    </title>
</Helmet>


<div className="container">
<div className="row mt-3">

{data?.data.data.map((product , idx)=> <div key={idx} className="col-md-2 pt-3">
<Link to={`/productDetails/${product.id}`}><div className="product">
<div className="cover"><img className='w-100 imgCover' src={product.imageCover} alt={product.slug} /></div>
<h5 className='category-gallery px-1 mt-1'>{product.category.name}</h5>
<h4 className='title fw-bold px-1 text-center'>{product.title.split(' ').slice(0 , 2).join(' ')}</h4> 
<div className=" d-flex justify-content-between  px-1">
{product.priceAfterDiscount ? <h6> <span className='text-decoration-line-through'>{product.price}</span> <span className='egy'>EGP</span> - {product.priceAfterDiscount} </h6> : <><h6>{product.price} <span className='egy'>EGP</span></h6></>}    
<div className="rate d-flex  "><i class="fa-solid fa-star"></i> <p>{product.ratingsAverage}</p></div>    
</div>  
</div>
</Link><div className=" text-center"><button onClick={()=>addProduct(product.id)} className='btn bg-main mt-3'>+Add to cart</button></div>    
</div> )} 
</div>   
</div>    
    
    
    
    </>
}

export default Products
