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
    var v = ev.dataTransfer.getData("objects/variable");
    v = JSON.parse(v);

    console.log("in drop in param");
    console.log(v);
    console.log(v.id);

    // var obj = varFac.reconstructVar(json)

    this.props.removeFromInv(v);
    this.props.updateState(v);
  }
}
