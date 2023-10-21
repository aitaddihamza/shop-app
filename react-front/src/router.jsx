import { Navigate, createBrowserRouter } from "react-router-dom";

// <layouts>
import Home from "./views/layouts/Home";
import Admin from "./views/layouts/Admin";
// <layouts />

// <HomeLayouts>
import Biens from "./views/home/Biens";
import Details from "./views/home/Details";
import Cart from "./views/home/Cart";
// <HomeLayouts />

// <AdminLayouts>
import BiensList from "./views/admin/BiensList";
import BienForm from "./views/admin/BienForm";
// <AdminLayouts />

// login
import Login from "./views/auth/Login";
import NotFound from "./views/NotFound";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        children: [
            {
                path: "/",
                element: <Navigate to="/biens" />,
            },
            {
                path: "/biens",
                element: <Biens />,
            },
            {
                path: "/biens/details/:id",
                element: <Details />,
            },
            {
                path: "/biens/cart",
                element: <Cart />,
            },
            {
                path: "*",
                element: <Navigate to="/notFound" />,
            },
            {
                path: "/notFound",
                element: <NotFound />,
            },
        ],
    },
    {
        path: "/",
        element: <Admin />,
        children: [
            {
                path: "/admin",
                element: <Navigate to="/admin/biens" />,
            },
            {
                path: "/admin/biens",
                element: <BiensList />,
            },
            {
                path: "/admin/biens/create",
                element: <BienForm key="createBien" />,
            },
            {
                path: "/admin/biens/edit/:id",
                element: <BienForm key="updateBien" />,
            },
            {
                path: "*",
                element: <Navigate to="/notFound" />,
            },
        ],
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "*",
        element: <Navigate to="/notFound" />,
    },
]);

export default router;
