import { useState } from "react";
import "./login.css";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import upload from "../../lib/upload";

const Login = () => {
    // Separate avatar state for registration (no avatar for login unless needed)
    const [registerAvatar, setRegisterAvatar] = useState({
        file: null,
        url: ""
    });

    const [loading, setLoading] = useState(false);
    const [userAvatar, setUserAvatar] = useState(""); // Stores the logged-in user's avatar

    // Avatar handler for registration
    const handleRegisterAvatar = e => {
        if (e.target.files[0]) {
            setRegisterAvatar({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            });
        }
    };

    // Login handler
    const handleLogin = async e => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target);
        const { email, password } = Object.fromEntries(formData);

        try {
            const res = await signInWithEmailAndPassword(auth, email, password);
            const userID = res.user.uid;

            // Fetch the user's avatar from Firestore when logging in
            const userDoc = await getDoc(doc(db, "users", userID));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                setUserAvatar(userData.avatar); // Set the user's avatar from the database
            }
        } catch (err) {
            console.log(err);
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Register handler
    const handleRegister = async e => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target);
        const { username, email, password } = Object.fromEntries(formData);

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            const userID = res.user.uid;

            // Upload avatar image to storage and get the URL
            const imgURL = await upload(registerAvatar.file);

            // Save the new user's data, including the avatar, to Firestore
            await setDoc(doc(db, "users", userID), {
                username: username,
                avatar: imgURL,
                email: email,
                id: userID,
                blocked: [],
            });

            // Set the newly registered user's avatar to their own uploaded one
            setUserAvatar(imgURL); 

            toast.success("Account Created! You can login now!");

        } catch (err) {
            console.log(err);
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login">
            <div className="login-items">
                <h2 style={{ fontSize: "25px" }}>Welcome back!</h2>
                <form onSubmit={handleLogin}>
                    <input type="text" placeholder="Email" name="email" />
                    <input type="password" placeholder="Password" name="password" />
                    <button disabled={loading}>{loading ? "Loading" : "Sign In"}</button>
                </form>

                {/* Display the logged-in user's avatar */}
                {userAvatar && (
                    <div className="avatar-preview">
                        <img src={userAvatar} alt="User Avatar" />
                    </div>
                )}
            </div>

            <div className="login-separator"></div>

            <div className="login-items">
                <h2 style={{ fontSize: "25px" }}>Create an Account</h2>
                <form onSubmit={handleRegister}>
                    <label htmlFor="registerFile">
                        <img src={registerAvatar.url || "./avatar.png"} alt="Upload Avatar" />
                        Upload an Image
                    </label>
                    <input
                        type="file"
                        id="registerFile"
                        style={{ display: "none" }}
                        onChange={handleRegisterAvatar}
                    />
                    <input type="text" placeholder="Username" name="username" />
                    <input type="text" placeholder="Email" name="email" />
                    <input type="password" placeholder="Password" name="password" />
                    <button disabled={loading}>{loading ? "Loading" : "Sign Up"}</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
