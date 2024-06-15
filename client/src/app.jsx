import React from "react";
import TaskContainer from "./components/TaskContainer";
import Sidebar from "./components/Sidebar";
// import Empty from "./components/Empty";

function Unlistr() {
    return (
        <main className="flex h-screen">
            <Sidebar />
            <div className="h-screen overflow-hidden w-full bg-[#F3F3F3]">
                {/* <Empty /> */}
                <TaskContainer />
            </div>
        </main>
    );
}
// &#10;
export default Unlistr;
