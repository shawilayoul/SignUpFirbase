import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userCerteniel, SetUserCerteniel] = useState({
    name: "",
    email: "",
    password: "",
    userImage: "",
  });

  //geting the current user
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
       // console.log(uid);
        setCurrentUser(uid);
        // ...
      } else {
        // User is signed out
        // ...
        setCurrentUser(null);
      }
    });
  }, [currentUser]);

  return (
    <UserContext.Provider
      value={{
        userCerteniel,
        SetUserCerteniel,
        currentUser,
        setCurrentUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export default UserContext;
