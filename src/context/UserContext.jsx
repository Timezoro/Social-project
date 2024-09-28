import { createContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [password, setPassword] = useState(null);

    return (
        <UserContext.Provider value={{ user, setUser, password, setPassword }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserProvider, UserContext };