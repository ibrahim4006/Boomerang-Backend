import React from "react";
import "./BodyPanel.css";
import Search from "./search.svg"
import Plus from "./Plus.svg"
import Grup from "./grup.svg"

export default function Mesajlar() {
  return (
    <div className="panel-mesajlar">
      <div className="history-msg">
        <div className="history-msg-top">
          <div className="panel-path">
            <p className="panel-line"></p>
            <p className="panel-header">Mesajlar</p>
          </div>
          <div className="message-icons">
            <img src={Search} />
            <img src={Plus} />
            <img src={Grup} />
          </div>
        </div>
        <div className="history-msg-bottom">
            HEllo World
        </div>
      </div>
      <div className="send-msg">HEllo World</div>
    </div>
  );
}
