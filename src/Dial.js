import React, { Component } from "react";
import postbox from "./img/postboxGrey.png";
import { Button } from "./Button";
import { Var } from "./Var";
import { Parameter } from "./Parameter";

export class Dial extends Component {
  render() {
    return (
      <div className="dial">
        <div className="face face-prev">1</div>
        <div className="face face-current">2</div>
        <div className="face face-next">3</div>
      </div>
    );
  }
}
