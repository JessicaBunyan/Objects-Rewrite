import React, { Component } from "react";
import postbox from "./img/postboxGrey.png";
import { Button } from "./Button";
import { Var } from "./Var";

export class Pillar extends Component {
  constructor(props) {
    super(props);
    var paramValues = [];
    for (var i = 0; i < React.Children.count(this.props.children); i++) {
      paramValues.push("");
    }
    this.state = {
      paramValues: paramValues,
      buttonPressed: false,
      buttonPressFailed: false
    };
  }
  render() {
    return (
      <div className="pillar-region">
        <img className="postbox" src={postbox} />
        <div className="param-region">
          {React.Children.map(this.props.children, (child, index) => {
            return React.cloneElement(
              child,
              {
                updateState: v => this.updateParamVal(index, v),
                hasVar: this.state.paramValues[index],
                missingAnimation:
                  !this.state.paramValues[index] && this.state.buttonPressFailed
                    ? true
                    : false
              },
              <Var var={this.state.paramValues[index]} />
            );
          })}
        </div>

        <Button
          pressed={this.state.buttonPressed}
          failPressed={this.state.buttonPressFailed}
          onClick={() => this.checkParamsAndExecute()}
        >
          <h2>{this.props.text}</h2>
        </Button>
      </div>
    );
  }

  updateParamVal(index, val) {
    const vals = this.state.paramValues;

    console.log(vals);

    vals[index] = val;
    this.setState({ paramValues: vals });
  }

  countParams() {
    var params = this.state.paramValues;
    var count = 0;
    params.forEach(element => {
      if (element) {
        count++;
      }
    });

    return count;
  }

  checkParamsAndExecute() {
    if (!this.props.onClick) {
      return;
    }

    if (!this.props.children) {
      console.log("0 args required - calling func ");
      this.triggerOnClick();
      return;
    }

    console.log(React.Children.count(this.props.children));
    console.log(this.state.paramValues.length);

    if (React.Children.count(this.props.children) === this.countParams()) {
      console.log("correct args present, calling func with these params");
      console.log(this.state.paramValues);
      this.triggerOnClick();
    } else {
      this.setState({ buttonPressFailed: true });
      setTimeout(() => {
        this.setState({ buttonPressFailed: false });
      }, 300);
      console.log("wrong params");
    }
  }

  triggerOnClick() {
    this.setState({ buttonPressed: true });
    this.props.onClick(this.state.paramValues);
    this.resetParams();
    setTimeout(() => {
      this.setState({ buttonPressed: false });
    }, 1000);
  }

  resetParams() {
    var params = [];
    for (var i = 0; i < React.Children.count(this.props.children); i++) {
      params.push("");
    }
    this.setState({ paramValues: params });
  }
}
