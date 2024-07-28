import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './color.css';

const Chat = () => {
    const navigate = useNavigate();
    const { chatid } = useParams(); 
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [user1, setUser1] = useState('');
    const [user2, setUser2] = useState('');


    useEffect(() => {
        axios.get(`http://localhost:3001/api/messages/${chatid}`,
            {withCredentials:true}
        )
            .then(response => {
                setMessages(response.data.messages)
                setUser1(response.data.user1)
                setUser2(response.data.user2)
    })
            .catch(err => console.error('Error fetching messages:', err));
    }, [newMessage]);

    const handleSendMessage = () => {
        const message = {
            sender: user1,
            receiver: user2,
            content: newMessage
        };

        axios.post('http://localhost:3001/api/messages', 
            {message},
            {withCredentials:true}
        )
            .then(response => {
                setMessages([...messages, response.data.message]);
                setNewMessage('');
                //navigate(`/chat/${chatid}`)
            })
            .catch(err => console.error('Error sending message:', err));
    };

    return (
        <div className='bg-blue-royal vh-100 d-flex justify-content-end align-items-end'>
        <div className="chat-container bg-white border">
            <div className="messages color-blue">
                {messages.map((msg, index) => (
                    <div key={index} className={msg.sender === user1 ? 'message sent' : 'message received'}>
                        <p>{msg.content}</p>
                        <span>{new Date(msg.timestamp).toLocaleTimeString()}</span>
                    </div>
                ))}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message"
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div></div>
    );
};

export default Chat;
