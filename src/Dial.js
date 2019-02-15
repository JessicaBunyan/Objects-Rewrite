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
          if (index == active - 2) {
            cName += "face-far-left";
          } else {
            if (index == active + 2) {
              cName += "face-far-right";
            }
          }
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
        <div className="dial-arrow left" onClick={() => this.decrement()}>
          L
        </div>
        <div className="dial">
          <div className="dial-mask">{faces}</div>
        </div>
        <div className="dial-arrow right" onClick={() => this.increment()}>
          R
        </div>
      </div>
    );
  }

  decrement() {
    var newVal;
    if (this.state.active == 0) {
      newVal = this.props.values.length - 1;
    } else {
      newVal = this.state.active - 1;
    }

    this.setState({ active: newVal });
  }

  increment() {
    var newVal;
    if (this.state.active == this.props.values.length - 1) {
      newVal = 0;
    } else {
      newVal = this.state.active + 1;
    }

    this.setState({ active: newVal });
  }
}
