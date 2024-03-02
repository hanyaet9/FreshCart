import React, { useContext, useEffect } from 'react'
import { cartContext } from '../../context/CartContext'
import toast from 'react-hot-toast';
import { wishListContext } from '../../context/wishListContext';
import { Puff } from 'react-loader-spinner';
import { Helmet } from 'react-helmet';

function WishList() {
    let {allWishListProducts, deleteWishListProduct, getWishlist, numOfWishList} = useContext(wishListContext)
let {addToWishList} =useContext(cartContext);

// if(allWishListProducts !== null){
// return <div className="d-flex justify-content-center align-items-center vh-100">

// <Puff
//   visible={true}
//   height="80"
//   width="80"
//   color="#4fa94d"
//   ariaLabel="puff-loading"
//   wrapperStyle={{}}
//   wrapperClass=""
//   />

// </div>
// }

async function myDeletedWishListProduct(id){
    let res = await deleteWishListProduct(id)
    console.log(res);
 
 if(res){toast.success("Your have deleted your product", {position:'top-center'})}
 
 else{toast.error("Error..the product has not been daleted", {position:'top-center'})}
 }


useEffect(()=> {getWishlist()} , [])

    return <>

<Helmet>
    <title>
        Wishlist
    </title>
</Helmet>


{allWishListProducts.length? <div className="container">
{allWishListProducts?.map((wish , idx)=> <div className="row align-items-center orders px-2 my-5">

<div key={idx} className="col-lg-3">
<div className="wishist">
<figure><img className='w-100' src={wish.imageCover} alt={wish.name} /></figure>    
</div> 
</div>  

<div className="col-lg-9">
<div className="row"> 
<div className="wishDescription">
<h4>{wish.title}</h4> 
<div className="lenth d-flex justify-content-between"><h5 className='text-success'>{wish.category.name}</h5> <h5>{wish.brand.name}</h5></div>
<div className='d-flex justify-content-between '><p>{wish.description.split(' ').slice(0 , 8).join(' ')}</p>
<i role='button' onClick={()=> myDeletedWishListProduct(wish._id)} class="fa-regular fa-heart me-3 mt-2 fs-4"></i>

</div>   
<p>{wish.price}</p>
</div>
</div>    
</div>
</div> )}   
</div> : <div className='my-5 py-5'><h2 className='bg-success display-2 my-5 py-4 text-white text-center'>Your Wishlist is empty...</h2></div>}   

    
    </>
}
export default WishList
