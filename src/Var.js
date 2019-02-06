import React, { Component } from "react";

export class Var extends Component {
  render() {
    if (!this.props.value) {
      return null;
    }
    return (
      <div
        draggable="true"
        onDragStart={event => this.drag(event)}
        className="variable"
      >
        {this.props.value}
      </div>
    );
  }

  drag(ev) {
    const val = this.props.value;
    ev.dataTransfer.setData("objects/variable", val);
  }
}
