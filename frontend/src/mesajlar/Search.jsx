import React, { useState } from "react";
import "./Mesajlar.css";
import search from "./search.svg";
import Plus from "./Plus.svg";
import Grup from "./grup.svg";
import Trash from "./trashbox.svg";
import { firestore } from "../FireBaseConfig";
import { getDocs, query, where } from "firebase/firestore";

function Search({ username, setUsername, handleSearch, user, handleSelect,err,searchButtonClicked,setSearchButtonClicked }) {
  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleFocus = () => {
    setSearchButtonClicked(true);
  };

  const handleBlur = () => {
    setSearchButtonClicked(false);
  };

  return (
    <div className="history-msg-top">
      <div className="searchbox-mesajlar">
        <input
          type="text"
          className="search-text"
          placeholder="Find a user"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <button className="search-icon-box" onClick={() => handleSearch()}>
          <img
            src={search}
            alt="message-search-icon"
            className="message-search-icon"
          />
        </button>
        {err && searchButtonClicked && <span className="error-msg-mesajlar">User Not found</span>}
        {user && (
        <div className="userChat" onClick={()=> handleSelect()}>
          <img src={user.photoURL} alt="user-profile-img" className="user-profile-img"/>
          <div className="userChatInfo">
            <span>{user.userName}</span>
          </div>
        </div>
      )}
      </div>
      <div className="message-icons">
        <img src={Trash} />
        <img src={Plus} />
        <img src={Grup} />
      </div>
    </div>
  );
}

export default Search;
