import React, { Component } from "react";
import postbox from "./img/postboxGrey.png";
import { Button } from "./Button";
import { Var } from "./Var";
import { Parameter } from "./Parameter";
import { combineRenders } from "./utils";

export class Dial extends Component {
  constructor(props) {
    super(props);

    this.state = { active: 2 };
  }

  renderFace(index) {
    var active = this.state.active;
    var cName = "face ";
    if (index == active) {
      cName += "face-current";
    } else {
      if (index == active - 1) {
        cName += "face-prev";
      } else {
        if (index == active + 1) {
          cName += "face-next";
        } else {
          cName += "hidden";
        }
      }
    }

    return <div className={cName}>{this.props.values[index]}</div>;
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
        <div className="dial-arrow left">L</div>
        <div className="dial">{faces}</div>
        <div className="dial-arrow right">R</div>
      </div>
    );
  }
}
