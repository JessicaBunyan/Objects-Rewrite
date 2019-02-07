import React, { Component } from "react";

export class Button extends Component {
  render() {
    var cName = " button ";
    if (this.props.pressed) {
      cName += " pressed ";
    }
    if (this.props.failPressed) {
      cName += " fail-pressed";
    }
    return (
      <div className={cName} onClick={this.props.onClick}>
        {this.props.children}
      </div>
    );
  }
}
