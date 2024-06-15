import React from "react";
import TaskContainer from "./components/TaskContainer";
// import Empty from "./components/Empty";

function Unlistr() {
    return (
        <main className="flex h-screen">
            <div className="border-r-2 border-black bg-[#95D2B3]">
                <div className="m-auto p-10 rounded-[20px]">
                    <h1 className="text-left font-bold text-2xl mb-12">
                        Unlistr.
                        <small className="block text-sm opacity-80">
                            The only todo app you need
                        </small>
                    </h1>
                    <div className="flex flex-col justify-center gap-5">
                        <div className="flex justify-center gap-5">
                            <input
                                type="text"
                                className="border-2 border-black rounded-none text-3xl placeholder:text-xl px-5 py-3 focus:border-transparent !outline-none active:border-2 active:border-black focus:border-2 focus:border-black focus:shadow-[5px_5px_0px_0px_#000] transition ease-in w-full"
                                placeholder="What's gotta get done?"
                            />
                        </div>
                        <textarea
                            placeholder="Details, details! What makes this task tick?"
                            rows={10}
                            data-enable-grammarly="false"
                            className="border-2 border-black rounded-none px-2 py-3 font-medium !outline-none active:border-2 active:border-black focus:border-2 focus:border-black focus:shadow-[5px_5px_0px_0px_#000] transition ease-in w-full"
                        />

                        <button className="bg-white border-2 border-black px-5 py-5 font-bold hover:shadow-[5px_5px_0px_0px_#000] transition ease-in">
                            CREATE
                        </button>
                    </div>
                </div>
            </div>
            <div className="h-screen overflow-hidden w-full bg-[#F3F3F3]">
                {/* <Empty /> */}
                <TaskContainer />
            </div>
        </main>
    );
}
// &#10;
export default Unlistr;
