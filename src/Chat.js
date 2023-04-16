import React, { useState, useEffect } from 'react';
import './Chat.css';

function Chat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState(null);
  const [isTyping, setIsTyping] = useState(false); // new state variable

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      setMessages([...messages, { text: message, sender: 'user', likes: 0 }]);
      setMessage('');
      setIsTyping(true); // set isTyping to true when the user types a message
    }
  };

  const handleLike = (index) => {
    const newMessages = [...messages];
    newMessages[index].likes = 1 - newMessages[index].likes;
    setMessages(newMessages);
  };

  const handleDelete = (index) => {
    setMessageToDelete(index);
    setShowDeletePopup(true);
  };

  const confirmDelete = () => {
    const newMessages = messages.filter((_, i) => i !== messageToDelete);
    setMessages(newMessages);
    setMessageToDelete(null);
    setShowDeletePopup(false);
  };

  const cancelDelete = () => {
    setMessageToDelete(null);
    setShowDeletePopup(false);
  };

  useEffect(() => {
    if (messages.length && messages[messages.length - 1].sender === 'user') {
      setTimeout(() => {
        setMessages([...messages, { text: 'Sent message by majd', sender: 'system', likes: 0 }]);
        setIsTyping(false); // set isTyping back to false when the system sends a response
      }, 1000);
    }
  }, [messages]);

  const handleMinimize = () => {
    const chat = document.querySelector('.chat');
    chat.classList.toggle('minimized');
  };

  return (
    <div className="chat">
      <button className="minimize" onClick={handleMinimize}>v</button>
      <div className="messages">
        {messages.map((msg, index) => (
          <div className={`message ${msg.sender}`} key={index}>
            <div className="user-image"></div>
            <p>{msg.text}</p>
            <div className="message-options">
              <button className={`like-btn ${msg.likes === 1 ? 'liked' : ''}`} onClick={() => handleLike(index)}>
                {msg.likes === 1 ? (
                  <span role="img" aria-label="like">❤️</span>
                ) : (
                  <span role="img" aria-label="dislike">🖤</span>
                )}
              </button>
              {msg.sender === 'user' && (
                <button className="options-btn" onClick={() => handleDelete(index)}>
                  ⋮
                </button>
              )}
            </div>
          </div>
        ))}
        {isTyping && <div className="message system">. . . .</div>} {/* show typing dots when isTyping is true */}
      </div>
      <form className="message-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message"
        />
        <button type="submit">Send </button>
        </form>
  {showDeletePopup && (
    <div className="delete-popup">
      <p>Are you sure you want to delete this message?</p>
      <button onClick={confirmDelete}>Yes</button>
      <button onClick={cancelDelete}>Cancel</button>
    </div>
  )}
</div>
);
}

export default Chat;
