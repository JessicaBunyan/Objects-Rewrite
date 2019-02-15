import React, { Component } from "react";
import SceneFooter from "./SceneFooter";
import { Nav } from "./Nav";
import { combineRenders } from "./utils";
import flags from "./storyFlags";
import { Pillar } from "./Pillar";
import { Avatar } from "./Avatar";
import { Scene } from "./Scene";
import { TextBox } from "./TextBox";
import { Parameter } from "./Parameter";

export class MethodGroup extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="pillars-region">
        {React.Children.map(this.props.children, (child, index) => {
          return React.cloneElement(child, {
            key: index,
            removeFromInv: this.props.removeFromInv
          });
        })}
      </div>
    );
  }
}
