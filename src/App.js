import React, { useState } from 'react';
import ChatForm from './ChatForm';
import DirectoryStructure from './DirectoryStructure';
import VideoCallBox from './VideoCallBox';
import './App.css';

const App = () => {
  
  const [messages, setMessages] = useState([]);

  const onSubmit = (message) => {
    setMessages([...messages, message]);
  };

  return (

   <div className="app">
  

        
      <VideoCallBox />
      <DirectoryStructure messages={messages} />
      <ChatForm onSubmit={onSubmit} />
  
    </div>
  );
 
};

export default App;
