import Detail from "./components/message/detail/detail";
import Chat from "./components/message/chat/Chat";
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
