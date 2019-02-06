import React, { Component } from "react";

export class Scene extends Component {
  render() {
    return <div className="scene">{this.props.children}</div>;
  }
}
