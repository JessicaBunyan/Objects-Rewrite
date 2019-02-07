import React, { Component } from "react";

export class Inventory extends Component {
  render() {
    var cName = "inventory ";
    if (this.props.visible) {
      cName += " visible ";
    }
    return <div className={cName}>{this.props.children}</div>;
  }
}
