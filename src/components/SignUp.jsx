import React, { useState } from "react";
import {createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, TwitterAuthProvider} from 'firebase/auth'
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

    const handleGoogleSignUp = () => {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then((result) => {
          // L'utilisateur est connecté avec succès via Google
          const user = result.user;
          console.log(user);
          navigate('/');
        })
        .catch((error) => {
          // Gérer les erreurs
          console.error('Google sign-up error:', error);
        });
    };
  
    const handleTwitterSignUp = () => {
      const provider = new TwitterAuthProvider();
      signInWithPopup(auth, provider)
        .then((result) => {
          // L'utilisateur est connecté avec succès via Twitter
          const user = result.user;
          console.log(user);
          navigate('/');
        })
        .catch((error) => {
          // Gérer les erreurs
          console.error('Twitter sign-up error:', error);
        });
    };

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
        <button onClick={handleGoogleSignUp} class="google-signin">Sign Up with Google</button>
      <button onClick={handleTwitterSignUp} class="twitter-signin">Sign Up with Twitter</button>
      </form>
      <Link to='/signin'><p>Already have an account login </p></Link> 
    </div>
  );
};

export default SignUp;
