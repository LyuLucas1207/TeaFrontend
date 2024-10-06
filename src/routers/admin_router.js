import { createHashRouter, Navigate } from "react-router-dom";
import Login from "../js/templates/Login";
import SignUp from "../js/templates/SignUp";
import NotFound from "../js/templates/NotFound";

const adminRouter = createHashRouter([
    {
        path: "/", // 当路径为 "/" 时重定向到 "/login"
        element: <Navigate to="/login" replace />
    },
    {
        path: "/login",
        element: <Login />,
        children: [
            {
                path: "*",
                element: <Navigate to="/login" replace />
            }],
    },
    {
        path: "/signup",
        element: <SignUp />,
        children: [
            {
                path: "*",
                element: <Navigate to="/signup" replace />
            }],
    },
    {
        path: "/not-found",
        element: <NotFound message={null} link="/login" />,
    },
    {
        path: "*",
        element: <NotFound message={null} link="/login" />,
    }
]);

export default adminRouter;
