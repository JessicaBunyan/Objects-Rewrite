import React, { Component } from "react";
import { calcColour } from "./utils";
import colourDrop from "./img/colourDrop.png";

export class TextBox extends Component {
  render() {
    return <div className={"text-box"}>{this.props.children}</div>;
  }
}
