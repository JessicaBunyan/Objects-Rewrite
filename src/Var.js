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
        onDragStart={event => this.drag(event)}
        className={"variable " + v.type}
        id={"var_" + v.id}
      >
        {markup}
      </div>
    );
  }

  drag(ev) {
    ev.dataTransfer.setData("objects/variable", JSON.stringify(this.props.var));
  }
}
