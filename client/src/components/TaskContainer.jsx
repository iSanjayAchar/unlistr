import React from "react";
import Task from "./Task";
import { AppContext } from "../context";

function TaskContainer() {
    const {tasks} = React.useContext(AppContext);

    return (
        <div className="p-10 flex flex-col">
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-3xl font-bold">Tasks</h1>
                <div className="flex gap-2 items-center animate__animated animate__backInRight animate__fast">
                    <img
                        src="/assets/filter.svg"
                        alt="Unlistr"
                        className="w-[24px] h-[24px]"
                    />
                    <div className="bg-gray-200 px-2 py-1 border-2 text-sm rounded-sm font-bold border-gray-200 text-gray-500 hover:first-letter:border-gray-500 hover:border-gray-300 hover:text-black transition-all ease-linear">
                        Todo
                    </div>
                    <div className="bg-amber-200 px-2 py-1 border-2 text-sm rounded-sm font-bold border-amber-200 text-amber-700 hover:first-letter:border-amber-500 hover:border-amber-300 hover:text-amber-900 transition-all ease-linear">
                        In Progress
                    </div>
                    <div className="bg-green-200 px-2 py-1 border-2 text-sm rounded-sm font-bold border-green-200 text-green-700 hover:first-letter:border-green-500 hover:border-green-300 hover:text-green-900 transition-all ease-linear">
                        Complete
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-5 max-h-screen pb-48 overflow-scroll no-scrollbar">
                {tasks.map((task, j) => (
                    <Task key={task.tid} index={j} {...task} />
                ))}
            </div>
            <div className="h-[80px] bg-gradient-to-b from-[#F3F3F3]/15 to-[#F3F3F3] mt-[-170px]" />
        </div>
    );
}

export default TaskContainer;
