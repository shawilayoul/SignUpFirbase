import React, {useState } from "react";
import { collection, getDocs,query ,where} from "firebase/firestore";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import Profile from '../profile/Profile'
import "../style.css";

const HomePage = ({userCerteniel, currentUser , setCurrentUser}) => {
 
  /*
  //get all user data firebase firestore
  const getUserInfo = async () => {
    const querySnapshot = await getDocs(
      query(
        collection(db, "usernames"),
      )
     
    );
    const newdata = querySnapshot.docs.map((doc)=>({...doc.data()}))
    setUseInfo(newdata)
    console.log(newdata)
  };*/
  
  console.log(currentUser)
  const handelLogOut = () => {
    signOut(auth)
      .then(() => {
        //Sigh out successfullf
        setCurrentUser(null)
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <h1>Welcome to home page</h1>
      <div>
        <button onClick={handelLogOut} className="logout">
          LogOut
        </button>
        <Profile currentUser={currentUser}/>
      </div>
    </div>
  );
};

export default HomePage;
