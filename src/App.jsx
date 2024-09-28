import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from "./context/UserContext";
import Detail from "./components/message/detail/Detail";
import Chat from "./components/message/chat/chat";
import List from "./components/message/list/List";
import Login from "./components/login/Loginpage";
import Register from "./components/login/Registerpage";

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/list" element={<List />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
