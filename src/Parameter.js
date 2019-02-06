import React, { Component } from "react";

export class Parameter extends Component {
  render() {
    return (
      <div
        className="parameter number"
        onDrop={event => this.drop(event)}
        onDragOver={event => this.allowDrop(event)}
      >
        {this.props.children}
      </div>
    );
  }

  allowDrop(ev) {
    console.log("in allow drop in method pill");
    ev.preventDefault();
  }

  drop(ev) {
    ev.preventDefault();
    var val = ev.dataTransfer.getData("objects/variable");

    console.log("in drop in param");

    // var obj = varFac.reconstructVar(json)

    this.props.removeFromInv(val);
    this.props.updateState(val);
  }
}
