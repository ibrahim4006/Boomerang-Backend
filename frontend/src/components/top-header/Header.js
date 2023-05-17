import React, { useState } from "react";
import logo from "./logo.svg";
import HexagonIcon from "@mui/icons-material/Hexagon";
import ShortTextIcon from "@mui/icons-material/ShortText";
import "./Header.css";
import TimerContainer from "./TimerContainer";
import ayrac from "./zamanayirac.svg";
import PanoCard from "./PanoCard";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Link } from "react-router-dom";

function Header() {
  const [showTimer, setShowTimer] = useState(false);
  const [showPano, setShowPano] = useState(false);
  // const [isButtonClicked, setisButtonClicked] = useState(false);
  const myHeading = document.querySelector("#timer");
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleLogoutClick = () => {
    logout();
  };

  const handleClickTimer = () => {
    setShowTimer(!showTimer);
    if (!showTimer) {
      myHeading.style.borderBottom = "2px solid black";
    } else {
      myHeading.style.borderBottom = "none";
    }
  };
  const handleClickPano = () => {
    if (!showPano) {
      setShowPano(true);
    } else {
      setShowPano(false);
    }
  };

  return (
    <div className="header">
      <div className="logo-header">
        <Link to="/meydan">
          <img className="logonav" src={logo} alt="Boomerang logo" />
        </Link>
      </div>
      <div className="header-right">
        <div id="timer">
          <p className="nav-el text" onClick={handleClickTimer}>
            Zamanlayıcı
          </p>
          {showTimer && (
            <div className="timer-container">
              {/* <img class="ayrac" src={ayrac} alt="Ayiraç" /> */}
              <TimerContainer />
            </div>
          )}
        </div>
        <Link to="/panel" className="panel-link">
          <p className="nav-el text">Görev Panosu</p>
        </Link>
        <p className="nav-el text">Takvim</p>
        <button className="nav-el text" onClick={handleLogoutClick}>
          Log out
        </button>
        <HexagonIcon className="nav-el level" />
        <div className="progress-pano">
          <ShortTextIcon className="nav-el bar" onClick={handleClickPano} />
          {showPano && (
            <div className="pano">
              <PanoCard title="TYT" />
              <PanoCard title="AYT" />
              <PanoCard title="Yarışma" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
