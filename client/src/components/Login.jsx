import React from "react";
import { AppContext } from "../context";
import { Formik } from "formik";
import * as yup from "yup";
import httpClient from "../utils/http-client";

function Login() {
    const { user } = React.useContext(AppContext);
    const [type, setType] = React.useState("register");
    const [error, setError] = React.useState("");

    React.useEffect(() => {
        setError("");
    }, [type]);

    const submit = async (value, helper) => {
        try {
            const { data } = await httpClient.post(`/authentication/${type}`, value);
            
            /** Set user data */
            window.localStorage.setItem("auth_token", data.result.token);
            window.localStorage.setItem("user", JSON.stringify(data.result.user));

            user.setUser(data.result.user);
            return user.toggleLoginModal();
        } catch (err) {
            if (err.response) {
                const response = err.response;

                if (response.status === 400) {
                    return setError(response.data.result);
                }

                if (response.status === 403) {
                    return setError(response.data.result);
                }                

                if (response.status >= 500) {
                    return setError("Something went wrong :(")
                }
            }
        } finally {
            return helper.setSubmitting(false);
        }
    }

    const Form = {
        InitialValue: {
            email: "",
            password: ""
        },
        Validator: yup.object({
            email: yup.string().email("Enter a valid email address").required("Email is required"),
            password: yup.string().required("Password is required").matches(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"), "Password must be 8 characters, at least 1 uppercase, 1 lowercase and 1 special character")
        })
    }

    return (
        <div id="default-modal" tabIndex={-1} aria-hidden="true" className={`${user.showLoginModal ? "" : "hidden"} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full`}>
            <div className="flex h-full w-full justify-center items-center bg-gray-800 bg-opacity-50">
                <div className="p-4">
                    <div className="bg-white rounded-md shadow-md w-[400px] sign-in-modal animate__animated animate__fadeInDown animate__faster">
                        <div className="p-4">
                            <div className="flex justify-between items-center border-b-2 border-black pb-4 mt-5">
                                <h1 className="text-2xl font-bold">
                                    {type === "register" && "Let's create an account!"}
                                    {type === "login" && "Let's login!"}
                                </h1>
                                <button onClick={user.toggleLoginModal}>
                                    <img src="/assets/close.svg" alt="" />
                                </button>
                            </div>
                        </div>
                        <Formik initialValues={Form.InitialValue} validationSchema={Form.Validator} onSubmit={submit}>
                            {
                                (formik) => (
                                    <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
                                        <div className="flex flex-col p-4 mt-3">
                                            <div className="">
                                                <label htmlFor="">Email address</label>
                                                <input
                                                    type="email"
                                                    autoComplete="off"
                                                    className="border-2 border-black rounded-none text-base px-5 py-3 shadow-none !outline-none active:border-2 active:border-black focus:border-2 focus:border-black focus:shadow-[5px_5px_0px_0px_#000] transition ease-in w-full"
                                                    placeholder="you@example.com"
                                                    name="email"
                                                    onChange={formik.handleChange}
                                                />
                                                {
                                                    formik.errors.email && formik.touched.email && (
                                                        <small className="text-red-600">
                                                            {formik.errors.email}
                                                        </small>
                                                    )
                                                }
                                            </div>
                                            <div className="mt-4">
                                                <label htmlFor="">Password</label>
                                                <input
                                                    name="password"
                                                    type="password"
                                                    autoComplete="off"
                                                    className="border-2 border-black rounded-none text-base px-5 py-3 shadow-none !outline-none active:border-2 active:border-black focus:border-2 focus:border-black focus:shadow-[5px_5px_0px_0px_#000] transition ease-in w-full"
                                                    onChange={formik.handleChange}
                                                />
                                                {
                                                    formik.errors.password && formik.touched.password && (
                                                        <small className="text-red-600">
                                                            {formik.errors.password}
                                                        </small>
                                                    )
                                                }
                                            </div>
                                            {
                                                error && (
                                                    <div className="bg-red-100 border-2 border-red-200 text-red-700 font-bold px-2 py-2 rounded-sm mt-4">
                                                        {error}
                                                    </div>
                                                )
                                            }
                                            <button className="bg-white border-2 mt-10 border-black px-5 py-3 font-bold hover:shadow-[5px_5px_0px_0px_#000] transition ease-in" type="submit">
                                                {type === "register" && "Register"}
                                                {type === "login" && "Login"}
                                            </button>
                                            <p className="text-center mt-2 mb-10" type="button" onClick={() => setType(type === "login" ? "register" : "login")}>
                                                {type === "register" && "Already have an account?"}
                                                {type === "login" && "Don't have an account?"}
                                                {" "}
                                                <span className="underline font-bold cursor-pointer">
                                                    {type === "register" && "Login"}
                                                    {type === "login" && "Register"}
                                                </span>
                                            </p>
                                        </div>
                                    </form>
                                )
                            }
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;
