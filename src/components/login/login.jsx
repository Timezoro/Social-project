import { useState } from "react";
import "./login.css";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { doc, setDoc } from "firebase/firestore"; 

const Login = () => {

    const [avatar, setAvatar] = useState({
        file:null,
        url:""
    })

    const handleAvatar = e => { 
        if(e.target.files[0]){
            setAvatar ({
            file:e.target.files[0],
            url: URL.createObjectURL(e.target.files[0])
            })
        }    
    }

    const handleLogin = e => {
        e.preventDefault();
        // toast.success("Hello")
    }

    const handleRegister = async e => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const {username, email, password} = Object.fromEntries(formData);

        try{
            const res = await createUserWithEmailAndPassword(auth, email, password);
            const userID = res.user.uid;

            await setDoc(doc(db, "users", userID), {
                username: username,
                email: email,
                id: userID,
                blocked: [],
              });
        
              await setDoc(doc(db, "userchats", userID), {
                chats: [],
              });
        

            toast.success("Account Created! You can login now!")

        }catch(err){
            console.log(err)
            toast.error(err.message)
        }
    }

  return (
    <div className="login">
        <div className="login-items">

            <h2 style={{fontSize:"25px"}}>Welcome back!</h2>
            <form onSubmit={handleLogin}>
                <input type="text" placeholder="Email" name="email" />
                <input type="password" placeholder="Passwork" name="password" />
                <button>Sign In</button>
            </form>

        </div>

        <div className="login-separator"></div>

        <div className="login-items">
        <h2 style={{fontSize:"25px"}}>Create an Account</h2>

            <form onSubmit={handleRegister}>

                <label htmlFor="file">
                    <img src={avatar.url || "./avatar.png"} alt="" />
                    Upload an Image
                </label>

                <input type="file"id="file" style={{display:"none"}} onChange={handleAvatar}/>
                <input type="text" placeholder="Username" name="username" />
                <input type="text" placeholder="Email" name="email" />
                <input type="password" placeholder="Passwork" name="password" />
                <button>Sign Up</button>
                
            </form>

        </div>
    </div>
  )
}

export default Login;