import { useState, useEffect } from "react";
import "./chatlist.css";
import AddUser from "./addUser/AddUser";
import { useUserStore } from "../../../../lib/userStore";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../../lib/firebase";
import { useChatStore } from "../../../../lib/chatStore";

const Chatlist = () => {
    const [chats, setChats] = useState([]);
    const [addMode, setAddMode] = useState(false);
    const [input, setInput] = useState("");

    const { currentUser } = useUserStore();
    const { chatId, changeChat } = useChatStore();

    useEffect(() => {
        // Check if currentUser is defined
        if (!currentUser || !currentUser.id) {
            return; // Exit early if currentUser is not ready
        }

        const unSub = onSnapshot(doc(db, "userchats", currentUser.id), async (res) => {
            const items = res.data()?.chats || []; // Use optional chaining and default to an empty array

            const promises = items.map(async (item) => {
                const userDocRef = doc(db, "users", item.receiverId); // Fixed property name
                const userDocSnap = await getDoc(userDocRef);
                const user = userDocSnap.data();

                return { ...item, user }; // Attach user data to the chat item
            });

            const chatData = await Promise.all(promises);

            // Ensure you're using the correct property for sorting
            setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt || 0)); // Add a fallback to avoid NaN
        });

        return () => {
            unSub();
        };
    }, [currentUser.id]);

    const handleSelect = async (chat) => {

        const userChats = chats.map(item => {
            const {user, ...rest} = item; 
            return rest;
        });

        const chatIndex = userChats.findIndex(item => item.chatId === chat.chatId);
        userChats[chatIndex].isSeen = true;

        const userChatsRef = doc(db, "userchats", currentUser.id);

        try {

            await updateDoc(userChatsRef, {
                chats: userChats

            });
            changeChat(chat.chatId, chat.user);
        } catch (err) {
            console.log(err);
        }       
    };

    const filterChats = chats.filter( c => 
        c.user.username.toLowerCase().includes(input.toLowerCase())
    );

    return (
        <div className="chatlist-container">
            <div className="chatlist-search">
                <div className="chatlist-searchbar">
                    <img src="./search.png" className="chatlist-img" alt="search" />
                    <input type="text" className="chatlist-input" placeholder="Search" onChange={(e)=>setInput(e.target.value)}/>
                </div>
                <img src={addMode ? "./minus.png" : "./plus.png"}
                    className="chatlist-add" 
                    onClick={() => setAddMode(prev => !prev)} 
                    alt="toggle" />
            </div>

            {filterChats.map(chat => (
                <div 
                    className="chatlist-item" 
                    key={chat.chatId} 
                    onClick={() => handleSelect(chat)} 
                    style={{backgroundColor: chat?.isSeen ? "transparent" : "#5183fe"}}
                >
                    <img src={chat.user.blocked.includes(currentUser.id) ? "./avatar.png" : chat.user.avatar || "./avatar.png"} alt="Avatar" />
                    <div className="chatlist-text">
                        <span>{chat.user.blocked.includes(currentUser.id) ? "User" : chat.user.username}</span>
                        <p>{chat.lastMessage}</p>
                    </div>
                </div>
            ))}

            {addMode && <AddUser />}
        </div>
    );
}

export default Chatlist;
