import { useState } from "react";
import "./chatlist.css";

const Chatlist = () => {
    const [addMode, setAddMode] = useState(false);
  return (
    <div>

        <div className="search">
            <div className="searchbar">
                <img src="./search.png" className="img" alt="search" />
                <input type="text" className="input" placeholder="Search" />
            </div>
            <img src={addMode ? "./minus.png" : "./plus.png"}
            className="add" 
            onClick={() => setAddMode(prev => !prev)} 
            alt="toggle" />
        </div>

        <div className="item">
            <img src="./avatar.png" alt="" />
            <div className="text">
                <span>Bill Skarsgård</span>
                <p>Hello</p>
            </div>
        </div>

        <div className="item">
            <img src="./avatar.png" alt="" />
            <div className="text">
                <span>Bill Skarsgård</span>
                <p>Hello</p>
            </div>
        </div>

        <div className="item">
            <img src="./avatar.png" alt="" />
            <div className="text">
                <span>Bill Skarsgård</span>
                <p>Hello</p>
            </div>
        </div>

        <div className="item">
            <img src="./avatar.png" alt="" />
            <div className="text">
                <span>Bill Skarsgård</span>
                <p>Hello</p>
            </div>
        </div>

        <div className="item">
            <img src="./avatar.png" alt="" />
            <div className="text">
                <span>Bill Skarsgård</span>
                <p>Hello</p>
            </div>
        </div>        

    </div>
  )
}

export default Chatlist