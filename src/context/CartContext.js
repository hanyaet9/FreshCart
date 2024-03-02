import axios from 'axios'
import React, { useContext, useState } from 'react'
import { createContext } from 'react'
import { userDataContext } from './userDataContextProvider'
import { useEffect } from 'react'

export let cartContext = createContext()

export default function CartContextProvider({ children }) {

let {userToken} = useContext(userDataContext);
   let [numOfCartItems , setNumOfCartItems]= useState(0)
   let [totalCartPrice , setTotalCartPrice] = useState(0)
   let [allCartProducts , setAllCartProducts] = useState([])
   let [cartId , setCartId] = useState(null)
   let [usertId , setUserId] = useState(null)


  // console.log("cartId" , cartId);
// there is error here?????
  async function getUserCart(){
   return await axios.get("https://ecommerce.routemisr.com/api/v1/cart" , {headers: {token: localStorage.getItem('tkn')}})
    .then((res)=>{
      // console.log("hani" , res.data);
    setAllCartProducts(res.data.data.products)
    setNumOfCartItems(res.data.numOfCartItems)
    setTotalCartPrice(res.data.data.totalCartPrice)
    setCartId(res.data.data._id)
    setUserId(res.data.data.cartOwner)
    localStorage.setItem("userId" , res.data.data.cartOwner)

    return res.data})
    .catch((err)=>{console.log("error" , err);})
    
   }

async function updateProductCount(id , newCount){

  return await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {"count": newCount} , 
    {headers:{token: localStorage.getItem('tkn')}})
    .then((res)=> { 
        // console.log(res.data);
        setNumOfCartItems(res.data.numOfCartItems)
        setTotalCartPrice(res.data.data.totalCartPrice)
        setAllCartProducts(res.data.data.products)
        return res.data
     })
    
    .catch((err)=> {console.log("erroe" , res.data);
     })
           
   }
// updateCart
async function addProductToCart(id){

return await axios.post('https://ecommerce.routemisr.com/api/v1/cart' , {"productId": id} ,
        {headers : {token : localStorage.getItem('tkn')}})
        
        .then((res)=>{ console.log("response from CartContext", res.data , getUserCart() ); return res.data    
     })
        .catch((err)=>{console.log("error")});

    }

async function deleteSpacificProduct(id){
   return await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {headers:{token: localStorage.getItem('tkn')}})
    .then((res)=> {
        setNumOfCartItems(res.data.numOfCartItems)
        setTotalCartPrice(res.data.data.totalCartPrice)
        setAllCartProducts(res.data.data.products)
      return res.data

    })
    .catch((err)=> {
        console.log("erroe" , err);
    })

}

async function clearCart(){
    return await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {headers:{token: localStorage.getItem('tkn')}})
    .then((res)=> {
        setNumOfCartItems(0)
        setTotalCartPrice(0)
        setAllCartProducts([])
      return res.data

    })
    .catch((err)=> {
        console.log("erroe" , err);
    })
}


async function addToWishList(id){
return  await  axios.post("https://ecommerce.routemisr.com/api/v1/wishlist" , {"productId": id} ,
{headers:{token: localStorage.getItem('tkn')}})
.then((res)=> {
console.log("wish res" ,res.data);
return res.data
})
.catch((err)=> {
  console.log("wish error" , err);
})

}

    useEffect(()=> {getUserCart() }, [userToken])

    return <cartContext.Provider value={{addProductToCart , numOfCartItems , totalCartPrice , allCartProducts, updateProductCount,
     deleteSpacificProduct, clearCart, cartId, getUserCart, usertId, addToWishList}}>
    {children}
    
    </cartContext.Provider>
}

