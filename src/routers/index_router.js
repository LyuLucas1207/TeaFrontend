import { createHashRouter } from "react-router-dom";
import { Navigate } from "react-router-dom";
import App from "../js/templates/App";
import NotFound from "../js/templates/NotFound";

import Products from "../js/templates/Products";
import About from "../js/templates/About";
import Contact from "../js/templates/Contact";
import News from "../js/templates/News";



const router = createHashRouter([
    {
        path: "/", // 当路径为 "/" 时重定向到 "/login"
        element: <Navigate to="/index" replace />
    },
    {
        path: "/index",
        element: <App />,
        children: [
            {
                path: "products",
                element: <Products />,
            },
            {
                path: "about",
                element: <About />,
            },
            {
                path: "news",
                element: <News />,
            },
            {
                path: "contact",
                element: <Contact />,
            },
            {
                path: "*",
                element: <Navigate to="/index" replace />
            }],
    },
    {
        path: "/not-found",
        element: <NotFound message={null} link="/index" />,
    },
    {
        path: "*",
        element: <NotFound message={null} link="/index" />,
    }
]);

export default router;