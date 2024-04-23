import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, TwitterAuthProvider } from "firebase/auth";
import { useNavigate ,Link} from "react-router-dom";
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
        console.error('Google sign-in error:', error);
      });
  };
  
  const handleTwitterSignIn = () => {
    const provider = new TwitterAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // L'utilisateur est connecté avec succès via Twitter
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        // Gérer les erreurs
        console.error('Twitter sign-in error:', error);
      });
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
        <button onClick={handleGoogleSignIn} class="google-signin">Sign In with Google</button>
        <button onClick={handleTwitterSignIn} class="twitter-signin">Sign In with Twitter</button>
      </form>
      <Link to='/signup'><p>Do not have an account signUp </p></Link> 
    </div>
  );
};

export default SignIn;