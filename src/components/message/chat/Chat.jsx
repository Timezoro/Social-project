import { useEffect, useRef, useState } from "react";
import "./chat.css";
import EmojiPicker from "emoji-picker-react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../lib/firebase";

const Chat = () => {
  const [chat, setChat] = useState(); // Initialize chat state
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]); // Scroll when chat updates

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", "4Xe0QDtGtbXKombaa5qv"), (res) => {
      setChat(res.data()); // Correctly set chat data
    });

    return () => {
      unSub(); // Clean up on unmount
    };
  }, []);

  console.log(chat);

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };

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
        {/* Render chat messages dynamically based on chat state */}
        {chat?.messages?.map((message, index) => (
          <div className={`message ${message.isOwn ? 'message-own' : ''}`} key={index}>
            {!message.isOwn && <img src="./avatar.png" alt="user avatar" />}
            <div className="chatcenter-text">
              <p>{message.text}</p>
              <span>{message.timestamp}</span> {/* Adjust according to your data structure */}
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

        <button className="sendbttn">Send</button>
      </div>
    </div>
  );
};

export default Chat;
