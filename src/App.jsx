import Detail from "./components/message/detail/Detail";
import Chat from "./components/message/chat/chat";
import List from "./components/message/list/List";

const App = () => {
  return (
    <div className='container'>
      <List />
      <Chat />
      <Detail />
    </div>
  );
}

export default App;
