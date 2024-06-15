import React from "react";

const defaultContext = {
    user: {
        isLoggedIn: null,
        user: null,
        toggleLoginModal: () => null,
        showLoginModal: false,
    }
}
const AppContext = React.createContext(defaultContext);

function AppContextWrapper({children}) {
    const [showLoginModal, setLoginModal] = React.useState(false);

    const props = {
        user: {
            isLoggedIn: false,
            user: null,
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
