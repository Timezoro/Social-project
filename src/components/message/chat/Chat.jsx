import { useState } from "react";
import "./chat.css";
import EmojiPicker from "emoji-picker-react";

const Chat = () => {

  const[open, setOpen] = useState(false);
  const[text, setText] = useState("");

  const handleEmoji = e => {
    setText(prev=>prev+e.emoji);
    setOpen(false)
  }

  return (
    <div className="chat-container">

      <div className="chat-top">
        <div className="chat-user">
          <img src="./avatar.png" alt="avatar" />
          <div className="chat-text">
            <span>Mads Mikkelsen</span>
            <p>
            Lorem Ipsum is simply dummy text of Ipsum.
            </p>
          </div>
        </div>
        <div className="chattop-icon">
          <img src="./phone.png" alt="phone icon" />
          <img src="./video.png" alt="video icon" />
          <img src="./info.png" alt="info icon" />
        </div>
      </div>

      <div className="chat-center"></div>

      <div className="chatbottom">

        <div className="chatbottom-icon">
          <img src="./img.png" alt="image icon" />
          <img src="./camera.png" alt="camera icon" />
          <img src="./mic.png" alt="microphone icon" />
        </div>

        <input type="text" 
        placeholder="Type a message..." 
        value={text} 
        onChange={e=>setText(e.target.value)}
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
  )
}

export default Chat;