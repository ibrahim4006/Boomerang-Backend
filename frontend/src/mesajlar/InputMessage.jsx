import React, { useContext, useState } from "react";
import boomerang from "./messagesendicon.svg";
import "./Mesajlar.css";
import { firestore } from "../FireBaseConfig";
import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";

export default function InputMessage() {
  const [inputValue, setInputValue] = useState("");

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleKey = (e) => {
    e.code === "Enter" && handleSendMessage();
  };

  const handleSendMessage = async () => {
    // if (img) {
    //   const storageRef = ref(storage, uuid());

    //   const uploadTask = uploadBytesResumable(storageRef, img);

    //   uploadTask.on(
    //     (error) => {
    //       //TODO:Handle Error
    //     },
    //     () => {
    //       getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
    //         await updateDoc(doc(db, "chats", data.chatId), {
    //           messages: arrayUnion({
    //             id: uuid(),
    //             text,
    //             senderId: currentUser.uid,
    //             date: Timestamp.now(),
    //             img: downloadURL,
    //           }),
    //         });
    //       });
    //     }
    //   );
    // }
    if (inputValue) {
      await updateDoc(doc(firestore, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuidv4(),
          inputValue,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(firestore, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        inputValue,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(firestore, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        inputValue,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setInputValue("");
  };
  return (
    <div className="message-bottom-block">
      <input
        type="text"
        placeholder="Mesaj Gönder..."
        value={inputValue}
        onKeyDown={handleKey}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <img
        src={boomerang}
        alt="sendmessageicon"
        className="sendmessageboomerang"
        onClick={() => handleSendMessage()}
      />
    </div>
  );
}
