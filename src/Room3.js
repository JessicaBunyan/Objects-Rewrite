import React, { Component } from "react";
import SceneFooter from "./SceneFooter";
import { Nav } from "./Nav";
import { combineRenders } from "./utils";
import flags from "./storyFlags";
import { MethodGroup } from "./MethodGroup";
import { Avatar } from "./Avatar";
import { TextBox } from "./TextBox";
import { Scene } from "./Scene";
import { Pillar } from "./Pillar";

export class Room3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeScene: -1
    };
  }

  renderScene1() {
    var pillars = (
      <Pillar
        params={[
          { type: "colour", label: "Sky" },
          { type: "colour", label: "trees" },
          { type: "colour", label: "flowers" }
        ]}
      />
    );
    return (
      <Scene key={0}>
        <MethodGroup>{pillars}</MethodGroup>
        {/* <Avatar img={questionMark} imgClassName={"question-mark"} /> */}
        <TextBox className={" d1 "}>
          <h2>
            <em>Paint me a beautiful landscape</em>
          </h2>
          <h3>Blue skies, green trees and red flowers</h3>
        </TextBox>
      </Scene>
    );
  }

  render() {
    var scenes = combineRenders(() => this.renderScene1());

    var footer = this.props.storyFlags[flags.room1Complete] ? (
      <SceneFooter action={this.props.deactivate} />
    ) : null;

    var cName = "room room1 scene";
    if (this.props.active) {
      cName += " active";
    }
    return (
      <div className={cName} onClick={() => this.props.onClick()}>
        <img className="preview" src={this.props.previewImg} />
        <Nav
          setActiveScene={i => this.setState({ activeScene: i })}
          activeScene={this.state.activeScene}
          active={this.props.active}
        >
          {scenes}
        </Nav>
        {footer}
      </div>
    );
  }
}
