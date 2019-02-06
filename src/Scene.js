import React, { Component } from "react";

export class Scene extends Component {
  render() {
    return <div>{this.props.children}</div>;
  }
}
