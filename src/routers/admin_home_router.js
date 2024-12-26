import { createHashRouter } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Screens from "../js/screens/screens";

const router = createHashRouter([
    {
        path: "/",
        element: <Navigate to="/adminhome" replace />
    },
    {
        path: "/adminhome",
        element: <Screens.AdminHome />,
        children: [
            {
                path: "setting",
                element: <Screens.Setting />,
            },
            {
                path: "addingtea",
                element: <Screens.AddingTea />,  
            },
            {
                path: "addingstaff",
                element: <Screens.AddingStaff />,
            },
            {
                path: "showteas",
                element: <Screens.ShowTeas />,
            },
            {
                path: "showstaffs",
                element: <Screens.ShowStaffs />,
            },
            {
                path: "edittea",
                element: <Screens.EditTea />,
            },
            {
                path: "*",
                element: <Navigate to="/adminhome" replace />
            }
        ],
    },
    {
        path: "*",
        element: <Screens.NotFound />,
    }
],
{
    // 添加 future 配置项
    future: {
        v7_startTransition: true, // 提前启用 startTransition
        v7_relativeSplatPath: true, // 改变带 * 的路径解析
        v7_fetcherPersist: true, // 启用 fetcher 的持久化行为
        v7_normalizeFormMethod: true, // 表单方法大小写规范化
        v7_partialHydration: true, // 改进 RouterProvider 的 hydration 行为
        v7_skipActionErrorRevalidation: true, // 跳过 action 错误的 revalidation
    },
}


);

export default router;