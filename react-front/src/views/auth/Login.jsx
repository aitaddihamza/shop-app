import { useRef, useState } from "react";
import axiosClient from "../../api/axios-client";
import { useValue } from "../../ContextProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { setUser, setToken } = useValue();
    const [errors, setErrors] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(null);
        const credentials = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };
        axiosClient
            .post("/login", credentials)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
                navigate("/admin");
            })
            .catch(({ response }) => {
                if (response && response.status === 422) {
                    if (response.data.errors) {
                        setErrors(response.data.errors);
                    } else {
                        setErrors({
                            email: [response.data.message],
                        });
                    }
                }
            });
    };
    return (
        <form
            className="flex flex-col gap-4 max-w-2xl mt-8 mx-auto bg-white rounded-lg shadow-lg p-8"
            onSubmit={handleSubmit}
        >
            <h1 className="text-center text-2xl text-[#333] font-medium">
                Login{" "}
            </h1>
            {errors && (
                <div className="bg-red-600 text-white rounded flex flex-col gap-2 p-2">
                    {Object.keys(errors).map((key) => (
                        <p key={key}>{errors[key][0]}</p>
                    ))}
                </div>
            )}
            <input
                ref={emailRef}
                type="email"
                placeholder="Email Address"
                className="p-2 border border-solid focus:placeholder-transparent focus:outline-red-400"
            />
            <input
                ref={passwordRef}
                type="password"
                placeholder="Password"
                className="p-2 border border-solid focus:placeholder-transparent focus:outline-red-400"
            />
            <button className="btn-primary mx-auto mt-4">Login</button>
        </form>
    );
};

export default Login;
