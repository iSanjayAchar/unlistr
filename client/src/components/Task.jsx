import React from "react";

function Task({ i }) {
    return (
        <div className="flex gap-3 cursor-pointer px-2 py-5 border-2 border-gray-200 hover:border-black transition ease-linear" key={i}>
            <div className="border-r-2 border-r-gray-200 px-2">
                <h1 className="text-5xl text-center font-bold text-gray-500">
                    {i}.
                </h1>
            </div>
            <div className="flex flex-col">
                <h6 className="text-xl font-bold">Do laundry!</h6>
                <p>
                    Collect clothes from laundry bag, pre-soak for an hour before
                    putting them in washing machine
                </p>
                <div className="flex mt-5 gap-3">
                    <div className="bg-gray-200 px-2 py-1 border-2 text-sm rounded-sm font-bold border-gray-200 text-gray-500 hover:first-letter:border-gray-500 hover:border-gray-300 hover:text-black transition-all ease-linear">
                        Todo
                    </div>
                    <div className="border-r-2 border-r-black"></div>
                    <div className="bg-amber-200 px-2 py-1 border-2 text-sm rounded-sm font-bold border-amber-200 text-amber-700 hover:first-letter:border-amber-500 hover:border-amber-300 hover:text-amber-900 transition-all ease-linear">
                        In Progress
                    </div>
                    <div className="bg-green-200 px-2 py-1 border-2 text-sm rounded-sm font-bold border-green-200 text-green-700 hover:first-letter:border-green-500 hover:border-green-300 hover:text-green-900 transition-all ease-linear">
                        Complete
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Task;
