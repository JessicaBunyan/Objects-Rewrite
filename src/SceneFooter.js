import React, { Component } from "react";

const SceneFooter = ({ action }) => (
  <div className="footer" onClick={() => action()} />
);

export default SceneFooter;
