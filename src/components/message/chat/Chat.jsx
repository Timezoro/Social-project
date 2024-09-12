import "./chat.css";

const Chat = () => {
  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src="./avatar.png" alt="" />
          <div className="text">
            <span>Mads Mikkelsen</span>
            <p>
            Lorem Ipsum is simply dummy text of Ipsum.
            </p>
          </div>
        </div>
        <div className="icon">
          <img src="./phone.png" alt="" />
          <img src="./video.png" alt="" />
          <img src="./info.png" alt="" />
        </div>
      </div>
      <div className="center"></div>
      <div className="bottom"></div>
    </div>
  )
}

export default Chat