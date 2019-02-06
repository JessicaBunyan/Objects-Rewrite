import React, { Component } from "react";

export class Avatar extends Component {
  render() {
    return (
      <div className="avatar">
        <img
          src={this.props.img}
          style={{
            width: this.props.width + "px",
            height: this.props.width + "px"
          }}
        />
      </div>
    );
  }
}
