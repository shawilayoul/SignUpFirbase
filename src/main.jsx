import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { UserProvider} from "./context/userContext.jsx";


const renderedApp = (
  <UserProvider>
    <App />
  </UserProvider>
);

ReactDOM.createRoot(document.getElementById('root')).render(renderedApp);