import "./userinfo.css";

const Userinfo = () => {
  return (
    <div className="userinfo">
        <div className="user">
            <img src="./avatar.png" alt="User Avatar" />
            <h2>Cillian</h2>
        </div>
        <div className="icon">
            <img src="./more.png" alt="More Options" />
            <img src="./video.png" alt="Video" />
            <img src="./edit.png" alt="Edit" />
        </div>
    </div>
  );
}

export default Userinfo;
