import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";

export const router = createBrowserRouter([
    {
        path:'/',
        element: <HomePage/>,
    },
    {
        path:'signUp',
        element: <SignUp/>,
    },
    {
        path:'signIn',
        element: <SignIn/>,
    },
]) 