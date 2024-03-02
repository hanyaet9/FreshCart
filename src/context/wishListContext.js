import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { userDataContext } from './userDataContextProvider';


export let wishListContext = createContext();



function WishListContextProvider({children}) {
let {userToken} = useContext(userDataContext);
let [numOfWishList , setNumOfWishList] = useState(0);
let [allWishListProducts , setAllWishListProducts] = useState([]);

async function getWishlist(){

  return await  axios.get("https://ecommerce.routemisr.com/api/v1/wishlist" , {headers:{token: localStorage.getItem('tkn')}})
    .then((res)=> {
        console.log("wishResponse" , res.data.data);
        setAllWishListProducts(res.data.data)
        setNumOfWishList(res.data.count)
        return res.data
    })
    .then((err)=> {
        console.log("error" , err);
    })
}    


async function deleteWishListProduct(id){

    axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}` , {headers:{token: localStorage.getItem('tkn')}})
    .then((res)=> {
        console.log("delWish" , res);
        setNumOfWishList(res.data.count)
        setAllWishListProducts(res.data.data)
        return res.data
    })
    .catch((err)=> {
        console.log("erroe" ,err);
    })
}







// useEffect(()=> {getWishlist() }, [userToken])


return <wishListContext.Provider value={{deleteWishListProduct , getWishlist , numOfWishList , allWishListProducts}}>
    
    {children}
    
    </wishListContext.Provider>
}

export default WishListContextProvider
