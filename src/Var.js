import React, { Component } from "react";

export class Var extends Component {
  render() {
    if (!this.props.var) {
      return null;
    }
    return (
      <div
        draggable="true"
        onDragStart={event => this.drag(event)}
        className={"variable " + this.props.var.type}
        id={"var_" + this.props.var.id}
      >
        {this.props.var.value}
      </div>
    );
  }

  drag(ev) {
    ev.dataTransfer.setData("objects/variable", JSON.stringify(this.props.var));
  }
}
