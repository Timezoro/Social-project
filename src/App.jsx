import React from "react";
import { useEffect } from "react";
import Detail from "./components/message/detail/Detail";
import Chat from "./components/message/chat/Chat";
import List from "./components/message/list/List";
import Login from "./components/login/login";
import Notification from "./components/notification/Notification";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import { useUserStore } from "./lib/userStore";
import { useChatStore } from "./lib/chatStore";

const App = () => {
  
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();
  const { chatId } = useChatStore();

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
          {chatId && <Chat />}
          {chatId && <Detail /> }

        </>          
      ) : (
        <Login />
      )}

      <Notification />

    </div>
  );
}

export default App;
