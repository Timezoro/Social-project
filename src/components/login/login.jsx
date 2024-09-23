import { useState } from "react";
import "./login.css";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { doc, setDoc } from "firebase/firestore"; 
import upload from "../../lib/upload";

const Login = () => {

    const [avatar, setAvatar] = useState({
        file:null,
        url:""
    });

    const [loading, setLoading] = useState(false)

    const handleAvatar = e => { 
        if(e.target.files[0]){
            setAvatar ({
            file:e.target.files[0],
            url: URL.createObjectURL(e.target.files[0])
            });
        };    
    }

    const handleLogin = async e => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target);

        const {email, password} = Object.fromEntries(formData);

        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            console.log(err);
            toast.error(err.message);
        }finally{
            setLoading(false);
        }
    }

    const handleRegister = async e => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target);

        const {username, email, password} = Object.fromEntries(formData);

        try{
            const res = await createUserWithEmailAndPassword(auth, email, password);
            const userID = res.user.uid;

            const imgURL = await upload(avatar.file)

            await setDoc(doc(db, "users", userID), {
                username: username,
                avatar: imgURL,
                email: email,
                id: userID,
                blocked: [],
              });
        
              await setDoc(doc(db, "userchats", userID), {
                chats: [],
              });
        

            toast.success("Account Created! You can login now!");

        }catch(err){
            console.log(err);
            toast.error(err.message);
        }finally{
            setLoading(false);
        }
    };

  return (
    <div className="login">
        <div className="login-items">

            <h2 style={{fontSize:"25px"}}>Welcome back!</h2>
            <form onSubmit={handleLogin}>
                <input type="text" placeholder="Email" name="email" />
                <input type="password" placeholder="Passwork" name="password" />
                <button disabled={loading}>{loading ? "Loading" : "Sign In"}</button>
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
                <button disabled={loading}>{loading ? "Loading" : "Sign Up"}</button>
                
            </form>

        </div>
    </div>
  )
}

export default Login;