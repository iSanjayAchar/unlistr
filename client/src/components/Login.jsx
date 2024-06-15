import React from "react";
import { AppContext } from "../context";

function Login() {
    const {user} = React.useContext(AppContext);
    const [type, setType] = React.useState("register");

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
                        <div className="flex flex-col p-4 mt-3">
                            <div className="">
                                <label htmlFor="">Email address</label>
                                <input
                                    type="text"
                                    autoComplete="off"
                                    className="border-2 border-black rounded-none text-base px-5 py-3 shadow-none !outline-none active:border-2 active:border-black focus:border-2 focus:border-black focus:shadow-[5px_5px_0px_0px_#000] transition ease-in w-full"
                                    placeholder="you@example.com"
                                />
                            </div>
                            <div className="mt-4">
                                <label htmlFor="">Password</label>
                                <input
                                    type="password"
                                    autoComplete="off"
                                    className="border-2 border-black rounded-none text-base px-5 py-3 shadow-none !outline-none active:border-2 active:border-black focus:border-2 focus:border-black focus:shadow-[5px_5px_0px_0px_#000] transition ease-in w-full"
                                // placeholder="What's gotta get done?"
                                />
                            </div>
                            <button className="bg-white border-2 mt-10 border-black px-5 py-3 font-bold hover:shadow-[5px_5px_0px_0px_#000] transition ease-in">
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
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;
