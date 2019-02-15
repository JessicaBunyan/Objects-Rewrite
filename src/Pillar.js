import React, { Component } from "react";
import postbox from "./img/postboxGrey.png";
import { Button } from "./Button";
import { Var } from "./Var";
import { Parameter } from "./Parameter";

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

  renderParams() {
    if (!this.props.params) {
      return null;
    }

    var paramJsx = [];

    this.props.params.forEach((p, index) => {
      paramJsx.push(this.renderParam(p, index));
    });

    return paramJsx;
  }

  renderParam(p, index) {
    return (
      <Parameter
        key={index}
        type={p.type}
        label={p.label}
        updateState={v => this.updateParamVal(index, v)}
        hasVar={this.state.paramValues[index]}
        missingAnimation={
          !this.state.paramValues[index] && this.state.buttonPressFailed
            ? true
            : false
        }
        removeFromInv={this.props.removeFromInv}
      >
        <Var var={this.state.paramValues[index]} />
      </Parameter>
    );
  }

  render() {
    return (
      <div className="pillar-container">
        <img className="postbox" src={postbox} />
        <div className="param-region">{this.renderParams()}</div>

        <Button
          pressed={this.state.buttonPressed}
          failPressed={this.state.buttonPressFailed}
          onClick={() => this.checkParamsAndExecute()}
        >
          <h2>{this.props.text}</h2>
        </Button>
        {this.props.children}
      </div>
    );
  }

  updateParamVal(index, val) {
    const vals = this.state.paramValues;

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
      this.triggerOnClick();
      return;
    }

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
