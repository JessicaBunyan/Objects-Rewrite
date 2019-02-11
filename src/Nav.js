import React, { Component } from "react";

export class Nav extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    var cName = " nav c" + React.Children.count(this.props.children);
    if (this.props.active) {
      cName += " active";
    }

    return (
      <div className={cName}>
        {React.Children.map(this.props.children, (child, index) => {
          var isActive = this.props.activeScene == index;
          return React.cloneElement(child, {
            key: index,
            active: isActive,
            onClick: isActive
              ? () => {
                  return;
                }
              : () => this.props.setActiveScene(index),
            deactivate: () => {
              this.props.setActiveScene(-1);
            }
          });
        })}
      </div>
    );
  }
}
