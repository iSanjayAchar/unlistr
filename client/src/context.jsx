import React from "react";

const defaultContext = {
    user: {
        user: null,
        setUser: () => null,
        toggleLoginModal: () => null,
        showLoginModal: false,
    }
}
const AppContext = React.createContext(defaultContext);

function AppContextWrapper({children}) {
    const [showLoginModal, setLoginModal] = React.useState(false);
    const [user, setUser] = React.useState(null);

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
