import React from "react";
import "./BodyPanel.css";
import ProgressCardAnaSayfa from "./ProgressCardAnaSayfa";
import ProgressBarAnaSayfa from "./ProgressBarAnaSayfa";
import Speedometer from "./Speedometer";

function AnaSayfa() {
  return (
    <>
      <div className="panel-path">
        <p className="panel-line"></p>
        <p className="panel-header">Ana Sayfa</p>
      </div>
      <div className="panel-stat">
        <div className="anasayfa-graph">
          <div className="net-graph">
            <p>+</p>
            <p>small niggas</p>
          </div>
          <div className="süreklilik">
            <p>+</p>
            <p>small niggas</p>
            {/* <Speedometer /> */}
          </div>
          <div className="history">
            <div className="progress-table">
              <ProgressCardAnaSayfa/>
              <ProgressCardAnaSayfa/>
              <ProgressCardAnaSayfa/>
              <ProgressCardAnaSayfa/>
            </div>
          </div>
          <div className="dersler">
            <ProgressBarAnaSayfa progress={90} />
            <ProgressBarAnaSayfa progress={70} />
            <ProgressBarAnaSayfa progress={30} />
            <ProgressBarAnaSayfa progress={40} />
          </div>
        </div>
        <div className="panel-takvim">Takvim</div>
      </div>
    </>
  );
}

export default AnaSayfa;
