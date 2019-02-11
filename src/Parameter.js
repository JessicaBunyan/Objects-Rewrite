import React, { Component } from "react";

export class Parameter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    var cName = "parameter " + this.props.type;
    cName +=
      this.props.missingAnimation || this.state.missingAnimation
        ? " missing"
        : "";
    return (
      <div className="param-container">
        <div className={"label " + this.props.type}>
          <h3>{this.props.label}</h3>{" "}
        </div>
        <div className={cName}>
          <div
            className="param-hitbox"
            onDrop={event => this.drop(event)}
            onDragOver={event => this.allowDrop(event)}
          />
          {React.cloneElement(this.props.children, { draggable: false })}
        </div>
      </div>
    );
  }

  allowDrop(ev) {
    if (!this.props.hasVar) {
      // only accept drop if no param
      ev.preventDefault();
    }
  }

  drop(ev) {
    ev.preventDefault();
    var v = ev.dataTransfer.getData("objects/variable");
    v = JSON.parse(v);

    console.log("in drop in param");
    console.log(v);
    console.log(v.id);

    // var obj = varFac.reconstructVar(json)

    if (v.type == this.props.type) {
      this.props.removeFromInv(v.id);
      this.props.updateState(v);
    } else {
      console.log("wrong type");
      this.setState({ missingAnimation: true });
      setTimeout(() => {
        this.setState({ missingAnimation: false });
      }, 300);
    }
  }
}
