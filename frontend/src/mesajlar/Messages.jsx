import React, { useContext, useEffect, useState } from 'react'
import "./Mesajlar.css"
import { firestore } from '../FireBaseConfig';
import { doc, onSnapshot } from 'firebase/firestore';
import Message from './Message';
import { ChatContext } from '../context/ChatContext';

export default function Messages() {
    const [messages, setMessages] = useState([]);
    const { data } = useContext(ChatContext);

    useEffect(() => {
        const unSub = onSnapshot(doc(firestore, "chats", data.chatId), (doc) => {
          doc.exists() && setMessages(doc.data().messages);
        });
    
        return () => {
          unSub();
        };
      }, [data.chatId]);
      
  return (
    <div className="message-middle-block">
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  )
}
