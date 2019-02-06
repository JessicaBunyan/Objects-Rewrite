import React, { Component } from "react";
import postbox from "./img/postboxGrey.png";

export class Pillar extends Component {
  render() {
    return (
      <div className="pillar-region">
        <img src={postbox} />
        {this.props.children}
      </div>
    );
  }
}
