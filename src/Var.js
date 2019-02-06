import React, { Component } from "react";

export class Var extends Component {
  render() {
    if (!this.props.var) {
      return null;
    }

    var v = this.props.var;

    var markup = v.type == "number" ? v.value : "colour";
    return (
      <div
        draggable="true"
        onDragStart={event => this.dragStart(event)}
        onDragEnd={event => this.dragEnd(event)}
        className={"variable " + v.type}
        id={"var_" + v.id}
      >
        {markup}
      </div>
    );
  }

  dragStart(ev) {
    ev.dataTransfer.setData("objects/variable", JSON.stringify(this.props.var));
  }

  dragEnd(ev) {}
}
