import "./signUp.css";
import { useState } from "react";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "../firebase";

const SignUp = ({ userCerteniel, SetUserCerteniel }) => {
  const [error, setError] = useState("");
  const [logType, setLoginType] = useState("login");
  
  const handelChange = (e) => {
    SetUserCerteniel({ ...userCerteniel, [e.target.name]: e.target.value });
  };

  //uploading image

  const handelSignUp = async (e) => {
    e.preventDefault();
    // Vérification de l'UID avant de créer le compte
    const querySnapshot = await getDocs(
      query(
        collection(db, "usernames"),
        where("email", "==", userCerteniel.email)
      )
    );
    if (!querySnapshot.empty) {
      // L'UID existe déjà, informer l'utilisateur
      setError("Cet email est déjà utilisé. Veuillez en choisir un autre.");
      return;
    }

    // L'UID n'existe pas encore, créer le compte utilisateur
    await createUserWithEmailAndPassword(
      auth,
      userCerteniel.email,
      userCerteniel.password
    )
      .then((userCredential) => {
        //Sigined in
        const user = userCredential.user;
        console.log(user);
        // Ajout des données dans la collection "usernames" de la base de données Firestore
        const userReference = addDoc(collection(db, "usernames"), {
          name: userCerteniel.name,
          email: userCerteniel.email,
        });
        console.log(
          "data was added sucessfully to fire store",
          userReference.id
        );
        // Navigation vers la page de connexion
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
      })
      .catch((error) => {
        // Gérer les erreurs
        console.error("Google sign-up error:", error);
      });
  };

  //login with emaill and password
  const handelSignIn = async (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(
      auth,
      userCerteniel.email,
      userCerteniel.password
    )
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        setError(error.message);
        console.log(error);
      });
  };
  // reset password
  const handelResetPassword = () => {
    const email = prompt("Please Enter your email");
    sendPasswordResetEmail(auth, email);
    alert("Emaikl sent , check your inbox for email rest instructions");
  };

  //login with google
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
        setError(error.message);
        console.error("Google sign-in error:", error);
      });
  };

  return (
    <div className="sign-container">
      <div className="logTypes">
    
          <button className="login-btn" onClick={() => setLoginType("login")}>
            {" "}
            Login
          </button>
        
        <button className="signUp-btn" onClick={() => setLoginType("signup")}>
          sign up
        </button>
      </div>
      <h2>Sign in or create an account</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form action="#">
        {logType === "signup" && (
          <div>
            <div>
              <label htmlFor="name">User name</label>
            </div>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name please"
              onChange={(e) => handelChange(e)}
            />
          </div>
        )}

        <div>
          <div>
            <label htmlFor="email">Email</label>
          </div>
          <input
            type="emain"
            id="email"
            name="email"
            placeholder="Enter your email plearse"
            onChange={(e) => handelChange(e)}
          />
        </div>
        <div>
          <div>
            <label htmlFor="password">Password</label>
          </div>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            onChange={(e) => handelChange(e)}
          />
        </div>
        <div className="signsBtn">
          {logType === "login" ? (
            <div className="loginBtn">
              <button type="submit" onClick={(e) => handelSignIn(e)}>
                logIn
              </button>
              <p
                style={{ color: "blue", cursor: "pointer" }}
                onClick={handelResetPassword}
              >
                forget password
              </p>

              <button onClick={handleGoogleSignIn} class="google-signin">
                Sign In with Google
              </button>
            </div>
          ) : (
            <div div className="signUpBtn">
              <button type="submit" onClick={(e) => handelSignUp(e)}>
                Sign Up
              </button>
              <button onClick={handleGoogleSignUp} className="google-signin">
                Sign Up with Google
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default SignUp;
