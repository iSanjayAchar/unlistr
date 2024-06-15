import React from "react";
import Task from "./Task";
import { AppContext } from "../context";

function TaskContainer() {
    const { tasks, filter } = React.useContext(AppContext);
    const filteredTasks = tasks.filter((task) => {
        if (!filter.current) {
            return task;
        }

        if (filter.current && task.status === filter.current) {
            return task;
        }

        return null;
    });

    return (
        <div className="p-10 flex flex-col">
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-3xl font-bold">Tasks.</h1>
                <div className="flex gap-2 items-center animate__animated animate__backInRight animate__fast">
                    <img
                        src="/assets/filter.svg"
                        alt="Unlistr"
                        className="w-[24px] h-[24px]"
                    />
                    {
                        (!filter.current || (filter.current && filter.current === "todo")) && (
                            <div className="bg-gray-200 px-2 py-1 border-2 text-sm rounded-sm font-bold border-gray-200 text-gray-500 hover:first-letter:border-gray-500 hover:border-gray-300 hover:text-black transition-all ease-linear cursor-pointer" onClick={() => filter.apply("todo")}>
                                Todo
                            </div>
                        )
                    }
                    {
                        (!filter.current || (filter.current && filter.current === "in-progress")) && (
                            <div className="bg-amber-200 px-2 py-1 border-2 text-sm rounded-sm font-bold border-amber-200 text-amber-700 hover:first-letter:border-amber-500 hover:border-amber-300 hover:text-amber-900 transition-all ease-linear cursor-pointer" onClick={() => filter.apply("in-progress")}>
                                In Progress
                            </div>
                        )
                    }
                    {
                        (!filter.current || (filter.current && filter.current === "done")) && (
                            <div className="bg-green-200 px-2 py-1 border-2 text-sm rounded-sm font-bold border-green-200 text-green-700 hover:first-letter:border-green-500 hover:border-green-300 hover:text-green-900 transition-all ease-linear cursor-pointer" onClick={() => filter.apply("done")}>
                                Complete
                            </div>
                        )
                    }
                    {
                        filter.current && (
                            <button className="bg-white border-2 border-black px-1 py-[.1rem] font-bold hover:shadow-[5px_5px_0px_0px_#000] transition ease-in" type="submit" onClick={() => filter.apply(null)}>
                                <img src="/assets/close.svg" alt="" />
                            </button>
                        )
                    }
                </div>
            </div>
            <div className="flex flex-col gap-5 max-h-screen pb-48 overflow-scroll no-scrollbar">
                {filteredTasks.map((task, j) => (
                    <Task key={task.tid} index={j} {...task} />
                ))}
                {
                    filteredTasks.length === 0 && (
                        <div className="flex w-full h-full items-center flex-col mt-16 animate__animated animate__backInUp animate__faster">
                            <img src="/assets/filter-empty.svg" alt="Clear filter" className="w-[250px] h-[250px]" />
                            <h1 className="text-3xl font-bold mt-3">Narrowed It Down!</h1>
                            <p className="text-base text-black opacity-70 max-w-[400px] text-center mt-2">
                                We're searching high and low... but nothing found yet. Try refining your filters or adding new tasks!
                            </p>
                            <button className="bg-[#B9FF66] border-2 border-black px-5 py-5 font-bold hover:shadow-[5px_5px_0px_0px_#000] transition ease-in mt-6" onClick={() => filter.apply(null)}>
                                CLEAR FILTER
                            </button>
                        </div>
                    )
                }
            </div>
            <div className="h-[80px] bg-gradient-to-b from-[#F3F3F3]/15 to-[#F3F3F3] mt-[-170px]" />
        </div>
    );
}

export default TaskContainer;
