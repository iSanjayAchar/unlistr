import React from "react";

function Empty() {
    return (
        <div className="flex flex-col h-full w-full justify-center items-center gap-3">
            <img src="/assets/illustration.svg" alt="" />
            <h1 className="text-3xl font-bold mt-3">Peace and Quiet... for Now </h1>
            <p className="text-base text-black opacity-70 max-w-[400px] text-center">Your to-do list is taking a well-deserved break. Add a new task when you're ready to roll up your sleeves! </p>
        </div>
    )
}

export default Empty;
