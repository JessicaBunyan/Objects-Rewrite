import React, { Component } from "react";
import backChevron from "./img/back-chevron.png";

const SceneFooter = ({ action }) => (
  <div className="footer" onClick={() => action()}>
  <i></i>
    <img className="back-chevron" src={backChevron} />
  </div>
);

export default SceneFooter;
