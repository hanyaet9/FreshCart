import React, { createContext, useEffect, useState } from 'react'




export let userDataContext = createContext()




export function UserDataContextProvider({children}) {


let [token , setToken] = useState(null)

useEffect(function(){

    let value = localStorage.getItem('tkn')
    if( value !== null){
        setToken(value)}
} , [])
    
    

    return <userDataContext.Provider  value={{userToken: token, myToken: setToken}}>
    
    {children}
    
    </userDataContext.Provider>
}

export default UserDataContextProvider
