import React, { Component } from "react";

export class Nav extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div
        className={
          "scene nav-scene active c" + React.Children.count(this.props.children)
        }
      >
        {React.Children.map(this.props.children, (child, index) => {
          var isActive = this.props.activeScene == index;
          console.log(
            "isActive - index: " + index + ", " + this.props.activeScene
          );
          return React.cloneElement(child, {
            key: index,
            active: isActive,
            onClick: isActive
              ? () => {
                  return;
                }
              : () => this.props.setActiveScene(index),
            deactivate: () => this.props.setActiveScene(-1)
          });
        })}
      </div>
    );
  }
}
