import { createHashRouter } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Screens from "../js/screens/screens";

const router = createHashRouter([
    {
        path: "/", // 当路径为 "/" 时重定向到 "/login"
        element: <Navigate to="/index" replace />
    },
    {
        path: "/index",
        element: <Screens.App />,
        children: [
            {
                path: "products",
                element: <Screens.Products />,
            },
            {
                path: "about",
                element: <Screens.About />,
            },
            {
                path: "history",
                element: <Screens.History />,
            },
            {
                path: "contact",
                element: <Screens.Contact />,
            },
            {
                path: "*",
                element: <Navigate to="/index" replace />
            }],
    },
    {
        path: "/not-found",
        element: <Screens.NotFound message={null} link="/index" />,
    },
    {
        path: "*",
        element: <Screens.NotFound message={null} link="/index" />,
    }
],
{
    // 添加 future 配置项
    future: {
        v7_startTransition: true, // 提前启用 startTransition 封装
        v7_relativeSplatPath: true, // 改变带 * 的路径解析
        v7_fetcherPersist: true, // 启用 fetcher 的持久化行为
        v7_normalizeFormMethod: true, // 表单方法大小写规范化
        v7_partialHydration: true, // 改进 RouterProvider 的 hydration 行为
        v7_skipActionErrorRevalidation: true, // 跳过 action 错误的 revalidation
    },
}

);

export default router;