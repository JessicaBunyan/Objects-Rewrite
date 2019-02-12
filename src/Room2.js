import React, { Component } from "react";
import SceneFooter from "./SceneFooter";
import { Nav } from "./Nav";
import { combineRenders } from "./utils";
import flags from "./storyFlags";
import { Pillar } from "./Pillar";
import { Avatar } from "./Avatar";
import { Scene } from "./Scene";
import { TextBox } from "./TextBox";
import { Parameter } from "./Parameter";

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
        <Pillar
          text="Get String"
          onClick={() => this.props.addItemToInv("foo", "string")}
        />
        <Avatar imgClassName={"question-mark"} />
        <TextBox className={" d1 "}>
          <h2>
            <em>TEST</em>
          </h2>
          <h3>
            Get your <em>Strings</em> here!
          </h3>
        </TextBox>
      </Scene>
    );
  }

  renderScene2() {
    return (
      <Scene key={2}>
        <Pillar
          text="Combine"
          onClick={params =>
            this.props.addItemToInv(params[0].value + params[1].value, "string")
          }
        >
          <Parameter
            label="String 1"
            type="string"
            removeFromInv={v => this.props.removeFromInv(v)}
          />
          <Parameter
            label="String 2"
            type="string"
            removeFromInv={v => this.props.removeFromInv(v)}
          />
        </Pillar>
      </Scene>
    );
  }

  render() {
    var scenes = combineRenders(
      () => this.renderScene1(),
      () => this.renderScene2()
    );
    //   () => this.renderScene3()

    var footer = <SceneFooter action={this.props.deactivate} />;

    var cName = "room room2 scene ";
    if (this.props.active) {
      cName += " active";
    }

    return (
      <div className={cName} onClick={() => this.props.onClick()}>
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
