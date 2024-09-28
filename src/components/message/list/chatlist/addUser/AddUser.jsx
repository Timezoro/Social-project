import { collection, getDoc, query, where } from "firebase/firestore";
import { db } from "../../../../../lib/firebase";
import "./addUser.css";
import { useState } from "react";
import { getDocs } from "firebase/firestore";

const AddUser = () => {

  const [user, setUser] = useState(null);

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

  }
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
            <button>Add User</button>
        </div>}
    </div>
  )
}

export default AddUser