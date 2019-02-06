import React, { Component } from "react";
import postbox from "./img/postboxGrey.png";
import { Button } from "./Button";

export class Pillar extends Component {
  constructor(props) {
    super(props);
    this.state = { params: [] };
  }
  render() {
    return (
      <div className="pillar-region">
        <img src={postbox} />
        {this.props.children}
        <Button onClick={() => this.triggerOnClick()} />
      </div>
    );
  }

  triggerOnClick() {
    if (!this.props.onClick) {
      return;
    }

    if (this.props.children.length === this.state.params.length) {
      this.props.onClick(this.state.params);
    }
  }
}
