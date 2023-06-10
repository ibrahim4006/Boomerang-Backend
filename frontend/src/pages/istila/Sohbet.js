import React, { useEffect, useState } from "react";
import "./Sohbet.css";
import ok from "./ok.svg";
import io from "socket.io-client";


function Sohbet() {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  // const [socket, setSocket] = useState(null);
  // const ENDPOINT = "localhost:5000"

  // useEffect(() => {
  //   socket = io(ENDPOINT)
  // }, [ENDPOINT]);

  // useEffect(() => {
  //   if (socket) {
  //     socket.on("chat", (msg) => {
  //       setMessages((prevMessages) => [...prevMessages, msg.msg]);
  //       console.log("hello world");
  //     });
  //   }
  // }, [socket]);

  // const handleClickSend = () => {
  //   if (socket) {
  //     socket.emit("chat", { msg: inputValue });
  //     setInputValue("");
  //   }
  // };

  return (
    <div className="sohbet">
      <div className="sohbetarea">
        <div className="leftchatcontainer">
          <h1>Come on</h1>
        </div>
        {/* <div className="rightchatcontainer">
          {messages.map((msg, index) => (
            <h1 key={index}>{msg}</h1>
          ))}
        </div> */}
      </div>
      <form className="sendmesssage">
        <input
          className="typemessage"
          type="text"
          placeholder="Mesaj Gönder..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <img
          src={ok}
          alt="sendmessageicon"
          className="sendmessageicon"
        />
      </form>
    </div>
  );
}

export default Sohbet;
