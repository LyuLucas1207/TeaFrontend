import { createHashRouter, Navigate } from "react-router-dom";
import Screens from "../js/screens/screens";

const adminRouter = createHashRouter([
    {
        path: "/", // 当路径为 "/" 时重定向到 "/login"
        element: <Navigate to="/login" replace />
    },
    {
        path: "/login",
        element: <Screens.Login />, // 从 Screens 对象中获取 Login
        children: [
            {
                path: "*",
                element: <Navigate to="/login" replace />
            }],
    },
    {
        path: "/signup",
        element: <Screens.Signup />, // 从 Screens 对象中获取 Signup
        children: [
            {
                path: "*",
                element: <Navigate to="/signup" replace />
            }],
    },
    {
        path: "/not-found",
        element: <Screens.NotFound message={null} link="/login" />,
    },
    {
        path: "*",
        element: <Screens.NotFound message={null} link="/login" />,
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

export default adminRouter;
