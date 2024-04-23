import React, { useEffect, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
//import { onAuthStateChanged } from "firebase/auth";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const [userSigIn, setUserSignIn] = useState(null);
  const [showError,setShowError] = useState(false)
  const navigate = useNavigate();

  //geting user info uid
 /* useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUserSignIn(uid);
      } else {
        console.log("logout");
      }
    });
  }, []);
*/
 // console.log(userSigIn);

  const handelSignUp = async (e) => {
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        //Sigined in
        const user = userCredential.user;
        console.log(user);

        //adding user email  to firebase store
        const userReference = addDoc(collection(db, "usernames"), {
          email: user.email,
        });
        console.log(
          "data was added sucessfully to fire store",
          userReference.id
        );
        //navgiate to login page
        navigate("/signin");
      })
      .catch((error) => {
        if(error){
           console.log(error)
           setShowError(true)
        }
      });
  };
  return (
    <div>
      <h2>Sign up</h2>
      {showError && <p>user already exsit</p>}
      <form action="#">
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" onClick={handelSignUp}>
          Sign Up
        </button>
      </form>
      <Link to="/signin">
        <p>Already have an account login </p>
      </Link>
    </div>
  );
};

export default SignUp;
