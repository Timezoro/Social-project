import { createContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [Caption, setCaption] = useState(null);
    const [Location, setLocation] = useState(null);
    const [Tags, setTags] = useState(null);
    return (
        <UserContext.Provider value={{ Caption, setCaption, Location, setLocation }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserProvider, UserContext };