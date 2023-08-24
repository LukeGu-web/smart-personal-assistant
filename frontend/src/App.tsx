import { useState } from 'react';
import AIButton from './components/AIButton/AIButton';
import MessagesPane from './components/MessagesPane/MessagesPane';
import './App.css';

function App() {
  const [showChat, setShowChat] = useState(false);
  return (
    <>
      {showChat ? (
        <MessagesPane onClose={() => setShowChat(false)} />
      ) : (
        <AIButton onClick={() => setShowChat(true)} />
      )}
    </>
  );
}

export default App;
