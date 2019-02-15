import React, { Component } from "react";
import postbox from "./img/postboxGrey.png";
import { Button } from "./Button";
import { Var } from "./Var";
import { Parameter } from "./Parameter";
import { combineRenders } from "./utils";

export class Dial extends Component {
  constructor(props) {
    super(props);
  }

  renderFace(index) {
    var active = this.props.active;
    var total = this.props.values.length - 1;
    var cName = "face ";

    var next = active == total ? 0 : active + 1;
    var next2 = active + 2 > total ? active + 1 - total : active + 2;
    var prev = active == 0 ? total : active - 1;
    var prev2 = active - 2 < 0 ? total + active - 1 : active - 2;

    if (index == active) {
      cName += "face-current";
    } else if (index == next) {
      cName += "face-next";
    } else if (index == next2) {
      cName += "face-far-right";
    } else if (index == prev) {
      cName += "face-prev";
    } else if (index == prev2) {
      cName += "face-far-left";
    } else {
      cName += "hidden";
    }

    return (
      <div key={index} className={cName}>
        {this.props.values[index]}
      </div>
    );
  }

  renderFaces() {
    var faces = [];
    this.props.values.forEach((v, index) => {
      faces.push(this.renderFace(index));
    });
    return faces;
  }

  render() {
    var faces = this.renderFaces();

    return (
      <div className="dial-container">
        <div className="dial-arrow left" onClick={() => this.decrement()}>
          <i className="fas fa-chevron-left" />
        </div>
        <div className="dial">
          <div className="dial-mask">{faces}</div>
        </div>
        <div className="dial-arrow right" onClick={() => this.increment()}>
          <i className="fas fa-chevron-right" />
        </div>
      </div>
    );
  }

  decrement() {
    var newVal;
    if (this.props.active == 0) {
      newVal = this.props.values.length - 1;
    } else {
      newVal = this.props.active - 1;
    }

    this.props.setValue(newVal);
  }

  increment() {
    var newVal;
    if (this.props.active == this.props.values.length - 1) {
      newVal = 0;
    } else {
      newVal = this.props.active + 1;
    }

    this.props.setValue(newVal);
  }
}
