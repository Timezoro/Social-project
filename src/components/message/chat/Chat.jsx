import { useEffect, useRef, useState } from "react";
import "./chat.css";
import EmojiPicker from "emoji-picker-react";
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { useChatStore } from "../../../lib/chatStore";
import { useUserStore } from "../../../lib/userStore";

const Chat = () => {
  const [chat, setChat] = useState(); // Initialize chat state
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  const { currentUser } = useUserStore();
  const { chatId, user } = useChatStore();

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]); // Scroll when chat updates

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res.data()); // Correctly set chat data
    });

    return () => {
      unSub(); // Clean up on unmount
    };
  }, [chatId]);

  console.log(chat);

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };

  const handleSend = async () => {
    if(text === "")return;

    try {
      await updateDoc(doc(db, "chats", chatId),{
         messages: arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: new Date(),
         }),
      });

      const userIDs = [currentUser.id, user.id];

      userIDs.forEach(async (id) => {
        const userChatsRef = doc(db, "userchats", id);
        const userChatSnapShot = await getDoc(userChatsRef);

        if(userChatSnapShot.exists()){
          const userChatsData = userChatSnapShot.data();

          const chatIndex = userChatsData.chats.findIndex(
            (c) => c.chatId === chatId
          );

          userChatsData.chats[chatIndex].lastMessage = text;
          userChatsData.chats[chatIndex].isSeen = id === currentUser.id ? true : false;
          userChatsData.chats[chatIndex].updatedAt = Date.now();

          await updateDoc(userChatsRef, {
            chats: userChatsData.chats,
          })
        }
      });

    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="chat-container">
      {/* Top Component */}
      <div className="chat-top">
        <div className="chat-user">
          <img src="./avatar.png" alt="avatar" />
          <div className="chat-text">
            <span>Mads Mikkelsen</span>
            <p>Lorem Ipsum is simply dummy text of Ipsum.</p>
          </div>
        </div>
        <div className="chattop-icon">
          <img src="./phone.png" alt="phone icon" />
          <img src="./video.png" alt="video icon" />
          <img src="./info.png" alt="info icon" />
        </div>
      </div>

      {/* Center Component */}
      <div className="chatcenter">
        {chat?.messages?.map((message, index) => (
          <div className={`message ${message.senderId === currentUser.id ? 'message-own' : ''}`} key={`${message.createdAt}-${index}`}>
            <div className="chatcenter-texts">
              {message.img && <img src={message.img} alt="" />}
              <p>{message.text}</p>
              {/* <span>{message.createdAt}</span> */}
            </div>
          </div>
        ))}
        <div ref={endRef}></div>
      </div>


      {/* Bottom Component */}
      <div className="chatbottom">
        <div className="chatbottom-icon">
          <img src="./img.png" alt="image icon" />
          <img src="./camera.png" alt="camera icon" />
          <img src="./mic.png" alt="microphone icon" />
        </div>

        <input
          type="text"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="emoji-container">
          <img
            src="./emoji.png"
            alt="emoji icon"
            onClick={() => setOpen((prev) => !prev)}
          />
          <div className="emoji-picker">
            <EmojiPicker open={open} onEmojiClick={handleEmoji} />
          </div>
        </div>

        <button className="sendbttn" onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
