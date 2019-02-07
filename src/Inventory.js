import React, { Component } from "react";

export class Inventory extends Component {
  render() {
    var cName = "inventory ";
    if (this.props.hidden) {
      cName += " hidden ";
    }
    return <div className={cName}>{this.props.children}</div>;
  }
}
