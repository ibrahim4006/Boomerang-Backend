import React, { useContext, useEffect, useState } from "react";
import "./Mesajlar.css";
import MessageUserContainer from "./MessageUserContainer";
import { doc, onSnapshot } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import { firestore } from "../FireBaseConfig";
import { ChatContext } from "../context/ChatContext";

export default function Chats() {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(
        doc(firestore, "userChats", currentUser.uid),
        (doc) => {
            setChats(doc.data());;
        }
      );

      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelectChat = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };
  return (
    <div className="history-msg-bottom">
      {chats &&
        Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat) => (
          <MessageUserContainer
            handleSelectChat={handleSelectChat}
            chat={chat}
            key={chat[0]}
          />
        ))}
    </div>
  );
}
