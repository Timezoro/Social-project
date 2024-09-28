import { useState, useEffect } from "react";
import "./chatlist.css";
import AddUser from "./addUser/AddUser";
import { useUserStore } from "../../../../lib/userStore";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../../../lib/firebase";

const Chatlist = () => {
    const [chats, setChats] = useState([]);
    const [addMode, setAddMode] = useState(false);
    const { currentUser } = useUserStore();

    useEffect(() => {
        // Check if currentUser is defined
        if (!currentUser || !currentUser.id) {
            return; // Exit early if currentUser is not ready
        }

        const unSub = onSnapshot(doc(db, "userchats", currentUser.id), async (res) => {
            const items = res.data()?.chats || []; // Use optional chaining and default to an empty array

            const promises = items.map(async (item) => {
                const userDocRef = doc(db, "users", item.recieverId);
                const userDocSnap = await getDoc(userDocRef);
                const user = userDocSnap.data();

                return { ...item, user };
            });

            const chatData = await Promise.all(promises);

            setChats(chatData.sort((a, b) => b.updateAt - a.updateAt));
        });

        return () => {
            unSub();
        };
    }, [currentUser]);

    return (
        <div className="chatlist-container">
            <div className="chatlist-search">
                <div className="chatlist-searchbar">
                    <img src="./search.png" className="chatlist-img" alt="search" />
                    <input type="text" className="chatlist-input" placeholder="Search" />
                </div>
                <img src={addMode ? "./minus.png" : "./plus.png"}
                    className="chatlist-add" 
                    onClick={() => setAddMode(prev => !prev)} 
                    alt="toggle" />
            </div>

            {chats.map(chat => (
                <div className="chatlist-item" key={chat.chatId}>
                    <img src="./avatar.png" alt="" />
                    <div className="chatlist-text">
                        <span>{chat.user?.username || 'Unknown User'}</span>
                        <p>{chat.lastMessage}</p>
                    </div>
                </div>
            ))}

            {addMode && <AddUser />}
        </div>
    );
}

export default Chatlist;
