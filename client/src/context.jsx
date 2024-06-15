import React from "react";
import httpClient from "./utils/http-client";

const defaultContext = {
    user: {
        user: null,
        setUser: () => null,
        toggleLoginModal: () => null,
        showLoginModal: false,
        logout: () => null,
    },
    tasks: [],
    refreshTasks: async () => null,
    filter: {
        current: null,
        apply: () => null,
    }
}
const AppContext = React.createContext(defaultContext);

function AppContextWrapper({children}) {
    const [showLoginModal, setLoginModal] = React.useState(false);
    const [user, setUser] = React.useState(null);
    const [tasks, setTasks] = React.useState([]);
    const [filter, setFilter] = React.useState(null);
    
    const refreshTasks = async () => {
        try {
            const {data} = await httpClient.get("/task");
            return setTasks(data.result);
        } catch (err) {
            console.error(err);
        }
    }

    /** Initial task */
    React.useEffect(() => {
        if (user === null) {
            return;
        }
        
        (async () => {
            await refreshTasks();
        })();
    }, [user]);

    React.useEffect(() => {
        const auth_token = window.localStorage.getItem("auth_token");
        if (auth_token) {
            const user = window.localStorage.getItem("user");
            setUser(JSON.parse(user));
        }
    }, []);

    const props = {
        user: {
            user,
            setUser,
            toggleLoginModal: () => {
                setLoginModal(!showLoginModal);
            },
            showLoginModal,
            logout: () => {
                setUser(null);
                setTasks([]);
                setFilter(null);
            }
        },
        tasks,
        refreshTasks,
        filter: {
            current: filter,
            apply: setFilter
        }
    };

    return (
        <AppContext.Provider value={props}>
            {children}
        </AppContext.Provider>
    )
};

export default AppContextWrapper;
export {
    AppContext,
};
