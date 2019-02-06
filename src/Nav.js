import React, { Component } from "react";

export class Nav extends Component {
  render() {
    return (
      <div
        className={
          "scene nav-scene active c" + React.Children.count(this.props.children)
        }
      >
        {this.props.children}
      </div>
    );
  }
}
