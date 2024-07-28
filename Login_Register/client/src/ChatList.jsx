import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from 'axios';

const ChatList = () => {
    const { userId } = useParams();
    const [chats, setChats] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3001/api/userId/chats`,
            { withCredentials: true }
        )
            .then(response => {
                setChats(response.data);
            })
            .catch(err => {
                console.error('Error fetching chats:', err);
            });
    }, [userId]);

    if (chats.length === 0) return <div className='d-flex vh-100 justify-content-end align-items-end bg-blue-royal display-3'>
        <div className='bg-white rounded-2'>
            No chats found.
        </div></div>;

    return (
        <div className='bg-blue-royal vh-100'>
            {chats.map(chat => (
                <div
                style={{ width: "60%", margin: "0 auto", minHeight: "12vh" }}
                    key={chat._id}>
                    <div className='bg-white rounded-2'>
                        <Link to={`/chat/${chat._id}`}
                        className="btn my-3 p-3 bg-white rounded-2 w-100">
                            Chat with {chat.receiver === userId ? chat.receiverName : chat.senderName }
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ChatList;
