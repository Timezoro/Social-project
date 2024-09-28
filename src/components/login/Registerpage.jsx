import React, { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  const { setUser, setPassword } = useContext(UserContext);
  const [InputUser, setInputUser] = useState("");
  const [InputPassword, setInputPassword] = useState("");
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleRegister = (e) => {
    e.preventDefault();
    setUser(InputUser);           // Set the user and password
    setPassword(InputPassword);
    
    // After registration, navigate to another page (e.g., the login page or main feed)
    navigate("/login");  // Change "/login" to whatever route you want
  };

  return (
    <section className="bg-slate-600 h-screen w-screen flex items-center justify-center">
      <div className="bg-slate-900 flex rounded-2xl max-w-3xl">
        {/* form */}
        <div className="p-4">
          <h2 className="font-bold text-2xl">Register</h2>

          <form className="flex flex-col gap-4 p-5">
            <input
              onChange={(e) => setInputUser(e.target.value)}
              type="text"
              placeholder="Username"
              className="border border-gray-400 p-2 rounded-lg text-slate-950"
            />
            <input
              onChange={(e) => setInputPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="border border-gray-400 p-2 rounded-lg text-slate-950"
            />
            <div className="flex-row">
              <span className="text-sm"> Already have an account? </span>
              <Link to = "/" className = "text-cyan-500 hover:text-blue-500"> Login </Link>
            </div>
            <button onClick={handleRegister} className="bg-cyan-500 text-white p-2 rounded-lg hover:bg-blue-600">
              <Link to = "/" className="hover:bg-blue-600"> Register </Link>
            </button>
          </form>
        </div>
        {/* picture */}
      </div>
    </section>
  );
}
