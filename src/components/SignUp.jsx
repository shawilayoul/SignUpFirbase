import React, { useEffect, useState } from "react";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, TwitterAuthProvider} from "firebase/auth";
import { auth, db } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userSigIn, setUserSignIn] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  //geting user info uid
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUserSignIn(uid);
      } else {
        console.log("logout");
      }
    });
  }, []);

  console.log(userSigIn);

  const handelSignUp = async (e) => {
    e.preventDefault();

    // Vérification de l'UID avant de créer le compte
    const querySnapshot = await getDocs(query(collection(db, "usernames"), where("email", "==", email)));
    if (!querySnapshot.empty) {
      // L'UID existe déjà, informer l'utilisateur
      setError("Cet email est déjà utilisé. Veuillez en choisir un autre.");
      return;
    }

    // L'UID n'existe pas encore, créer le compte utilisateur
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        //Sigined in
        const user = userCredential.user;
        console.log(user);
        // Ajout des données dans la collection "usernames" de la base de données Firestore
        const userReference = addDoc(collection(db, "usernames"), {
          email: user.email,
        });
        console.log(
          "data was added sucessfully to fire store",
          userReference.id
        );
        // Navigation vers la page de connexion
        navigate("/signin");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

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
      {error && <p style={{color:'red' }}>{error}</p>}
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
