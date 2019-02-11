import React, { Component } from "react";
import { calcColour, getTearDropImgSource } from "./utils";
import colourDrop from "./img/colourDrop.png";

export class Var extends Component {
  render() {
    if (!this.props.var) {
      return null;
    }
    var v = this.props.var;

    if (v.type == "colour") {
      return (
        <img
          className="variable colour"
          draggable="true"
          onDragStart={event => this.dragStart(event)}
          onDragEnd={event => this.dragEnd(event)}
          src={getTearDropImgSource(calcColour(this.props.var.value))}
          id={"var_" + v.id}
        />
      );
    }

    return (
      <div
        draggable={this.props.draggable}
        onDragStart={event => this.dragStart(event)}
        onDragEnd={event => this.dragEnd(event)}
        className={"variable " + v.type}
        id={"var_" + v.id}
      >
        {v.value}
      </div>
    );
  }

  dragStart(ev) {
    if (!this.props.draggable) {
      return;
    }
    ev.dataTransfer.setData("objects/variable", JSON.stringify(this.props.var));
  }

  dragEnd(ev) {}
}
