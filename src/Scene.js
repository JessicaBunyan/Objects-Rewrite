import React, { Component } from "react";
import SceneFooter from "./SceneFooter";

export class Scene extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div
        className={
          "scene " +
          (this.props.active == true ? "active" : "") +
          (this.props.hidden ? " hidden " : "")
        }
        style={{
          backgroundColor: this.props.bgColour,
          backgroundImage: "url(" + this.props.bgImage + ")"
        }}
        onClick={() => this.props.onClick()}
      >
        {this.props.children}

        <SceneFooter action={this.props.deactivate} />
      </div>
    );
  }
}
