import React from "react";
import { useEffect } from "react";
import Detail from "./components/message/detail/Detail";
import Chat from "./components/message/chat/Chat";
import List from "./components/message/list/List";
import Login from "./components/login/login";
import Notification from "./components/notification/Notification";
import CreateSite from "./components/mainsite/createPost/createSite";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import { useUserStore } from "./lib/userStore";

const App = () => {
  
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
    });

    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

  if (isLoading) return <div className="loading">Loading...</div>

  return (
    <div className=' container '> 

      {
        currentUser ? (
        <>

          <List />
          <Chat />
          <Detail /> 

        </>          
      ) : (
        
        <Login />
      )}
      
      <Notification />

    </div>
  );
}

export default App;
