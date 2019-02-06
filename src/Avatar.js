import React, { Component } from "react";

export class Avatar extends Component {
  render() {
    return (
      <div className="avatar">
        <img src={this.props.img} />
      </div>
    );
  }
}
