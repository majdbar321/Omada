import React, { useState } from 'react';

const ChatForm = (props) => {
  const [message, setMessage] = useState('');
  const [isHidden, setIsHidden] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    props.onSubmit(message);
    setMessage('');
  };

  const handleToggle = () => {
    setIsHidden(!isHidden);
  };

  return (
    <div className={`chat-form ${isHidden ? 'hidden' : ''}`}>
      <div className="header">
        <h2>Chat Form</h2>
        <button className="toggle-btn" onClick={handleToggle}>
          {isHidden ? '+' : '-'}
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter a message"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatForm;
