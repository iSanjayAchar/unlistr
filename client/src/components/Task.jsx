import React from "react";
import httpClient from "../utils/http-client";
import { AppContext } from "../context";

function Task({ index, tid, title, status, description, created_at }) {
    const {refreshTasks} = React.useContext(AppContext);
    const [isActive, setIsActive] = React.useState(false);

    const taskStage = (stage = status) => {
        switch (stage) {
            case ("todo"):
                return "bg-gray-200 px-2 py-1 border-2 text-sm rounded-sm font-bold border-gray-200 text-gray-500 hover:first-letter:border-gray-500 hover:border-gray-300 hover:text-black transition-all ease-linear after:content-['Todo']";
            case ("in-progress"):
                return String.raw`bg-amber-200 px-2 py-1 border-2 text-sm rounded-sm font-bold border-amber-200 text-amber-700 hover:first-letter:border-amber-500 hover:border-amber-300 hover:text-amber-900 transition-all ease-linear after:content-['In\00a0Progress']`;
            case ("done"):
                return "bg-green-200 px-2 py-1 border-2 text-sm rounded-sm font-bold border-green-200 text-green-700 hover:first-letter:border-green-500 hover:border-green-300 hover:text-green-900 transition-all ease-linear after:content-['Done']";
            default:
                return ""
        }
    }

    const remainingStage = () => {
        return ["todo", "in-progress", "done"].filter((stage) => stage !== status);
    }

    const changeStatus = async (status) => {
        try {
            await httpClient.put(`/task/${tid}`, {
                title, description, created_at, status
            });

            await refreshTasks();
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="flex gap-3 cursor-pointer px-2 py-5 border-2 border-gray-200 hover:border-black transition ease-linear" onMouseEnter={() => setIsActive(true)} onMouseLeave={() => setIsActive(false)}>
            <div className="border-r-2 border-r-gray-200 px-2">
                <h1 className="text-5xl text-center font-bold text-gray-500">
                    {index + 1}.
                </h1>
            </div>
            <div className="flex flex-col">
                <h6 className="text-xl font-bold">
                    {title}
                </h6>
                <p>
                    {description || "No description available"}
                </p>
                <div className="flex mt-5 gap-3">
                    <div className={taskStage()} />
                    {
                        isActive && (
                            <>
                                <div className="border-r-2 border-r-black animate__animated animate__backInLeft animate__faster"></div>
                                {
                                    remainingStage().map((stage) => (
                                        <div key={stage} className={`${taskStage(stage)} animate__animated animate__backInLeft animate__fast`} type="button" onClick={() => changeStatus(stage)} />
                                    ))
                                }
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Task;
