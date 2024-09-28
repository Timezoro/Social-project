import { collection, doc, query, serverTimestamp, setDoc, where, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../../../../lib/firebase";
import "./addUser.css";
import { useState } from "react";
import { getDocs } from "firebase/firestore";
import { getDoc } from "firebase/firestore";
import { useUserStore } from "../../../../../lib/userStore";

const AddUser = () => {

  const [user, setUser] = useState(null);
  const { currentUser } = useUserStore();

  const handleSearch = async e=> {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");

    try {

      const userRef = collection(db, "users");

      const q = query(userRef, where("username", "==", username));

      const querySnapShot = await getDocs(q);

      if(!querySnapShot.empty){
        setUser(querySnapShot.docs[0].data())
      }
      
    } catch (err) {
      console.log(err);
    }
  };

  const handleAdd = async () => {
    const chatRef = collection(db, "chats");
    const userChatRef = collection(db, "userchats");

    try {
        // Create a unique document ID for the new chat
        const newChatRef = doc(chatRef); // Firestore will auto-generate a unique ID

        // Set the new chat document
        await setDoc(newChatRef, {
            createdAt: serverTimestamp(),
            messages: []
        });

        // Check if the user and current user IDs are valid
        if (user && user.id && currentUser && currentUser.id) {
            // Check if user document exists in userchats
            const userChatDoc = await getDoc(doc(userChatRef, user.id));
            const currentUserChatDoc = await getDoc(doc(userChatRef, currentUser.id));

            // If the user chat document doesn't exist, create it
            if (!userChatDoc.exists()) {
                await setDoc(doc(userChatRef, user.id), { chats: [] });
            }

            // If the current user chat document doesn't exist, create it
            if (!currentUserChatDoc.exists()) {
                await setDoc(doc(userChatRef, currentUser.id), { chats: [] });
            }

            // Update both user chat references
            await updateDoc(doc(userChatRef, user.id), {
                chats: arrayUnion({
                    chatId: newChatRef.id,
                    lastMessage: "",
                    receiverId: currentUser.id,
                    updatedAt: Date.now(),
                }),
            });

            await updateDoc(doc(userChatRef, currentUser.id), {
                chats: arrayUnion({
                    chatId: newChatRef.id,
                    lastMessage: "",
                    receiverId: user.id,
                    updatedAt: Date.now(),
                }),
            });
        }
        
    } catch (err) { 
        console.error("Error adding user chat: ", err);
    }
  };

  return (
    <div className="addUser">
        <form onSubmit={handleSearch}>
            <input type="text" placeholder="Username" name="username"/>
            <button>Search</button>
        </form>
        {user && <div className="user">
            <div className="user-detail">
              <img src={user.avatar || "https://via.placeholder.com/150"} alt="User Avatar" />
                <span>{user.username}</span>
            </div>
            <button onClick={handleAdd }>Add User</button>
        </div>}
    </div>
  )
}

export default AddUser