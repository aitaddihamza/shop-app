import { Navigate, Outlet, Link } from "react-router-dom";
import { useValue } from "../../ContextProvider";
import { useEffect } from "react";
import axiosClient from "../../api/axios-client";

const Admin = () => {
    const { user, token, setToken, setUser, notification } = useValue();
    const onLogout = () => {
        setToken(null);
    };

    useEffect(() => {
        axiosClient
            .get("/user")
            .then(({ data }) => {
                setUser(data);
            })
            .catch(({ response }) => {
                console.log(response);
            });
    }, []);

    if (!token) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="min-h-screen ">
            <header className="bg-gray-600 sticky top-0 z-10">
                <section className="max-w-6xl mx-auto flex items-center justify-between p-2">
                    <div className="flex items-end gap-4">
                        <Link
                            to="/"
                            className="text-2xl font-medium text-white cursor-pointer"
                        >
                            AgenceX
                        </Link>
                        <Link
                            to="/admin"
                            className=" font-normal text-white hover:underline"
                        >
                            biens
                        </Link>
                    </div>
                    {notification && (
                        <p className="p-2 border border-solid text-red-600 font-medium bg-white shadow-md w-[400px] rounded ">
                            la bien a été bien {notification}
                        </p>
                    )}
                    <div className=" flex items-center gap-4 text-white">
                        <h1 className="hover:underline">{user.name} </h1>
                        <button className="btn-primary" onClick={onLogout}>
                            Logout
                        </button>
                    </div>
                </section>
            </header>

            <Outlet />
        </div>
    );
};

export default Admin;
