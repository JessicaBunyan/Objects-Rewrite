import React, { Component } from "react";
import postbox from "./img/postboxGrey.png";
import { Button } from "./Button";
import { Var } from "./Var";

export class Pillar extends Component {
  constructor(props) {
    super(props);
    var params = [];
    for (var i = 0; i < React.Children.count(this.props.children); i++) {
      params.push("");
    }
    this.state = {
      params: params,
      buttonPressed: false,
      buttonPressFailed: false
    };
  }
  render() {
    return (
      <div className="pillar-region">
        <img src={postbox} />
        <div className="param-region">
          {React.Children.map(this.props.children, (child, index) => {
            console.log("index: " + index);
            return React.cloneElement(
              child,
              {
                updateState: v => this.updateParamVal(index, v)
              },
              <Var var={this.state.params[index]} />
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
    const vals = this.state.params;

    console.log(vals);

    vals[index] = val;
    this.setState({ params: vals });
  }

  countParams() {
    var params = this.state.params;
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
    console.log(this.state.params.length);

    if (React.Children.count(this.props.children) === this.countParams()) {
      console.log("correct args present, calling func with these params");
      console.log(this.state.params);
      this.triggerOnClick();
    } else {
      this.setState({ buttonPressFailed: true });
      setTimeout(() => {
        this.setState({ buttonPressFailed: false });
      }, 200);
      console.log("wrong params");
    }
  }

  triggerOnClick() {
    this.setState({ buttonPressed: true });
    this.props.onClick(this.state.params);
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
    this.setState({ params: params });
  }
}
