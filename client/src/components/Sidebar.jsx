import React from "react";
import { AppContext } from "../context";
import { Formik } from "formik";
import * as yup from "yup";
import httpClient from "../utils/http-client";

function Sidebar() {
    const { user, refreshTasks } = React.useContext(AppContext);

    const Form = {
        InitialValues: {
            title: "",
            description: "",
        },
        Validator: yup.object({
            title: yup.string().required("Title is required"),
            description: yup.string()
        }),
    }

    const create = async (task, helper) => {
        if (!user.user) {
            return user.toggleLoginModal();
        }

        try {
            await httpClient.post("/task", {
                ...task,
                status: "todo"
            });

            await refreshTasks();
            helper.resetForm();
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="border-r-2 border-black bg-gradient-to-b from-rose-100 to-teal-100 h-full w-full">
            <div className="flex flex-col h-full w-[500px]">
                <div className="p-10 rounded-[20px]">
                    <div className="flex gap-2 items-start">
                        <img src="/assets/icon.svg" alt="Unlistr" className="w-[48px] h-[48px] mt-[3px]" />
                        <h1 className="text-left font-bold text-2xl mb-12">
                            Unlistr.
                            <small className="block text-sm opacity-80">
                                The only todo app you need
                            </small>
                        </h1>
                    </div>
                    <Formik initialValues={Form.InitialValues} validationSchema={Form.Validator} onSubmit={create}>
                        {
                            (formik) => (
                                <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
                                    <div className="flex flex-col justify-center gap-5">
                                        <div className="flex flex-col justify-center gap-1">
                                            <input
                                                type="text"
                                                className="border-2 border-black rounded-none text-3xl placeholder:text-xl px-5 py-3 shadow-none !outline-none active:border-2 active:border-black focus:border-2 focus:border-black focus:shadow-[5px_5px_0px_0px_#000] transition ease-in w-full"
                                                placeholder="What's gotta get done?"
                                                name="title"
                                                onChange={formik.handleChange}
                                                value={formik.values.title}
                                            />
                                            {
                                                formik.errors.title && formik.touched.title && (
                                                    <small className="text-red-600">
                                                        {formik.errors.title}
                                                    </small>
                                                )
                                            }
                                        </div>
                                        <textarea
                                            name="description"
                                            placeholder="Details, details! What makes this task tick?"
                                            rows={10}
                                            data-enable-grammarly="false"
                                            className="border-2 border-black rounded-none px-2 py-3 font-medium !outline-none active:border-2 active:border-black focus:border-2 focus:border-black focus:shadow-[5px_5px_0px_0px_#000] transition ease-in w-full"
                                            onChange={formik.handleChange}
                                            value={formik.values.description}
                                        />


                                        <button className="bg-white border-2 border-black px-5 py-5 font-bold hover:shadow-[5px_5px_0px_0px_#000] transition ease-in" type="submit">
                                            CREATE
                                        </button>
                                    </div>
                                </form>
                            )
                        }
                    </Formik>
                </div>
                <div className="mt-auto py-5 p-10 flex cursor-pointer gap-4 border-t-2 border-black" type="button" onClick={() => !user.user && user.toggleLoginModal()}>
                    <div className="flex">
                        <img src="https://api.dicebear.com/8.x/big-smile/svg?seed=Molly" alt="Profile" className="w-[48px] h-[48px] bg-white rounded-[50%] p-1" />
                        <h1 className="text-2xl font-bold">
                            Hola!
                            {
                                !user.user && (
                                    <small className="block text-sm -mt-[3px] text-gray-700">Let's sign you up!</small>
                                )
                            }
                            {
                                user.user && (
                                    <small className="block text-sm -mt-[3px] text-gray-700">
                                        {user.user.email}
                                    </small>
                                )
                            }
                        </h1>
                    </div>
                    {
                        user.user && (
                            <div className="border-l-2 border-black ml-auto pl-4 self-center" type="button" onClick={user.logout}>
                                <img src="/assets/logout.svg" alt="" className="w-[40px] h-[40px]" />
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Sidebar;
