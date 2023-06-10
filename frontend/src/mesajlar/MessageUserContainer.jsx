import React from 'react'
import "./Mesajlar.css";
import Trash from "./trashbox.svg";

export default function MessageUserContainer({chat,handleSelectChat}) {
  return (
    <div className='history-message-users' onClick={() => handleSelectChat(chat[1].userInfo)} >
      <div className='user-photo'>
        <img src={chat[1].userInfo?.photoURL} alt="chat-profile" className='user-profile-photo'/>
      </div>
      <div className='user-name-lastmessage'>
        <div className='user-name'><b>{chat[1].userInfo?.userName}</b></div>
        <div className='user-lastmessage'><p>{chat[1].lastMessage?.inputValue}</p></div>
      </div>
    </div>
  )
}
