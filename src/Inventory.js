import React, { Component } from "react";

export class Inventory extends Component {
  render() {
    return <div className="inventory">{this.props.children}</div>;
  }
}
