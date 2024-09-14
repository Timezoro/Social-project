import { useState } from "react";
import "./chatlist.css";

const Chatlist = () => {
    const [addMode, setAddMode] = useState(false);
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

        {/* Testing for the mssage */}
        <div className="chatlist-item">
            <img src="./avatar.png" alt="" />
            <div className="chatlist-text">
                <span>Bill Skarsgård</span>
                <p>Hello</p>
            </div>
        </div>

        <div className="chatlist-item">
            <img src="./avatar.png" alt="" />
            <div className="chatlist-text">
                <span>Bill Skarsgård</span>
                <p>Hello</p>
            </div>
        </div>

        <div className="chatlist-item">
            <img src="./avatar.png" alt="" />
            <div className="chatlist-text">
                <span>Bill Skarsgård</span>
                <p>Hello</p>
            </div>
        </div>

        <div className="chatlist-item">
            <img src="./avatar.png" alt="" />
            <div className="chatlist-text">
                <span>Bill Skarsgård</span>
                <p>Hello</p>
            </div>
        </div>

        <div className="chatlist-item">
            <img src="./avatar.png" alt="" />
            <div className="chatlist-text">
                <span>Bill Skarsgård</span>
                <p>Hello</p>
            </div>
        </div> 

        <div className="chatlist-item">
            <img src="./avatar.png" alt="" />
            <div className="chatlist-text">
                <span>Bill Skarsgård</span>
                <p>Hello</p>
            </div>
        </div>

        <div className="chatlist-item">
            <img src="./avatar.png" alt="" />
            <div className="chatlist-text">
                <span>Bill Skarsgård</span>
                <p>Hello</p>
            </div>
        </div> 

        <div className="chatlist-item">
            <img src="./avatar.png" alt="" />
            <div className="chatlist-text">
                <span>Bill Skarsgård</span>
                <p>Hello</p>
            </div>
        </div>

        <div className="chatlist-item">
            <img src="./avatar.png" alt="" />
            <div className="chatlist-text">
                <span>Bill Skarsgård</span>
                <p>Hello</p>
            </div>
        </div> 

    </div>
  )
}

export default Chatlist;
