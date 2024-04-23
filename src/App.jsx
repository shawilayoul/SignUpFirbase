import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import HomePage from "./pages/HomePage";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <section>
          <Routes>
            <Route path="/" element={<HomePage />} />{" "}
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
          </Routes>
        </section>
      </div>
    </Router>
  );
}

export default App;
