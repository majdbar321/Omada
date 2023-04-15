import React, { useState } from 'react';

const ChatForm = (props) => {
    const [message, setMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
       
        props.onSubmit(message);
        setMessage('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter a message"
            />
            <button type="submit">Send</button>
        </form>
    );
}

export default ChatForm;
