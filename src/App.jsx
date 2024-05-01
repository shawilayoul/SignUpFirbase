import SignUp from "./components/SignUp";
import HomePage from "./pages/HomePage";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import UserContext from "./context/userContext";
import { useContext } from "react";

function App() {
  const { currentUser, userCerteniel, SetUserCerteniel ,setCurrentUser} =
    useContext(UserContext);

  return (
    <>
      {currentUser ? (
        <Router>
          <Routes>
            <Route
              index
              element={
                <HomePage
                  userCerteniel={userCerteniel}
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            />
          </Routes>
        </Router>
      ) : (
        <>
          <SignUp
            userCerteniel={userCerteniel}
            SetUserCerteniel={SetUserCerteniel}
          />
        </>
      )}
    </>
  );
}

export default App;
