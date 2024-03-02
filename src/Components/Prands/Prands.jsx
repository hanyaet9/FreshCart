import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react';
import { Puff } from 'react-loader-spinner'
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

function Prands() {

let [allBrands , setAllBrands] = useState(null);


async function getAllBrands(){

    return await axios.get("https://ecommerce.routemisr.com/api/v1/brands")
    .then((res)=> {
        // console.log("res" , res.data.data);
        setAllBrands(res.data.data)
        return res.data.data
    })
    .catch((err)=> {
        console.log("err" , err);
    })
}

useEffect(()=> {getAllBrands()} , [])







    return <>

<Helmet>
    <title>
        Prands
    </title>
</Helmet>

{allBrands? <div className="container">
<div className="row py-5 gy-4 gx-3">

{allBrands.map((brand , idx)=>  <div key={idx} className="col-lg-3">
<Link to={`/brandDetails/${brand._id}`}><div className="allBrands ">
<figure><img src={brand.image} alt={brand.slug} /></figure>
<h5 className='text-success text-center'> {brand.name} </h5>    
<p>{brand.id}</p>
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

export default Prands
