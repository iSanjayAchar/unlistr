import React from "react";
import TaskContainer from "./components/TaskContainer";
import Sidebar from "./components/Sidebar";
import Login from "./components/Login";
import Empty from "./components/Empty";
import { AppContext } from "./context";

function Unlistr() {
    const { tasks } = React.useContext(AppContext);

    return (
        <main className="flex h-screen">
            <div className="w-[500px] h-screen">
                <Sidebar />
            </div>
            <div className="h-screen overflow-hidden w-full bg-[#F3F3F3]">
                {
                    tasks.length === 0 ? (
                        <Empty />
                    ) : (
                        <TaskContainer />
                    )
                }

            </div>

            <Login />
        </main>
    );
}
// &#10;
export default Unlistr;
