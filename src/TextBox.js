import React, { Component } from "react";
import { calcColour } from "./utils";
import colourDrop from "./img/colourDrop.png";

export const TextBox = ({ className, children }) => {
  return <div className={" text-box " + className}>{children}</div>;
};
