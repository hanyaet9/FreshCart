import axios, { Axios } from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useContext } from 'react'
import { ColorRing } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { userDataContext } from '../../context/userDataContextProvider'
import { Helmet } from 'react-helmet'


let yupValidation = yup.object({
    email: yup.string().required("email must have contains @ and .com").email(),
    password: yup.string().required().min(4).max(12),
})


function Regester() {

    let userData = {
        email: "",
        password:"",
    }


    let [isSuccess , setisSuccess] = useState(false)
    let [isError , setIsError] = useState(undefined)
    let [isLoading , setIsLoading] = useState(false)
    let navigateUser = useNavigate();
    let {myToken} = useContext(userDataContext)


    async function  mySubmit(values){
       
        setIsLoading(true);
          axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin" , values)
        //in right response
        .then(function(res){
           
        if(res.data.message == "success"){
            localStorage.setItem("tkn",res.data.token);
            myToken(res.data.token);
            
        setisSuccess(true),
        setTimeout(function(){setisSuccess(false), navigateUser('/home'),2000}),
        setIsLoading(false)}

        })

        
        //in error response
        .catch(function(res){console.log("fail",res),
        console.log(res.response.data.message);
        setIsError(res.response.data.message),
        setTimeout(function(){setIsError(false),2000}),
        setIsLoading(false)}
        )

    }



    const registrationFormik = useFormik(
    {initialValues: userData, onSubmit: mySubmit,  validationSchema: yupValidation}
    )



    return <>

    <Helmet>
        <title>LogIn</title>
    </Helmet>
    
    <div className="register py-5">
    <div className="container">
    <div className="row pb-5">
    <div className="col-lg-12 w-75 mx-auto pb-3">
    <div className="register-form pt-5">
    {isSuccess? <div className="alert alert-success text-center" > Welcome </div> : ''}
    {isError? <div className="alert alert-danger text-center" > {isError} </div> : ''}      
    <h4 className='mt-3'>Login Now:</h4>    

    <form onSubmit={registrationFormik.handleSubmit} action="">
    <label htmlFor="email">Email:</label>
    <input value={registrationFormik.values.email} onChange={registrationFormik.handleChange} onBlur={registrationFormik.handleBlur} id='email' className='form-control my-2' type="email"/>
    {registrationFormik.touched.email && registrationFormik.errors.email?<div className="alert alert-danger">{registrationFormik.errors.email}</div>: null}
    <label htmlFor="password">Password</label>
    <input value={registrationFormik.values.password} onChange={registrationFormik.handleChange} onBlur={registrationFormik.handleBlur} id='password'className='form-control my-2' type="password"/>
    {registrationFormik.touched.password && registrationFormik.errors.password?<div className="alert alert-danger">{registrationFormik.errors.password}</div>: null}
    <button type='submit' className=' btn mt-2 register-btn '>
    {isLoading? <ColorRing
    visible={true}
    height="30"
    width="30"
    ariaLabel="color-ring-loading"
    wrapperStyle={{}}
    wrapperClass="color-ring-wrapper"
    colors={['#f0f3f2', '#f0f3f2', '#f0f3f2', '#f0f3f2', '#f0f3f2']}/>: 'Login'}
  
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


