import React, { Component } from "react";

export class Var extends Component {
  render() {
    return <div className="variable">{this.props.value}</div>;
  }
}
