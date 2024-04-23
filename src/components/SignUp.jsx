import React, { useState } from "react";
import {createUserWithEmailAndPassword} from 'firebase/auth'
import { auth } from "../firebase";
import { useNavigate,Link} from "react-router-dom";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const handelSignUp = async(e)=>{
     e.preventDefault()
     await createUserWithEmailAndPassword(auth ,email,password).
      then((userCredential)=>{
        //Sigined in
        const user = userCredential.user;
        console.log(user)
        //navgiate to login page
        navigate('/signin')
      })
      .catch((error)=>{
        console.log(error.meassage)
      })
    }
  return (
    <div>
      <h2>Sign up</h2>
      <form action="#">
        <div>
          <label htmlFor="email">Email</label>
          <input type="emain" id="email" onChange={(e)=>setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" onChange={(e)=>setPassword(e.target.value)} />
        </div>
        <button type="submit" onClick={handelSignUp}>Sign Up</button>
      </form>
      <Link to='/signin'><p>Already have an account login </p></Link> 
    </div>
  );
};

export default SignUp;
