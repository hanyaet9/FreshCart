import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Puff } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';


function CategoryDetails() {

let {id} = useParams();
// let [categoryDetails , setCategortDetails] = useState()
async function getCategoryDetails(){
   return await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
    // .then((res)=> {
    //     console.log("res" , res.data.data);
    //     setCategortDetails(res.data.data)
        
    // })
    // .catch((err)=> {
    //     console.log("error" ,err);
    // })
}


let {data , isError , isLoading} = useQuery("getCategoryDetails" , getCategoryDetails , {refetchOnMount: false})

    // console.log("productDetails" , data);
    let details = data?.data.data

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

// useEffect(()=> {getCategoryDetails()} , [])

    return <>

<Helmet>
    <title>
    {details.name}
    </title>
</Helmet>


     <div className="container">
    <div className="row my-5 align-items-center mx-auto">

    <div className="col-lg-4 mx-auto">
     <h4 className='text-center'>Category Detail</h4>   
    <div className="categoryDetail mx-auto">
    <figure><img className='w-100' src={details.image} alt={details.slug} /></figure>    
    <div className="right-side">
     <h4 className='text-black text-center'>{details.name}</h4>   
    </div>
    </div>
    </div>    
    </div>
    </div> 
    
    
    </>
}

export default CategoryDetails
