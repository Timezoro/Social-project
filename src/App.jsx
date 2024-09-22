import Detail from "./components/message/detail/Detail";
import Chat from "./components/message/chat/Chat";
import List from "./components/message/list/List";
import Login from "./components/login/login";
import Notification from "./components/notification/Notification";

const App = () => {
  
  // login page use true or false
  const user = false;

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
