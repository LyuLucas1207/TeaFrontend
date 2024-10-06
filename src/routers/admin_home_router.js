import { createHashRouter } from "react-router-dom";
import { Navigate } from "react-router-dom";
import AdminHome from "../js/templates/AdminHome";
import NotFound from "../js/templates/NotFound";

const router = createHashRouter([
    {
        path: "/",
        element: <Navigate to="/adminhome" replace />
    },
    {
        path: "/adminhome",
        element: <AdminHome />,
        children: [
            {
                path: "*",
                element: <Navigate to="/adminhome" replace />
            }],
    },
    {
        path: "*",
        element: <NotFound />,
    }
]);

export default router;