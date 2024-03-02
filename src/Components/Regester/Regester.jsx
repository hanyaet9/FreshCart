import axios, { Axios } from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { ColorRing } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'


let yupValidation = yup.object({
    name: yup.string().required("Name must be required").min(2, "Name must be at least two Characters").max(10),
    email: yup.string().required("email must have contains @ and .com").email(),
    password: yup.string().required().min(4).max(12),
    rePassword: yup.string().oneOf([yup.ref('password')]),
    phone: yup.string().required("Phone number must be an Egyptian Number").matches(/^01[0125][0-9]{8}$/)
})


function Regester() {

    let userData = {
        name: "",
        email: "",
        password:"",
        rePassword:"",
        phone:""
    }


    let [isSuccess , setisSuccess] = useState(false)
    let [isError , setIsError] = useState(undefined)
    let [isLoading , setIsLoading] = useState(false)
    let navigateUser = useNavigate();



    async function  mySubmit(values){
        console.log("submitted" , values);        
        // let userDataRequest = await
        setIsLoading(true);
         axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup" , values)
        //in right response
        .then(function(res){console.log("success",res),
        setisSuccess(true),
        setTimeout(function(){setisSuccess(false), navigateUser('/login'),2000}),
        setIsLoading(false)}
        )
        //in error response
        .catch(function(res) {console.log("fail",res),
        setIsError(res.response.data.message),
        setTimeout(function(){setIsError(false),2000}),
        setIsLoading(false)}
        )

    }






    // function validatingUserData(){
    //     let errors = {}

// validate:validatingUserData,
    //     return errors
    // }

    const registrationFormik = useFormik(
    {initialValues: userData, onSubmit: mySubmit,  validationSchema: yupValidation}
    )



    return <>

<Helmet>
    <title>
        Register
    </title>
</Helmet>

    
    <div className="register py-5">
    <div className="container">
    <div className="row ">
    <div className="col-lg-12 w-75 mx-auto">
    <div className="register-form">
    {isSuccess? <div className="alert alert-success text-center" > congratulations... Now you have an account </div> : ''}
    {isError? <div className="alert alert-danger text-center" > {isError} </div> : ''}      
    <h4 className=''>Register Now:</h4>    
    <form onSubmit={registrationFormik.handleSubmit} action="">
    <label htmlFor="name">Name:</label>
    <input value={registrationFormik.values.name} onChange={registrationFormik.handleChange} onBlur={registrationFormik.handleBlur}  id='name' className='form-control my-2' type="text"/>
    {registrationFormik.touched.name && registrationFormik.errors.name?<div className="alert alert-danger">{registrationFormik.errors.name}</div>: null}
    <label htmlFor="email">Email:</label>
    <input value={registrationFormik.values.email} onChange={registrationFormik.handleChange} onBlur={registrationFormik.handleBlur} id='email' className='form-control my-2' type="email"/>
    {registrationFormik.touched.email && registrationFormik.errors.email?<div className="alert alert-danger">{registrationFormik.errors.email}</div>: null}
    <label htmlFor="password">Password</label>
    <input value={registrationFormik.values.password} onChange={registrationFormik.handleChange} onBlur={registrationFormik.handleBlur} id='password'className='form-control my-2' type="password"/>
    {registrationFormik.touched.password && registrationFormik.errors.password?<div className="alert alert-danger">{registrationFormik.errors.password}</div>: null}
    <label htmlFor="rePassword">Re-password</label>
    <input value={registrationFormik.values.rePassword} onChange={registrationFormik.handleChange} onBlur={registrationFormik.handleBlur} id='rePassword'className='form-control my-2' type="password"/>
    {registrationFormik.touched.rePassword && registrationFormik.errors.rePassword?<div className="alert alert-danger">{registrationFormik.errors.rePassword}</div>: null}
    <label htmlFor="phone">Phone:</label>
    <input value={registrationFormik.values.phone} onChange={registrationFormik.handleChange} onBlur={registrationFormik.handleBlur} id='phone' className='form-control my-2' type="text"/>
    {registrationFormik.touched.phone && registrationFormik.errors.phone?<div className="alert alert-danger">{registrationFormik.errors.phone}</div>: null}
    <button type='submit' className=' btn mt-2 register-btn'>
    {isLoading? <ColorRing
    visible={true}
    height="30"
    width="30"
    ariaLabel="color-ring-loading"
    wrapperStyle={{}}
    wrapperClass="color-ring-wrapper"
    colors={['#f0f3f2', '#f0f3f2', '#f0f3f2', '#f0f3f2', '#f0f3f2']}/>: 'Register'}
  
  </button>  
    </form>    


    </div>    
    </div>    
    </div>    
    </div>    
    </div>
    
    
    </>
}

export default Regester

