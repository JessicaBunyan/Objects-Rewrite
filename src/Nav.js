import React, { Component } from "react";

export class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = { active: -1 };
  }
  render() {
    return (
      <div
        className={
          "scene nav-scene active c" + React.Children.count(this.props.children)
        }
      >
        {React.Children.map(this.props.children, (child, index) => {
          return React.cloneElement(child, {
            key: index,
            active: this.state.active == index,
            onClick: () => this.setState({ active: index })
          });
        })}
      </div>
    );
  }
}
