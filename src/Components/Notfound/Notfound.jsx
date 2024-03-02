import React from 'react'
import error from '../../images/error.svg'
import { Helmet } from 'react-helmet';
function Notfound() {


    return <>
    <Helmet>
        <title>NotFound</title>
    </Helmet>

<div className="container">
<div className="row "> 
<div className="col-lg-12 ">
<div className="notFound ">
<figure className='mx-auto text-center my-5 py-2'><img src={error} alt="Not Found" /></figure>    
</div>
</div>
</div>    
</div>
    
    
    </>
}

export default Notfound
