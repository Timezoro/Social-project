import React from "react";
import Detail from "./components/message/detail/Detail";
import Chat from "./components/message/chat/chat";
import List from "./components/message/list/List";
import Login from "./components/login/Loginpage";

const App = () => {
  return (
    <div>
      <Login />
      {/* <List />
      <Chat />
      <Detail /> */}
    </div>
  );
}

export default App;
