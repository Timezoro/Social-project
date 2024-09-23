import React from "react";
import { useEffect } from "react";
import Detail from "./components/message/detail/Detail";
import Chat from "./components/message/chat/Chat";
import List from "./components/message/list/List";
import Login from "./components/login/login";
import Notification from "./components/notification/Notification";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";

const App = () => {
  
  // login page use true or false
  const user = false;

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      console.log(user);
    });

    return () => {
      unSub();
    };
  }, []);

  return (
    <div className='container'> 

      {
        user ? (
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
