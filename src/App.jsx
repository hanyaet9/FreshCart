import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Components/Layout/Layout';
import Regester from './Components/Regester/Regester';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
import Notfound from './Components/Notfound/Notfound';
import { UserDataContextProvider } from './context/userDataContextProvider';
import ProtectedRouter from './Components/ProtectedRouter/ProtectedRouter';
import Products from './Components/Products/Products';
import Prands from './Components/Prands/Prands';
import Cart from './Components/Cart/Cart';
import Categories from './Components/Categories/Categories';
import { QueryClient, QueryClientProvider } from 'react-query';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import CartContextProvider from './context/CartContext';
import { Toaster } from 'react-hot-toast';
import Payment from './Components/Payment/Payment';
import Orders from './Components/Orders/Orders';
import CategoryDetails from './Components/CategoryDetails/CategoryDetails';
import WishList from './Components/WishList/WishList';
import BrandDetails from './Components/BrandDetails/BrandDetails';
import WishListContextProvider from './context/wishListContext';
import { Offline } from 'react-detect-offline';



const myRouter = createBrowserRouter([
  {path:'/' , element: <Layout/> , children:[
  {index: true, element: <Regester/>}, 
  {path: 'register' , element: <Regester/>},  
  {path: 'login' , element: <Login/>},
  {path: 'home' , element: <ProtectedRouter><Home/></ProtectedRouter>},
  {path: 'products' , element: <ProtectedRouter><Products/></ProtectedRouter>},
  {path: 'productDetails/:id' , element: <ProtectedRouter><ProductDetails/></ProtectedRouter>},
  {path: 'categoryDetails/:id' , element: <ProtectedRouter><CategoryDetails/></ProtectedRouter>},
  {path: 'brands' , element: <ProtectedRouter><Prands/></ProtectedRouter>},
  {path: 'brandDetails/:id' , element: <ProtectedRouter><BrandDetails/></ProtectedRouter>},
  {path: 'cart' , element: <ProtectedRouter><Cart/></ProtectedRouter>},
  {path: 'wishlist' , element: <ProtectedRouter><WishList/></ProtectedRouter>},
  {path: 'categories' , element: <ProtectedRouter><Categories/></ProtectedRouter>},
  {path: 'allorders' , element: <ProtectedRouter><Orders/></ProtectedRouter>},
  {path: 'payment' , element: <ProtectedRouter><Payment/></ProtectedRouter>},
  {path: '*' , element: <Notfound/>}
  ] }
])


function App() {

  let api = new QueryClient()

  return <>


  <QueryClientProvider client={api}>
  <UserDataContextProvider>
  <CartContextProvider>
  <WishListContextProvider> 
  <RouterProvider router={myRouter}/>
  </WishListContextProvider>
  </CartContextProvider>
  </UserDataContextProvider>
  </QueryClientProvider>
  <Toaster/>

<Offline>
<div className="bg-danger text-center text-white my-3 fixed-bottom">Check your internet conection</div>
</Offline>

  </>
}

export default App

