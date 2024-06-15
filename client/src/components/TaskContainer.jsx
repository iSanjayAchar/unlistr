import React from "react";
import Task from "./Task";

function TaskContainer() {
    return (
        <div className="p-10 flex flex-col">
            <h1 className="text-3xl font-bold mb-5">Tasks</h1>
            <div className="flex flex-col gap-5 max-h-screen pb-48 overflow-scroll no-scrollbar">
                {[1, 2, 3, 5, 6, 7, 8, 9, 10].map((i) => (
                    <Task key={i} i={i} />
                ))}
            </div>
            <div className="h-[80px] bg-gradient-to-b from-[#F3F3F3]/15 to-[#F3F3F3] mt-[-170px]" />
        </div>
    );
}

export default TaskContainer;
