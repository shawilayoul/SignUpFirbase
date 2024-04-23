import React from 'react'
import { useNavigate } from 'react-router-dom'
import {auth} from '../firebase'
import { signOut } from 'firebase/auth'

const HomePage = () => {

    const navigate = useNavigate()
    const handelLogOut = ()=>{
      signOut(auth).then(()=>{
        //Sigh out successfullf
        navigate('/signup')
        
      }).catch((error)=>{
        console.log(error)
      })
    }
  return (
    <div>
       <h1>Welcome to home page</h1>
       <div>
        <button onClick={handelLogOut}>LogOut</button>
       </div>
    </div>
  )
}

export default HomePage
