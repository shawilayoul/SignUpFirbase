import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handelSignIn = async (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth ,email,password)
    .then((userCredential)=>{
        const user = userCredential.user;
        navigate('/')
        console.log(user)
    }).catch((error)=>{
        console.log(error)
    })
  };
  return (
    <div>
      <h2>Sign In</h2>
      <form action="#">
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="emain"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" onClick={handelSignIn}>Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
