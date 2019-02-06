import React, { Component } from "react";

export class Nav extends Component {
  render() {
    return <div className="scene nav-scene">{this.props.children}</div>;
  }
}
