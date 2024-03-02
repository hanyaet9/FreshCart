import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { Puff } from 'react-loader-spinner';
import { Link } from 'react-router-dom';

 function Categories() {
let [allCategories , setAllCategories] = useState(null)
async function getAllCategory(){
   return await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
    .then((res)=> {
        // console.log("res",res.data.data);
        setAllCategories(res.data.data)
        return res.data.data
        
    })
    .catch((err)=> {
        console.log("error" , err);
    })
}



useEffect(()=> {getAllCategory()} , [])


    return <>


<Helmet>
    <title>
        Categories
    </title>
</Helmet>

{allCategories? <div className="container">

<div className="row my-4 gy-5">

{allCategories.map((category , idx)=>  <div key={idx} className="col-lg-3">
<Link to={`/categoryDetails/${category._id}`}><div className="category rounded-2">
<figure><img style={{height: "250px"}} className='w-100 border-1 rounded-2 border-success' src={category.image} alt={category.slug} /></figure>
<p className='text-center fw-bold text-success'>{category.name}</p>  
</div></Link>    
</div>)}   


</div>   

</div> : <div className="d-flex justify-content-center align-items-center vh-100">

<Puff
  visible={true}
  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="puff-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />

</div>}


    </>
}

export default Categories
