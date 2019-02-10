import React, { Component } from "react";
import SceneFooter from "./SceneFooter";
import { Nav } from "./Nav";
import { combineRenders } from "./utils";
import flags from "./storyFlags";
import { Pillar } from "./Pillar";
import { Avatar } from "./Avatar";
import { Scene } from "./Scene";
import { TextBox } from "./TextBox";

export class Room2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeScene: -1
    };
  }

  renderScene1() {
    return (
      <Scene key={1}>
        <Pillar text="Get Number" />
        <Avatar imgClassName={"question-mark"} />
        <TextBox className={" d1 "}>
          <h2>
            <em>Numbers!</em>
          </h2>
          <h3>
            Get your <em>Numbers</em> here!
          </h3>
        </TextBox>
      </Scene>
    );
  }

  render() {
    var scenes = combineRenders(() => this.renderScene1());
    //   () => this.renderScene2(),
    //   () => this.renderScene3()

    var footer = <SceneFooter action={() => this.props.exitRoom()} />;

    var cName = "room room2 ";
    if (!this.props.visible) {
      cName += " hidden";
    }

    return (
      <div className={cName}>
        <Nav
          setActiveScene={i => this.setState({ activeScene: i })}
          activeScene={this.state.activeScene}
        >
          {scenes}
        </Nav>
        {footer}
      </div>
    );
  }
}
