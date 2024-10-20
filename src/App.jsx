import React from "react";
import { useEffect } from "react";
import Detail from "./components/message/detail/Detail";
import Chat from "./components/message/chat/Chat";
import List from "./components/message/list/List";
import Login from "./components/login/login";
import Notification from "./components/notification/Notification";
import { BrowserRouter as Router, Route, Routes, useNavigate, BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Mainfeed from "./components/mainsite/mainfeed/Mainfeed";
import CreateSite from "./components/mainsite/mainfeed/createSite";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import { useUserStore } from "./lib/userStore";
import { useChatStore } from "./lib/chatStore";
import { useContext } from 'react';
import { UserContext } from './context/UserContext';

const App = () => {

  const { currentUser, isLoading, fetchUserInfo  } = useUserStore();
  const { chatId } = useChatStore();
  const { setUserid } = useContext(UserContext);

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
      localStorage.setItem("uid", user?.uid);
      if(user) setUserid(user.uid);
    });

    return () => {
      unSub();
    };
  }, [fetchUserInfo]);




  if (isLoading) return <div className="loading">Loading...</div>




  return (
    <BrowserRouter>
      <UserProvider>

        <Routes>
          {
            currentUser ? (
              <>

                <Route path="/create" element={<CreateSite />} />
                <Route path="/" element={<Mainfeed />} />
                <Route path="/chat" element={
                  <div className = "flex  overflow-auto h-screen w-screen">
                    <List />
                    {chatId && <Chat />}
                    {chatId && <Detail />}
                  </div>
                } />

              </>
            )
            : (
              <>
                  <Route path="/" element={<Login />} />
                </>
              )
            }


          {/* {
        currentUser ? (
        <>
          
          <List />
          {chatId && <Chat />}
          {chatId && <Detail /> }

        </>          
      ) : (
        <Login />
      )}

      <Notification /> */}

        </Routes>
      </UserProvider>

    </BrowserRouter>

  );
}

export default App;
