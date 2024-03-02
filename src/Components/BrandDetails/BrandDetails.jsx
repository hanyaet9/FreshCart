import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { Puff } from 'react-loader-spinner';
import { useParams } from 'react-router-dom'

function BrandDetails() {

let {id} = useParams();
let [brandDetail , setBrandDetail] = useState(null)

   async function getCategoryDetails(){
return await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
    .then((res)=> {
        console.log("brandDetails" , res);
        setBrandDetail(res.data.data)
        return res.data.data
    })
    .catch((err)=> {
        console.log("error" , err);
    })

   } 



useEffect(()=> {getCategoryDetails()} , [])

    return <>


<Helmet>
    <title>
    {brandDetail?.name}
    </title>
</Helmet>


{brandDetail? <div className="container">
<div className="row py-5 my-5">
  <div className="col-lg-4 mx-auto">
<div className="brandDetails">
<figure className='text-center'><img src={brandDetail.image} alt={brandDetail.slug} /></figure>
<h4 className='text-center text-success fw-bold'> {brandDetail.name} </h4>
</div>    
</div> 
   

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

export default BrandDetails
