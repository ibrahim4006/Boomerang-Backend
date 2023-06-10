import React, { useContext, useEffect, useState } from "react";
import "./Mesajlar.css";
import Search from "./Search";
import Chats from "./Chats";
import {
  collection,
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  where,
  getDocs,
  query,
} from "firebase/firestore";
import { firestore } from "../FireBaseConfig";
import { AuthContext } from "../context/AuthContext";
import InputMessage from "./InputMessage";
import Messages from "./Messages";
import { ChatContext } from "../context/ChatContext";

export default function BodyMesajlar() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(null);
  const [searchButtonClicked, setSearchButtonClicked] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  useEffect(()=>{
    handleSearch()
  },[username])

  const handleSearch = async () => {
    const q = query(
      collection(firestore, "users"),
      where("userName", "==", username)
    );
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleSelect = async () => {
    // Check whether the group (chats in Firestore) exists, if not, create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const chatDoc = doc(firestore, "chats", combinedId);
      const chatDocSnapshot = await getDoc(chatDoc);

      if (!chatDocSnapshot.exists()) {
        // Create a chat document in the "chats" collection
        await setDoc(chatDoc, { messages: [] });
      }

      const currentUserChatDoc = doc(firestore, "userChats", currentUser.uid);
      const userChatDoc = doc(firestore, "userChats", user.uid);

      // Update the "userChats" document for the current user
      await setDoc(
        currentUserChatDoc,
        {
          [combinedId]: {
            userInfo: {
              uid: user.uid,
              userName: user.userName,
              photoURL: user.photoURL,
            },
            date: serverTimestamp(),
          },
        },
        { merge: true }
      );

      // Update the "userChats" document for the selected user
      await setDoc(
        userChatDoc,
        {
          [combinedId]: {
            userInfo: {
              uid: currentUser.uid,
              userName: currentUser.userName,
              photoURL: currentUser.photoURL,
            },
            date: serverTimestamp(),
          },
        },
        { merge: true }
      );
    } catch (err) {
      console.log(err.message);
    }

    setUser(null);
    setUsername("");
  };

  return (
    <div className="bodymesajlar">
      <div className="history-msg">
        <Search
          username={username}
          setUsername={setUsername}
          handleSearch={handleSearch}
          handleSelect={handleSelect}
          user={user ? user : undefined}
          err={err}
          setErr={setErr}
          searchButtonClicked={searchButtonClicked}
          setSearchButtonClicked={setSearchButtonClicked}
        />
        <Chats />
      </div>
      <div className="send-msg">
        <div className="message-top-block">{data.user?.userName}</div>
        <Messages />
        <InputMessage />
      </div>
    </div>
  );
}
