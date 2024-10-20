import { createContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [Userid, setUserid] = useState(null);
    const [Caption, setCaption] = useState(null);
    const [Location, setLocation] = useState(null);
    const [Tags, setTags] = useState(null);
    const [Likes, setLikes] = useState(null);
    return (
        <UserContext.Provider value={{ Caption, setCaption, Location, setLocation, Tags, setTags , Userid, setUserid, Likes, setLikes}}>
            {children}
        </UserContext.Provider>
    );
};

export { UserProvider, UserContext };