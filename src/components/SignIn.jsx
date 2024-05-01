import React, { useState } from "react";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

const SignIn = () => {

  const [errors, setError] = useState(false);
 
  const [userCerteniel, SetUserCerteniel] = useState({
    name:"",
    email:"",
    password:"",
    userImage:""
  });


  const handekChange = (e)=>{
 SetUserCerteniel({...userCerteniel ,[e.target.name]: e.target.value})
  }

  // resset password
  const handelResetPassword =()=>{
    const email = prompt('Please Enter your email')
    sendPasswordResetEmail(auth, email);
    alert("Emaikl sent , check your inbox for email rest instructions")
  }
  const handelSignIn = async (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, userCerteniel.email, userCerteniel.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        setError(error.message)
        console.log(error);
      });
  };

  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // L'utilisateur est connecté avec succès via Google
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        // Gérer les erreurs
        setError(error.message)
        console.error("Google sign-in error:", error);
      });
  };

  return (
    <div className="signUp">
      <h2>Sign In</h2>
      <form action="#">
        {errors && <p style={{color:"red"}}>{errors}</p>}
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="emain"
            id="email"
            name="email"
            onChange={(e) =>handekChange(e)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={(e) =>handekChange(e)}
          />
        </div>
        <button type="submit" onClick={(e)=>handelSignIn(e)}>
          Sign In
        </button>
        <button onClick={handleGoogleSignIn} class="google-signin">
          Sign In with Google
        </button>
        <p style={{color:"blue",cursor:"pointer"} }onClick={handelResetPassword}>forget password</p>
      </form>
      <div>
        <p>Do not have an account signUp </p>
      </div>
    </div>
  );
};

export default SignIn;
