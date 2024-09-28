import React from "react";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Loginpage = () => {
    const {User,setUser, password, setPassword} = useContext(UserContext);
    const [InputUser, setInputUser] = useState(User);
    const [InputPassword, setInputPassword] = useState(password);

    const handleLogin = (e) => {
        e.preventDefault();
        setUser(InputUser);
        setPassword(InputPassword);

        // After registration, navigate to another page (e.g., the login page or main feed)
        navigate("/Mainfeed");  // Change "/login" to whatever route you want
    };

    return (

        <section className="bg-slate-600 h-screen w-screen flex items-center justify-center" >
            <div className="bg-slate-900 flex rounded-2xl max-w-3xl">
                {/* form */}
                <div className="p-4">
                    <h2 className = "font-bold text-2xl">Login</h2>

                    <form className= "flex flex-col gap-4 p-5">
                        <input onChange={e => setInputUser(e.target.value)} type="text" placeholder="Username" className="border border-gray-400 p-2 rounded-lg text-slate-950" />
                        <input onChange={e=> setInputPassword(e.target.value)} type="password" placeholder="Password" className="border border-gray-400 p-2 rounded-lg text-slate-950" />
                        <div className="flex-row">
                            <span className="text-sm"> Don't Have account? </span>
                            <Link to = "/register" className="text-cyan-500 hover:text-blue-400">Register</Link>
                        </div>
                        <button onClick= {e => handleLogin()} className="bg-cyan-500 text-white p-2 rounded-lg hover:bg-blue-600">Login</button>
                    </form>
                </div>
                
            </div>
        </section>
    );  
};

export default Loginpage;