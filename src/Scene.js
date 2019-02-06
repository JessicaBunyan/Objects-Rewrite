import React, { Component } from "react";

export class Scene extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div
        className={"scene " + (this.props.active == true ? "active" : "")}
        onClick={() => this.props.onClick()}
      >
        {this.props.children}
      </div>
    );
  }
}
